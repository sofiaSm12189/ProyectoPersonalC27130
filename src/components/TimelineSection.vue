<template>
  <section id="timeline" class="timeline-section" aria-label="Línea del tiempo musical">

    <!-- Video collage de fondo según la época activa -->
    <EraBackground :era="activeEra" />

    <div class="section-header reveal">
      <p class="eyebrow">La Historia</p>
      <h2>Una Línea del Tiempo Musical</h2>
      <div class="divider-line"></div>
      <p class="lead">
        Nueve épocas que trazan el camino desde la sinfonía que reveló el alma humana
        hasta la canción de 15 segundos diseñada para un algoritmo.
        <br /><span class="timeline-section__hint">Desliza hacia abajo y deja que la historia se revele.</span>
      </p>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="timeline-section__loading">
      <span>Cargando la historia de la música</span>
      <span class="loading-dots">...</span>
    </div>

    <!-- Línea del tiempo con tarjetas alternadas -->
    <div v-else class="timeline">
      <div class="timeline__line" aria-hidden="true">
        <div class="timeline__line-progress" :style="{ height: progress + '%' }"></div>
      </div>

      <EraCard
        v-for="(era, i) in eras"
        :key="era.id"
        :era="era"
        :index="i"
        @select-song="(song) => openSong(song, era)"
      />

      <!-- Cierre de la línea -->
      <div class="timeline__end reveal" aria-hidden="true">
        <span class="timeline__end-dot"></span>
        <p class="timeline__end-text">¿Y ahora hacia dónde va la música?</p>
      </div>
    </div>

    <!-- Modal de canción (info + reproductor) -->
    <SongModal
      :song="selectedSong"
      :era-name="selectedEraName"
      :accent-color="selectedAccent"
      @close="selectedSong = null"
    />

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import EraCard from './EraCard.vue'
import SongModal from './SongModal.vue'
import EraBackground from './EraBackground.vue'

const eras    = ref([])
const loading = ref(true)
const progress = ref(0)

// Época activa según scroll (controla el video de fondo)
const activeEra = ref(null)

// Canción seleccionada para el modal
const selectedSong    = ref(null)
const selectedEraName = ref('')
const selectedAccent  = ref('#c9a84c')

function openSong(song, era) {
  selectedSong.value    = song
  selectedEraName.value = era.name
  selectedAccent.value  = era.accentColor
}

// Posiciones cacheadas de cada época (se recalculan en resize)
let cardRanges = []
function measureCards() {
  cardRanges = [...document.querySelectorAll('.timeline .era')].map((c) => {
    const r = c.getBoundingClientRect()
    const top = r.top + window.scrollY
    return { top, bottom: top + r.height }
  })
}

function onScroll() {
  const vh = window.innerHeight

  // Barra de progreso de la línea del tiempo
  const tl = document.querySelector('.timeline')
  if (tl) {
    const rect = tl.getBoundingClientRect()
    const total = rect.height - vh
    const scrolled = Math.min(Math.max(-rect.top + vh * 0.5, 0), total)
    progress.value = total > 0 ? (scrolled / total) * 100 : 0
  }

  // Época cuyo rango contiene el centro del viewport → controla el fondo
  const centerY = window.scrollY + vh / 2
  for (let i = 0; i < cardRanges.length; i++) {
    if (centerY >= cardRanges[i].top && centerY < cardRanges[i].bottom) {
      if (activeEra.value !== eras.value[i]) activeEra.value = eras.value[i]
      return
    }
  }
}

onMounted(async () => {
  try {
    const res  = await fetch('/data/eras.json')
    const data = await res.json()
    eras.value = data.eras
  } catch (e) {
    console.error('No se pudo cargar eras.json', e)
  } finally {
    loading.value = false
  }
  await nextTick()
  measureCards()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measureCards)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measureCards)
})
</script>

<style scoped>
.timeline-section {
  position: relative;
  padding: 0 24px 60px;
  /* Fondo transparente para dejar ver el video collage de cada época */
  background: transparent;
}

/* El contenido va por encima del fondo */
.timeline-section > .section-header,
.timeline-section > .timeline,
.timeline-section > .timeline-section__loading {
  position: relative;
  z-index: 1;
}

.timeline-section__hint {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.78rem;
  font-style: italic;
  color: var(--gold-700);
}

.timeline-section__loading {
  text-align: center;
  padding: 80px 24px;
  color: var(--txt-muted);
  font-size: 0.9rem;
  letter-spacing: 2px;
}
.loading-dots { animation: blink 1.2s step-start infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

/* ── Timeline ────────────────────────────────────────── */
.timeline {
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  padding: 20px 0 60px;
}

/* Línea vertical central */
.timeline__line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background: var(--border);
  z-index: 0;
}
.timeline__line-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(
    to bottom,
    var(--gold-500),
    var(--crimson-light),
    var(--amber-light),
    var(--electric-glow),
    var(--purple-glow),
    var(--pink-glow)
  );
  box-shadow: 0 0 12px var(--gold-700);
  transition: height 0.2s linear;
}

/* Cierre del timeline */
.timeline__end {
  text-align: center;
  padding-top: 40px;
  position: relative;
  z-index: 2;
}
.timeline__end-dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--pink-glow);
  margin: 0 auto 20px;
  box-shadow: 0 0 20px var(--pink-glow);
  animation: endPulse 2s ease-in-out infinite;
}
@keyframes endPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.4); opacity: 0.6; }
}
.timeline__end-text {
  font-family: var(--font-romantic);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--txt-dim);
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 860px) {
  .timeline__line { left: 22px; transform: none; }
}
</style>
