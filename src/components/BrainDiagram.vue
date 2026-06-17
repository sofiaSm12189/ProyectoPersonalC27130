<template>
  <figure class="brain" :style="{ '--accent': accentColor }">
    <svg
      class="brain__svg"
      viewBox="0 0 460 380"
      role="img"
      :aria-label="`Cerebro: región activa ${label}`"
    >
      <defs>
        <!-- Blob luminoso de cada región -->
        <radialGradient :id="`blob-${uid}`" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="accentColor" stop-opacity="0.85" />
          <stop offset="45%" :stop-color="accentColor" stop-opacity="0.35" />
          <stop offset="100%" :stop-color="accentColor" stop-opacity="0" />
        </radialGradient>
        <!-- Recorte con la forma del cerebro para las circunvoluciones -->
        <clipPath :id="`cortex-${uid}`">
          <path :d="cortexPath" />
        </clipPath>
      </defs>

      <!-- Relleno suave del cerebro -->
      <path class="brain__fill" :d="cortexPath" />

      <!-- Circunvoluciones (recortadas a la forma) -->
      <g :clip-path="`url(#cortex-${uid})`" class="brain__gyri">
        <path v-for="(d, i) in gyriLines" :key="i" :d="d" />
      </g>

      <!-- Surco lateral (separa el lóbulo temporal) -->
      <path
        class="brain__sulcus"
        :clip-path="`url(#cortex-${uid})`"
        d="M 120,214 C 168,232 238,236 286,212"
      />
      <!-- Surco central -->
      <path
        class="brain__sulcus"
        :clip-path="`url(#cortex-${uid})`"
        d="M 214,96 C 206,132 198,160 188,196"
      />

      <!-- Contorno del cerebro -->
      <path class="brain__outline" :d="cortexPath" />

      <!-- Cerebelo -->
      <path
        class="brain__cerebellum"
        d="M 300,214 C 332,212 356,230 350,254 C 344,278 312,280 292,266 C 280,256 282,224 300,214 Z"
      />
      <path
        class="brain__cerebellum-folds"
        d="M 300,228 Q 322,230 344,230 M 296,240 Q 320,244 348,242 M 298,252 Q 320,256 340,254 M 304,264 Q 320,266 332,264"
      />

      <!-- Tronco encefálico -->
      <path
        class="brain__stem"
        d="M 250,232 C 254,260 258,286 246,306 C 242,314 234,314 232,306 C 228,284 234,256 238,234"
      />

      <!-- ══ Regiones: puntos tenues para TODAS, glow para las ACTIVAS ══ -->
      <g
        v-for="r in allRegions"
        :key="r.key"
        class="brain__region"
        :class="{ active: isActive(r.key) }"
      >
        <!-- Halo luminoso (solo activas) -->
        <circle
          v-if="isActive(r.key)"
          class="brain__blob"
          :cx="r.x"
          :cy="r.y"
          :r="r.deep ? 34 : 40"
          :fill="`url(#blob-${uid})`"
        />
        <!-- Núcleo del punto -->
        <circle
          class="brain__core"
          :cx="r.x"
          :cy="r.y"
          :r="isActive(r.key) ? 6 : 2.5"
        />
      </g>
    </svg>

    <figcaption class="brain__caption">
      <span class="brain__pulse-dot"></span>
      {{ label }}
    </figcaption>

    <!-- Funciones de las regiones activas (la "explicación extra") -->
    <ul class="brain__legend">
      <li v-for="r in activeRegionData" :key="r.key" class="brain__legend-item">
        <span class="brain__legend-name">{{ r.label }}</span>
        <span class="brain__legend-fn">{{ r.fn }}</span>
      </li>
    </ul>
  </figure>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  regions:     { type: Array,  default: () => [] },
  label:       { type: String, default: '' },
  accentColor: { type: String, default: '#c9a84c' },
})

const uid = Math.random().toString(36).slice(2, 8)

// Contorno del cerebro (vista lateral, frente a la izquierda)
const cortexPath =
  'M 126,214 ' +
  'C 104,210 94,190 102,170 ' +
  'C 84,158 82,130 100,118 ' +
  'C 102,94 124,80 150,86 ' +
  'C 166,68 198,66 218,82 ' +
  'C 242,66 280,68 300,86 ' +
  'C 326,80 352,98 354,128 ' +
  'C 368,148 362,178 342,190 ' +
  'C 348,206 334,220 314,214 ' +
  'C 300,226 276,224 266,208 ' +
  'C 252,218 230,218 218,206 ' +
  'C 198,218 168,218 152,204 ' +
  'C 140,212 130,214 126,214 Z'

