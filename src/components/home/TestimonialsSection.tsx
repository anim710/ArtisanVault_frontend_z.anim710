const testimonials = [
  {
    quote:
      'The Cascade table arrived exactly as photographed—grain, steel base, and all. Lead time was honest.',
    name: 'Priya N.',
    role: 'Collector, Seattle',
  },
  {
    quote:
      'ArtisanVault let me commission a custom bench length without leaving the listing flow.',
    name: 'Marcus L.',
    role: 'Interior designer, Austin',
  },
  {
    quote:
      'As a ceramicist, the manage tools make updates simple. Buyers already understand materials.',
    name: 'Elena V.',
    role: 'Maker, Portland',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-charcoal md:text-4xl">
          Voices from the vault
        </h2>
        <p className="mt-3 max-w-2xl text-stone-500">
          Collectors and makers on clarity, craft quality, and commissioning.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="flex h-full flex-col rounded-card border border-stone-200 bg-stone-50 p-8"
            >
              <p className="flex-1 text-sm leading-relaxed text-charcoal">“{t.quote}”</p>
              <footer className="mt-6">
                <p className="font-semibold text-walnut">{t.name}</p>
                <p className="text-xs text-stone-500">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
