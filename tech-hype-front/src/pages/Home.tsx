import { useEffect, useState } from 'react'
import ErrorMessage from '@/features/shared/components/ErrorMessage'
import Loader from '@/features/shared/components/Loader'
import FeaturedVideo from '@/features/videos/components/FeaturedVideo'
import FiltersBar from '@/features/videos/components/FiltersBar'
import InfiniteScrollTrigger from '@/features/videos/components/InfiniteScrollTrigger'
import VideoGrid from '@/features/videos/components/VideoGrid'
import { useVideos } from '@/features/videos/hooks/useVideos'
import type { IVideosFiltersState } from '@/features/videos/types/video.types'

const DEFAULT_FILTERS: IVideosFiltersState = {
  author: '',
  minHype: '',
  sortBy: 'hype',
  order: 'desc',
}

const Home = () => {
  const [filters, setFilters] = useState<IVideosFiltersState>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<IVideosFiltersState>(DEFAULT_FILTERS)

  useEffect(() => {
    const t = setTimeout(() => {
      setAppliedFilters((prev) => ({
        ...prev,
        author: filters.author,
        minHype: filters.minHype,
      }))
    }, 350)

    return () => clearTimeout(t)
  }, [filters.author, filters.minHype])

  const minHype = appliedFilters.minHype ? Number(appliedFilters.minHype) : undefined

  const { loading, error, topVideo, videos, hasMore, loadMore, refetch } = useVideos({
    limit: 10,
    author: appliedFilters.author.trim() || undefined,
    minHype: Number.isFinite(minHype) ? minHype : undefined,
    sortBy: filters.sortBy,
    order: filters.order,
  })

  return (
    <div className="min-h-full bg-slate-950">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            The Tech Hype Billboard
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Discover what's trending.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <FiltersBar
          value={filters}
          onChange={setFilters}
          onReset={() => {
            setFilters(DEFAULT_FILTERS)
            setAppliedFilters(DEFAULT_FILTERS)
          }}
          disabled={false}
        />

        {error ? (
          <ErrorMessage
            title="Couldn't load videos"
            message={error}
            onRetry={refetch}
          />
        ) : null}

        {loading && videos.length === 0 ? <Loader variant="page" /> : null}

        {!loading || videos.length > 0 ? (
          <div className="space-y-6">
            {topVideo ? <FeaturedVideo video={topVideo} /> : null}
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-100">All videos</h2>
              <p className="text-xs text-slate-400">Scroll to load more.</p>
            </div>
            <VideoGrid videos={videos} />

            {error ? (
              <ErrorMessage title="Couldn't load more videos" message={error} onRetry={refetch} />
            ) : null}

            {loading && videos.length > 0 ? <Loader variant="grid" count={4} /> : null}

            <InfiniteScrollTrigger
              hasMore={hasMore}
              loading={loading}
              onLoadMore={loadMore}
              rootMargin="240px"
            />

            {!hasMore && videos.length > 0 ? (
              <p className="py-4 text-center text-sm text-slate-400">No more results.</p>
            ) : null}

            {!loading && videos.length === 0 ? (
              <p className="py-4 text-center text-lg font-medium text-slate-400">No results found.</p>
            ) : null}
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default Home

