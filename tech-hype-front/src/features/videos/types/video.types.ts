export type IVideo = {
  title: string
  author: string
  thumbnail: string
  publishedAt: string
  hype: number
}

export type IVideosSortBy = 'hype' | 'date'
export type IVideosOrder = 'asc' | 'desc'

export type IVideosFilters = {
  author?: string
  minHype?: number
  sortBy?: IVideosSortBy
  order?: IVideosOrder
}

export type IVideosMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type IVideosResponse = {
  data: {
    topVideo?: IVideo | null
    videos: IVideo[]
  }
  meta: IVideosMeta
}

export type IUseVideosState = {
  loading: boolean
  error: string | null
  topVideo: IVideo | null
  videos: IVideo[]
  meta: IVideosMeta | null
  hasMore: boolean
  refetch: () => void
  loadMore: () => void
}

export type IVideosFiltersState = {
  author: string
  minHype: string
  sortBy: IVideosSortBy
  order: IVideosOrder
}

export type IFiltersBarProps = {
  value: IVideosFiltersState
  onChange: (next: IVideosFiltersState) => void
  onReset?: () => void
  disabled?: boolean
}

export type IVideoGridProps = {
  videos: IVideo[]
}

export type IInfiniteScrollTriggerProps = {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  rootMargin?: string
}

export type IHypeBadgeProps = {
  hype: number
  className?: string
}

export type IFeaturedVideoProps = {
  video: IVideo
}

export type IGetVideosParams = {
  page?: number
  limit?: number
  author?: string
  minHype?: number
  sortBy?: IVideosFilters['sortBy']
  order?: IVideosFilters['order']
}

export type IErrorMessageProps = {
  title?: string
  message?: string
  onRetry?: () => void
}

export type ILoaderProps = {
  variant?: 'page' | 'grid'
  count?: number
}

export type IVideoCardProps = {
  video: IVideo
}