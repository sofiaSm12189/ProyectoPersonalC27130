<template>
  <div class="era-bg" aria-hidden="true">
    <Transition name="bgfade">
      <div class="era-bg__layer" :key="era ? era.id : 'none'">
        <!-- Tinte/gradiente de la época (siempre visible) -->
        <div
          class="era-bg__tint"
          :style="{ background: era ? era.bgGradient : 'transparent' }"
        ></div>
        <!-- Video collage de la época (si la usuaria lo subió) -->
        <video
          v-if="era && era.videoSrc"
          class="era-bg__video"
          :src="era.videoSrc"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          @error="onVideoError"
        ></video>
      </div>
    </Transition>
    <!-- Velo oscuro para mantener legible el contenido -->
    <div class="era-bg__veil"></div>
  </div>
</template>

<script setup>
defineProps({
  era: { type: Object, default: null },
})

// Si el video no existe aún, simplemente lo ocultamos (queda el gradiente)
function onVideoError(e) {
  e.target.style.display = 'none'
}
</script>

<style scoped>
.era-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.era-bg__layer {
  position: absolute;
  inset: 0;
}

.era-bg__tint {
  position: absolute;
  inset: 0;
  opacity: 0.5;
}

.era-bg__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Muy sutil: el collage se intuye, no domina */
  opacity: 0.16;
  filter: saturate(0.85) contrast(1.05);
  mix-blend-mode: screen;
}

/* Velo que oscurece el conjunto para que el texto se lea bien */
.era-bg__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(4, 4, 10, 0.55) 100%),
    linear-gradient(to bottom, rgba(4, 4, 10, 0.4), rgba(4, 4, 10, 0.7));
}

/* Crossfade entre épocas */
.bgfade-enter-active,
.bgfade-leave-active {
  transition: opacity 1.2s ease;
}
.bgfade-enter-from,
.bgfade-leave-to {
  opacity: 0;
}
.bgfade-leave-active {
  position: absolute;
  inset: 0;
}
</style>
