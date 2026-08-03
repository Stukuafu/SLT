import { ArrowRight, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="contact-cta">
      <div className="contact-cta__texture" aria-hidden="true" />
      <div className="container contact-cta__inner reveal">
        <div className="contact-cta__icon"><MessageCircle size={30} /></div>
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2>Ready to make your next move clearer?</h2>
        </div>
        <p>Tell us what you are working towards and we will help shape a practical path forward.</p>
        <div className="contact-cta__actions">
          <a className="button button--coral" href="mailto:hello@sltconsulting.co.nz">Email us <ArrowRight size={17} /></a>
          <a className="contact-email" href="mailto:hello@sltconsulting.co.nz"><Mail size={17} /> hello@sltconsulting.co.nz</a>
        </div>
      </div>
    </section>
  );
}
