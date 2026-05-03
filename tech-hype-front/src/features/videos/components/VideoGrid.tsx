import type { IVideo } from '@/features/videos/types/video.types'
import VideoCard from '@/features/videos/components/VideoCard'

const VideoGrid = ({ videos }: { videos: IVideo[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video, index) => (
        <VideoCard key={`${video.title}-${video.author}-${video.publishedAt}-${index}`} video={video} />
      ))}
    </div>
  )
}

export default VideoGrid

