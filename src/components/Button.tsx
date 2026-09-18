import { ReactNode, forwardRef } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
  'aria-label'?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-widest transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 active:scale-[0.97]';

const variants = {
  primary: 'bg-lime text-bg hover:bg-lime-dim',
  outline: 'border border-white/20 text-text hover:border-white/50 hover:bg-white/5',
  ghost:   'text-muted hover:text-text',
  danger:  'bg-red-600 text-white hover:bg-red-700',
};

// Real horizontal padding — buttons must feel like buttons, not text with borders
const sizes = {
  sm: 'text-[11px] py-2 px-5 rounded',
  md: 'text-xs py-3 px-7 rounded',
  lg: 'text-sm py-4 px-10 rounded',
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    onClick,
    type = 'button',
    disabled,
    loading,
    className = '',
    fullWidth,
    'aria-label': ariaLabel,
  }, _ref) {
    const cls = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    const content = loading ? (
      <>
        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span>Loading…</span>
      </>
    ) : (
      children
    );

    if (to) return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );

    if (href) return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {content}
      </a>
    );

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={cls}
        aria-label={ariaLabel}
        aria-busy={loading}
      >
        {content}
      </button>
    );
  }
);

export default Button;
