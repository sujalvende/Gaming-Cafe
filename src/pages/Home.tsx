import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import { zones, games, tournaments, winners } from '../data';
import { gsap, ScrollTrigger } from '../lib/gsap';

// ── Helpers ───────────────────────────────────────────────────────────────────

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const pillRef    = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const line3Ref   = useRef<HTMLSpanElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const rootRef    = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Desktop — fuller movement
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo(pillRef.current,  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0)
          .fromTo(line1Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, 0.18)
          .fromTo(line2Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, 0.32)
          .fromTo(line3Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55 }, 0.46)
          .fromTo(descRef.current,  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5  }, 0.62)
          .fromTo(ctaRef.current,   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, 0.78);

        // Subtle hero image parallax on scroll
        if (imgRef.current) {
          gsap.to(imgRef.current, {
            y: '18%',
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });

      mm.add('(max-width: 767px)', () => {
        // Mobile — lighter, shorter
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        tl.fromTo(pillRef.current,  { opacity: 0, y: 8  }, { opacity: 1, y: 0, duration: 0.4 }, 0)
          .fromTo(line1Ref.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, 0.15)
          .fromTo(line2Ref.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, 0.25)
          .fromTo(line3Ref.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, 0.35)
          .fromTo(descRef.current,  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, 0.48)
          .fromTo(ctaRef.current,   { opacity: 0, y: 8  }, { opacity: 1, y: 0, duration: 0.35}, 0.6);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: 'min(100svh, 800px)' }}
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=1080&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-25"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative w-full container pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-2xl">
          {/* Open now pill */}
          <div ref={pillRef} className="inline-flex items-center gap-2 mb-8 bg-bg2/80 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-available animate-pulse flex-shrink-0" aria-hidden="true" />
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-available">Open Now</span>
            <span className="text-muted text-[11px]">·</span>
            <span className="text-muted text-[11px]">Closes 2:00 AM</span>
          </div>

          {/* Heading — split into lines for staggered GSAP reveal */}
          <h1
            className="font-display font-bold text-text mb-7"
            style={{ fontSize: 'clamp(52px, 7.5vw, 92px)', lineHeight: '0.95', letterSpacing: '-0.025em' }}
          >
            <span ref={line1Ref} className="block">PLAY.</span>
            <span ref={line2Ref} className="block">COMPETE.</span>
            <span ref={line3Ref} className="block text-lime">REPEAT.</span>
          </h1>

          <p ref={descRef} className="text-muted text-base sm:text-lg leading-relaxed mb-10 max-w-md">
            Bengaluru's premium gaming lounge — RTX 4090 stations, OLED console screens, and a live tournament circuit.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-3">
            <Button to="/booking" size="lg">Book a Session</Button>
            <Button to="/games" variant="outline" size="lg">Explore Games</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────

function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: '-50%',
        duration: 22,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const items = ['PLAY', 'COMPETE', 'CONNECT', 'REPEAT', 'WIN', 'LEVEL UP'];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y border-white/8 bg-bg2 py-4"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex gap-0 whitespace-nowrap will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display font-bold text-[11px] uppercase tracking-[0.25em] text-muted/50 px-8"
          >
            {item}
            <span className="ml-8 text-lime/30">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Status Bar ────────────────────────────────────────────────────────────────

function StatusBar() {
  const pcZone = zones.find((z) => z.id === 'pc')!;
  const available = pcZone.stations.filter((s) => s.status === 'available').length;

  return (
    <div className="bg-bg2 border-b border-white/8" role="complementary" aria-label="Quick info">
      <div className="container py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-6 sm:gap-10">
          <div>
            <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">Status</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-available animate-pulse" aria-hidden="true" />
              <span className="font-display font-bold text-sm text-available">Open Now</span>
            </div>
          </div>
          <div>
            <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">Today</div>
            <div className="font-display font-medium text-sm text-text mt-1">10:00 AM – 2:00 AM</div>
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">Location</div>
            <div className="font-display font-medium text-sm text-text mt-1">Koramangala, Bengaluru</div>
          </div>
          <div>
            <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">PC Stations</div>
            <div className="font-display font-bold text-sm text-lime mt-1">
              {available} / {pcZone.stations.length} Free
            </div>
          </div>
        </div>
        <Button to="/booking" size="sm">Book Now →</Button>
      </div>
    </div>
  );
}

// ── Gaming Zones ──────────────────────────────────────────────────────────────

function GamingZones() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.sh-animate'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('article'),
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out', delay: 0.15 }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32" aria-labelledby="zones-heading">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            id="zones-heading"
            eyebrow="Gaming Zones"
            title="Choose Your Arena"
            description="Every zone is purpose-built. From solo grinders to full team bootcamps."
            className="sh-animate"
          />
          <Button to="/availability" variant="outline" size="sm" className="sh-animate flex-shrink-0 self-start md:self-auto">
            View Availability
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {zones.map((zone) => {
            const available = zone.stations.filter((s) => s.status === 'available').length;
            return (
              <article
                key={zone.id}
                className="group bg-surface border border-white/8 rounded overflow-hidden hover:border-white/18 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '240px' }}>
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-[1.04] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                  {/* Badges top */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {zone.badge && (
                      <span className="bg-purple/20 text-purple font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-sm border border-purple/30">
                        {zone.badge}
                      </span>
                    )}
                    <span
                      className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-sm border ${
                        available > 0
                          ? 'bg-available/10 text-available border-available/30'
                          : 'bg-inuse/10 text-inuse border-inuse/30'
                      }`}
                      aria-label={`${available} stations available`}
                    >
                      {available > 0 ? `${available} Free` : 'Full'}
                    </span>
                  </div>

                  {/* Zone name bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display font-bold text-xl text-text leading-tight">{zone.name}</h3>
                    <p className="text-muted text-sm mt-1 leading-snug line-clamp-2">{zone.description}</p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <span className="font-display font-bold text-2xl text-lime">₹{zone.pricePerHour}</span>
                    <span className="text-muted text-xs font-medium ml-1">/hr</span>
                  </div>
                  <div className="flex gap-2">
                    <Button to="/booking" size="sm">Book</Button>
                    <Button to="/availability" variant="outline" size="sm">Availability</Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Live Availability Preview ─────────────────────────────────────────────────

function LiveAvailability() {
  const sectionRef = useRef<HTMLElement>(null);
  const pcZone = zones.find((z) => z.id === 'pc')!;
  const preview = pcZone.stations.slice(0, 8);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.sh-animate'),
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('[role="status"]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out', delay: 0.2 }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bg2 py-20 sm:py-28 border-y border-white/8"
      aria-labelledby="avail-heading"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            id="avail-heading"
            eyebrow="Live Availability"
            title="PC Zone — Right Now"
            description="Green means ready. Walk in or book ahead."
            className="sh-animate"
          />
          <Button to="/availability" variant="outline" size="sm" className="sh-animate flex-shrink-0 self-start md:self-auto">
            Full Availability →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {preview.map((station) => (
            <div
              key={station.id}
              className={`bg-surface border rounded p-4 transition-all ${
                station.status === 'available'
                  ? 'border-available/20 hover:border-available/40'
                  : 'border-white/8'
              }`}
              role="status"
              aria-label={`${station.name}: ${station.status}`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-display font-bold text-sm text-text">{station.name}</span>
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    station.status === 'available' ? 'bg-available animate-pulse'
                    : station.status === 'in-use'  ? 'bg-inuse'
                    : station.status === 'reserved' ? 'bg-reserved'
                    : 'bg-maintenance'
                  }`}
                  aria-hidden="true"
                />
              </div>
              <StatusBadge status={station.status} size="sm" />
              {station.reservedAt && (
                <p className="text-reserved text-[10px] mt-2">Reserved: {station.reservedAt}</p>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 text-xs">
          {[
            { status: 'available',   label: 'Available',    count: pcZone.stations.filter((s) => s.status === 'available').length },
            { status: 'in-use',      label: 'In Use',       count: pcZone.stations.filter((s) => s.status === 'in-use').length },
            { status: 'reserved',    label: 'Reserved',     count: pcZone.stations.filter((s) => s.status === 'reserved').length },
            { status: 'maintenance', label: 'Maintenance',  count: pcZone.stations.filter((s) => s.status === 'maintenance').length },
          ].map(({ status, label, count }) => (
            <div key={status} className="flex items-center gap-1.5 text-muted font-display font-medium uppercase tracking-wide">
              <span
                className={`w-2 h-2 rounded-full ${
                  status === 'available' ? 'bg-available'
                  : status === 'in-use'  ? 'bg-inuse'
                  : status === 'reserved' ? 'bg-reserved'
                  : 'bg-maintenance'
                }`}
                aria-hidden="true"
              />
              {count} {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Featured Games ────────────────────────────────────────────────────────────

function FeaturedGames() {
  const sectionRef = useRef<HTMLElement>(null);
  const featured = games.slice(0, 6);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.sh-animate'),
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('article'),
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.15 }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32" aria-labelledby="games-heading">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            id="games-heading"
            eyebrow="Game Library"
            title="80+ Games Available"
            description="Every genre. Every platform. From tactical shooters to open-world racers."
            className="sh-animate"
          />
          <Button to="/games" variant="outline" size="sm" className="sh-animate flex-shrink-0 self-start md:self-auto">
            View All →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {featured.map((game) => (
            <article
              key={game.id}
              className="group bg-surface border border-white/8 rounded overflow-hidden hover:border-white/18 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="relative overflow-hidden" style={{ height: '160px' }}>
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-[1.04] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-bg/85 text-cyan font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                    {game.genre}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-sm text-text mb-1 leading-tight">{game.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-muted text-xs">{game.platform.join(' · ')}</span>
                  {game.rating && <span className="text-gold text-xs font-semibold">{game.rating}★</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Upcoming Tournaments ──────────────────────────────────────────────────────

function UpcomingTournaments() {
  const sectionRef = useRef<HTMLElement>(null);
  const upcoming = tournaments.filter((t) => t.status === 'upcoming').slice(0, 2);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.sh-animate'),
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('article'),
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power2.out', delay: 0.15 }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bg2 py-20 sm:py-28 border-y border-white/8"
      aria-labelledby="tournaments-heading"
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            id="tournaments-heading"
            eyebrow="Tournaments"
            title="Compete for Glory"
            description="Join the circuit. Win real prize pools. Build your legacy."
            className="sh-animate"
          />
          <Button to="/tournaments" variant="outline" size="sm" className="sh-animate flex-shrink-0 self-start md:self-auto">
            All Tournaments →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcoming.map((t) => {
            const slotsLeft = t.maxTeams - t.registeredTeams;
            const pct = (t.registeredTeams / t.maxTeams) * 100;
            const isFull = slotsLeft === 0;
            return (
              <article
                key={t.id}
                className="bg-surface border border-white/8 rounded overflow-hidden group hover:border-white/18 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '180px' }}>
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover opacity-50 group-hover:scale-[1.03] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-bg/85 text-cyan font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-sm">
                      {t.game}
                    </span>
                    <span className="bg-bg/85 text-muted font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-sm">
                      {t.playersPerTeam === 1 ? 'Solo' : `${t.playersPerTeam}v${t.playersPerTeam}`}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-sm border ${
                        t.registrationStatus === 'open' && !isFull
                          ? 'bg-available/10 text-available border-available/20'
                          : 'bg-inuse/10 text-inuse border-inuse/20'
                      }`}
                    >
                      {isFull ? 'Full' : t.registrationStatus === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-text mb-4">{t.name}</h3>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-0.5">Date</div>
                      <div className="text-sm text-text font-medium">
                        {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                    <div>
                      <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-0.5">Prize</div>
                      <div className="font-display font-bold text-sm text-gold">₹{t.prizePool.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-0.5">Entry</div>
                      <div className="text-sm text-text font-medium">₹{t.entryFee}</div>
                    </div>
                  </div>

                  {/* Capacity bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-[10px] text-muted font-display uppercase tracking-wide mb-1.5">
                      <span>{t.registeredTeams}/{t.maxTeams} teams</span>
                      <span className={slotsLeft <= 3 ? 'text-reserved' : 'text-muted'}>{slotsLeft} left</span>
                    </div>
                    <div className="h-1 bg-surface2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct >= 90 ? 'bg-inuse' : pct >= 70 ? 'bg-reserved' : 'bg-lime'}`}
                        style={{ width: `${pct}%` }}
                        role="progressbar"
                        aria-valuenow={t.registeredTeams}
                        aria-valuemin={0}
                        aria-valuemax={t.maxTeams}
                        aria-label={`${t.registeredTeams} of ${t.maxTeams} teams registered`}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button to={`/tournaments/${t.id}`} size="sm" variant="outline">View Details</Button>
                    {t.registrationStatus === 'open' && !isFull && (
                      <Button to={`/tournaments/${t.id}#register`} size="sm">Register Now</Button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Champions ─────────────────────────────────────────────────────────────────

function Champions() {
  const sectionRef = useRef<HTMLElement>(null);
  const top = winners.filter((w) => w.position === 1).slice(0, 3);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.sh-animate'),
            { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('article'),
            { opacity: 0, y: 40, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out', delay: 0.15 }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32" aria-labelledby="champions-heading">
      <div className="container">
        <div className="mb-12 text-center flex flex-col items-center sh-animate">
          <SectionHeading
            id="champions-heading"
            eyebrow="Champions"
            title="Hall of Fame"
            description="The players and teams who proved themselves at Nexus."
            align="center"
            accentColor="gold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {top.map((w) => (
            <article
              key={w.id}
              className="bg-surface border border-gold/15 rounded p-7 text-center hover:border-gold/30 transition-all"
            >
              <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/25 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C9.2 2 7 4.2 7 7v1H4V6H2v6c0 2.8 2.2 5 5 5h1c.5 1.4 1.7 2.5 3 2.9V21H8v2h8v-2h-3v-1.1c1.3-.4 2.5-1.5 3-2.9h1c2.8 0 5-2.2 5-5V6h-2v2h-3V7c0-2.8-2.2-5-5-5zm0 2c1.7 0 3 1.3 3 3v1H9V7c0-1.7 1.3-3 3-3zM7 10v2c0 1.7 1.3 3 3 3h4c1.7 0 3-1.3 3-3v-2H7zm-3 0h1v2c0 .7.1 1.4.3 2H4c-1.1 0-2-.9-2-2v-2h2zm13 0h3v2c0 1.1-.9 2-2 2h-1.3c.2-.6.3-1.3.3-2v-2z" />
                </svg>
              </div>
              <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-gold mb-2 leading-snug">
                {w.tournamentName}
              </div>
              <h3 className="font-display font-bold text-2xl text-text mb-2">{w.teamName}</h3>
              <div className="text-muted text-xs mb-5 leading-relaxed">{w.players.join(' · ')}</div>
              <div className="font-display font-bold text-xl text-gold">₹{w.prize.toLocaleString('en-IN')}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Location ──────────────────────────────────────────────────────────────────

function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const hours = [
    { day: 'Mon – Fri', time: '10:00 AM – 2:00 AM' },
    { day: 'Saturday',  time: '9:00 AM – 3:00 AM' },
    { day: 'Sunday',    time: '9:00 AM – 1:00 AM' },
  ];

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.sh-animate, .loc-animate'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-bg2 py-20 sm:py-28 border-t border-white/8"
      aria-labelledby="location-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="sh-animate">
            <SectionHeading
              id="location-heading"
              eyebrow="Location"
              title="Find Nexus"
              description="In the heart of Koramangala, Bengaluru's most vibrant neighbourhood."
            />
            <div className="mt-10 flex flex-col gap-6">
              <div>
                <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-2">Address</div>
                <address className="not-italic text-text text-base leading-snug">
                  12 Arena Street, Koramangala<br />
                  Bengaluru, Karnataka 560034
                </address>
              </div>
              <div>
                <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-3">Hours</div>
                <div className="flex flex-col gap-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between border-b border-white/6 pb-2">
                      <span className="text-muted text-sm">{h.day}</span>
                      <span className="text-text text-sm font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4 mt-1">
                <Button href="https://maps.google.com" size="sm">Get Directions</Button>
                <Button to="/contact" variant="outline" size="sm">Contact Us</Button>
              </div>
            </div>
          </div>

          {/* Map visual */}
          <div className="loc-animate bg-surface border border-white/8 rounded overflow-hidden flex items-center justify-center" style={{ minHeight: '300px' }}>
            <div className="text-center p-8">
              <div className="w-12 h-12 rounded-sm bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-lime" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="font-display font-bold text-sm text-text mb-1">Nexus Gaming Cafe</div>
              <div className="text-muted text-xs mb-5">12 Arena St, Koramangala, Bengaluru</div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-lime text-xs font-display font-semibold uppercase tracking-widest hover:text-lime-dim transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 rounded"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            sectionRef.current!.querySelectorAll('.cta-animate'),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 border-t border-white/8">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="cta-animate font-display font-bold text-text mb-6"
            style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}
          >
            READY TO <span className="text-lime">PLAY?</span>
          </h2>
          <p className="cta-animate text-muted text-base sm:text-lg mb-10 max-w-[42ch] mx-auto leading-relaxed">
            Book a station online in under 2 minutes. Walk in and start playing.
          </p>
          <div className="cta-animate flex flex-wrap gap-4 justify-center">
            <Button to="/booking" size="lg">Book a Session</Button>
            <Button to="/tournaments" variant="outline" size="lg">Join a Tournament</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <StatusBar />
      <GamingZones />
      <LiveAvailability />
      <FeaturedGames />
      <UpcomingTournaments />
      <Champions />
      <Location />
      <FinalCTA />
    </>
  );
}
