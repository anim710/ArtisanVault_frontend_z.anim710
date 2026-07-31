import Link from 'next/link';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = [
  { href: '/explore', label: 'Explore Crafts' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-charcoal text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-2xl text-sand">ArtisanVault</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-400">
            A direct marketplace connecting master woodworkers, blacksmiths, and
            ceramicists with collectors who value lasting craft.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sand">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm hover:text-sand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-sand">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 text-sand" />
              214 Forge Lane, Portland, OR 97209
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-sand" />
              <a href="tel:+15035550142" className="hover:text-sand">
                +1 (503) 555-0142
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-sand" />
              <a href="mailto:hello@artisanvault.com" className="hover:text-sand">
                hello@artisanvault.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={16} className="text-sand" />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sand"
              >
                @artisanvault
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} ArtisanVault. Built for lasting workmanship.
      </div>
    </footer>
  );
}
