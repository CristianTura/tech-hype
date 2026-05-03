import { renderHook, waitFor, act } from '@testing-library/react'
import { useVideos } from '@/features/videos/hooks/useVideos'
import * as videosApi from '@/features/videos/services/videos.api'
import type { IVideo, IVideosResponse } from '@/features/videos/types/video.types'

vi.mock('@/features/videos/services/videos.api')

const mockGetVideos = vi.mocked(videosApi.getVideos)

describe('useVideos', () => {
  const mockVideo: IVideo = {
    title: 'Test Video',
    author: 'Test Author',
    thumbnail: 'test.jpg',
    publishedAt: '2024-01-01',
    hype: 1.5
  }

  const mockResponse: IVideosResponse = {
    data: {
      topVideo: mockVideo,
      videos: [mockVideo]
    },
    meta: {
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads videos initially', async () => {
    mockGetVideos.mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useVideos())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.topVideo).toEqual(mockVideo)
    expect(result.current.videos).toHaveLength(1)
    expect(result.current.hasMore).toBe(false)
  })

  it('handles loading errors', async () => {
    const errorMessage = 'API Error'
    mockGetVideos.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useVideos())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.videos).toHaveLength(0)
  })

  it('loads more videos with loadMore', async () => {
    const firstPageResponse: IVideosResponse = {
      ...mockResponse,
      meta: {
        page: 1,
        limit: 10,
        total: 15,
        totalPages: 2
      }
    }

    const secondPageResponse: IVideosResponse = {
      data: {
        videos: [{ ...mockVideo, title: 'Video 2' }]
      },
      meta: {
        page: 2,
        limit: 10,
        total: 15,
        totalPages: 2
      }
    }

    mockGetVideos
      .mockResolvedValueOnce(firstPageResponse)
      .mockResolvedValueOnce(secondPageResponse)

    const { result } = renderHook(() => useVideos())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.videos).toHaveLength(1)
      expect(result.current.hasMore).toBe(true)
    })

    // call loadMore
    act(() => {
      result.current.loadMore()
    })

    // Wait for second load
    await waitFor(() => {
      expect(mockGetVideos).toHaveBeenCalledTimes(2)
      expect(result.current.videos).toHaveLength(2)
    })
  })

  it('resets when filters change', async () => {
    mockGetVideos.mockResolvedValue(mockResponse)

    const { result, rerender } = renderHook(
      ({ author }) => useVideos({ author }),
      { initialProps: { author: 'author1' } }
    )

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    rerender({ author: 'author2' })

    await waitFor(() => {
      expect(mockGetVideos).toHaveBeenCalledTimes(2)
    })
  })

  it('does not load more if already loading', async () => {
    mockGetVideos.mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useVideos())

    // While loading, loadMore does nothing
    expect(result.current.loading).toBe(true)
    result.current.loadMore()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Should only have called API once
    expect(mockGetVideos).toHaveBeenCalledTimes(1)
  })

  it('does not load more if no more videos', async () => {
    const noMoreResponse: IVideosResponse = {
      data: { videos: [] },
      meta: {
        page: 1,
        limit: 10,
        total: 5,
        totalPages: 1
      }
    }

    mockGetVideos.mockResolvedValue(noMoreResponse)

    const { result } = renderHook(() => useVideos())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.hasMore).toBe(false)

    result.current.loadMore()

    // Should not call API again
    expect(mockGetVideos).toHaveBeenCalledTimes(1)
  })
})
