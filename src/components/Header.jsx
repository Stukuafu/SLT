import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import { navigation } from '../data/siteData.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.toggle('menu-open', open);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Logo light={!scrolled} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <a className="button button--small button--coral desktop-quote" href="#contact">
          Request a quote <span aria-hidden="true">→</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a className="button button--coral" href="#contact" onClick={() => setOpen(false)}>Request a quote →</a>
        </nav>
      </div>
    </header>
  );
}
