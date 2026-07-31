'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'How do lead times work?',
    a: 'Each listing shows the maker’s stated fabrication and shipping window. Custom orders may extend that window—confirmed before payment.',
  },
  {
    q: 'Can I request a custom size?',
    a: 'Filter by Custom Order Available, open the piece, and contact the maker through ArtisanVault after creating an account.',
  },
  {
    q: 'What materials are listed?',
    a: 'Walnut, steel, marble, and ceramic—chosen for clarity in filtering and high-contrast photography on detail pages.',
  },
  {
    q: 'How do makers get paid?',
    a: 'Makers manage listings in Manage Items. Commercial checkout can be connected later; this demo focuses on discovery and listing workflows.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-charcoal md:text-4xl">FAQ</h2>
        <p className="mt-3 text-stone-500">Straight answers before you commission.</p>
        <div className="mt-8 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="rounded-card border border-stone-200 bg-white">
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-medium text-charcoal">{item.q}</span>
                  <ChevronDown
                    className={cn('text-walnut transition', isOpen && 'rotate-180')}
                    size={18}
                  />
                </button>
                {isOpen && (
                  <p className="border-t border-stone-100 px-5 py-4 text-sm text-stone-500">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
