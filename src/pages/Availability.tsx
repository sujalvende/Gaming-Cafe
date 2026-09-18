import { useState, useRef, useLayoutEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import { zones, type Zone } from '../data';
import { gsap } from '../lib/gsap';

const statusFilters = ['All', 'Available', 'In Use', 'Reserved', 'Maintenance'] as const;

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Availability() {
  const [activeZone, setActiveZone] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const rootRef = useRef<HTMLDivElement>(null);

  const visibleZones: Zone[] = activeZone === 'all' ? zones : zones.filter(z => z.id === activeZone);

  const filterStation = (status: string) => {
    if (statusFilter === 'All') return true;
    const map: Record<string, string> = { 'Available': 'available', 'In Use': 'in-use', 'Reserved': 'reserved', 'Maintenance': 'maintenance' };
    return status === map[statusFilter];
  };

  const totalAvailable = zones.reduce((acc, z) => acc + z.stations.filter(s => s.status === 'available').length, 0);
  const totalStations = zones.reduce((acc, z) => acc + z.stations.length, 0);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.from('.avail-header-anim', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      gsap.fromTo(
        '.avail-zone-section',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [activeZone, statusFilter]);

  return (
    <div ref={rootRef} className="pb-24 sm:pb-32" aria-label="Live Station Availability">
      {/* Header */}
      <div className="bg-bg2 border-b border-white/8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="container avail-header-anim">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-10">
            <SectionHeading
              eyebrow="Live Availability"
              title="Station Status"
              description="See what's free before you walk in. Updated in real-time."
            />
            <div className="flex items-center gap-5 bg-surface/60 border border-white/10 rounded-xl px-6 py-5 w-fit md:self-end backdrop-blur-sm card-glow">
              <div className="w-3 h-3 rounded-full bg-available animate-pulse shadow-[0_0_12px_#22C55E]" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-3xl sm:text-4xl text-lime stat-num tracking-tight" aria-live="polite">
                  {totalAvailable}<span className="text-muted/60 text-2xl font-normal">/{totalStations}</span>
                </span>
                <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Stations Available Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pt-12 sm:pt-16">
        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
          {/* Zone filters rail */}
          <div className="overflow-x-auto no-scrollbar pb-1" role="group" aria-label="Filter by gaming zone">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setActiveZone('all')}
                aria-pressed={activeZone === 'all'}
                className={`inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                  activeZone === 'all'
                    ? 'bg-lime text-bg font-bold shadow-[0_0_16px_rgba(183,255,60,0.25)]'
                    : 'bg-surface border border-white/10 text-muted hover:text-text hover:border-white/25'
                }`}
              >
                <span>All Zones</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeZone === 'all' ? 'bg-bg/20 text-bg' : 'bg-white/10 text-muted'}`}>
                  {zones.length}
                </span>
              </button>
              {zones.map((z) => {
                const freeCount = z.stations.filter((s) => s.status === 'available').length;
                return (
                  <button
                    key={z.id}
                    onClick={() => setActiveZone(z.id)}
                    aria-pressed={activeZone === z.id}
                    className={`inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-widest px-4 py-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                      activeZone === z.id
                        ? 'bg-lime text-bg font-bold shadow-[0_0_16px_rgba(183,255,60,0.25)]'
                        : 'bg-surface border border-white/10 text-muted hover:text-text hover:border-white/25'
                    }`}
                  >
                    <span>{z.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeZone === z.id ? 'bg-bg/20 text-bg' : 'bg-white/10 text-muted'}`}>
                      {freeCount}/{z.stations.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by station status">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                aria-pressed={statusFilter === f}
                className={`font-display text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                  statusFilter === f
                    ? 'bg-surface2 text-text border border-white/25 shadow-xs'
                    : 'text-muted hover:text-text hover:bg-surface/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7 mb-12 py-4 px-5 bg-surface/40 border border-white/5 rounded-xl">
          {[
            { status: 'available', label: 'Available', bg: 'bg-available' },
            { status: 'in-use', label: 'In Use', bg: 'bg-inuse' },
            { status: 'reserved', label: 'Reserved', bg: 'bg-reserved' },
            { status: 'maintenance', label: 'Maintenance', bg: 'bg-maintenance' },
          ].map(({ status, label, bg }) => (
            <div key={status} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${bg}`} aria-hidden="true" />
              <span className="text-muted text-xs font-display font-medium uppercase tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Zone sections */}
        <div className="flex flex-col gap-16 sm:gap-20">
          {visibleZones.map((zone) => {
            const filtered = zone.stations.filter((s) => filterStation(s.status));
            const avail = zone.stations.filter((s) => s.status === 'available').length;
            return (
              <section key={zone.id} className="avail-zone-section" aria-labelledby={`zone-heading-${zone.id}`}>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <h2 id={`zone-heading-${zone.id}`} className="font-display font-bold text-xl sm:text-2xl text-text">
                      {zone.name}
                    </h2>
                    <span
                      className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-sm border ${
                        avail > 0
                          ? 'bg-available/10 text-available border-available/20'
                          : 'bg-inuse/10 text-inuse border-inuse/20'
                      }`}
                    >
                      {avail}/{zone.stations.length} free
                    </span>
                  </div>
                  <Button to="/booking" size="sm" variant="outline">
                    Book Zone
                  </Button>
                </div>

                {filtered.length === 0 ? (
                  <div className="py-12 px-4 text-center border border-white/8 rounded bg-surface/20">
                    <svg
                      className="w-8 h-8 text-muted mx-auto mb-2 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-muted text-sm">No stations match the selected filter in this zone.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-5 mb-4">
                    {filtered.map((station) => (
                      <article
                        key={station.id}
                        className={`bg-surface border rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between hover-lift ${
                          station.status === 'available'
                            ? 'border-available/30 hover:border-available/60 hover:bg-surface2/90 shadow-[0_0_12px_rgba(34,197,94,0.08)]'
                            : 'border-white/8 opacity-85 hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-display font-bold text-sm text-text truncate">
                              {station.name}
                            </span>
                            <span
                              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                station.status === 'available'
                                  ? 'bg-available animate-pulse shadow-[0_0_8px_#22C55E]'
                                  : station.status === 'in-use'
                                  ? 'bg-inuse'
                                  : station.status === 'reserved'
                                  ? 'bg-reserved'
                                  : 'bg-maintenance'
                              }`}
                              aria-hidden="true"
                            />
                          </div>
                          <StatusBadge status={station.status} size="sm" />
                          {station.currentUser && (
                            <p className="text-muted text-[10px] mt-2 truncate font-mono">
                              {station.currentUser}
                            </p>
                          )}
                          {station.reservedAt && (
                            <p className="text-reserved text-[10px] mt-2 font-medium">
                              From {station.reservedAt}
                            </p>
                          )}
                        </div>
                        {station.status === 'available' && (
                          <Button
                            to="/booking"
                            size="sm"
                            className="mt-4 !text-[10px] !py-2 !px-2 w-full shadow-xs"
                          >
                            Book Station
                          </Button>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
