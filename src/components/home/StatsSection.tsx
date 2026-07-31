'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { apiFetch } from '@/lib/api';
import type { CraftListResponse } from '@/types';

const fallback = [
  { name: 'Walnut', count: 2 },
  { name: 'Steel', count: 2 },
  { name: 'Marble', count: 2 },
  { name: 'Ceramic', count: 2 },
];

export function StatsSection() {
  const [data, setData] = useState(fallback);
  const [total, setTotal] = useState(8);

  useEffect(() => {
    apiFetch<CraftListResponse>('/crafts?limit=24', { auth: false })
      .then((res) => {
        setTotal(res.pagination.total);
        const counts: Record<string, number> = {};
        res.items.forEach((item) => {
          counts[item.material] = (counts[item.material] ?? 0) + 1;
        });
        const chart = Object.entries(counts).map(([name, count]) => ({ name, count }));
        if (chart.length) setData(chart);
      })
      .catch(() => undefined);
  }, []);

  return (
    <section className="bg-walnut py-20 text-stone-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Craft by the numbers</h2>
          <p className="mt-3 text-stone-200">
            Live inventory across walnut, steel, marble, and ceramic—updated as makers list new work.
          </p>
          <p className="mt-8 font-display text-5xl text-sand">{total}+</p>
          <p className="text-sm uppercase tracking-wider text-stone-300">Active listings</p>
        </div>
        <div className="h-64 rounded-card bg-walnut-deep/40 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#E7E5E4" fontSize={12} />
              <YAxis allowDecimals={false} stroke="#E7E5E4" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: '#1C1917',
                  border: '1px solid #F59E0B',
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="count" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
