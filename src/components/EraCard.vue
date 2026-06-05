<template>
  <!-- Placeholder — implementación completa en Commit 2 -->
  <div class="era-card-stub">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  era: { type: Object, required: true },
  index: { type: Number, default: 0 },
})
</script>

<style scoped>
.era-card-stub { display: contents; }
</style>
