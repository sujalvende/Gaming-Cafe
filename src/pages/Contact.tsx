import { useState, useRef, useLayoutEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { gsap } from '../lib/gsap';

const hours = [
  { day: 'Monday – Friday', time: '10:00 AM – 2:00 AM' },
  { day: 'Saturday', time: '9:00 AM – 3:00 AM' },
  { day: 'Sunday', time: '9:00 AM – 1:00 AM' },
];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-header-anim', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.fromTo(
        '.contact-content-anim',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Valid email address required';
    if (!form.message.trim()) e.message = 'Please enter a message';
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSent(true);
  };

  const input = (field: string) =>
    `bg-bg2 border ${errors[field] ? 'border-inuse/60 focus:border-inuse' : 'border-white/10 focus:border-lime/50 focus:ring-1 focus:ring-lime/30'} rounded py-3 px-4 text-sm text-text placeholder:text-muted/60 focus:outline-none transition-colors w-full`;
  const label = 'font-display text-[10px] font-semibold uppercase tracking-widest text-muted block mb-1.5';

  return (
    <div ref={rootRef} className="pb-24 min-h-screen" aria-label="Contact Nexus Gaming Cafe">
      {/* Header */}
      <div className="bg-bg2 border-b border-white/8 pt-16 pb-12 sm:pt-20 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto contact-header-anim">
          <SectionHeading eyebrow="Contact" title="Get in Touch" description="Questions, bookings, event inquiries — we're here to help." />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Info Side */}
          <div className="flex flex-col gap-6 sm:gap-8 contact-content-anim">
            <div className="bg-surface border border-white/8 rounded p-6 sm:p-7">
              <h3 className="font-display font-bold text-base text-text mb-5">Find Us</h3>
              <address className="not-italic flex flex-col gap-4 text-sm">
                <div>
                  <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">Address</div>
                  <div className="text-text leading-relaxed">12 Arena Street, Koramangala<br />Bengaluru, Karnataka 560034</div>
                </div>
                <div>
                  <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">Phone</div>
                  <a href="tel:+918001234567" className="text-text hover:text-lime transition-colors">+91 80 0123 4567</a>
                </div>
                <div>
                  <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">Email</div>
                  <a href="mailto:play@nexusgaming.in" className="text-text hover:text-lime transition-colors">play@nexusgaming.in</a>
                </div>
              </address>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-5 py-3 rounded hover:bg-lime-dim transition-colors cursor-pointer"
              >
                Get Directions
              </a>
            </div>

            <div className="bg-surface border border-white/8 rounded p-6 sm:p-7">
              <h3 className="font-display font-bold text-base text-text mb-5">Opening Hours</h3>
              <div className="flex flex-col gap-3">
                {hours.map(h => (
                  <div key={h.day} className="flex flex-col gap-0.5 pb-3 border-b border-white/8 last:border-0 last:pb-0">
                    <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">{h.day}</div>
                    <div className="text-sm text-text font-medium">{h.time}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-available animate-pulse" />
                <span className="text-available text-xs font-display font-semibold uppercase tracking-wide">Open Now</span>
              </div>
            </div>

            <div className="bg-surface border border-white/8 rounded p-6 sm:p-7">
              <h3 className="font-display font-bold text-base text-text mb-4">Connect</h3>
              {[
                { label: 'Instagram', url: '#', handle: '@nexusgaming.blr' },
                { label: 'Twitter', url: '#', handle: '@NexusGamingIN' },
                { label: 'Discord', url: '#', handle: 'Nexus Gaming Hub' },
              ].map(s => (
                <a key={s.label} href={s.url} className="flex items-center justify-between py-3 border-b border-white/6 last:border-0 hover:text-lime transition-colors">
                  <span className="font-display text-xs font-semibold uppercase tracking-widest text-muted hover:text-lime">{s.label}</span>
                  <span className="text-xs text-text">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2 contact-content-anim">
            {sent ? (
              <div className="bg-surface border border-available/20 rounded p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-available/10 border border-available/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-available" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-text mb-2">Message Sent!</h3>
                <p className="text-muted text-sm max-w-md mx-auto">We'll get back to you within 24 hours. See you at Nexus.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="mt-6 text-lime text-xs font-display font-semibold uppercase tracking-widest hover:text-lime-dim transition-colors cursor-pointer">
                  Send Another Message →
                </button>
              </div>
            ) : (
              <div className="bg-surface border border-white/8 rounded p-6 sm:p-8">
                <h2 className="font-display font-bold text-2xl text-text mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className={input('name')} />
                      {errors.name && <p className="text-inuse text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className={label}>Email *</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@email.com" className={input('email')} />
                      {errors.email && <p className="text-inuse text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className={label}>Subject</label>
                    <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Booking inquiry, event partnership, team bootcamp, etc." className={input('subject')} />
                  </div>
                  <div>
                    <label className={label}>Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help..." rows={5} className={`${input('message')} resize-none`} />
                    {errors.message && <p className="text-inuse text-xs mt-1">{errors.message}</p>}
                  </div>
                  <div className="pt-2">
                    <Button type="submit" size="lg">Send Message</Button>
                  </div>
                </form>
              </div>
            )}

            {/* Map banner */}
            <div className="mt-8 bg-surface border border-white/8 rounded overflow-hidden min-h-[180px] sm:min-h-[220px] flex items-center justify-center p-6 text-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-lime" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div className="font-display font-bold text-base text-text">Nexus Gaming Cafe</div>
                <div className="text-muted text-xs mt-1 mb-4">12 Arena St, Koramangala, Bengaluru</div>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded hover:bg-lime-dim transition-colors cursor-pointer">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
