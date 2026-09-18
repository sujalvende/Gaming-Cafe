import { forwardRef } from 'react';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  accentColor?: 'lime' | 'gold' | 'cyan' | 'purple';
}

const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  function SectionHeading({
    id,
    eyebrow,
    title,
    description,
    align = 'left',
    accentColor = 'lime',
  }, ref) {
    const centerCls = align === 'center' ? 'text-center items-center' : '';
    const accentMap = {
      lime:   'text-lime',
      gold:   'text-gold',
      cyan:   'text-cyan',
      purple: 'text-purple',
    };

    return (
      <div ref={ref} className={`flex flex-col gap-3 ${centerCls}`}>
        {eyebrow && (
          <span className={`font-display text-[11px] font-semibold uppercase tracking-[0.15em] ${accentMap[accentColor]}`}>
            {eyebrow}
          </span>
        )}
        <h2
          id={id}
          className="font-display font-bold text-text"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
        >
          {title}
        </h2>
        {description && (
          <p className={`text-muted text-base leading-relaxed ${align === 'center' ? 'max-w-[52ch] mx-auto' : 'max-w-[52ch]'}`}>
            {description}
          </p>
        )}
      </div>
    );
  }
);

export default SectionHeading;
