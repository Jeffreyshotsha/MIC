import { forwardRef, useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../lib/utils.js'
import { CheckCircle, Eye, EyeOff, AlertCircle } from '../Icons.jsx'

const BASE =
  'w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink-900 ' +
  'placeholder:text-ink-800/40 transition-all duration-200 ' +
  'focus:outline-none focus:ring-4 disabled:bg-sand-100 disabled:text-ink-800/50'

function fieldClasses(error) {
  return cn(
    BASE,
    error
      ? 'border-crimson-500 focus:border-crimson-500 focus:ring-crimson-500/15'
      : 'border-sand-200 hover:border-sand-300 focus:border-ink-600 focus:ring-ink-600/15'
  )
}

export function Field({ label, error, hint, required, children, className, htmlFor }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-[0.8125rem] font-semibold tracking-tight text-ink-800"
        >
          {label}
          {required && <span className="ml-1 text-crimson-600">*</span>}
        </label>
      )}
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 overflow-hidden text-xs font-medium text-crimson-600"
          >
            <AlertCircle className="size-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
        {!error && hint && (
          <p className="text-xs text-ink-800/55">{hint}</p>
        )}
      </AnimatePresence>
    </div>
  )
}

export const Input = forwardRef(function Input(
  { label, error, hint, required, className, id, ...rest },
  ref
) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <Field label={label} error={error} hint={hint} required={required} htmlFor={inputId} className={className}>
      <input
        ref={ref}
        id={inputId}
        className={fieldClasses(error)}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
    </Field>
  )
})

export const Textarea = forwardRef(function Textarea(
  { label, error, hint, required, className, id, rows = 5, ...rest },
  ref
) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <Field label={label} error={error} hint={hint} required={required} htmlFor={inputId} className={className}>
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cn(fieldClasses(error), 'resize-y leading-relaxed')}
        aria-invalid={error ? 'true' : undefined}
        {...rest}
      />
    </Field>
  )
})

export const Select = forwardRef(function Select(
  { label, error, hint, required, className, id, options = [], placeholder, ...rest },
  ref
) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <Field label={label} error={error} hint={hint} required={required} htmlFor={inputId} className={className}>
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={cn(fieldClasses(error), 'appearance-none pr-11')}
          aria-invalid={error ? 'true' : undefined}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            )
          )}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-800/40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Field>
  )
})

export function PasswordInput({ label, error, hint, required, className, id, ...rest }) {
  const autoId = useId()
  const inputId = id ?? autoId
  const [visible, setVisible] = useState(false)

  return (
    <Field label={label} error={error} hint={hint} required={required} htmlFor={inputId} className={className}>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          id={inputId}
          className={cn(fieldClasses(error), 'pr-12')}
          aria-invalid={error ? 'true' : undefined}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-lg p-2 text-ink-800/45 transition-colors hover:bg-ink-900/5 hover:text-ink-800"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
        </button>
      </div>
    </Field>
  )
}

export function Checkbox({ label, error, required, className, id, ...rest }) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={inputId}
        className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-ink-800"
      >
        <span className="relative mt-0.5 flex size-[1.125rem] shrink-0 items-center justify-center">
          <input
            type="checkbox"
            id={inputId}
            className="peer size-[1.125rem] appearance-none rounded-[6px] border border-sand-300 bg-white transition-all checked:border-ink-900 checked:bg-ink-900 hover:border-ink-600"
            {...rest}
          />
          <CheckCircle className="pointer-events-none absolute size-3.5 scale-0 text-white transition-transform duration-200 peer-checked:scale-100" />
        </span>
        <span>
          {label}
          {required && <span className="ml-1 text-crimson-600">*</span>}
        </span>
      </label>
      {error && (
        <p className="flex items-center gap-1.5 pl-7 text-xs font-medium text-crimson-600">
          <AlertCircle className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/** Honeypot — hidden from humans, catches naive bots. */
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label>
        Do not fill this field
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}

/** Segmented radio cards (membership type, donation frequency…). */
export function OptionCards({ value, onChange, options, columns = 3, className }) {
  return (
    <div
      role="radiogroup"
      className={cn(
        'grid gap-3',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
        className
      )}
    >
      {options.map((opt) => {
        const active = value === opt.key
        return (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.key)}
            className={cn(
              'group relative flex flex-col items-start gap-2 rounded-2xl border p-5 text-left',
              'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              active
                ? 'border-gold-500 bg-gold-100/50 shadow-[0_0_0_3px_rgba(212,160,23,0.18)]'
                : 'border-sand-200 bg-white hover:-translate-y-0.5 hover:border-sand-300 hover:shadow-soft'
            )}
          >
            <span
              className={cn(
                'absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border transition-all',
                active
                  ? 'border-gold-600 bg-gold-600'
                  : 'border-sand-300 bg-white group-hover:border-gold-400'
              )}
            >
              <span
                className={cn(
                  'size-2 rounded-full bg-white transition-transform',
                  active ? 'scale-100' : 'scale-0'
                )}
              />
            </span>
            <span className="pr-7 text-[0.9375rem] font-bold text-ink-900">{opt.title}</span>
            <span className="text-[0.8125rem] leading-relaxed text-ink-800/70">{opt.text}</span>
            {opt.price && (
              <span className="mt-1 text-xs font-semibold tracking-wide text-gold-700 uppercase">
                {opt.price}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}