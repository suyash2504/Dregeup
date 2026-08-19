import { useEffect, useRef, useState } from 'react'

export const cn = (...parts) => parts.filter(Boolean).join(' ')

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Adds `is-in` to the host element once it scrolls into view, which is what
 * every .rv / .sketch-underline / .sketch-draw rule in index.css keys off.
 * One observer per element, unobserved after firing — nothing keeps running.
 */
export function useReveal({ threshold = 0.16, once = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in')
          if (once) io.unobserve(el)
        } else if (!once) {
          el.classList.remove('is-in')
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])

  return ref
}

/** Counts 0 → `to` once visible. Skips straight to the value if motion is reduced. */
export function useCountUp(to, { duration = 1400, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced()) {
      setValue(to)
      return
    }

    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.unobserve(el)
        let start = null
        const tick = (now) => {
          if (start === null) start = now
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(+(to * eased).toFixed(decimals))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration, decimals])

  return [ref, value]
}

/** True once the window has scrolled past `offset` — drives the navbar shrink. */
export function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > offset)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

/** Locks body scroll while a dialog or the mobile menu is open. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [active])
}

/** Closes on Escape. */
export function useEscape(active, onClose) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])
}
