import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '../data/siteData.js';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef(null);

  const visibleCount = useCallback(() => {
    if (window.innerWidth < 680) return 1;
    if (window.innerWidth < 1050) return 2;
    return 3;
  }, []);

  const scrollToIndex = useCallback((nextIndex, behaviour = 'smooth') => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector('.testimonial-card');
    if (!viewport || !card) return;
    const gap = 20;
    viewport.scrollTo({ left: nextIndex * (card.getBoundingClientRect().width + gap), behavior: behaviour });
  }, []);

  const move = useCallback((direction) => {
    const max = Math.max(0, testimonials.length - visibleCount());
    setIndex((current) => {
      let next = current + direction;
      if (next < 0) next = max;
      if (next > max) next = 0;
      requestAnimationFrame(() => scrollToIndex(next));
      return next;
    });
  }, [scrollToIndex, visibleCount]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduceMotion) return undefined;
    const timer = window.setInterval(() => move(1), 5500);
    return () => window.clearInterval(timer);
  }, [move, paused]);

  useEffect(() => {
    const onResize = () => {
      setIndex(0);
      scrollToIndex(0, 'auto');
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scrollToIndex]);

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="testimonials__header reveal">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2>Kind words from <em>great people</em></h2>
          </div>
          <div className="carousel-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous testimonials"><ArrowLeft size={19} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next testimonials"><ArrowRight size={19} /></button>
          </div>
        </div>
        <div
          className="testimonial-viewport"
          ref={viewportRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-label="Customer testimonials"
        >
          <div className="testimonial-track">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name} tabIndex="0">
                <Quote className="testimonial-card__quote" size={32} fill="currentColor" aria-hidden="true" />
                <blockquote>“{testimonial.quote}”</blockquote>
                <footer>
                  <span className="avatar" aria-hidden="true">{testimonial.initials}</span>
                  <span><strong>{testimonial.name}</strong><small>{testimonial.role}</small></span>
                </footer>
              </article>
            ))}
          </div>
        </div>
        <div className="testimonial-dots" aria-hidden="true">
          {testimonials.map((testimonial, dotIndex) => (
            <span className={dotIndex === index ? 'active' : ''} key={testimonial.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
