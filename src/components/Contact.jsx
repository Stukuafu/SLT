import { ArrowRight, Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="contact-cta">
      <div className="contact-cta__texture" aria-hidden="true" />
      <div className="container contact-cta__inner reveal">
        <div className="contact-cta__icon"><MessageCircle size={25} /></div>
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2>Ready to grow your business?</h2>
        </div>
        <p>Let’s create a practical strategy and digital presence that attracts more of the right customers.</p>
        <div className="contact-cta__actions">
          <a className="button button--coral button--small" href="mailto:hello@sltconsulting.co.nz">Start a conversation <ArrowRight size={16} /></a>
          <a className="contact-email" href="mailto:hello@sltconsulting.co.nz"><Mail size={15} /> hello@sltconsulting.co.nz</a>
        </div>
      </div>
    </section>
  );
}
