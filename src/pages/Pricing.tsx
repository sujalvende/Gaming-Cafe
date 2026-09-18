import { useState, useRef, useLayoutEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { pricingData } from '../data';
import { gsap } from '../lib/gsap';

const zones = [
  { id: 'pc', label: 'PC Zone', accent: 'text-lime', border: 'border-lime/20', bg: 'bg-lime/5', data: pricingData.pc, tag: null, features: ['RTX 4070 Super', 'i9-14900K', '32GB DDR5', '165Hz QHD Monitor', 'Mechanical Keyboard', 'SteelSeries Headset'] },
  { id: 'ps5', label: 'PS5 Arena', accent: 'text-cyan', border: 'border-cyan/20', bg: 'bg-cyan/5', data: pricingData.ps5, tag: null, features: ['PlayStation 5', '55" OLED 4K TV', 'DualSense Controllers', 'Surround Sound', 'PlayStation Plus', '80+ Game Library'] },
  { id: 'vip', label: 'VIP Room', accent: 'text-purple', border: 'border-purple/30', bg: 'bg-purple/5', data: pricingData.vip, tag: 'PREMIUM', features: ['RTX 4090', '32" 4K 240Hz', 'Herman Miller Chairs', 'Bose Soundbar', 'Private Lounge', 'Mini-Bar Access', 'Concierge Service'] },
  { id: 'bootcamp', label: 'Bootcamp Room', accent: 'text-gold', border: 'border-gold/20', bg: 'bg-gold/5', data: pricingData.bootcamp, tag: 'TEAM', features: ['RTX 4070 × 10', '240Hz Monitors', 'LAN-Ready', 'Team Headsets', 'Strategy Whiteboard', 'Match Recording'] },
];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Pricing() {
  const [activeZone, setActiveZone] = useState('pc');
  const zone = zones.find((z) => z.id === activeZone)!;
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.from('.pricing-header-anim', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.fromTo(
        '.pricing-panel-anim',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [activeZone]);

  return (
    <div ref={rootRef} className="pb-24 sm:pb-32" aria-label="Pricing and rates">
      {/* Header */}
      <div className="bg-bg2 border-b border-white/8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="container pricing-header-anim">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, Transparent Rates"
            description="No memberships required. Pay for exactly the time you play."
          />
        </div>
      </div>

      <div className="container pt-12 sm:pt-16">
        {/* Zone tabs rail */}
        <div className="overflow-x-auto no-scrollbar pb-1 mb-12 sm:mb-14" role="tablist" aria-label="Select gaming zone for pricing details">
          <div className="flex gap-2.5 min-w-max">
            {zones.map((z) => (
              <button
                key={z.id}
                role="tab"
                aria-selected={activeZone === z.id}
                aria-controls={`zone-panel-${z.id}`}
                onClick={() => setActiveZone(z.id)}
                className={`inline-flex items-center gap-2.5 font-display text-[11px] font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all min-h-[42px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                  activeZone === z.id
                    ? `${z.bg} ${z.accent} ${z.border} border shadow-md font-bold scale-[1.02]`
                    : 'bg-surface border border-white/10 text-muted hover:text-text hover:border-white/25 hover:bg-white/5'
                }`}
              >
                <span>{z.label}</span>
                {z.tag && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/12 font-bold tracking-wider flex-shrink-0 text-text">
                    {z.tag}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Zone detail */}
        <div id={`zone-panel-${zone.id}`} role="tabpanel" className="pricing-panel-anim grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Pricing table */}
          <div className="lg:col-span-2">
            <h2 className={`font-display font-bold text-2xl sm:text-3xl mb-7 ${zone.accent}`}>
              {zone.label}
            </h2>
            <div className={`border rounded-xl overflow-hidden ${zone.border} bg-surface card-glow`}>
              <div className={`${zone.bg} px-6 py-4 flex items-center justify-between border-b border-white/8`}>
                <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Duration
                </span>
                <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Rate (INR)
                </span>
              </div>
              <div className="divide-y divide-white/6">
                {zone.data.map((item, i) => (
                  <div
                    key={item.duration}
                    className={`px-6 py-4 flex items-center justify-between hover:bg-surface2/50 transition-colors ${
                      i % 2 === 0 ? 'bg-surface' : 'bg-surface2/20'
                    }`}
                  >
                    <span className="text-text text-sm font-medium">{item.duration}</span>
                    <span className={`font-display font-bold text-xl ${zone.accent}`}>
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to="/booking" size="md">
                Book {zone.label}
              </Button>
              <Button to="/availability" variant="outline" size="md">
                Check Availability
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-display font-bold text-base text-text mb-5">
              Included with {zone.label}
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {zone.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted">
                  <span
                    className={`w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 ${zone.bg} ${zone.accent}`}
                    aria-hidden="true"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                      <path d="M10.28 2.28L4 8.56 1.72 6.28A1 1 0 00.28 7.72l3 3a1 1 0 001.44 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 bg-surface border border-white/8 rounded-xl p-6 sm:p-7 text-sm text-muted">
              <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-3">
                Venue Amenities
              </div>
              <ul className="flex flex-col gap-2.5 text-xs leading-relaxed">
                <li className="flex items-center gap-2">
                  <span className="text-lime">✓</span> 1 Gbps dedicated low-latency fiber internet
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lime">✓</span> In-house cafe snacks & barista drinks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lime">✓</span> Secure lockers & sanitized peripherals
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lime">✓</span> Discord community & private match hosting
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Full comparison */}
        <div className="mt-24 mb-16 sm:mb-24 border-t border-white/8 pt-20">
          <SectionHeading eyebrow="Compare" title="All Zones at a Glance" align="center" />

          {/* Mobile View: Stacked Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {pricingData.pc.map((item, i) => (
              <div key={item.duration} className="bg-surface border border-white/8 rounded p-5 flex flex-col gap-3">
                <div className="font-display font-bold text-base text-text pb-2 border-b border-white/8">
                  {item.duration} Session
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-bg2/80 p-2.5 rounded border border-white/5">
                    <span className="text-muted block text-[10px] uppercase font-display font-medium">PC Zone</span>
                    <span className="font-display font-bold text-sm text-lime mt-0.5 block">₹{pricingData.pc[i]?.price || '—'}</span>
                  </div>
                  <div className="bg-bg2/80 p-2.5 rounded border border-white/5">
                    <span className="text-muted block text-[10px] uppercase font-display font-medium">PS5 Arena</span>
                    <span className="font-display font-bold text-sm text-cyan mt-0.5 block">₹{pricingData.ps5[i]?.price || '—'}</span>
                  </div>
                  <div className="bg-bg2/80 p-2.5 rounded border border-white/5">
                    <span className="text-muted block text-[10px] uppercase font-display font-medium">VIP Room</span>
                    <span className="font-display font-bold text-sm text-purple mt-0.5 block">₹{pricingData.vip[i]?.price || '—'}</span>
                  </div>
                  <div className="bg-bg2/80 p-2.5 rounded border border-white/5">
                    <span className="text-muted block text-[10px] uppercase font-display font-medium">Bootcamp</span>
                    <span className="font-display font-bold text-sm text-gold mt-0.5 block">₹{pricingData.bootcamp[i]?.price || '—'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table with sticky header */}
          <div className="mt-10 hidden md:block overflow-x-auto rounded border border-white/8 bg-surface">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-bg2 sticky top-0 z-10">
                  <th className="text-left py-4 px-6 font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                    Duration
                  </th>
                  {zones.map((z) => (
                    <th
                      key={z.id}
                      className={`text-right py-4 px-6 font-display text-[10px] font-semibold uppercase tracking-widest ${z.accent}`}
                    >
                      {z.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {pricingData.pc.map((item, i) => (
                  <tr
                    key={item.duration}
                    className={`hover:bg-surface2/50 transition-colors ${
                      i % 2 === 0 ? 'bg-transparent' : 'bg-surface2/20'
                    }`}
                  >
                    <td className="py-4 px-6 text-sm text-muted font-medium">{item.duration}</td>
                    <td className="py-4 px-6 text-right font-display font-semibold text-sm text-lime">
                      ₹{pricingData.pc[i]?.price || '—'}
                    </td>
                    <td className="py-4 px-6 text-right font-display font-semibold text-sm text-cyan">
                      ₹{pricingData.ps5[i]?.price || '—'}
                    </td>
                    <td className="py-4 px-6 text-right font-display font-semibold text-sm text-purple">
                      ₹{pricingData.vip[i]?.price || '—'}
                    </td>
                    <td className="py-4 px-6 text-right font-display font-semibold text-sm text-gold">
                      ₹{pricingData.bootcamp[i]?.price || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
