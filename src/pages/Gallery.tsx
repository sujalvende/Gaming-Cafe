import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { galleryImages } from '../data';
import { gsap } from '../lib/gsap';

const categories = ['All', 'PC Zone', 'PS5 Zone', 'Players', 'Teams', 'Competition', 'Setup'];

const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = galleryImages.filter(img => activeCategory === 'All' || img.category === activeCategory);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useLayoutEffect(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.from('.gallery-header-anim', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      });

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 20, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div ref={rootRef} className="pb-24 min-h-screen" aria-label="Nexus Gaming Gallery">
      {/* Header */}
      <div className="bg-bg2 border-b border-white/8 pt-16 pb-12 sm:pt-20 sm:pb-16 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto gallery-header-anim">
          <SectionHeading
            eyebrow="Gallery"
            title="Life at Nexus"
            description="Real moments from the sessions, tournaments, and communities that make Nexus home."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-8 sm:mt-10">
        {/* Category filter rail */}
        <div className="overflow-x-auto no-scrollbar pb-1 mb-8 sm:mb-10" role="group" aria-label="Filter gallery by category">
          <div className="flex gap-2 min-w-max">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                aria-pressed={activeCategory === c}
                className={`font-display text-[11px] font-semibold uppercase tracking-widest px-4 py-2.5 rounded transition-all min-h-[40px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 ${
                  activeCategory === c
                    ? 'bg-lime text-bg shadow-sm'
                    : 'bg-surface border border-white/10 text-muted hover:text-text hover:border-white/25'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(img => (
            <button
              key={img.id}
              onClick={() => setLightbox(img.src)}
              className="group block bg-surface border border-white/8 rounded overflow-hidden hover:border-white/25 transition-all cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime/50"
            >
              <div className="relative overflow-hidden aspect-[16/11]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3.5 left-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-text bg-bg/85 backdrop-blur-xs px-2.5 py-1 rounded-sm border border-white/10">
                    {img.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-sm bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-surface">
                <p className="text-muted text-xs leading-relaxed line-clamp-1">{img.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 bg-bg/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-11 h-11 rounded-sm bg-surface border border-white/20 flex items-center justify-center text-text hover:text-lime transition-colors cursor-pointer"
            onClick={() => setLightbox(null)}
            aria-label="Close image preview"
          >
            ✕
          </button>
          <img
            src={lightbox.replace('w=800&h=600', 'w=1400&h=900')}
            alt="Expanded gallery view"
            className="max-h-[85vh] max-w-full rounded object-contain shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
