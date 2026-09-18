import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/availability', label: 'Availability' },
  { to: '/booking', label: 'Booking' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-bg/95 backdrop-blur-md border-b border-white/8' : 'bg-transparent'
        }`}
        style={{ height: 'var(--navbar-h)' }}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded"
            aria-label="Nexus Gaming Cafe – Home"
          >
            <span className="w-7 h-7 bg-lime rounded-sm flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-bg" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 9h2v2H6V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9zM3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm1 2v10h16V7H4z" />
              </svg>
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-text">NEXUS</span>
          </Link>

          {/* Desktop Nav — increased link padding and gap for breathing room */}
          <nav className="hidden md:flex items-center gap-1 flex-1 ml-8" aria-label="Main navigation">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `font-display font-medium text-[11px] uppercase tracking-widest px-4 py-2.5 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                    isActive ? 'text-lime' : 'text-muted hover:text-text'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Hamburger — clear gap from nav links */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-6">
            <Link
              to="/booking"
              className="hidden sm:inline-flex items-center gap-2 bg-lime text-bg font-display font-bold text-[11px] uppercase tracking-widest px-6 py-2.5 rounded hover:bg-lime-dim transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50"
            >
              Book Now
            </Link>
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] p-2 min-h-[44px] min-w-[44px] rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className={`w-5 h-0.5 bg-text rounded-full transition-all duration-250 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`w-5 h-0.5 bg-text rounded-full transition-all duration-250 ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-text rounded-full transition-all duration-250 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 'var(--navbar-h)' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-bg/96 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        {/* Slide-in panel */}
        <nav
          className={`relative flex flex-col h-full px-6 pt-8 pb-10 transition-transform duration-300 ${
            open ? 'translate-x-0' : '-translate-x-4'
          }`}
          aria-label="Mobile navigation links"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display font-semibold text-lg uppercase tracking-widest py-4 border-b border-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded-sm ${
                    isActive ? 'text-lime' : 'text-muted hover:text-text'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-auto pt-8">
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center bg-lime text-bg font-display font-bold text-sm uppercase tracking-widest py-4 rounded hover:bg-lime-dim transition-all active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 min-h-[56px]"
            >
              Book Now
            </Link>
            <p className="text-center text-muted text-xs font-display uppercase tracking-widest mt-4">
              Open Today · 10 AM – 2 AM
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
