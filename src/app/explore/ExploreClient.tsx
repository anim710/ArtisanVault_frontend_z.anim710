'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import type { CraftListResponse } from '@/types';
import {
  CraftFilters,
  type CraftFilterState,
} from '@/components/crafts/CraftFilters';
import { CraftGrid } from '@/components/crafts/CraftGrid';
import { Button } from '@/components/ui/Button';

const defaults: CraftFilterState = {
  search: '',
  material: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  customOrder: '',
  sort: 'newest',
};

export default function ExploreClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<CraftFilterState>({
    ...defaults,
    category: searchParams.get('category') ?? '',
    material: searchParams.get('material') ?? '',
  });
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CraftListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.material) params.set('material', filters.material);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.customOrder) params.set('customOrder', filters.customOrder);
    if (filters.sort) params.set('sort', filters.sort);
    params.set('page', String(page));
    params.set('limit', '8');
    return params.toString();
  }, [filters, page]);

  useEffect(() => {
    setLoading(true);
    setError('');
    const handle = setTimeout(() => {
      apiFetch<CraftListResponse>(`/crafts?${queryString}`, { auth: false })
        .then(setData)
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(handle);
  }, [queryString]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-charcoal">Explore crafts</h1>
      <p className="mt-2 max-w-2xl text-stone-500">
        Filter by material, category, price, and custom-order status. Sort and paginate results.
      </p>

      <div className="mt-8">
        <CraftFilters
          value={filters}
          onChange={(next) => {
            setPage(1);
            setFilters(next);
          }}
          onReset={() => {
            setPage(1);
            setFilters(defaults);
          }}
        />
      </div>

      {error && (
        <p className="mt-6 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8">
        <CraftGrid items={data?.items ?? []} loading={loading} />
      </div>

      {data && data.pagination.totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-stone-500">
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <Button
            variant="ghost"
            disabled={page >= data.pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
