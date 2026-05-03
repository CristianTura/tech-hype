import type { Video } from '../types/video.types'
import HypeBadge from './HypeBadge'

type VideoCardProps = {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 transition duration-200 hover:-translate-y-0.5 hover:shadow-glow animate-fadeInUp">
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 transition duration-200 group-hover:opacity-100" />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-sm font-semibold text-slate-100 leading-snug [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
          {video.title}
        </h3>

        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-xs text-slate-300">
            <span className="truncate">{video.author}</span>
            <span className="text-slate-500"> · </span>
            <span className="text-slate-400">{video.publishedAt}</span>
          </p>
          <HypeBadge hype={video.hype} />
        </div>
      </div>
    </article>
  )
}

