<template>
  <div class="player" :style="{ '--accent': accentColor }">

    <audio
      ref="audioEl"
      :src="src || undefined"
      preload="metadata"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoaded"
      @ended="onEnded"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @error="onError"
    ></audio>

    <div v-if="!src" class="player__empty">
      <span class="player__empty-icon">♪</span>
      <p>Audio aún no disponible.</p>
      <small>Sube el archivo a <code>public/audio/</code> y añade la ruta en el JSON.</small>
    </div>

    <div v-else-if="errored" class="player__empty">
      <span class="player__empty-icon">⚠</span>
      <p>No se pudo cargar el audio.</p>
      <small>Revisa que la ruta <code>{{ src }}</code> exista.</small>
    </div>

    <div v-else class="player__controls">
      <button
        class="player__btn player__btn--skip"
        @click="skip(-10)"
        aria-label="Retroceder 10 segundos"
        title="Retroceder 10s"
      >
        <span>10</span>
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12.5 3a9 9 0 1 0 8.94 10h-2.02A7 7 0 1 1 12.5 5V8l4-4-4-4v3z" transform="scale(-1,1) translate(-24,0)"/></svg>
      </button>

      <button
        class="player__btn player__btn--play"
        @click="toggle"
        :aria-label="isPlaying ? 'Pausar' : 'Reproducir'"
      >
        <svg v-if="!isPlaying" viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
        <svg v-else viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>

      <button
        class="player__btn player__btn--skip"
        @click="skip(10)"
        aria-label="Adelantar 10 segundos"
        title="Adelantar 10s"
      >
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12.5 3a9 9 0 1 1-8.94 10h2.02A7 7 0 1 0 12.5 5V8l-4-4 4-4v3z"/></svg>
        <span>10</span>
      </button>

      <div class="player__track">
        <div
          class="player__bar"
          ref="barEl"
          @click="seek"
          role="slider"
          :aria-valuenow="Math.round(progressPct)"
          aria-label="Barra de progreso"
        >
          <div class="player__bar-fill" :style="{ width: progressPct + '%' }">
            <span class="player__bar-handle"></span>
          </div>
        </div>
        <div class="player__time">
          <span>{{ fmt(currentTime) }}</span>
          <span>{{ fmt(duration) }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { connectAnalyser } from '../composables/useAudioAnalyser.js'

const props = defineProps({
  src:         { type: String, default: '' },
  accentColor: { type: String, default: '#c9a84c' },
})

const audioEl    = ref(null)
const barEl      = ref(null)
const isPlaying  = ref(false)
const currentTime = ref(0)
const duration   = ref(0)
const errored    = ref(false)

const progressPct = computed(() =>
  duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
)

let analyserObj = null
function toggle() {
  const el = audioEl.value
  if (!el) return
  if (el.paused) {
    if (!analyserObj) analyserObj = connectAnalyser(el)
    el.play().catch(() => { errored.value = true })
  } else el.pause()
}
function getAnalyser() { return analyserObj }

function skip(seconds) {
  const el = audioEl.value
  if (!el) return
  el.currentTime = Math.min(Math.max(el.currentTime + seconds, 0), duration.value || 0)
}

function seek(event) {
  const el = audioEl.value
  const bar = barEl.value
  if (!el || !bar || !duration.value) return
  const rect = bar.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  el.currentTime = Math.min(Math.max(ratio, 0), 1) * duration.value
}

function onTimeUpdate() { currentTime.value = audioEl.value?.currentTime || 0 }
function onLoaded()     { duration.value = audioEl.value?.duration || 0; errored.value = false }
function onEnded()      { isPlaying.value = false; currentTime.value = 0 }
function onError()      { if (props.src) errored.value = true }

function fmt(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

watch(() => props.src, () => {
  errored.value = false
  currentTime.value = 0
  duration.value = 0
  isPlaying.value = false
})

onUnmounted(() => {
  if (audioEl.value) { audioEl.value.pause(); audioEl.value.src = '' }
})

defineExpose({
  pause: () => audioEl.value?.pause(),
  getAnalyser,
})
</script>

<style scoped>
.player {
  width: 100%;
}

.player__empty {
  text-align: center;
  padding: 20px 16px;
  border: 1px dashed var(--border);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.015);
}
.player__empty-icon {
  font-size: 1.6rem;
  color: var(--accent);
  display: block;
  margin-bottom: 6px;
}
.player__empty p {
  font-size: 0.85rem;
  color: var(--txt-primary);
  margin-bottom: 4px;
}
.player__empty small {
  font-size: 0.72rem;
  color: var(--txt-muted);
}
.player__empty code {
  color: var(--accent);
  font-size: 0.7rem;
}

.player__controls {
  display: flex;
  align-items: center;
  gap: 14px;
}

.player__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--txt-primary);
  cursor: pointer;
  border-radius: 50%;
  transition: border-color 0.3s, color 0.3s, background 0.3s, transform 0.2s;
}
.player__btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.player__btn:active { transform: scale(0.92); }

.player__btn--play {
  width: 50px;
  height: 50px;
  border-color: var(--accent);
  color: var(--accent);
  flex-shrink: 0;
}
.player__btn--play:hover {
  background: var(--accent);
  color: var(--void);
}

.player__btn--skip {
  width: 40px;
  height: 40px;
  font-size: 0.6rem;
  font-weight: 700;
  flex-direction: column;
  line-height: 1;
  flex-shrink: 0;
}
.player__btn--skip span { font-size: 0.58rem; }

.player__track {
  flex: 1;
  min-width: 0;
}
.player__bar {
  height: 6px;
  background: var(--border);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}
.player__bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  position: relative;
  transition: width 0.1s linear;
}
.player__bar-handle {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  opacity: 0;
  transition: opacity 0.2s;
}
.player__bar:hover .player__bar-handle { opacity: 1; }

.player__time {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 0.7rem;
  color: var(--txt-dim);
  font-variant-numeric: tabular-nums;
}
</style>
