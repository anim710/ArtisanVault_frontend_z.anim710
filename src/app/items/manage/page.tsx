'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Protected } from '@/components/layout/Protected';
import { Button } from '@/components/ui/Button';
import { apiFetch } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import type { CraftPiece } from '@/types';

function ManageItems() {
  const [items, setItems] = useState<CraftPiece[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiFetch<{ items: CraftPiece[] }>('/crafts/manage/mine');
      setItems(data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(id: string) {
    if (!confirm('Delete this craft piece?')) return;
    try {
      await apiFetch(`/crafts/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-charcoal">Manage items</h1>
          <p className="mt-2 text-stone-500">
            View or delete your listings. Admins see every craft piece.
          </p>
        </div>
        <Link href="/items/add">
          <Button variant="secondary">Add piece</Button>
        </Link>
      </div>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
      {loading && <p className="mt-8 text-stone-500">Loading…</p>}

      {!loading && (
        <div className="mt-8 overflow-x-auto rounded-card border border-stone-200 bg-white shadow-card">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-500">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Material</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Lead time</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-stone-100">
                  <td className="px-4 py-3 font-medium text-charcoal">{item.title}</td>
                  <td className="px-4 py-3">{item.material}</td>
                  <td className="px-4 py-3">{formatPrice(item.price)}</td>
                  <td className="px-4 py-3">{item.leadTime}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/crafts/${item._id}`}>
                        <Button variant="ghost" className="!px-3 !py-1.5">
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="!px-3 !py-1.5"
                        onClick={() => remove(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-stone-500">
                    No listings yet.{' '}
                    <Link href="/items/add" className="text-walnut underline">
                      Add your first piece
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <Protected>
      <ManageItems />
    </Protected>
  );
}
