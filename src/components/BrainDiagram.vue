<template>
  <figure class="brain" :style="{ '--accent': accentColor }">
    <div class="brain__stage">
      <svg class="brain__fallback" viewBox="0 0 400 300" aria-hidden="true">
        <path
          d="M 110,210 C 86,206 74,186 84,166 C 66,154 64,124 84,112
             C 86,86 112,72 140,80 C 158,60 196,58 218,76
             C 244,58 286,60 308,82 C 338,78 366,100 364,134
             C 380,156 372,190 348,200 C 354,218 338,234 316,228
             C 300,242 272,240 260,222 C 242,234 214,234 200,220
             C 176,234 142,232 124,216 C 116,214 112,212 110,210 Z"
        />
      </svg>

      <img
        v-show="!imgFailed"
        class="brain__image"
        :src="brainImg"
        alt="Cerebro humano"
        @error="imgFailed = true"
        @load="imgFailed = false"
      />

      <p v-if="imgFailed" class="brain__hint-img">
        Sube una imagen de cerebro a<br /><code>public/images/brain.webp</code>
      </p>

      <!-- Capa SVG interactiva: cada zona es un círculo clickeable -->
      <svg
        class="brain__overlay"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient :id="`halo-${uid}`" cx="50%" cy="50%" r="50%">
            <stop offset="0%" :stop-color="accentColor" stop-opacity="0.85" />
            <stop offset="100%" :stop-color="accentColor" stop-opacity="0" />
          </radialGradient>
        </defs>
        <g
          v-for="r in allRegions"
          :key="r.key"
          class="brain__zone"
          :class="{ active: isActive(r.key), selected: selected === r.key }"
          role="button"
          tabindex="0"
          :aria-label="r.label"
          @click="select(r.key)"
          @keydown.enter="select(r.key)"
        >
          <circle class="brain__zone-halo" :cx="r.x" :cy="r.y" r="9" :fill="`url(#halo-${uid})`" />
          <circle class="brain__zone-hit" :cx="r.x" :cy="r.y" r="8" />
          <circle class="brain__zone-dot" :cx="r.x" :cy="r.y" r="1.3" />
        </g>
      </svg>
    </div>

    <figcaption class="brain__caption">
      <span class="brain__pulse-dot"></span>
      {{ label }}
    </figcaption>

    <p class="brain__hint">Haz clic en las zonas del cerebro para explorarlas</p>

    <!-- Región seleccionada al hacer clic -->
    <div v-if="selectedRegion" class="brain__selected">
      <span class="brain__selected-name">{{ selectedRegion.label }}</span>
      <span class="brain__selected-fn">{{ selectedRegion.fn }}</span>
    </div>

    <!-- Regiones que activa esta época -->
    <ul class="brain__legend">
      <li v-for="r in activeRegionData" :key="r.key" class="brain__legend-item">
        <span class="brain__legend-name">{{ r.label }}</span>
        <span class="brain__legend-fn">{{ r.fn }}</span>
      </li>
    </ul>
  </figure>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  regions: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  accentColor: { type: String, default: '#c9a84c' },
})

const brainImg = '/images/brain.webp'
const imgFailed = ref(false)
const uid = Math.random().toString(36).slice(2, 8)

const allRegions = [
  { key: 'prefrontal', x: 15, y: 42, label: 'Corteza prefrontal', fn: 'Razonamiento, planificación y análisis' },
  { key: 'broca', x: 19, y: 60, label: 'Área de Broca', fn: 'Lenguaje, habla y letras' },
  { key: 'motor', x: 44, y: 33, label: 'Corteza motora', fn: 'Movimiento y respuesta al ritmo' },
  { key: 'parietal', x: 60, y: 35, label: 'Lóbulo parietal', fn: 'Procesamiento espacial y matemático' },
  { key: 'occipital', x: 85, y: 46, label: 'Corteza visual', fn: 'Imágenes mentales y color' },
  { key: 'temporal', x: 40, y: 62, label: 'Corteza auditiva', fn: 'Procesamiento del sonido y melodía' },
  { key: 'limbic', x: 49, y: 51, label: 'Sistema límbico', fn: 'Emociones profundas e instinto' },
  { key: 'hippocampus', x: 58, y: 57, label: 'Hipocampo', fn: 'Memoria a largo plazo' },
  { key: 'accumbens', x: 36, y: 54, label: 'Núcleo accumbens', fn: 'Placer y recompensa (dopamina)' },
  { key: 'cerebellum', x: 71, y: 75, label: 'Cerebelo', fn: 'Coordinación y sentido del compás' },
]

const selected = ref(null)
function select(key) {
  selected.value = selected.value === key ? null : key
}
const selectedRegion = computed(() =>
  allRegions.find((r) => r.key === selected.value)
)

function isActive(region) {
  return props.regions.includes(region)
}

const activeRegionData = computed(() =>
  allRegions.filter((r) => props.regions.includes(r.key))
)
</script>

<style scoped>
.brain {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 380px;
}

.brain__stage {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
}

.brain__fallback {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.brain__fallback path {
  fill: rgba(255, 255, 255, 0.02);
  stroke: var(--txt-muted);
  stroke-width: 2;
  stroke-linejoin: round;
}

.brain__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: brightness(1.08) contrast(1.12);
  opacity: 0.92;
}

.brain__hint-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 0.72rem;
  color: var(--txt-muted);
  line-height: 1.6;
}
.brain__hint-img code {
  color: var(--accent);
  font-size: 0.68rem;
}

/* Capa SVG interactiva */
.brain__overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.brain__zone {
  cursor: pointer;
  outline: none;
}
.brain__zone-hit { fill: transparent; }
.brain__zone-dot {
  fill: var(--txt-dim);
  opacity: 0.4;
  transition: fill 0.4s, opacity 0.4s;
}
.brain__zone-halo {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  transition: opacity 0.5s ease;
}

.brain__zone:hover .brain__zone-dot,
.brain__zone:focus-visible .brain__zone-dot {
  fill: var(--accent);
  opacity: 1;
}
.brain__zone:hover .brain__zone-halo {
  opacity: 0.35;
}

.brain__zone.active .brain__zone-dot,
.brain__zone.selected .brain__zone-dot {
  fill: var(--accent);
  opacity: 1;
}
.brain__zone.active .brain__zone-halo {
  opacity: 0.55;
  animation: zonePulse 2.4s ease-in-out infinite;
}
.brain__zone.selected .brain__zone-halo {
  opacity: 0.8;
  animation: zonePulse 1.6s ease-in-out infinite;
}
@keyframes zonePulse {
  0%, 100% { transform: scale(0.85); }
  50%       { transform: scale(1.12); }
}

.brain__caption {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-modern);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--accent);
  text-align: center;
}
.brain__pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  animation: dotPulse 1.8s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes dotPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.5); opacity: 0.5; }
}

.brain__hint {
  font-size: 0.68rem;
  color: var(--txt-muted);
  font-style: italic;
  text-align: center;
}

.brain__selected {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 12px 14px;
  border: 1px solid var(--accent);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.025);
}
.brain__selected-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
}
.brain__selected-fn {
  font-size: 0.76rem;
  color: var(--txt-primary);
  line-height: 1.5;
}

.brain__legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
.brain__legend-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
  border-radius: 0 4px 4px 0;
  background: rgba(255, 255, 255, 0.015);
}
.brain__legend-name {
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--accent);
}
.brain__legend-fn {
  font-size: 0.74rem;
  color: var(--txt-dim);
  line-height: 1.4;
}
</style>
