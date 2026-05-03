import { getHypeClasses } from '@/features/videos/utils/video.utils'
import type { IHypeBadgeProps } from '@/features/videos/types/video.types'

const HypeBadge = ({ hype, className }: IHypeBadgeProps) => {
  const value = Number.isFinite(hype) ? hype : 0
  const pretty = value.toFixed(3)

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset whitespace-nowrap',
        getHypeClasses(value),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      title={`Hype: ${pretty}`}
    >
      Hype {pretty}
    </span>
  )
}

export default HypeBadge

