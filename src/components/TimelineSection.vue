<template>
  <section id="timeline" class="timeline-section" aria-label="Línea del tiempo musical">

    <div class="section-header reveal">
      <p class="eyebrow">La Historia</p>
      <h2>Una Línea del Tiempo Musical</h2>
      <div class="divider-line"></div>
      <p class="lead">
        Nueve épocas que trazan el camino desde la sinfonía que reveló el alma humana
        hasta la canción de 15 segundos diseñada para un algoritmo.
      </p>
    </div>

    <!-- Lista de épocas cargadas desde JSON -->
    <div v-if="eras.length" class="era-preview stagger">
      <div
        v-for="era in eras"
        :key="era.id"
        class="era-preview__item"
        :style="{ '--accent': era.accentColor }"
      >
        <span class="era-preview__icon" aria-hidden="true">{{ era.icon }}</span>
        <span class="era-preview__years">{{ era.yearStart }}–{{ era.yearEnd }}</span>
        <span class="era-preview__name">{{ era.name }}</span>
        <span class="era-preview__tagline">{{ era.tagline }}</span>
      </div>
    </div>

    <div v-else class="era-preview__loading">
      <span>Cargando épocas</span>
      <span class="loading-dots">...</span>
    </div>

    <p class="timeline-section__coming-soon reveal">
      La línea interactiva completa se despliega a continuación ↓
    </p>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const eras = ref([])

onMounted(async () => {
  const res  = await fetch('/data/eras.json')
  const data = await res.json()
  eras.value = data.eras
})
</script>

<style scoped>
.timeline-section {
  padding: 0 0 80px;
  background: var(--void);
}

/* Preview list */
.era-preview {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.era-preview__item {
  display: grid;
  grid-template-columns: 40px 120px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border-left: 2px solid transparent;
  border-color: var(--accent, var(--gold-700));
  background: var(--surface);
  transition: background 0.3s;
  cursor: default;
}
.era-preview__item:hover {
  background: var(--card-bg);
}

.era-preview__icon {
  font-size: 1.4rem;
  color: var(--accent, var(--gold-500));
  text-align: center;
}

.era-preview__years {
  font-family: var(--font-classical);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--accent, var(--gold-500));
  white-space: nowrap;
}

.era-preview__name {
  font-family: var(--font-romantic);
  font-size: 0.95rem;
  color: var(--txt-bright);
}

.era-preview__tagline {
  font-size: 0.75rem;
  color: var(--txt-dim);
  font-style: italic;
  text-align: right;
  max-width: 260px;
}

.era-preview__loading {
  text-align: center;
  padding: 48px;
  color: var(--txt-muted);
  font-size: 0.85rem;
  letter-spacing: 2px;
}

.loading-dots {
  animation: blink 1.2s step-start infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.timeline-section__coming-soon {
  text-align: center;
  margin-top: 48px;
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: var(--txt-muted);
  font-family: var(--font-classical);
}

/* Responsive */
@media (max-width: 640px) {
  .era-preview__item {
    grid-template-columns: 36px 1fr;
    grid-template-rows: auto auto;
  }
  .era-preview__years { grid-column: 2; }
  .era-preview__name  { grid-column: 2; }
  .era-preview__tagline { display: none; }
}
</style>
