import { useRef, useLayoutEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { gsap, ScrollTrigger } from '../lib/gsap';

const milestones = [
  { year: '2022', title: 'Nexus Founded', description: 'Opened our first 10-station cafe in Koramangala with a simple mission: professional-grade gaming for everyone.' },
  { year: '2023', title: 'Console Zone & Tournaments', description: 'Added the PS5 Arena and launched monthly tournament circuits. First prize pool: ₹5,000.' },
  { year: '2024', title: 'VIP Room & Bootcamp', description: 'Expanded to premium private suites and team training rooms. Total prize pool crossed ₹3 lakhs.' },
  { year: '2026', title: 'Full Esports Venue', description: '20+ stations, 4 zones, an online booking system, and a championship circuit. The benchmark for gaming cafes in India.' },
];

const values = [
  { title: 'Hardware That Means It', body: 'We spec every station for maximum performance. No shortcuts, no outdated gear. If it\'s in our cafe, it\'s current generation.' },
  { title: 'Community Over Commerce', body: 'Nexus isn\'t just a venue — it\'s where players meet teams, casuals become competitive, and friendships are built over long sessions.' },
  { title: 'Competitive by Design', body: 'From LAN-ready rooms to prize pool tournaments, every feature exists to help you improve and compete at a higher level.' },
  { title: 'Professional Environment', body: 'No chaos. Good lighting. Real seating. A space where you can focus on what matters — the game.' },
];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.about-hero-anim', {
        opacity: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power2.out',
      });

      // Values staggered reveal
      gsap.fromTo(
        '.about-value-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-values-section',
            start: 'top 85%',
          },
        }
      );

      // Timeline nodes reveal
      gsap.fromTo(
        '.about-timeline-item',
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-timeline-section',
            start: 'top 80%',
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pb-24 min-h-screen" aria-label="About Nexus Gaming Cafe">
      {/* Hero */}
      <div className="relative overflow-hidden bg-bg2 border-b border-white/8 pt-20 pb-16 sm:pt-28 sm:pb-24 px-5 sm:px-6">
        <img
          src="https://images.unsplash.com/photo-1725272532764-183d164c722b?w=1920&h=600&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg2 via-bg2/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto about-hero-anim">
          <SectionHeading
            eyebrow="Our Story"
            title="Built by Gamers, For Gamers"
            description="Nexus was born from a frustration with cramped, outdated gaming cafes. We set out to build the venue we always wanted — and refused to compromise."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/booking">Book a Session</Button>
            <Button to="/contact" variant="outline">Get in Touch</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-14 sm:mt-20">
        {/* Values */}
        <div className="about-values-section mb-16 sm:mb-24">
          <SectionHeading eyebrow="What We Stand For" title="Our Principles" />
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="about-value-card bg-surface border border-white/8 rounded p-7 sm:p-8 hover:border-white/20 transition-colors">
                <div className="font-display text-[11px] font-semibold uppercase tracking-widest text-lime mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-text mb-3">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="about-timeline-section mb-16 sm:mb-24 border-t border-white/8 pt-14 sm:pt-20">
          <SectionHeading eyebrow="Timeline" title="How We Got Here" />
          <div className="mt-10 sm:mt-12 flex flex-col gap-0 max-w-3xl">
            {milestones.map((m, i) => (
              <div key={m.year} className="about-timeline-item flex gap-6 sm:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-sm bg-surface border border-lime/40 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <span className="font-display font-bold text-xs text-lime">{m.year.slice(2)}</span>
                  </div>
                  {i < milestones.length - 1 && <div className="w-px bg-white/10 flex-1 my-2" />}
                </div>
                <div className="pb-10">
                  <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">{m.year}</div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-text mb-2">{m.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Space & Stats */}
        <div className="border-t border-white/8 pt-14 sm:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <SectionHeading
                eyebrow="The Space"
                title="A Place Worth Coming Back To"
                description="20 high-performance stations across 4 specialized zones. A full cafe menu. Monthly tournaments. And a community that keeps growing."
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[['20+', 'Gaming Stations'], ['4', 'Specialized Zones'], ['80+', 'Game Library'], ['₹50K+', 'Monthly Prize Pools']].map(([v, l]) => (
                  <div key={l} className="bg-surface border border-white/8 rounded p-5">
                    <div className="font-display font-bold text-2xl sm:text-3xl text-lime">{v}</div>
                    <div className="text-muted text-[11px] font-display font-medium uppercase tracking-wider mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-72 sm:h-80 rounded overflow-hidden bg-bg2 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1548003693-b55d51032288?w=800&h=600&fit=crop&auto=format"
                alt="Competitive players at Nexus"
                className="w-full h-full object-cover opacity-75"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-bg/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
