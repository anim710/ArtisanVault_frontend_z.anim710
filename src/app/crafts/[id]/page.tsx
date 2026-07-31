'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { formatPrice } from '@/lib/utils';
import type { CraftPiece, Review } from '@/types';
import { CraftCard } from '@/components/crafts/CraftCard';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

export default function CraftDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();
  const [craft, setCraft] = useState<CraftPiece | null>(null);
  const [related, setRelated] = useState<CraftPiece[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [reviewMsg, setReviewMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      apiFetch<{ craft: CraftPiece; related: CraftPiece[] }>(`/crafts/${id}`, {
        auth: false,
      }),
      apiFetch<{ reviews: Review[] }>(`/reviews/${id}`, { auth: false }),
    ])
      .then(([detail, reviewData]) => {
        setCraft(detail.craft);
        setRelated(detail.related);
        setReviews(reviewData.reviews);
        setActiveImage(0);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function submitReview(e: FormEvent) {
    e.preventDefault();
    setReviewMsg('');
    try {
      const data = await apiFetch<{ review: Review }>(`/reviews/${id}`, {
        method: 'POST',
        body: { rating: Number(rating), comment },
      });
      setReviews((prev) => [data.review, ...prev]);
      setComment('');
      setReviewMsg('Review submitted.');
      const refreshed = await apiFetch<{ craft: CraftPiece; related: CraftPiece[] }>(
        `/crafts/${id}`,
        { auth: false }
      );
      setCraft(refreshed.craft);
    } catch (err) {
      setReviewMsg(err instanceof Error ? err.message : 'Could not submit review');
    }
  }

  if (loading) {
    return <div className="p-12 text-center text-stone-500">Loading craft piece…</div>;
  }

  if (error || !craft) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-red-600">{error || 'Craft piece not found'}</p>
        <Link href="/explore" className="mt-4 inline-block text-walnut">
          Back to explore
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div
            className="aspect-[4/3] rounded-card bg-cover bg-center shadow-card"
            style={{ backgroundImage: `url(${craft.imageUrls[activeImage]})` }}
          />
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {craft.imageUrls.map((url, i) => (
              <button
                key={url}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`h-20 w-28 shrink-0 rounded-card bg-cover bg-center border-2 ${
                  i === activeImage ? 'border-sand' : 'border-transparent'
                }`}
                style={{ backgroundImage: `url(${url})` }}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-walnut">{craft.category}</p>
          <h1 className="mt-2 font-display text-4xl text-charcoal">{craft.title}</h1>
          <p className="mt-2 text-stone-500">by {craft.artisanName}</p>
          <p className="mt-4 font-display text-3xl text-walnut">{formatPrice(craft.price)}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
            <Star size={16} className="text-sand" fill="currentColor" />
            {craft.averageRating.toFixed(1)} · {craft.reviewCount} reviews
          </div>
        </div>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl text-charcoal">Overview</h2>
          <p className="mt-4 leading-relaxed text-stone-600">{craft.fullDescription}</p>
          <p className="mt-4 text-stone-500">{craft.shortDescription}</p>
        </div>
        <aside className="rounded-card border border-stone-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-xl text-charcoal">Specifications</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Material</dt>
              <dd className="font-medium">{craft.material}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Dimensions</dt>
              <dd className="text-right font-medium">{craft.dimensions}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Lead time</dt>
              <dd className="font-medium">{craft.leadTime}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-stone-500">Custom order</dt>
              <dd className="font-medium">
                {craft.customOrderAvailable ? 'Available' : 'Finished piece'}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-charcoal">Reviews</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {reviews.length === 0 && (
              <p className="text-sm text-stone-500">No reviews yet—be the first.</p>
            )}
            {reviews.map((review) => (
              <article
                key={review._id}
                className="rounded-card border border-stone-200 bg-white p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-charcoal">
                    {typeof review.user === 'object' ? review.user.name : 'Collector'}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-sand">
                    <Star size={14} fill="currentColor" /> {review.rating}
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-600">{review.comment}</p>
              </article>
            ))}
          </div>

          <div className="rounded-card border border-stone-200 bg-stone-50 p-5">
            {user ? (
              <form onSubmit={submitReview} className="space-y-4">
                <h3 className="font-display text-xl">Leave a review</h3>
                <Select
                  label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  options={[5, 4, 3, 2, 1].map((n) => ({
                    value: String(n),
                    label: `${n} star${n > 1 ? 's' : ''}`,
                  }))}
                />
                <Textarea
                  label="Comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                {reviewMsg && <p className="text-sm text-walnut">{reviewMsg}</p>}
                <Button type="submit">Submit review</Button>
              </form>
            ) : (
              <p className="text-sm text-stone-500">
                <Link href="/login" className="text-walnut underline">
                  Sign in
                </Link>{' '}
                to leave a review.
              </p>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-2xl text-charcoal">Related pieces</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <CraftCard key={item._id} craft={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
