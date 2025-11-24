import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef(function Input({ className, type = 'text', ...props }, ref) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/60 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
