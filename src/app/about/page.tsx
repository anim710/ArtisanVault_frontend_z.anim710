import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-wider text-walnut">About</p>
      <h1 className="mt-2 font-display text-4xl text-charcoal md:text-5xl">
        Built for makers who finish what they start
      </h1>
      <div className="mt-8 space-y-5 text-stone-600 leading-relaxed">
        <p>
          ArtisanVault is a direct-to-collector marketplace for independent woodworkers,
          blacksmiths, and ceramicists. We focus on high-contrast photography, clear
          material metadata, and honest lead times so buyers can commission with confidence.
        </p>
        <p>
          Listings are Craft Pieces—each with title, artisan name, price, material,
          dimensions, and shipping windows. Filters for walnut, steel, marble, and ceramic
          keep discovery fast without diluting craftsmanship.
        </p>
        <p>
          Our studio partners work out of Portland, the Hudson Valley, and the Pacific
          Northwest. Whether you need a live-edge table or a kiln-fired sconce pair, you
          buy from the person who made it.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/explore">
          <Button variant="secondary">Explore the vault</Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">Contact the team</Button>
        </Link>
      </div>
    </div>
  );
}
