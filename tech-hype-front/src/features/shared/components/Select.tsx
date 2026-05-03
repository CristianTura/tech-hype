import type { ISelectProps } from '@/features/shared/types/input.types'

const Select = ({
  label,
  value,
  onChange,
  disabled = false,
  options,
  className = '',
}: ISelectProps) => {
  return (
    <label className="space-y-1">
      {label && (
        <span className="text-xs font-semibold text-slate-300">{label}</span>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 outline-none ring-1 ring-transparent transition focus:border-cyan-400/30 focus:ring-cyan-400/20 disabled:opacity-60 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default Select