// Circunvoluciones: líneas onduladas horizontales recortadas al cerebro
const gyriLines = computed(() => {
  const lines = []
  for (let y = 104; y <= 208; y += 12) {
    const amp = 6
    let d = `M 80 ${y}`
    for (let x = 80; x <= 372; x += 22) {
      const dir = Math.floor(x / 22) % 2 === 0 ? -amp : amp
      d += ` Q ${x + 11} ${y + dir} ${x + 22} ${y}`
    }
    lines.push(d)
  }
  return lines
})

// Mapa de regiones: posición + nombre + función (la explicación extra)
const allRegions = [
  { key: 'prefrontal',  x: 138, y: 150, deep: false, label: 'Corteza prefrontal', fn: 'Razonamiento, planificación y análisis' },
  { key: 'motor',       x: 214, y: 116, deep: false, label: 'Corteza motora',     fn: 'Movimiento y respuesta al ritmo' },
  { key: 'parietal',    x: 264, y: 128, deep: false, label: 'Lóbulo parietal',    fn: 'Procesamiento espacial y matemático' },
  { key: 'occipital',   x: 326, y: 158, deep: false, label: 'Corteza visual',     fn: 'Imágenes mentales y color' },
  { key: 'temporal',    x: 196, y: 196, deep: false, label: 'Corteza auditiva',   fn: 'Procesamiento del sonido y melodía' },
  { key: 'broca',       x: 150, y: 190, deep: false, label: 'Área de Broca',      fn: 'Lenguaje, habla y letras' },
  { key: 'limbic',      x: 224, y: 168, deep: true,  label: 'Sistema límbico',    fn: 'Emociones profundas e instinto' },
  { key: 'hippocampus', x: 250, y: 186, deep: true,  label: 'Hipocampo',          fn: 'Memoria a largo plazo' },
  { key: 'accumbens',   x: 180, y: 180, deep: true,  label: 'Núcleo accumbens',   fn: 'Placer y recompensa (dopamina)' },
  { key: 'cerebellum',  x: 318, y: 234, deep: false, label: 'Cerebelo',           fn: 'Coordinación y sentido del compás' },
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
  gap: 14px;
  width: 100%;
  max-width: 380px;
}

.brain__svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

/* Relleno del cerebro */
.brain__fill {
  fill: rgba(255, 255, 255, 0.025);
}

/* Circunvoluciones */
.brain__gyri path {
  fill: none;
  stroke: var(--txt-dim);
  stroke-width: 1.1;
  opacity: 0.4;
  stroke-linecap: round;
}

/* Surcos principales */
.brain__sulcus {
  fill: none;
  stroke: var(--txt-dim);
  stroke-width: 1.6;
  opacity: 0.55;
  stroke-linecap: round;
}

/* Contorno */
.brain__outline {
  fill: none;
  stroke: var(--txt-primary);
  stroke-width: 2;
  opacity: 0.7;
  stroke-linejoin: round;
}

/* Cerebelo */
.brain__cerebellum {
  fill: rgba(255, 255, 255, 0.02);
  stroke: var(--txt-primary);
  stroke-width: 1.8;
  opacity: 0.6;
  stroke-linejoin: round;
}
.brain__cerebellum-folds {
  fill: none;
  stroke: var(--txt-dim);
  stroke-width: 1;
  opacity: 0.5;
}

/* Tronco */
.brain__stem {
  fill: none;
  stroke: var(--txt-primary);
  stroke-width: 1.8;
  opacity: 0.55;
  stroke-linejoin: round;
}

/* Regiones */
.brain__core {
  fill: var(--txt-dim);
  opacity: 0.5;
  transition: fill 0.5s, opacity 0.5s, r 0.5s;
}
.brain__region.active .brain__core {
  fill: var(--accent);
  opacity: 1;
}
.brain__blob {
  animation: blobPulse 2.6s ease-in-out infinite;
  transform-origin: center;
}
@keyframes blobPulse {
  0%, 100% { opacity: 0.75; }
  50%       { opacity: 1; }
}

/* Caption (nombre de la región) */
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
  0%, 100% { transform: scale(1);   opacity: 1; }
  50%       { transform: scale(1.5); opacity: 0.5; }
}

/* Leyenda de funciones (explicación extra) */
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
  letter-spacing: 0.3px;
}
.brain__legend-fn {
  font-size: 0.74rem;
  color: var(--txt-dim);
  line-height: 1.4;
}
</style>
