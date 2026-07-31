'use client';

import { CATEGORIES, MATERIALS } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export interface CraftFilterState {
  search: string;
  material: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  customOrder: string;
  sort: string;
}

interface Props {
  value: CraftFilterState;
  onChange: (next: CraftFilterState) => void;
  onReset: () => void;
}

export function CraftFilters({ value, onChange, onReset }: Props) {
  function patch(partial: Partial<CraftFilterState>) {
    onChange({ ...value, ...partial });
  }

  return (
    <div className="rounded-card border border-stone-200 bg-white p-5 shadow-card">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Search"
          placeholder="Title, artisan…"
          value={value.search}
          onChange={(e) => patch({ search: e.target.value })}
        />
        <Select
          label="Material"
          value={value.material}
          onChange={(e) => patch({ material: e.target.value })}
          options={[
            { value: '', label: 'All materials' },
            ...MATERIALS.map((m) => ({ value: m, label: m })),
          ]}
        />
        <Select
          label="Category"
          value={value.category}
          onChange={(e) => patch({ category: e.target.value })}
          options={[
            { value: '', label: 'All categories' },
            ...CATEGORIES.map((c) => ({ value: c, label: c })),
          ]}
        />
        <Select
          label="Sort"
          value={value.sort}
          onChange={(e) => patch({ sort: e.target.value })}
          options={[
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'price_asc', label: 'Price: Low to High' },
            { value: 'price_desc', label: 'Price: High to Low' },
            { value: 'rating', label: 'Top rated' },
          ]}
        />
        <Input
          label="Min price"
          type="number"
          min={0}
          value={value.minPrice}
          onChange={(e) => patch({ minPrice: e.target.value })}
        />
        <Input
          label="Max price"
          type="number"
          min={0}
          value={value.maxPrice}
          onChange={(e) => patch({ maxPrice: e.target.value })}
        />
        <Select
          label="Custom order"
          value={value.customOrder}
          onChange={(e) => patch({ customOrder: e.target.value })}
          options={[
            { value: '', label: 'Any' },
            { value: 'true', label: 'Available' },
            { value: 'false', label: 'Finished only' },
          ]}
        />
        <div className="flex items-end">
          <Button type="button" variant="ghost" className="w-full" onClick={onReset}>
            Reset filters
          </Button>
        </div>
      </div>
    </div>
  );
}
