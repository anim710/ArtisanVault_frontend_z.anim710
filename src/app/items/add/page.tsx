'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Protected } from '@/components/layout/Protected';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { apiFetch } from '@/lib/api';
import { CATEGORIES, MATERIALS, type CraftPiece } from '@/types';

function AddItemForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    artisanName: '',
    price: '',
    material: 'Walnut',
    category: 'Tables',
    dimensions: '',
    leadTime: '',
    imageUrl: '',
    customOrderAvailable: 'false',
  });

  function patch(partial: Partial<typeof form>) {
    setForm((prev) => ({ ...prev, ...partial }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiFetch<{ craft: CraftPiece }>('/crafts', {
        method: 'POST',
        body: {
          title: form.title,
          shortDescription: form.shortDescription,
          fullDescription: form.fullDescription,
          artisanName: form.artisanName,
          price: Number(form.price),
          material: form.material,
          category: form.category,
          dimensions: form.dimensions,
          leadTime: form.leadTime,
          imageUrls: [form.imageUrl],
          customOrderAvailable: form.customOrderAvailable === 'true',
        },
      });
      router.push(`/crafts/${data.craft._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create listing');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-charcoal">Add craft piece</h1>
      <p className="mt-2 text-stone-500">
        Publish a new listing with materials, dimensions, lead time, and photography URL.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-card border border-stone-200 bg-white p-6 shadow-card"
      >
        <Input
          label="Title"
          value={form.title}
          onChange={(e) => patch({ title: e.target.value })}
          required
        />
        <Input
          label="Short description"
          value={form.shortDescription}
          onChange={(e) => patch({ shortDescription: e.target.value })}
          required
        />
        <Textarea
          label="Full description"
          rows={5}
          value={form.fullDescription}
          onChange={(e) => patch({ fullDescription: e.target.value })}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Artisan name"
            value={form.artisanName}
            onChange={(e) => patch({ artisanName: e.target.value })}
            required
          />
          <Input
            label="Price (USD)"
            type="number"
            min={1}
            value={form.price}
            onChange={(e) => patch({ price: e.target.value })}
            required
          />
          <Select
            label="Material"
            value={form.material}
            onChange={(e) => patch({ material: e.target.value })}
            options={MATERIALS.map((m) => ({ value: m, label: m }))}
          />
          <Select
            label="Category"
            value={form.category}
            onChange={(e) => patch({ category: e.target.value })}
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
          <Input
            label="Dimensions"
            value={form.dimensions}
            onChange={(e) => patch({ dimensions: e.target.value })}
            required
          />
          <Input
            label="Lead time / shipping"
            value={form.leadTime}
            onChange={(e) => patch({ leadTime: e.target.value })}
            required
          />
        </div>
        <Input
          label="Image URL"
          type="url"
          placeholder="https://…"
          value={form.imageUrl}
          onChange={(e) => patch({ imageUrl: e.target.value })}
          required
        />
        <Select
          label="Custom order available"
          value={form.customOrderAvailable}
          onChange={(e) => patch({ customOrderAvailable: e.target.value })}
          options={[
            { value: 'false', label: 'No — finished piece' },
            { value: 'true', label: 'Yes — custom orders open' },
          ]}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Publishing…' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default function AddItemPage() {
  return (
    <Protected>
      <AddItemForm />
    </Protected>
  );
}
