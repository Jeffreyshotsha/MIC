import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../lib/utils.js'
import { ChevronDown } from '../Icons.jsx'

/** Accessible accordion (used for the FAQ). */
export function Accordion({ items, className, allowMultiple = false }) {
  const [open, setOpen] = useState(() => new Set([0]))

  const toggle = (index) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : [])
      if (prev.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index)
        return (
          <div
            key={index}
            className={cn(
              'overflow-hidden rounded-2xl border transition-colors duration-300',
              isOpen
                ? 'border-gold-300 bg-gold-100/40 shadow-soft'
                : 'border-sand-200 bg-white hover:border-sand-300'
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${index}`}
                className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left md:px-7"
              >
                <span className="text-[0.975rem] font-semibold tracking-tight text-ink-900 md:text-lg">
                  {item.q}
                </span>
                <span
                  className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                    isOpen
                      ? 'rotate-180 bg-ink-900 text-white'
                      : 'bg-sand-100 text-ink-800'
                  )}
                >
                  <ChevronDown className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 text-[0.9375rem] leading-relaxed text-ink-800/80 md:px-7">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/** Filter pills for categories. */
export function FilterTabs({ options, value, onChange, className }) {
  return (
    <div className={cn('no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2', className)}>
      {options.map((opt) => {
        const active = opt.key === value
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            aria-pressed={active}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-300',
              active
                ? 'bg-ink-900 text-white shadow-soft'
                : 'border border-sand-200 bg-white text-ink-800/75 hover:border-ink-400 hover:text-ink-900'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}