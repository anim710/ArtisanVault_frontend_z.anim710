'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import type { CraftListResponse } from '@/types';
import { CraftCard } from '@/components/crafts/CraftCard';
import { CraftSkeleton } from '@/components/crafts/CraftSkeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function HighlightsSection() {
  const [items, setItems] = useState<CraftListResponse['items']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<CraftListResponse>('/crafts?sort=rating&limit=4', { auth: false })
      .then((data) => setItems(data.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-stone-100 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-charcoal md:text-4xl">
              Marketplace highlights
            </h2>
            <p className="mt-3 max-w-xl text-stone-500">
              Highest-rated pieces currently available from ArtisanVault makers.
            </p>
          </div>
          <Link href="/explore">
            <Button variant="ghost">View all</Button>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => <CraftSkeleton key={i} />)}
          {!loading && items.map((craft) => <CraftCard key={craft._id} craft={craft} />)}
          {!loading && items.length === 0 && (
            <p className="col-span-full text-stone-500">
              Start the API and seed data to see live highlights.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
