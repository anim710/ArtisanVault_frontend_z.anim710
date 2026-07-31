'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and password (min 6 characters).');
      return;
    }
    setLoading(true);
    try {
      await register(name.trim(), email, password);
      router.push('/items/add');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-4xl text-charcoal">Join ArtisanVault</h1>
      <p className="mt-2 text-stone-500">
        Create a maker account to list walnut, steel, marble, and ceramic work.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-card border border-stone-200 bg-white p-6 shadow-card">
        <Input
          label="Full name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-stone-500">
        Already registered?{' '}
        <Link href="/login" className="font-medium text-walnut hover:text-sand">
          Sign in
        </Link>
      </p>
    </div>
  );
}
