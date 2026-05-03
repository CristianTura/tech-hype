import { getHypeClasses } from '../utils/video.utils'

type HypeBadgeProps = {
  hype: number
  className?: string
}

export default function HypeBadge({ hype, className }: HypeBadgeProps) {
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

