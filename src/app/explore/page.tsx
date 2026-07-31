import { Suspense } from 'react';
import ExploreClient from './ExploreClient';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-12 text-stone-500">Loading explore…</div>}>
      <ExploreClient />
    </Suspense>
  );
}
