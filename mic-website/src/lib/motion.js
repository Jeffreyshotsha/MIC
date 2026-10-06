/** Shared motion variants so animation feels consistent across the site. */

export const EASE = [0.16, 1, 0.3, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export const fadeDown = {
  hidden: { opacity: 0, y: -22 },
  show: { opacity: 1, y: 0 },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -34 },
  show: { opacity: 1, x: 0 },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 34 },
  show: { opacity: 1, x: 0 },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1 },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Standard viewport config — fires a little before the element is centred. */
export const viewport = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' }

export const VIEWPORT_SOFT = { once: true, amount: 0.1 }