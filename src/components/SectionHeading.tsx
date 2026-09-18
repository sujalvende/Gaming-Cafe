import { forwardRef } from 'react';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  accentColor?: 'lime' | 'gold' | 'cyan' | 'purple';
  className?: string;
}

const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  function SectionHeading({
    id,
    eyebrow,
    title,
    description,
    align = 'left',
    accentColor = 'lime',
    className = '',
  }, ref) {
    const centerCls = align === 'center' ? 'text-center items-center' : '';
    const accentMap = {
      lime:   'text-lime',
      gold:   'text-gold',
      cyan:   'text-cyan',
      purple: 'text-purple',
    };

    return (
      <div ref={ref} className={`flex flex-col ${centerCls} ${className}`}>
        {eyebrow && (
          <span className={`font-display text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] pt-1 sm:pt-2 mb-4 sm:mb-5 ${accentMap[accentColor]}`}>
            {eyebrow}
          </span>
        )}
        <h2
          id={id}
          className={`font-display font-bold text-text ${description ? 'mb-4 sm:mb-5' : ''}`}
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
        >
          {title}
        </h2>
        {description && (
          <p className={`text-muted text-base sm:text-lg leading-relaxed ${align === 'center' ? 'max-w-[54ch] mx-auto' : 'max-w-[54ch]'}`}>
            {description}
          </p>
        )}
      </div>
    );
  }
);

export default SectionHeading;

