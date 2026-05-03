import type { IInputProps } from '@/features/shared/types/input.types'

const Input = ({
  label,
  placeholder,
  value = '',
  onChange,
  disabled = false,
  type = 'text',
  min,
  max,
  step,
  className = '',
}: IInputProps) => {
  return (
    <label className="space-y-1">
      {label && (
        <span className="text-xs font-semibold text-slate-300">{label}</span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-1 ring-transparent transition focus:border-cyan-400/30 focus:ring-cyan-400/20 disabled:opacity-60 ${className}`}
      />
    </label>
  )
}

export default Input
