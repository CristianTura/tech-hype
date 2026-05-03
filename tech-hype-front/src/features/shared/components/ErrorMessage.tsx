type ErrorMessageProps = {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-rose-100/80">{message}</p>
        </div>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 rounded-xl bg-rose-500/20 px-3 py-2 text-sm font-semibold text-rose-50 ring-1 ring-inset ring-rose-400/30 transition hover:bg-rose-500/30"
          >
            Retry
          </button>
        ) : null}
      </div>
    </div>
  )
}

