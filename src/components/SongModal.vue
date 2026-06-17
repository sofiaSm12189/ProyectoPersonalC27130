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

          <!-- Encabezado -->
          <div class="song-modal__head">
            <span class="song-modal__year">{{ song.year }}</span>
            <span class="song-modal__era">{{ eraName }}</span>
          </div>

          <h3 class="song-modal__title">{{ song.title }}</h3>
          <p class="song-modal__artist">
            <span class="song-modal__artist-icon">♪</span>
            {{ song.artist }}
          </p>

          <!-- Historia / cómo se creó / inspiración -->
          <div class="song-modal__story">
            <span class="song-modal__story-label">La historia detrás</span>
            <p>{{ song.significance }}</p>
          </div>

          <!-- Reproductor -->
          <div class="song-modal__player">
            <AudioPlayer :src="song.audioSrc" :accent-color="accentColor" />
          </div>

          <!-- Enlace a YouTube como apoyo si no hay audio aún -->
          <a
            v-if="!song.audioSrc && song.youtubeSearch"
            class="song-modal__yt"
            :href="`https://www.youtube.com/results?search_query=${encodeURIComponent(song.youtubeSearch)}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            Escuchar en YouTube mientras tanto ↗
          </a>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AudioPlayer from './AudioPlayer.vue'

const props = defineProps({
  song:        { type: Object, default: null },
  eraName:     { type: String, default: '' },
  accentColor: { type: String, default: '#c9a84c' },
})

const emit = defineEmits(['close'])

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
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
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(160deg, var(--card-bg) 0%, var(--surface) 100%);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  border-radius: 8px;
  padding: 36px 34px 32px;
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.95);
}
.song-modal__panel::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 140px;
  background: radial-gradient(ellipse at 50% 0%, var(--accent), transparent 70%);
  opacity: 0.12;
  pointer-events: none;
  border-radius: 8px 8px 0 0;
}

.song-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--txt-dim);
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s, border-color 0.3s, transform 0.2s;
}
.song-modal__close:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: rotate(90deg);
}

.song-modal__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
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
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--txt-bright);
  line-height: 1.25;
  margin-bottom: 8px;
}

.song-modal__artist {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  color: var(--accent);
  margin-bottom: 24px;
}
.song-modal__artist-icon { opacity: 0.7; }

.song-modal__story {
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid var(--accent);
  border-radius: 0 6px 6px 0;
  padding: 16px 18px;
  margin-bottom: 26px;
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

.song-modal__player {
  margin-bottom: 16px;
}

.song-modal__yt {
  display: inline-block;
  font-size: 0.78rem;
  color: var(--txt-dim);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: color 0.3s, border-color 0.3s;
}
.song-modal__yt:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* Transición */
.modal-enter-active,
.modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }
.modal-enter-active .song-modal__panel,
.modal-leave-active .song-modal__panel { transition: transform 0.4s var(--ease-expo); }
.modal-enter-from .song-modal__panel { transform: translateY(30px) scale(0.96); }

/* Scrollbar del panel */
.song-modal__panel::-webkit-scrollbar { width: 4px; }
.song-modal__panel::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

@media (max-width: 540px) {
  .song-modal__panel { padding: 30px 22px 26px; }
  .song-modal__title { font-size: 1.3rem; }
}
</style>
