import { useId } from 'react'

// Rupee input. Keeps a numeric value; displays Indian digit grouping.
export function MoneyField({
  label,
  value,
  onChange,
  hint,
  max,
}: {
  label: string
  value: number
  onChange: (n: number) => void
  hint?: string
  max?: number
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
          ₹
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className="field pl-8"
          value={value ? value.toLocaleString('en-IN') : ''}
          placeholder="0"
          onChange={(e) => {
            const n = Number(e.target.value.replace(/[^\d]/g, '')) || 0
            onChange(max ? Math.min(n, max) : n)
          }}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  )
}

export function CalcDisclaimer() {
  return (
    <p className="mt-6 rounded-xl bg-accent-50 p-4 text-xs leading-relaxed text-accent-900">
      Results are indicative estimates for general information only, based on the provisions as
      understood at the time of publishing. They do not constitute professional advice. Please consult
      a Chartered Accountant before taking any decision.
    </p>
  )
}
