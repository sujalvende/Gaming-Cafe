import type { StationStatus } from '../data';

interface StatusBadgeProps {
  status: StationStatus;
  size?: 'sm' | 'md';
}

const config: Record<StationStatus, { label: string; dot: string; bg: string; text: string }> = {
  available: { label: 'AVAILABLE', dot: 'bg-available', bg: 'bg-available/10', text: 'text-available' },
  'in-use': { label: 'IN USE', dot: 'bg-inuse', bg: 'bg-inuse/10', text: 'text-inuse' },
  reserved: { label: 'RESERVED', dot: 'bg-reserved', bg: 'bg-reserved/10', text: 'text-reserved' },
  maintenance: { label: 'MAINTENANCE', dot: 'bg-maintenance', bg: 'bg-maintenance/10', text: 'text-maintenance' },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-sm font-display font-medium tracking-widest ${c.bg} ${c.text} ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1'}`}>
      <span className={`rounded-full flex-shrink-0 ${c.dot} ${size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
      {c.label}
    </span>
  );
}
