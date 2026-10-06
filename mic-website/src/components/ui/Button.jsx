import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils.js'
import { ArrowRight } from '../Icons.jsx'

const VARIANTS = {
  primary:
    'bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 shadow-gold hover:shadow-lift',
  dark: 'bg-ink-900 text-white hover:bg-ink-800 shadow-lift',
  outline:
    'border-2 border-ink-900/15 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-white',
  outlineLight:
    'border-2 border-white/35 text-white hover:border-white hover:bg-white hover:text-ink-900',
  ghost: 'text-ink-900 hover:bg-ink-900/5',
  light: 'bg-white text-ink-900 hover:bg-ink-50 shadow-lift',
}

const SIZES = {
  sm: 'px-4 py-2 text-[0.8125rem] gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-[0.9375rem] gap-2.5',
}

export function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon = true,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'group/btn inline-flex select-none items-center justify-center rounded-full font-semibold tracking-tight',
    'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
    'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className
  )

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}