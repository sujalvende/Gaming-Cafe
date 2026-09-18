import { useState, useRef, useLayoutEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { games, type GameGenre } from '../data';
import { gsap, ScrollTrigger } from '../lib/gsap';

const genres: (GameGenre | 'ALL')[] = ['ALL', 'FPS', 'MOBA', 'SPORTS', 'RACING', 'FIGHTING', 'CO-OP', 'BATTLE ROYALE'];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Games() {
  const [activeGenre, setActiveGenre] = useState<GameGenre | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = games.filter((g) => {
    const matchGenre = activeGenre === 'ALL' || g.genre === activeGenre;
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.genre.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      // Animate header and search bar
      gsap.from('.games-header-anim', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Animate cards on filter change / initial load
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.04,
            ease: 'power2.out',
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [activeGenre, search === '']);

  return (
    <div ref={rootRef} className="pb-24 min-h-screen" aria-label="Game library">
      {/* Header */}
      <div className="bg-bg2 border-b border-white/8 pt-16 pb-12 sm:pt-20 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="games-header-anim">
            <SectionHeading
              eyebrow="Game Library"
              title="80+ Games Available"
              description="From tactical FPS to open-world epics. Browse the full library — PC and PS5."
            />
          </div>
          {/* Search */}
          <div className="mt-8 relative w-full max-w-md games-header-anim">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="game-search"
              type="search"
              placeholder="Search by title or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-surface border border-white/10 rounded pl-11 pr-4 py-3 text-sm text-text placeholder:text-muted/70 focus:outline-none focus:border-lime/60 focus:ring-1 focus:ring-lime/40 transition-colors w-full"
              aria-label="Search games"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-8 sm:mt-10">
        {/* Genre filter rail */}
        <div className="overflow-x-auto no-scrollbar pb-2 mb-6" role="group" aria-label="Filter by genre">
          <div className="flex gap-2 min-w-max">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                className={`font-display text-[11px] font-semibold uppercase tracking-widest px-4 py-2.5 rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 min-h-[40px] cursor-pointer ${
                  activeGenre === g
                    ? 'bg-lime text-bg shadow-sm'
                    : 'bg-surface border border-white/10 text-muted hover:border-white/25 hover:text-text'
                }`}
                aria-pressed={activeGenre === g}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div
          className="text-muted text-xs font-display uppercase tracking-widest mb-6"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {filtered.length} game{filtered.length !== 1 ? 's' : ''} found
        </div>

        {/* Game grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 border border-white/8 rounded bg-surface/50" role="status">
            <div className="w-14 h-14 rounded-sm bg-surface2 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-display font-bold text-xl text-text mb-2">No Games Found</h3>
            <p className="text-muted text-sm">Try adjusting your search query or selecting another genre filter.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((game) => (
              <article
                key={game.id}
                className="group bg-surface border border-white/8 rounded overflow-hidden hover:border-white/25 transition-all duration-200 flex flex-col justify-between"
              >
                {/* Image */}
                <div>
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-[1.04] transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-bg/90 text-cyan font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm backdrop-blur-xs">
                        {game.genre}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`font-display text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm border backdrop-blur-xs ${
                          game.available
                            ? 'bg-available/15 text-available border-available/30'
                            : 'bg-inuse/15 text-inuse border-inuse/30'
                        }`}
                      >
                        {game.available ? 'Active' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <h3 className="font-display font-bold text-sm sm:text-base text-text mb-1.5 leading-tight">{game.name}</h3>
                    <p className="text-muted text-xs leading-relaxed mb-3 line-clamp-2">{game.description}</p>
                  </div>
                </div>
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-auto">
                  <div className="flex flex-wrap gap-1">
                    {game.platform.map((p) => (
                      <span
                        key={p}
                        className="font-display text-[9px] font-medium bg-surface2 text-muted px-2 py-0.5 rounded-sm uppercase tracking-wide"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  {game.rating && (
                    <span className="text-gold text-xs font-semibold flex-shrink-0 ml-1">{game.rating}★</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
