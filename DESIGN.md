# DESIGN SYSTEM — NEXUS GAMING CAFE

## Brand Personality
Premium gaming lounge + modern esports platform. Feels trustworthy, competitive, and sophisticated. NOT neon cyberpunk. 70% premium brand, 20% gaming identity, 10% futuristic edge.

## Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0B0D0F` | Page background |
| `--color-bg2` | `#111518` | Secondary background / sections |
| `--color-surface` | `#171C20` | Cards, panels |
| `--color-surface2` | `#1E2428` | Elevated cards, hover states |
| `--color-border` | `rgba(255,255,255,0.08)` | Hairline rules |
| `--color-text` | `#F5F5F2` | Primary text |
| `--color-muted` | `#A5AAA8` | Secondary text, labels |
| `--color-lime` | `#B7FF3C` | Primary CTA, active states, available |
| `--color-lime-dim` | `#96D424` | Lime hover |
| `--color-cyan` | `#39E7FF` | Gaming accent, highlights |
| `--color-purple` | `#8B5CF6` | Secondary accent, VIP |
| `--color-gold` | `#C9A84C` | Winners, champions, premium |
| `--color-available` | `#22C55E` | Available status |
| `--color-inuse` | `#EF4444` | In use status |
| `--color-reserved` | `#F59E0B` | Reserved status |
| `--color-maintenance` | `#6B7280` | Maintenance status |

## Typography

| Role | Family | Weight | Size (desktop) |
|---|---|---|---|
| Hero heading | Space Grotesk | 700 | 80–96px |
| Section heading | Space Grotesk | 700 | 48–64px |
| Sub-heading | Space Grotesk | 600 | 24–32px |
| Body | Inter | 400 | 16–18px |
| Small UI | Inter | 500 | 13–14px |
| Labels / Eyebrows | Space Grotesk | 500 | 11–12px, letter-spacing 0.1em |

Letter spacing: -0.02em on all headings. +0.1em on uppercase labels.

## Font Sizes (Tailwind scale)
- `text-[96px]` — hero display
- `text-6xl` (60px) — section hero
- `text-5xl` (48px) — section heading
- `text-3xl` (30px) — card title
- `text-xl` (20px) — sub-headings
- `text-base` (16px) — body
- `text-sm` (14px) — UI labels
- `text-xs` (12px) — tags, badges

## Spacing Scale
Follow Tailwind's 4px base scale. Key breakpoints:
- Section padding: `py-24` desktop, `py-16` mobile
- Container max-width: `max-w-7xl mx-auto px-6`
- Card padding: `p-6` standard, `p-8` hero cards
- Gap between elements: `gap-6` standard, `gap-12` section gaps

## Border Styles
- Hairline: `border border-[rgba(255,255,255,0.08)]`
- Accent border: `border-lime` (lime green, used sparingly)
- Left accent: `border-l-2 border-lime`
- No box shadows on dark bg — use border for elevation

## Radius Rules
- Cards: `rounded` (4px) — sharp, premium feel
- Buttons: `rounded` (4px) — no pill shapes
- Badges/tags: `rounded-sm` (2px)
- Avoid large radii (`rounded-xl`, `rounded-2xl`)

## Button Styles
- Primary: `bg-lime text-bg font-semibold font-display tracking-wide uppercase text-sm py-3 px-6 rounded hover:bg-lime-dim transition-colors`
- Outline: `border border-[rgba(255,255,255,0.2)] text-text font-medium text-sm py-3 px-6 rounded hover:border-white transition-colors`
- Ghost: `text-muted hover:text-text text-sm transition-colors`
- Danger: `bg-red-600 text-white`

## Card Styles
- Base: `bg-surface border border-[rgba(255,255,255,0.08)] rounded`
- Hover: `hover:bg-surface2 hover:border-[rgba(255,255,255,0.15)] transition-all`
- Featured: left border accent + slightly elevated bg
- Never: glassmorphism, heavy shadows, huge radius

## Status Colors
- AVAILABLE: lime green pill `bg-available/20 text-available`
- IN USE: red pill `bg-inuse/20 text-inuse`
- RESERVED: amber pill `bg-reserved/20 text-reserved`
- MAINTENANCE: gray pill `bg-maintenance/20 text-maintenance`

## Form Styles
- Input: `bg-surface border border-[rgba(255,255,255,0.1)] rounded text-text placeholder:text-muted py-3 px-4 focus:outline-none focus:border-lime/50 transition-colors`
- Label: `text-xs uppercase tracking-widest text-muted font-medium font-display`
- Error: red border + small error text below

## Table Styles
- Header: `text-xs uppercase tracking-widest text-muted font-medium`
- Row: `border-b border-[rgba(255,255,255,0.06)] hover:bg-surface2`
- Zebra: alternate `bg-surface` / transparent

## Navigation
- Sticky, backdrop-blur, `bg-bg/80` on scroll
- Font: Space Grotesk, font-medium, uppercase, tracking-wide, text-sm
- Active: text-lime
- Hover: text-text (from text-muted)
- Logo: Space Grotesk Bold, slightly larger
- CTA: Primary button, right-aligned

## Responsive Rules
- Mobile-first
- Single column stacks on `< 768px`
- Two column at `md:` (768px+)
- Three/four column at `lg:` (1024px+)
- Full layout at `xl:` (1280px+)
- Nav: hamburger below `md:`
- Tables: horizontal scroll or stacked cards on mobile

## Animation Rules
- Page enter: `opacity-0` → `opacity-100`, `translateY(20px)` → `translateY(0)`, 400ms ease-out
- Card hover: `translateY(-2px)`, 200ms ease
- Button hover: `background-color` 150ms ease
- Number counters: count up on scroll-enter
- NO: constant floating, particle effects, infinite loops
- Respect `prefers-reduced-motion`

## Do / Don't

### DO
- Use lime green (#B7FF3C) only for primary CTAs and key active states
- Use large, bold typography to create hierarchy
- Let content breathe — generous whitespace
- Keep cards angular (rounded, not rounded-xl)
- Use Unsplash gaming photos with dark overlay
- Use geometric borders and clean dividers
- Write real business copy (station IDs, real pricing, real schedule)

### DON'T
- Don't use glassmorphism (backdrop-blur cards with white borders)
- Don't use neon glow box-shadows everywhere
- Don't mix all accent colors in the same section
- Don't use rounded-xl or rounded-2xl on cards
- Don't use lorem ipsum placeholder text
- Don't use gradient hero backgrounds without photography
- Don't use more than 2 accent colors in a single section
- Don't use animations that block user interaction
