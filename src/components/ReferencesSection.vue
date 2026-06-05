<template>
  <!-- Placeholder — implementación completa en Commit 5 -->
  <footer class="references-stub" aria-label="Referencias académicas">
    <p class="eyebrow" style="text-align:center; padding: 60px 24px 20px;">
      Basado en investigación académica real
    </p>
    <p style="text-align:center; color: var(--txt-muted); font-size:0.8rem; padding-bottom:60px;">
      Referencias completas en la sección final
    </p>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const refs = ref([])

onMounted(async () => {
  const res  = await fetch('/data/eras.json')
  const data = await res.json()
  refs.value = data.academicReferences ?? []
})
</script>
