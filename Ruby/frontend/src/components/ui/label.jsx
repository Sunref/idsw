import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Label = forwardRef(function Label({ className, ...props }, ref) {
  return (
    <label
      ref={ref}
      className={cn('text-sm font-semibold uppercase tracking-wide text-white/80', className)}
      {...props}
    />
  );
});
