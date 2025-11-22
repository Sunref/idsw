import { cn } from '../../lib/utils';

const VARIANTS = {
  success: 'bg-emerald-400/20 text-emerald-200 border-emerald-300/30',
  warning: 'bg-amber-400/20 text-amber-100 border-amber-300/30',
  danger: 'bg-red-500/20 text-red-100 border-red-400/30',
  default: 'bg-white/10 text-white border-white/20',
};

export function Badge({ variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        VARIANTS[variant] ?? VARIANTS.default,
        className,
      )}
      {...props}
    />
  );
}
