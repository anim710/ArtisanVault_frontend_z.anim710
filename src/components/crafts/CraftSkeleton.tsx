export function CraftSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-card border border-stone-200 bg-white">
      <div className="h-44 w-full bg-stone-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-stone-200" />
        <div className="h-4 w-full rounded bg-stone-100" />
        <div className="h-4 w-2/3 rounded bg-stone-100" />
        <div className="h-10 w-full rounded-card bg-stone-200" />
      </div>
    </div>
  );
}
