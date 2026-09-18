import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/games', label: 'Games' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/availability', label: 'Availability' },
  { to: '/booking', label: 'Booking' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/gallery', label: 'Gallery' },
];

const hours = [
  { day: 'Mon – Fri', time: '10:00 AM – 2:00 AM' },
  { day: 'Saturday', time: '9:00 AM – 3:00 AM' },
  { day: 'Sunday', time: '9:00 AM – 1:00 AM' },
];

export default function Footer() {
  return (
    <footer className="bg-bg2 border-t border-white/8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 w-fit" aria-label="Nexus Gaming Cafe – Home">
            <span className="w-7 h-7 bg-lime rounded-sm flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-bg" aria-hidden="true">
                <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm1 2v10h16V7H4z" />
              </svg>
            </span>
            <span className="font-display font-bold text-lg text-text">NEXUS</span>
          </Link>
          <p className="text-muted text-sm leading-relaxed max-w-[32ch]">
            Bengaluru's premium gaming lounge and esports venue. Where competition meets comfort.
          </p>
          <div className="flex gap-4 mt-1">
            {[
              { label: 'Instagram', href: '#' },
              { label: 'Twitter', href: '#' },
              { label: 'Discord', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-muted hover:text-text text-xs font-display font-medium uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded"
                aria-label={`Nexus on ${s.label}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-[11px] font-semibold uppercase tracking-widest text-muted mb-4">
            Explore
          </h4>
          <ul className="flex flex-col gap-2" role="list">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-display text-[11px] font-semibold uppercase tracking-widest text-muted mb-4">
            Opening Hours
          </h4>
          <ul className="flex flex-col gap-3" role="list">
            {hours.map((h) => (
              <li key={h.day} className="flex flex-col gap-0.5">
                <span className="text-[11px] font-display font-medium uppercase tracking-wide text-muted">
                  {h.day}
                </span>
                <span className="text-sm text-text">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-[11px] font-semibold uppercase tracking-widest text-muted mb-4">
            Find Us
          </h4>
          <address className="not-italic flex flex-col gap-3 text-sm">
            <div>
              <span className="text-[11px] font-display font-medium uppercase tracking-wide text-muted block mb-0.5">
                Address
              </span>
              <span className="text-text leading-snug">
                12 Arena Street, Koramangala
                <br />
                Bengaluru, Karnataka 560034
              </span>
            </div>
            <div>
              <span className="text-[11px] font-display font-medium uppercase tracking-wide text-muted block mb-0.5">
                Phone
              </span>
              <a
                href="tel:+918001234567"
                className="text-text hover:text-lime transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded"
              >
                +91 80 0123 4567
              </a>
            </div>
            <div>
              <span className="text-[11px] font-display font-medium uppercase tracking-wide text-muted block mb-0.5">
                Email
              </span>
              <a
                href="mailto:play@nexusgaming.in"
                className="text-text hover:text-lime transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded"
              >
                play@nexusgaming.in
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">© 2026 Nexus Gaming Cafe. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <a
                key={t}
                href="#"
                className="text-xs text-muted hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded"
              >
                {t}
              </a>
            ))}
            <Link
              to="/admin"
              className="text-xs text-muted/60 hover:text-lime transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime/50" aria-hidden="true" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
