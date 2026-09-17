import type { ReactNode } from 'react'

export const authInputClass =
  'w-full rounded-xl border-0 bg-neutral-100 px-4 py-[0.85rem] text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-neutral-200'

type FormFieldProps = {
  label: string
  error?: string
  extra?: ReactNode
  children: ReactNode
}

export default function FormField({ label, error, extra, children }: FormFieldProps) {
  return (
    <div className="mb-4 flex flex-col">
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-neutral-800">{label}</label>
        {extra}
      </div>
      {children}
      {error ? <span className="mt-1 text-xs text-red-600">{error}</span> : null}
    </div>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 mt-2 border-t border-neutral-200 pt-5 text-[11px] font-semibold tracking-[0.14em] text-neutral-400">
      {children}
    </div>
  )
}
