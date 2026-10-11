#!/usr/bin/env node
/*
 * Saves the routes diagram as one still PNG (3840x2160 by default).
 *
 *   NODE_PATH=/opt/node-tools/node_modules node render-image.cjs [--out=file.png] [--scale=2.4]
 *
 * The page is laid out at 1600x900 CSS px; --scale 2.4 gives 3840x2160, 1.2 gives 1920x1080.
 */
const { chromium } = require('playwright');
const path = require('path');

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const OUT = path.resolve(arg('out', path.join(__dirname, 'CMP-Project-Lifecycle-Diagram.png')));
const SCALE = parseFloat(arg('scale', '2.4'));
const HTML = path.join(__dirname, 'CMP-Project-Lifecycle-Diagram.html');

(async () => {
  const browser = await chromium.launch({ args: ['--font-render-hinting=none', '--force-color-profile=srgb'] });
  const context = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: SCALE, colorScheme: 'light' });
  const page = await context.newPage();
  await page.addInitScript(() => { window.__videoManual = true; });
  await page.goto(`file://${HTML}?routes&still`);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => { window.__video.start(); window.__video.seek(window.__video.still); });
  await page.waitForTimeout(300);                        // the page redraws its arrows once after layout settles
  await page.evaluate(() => window.__video.seek(window.__video.still));
  await page.waitForTimeout(1200);                       // let the fade-ins finish
  const problem = await page.evaluate(() => window.__video.check());
  if (problem) throw new Error(problem);
  await page.screenshot({ path: OUT });
  await browser.close();
  console.log(`wrote ${OUT}`);
})().catch((e) => { console.error(e); process.exit(1); });
