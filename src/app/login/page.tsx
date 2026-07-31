'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!email.includes('@') || password.length < 6) {
      setError('Enter a valid email and password (min 6 characters).');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(role: 'user' | 'admin') {
    if (role === 'admin') {
      setEmail('admin@artisanvault.com');
      setPassword('Admin@123');
    } else {
      setEmail('artisan@artisanvault.com');
      setPassword('Artisan@123');
    }
    setError('');
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="font-display text-4xl text-charcoal">Welcome back</h1>
      <p className="mt-2 text-stone-500">Sign in to manage listings and view your dashboard.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-card border border-stone-200 bg-white p-6 shadow-card">
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
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button type="button" variant="ghost" onClick={() => fillDemo('user')}>
            Demo user
          </Button>
          <Button type="button" variant="ghost" onClick={() => fillDemo('admin')}>
            Demo admin
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-stone-500">
        New maker?{' '}
        <Link href="/register" className="font-medium text-walnut hover:text-sand">
          Create an account
        </Link>
      </p>
    </div>
  );
}
