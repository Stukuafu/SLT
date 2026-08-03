import { ArrowDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__backdrop" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow reveal-item">Auckland based. Nationwide reach.</p>
          <h1 className="hero__title" aria-label="Clearer strategy. Better websites. Stronger growth.">
            <span>Clearer strategy.</span>
            <span>Better websites.</span>
            <span>Stronger <em>growth.</em></span>
          </h1>
          <p className="hero__copy">
            SLT Consulting helps New Zealand businesses sharpen their message, improve their online presence and turn good ideas into practical results.
          </p>
          <div className="hero__actions">
            <a className="button button--coral" href="#services">See how we can help <ArrowRight size={17} /></a>
            <a className="text-link text-link--light" href="#work">View recent work</a>
          </div>
        </div>
        <div className="hero__image-wrap" aria-hidden="true">
          <img src="/images/hero-consultant.webp" alt="" className="hero__image" fetchPriority="high" />
          <div className="hero__image-shade" />
          <div className="hero__image-note">
            <span>Strategy</span>
            <span>Design</span>
            <span>Content</span>
          </div>
        </div>
      </div>
      <a className="hero__scroll" href="#services">
        <ArrowDown size={16} /> Scroll to explore
      </a>
    </section>
  );
}
