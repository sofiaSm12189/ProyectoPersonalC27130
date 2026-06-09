<template>
  <section id="referencias" class="refs" aria-label="Referencias académicas">

    <div class="section-header reveal">
      <p class="eyebrow">El sustento</p>
      <h2>Música, Cerebro e Inteligencia</h2>
      <div class="divider-line"></div>
      <p class="lead">
        Este no es un análisis de opinión. Cada afirmación sobre el poder de la música
        en el pensamiento humano se apoya en investigación científica revisada por pares.
        Estas son las fuentes.
      </p>
    </div>

    <!-- Cita destacada -->
    <blockquote class="refs__pullquote reveal">
      <p>
        "La música es la actividad humana que involucra y coordina más regiones
        del cerebro al mismo tiempo que cualquier otra."
      </p>
      <cite>— Daniel J. Levitin, neurocientífico</cite>
    </blockquote>

    <!-- Lista de referencias académicas -->
    <div v-if="references.length" class="refs__list stagger">
      <article
        v-for="ref in references"
        :key="ref.id"
        class="refs__item"
      >
        <div class="refs__item-head">
          <span class="refs__year">{{ ref.year }}</span>
          <span class="refs__pub">{{ ref.publication }}</span>
        </div>
        <h3 class="refs__title">{{ ref.title }}</h3>
        <p class="refs__author">{{ ref.author }}</p>
        <p class="refs__summary">{{ ref.summary }}</p>
        <a
          :href="ref.url"
          target="_blank"
          rel="noopener noreferrer"
          class="refs__link"
        >
          Ver estudio
          <span aria-hidden="true">↗</span>
        </a>
      </article>
    </div>

    <p v-else class="refs__loading">Cargando referencias…</p>

    <!-- Pie de página del proyecto -->
    <footer class="refs__footer reveal">
      <div class="refs__footer-divider"></div>
      <p class="refs__footer-title font-classical">La Evolución de la Música</p>
      <p class="refs__footer-meta">
        Proyecto Personal · IF7102 Multimedios · I Ciclo 2026<br />
        Universidad de Costa Rica · Sede Regional de Guanacaste
      </p>
      <p class="refs__footer-note">
        Infografía interactiva construida con Vue 3 + Vite ·
        Opción 2: Infografía Interactiva Animada
      </p>
    </footer>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const references = ref([])

onMounted(async () => {
  try {
    const res  = await fetch('/data/eras.json')
    const data = await res.json()
    references.value = data.academicReferences ?? []
  } catch (e) {
    console.error('No se pudieron cargar las referencias', e)
  }
})
</script>

<style scoped>
.refs {
  position: relative;
  padding: 0 24px 80px;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(201, 168, 76, 0.06) 0%, transparent 50%),
    var(--deep);
  border-top: 1px solid var(--border);
}

/* ── Cita destacada ──────────────────────────────────── */
.refs__pullquote {
  max-width: 760px;
  margin: 0 auto 70px;
  text-align: center;
  padding: 0 20px;
}
.refs__pullquote p {
  font-family: var(--font-romantic);
  font-style: italic;
  font-size: clamp(1.2rem, 2.6vw, 1.7rem);
  color: var(--gold-100);
  line-height: 1.6;
  margin-bottom: 16px;
}
.refs__pullquote cite {
  font-style: normal;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold-700);
}

/* ── Lista de referencias ────────────────────────────── */
.refs__list {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.refs__item {
  background: linear-gradient(155deg, var(--card-bg) 0%, var(--surface) 100%);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s var(--ease-expo), border-color 0.4s,
    box-shadow 0.4s;
}
.refs__item:hover {
  transform: translateY(-4px);
  border-color: var(--gold-700);
  box-shadow: 0 24px 50px -28px rgba(0, 0, 0, 0.9);
}

.refs__item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.refs__year {
  font-family: var(--font-classical);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--gold-500);
}
.refs__pub {
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--txt-muted);
  text-align: right;
  max-width: 60%;
  line-height: 1.3;
}

.refs__title {
  font-family: var(--font-romantic);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--txt-bright);
  line-height: 1.35;
  margin-bottom: 8px;
}
.refs__author {
  font-size: 0.78rem;
  color: var(--gold-300);
  margin-bottom: 14px;
}
.refs__summary {
  font-size: 0.82rem;
  color: var(--txt-dim);
  line-height: 1.7;
  margin-bottom: 18px;
  flex: 1;
}

.refs__link {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold-500);
  text-decoration: none;
  padding: 6px 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, color 0.3s;
}
.refs__link:hover {
  color: var(--gold-300);
  border-color: var(--gold-500);
}

.refs__loading {
  text-align: center;
  color: var(--txt-muted);
  padding: 40px;
}

/* ── Pie de página ───────────────────────────────────── */
.refs__footer {
  max-width: 700px;
  margin: 90px auto 0;
  text-align: center;
}
.refs__footer-divider {
  width: 80px;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold-500), transparent);
  margin: 0 auto 30px;
}
.refs__footer-title {
  font-size: 1.3rem;
  color: var(--gold-100);
  letter-spacing: 1px;
  margin-bottom: 16px;
}
.refs__footer-meta {
  font-size: 0.82rem;
  color: var(--txt-dim);
  line-height: 1.8;
  margin-bottom: 16px;
}
.refs__footer-note {
  font-size: 0.72rem;
  color: var(--txt-muted);
  letter-spacing: 0.5px;
  line-height: 1.6;
}
</style>
