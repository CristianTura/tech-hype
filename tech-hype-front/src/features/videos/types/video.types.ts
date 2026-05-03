export type Video = {
  title: string
  author: string
  thumbnail: string
  publishedAt: string
  hype: number
}

export type VideosSortBy = 'hype' | 'date'
export type VideosOrder = 'asc' | 'desc'

export type VideosFilters = {
  author?: string
  minHype?: number
  sortBy?: VideosSortBy
  order?: VideosOrder
}

export type VideosMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type VideosResponse = {
  data: {
    topVideo?: Video | null
    videos: Video[]
  }
  meta: VideosMeta
}

export type UseVideosState = {
  loading: boolean
  error: string | null
  topVideo: Video | null
  videos: Video[]
  meta: VideosMeta | null
  hasMore: boolean
  refetch: () => void
  loadMore: () => void
}

export type VideosFiltersState = {
  author: string
  minHype: string
  sortBy: VideosSortBy
  order: VideosOrder
}

export type FiltersBarProps = {
  value: VideosFiltersState
  onChange: (next: VideosFiltersState) => void
  onReset?: () => void
  disabled?: boolean
}
