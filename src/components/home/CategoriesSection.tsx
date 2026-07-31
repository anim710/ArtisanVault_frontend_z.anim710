import Link from 'next/link';
import { Armchair, Lamp, Table2 } from 'lucide-react';

const categories = [
  {
    name: 'Tables',
    description: 'Live-edge dining, consoles, and side tables milled to order.',
    href: '/explore?category=Tables',
    icon: Table2,
  },
  {
    name: 'Seating',
    description: 'Forged frames and solid wood benches built for daily use.',
    href: '/explore?category=Seating',
    icon: Armchair,
  },
  {
    name: 'Lighting',
    description: 'Marble pendants, ceramic sconces, and steel floor arcs.',
    href: '/explore?category=Lighting',
    icon: Lamp,
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-charcoal md:text-4xl">
          Shop by category
        </h2>
        <p className="mt-3 max-w-2xl text-stone-500">
          Browse finished pieces and custom-ready commissions across three focused collections.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group rounded-card border border-stone-200 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:border-walnut"
            >
              <cat.icon className="text-walnut transition group-hover:text-sand" size={32} />
              <h3 className="mt-5 font-display text-2xl text-charcoal">{cat.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
