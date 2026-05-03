import { useEffect, useState } from 'react'
import { getVideos } from '@/features/videos/services/videos.api'
import type { IVideo, IVideosMeta, IUseVideosState, IGetVideosParams } from '@/features/videos/types/video.types'

export function useVideos(params: IGetVideosParams = {}): IUseVideosState {
  const limit = params.limit ?? 10
  const author = params.author ?? ''
  const minHype = params.minHype
  const sortBy = params.sortBy
  const order = params.order

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState<IVideosMeta | null>(null)
  const [topVideo, setTopVideo] = useState<IVideo | null>(null)
  const [videos, setVideos] = useState<IVideo[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [nonce, setNonce] = useState(0)

  const resetVideos = () => {
    setPage(1)
    setVideos([])
    setTopVideo(null)
    setError(null)
  }

  const refetch = () => setNonce((n) => n + 1)
  
  const loadMore = () => {
    if (loading || !hasMore) return
    setPage((p) => p + 1)
  }

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const fetchVideos = async () => {
      try {
        const res = await getVideos({
          page,
          limit,
          author: author || undefined,
          minHype,
          sortBy,
          order,
        })
        
        if (controller.signal.aborted) return
        
        const { data, meta: responseMeta } = res
        setMeta(responseMeta)
        setTopVideo(data.topVideo ?? null)
        
        setVideos((prev) => (page === 1 ? data.videos : [...prev, ...data.videos]))
        setHasMore(responseMeta.page < responseMeta.totalPages)
      } catch (e: unknown) {
        if (controller.signal.aborted) return
        const message = e instanceof Error ? e.message : 'Something went wrong while loading videos.'
        setError(message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchVideos()

    return () => {
      controller.abort()
    }
  }, [page, limit, author, minHype, sortBy, order, nonce])

  useEffect(() => {
    resetVideos()
  }, [author, minHype, sortBy, order])

  return { loading, error, topVideo, videos, meta, hasMore, refetch, loadMore }
}

