import type { Video } from '../types/video.types'
import HypeBadge from './HypeBadge'

type FeaturedVideoProps = {
  video: Video
}

export default function FeaturedVideo({ video }: FeaturedVideoProps) {
  return (
    <div>
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-white flex items-center justify-left gap-2">
          <span>🔥</span>
          Most Hyped Video!
        </h3>
      </div>
      <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-800/40 shadow-[0_0_60px_-15px_rgba(168,85,247,0.15),0_0_120px_-30px_rgba(168,85,247,0.08)] transition-transform duration-600 ease-out hover:scale-[1.01] animate-fadeInUp">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-[16/7] w-full object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
          loading="eager"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute -inset-2 rounded-3xl overflow-hidden pointer-events-none">

          <div className="absolute bottom-0 left-5/6 text-lg animate-simple-rise" style={{ animationDelay: '0.3s' }}>👑</div>
          <div className="absolute bottom-0 left-7/8 text-lg animate-simple-rise" style={{ animationDelay: '0.5s' }}>👑</div>
          <div className="absolute bottom-0 left-9/10 text-lg animate-simple-rise" style={{ animationDelay: '0.1s' }}>👑</div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/25 to-orange-500/20 px-3.5 py-2 text-xs font-semibold text-amber-100 ring-1 ring-inset ring-amber-400/30 backdrop-blur-sm">
              <span className="text-amber-200">👑</span>
              Crown Jewel
            </span>
            <HypeBadge hype={video.hype} className="bg-cyan-500/25 text-cyan-50 ring-cyan-300/40 backdrop-blur-sm" />
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {video.title}
          </h2>

          <p className="mt-3 text-sm text-slate-200/90 sm:text-base">
            <span className="font-medium text-white">{video.author}</span>
            <span className="mx-2 text-slate-400">·</span>
            <span className="text-slate-300/80">{video.publishedAt}</span>
          </p>
        </div>
      </section>
    </div>
  )
}

