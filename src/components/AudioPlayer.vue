<template>
  <!-- Placeholder — implementación completa en Commit 4 -->
  <div class="audio-player-stub">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  src:       { type: String, default: '' },
  youtubeId: { type: String, default: '' },
  title:     { type: String, default: '' },
  artist:    { type: String, default: '' },
})
</script>

<style scoped>
.audio-player-stub { display: contents; }
</style>
