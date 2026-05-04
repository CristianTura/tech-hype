import axios from 'axios'
import type { IGetVideosParams, IVideosResponse } from '@/features/videos/types/video.types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
})

export async function getVideos(params: IGetVideosParams = {}): Promise<IVideosResponse> {
  const query = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value != null)
  ) as Record<string, string | number>

  const res = await api.get<IVideosResponse>('/api/videos', { params: query })
  return res.data
}

