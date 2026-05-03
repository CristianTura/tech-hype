import type { IVideosOrder, IVideosSortBy, IFiltersBarProps } from '@/features/videos/types/video.types'
import Input from '@/features/shared/components/Input'
import Select from '@/features/shared/components/Select'

const FiltersBar = ({ value, onChange, onReset, disabled }: IFiltersBarProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label="Author"
            placeholder="e.g. MidudevFan"
            value={value.author}
            onChange={(author) => onChange({ ...value, author })}
            disabled={disabled}
          />

          <Input
            label="Min hype"
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            value={value.minHype}
            onChange={(minHype) => onChange({ ...value, minHype })}
            disabled={disabled}
          />

          <Select
            label="Sort by"
            value={value.sortBy}
            onChange={(sortBy) => onChange({ ...value, sortBy: sortBy as IVideosSortBy })}
            disabled={disabled}
            options={[
              { value: 'hype', label: 'hype' },
              { value: 'date', label: 'date' },
            ]}
          />

          <Select
            label="Order"
            value={value.order}
            onChange={(order) => onChange({ ...value, order: order as IVideosOrder })}
            disabled={disabled}
            options={[
              { value: 'desc', label: 'desc' },
              { value: 'asc', label: 'asc' },
            ]}
          />
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

export default FiltersBar

