import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__media" aria-hidden="true">
        <img src="/images/hero-consultant.webp" alt="" className="hero__image" fetchPriority="high" />
        <div className="hero__overlay" />
      </div>
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">Auckland based. Nationwide reach.</p>
          <h1 className="hero__title" aria-label="Better websites. Smarter marketing. More leads.">
            <span>Better websites.</span>
            <span>Smarter marketing.</span>
            <span>More <em>leads.</em></span>
          </h1>
          <p className="hero__copy">
            We help New Zealand businesses grow with strategic websites, thoughtful design and marketing that delivers real results.
          </p>
          <div className="hero__actions">
            <a className="button button--coral" href="#services">See how we can help <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
      <a className="hero__scroll" href="#services"><ArrowDown size={15} /> Scroll to explore</a>
    </section>
  );
}
