import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo.jsx';
import { navigation } from '../data/siteData.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>Helping New Zealand businesses grow through clear strategy, thoughtful design and marketing that works.</p>
          <span><MapPin size={16} /> Auckland based, nationwide reach.</span>
        </div>
        <div>
          <h3>Quick links</h3>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}
          </nav>
        </div>
        <div>
          <h3>Services</h3>
          <nav aria-label="Footer services">
            <a href="#services">Website strategy</a>
            <a href="#services">Brand and design</a>
            <a href="#services">Photography</a>
            <a href="#services">Social content</a>
          </nav>
        </div>
        <div>
          <h3>Get in touch</h3>
          <ul className="footer__contact">
            <li><Phone size={16} /> 09 555 0187</li>
            <li><Mail size={16} /> <a href="mailto:hello@sltconsulting.co.nz">hello@sltconsulting.co.nz</a></li>
            <li><MapPin size={16} /> Auckland, New Zealand</li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} SLT Consulting. All rights reserved.</p>
        <div><a href="#home">Privacy</a><a href="#home">Terms</a></div>
      </div>
    </footer>
  );
}
