export type HypeLevel = 'low' | 'medium' | 'high'

export function getHypeLevel(hype: number): HypeLevel {
  if (hype >= 0.20) return 'high'
  if (hype >= 0.10) return 'medium'
  return 'low'
}

export function getHypeClasses(hype: number): string {
  const level = getHypeLevel(hype)
  if (level === 'high') return 'bg-cyan-500/15 text-cyan-200 ring-cyan-400/30'
  if (level === 'medium') return 'bg-amber-500/15 text-amber-200 ring-amber-400/30'
  return 'bg-slate-500/15 text-slate-200 ring-slate-300/20'
}