// Hand-rolled vanilla equivalents of the remaining React Bits ideas
// (SpotlightCard, TiltedCard, Dock, CountUp, AnimatedContent-style reveal).
// These are simple enough not to need a dedicated runtime library once
// there's no React tree to hook into — plain DOM events + CSS transitions
// give the same result for a static, no-build site.

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------------------- Scroll reveal ---------------------------- */
export function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]')
  if (prefersReducedMotion) {
    targets.forEach(el => el.classList.add('is-visible'))
    return
  }

  targets.forEach(el => {
    const delay = el.getAttribute('data-reveal-delay')
    if (delay) el.style.transitionDelay = `${delay}s`
  })

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  )

  targets.forEach(el => observer.observe(el))
}

// Call after dynamically injecting new cards (education/experience/projects/
// certificates), since they're added after the initial observer pass.
export function observeReveal(el) {
  if (!el) return
  if (prefersReducedMotion) {
    el.classList.add('is-visible')
    return
  }
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  )
  observer.observe(el)
}

/* ------------------------------ Spotlight ------------------------------- */
export function attachSpotlight(el) {
  if (!el) return
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  })
}

/* -------------------------------- Tilt ----------------------------------- */
export function attachTilt(figureEl, { rotateAmplitude = 9, scaleOnHover = 1.04 } = {}) {
  if (!figureEl || prefersReducedMotion) return
  const inner = figureEl.querySelector('.tilt-inner')
  if (!inner) return

  figureEl.addEventListener('mousemove', e => {
    const rect = figureEl.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2
    const rotateY = (offsetX / (rect.width / 2)) * rotateAmplitude
    const rotateX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleOnHover})`
  })

  figureEl.addEventListener('mouseleave', () => {
    inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  })
}

/* ------------------------------- Count up --------------------------------- */
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function runCountUp(el) {
  const to = Number(el.getAttribute('data-countup-to') || 0)
  const suffix = el.getAttribute('data-countup-suffix') || ''
  const duration = 1400
  const start = performance.now()

  if (prefersReducedMotion) {
    el.textContent = to + suffix
    return
  }

  function frame(now) {
    const elapsed = Math.min((now - start) / duration, 1)
    const value = Math.round(to * easeOutExpo(elapsed))
    el.textContent = value + suffix
    if (elapsed < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export function initCountUps() {
  const targets = document.querySelectorAll('.countup')
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCountUp(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.4 }
  )
  targets.forEach(el => observer.observe(el))
}

export function setCountUpTargets(values) {
  const els = document.querySelectorAll('.countup')
  els.forEach((el, i) => {
    if (values[i] != null) el.setAttribute('data-countup-to', String(values[i]))
  })
}

/* -------------------------------- Dock nav --------------------------------- */
const NAV_ITEMS = [
  { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
  { id: 'education', label: 'Education', icon: 'fa-solid fa-graduation-cap' },
  { id: 'experience', label: 'Experience', icon: 'fa-solid fa-briefcase' },
  { id: 'projects', label: 'Projects', icon: 'fa-solid fa-code' },
  { id: 'certificates', label: 'Certificates', icon: 'fa-solid fa-certificate' }
]

export function initDock() {
  const panel = document.getElementById('dock-panel')
  if (!panel) return

  panel.innerHTML = NAV_ITEMS.map(
    item => `
    <div class="dock-item" data-dock-id="${item.id}" tabindex="0" role="button" aria-label="${item.label}">
      <i class="${item.icon}" aria-hidden="true"></i>
      <span class="dock-label mono">${item.label}</span>
    </div>`
  ).join('')

  const items = [...panel.querySelectorAll('.dock-item')]

  items.forEach(item => {
    const goTo = () => {
      const id = item.getAttribute('data-dock-id')
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    item.addEventListener('click', goTo)
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        goTo()
      }
    })
  })

  if (!prefersReducedMotion) {
    panel.addEventListener('mousemove', e => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const distance = Math.abs(e.pageX - centerX)
        const falloff = Math.max(0, 1 - distance / 130)
        const scale = 1 + 0.32 * falloff
        item.style.transform = `scale(${scale})`
      })
    })
    panel.addEventListener('mouseleave', () => {
      items.forEach(item => (item.style.transform = 'scale(1)'))
    })
  }

  const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean)
  if (sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          items.forEach(item => item.classList.toggle('is-active', item.getAttribute('data-dock-id') === visible.target.id))
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    sections.forEach(s => observer.observe(s))
  }
}

/* --------------------------- GSAP hero SplitText ---------------------------- */
export function initSplitHero(el) {
  if (!el || !el.textContent.trim()) return

  if (prefersReducedMotion || !window.gsap || !window.SplitText) {
    el.classList.remove('split-pending')
    return
  }

  window.gsap.registerPlugin(window.SplitText)

  document.fonts.ready.then(() => {
    const split = new window.SplitText(el, { type: 'chars', smartWrap: true, charsClass: 'split-char' })
    el.classList.remove('split-pending')
    window.gsap.fromTo(
      split.chars,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.028 }
    )
  })
}
