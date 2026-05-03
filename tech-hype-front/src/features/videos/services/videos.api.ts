import axios from 'axios'
import type { VideosFilters, VideosResponse } from '../types/video.types'

export type GetVideosParams = {
  page?: number
  limit?: number
  author?: string
  minHype?: number
  sortBy?: VideosFilters['sortBy']
  order?: VideosFilters['order']
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
})

export async function getVideos(params: GetVideosParams = {}): Promise<VideosResponse> {
  const query = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value != null)
  ) as Record<string, string | number>

  const res = await api.get<VideosResponse>('/api/videos', { params: query })
  return res.data
}

