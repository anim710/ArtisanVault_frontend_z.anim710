import { cn } from '@/lib/utils';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const areaId = id ?? props.name;
  return (
    <label className="block space-y-1.5 text-sm">
      {label && <span className="font-medium text-charcoal">{label}</span>}
      <textarea
        id={areaId}
        className={cn(
          'w-full rounded-card border border-stone-300 bg-white px-3.5 py-2.5 text-charcoal outline-none transition focus:border-walnut focus:ring-2 focus:ring-sand/40',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
