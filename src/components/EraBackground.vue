<template>
  <div class="era-bg" aria-hidden="true">
    <Transition name="bgfade">
      <div class="era-bg__layer" :key="era ? era.id : 'none'">

        <div
          class="era-bg__tint"
          :style="{ background: era ? era.bgGradient : 'transparent' }"
        ></div>
      </div>
    </Transition>

    <div class="era-bg__veil"></div>
  </div>
</template>

<script setup>
defineProps({
  era: { type: Object, default: null },
})
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

.era-bg__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(4, 4, 10, 0.55) 100%),
    linear-gradient(to bottom, rgba(4, 4, 10, 0.4), rgba(4, 4, 10, 0.7));
}

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
