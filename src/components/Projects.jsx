import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/siteData.js';

export default function Projects() {
  const trackRef = useRef(null);

  const move = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.project-card');
    const amount = card ? card.getBoundingClientRect().width + 16 : 320;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  };

  return (
    <section id="work" className="projects">
      <div className="projects__wave" aria-hidden="true" />
      <div className="container projects__layout">
        <div className="projects__intro reveal">
          <p className="eyebrow">Recent work</p>
          <h2>Projects we’re proud of.</h2>
          <p>Real-looking fictional examples that show how strategy, design and content can work together.</p>
          <a className="button button--coral button--small" href="#contact">View all projects <ArrowRight size={16} /></a>
          <div className="carousel-controls" aria-label="Project carousel controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous projects"><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next projects"><ArrowRight size={17} /></button>
          </div>
        </div>
        <div className="project-track" ref={trackRef} tabIndex="0" aria-label="Recent project examples">
          {projects.map((project, index) => (
            <article className="project-card reveal" key={project.title} style={{ '--delay': `${index * 70}ms` }}>
              <img src={project.image} alt={project.alt} loading="lazy" />
              <div className="project-card__shade" />
              <div className="project-card__content">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
              </div>
              <a href="#contact" aria-label={`View ${project.title} project`}><ArrowUpRight size={18} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
