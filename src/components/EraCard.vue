<template>
  <article
    ref="rootEl"
    class="era"
    :class="[isLeft ? 'era--left' : 'era--right', { 'is-visible': visible }]"
    :style="cssVars"
  >
    <!-- Nodo sobre la línea central del timeline -->
    <div class="era__node" aria-hidden="true">
      <span class="era__node-icon">{{ era.icon }}</span>
      <span class="era__node-pulse"></span>
    </div>

    <!-- Conector del nodo a la tarjeta -->
    <div class="era__connector" aria-hidden="true"></div>

    <!-- Tarjeta de contenido -->
    <div class="era__card">
      <header class="era__header">
        <span class="era__years">{{ era.yearStart }} — {{ era.yearEnd }}</span>
        <h3 class="era__name">{{ era.name }}</h3>
        <p class="era__tagline">"{{ era.tagline }}"</p>
      </header>

      <p class="era__description">{{ era.description }}</p>

      <!-- Características de la época -->
      <ul class="era__characteristics">
        <li v-for="(c, i) in era.characteristics" :key="i">{{ c }}</li>
      </ul>

      <!-- Impacto intelectual (bloque destacado) -->
      <div class="era__impact">
        <span class="era__impact-label">Música y pensamiento</span>
        <p>{{ era.intellectualImpact }}</p>
      </div>

      <!-- Figuras clave -->
      <div class="era__figures">
        <span
          v-for="(f, i) in era.keyFigures"
          :key="i"
          class="era__figure-chip"
        >{{ f }}</span>
      </div>

      <!-- Canciones que definieron la época -->
      <div class="era__songs">
        <h4 class="era__songs-title">
          <span class="era__songs-icon">♪</span>
          Canciones que definieron la época
        </h4>
        <ol class="era__song-list">
          <li v-for="(s, i) in era.songs" :key="i" class="era__song">
            <div class="era__song-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="era__song-body">
              <div class="era__song-head">
                <span class="era__song-name">{{ s.title }}</span>
                <span class="era__song-year">{{ s.year }}</span>
              </div>
              <span class="era__song-artist">{{ s.artist }}</span>
              <p class="era__song-sig">{{ s.significance }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  era:   { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const rootEl  = ref(null)
const visible = ref(false)
const isLeft  = computed(() => props.index % 2 === 0)
const cssVars = computed(() => ({ '--accent': props.era.accentColor }))

let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
  )
  if (rootEl.value) observer.observe(rootEl.value)
})
onUnmounted(() => observer && observer.disconnect())
</script>

<style scoped>
/* ── Contenedor de la época ──────────────────────────── */
.era {
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 46px 0;
  box-sizing: border-box;
}
.era--left  { justify-content: flex-start; }
.era--right { justify-content: flex-end; }

/* ── Nodo central (sobre la línea del timeline) ──────── */
.era__node {
  position: absolute;
  left: 50%;
  top: 64px;
  transform: translateX(-50%);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--deep);
  border: 1px solid var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  box-shadow: 0 0 0 6px var(--void), 0 0 22px -2px var(--accent);
  transition: transform 0.5s var(--ease-expo), box-shadow 0.4s;
}
.era.is-visible .era__node {
  animation: nodeIn 0.6s var(--ease-expo) both;
}
@keyframes nodeIn {
  0%   { transform: translateX(-50%) scale(0); }
  60%  { transform: translateX(-50%) scale(1.18); }
  100% { transform: translateX(-50%) scale(1); }
}

.era__node-icon {
  font-size: 1.4rem;
  color: var(--accent);
  line-height: 1;
}

.era__node-pulse {
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  opacity: 0;
}
.era.is-visible .era__node-pulse {
  animation: nodePulse 2.6s ease-out infinite;
}
@keyframes nodePulse {
  0%   { opacity: 0.7; transform: scale(1); }
  100% { opacity: 0;   transform: scale(1.9); }
}

/* ── Conector del nodo a la tarjeta ──────────────────── */
.era__connector {
  position: absolute;
  top: 88px;
  width: calc(4% + 12px);
  height: 1px;
  background: linear-gradient(to right, var(--accent), transparent);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.6s ease 0.3s;
}
.era--left  .era__connector { right: 50%; transform: scaleX(-1); }
.era--right .era__connector { left: 50%; }
.era.is-visible .era__connector { opacity: 0.5; }

