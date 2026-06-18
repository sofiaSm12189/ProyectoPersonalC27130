<template>
  <div id="app">
    <HeroSection />
    <TimelineSection />
    <ReflectionSection />
    <ReferencesSection />
  </div>
</template>

<script setup>
import HeroSection       from './components/HeroSection.vue'
import TimelineSection   from './components/TimelineSection.vue'
import ReflectionSection from './components/ReflectionSection.vue'
import ReferencesSection from './components/ReferencesSection.vue'
import { useScrollReveal } from './composables/useScrollReveal.js'

useScrollReveal()
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
