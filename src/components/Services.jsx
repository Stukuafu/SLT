import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/siteData.js';

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-heading section-heading--centred reveal">
          <p className="eyebrow">What we do</p>
          <h2>Everything your business needs to stand out and grow.</h2>
          <p>
            From strategy and websites to photography and social content, we create practical, connected marketing that is easy to use and built to last.
          </p>
        </div>
        <div className="services__grid">
          {services.map((service, index) => (
            <a className="service-card reveal" href="#contact" key={service.title} style={{ '--delay': `${index * 90}ms` }}>
              <div className="service-card__image-wrap">
                <img src={service.image} alt={service.alt} loading="lazy" />
                <span className="service-card__arrow"><ArrowUpRight size={18} /></span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
