<template>
  <div class="narration" :style="{ '--accent': accentColor }">
    <audio
      ref="audioEl"
      :src="src || undefined"
      preload="none"
      @play="playing = true"
      @pause="playing = false"
      @ended="playing = false"
      @error="onError"
    ></audio>

    <button
      class="narration__btn"
      :class="{ 'is-playing': playing }"
      @click="toggle"
      :aria-label="playing ? 'Pausar narración' : 'Reproducir narración'"
    >
      <svg v-if="!playing" viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M8 5v14l11-7z" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20">
        <path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z" />
      </svg>
      <span class="narration__pulse"></span>
    </button>

    <div class="narration__text">
      <span class="narration__label">{{ playing ? 'Narración en curso' : label }}</span>
      <span v-if="playing" class="narration__waves" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i>
      </span>
      <span v-else-if="errored" class="narration__hint">
        Sube el audio a <code>{{ src }}</code>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  src:         { type: String, default: '' },
  label:       { type: String, default: 'Escuchar narración' },
  accentColor: { type: String, default: '#c9a84c' },
})

const audioEl = ref(null)
const playing = ref(false)
const errored = ref(false)

function toggle() {
  const el = audioEl.value
  if (!el) return
  if (el.paused) {
    el.play().catch(() => { errored.value = true })
  } else {
    el.pause()
  }
}
function onError() {
  if (props.src) errored.value = true
}

onUnmounted(() => {
  if (audioEl.value) audioEl.value.pause()
})
</script>

<style scoped>
.narration {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 8px 18px 8px 8px;
  border: 1px solid var(--border);
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.3s, background 0.3s;
}
.narration:hover {
  border-color: var(--accent);
}

.narration__btn {
  position: relative;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, color 0.3s, transform 0.2s;
}
.narration__btn:hover {
  background: var(--accent);
  color: var(--void);
}
.narration__btn:active { transform: scale(0.93); }

.narration__pulse {
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  opacity: 0;
}
.narration__btn.is-playing .narration__pulse {
  animation: narrPulse 1.8s ease-out infinite;
}
@keyframes narrPulse {
  0%   { opacity: 0.7; transform: scale(1); }
  100% { opacity: 0;   transform: scale(1.5); }
}

.narration__text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.narration__label {
  font-family: var(--font-modern);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--accent);
}
.narration__hint {
  font-size: 0.66rem;
  color: var(--txt-muted);
}
.narration__hint code {
  color: var(--accent);
}

.narration__waves {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 12px;
}
.narration__waves i {
  width: 3px;
  background: var(--accent);
  border-radius: 2px;
  animation: narrWave 1s ease-in-out infinite;
}
.narration__waves i:nth-child(1) { animation-delay: 0s;    height: 40%; }
.narration__waves i:nth-child(2) { animation-delay: 0.2s;  height: 90%; }
.narration__waves i:nth-child(3) { animation-delay: 0.4s;  height: 60%; }
.narration__waves i:nth-child(4) { animation-delay: 0.1s;  height: 100%; }
.narration__waves i:nth-child(5) { animation-delay: 0.3s;  height: 50%; }
@keyframes narrWave {
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1); }
}
</style>
