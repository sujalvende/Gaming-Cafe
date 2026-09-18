import { useState, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { tournaments, winners } from '../data';
import { gsap } from '../lib/gsap';

type Filter = 'all' | 'upcoming' | 'completed';

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Tournaments() {
  const [filter, setFilter] = useState<Filter>('all');
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = tournaments.filter((t) => filter === 'all' || t.status === filter);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.tournaments-header-anim', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Cards staggered reveal
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={rootRef} className="pb-24 min-h-screen" aria-label="Competitive Tournaments">
      {/* Header */}
      <div className="bg-bg2 border-b border-white/8 pt-16 pb-12 sm:pt-20 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto tournaments-header-anim">
          <SectionHeading
            eyebrow="Tournaments"
            title="Compete. Win. Repeat."
            description="Join Nexus's competitive circuit. Open registration, real prize pools, no pay-to-win."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-8 sm:mt-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10" role="group" aria-label="Filter tournaments by status">
          {(['all', 'upcoming', 'completed'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`font-display text-[11px] font-semibold uppercase tracking-widest px-4 py-2.5 rounded transition-all min-h-[40px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                filter === f
                  ? 'bg-lime text-bg shadow-sm'
                  : 'bg-surface border border-white/10 text-muted hover:text-text hover:border-white/25'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tournament cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 px-4 border border-white/8 rounded bg-surface/30" role="status">
            <svg
              className="w-12 h-12 text-muted mx-auto mb-4 opacity-40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.003 0V8.25m-5.003 6V8.25m0 0A3.75 3.75 0 0112 4.5a3.75 3.75 0 013.75 3.75m-7.5 0h7.5" />
            </svg>
            <h3 className="font-display font-bold text-xl text-text mb-2">No Tournaments</h3>
            <p className="text-muted text-sm max-w-[40ch] mx-auto">
              No tournaments in this category right now. Check back soon for upcoming schedule announcements.
            </p>
          </div>
        ) : (
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 sm:mb-20">
            {filtered.map((t) => {
              const slotsLeft = t.maxTeams - t.registeredTeams;
              const pct = (t.registeredTeams / t.maxTeams) * 100;
              const isFull = slotsLeft === 0;
              return (
                <article
                  key={t.id}
                  className="bg-surface border border-white/8 rounded overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-bg2">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="bg-bg/90 backdrop-blur-xs text-cyan font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-cyan/20">
                          {t.game}
                        </span>
                        <span className="bg-bg/90 backdrop-blur-xs text-muted font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm border border-white/10">
                          {t.playersPerTeam === 1 ? 'Solo' : `${t.playersPerTeam}v${t.playersPerTeam}`}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span
                          className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm border backdrop-blur-xs ${
                            t.registrationStatus === 'open' && !isFull
                              ? 'bg-available/15 text-available border-available/30'
                              : 'bg-inuse/15 text-inuse border-inuse/30'
                          }`}
                        >
                          {isFull ? 'Full' : t.registrationStatus === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-text mb-2">
                        {t.name}
                      </h3>
                      <p className="text-muted text-sm mb-5 line-clamp-2 leading-relaxed">
                        {t.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-5 py-4 border-y border-white/8">
                        <div>
                          <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                            Date
                          </div>
                          <div className="text-sm text-text font-medium mt-0.5">
                            {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                        <div>
                          <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                            Time
                          </div>
                          <div className="text-sm text-text font-medium mt-0.5">{t.time}</div>
                        </div>
                        <div>
                          <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                            Entry
                          </div>
                          <div className="text-sm text-text font-medium mt-0.5">₹{t.entryFee}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                            Prize Pool
                          </div>
                          <div className="font-display font-bold text-xl text-gold">
                            ₹{t.prizePool.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted">
                            Format
                          </div>
                          <div className="text-sm text-text font-medium mt-0.5">{t.format}</div>
                        </div>
                      </div>

                      {/* Capacity */}
                      <div>
                        <div className="flex justify-between text-[11px] font-display uppercase tracking-wide mb-1.5">
                          <span className="text-muted">{t.registeredTeams}/{t.maxTeams} teams registered</span>
                          <span className={slotsLeft <= 3 ? 'text-reserved font-semibold' : 'text-muted'}>
                            {slotsLeft} slots left
                          </span>
                        </div>
                        <div className="h-1.5 bg-surface2 rounded-full overflow-hidden" aria-hidden="true">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              pct >= 90 ? 'bg-inuse' : pct >= 70 ? 'bg-reserved' : 'bg-lime'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 flex gap-3">
                    <Link
                      to={`/tournaments/${t.id}`}
                      className="flex-1 flex items-center justify-center border border-white/20 text-text font-display font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded hover:border-white/40 hover:bg-white/5 transition-all active:scale-[0.97] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 cursor-pointer"
                    >
                      View Details
                    </Link>
                    {t.registrationStatus === 'open' && !isFull && (
                      <Link
                        to={`/tournaments/${t.id}#register`}
                        className="flex-1 flex items-center justify-center bg-lime text-bg font-display font-bold text-xs uppercase tracking-widest py-3 px-4 rounded hover:bg-lime-dim transition-all active:scale-[0.97] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 cursor-pointer"
                      >
                        Register Now
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Past Winners */}
        <section className="border-t border-white/8 pt-14 sm:pt-16" aria-labelledby="winners-heading">
          <SectionHeading
            eyebrow="Champions Archive"
            title="Past Winners"
            description="The legends who competed and took the championship at Nexus."
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {winners.map((w) => (
              <article
                key={w.id}
                className="bg-surface border border-gold/20 rounded p-5 sm:p-6 hover:border-gold/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-gold">
                    {w.position === 1 ? '🥇 1st Place' : w.position === 2 ? '🥈 2nd Place' : '🥉 3rd Place'}
                  </span>
                  <span className="font-display font-bold text-sm text-gold">
                    ₹{w.prize.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="font-display text-[10px] font-semibold uppercase tracking-widest text-muted mb-1">
                  {w.tournamentName}
                </div>
                <h4 className="font-display font-bold text-lg text-text mb-2">{w.teamName}</h4>
                <div className="text-muted text-xs leading-relaxed">{w.players.join(', ')}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
