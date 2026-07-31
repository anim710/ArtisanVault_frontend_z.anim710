import Link from 'next/link';
import type { CraftPiece } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Star } from 'lucide-react';

export function CraftCard({ craft }: { craft: CraftPiece }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-stone-200 bg-white shadow-card">
      <div
        className="h-44 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${craft.imageUrls[0]})` }}
        role="img"
        aria-label={craft.title}
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-snug text-charcoal">{craft.title}</h3>
          <span className="shrink-0 text-sm font-semibold text-walnut">
            {formatPrice(craft.price)}
          </span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-stone-500">{craft.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-500">
          <span className="rounded-card bg-stone-100 px-2 py-1">{craft.material}</span>
          <span className="rounded-card bg-stone-100 px-2 py-1">{craft.category}</span>
          <span className="inline-flex items-center gap-1 rounded-card bg-stone-100 px-2 py-1">
            <Star size={12} className="text-sand" fill="currentColor" />
            {craft.averageRating.toFixed(1)}
          </span>
        </div>
        <p className="mt-2 text-xs text-stone-400">
          {craft.artisanName} · {craft.leadTime}
        </p>
        <div className="mt-auto pt-5">
          <Link href={`/crafts/${craft._id}`}>
            <Button className="w-full" variant="primary">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
