import React from 'react';
import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-[#F7931A] text-black hover:bg-[#f5a623]',
  outline: 'border border-white/10 bg-transparent hover:bg-white/5',
  ghost: 'bg-transparent hover:bg-white/5',
};

const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-11 px-8',
};

export const Button = React.forwardRef(function Button(
  { className, variant = 'default', size = 'default', type, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type || 'button'}
      className={cn(
        'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
        variants[variant] || variants.default,
        sizes[size] || sizes.default,
        className
      )}
      {...props}
    />
  );
});
