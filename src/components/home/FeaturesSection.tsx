import { Hammer, ShieldCheck, Truck } from 'lucide-react';

const features = [
  {
    icon: Hammer,
    title: 'Independent masters',
    text: 'Every maker is vetted for material fluency, finishing standards, and delivery reliability.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent listings',
    text: 'Price, dimensions, materials, and lead times sit up front—no hidden studio fine print.',
  },
  {
    icon: Truck,
    title: 'Shipment you can plan',
    text: 'Lead times are maker-stated and updated with each listing so furniture day stays realistic.',
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-charcoal md:text-4xl">
          Why collectors choose ArtisanVault
        </h2>
        <p className="mt-3 max-w-2xl text-stone-500">
          We keep the relationship direct: you buy from the maker, we keep the discovery polished.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-card border border-stone-200 bg-stone-50 p-8"
            >
              <f.icon className="text-sand" size={28} />
              <h3 className="mt-4 font-display text-xl text-charcoal">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
