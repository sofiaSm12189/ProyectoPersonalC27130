import { onMounted, onUnmounted } from 'vue'

/**
 * Observa elementos con clases .reveal, .reveal-left, .reveal-right, .stagger
 * y añade .is-visible cuando entran en el viewport.
 */
export function useScrollReveal(rootMargin = '-80px') {
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold: 0.1 }
    )

    const targets = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .stagger'
    )
    targets.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
}
