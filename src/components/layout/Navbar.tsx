'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/about', label: 'About' },
];

const authLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/items/add', label: 'Add Piece' },
  { href: '/items/manage', label: 'Manage' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const links = user ? authLinks : publicLinks;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/95 text-stone-50 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-xl tracking-wide text-sand">
          ArtisanVault
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm transition hover:text-sand',
                pathname === link.href ? 'text-sand' : 'text-stone-200'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!loading && !user && (
            <>
              <Link href="/login" className="text-sm text-stone-200 hover:text-sand">
                Login
              </Link>
              <Link href="/register">
                <Button variant="secondary" className="!py-2">
                  Join
                </Button>
              </Link>
            </>
          )}
          {!loading && user && (
            <>
              <span className="max-w-[140px] truncate text-sm text-stone-300">
                {user.name}
              </span>
              <Button variant="ghost" className="!border-stone-500 !text-stone-100" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>

        <button
          className="rounded-card p-2 text-stone-100 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-charcoal px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-card px-3 py-2 text-sm',
                  pathname === link.href ? 'bg-walnut text-sand' : 'text-stone-200'
                )}
              >
                {link.label}
              </Link>
            ))}
            {!user ? (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-sm">
                  Login
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-sand">
                  Join
                </Link>
              </>
            ) : (
              <button
                className="px-3 py-2 text-left text-sm text-sand"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
