export type IInputProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  type?: 'text' | 'number'
  min?: number
  max?: number
  step?: string
  className?: string
}

export type ISelectProps = {
  label?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  options: Array<{ value: string; label: string }>
  className?: string
}
