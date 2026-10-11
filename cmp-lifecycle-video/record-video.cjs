#!/usr/bin/env node
/*
 * Records CMP-Project-Lifecycle-Diagram.html to a 1920x1080, 30 fps H.264 MP4.
 *
 *   NODE_PATH=/opt/node-tools/node_modules node record-video.cjs [--seconds=60] [--caption=long] [--out=file.mp4]
 *       the step-by-step walkthrough (?video), CMP-Project-Lifecycle-Diagram.mp4
 *   NODE_PATH=/opt/node-tools/node_modules node record-video.cjs --mode=routes [--out=file.mp4]
 *       the single-screen routes diagram (?routes), CMP-Project-Lifecycle-Routes.mp4
 *
 * Needs Playwright (with Chromium) and ffmpeg. Playwright drives the page and takes the
 * pictures; ffmpeg encodes them.
 *
 * Why it steps frame by frame instead of using recordVideo: Playwright's built-in recorder
 * runs in real time, drops frames when the machine is busy and writes a ~1 Mbit/s VP8 file,
 * which smears small text. Here the page clock is paused and advanced exactly 1/30 s per
 * frame (page.clock), the CSS transitions are stepped to the same instant, and every frame is
 * captured as a lossless PNG and piped to ffmpeg. The result is the same on every run.
 *
 * The page is laid out at 1600x900 CSS px with a device scale factor of 1.2, so the frames
 * are exactly 1920x1080 and the text stays sharp.
 */
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const SECONDS = parseFloat(arg('seconds', '60'));
const CAPTION = arg('caption', 'short');
const MODE = arg('mode', 'video');
const OUT = path.resolve(arg('out', path.join(__dirname, MODE === 'routes' ? 'CMP-Project-Lifecycle-Routes.mp4' : 'CMP-Project-Lifecycle-Diagram.mp4')));
const HTML = path.join(__dirname, 'CMP-Project-Lifecycle-Diagram.html');
const FPS = 30;
const VIEW = { width: 1600, height: 900 };
const SCALE = 1.2;

/* runs inside the page: moves every running CSS transition to the recorder's clock */
function installAnimationStepper() {
  const started = new WeakMap();
  window.__videoManual = true;
  window.__stepAnimations = (now) => {
    for (const a of document.getAnimations()) {
      if (!(a instanceof CSSTransition || a instanceof CSSAnimation)) continue;
      if (!started.has(a)) {
        started.set(a, now);
        a.playbackRate = 0;
      }
      const t = now - started.get(a);
      const end = a.effect.getComputedTiming().endTime;
      if (t >= end) a.cancel();       // finished: drop the animation, the end value stays
      else a.currentTime = t;
    }
  };
}

async function main() {
  const url = MODE === 'routes'
    ? `file://${HTML}?routes`
    : `file://${HTML}?video&seconds=${SECONDS}${CAPTION === 'long' ? '&caption=long' : ''}`;
  const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--force-color-profile=srgb'] });
  const context = await browser.newContext({ viewport: VIEW, deviceScaleFactor: SCALE, colorScheme: 'light' });
  const page = await context.newPage();
  await page.addInitScript(installAnimationStepper);
  page.on('pageerror', (e) => { throw e; });

  await page.clock.install({ time: 0 });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  const now = await page.evaluate(() => Date.now());
  await page.clock.pauseAt(now + 500);
  await page.clock.runFor(200);             // let the first layout and edge drawing settle

  const plan = await page.evaluate(() => window.__video.start());   // the clock is paused, so nothing runs yet
  const info = await page.evaluate(() => {
    const view = document.querySelector('.view');
    return {
      duration: window.__video.duration,
      problem: window.__video.check ? window.__video.check() : '',
      slides: view ? [...document.querySelectorAll('.slide')].map((s) => s.querySelector('.band').getBoundingClientRect().bottom - view.getBoundingClientRect().top) : [],
      viewHeight: view ? view.getBoundingClientRect().height : 0,
    };
  });
  if (info.problem) throw new Error(info.problem);
  if (info.slides.some((bottom) => bottom > info.viewHeight)) {
    throw new Error(`A phase does not fit on one screen: band bottoms ${info.slides} vs view height ${info.viewHeight}`);
  }
  console.log(MODE === 'routes' ? 'fits: both phases on one screen' : `fits: band bottoms ${info.slides.map((v) => v.toFixed(0))} inside ${info.viewHeight.toFixed(0)} px`);
  plan.forEach((p, i) => console.log(`${MODE === 'routes' ? 'route' : 'step'} ${String(i + 1).padStart(2)}  ${(p.start / 1000).toFixed(1)}s  ${(p.ms / 1000).toFixed(1)}s`));

  const total = Math.round((info.duration / 1000) * FPS);
  const ffmpeg = spawn('ffmpeg', [
    '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
    '-an', '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-tune', 'animation', '-profile:v', 'high', '-r', String(FPS),
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
    '-movflags', '+faststart', OUT,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((resolve, reject) => {
    ffmpeg.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`))));
    ffmpeg.stdin.on('error', reject);
  });

  const cdp = await context.newCDPSession(page);
  let clock = 0;
  for (let i = 0; i < total; i++) {
    const t = Math.round((i * 1000) / FPS);
    if (t > clock) await page.clock.runFor(t - clock);
    clock = t;
    await page.evaluate((now) => { if (window.__video.seek) window.__video.seek(now); window.__stepAnimations(now); }, t);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true, clip: { x: 0, y: 0, ...VIEW, scale: SCALE } });
    const png = Buffer.from(data, 'base64');
    if (i === 0 && (png.readUInt32BE(16) !== 1920 || png.readUInt32BE(20) !== 1080)) {
      throw new Error(`Frames are ${png.readUInt32BE(16)}x${png.readUInt32BE(20)}, expected 1920x1080`);
    }
    if (!ffmpeg.stdin.write(png)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
    if (i % 90 === 0) console.log(`frame ${i}/${total}`);
  }
  ffmpeg.stdin.end();
  await done;
  await browser.close();
  console.log(`wrote ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
