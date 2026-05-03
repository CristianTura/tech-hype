import type { Video } from '../types/video.types'
import VideoCard from './VideoCard'

type VideoGridProps = {
  videos: Video[]
}

export default function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video, index) => (
        <VideoCard key={`${video.title}-${video.author}-${video.publishedAt}-${index}`} video={video} />
      ))}
    </div>
  )
}

