'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

const slides = [
  {
    title: 'Made to outlast trends',
    subtitle:
      'Commission walnut tables, forged seating, and kiln-fired lighting from independent masters.',
    image:
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80',
  },
  {
    title: 'From forge to front door',
    subtitle:
      'Every listing includes material, dimensions, and honest lead times—so you know what arrives.',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80',
  },
  {
    title: 'Custom work, clear terms',
    subtitle:
      'Filter by custom-order availability and speak directly with the maker behind the piece.',
    image:
      'https://images.unsplash.com/photo-1524484482812-2c4e045749cf?w=1600&q=80',
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-charcoal">
      {slides.map((s, i) => (
        <div
          key={s.title}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(28,25,23,0.82), rgba(120,53,15,0.45)), url(${s.image})`,
            opacity: i === index ? 1 : 0,
          }}
          aria-hidden={i !== index}
        />
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
        <p className="mb-3 font-display text-3xl text-sand sm:text-4xl md:text-5xl">
          ArtisanVault
        </p>
        <h1 className="max-w-2xl font-display text-3xl leading-tight text-stone-50 sm:text-4xl md:text-5xl">
          {slide.title}
        </h1>
        <p className="mt-4 max-w-xl text-base text-stone-200 sm:text-lg">
          {slide.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/explore">
            <Button variant="secondary">Explore Crafts</Button>
          </Link>
          <Link href="/register">
            <Button variant="ghost" className="!border-stone-400 !text-stone-50">
              List Your Work
            </Button>
          </Link>
        </div>
        <div className="mt-8 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? 'bg-sand' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
