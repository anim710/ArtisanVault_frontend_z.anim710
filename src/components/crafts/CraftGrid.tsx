import type { CraftPiece } from '@/types';
import { CraftCard } from './CraftCard';
import { CraftSkeleton } from './CraftSkeleton';

export function CraftGrid({
  items,
  loading,
}: {
  items: CraftPiece[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CraftSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <p className="rounded-card border border-dashed border-stone-300 bg-stone-50 p-10 text-center text-stone-500">
        No craft pieces match these filters. Try widening price or material.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((craft) => (
        <CraftCard key={craft._id} craft={craft} />
      ))}
    </div>
  );
}
