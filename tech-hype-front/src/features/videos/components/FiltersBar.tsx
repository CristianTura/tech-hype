import type { VideosOrder, VideosSortBy, FiltersBarProps } from '../types/video.types'

export default function FiltersBar({ value, onChange, onReset, disabled }: FiltersBarProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-1">
            <span className="text-xs font-semibold text-slate-300">Author</span>
            <input
              value={value.author}
              onChange={(e) => onChange({ ...value, author: e.target.value })}
              disabled={disabled}
              placeholder="e.g. MidudevFan"
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400/30 focus:ring-cyan-400/20 disabled:opacity-60"
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold text-slate-300">Min hype</span>
            <input
              value={value.minHype}
              onChange={(e) => onChange({ ...value, minHype: e.target.value })}
              disabled={disabled}
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400/30 focus:ring-cyan-400/20 disabled:opacity-60"
            />
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold text-slate-300">Sort by</span>
            <select
              value={value.sortBy}
              onChange={(e) => onChange({ ...value, sortBy: e.target.value as VideosSortBy })}
              disabled={disabled}
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-cyan-400/30 focus:ring-cyan-400/20 disabled:opacity-60"
            >
              <option value="hype">hype</option>
              <option value="date">date</option>
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold text-slate-300">Order</span>
            <select
              value={value.order}
              onChange={(e) => onChange({ ...value, order: e.target.value as VideosOrder })}
              disabled={disabled}
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-cyan-400/30 focus:ring-cyan-400/20 disabled:opacity-60"
            >
              <option value="desc">desc</option>
              <option value="asc">asc</option>
            </select>
          </label>
        </div>

        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            disabled={disabled}
            className="rounded-xl cursor-pointer bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 ring-1 ring-inset ring-white/10 transition hover:bg-white/10 disabled:opacity-60"
          >
            Reset
          </button>
        ) : null}
      </div>
    </div>
  )
}