/* ── Tarjeta ─────────────────────────────────────────── */
.era__card {
  width: 45%;
  background: linear-gradient(155deg, var(--card-bg) 0%, var(--surface) 100%);
  border: 1px solid var(--border);
  border-top: 2px solid var(--accent);
  border-radius: 4px;
  padding: 32px 30px;
  position: relative;
  box-shadow: 0 30px 60px -30px rgba(0, 0, 0, 0.9);
  transition: opacity 0.9s var(--ease-expo), transform 0.9s var(--ease-expo),
    border-color 0.4s, box-shadow 0.4s;
  opacity: 0;
}
.era--left  .era__card { transform: translateX(-60px); }
.era--right .era__card { transform: translateX(60px); }
.era.is-visible .era__card { opacity: 1; transform: translateX(0); }

.era__card:hover {
  box-shadow: 0 30px 70px -28px rgba(0, 0, 0, 0.95),
    0 0 0 1px var(--accent);
}

/* Resplandor de acento en la esquina */
.era__card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 120px; height: 120px;
  background: radial-gradient(circle at top left, var(--accent), transparent 70%);
  opacity: 0.1;
  pointer-events: none;
  border-radius: 4px;
}

/* ── Header ──────────────────────────────────────────── */
.era__header { margin-bottom: 18px; }

.era__years {
  font-family: var(--font-classical);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--accent);
}

.era__name {
  font-family: var(--font-romantic);
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--txt-bright);
  line-height: 1.15;
  margin: 6px 0 8px;
}

.era__tagline {
  font-family: var(--font-romantic);
  font-style: italic;
  font-size: 1rem;
  color: var(--accent);
  opacity: 0.85;
}

/* ── Descripción ─────────────────────────────────────── */
.era__description {
  font-size: 0.92rem;
  color: var(--txt-primary);
  line-height: 1.85;
  margin-bottom: 22px;
}

/* ── Características ──────────────────────────────────── */
.era__characteristics {
  list-style: none;
  margin: 0 0 22px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.era__characteristics li {
  position: relative;
  padding-left: 22px;
  font-size: 0.82rem;
  color: var(--txt-dim);
  line-height: 1.5;
}
.era__characteristics li::before {
  content: '◆';
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 0.6rem;
  top: 3px;
}

/* ── Impacto intelectual ─────────────────────────────── */
.era__impact {
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid var(--accent);
  padding: 16px 18px;
  margin-bottom: 22px;
  border-radius: 0 4px 4px 0;
}
.era__impact-label {
  display: block;
  font-family: var(--font-modern);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 8px;
}
.era__impact p {
  font-size: 0.84rem;
  color: var(--txt-primary);
  line-height: 1.7;
  font-style: italic;
}

/* ── Figuras clave ───────────────────────────────────── */
.era__figures {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 26px;
}
.era__figure-chip {
  font-size: 0.7rem;
  color: var(--txt-dim);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 4px 12px;
  transition: color 0.3s, border-color 0.3s;
}
.era__figure-chip:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* ── Canciones ───────────────────────────────────────── */
.era__songs-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-classical);
  font-size: 0.78rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--txt-bright);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}
.era__songs-icon { color: var(--accent); font-size: 1rem; }

.era__song-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  counter-reset: song;
}

.era__song {
  display: flex;
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.era__song:last-child { border-bottom: none; padding-bottom: 0; }

.era__song-num {
  font-family: var(--font-classical);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.55;
  min-width: 24px;
  padding-top: 1px;
}

.era__song-body { flex: 1; }

.era__song-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
}
.era__song-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--txt-bright);
  line-height: 1.3;
}
.era__song-year {
  font-size: 0.72rem;
  color: var(--txt-muted);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
.era__song-artist {
  display: block;
  font-size: 0.78rem;
  color: var(--accent);
  margin: 2px 0 6px;
}
.era__song-sig {
  font-size: 0.78rem;
  color: var(--txt-dim);
  line-height: 1.6;
  font-style: italic;
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 860px) {
  .era,
  .era--left,
  .era--right {
    justify-content: flex-start;
    padding: 28px 0 28px 0;
  }

  .era__node { left: 22px; top: 40px; }

  .era__connector { display: none; }

  .era__card {
    width: 100%;
    margin-left: 56px;
    padding: 26px 22px;
  }
  .era--left  .era__card,
  .era--right .era__card { transform: translateY(40px); }
  .era.is-visible .era__card { transform: translateY(0); }

  .era__name { font-size: 1.5rem; }
}
</style>
