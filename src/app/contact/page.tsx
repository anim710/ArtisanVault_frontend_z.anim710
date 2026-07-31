'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || message.trim().length < 10) {
      setStatus('Please complete all fields with a clear message.');
      return;
    }
    const subject = encodeURIComponent(`ArtisanVault inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:hello@artisanvault.com?subject=${subject}&body=${body}`;
    setStatus('Opening your email client…');
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl text-charcoal">Contact</h1>
      <p className="mt-2 max-w-2xl text-stone-500">
        Questions about commissioning, shipping, or joining as a maker—reach the studio team.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-card border border-stone-200 bg-white p-6 shadow-card"
        >
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            label="Message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          {status && <p className="text-sm text-walnut">{status}</p>}
          <Button type="submit">Send message</Button>
        </form>

        <div className="space-y-6 rounded-card border border-stone-200 bg-stone-50 p-6">
          <div className="flex gap-3 text-sm">
            <MapPin className="text-walnut" size={18} />
            <div>
              <p className="font-medium text-charcoal">Studio</p>
              <p className="text-stone-500">214 Forge Lane, Portland, OR 97209</p>
            </div>
          </div>
          <div className="flex gap-3 text-sm">
            <Phone className="text-walnut" size={18} />
            <div>
              <p className="font-medium text-charcoal">Phone</p>
              <a href="tel:+15035550142" className="text-stone-500 hover:text-walnut">
                +1 (503) 555-0142
              </a>
            </div>
          </div>
          <div className="flex gap-3 text-sm">
            <Mail className="text-walnut" size={18} />
            <div>
              <p className="font-medium text-charcoal">Email</p>
              <a
                href="mailto:hello@artisanvault.com"
                className="text-stone-500 hover:text-walnut"
              >
                hello@artisanvault.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
