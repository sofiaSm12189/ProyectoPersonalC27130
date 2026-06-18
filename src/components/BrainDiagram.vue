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

      <div
        v-for="r in allRegions"
        :key="r.key"
        class="brain__zone"
        :class="{ active: isActive(r.key) }"
        :style="{ left: r.x + '%', top: r.y + '%' }"
      >
        <span class="brain__zone-glow"></span>
        <span class="brain__zone-dot"></span>
      </div>
    </div>

    <figcaption class="brain__caption">
      <span class="brain__pulse-dot"></span>
      {{ label }}
    </figcaption>

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
  gap: 16px;
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

.brain__zone {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.brain__zone-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--txt-dim);
  opacity: 0.3;
  transition: all 0.5s ease;
}
.brain__zone-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease, width 0.6s ease, height 0.6s ease;
}

.brain__zone.active .brain__zone-dot {
  width: 9px;
  height: 9px;
  background: var(--accent);
  opacity: 1;
  box-shadow: 0 0 10px var(--accent);
}
.brain__zone.active .brain__zone-glow {
  width: 78px;
  height: 78px;
  opacity: 0.6;
  animation: zonePulse 2.4s ease-in-out infinite;
}
@keyframes zonePulse {
  0%, 100% { opacity: 0.42; transform: translate(-50%, -50%) scale(0.9); }
  50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
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
  50% { transform: scale(1.5); opacity: 0.5; }
}

.brain__legend {
  list-style: none;
  margin: 4px 0 0;
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
