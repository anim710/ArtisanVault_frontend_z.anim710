'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Protected } from '@/components/layout/Protected';
import { apiFetch } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import type { StatsOverview } from '@/types';
import { useAuth } from '@/lib/auth';

function DashboardContent() {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsOverview | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<StatsOverview>('/stats/overview')
      .then(setStats)
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-charcoal">Dashboard</h1>
      <p className="mt-2 text-stone-500">
        Welcome back, {user?.name}. Listing analytics for your vault
        {user?.role === 'admin' ? ' (admin view)' : ''}.
      </p>

      {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

      {stats && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Crafts', value: stats.totals.crafts },
              { label: 'Users', value: stats.totals.users },
              { label: 'Reviews', value: stats.totals.reviews },
              {
                label: 'Avg price',
                value: formatPrice(stats.totals.averagePrice),
              },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-card border border-stone-200 bg-white p-5 shadow-card"
              >
                <p className="text-xs uppercase tracking-wider text-stone-500">{card.label}</p>
                <p className="mt-2 font-display text-3xl text-walnut">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="h-80 rounded-card border border-stone-200 bg-white p-4 shadow-card">
              <h2 className="mb-4 font-display text-xl">By material</h2>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={stats.byMaterial.map((m) => ({ name: m.material, count: m.count }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis allowDecimals={false} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#78350F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-80 rounded-card border border-stone-200 bg-white p-4 shadow-card">
              <h2 className="mb-4 font-display text-xl">By category</h2>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart
                  data={stats.byCategory.map((c) => ({ name: c.category, count: c.count }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis allowDecimals={false} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-card border border-stone-200 bg-white shadow-card">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-stone-50 text-stone-500">
                <tr>
                  <th className="px-4 py-3">Recent listing</th>
                  <th className="px-4 py-3">Material</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentCrafts.map((craft) => (
                  <tr key={craft._id} className="border-b border-stone-100">
                    <td className="px-4 py-3 font-medium">{craft.title}</td>
                    <td className="px-4 py-3">{craft.material}</td>
                    <td className="px-4 py-3">{formatPrice(craft.price)}</td>
                    <td className="px-4 py-3">{craft.averageRating.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Protected>
      <DashboardContent />
    </Protected>
  );
}
