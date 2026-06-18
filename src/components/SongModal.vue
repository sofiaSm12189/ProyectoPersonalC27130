<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="song"
        class="song-modal"
        :style="{ '--accent': accentColor }"
        @click.self="$emit('close')"
      >
        <div class="song-modal__panel" role="dialog" aria-modal="true">
          <button class="song-modal__close" @click="$emit('close')" aria-label="Cerrar">
            ✕
          </button>

          <div v-if="song.image" class="song-modal__cover">
            <img
              :src="song.image"
              :alt="song.title"
              @error="(e) => (e.target.parentElement.style.display = 'none')"
            />
            <div class="song-modal__cover-fade"></div>

            <div class="song-modal__viz" aria-hidden="true">
              <span
                v-for="(b, i) in bars"
                :key="i"
                class="song-modal__viz-bar"
                :style="{ height: (3 + b * 60) + 'px', opacity: 0.35 + b * 0.65 }"
              ></span>
            </div>
          </div>

          <div class="song-modal__body">
            <div class="song-modal__head">
              <span class="song-modal__year">{{ song.year }}</span>
              <span class="song-modal__era">{{ eraName }}</span>
            </div>

            <h3 class="song-modal__title">{{ song.title }}</h3>
            <p class="song-modal__artist">
              <span class="song-modal__artist-icon">♪</span>
              {{ song.artist }}
            </p>

            <div class="song-modal__player">
              <AudioPlayer
                ref="playerRef"
                :src="song.audioSrc"
                :accent-color="accentColor"
              />
            </div>

            <a
              v-if="!song.audioSrc && song.youtubeSearch"
              class="song-modal__yt"
              :href="`https://www.youtube.com/results?search_query=${encodeURIComponent(song.youtubeSearch)}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escuchar en YouTube mientras tanto ↗
            </a>

            <div class="song-modal__story">
              <span class="song-modal__story-label">Por qué importa</span>
              <p>{{ song.significance }}</p>
            </div>

            <div v-if="song.story" class="song-modal__creation">
              <span class="song-modal__creation-label">
                <span class="song-modal__creation-dot"></span>
                Cómo nació esta obra
              </span>
              <p>{{ song.story }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AudioPlayer from './AudioPlayer.vue'
import { getBars } from '../composables/useAudioAnalyser.js'

const props = defineProps({
  song:        { type: Object, default: null },
  era:         { type: Object, default: null },
  accentColor: { type: String, default: '#c9a84c' },
})

const emit = defineEmits(['close'])

const eraName = computed(() => props.era?.name || '')

const BAR_COUNT = 36
const bars = ref(new Array(BAR_COUNT).fill(0))
const playerRef = ref(null)
let rafViz = null

function vizLoop() {
  const analyser = playerRef.value?.getAnalyser?.()
  if (analyser) bars.value = getBars(analyser, BAR_COUNT)
  rafViz = requestAnimationFrame(vizLoop)
}

watch(
  () => props.song,
  (s) => {
    if (s && !rafViz) {
      rafViz = requestAnimationFrame(vizLoop)
    } else if (!s && rafViz) {
      cancelAnimationFrame(rafViz)
      rafViz = null
      bars.value = new Array(BAR_COUNT).fill(0)
    }
  }
)

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (rafViz) cancelAnimationFrame(rafViz)
})
</script>

<style scoped>
.song-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(2, 2, 6, 0.82);
  backdrop-filter: blur(6px);
}

.song-modal__panel {
  position: relative;
  width: 100%;
  max-width: 580px;
  max-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(160deg, var(--card-bg) 0%, var(--surface) 100%);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 8px;
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.95);
}

.song-modal__cover {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 340px;
  overflow: hidden;
  background: var(--surface);
}
.song-modal__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
  display: block;
}
.song-modal__cover-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 45%, rgba(17, 16, 32, 0.4) 75%, var(--card-bg) 100%);
}

.song-modal__viz {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  padding: 0 18px 4px;
}
.song-modal__viz-bar {
  flex: 1;
  max-width: 7px;
  min-height: 3px;
  background: linear-gradient(to top, var(--accent), transparent);
  border-radius: 2px 2px 0 0;
  transition: height 0.06s linear, opacity 0.06s linear;
}

.song-modal__body {
  position: relative;
  overflow-y: auto;
  padding: 26px 32px 30px;
}

.song-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  background: rgba(2, 2, 6, 0.5);
  color: var(--txt-bright);
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s, border-color 0.3s, transform 0.2s, background 0.3s;
}
.song-modal__close:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: rgba(2, 2, 6, 0.8);
  transform: rotate(90deg);
}

.song-modal__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.song-modal__year {
  font-family: var(--font-classical);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
}
.song-modal__era {
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--txt-muted);
  border-left: 1px solid var(--border);
  padding-left: 12px;
}

.song-modal__title {
  font-family: var(--font-romantic);
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--txt-bright);
  line-height: 1.22;
  margin-bottom: 8px;
}

.song-modal__artist {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: var(--accent);
  margin-bottom: 22px;
}
.song-modal__artist-icon { opacity: 0.7; }

.song-modal__player {
  margin-bottom: 14px;
}

.song-modal__yt {
  display: inline-block;
  font-size: 0.78rem;
  color: var(--txt-dim);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  margin-bottom: 22px;
  transition: color 0.3s, border-color 0.3s;
}
.song-modal__yt:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.song-modal__story {
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid var(--accent);
  border-radius: 0 6px 6px 0;
  padding: 16px 18px;
  margin: 22px 0;
}
.song-modal__story-label {
  display: block;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}
.song-modal__story p {
  font-size: 0.92rem;
  line-height: 1.8;
  color: var(--txt-primary);
  font-style: italic;
}

.song-modal__creation {
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
  border-radius: 0 6px 6px 0;
  padding: 16px 18px;
  margin-bottom: 6px;
  background: rgba(255, 255, 255, 0.012);
}
.song-modal__creation-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 10px;
}
.song-modal__creation-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: ctxPulse 1.8s ease-in-out infinite;
}
@keyframes ctxPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}
.song-modal__creation p {
  font-size: 0.9rem;
  line-height: 1.85;
  color: var(--txt-primary);
}

.modal-enter-active,
.modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-active .song-modal__panel,
.modal-leave-active .song-modal__panel { transition: transform 0.4s var(--ease-expo); }
.modal-enter-from .song-modal__panel { transform: translateY(30px) scale(0.96); }

.song-modal__body::-webkit-scrollbar { width: 4px; }
.song-modal__body::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

@media (max-width: 540px) {
  .song-modal__cover { height: 240px; }
  .song-modal__body { padding: 22px 22px 26px; }
  .song-modal__title { font-size: 1.35rem; }
}
</style>
