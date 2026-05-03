import { useEffect, useRef } from 'react'

type InfiniteScrollTriggerProps = {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  rootMargin?: string
}

export default function InfiniteScrollTrigger({
  hasMore,
  loading,
  onLoadMore,
  rootMargin = '200px',
}: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first?.isIntersecting) return
        if (loading) return
        if (!hasMore) return
        onLoadMore()
      },
      { root: null, rootMargin, threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore, rootMargin])

  return <div ref={ref} className="h-10" />
}

