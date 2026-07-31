import { cn } from '@/lib/utils';
import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name ?? label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <label className="block space-y-1.5 text-sm" htmlFor={selectId}>
      {label && <span className="font-medium text-charcoal">{label}</span>}
      <select
        id={selectId}
        className={cn(
          'w-full rounded-card border border-stone-300 bg-white px-3.5 py-2.5 text-charcoal outline-none transition focus:border-walnut focus:ring-2 focus:ring-sand/40',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
