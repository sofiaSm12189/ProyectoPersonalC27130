import { onMounted, onUnmounted } from 'vue'

/**
 * Observa elementos con clases .reveal, .reveal-left, .reveal-right, .stagger
 * y añade .is-visible cuando entran en el viewport.
 *
 * Usa además un MutationObserver para detectar contenido que se inserta
 * de forma asíncrona (listas cargadas con fetch, bloques con v-if, etc.),
 * de modo que también esos elementos se animan correctamente.
 */
export function useScrollReveal(rootMargin = '-80px') {
  let io = null
  let mo = null
  const SELECTOR = '.reveal, .reveal-left, .reveal-right, .stagger'

  onMounted(() => {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin, threshold: 0.1 }
    )

    const observeAll = (root = document) => {
      root.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains('is-visible')) io.observe(el)
      })
    }

    // Observa lo que ya existe al montar
    observeAll()

    // Observa lo que Vue inserte después (contenido async)
    mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          if (
            node.matches &&
            node.matches(SELECTOR) &&
            !node.classList.contains('is-visible')
          ) {
            io.observe(node)
          }
          if (node.querySelectorAll) observeAll(node)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    if (io) io.disconnect()
    if (mo) mo.disconnect()
  })
}
