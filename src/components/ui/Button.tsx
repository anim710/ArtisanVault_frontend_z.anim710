import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const styles: Record<Variant, string> = {
  primary:
    'bg-walnut text-stone-50 hover:bg-walnut-soft focus-visible:ring-sand',
  secondary:
    'bg-sand text-charcoal hover:bg-sand-soft focus-visible:ring-walnut',
  ghost:
    'bg-transparent text-charcoal border border-stone-300 hover:border-walnut hover:text-walnut',
  danger:
    'bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-400',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-card px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
