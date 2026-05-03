type LoaderProps = {
  variant?: 'page' | 'grid'
  count?: number
}

export default function Loader({ variant = 'page', count = 8 }: LoaderProps) {
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40"
          >
            <div className="aspect-video w-full animate-pulse bg-slate-800/70" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-4/5 animate-pulse rounded bg-slate-800/70" />
              <div className="h-4 w-3/5 animate-pulse rounded bg-slate-800/70" />
              <div className="mt-3 flex items-center justify-between">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-800/70" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-800/70" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40">
        <div className="aspect-[16/7] w-full animate-pulse bg-slate-800/70" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="h-8 w-3/5 animate-pulse rounded bg-slate-700/70" />
          <div className="mt-3 h-4 w-2/5 animate-pulse rounded bg-slate-700/70" />
          <div className="mt-4 h-7 w-24 animate-pulse rounded-full bg-slate-700/70" />
        </div>
      </div>

      <Loader variant="grid" count={count} />
    </div>
  )
}

