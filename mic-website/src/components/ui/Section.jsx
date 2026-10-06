import { motion } from 'motion/react'
import { cn } from '../../lib/utils.js'

const VIEWPORT_DEFAULT = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' }

/**
 * Scroll-reveal wrapper. Renders children with a fade/slide once it enters
 * the viewport. Respects `prefers-reduced-motion` via Motion's built-in
 * reducedMotion handling plus the CSS override in index.css.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.7,
  className,
  as = 'div',
  once = true,
  amount,
}) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={amount === undefined ? VIEWPORT_DEFAULT : { once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </Component>
  )
}

/** Stagger container — pair with <RevealItem>. */
export function RevealGroup({ children, className, delay = 0, gap = 0.08, amount }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={amount === undefined ? VIEWPORT_DEFAULT : { once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className, y = 24, duration = 0.65, as = 'div' }) {
  const Component = motion[as] ?? motion.div
  return (
    <Component
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}

/** Section heading block (eyebrow + title + optional subtitle). */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
  className,
  titleClassName,
  children,
}) {
  const dark = tone === 'dark'

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
      y={22}
    >
      {eyebrow && (
        <span
          className={cn(
            'eyebrow',
            dark ? 'text-gold-300' : 'text-gold-600'
          )}
        >
          <span
            className={cn(
              'h-px w-6',
              dark ? 'bg-gold-300/60' : 'bg-gold-500/60'
            )}
          />
          {eyebrow}
          <span
            className={cn(
              'h-px w-6',
              dark ? 'bg-gold-300/60' : 'bg-gold-500/60'
            )}
          />
        </span>
      )}

      <h2
        className={cn(
          'text-balance text-[clamp(1.75rem,1.15rem+2.6vw,3rem)] leading-[1.1]',
          dark ? 'text-white' : 'text-ink-900',
          titleClassName
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-[0.975rem] leading-relaxed md:text-lg',
            dark ? 'text-ink-100/80' : 'text-ink-800/75'
          )}
        >
          {subtitle}
        </p>
      )}

      {children}
    </Reveal>
  )
}

/** Page hero used at the top of every inner page. */
export function PageHero({ eyebrow, title, text, children, image, icon: Icon }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 pb-20 pt-32 md:pb-28 md:pt-40">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-900" />
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="size-full object-cover opacity-20"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
        <div className="bg-grain absolute inset-0" />
        {/* Decorative glow */}
        <div className="absolute -right-32 -top-32 size-[32rem] rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 size-96 rounded-full bg-ink-500/20 blur-3xl" />
      </div>

      <div className="container-mic relative">
        <Reveal y={20}>
          {eyebrow && (
            <span className="eyebrow mb-5 text-gold-300">
              {Icon && <Icon className="size-4" />}
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-4xl text-balance text-[clamp(2rem,1.2rem+4vw,4rem)] leading-[1.05] text-white">
            {title}
          </h1>
          {text && (
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-100/80 md:text-lg">
              {text}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>

      {/* Bottom accent */}
      <div className="flag-rule absolute inset-x-0 bottom-0 h-1 opacity-90" />
    </section>
  )
}