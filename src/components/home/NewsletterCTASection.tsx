'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export function NewsletterCTASection() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setMessage('Enter a valid email address.');
      return;
    }
    setMessage(`Thanks—studio notes will go to ${email}.`);
    setEmail('');
  }

  return (
    <section className="relative overflow-hidden bg-charcoal py-20 text-stone-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, #F59E0B 0, transparent 35%), radial-gradient(circle at 80% 60%, #78350F 0, transparent 40%)',
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Studio notes & new arrivals</h2>
          <p className="mt-3 max-w-md text-stone-300">
            Occasional emails when makers list limited runs—no weekly noise.
          </p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!bg-white"
                aria-label="Email for newsletter"
              />
            </div>
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
          {message && <p className="mt-3 text-sm text-sand">{message}</p>}
        </div>
        <div className="flex flex-col justify-center rounded-card border border-white/10 bg-white/5 p-8">
          <h3 className="font-display text-2xl text-sand">Ready to list a piece?</h3>
          <p className="mt-2 text-sm text-stone-300">
            Create an account, add photography and specs, and publish to Explore in minutes.
          </p>
          <Link href="/items/add" className="mt-6">
            <Button variant="secondary">Add a craft piece</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
