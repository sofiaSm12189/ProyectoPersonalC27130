<template>
  <section id="reflexion" class="reflect" aria-label="Reflexión final">

    <div class="reflect__inner">
      <div class="section-header reveal">
        <p class="eyebrow">El veredicto</p>
        <h2>¿Qué perdimos en el camino?</h2>
        <div class="divider-line"></div>
        <p class="lead">
          Durante dos siglos seguimos el mismo hilo sonoro. Al llegar al final,
          conviene detenerse y preguntar qué cambió realmente, y qué dice eso de nosotros.
        </p>
      </div>

      <div class="reflect__narration reveal">
        <NarrationButton
          src="/audio/narracion3.mp3"
          label="Escuchar la reflexión"
        />
      </div>

      <!-- Contraste 1824 vs 2024 -->
      <div class="reflect__contrast reveal">
        <div class="reflect__side reflect__side--then">
          <span class="reflect__side-year">1824</span>
          <p class="reflect__side-text">
            Un hombre completamente sordo escribe una sinfonía de 70 minutos.
            Dos siglos después, la humanidad entera la sigue escuchando.
          </p>
        </div>
        <div class="reflect__vs">
          <span class="reflect__vs-line"></span>
          <span class="reflect__vs-text">vs</span>
          <span class="reflect__vs-line"></span>
        </div>
        <div class="reflect__side reflect__side--now">
          <span class="reflect__side-year reflect__side-year--now">2024</span>
          <p class="reflect__side-text">
            Una canción dura 2 minutos y se diseña para que no la saltes
            en los primeros 7 segundos. A los 30 días, el algoritmo ya la olvidó.
          </p>
        </div>
      </div>

      <!-- Estadísticas del declive -->
      <div class="reflect__stats stagger">
        <div class="reflect__stat">
          <span class="reflect__stat-num">−60<small>%</small></span>
          <span class="reflect__stat-label">Complejidad armónica</span>
          <span class="reflect__stat-sub">en el pop entre 1960 y 2010</span>
        </div>
        <div class="reflect__stat">
          <span class="reflect__stat-num">−40<small>%</small></span>
          <span class="reflect__stat-label">Riqueza del vocabulario</span>
          <span class="reflect__stat-sub">en las letras frente a los años 80</span>
        </div>
        <div class="reflect__stat">
          <span class="reflect__stat-num">7<small>s</small></span>
          <span class="reflect__stat-label">Para enganchar</span>
          <span class="reflect__stat-sub">antes de que el oyente salte</span>
        </div>
      </div>

      <!-- Reflexión central -->
      <div class="reflect__body reveal">
        <p>
          La música no se volvió peor por accidente. Cada vez que elegimos lo inmediato
          sobre lo profundo, le enseñamos al algoritmo qué darnos de vuelta. Él solo
          nos devuelve, amplificado, lo que le pedimos.
        </p>
        <p>
          Beethoven, Tchaikovsky o Chopin no escribían para retener tu atención:
          escribían para <em>transformarla</em>. Confiaban en que les regalaras
          cuarenta minutos de escucha y, a cambio, te devolvían una parte de ti mismo
          que no sabías que existía.
        </p>
      </div>

      <!-- Cita final -->
      <blockquote class="reflect__quote reveal">
        <p>
          La pregunta no es si la música está muriendo.<br />
          Es si todavía sabemos <em>escuchar</em>.
        </p>
      </blockquote>

      <!-- Llamado final -->
      <div class="reflect__cta reveal">
        <p class="reflect__cta-text">
          Hoy, la música más profunda de la historia está a un clic de distancia.
          Nunca fue tan fácil escucharla. Solo hay que decidir hacerlo.
        </p>
        <a href="#timeline" class="reflect__cta-btn">
          <span>Volver a recorrer la historia</span>
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import NarrationButton from './NarrationButton.vue'
</script>

<style scoped>
.reflect {
  position: relative;
  padding: 40px 24px 100px;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(244, 114, 182, 0.05) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 100%, rgba(201, 168, 76, 0.05) 0%, transparent 45%),
    var(--void);
  border-top: 1px solid var(--border);
}

.reflect__inner {
  max-width: 920px;
  margin: 0 auto;
}

.reflect__narration {
  display: flex;
  justify-content: center;
  margin: 0 0 56px;
}

/* Contraste */
.reflect__contrast {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  margin: 20px 0 70px;
}
.reflect__side {
  padding: 28px 26px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.012);
}
.reflect__side--then { border-top: 2px solid var(--gold-500); }
.reflect__side--now { border-top: 2px solid var(--pink-glow); }

.reflect__side-year {
  display: block;
  font-family: var(--font-classical);
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--gold-500);
  margin-bottom: 12px;
  letter-spacing: 1px;
}
.reflect__side-year--now { color: var(--pink-glow); }

.reflect__side-text {
  font-size: 0.92rem;
  line-height: 1.8;
  color: var(--txt-primary);
}

.reflect__vs {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.reflect__vs-line {
  width: 1px;
  height: 28px;
  background: linear-gradient(to bottom, transparent, var(--txt-muted), transparent);
}
.reflect__vs-text {
  font-family: var(--font-romantic);
  font-style: italic;
  font-size: 1.1rem;
  color: var(--txt-dim);
}

/* Estadísticas */
.reflect__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 80px;
}
.reflect__stat {
  text-align: center;
  padding: 32px 18px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.015), transparent);
}
.reflect__stat-num {
  display: block;
  font-family: var(--font-classical);
  font-size: clamp(2.6rem, 6vw, 3.8rem);
  font-weight: 900;
  color: var(--txt-bright);
  line-height: 1;
  margin-bottom: 14px;
}
.reflect__stat-num small {
  font-size: 0.45em;
  color: var(--gold-500);
  margin-left: 2px;
}
.reflect__stat-label {
  display: block;
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--txt-primary);
  margin-bottom: 4px;
}
.reflect__stat-sub {
  display: block;
  font-size: 0.72rem;
  color: var(--txt-dim);
  line-height: 1.4;
}

/* Reflexión */
.reflect__body {
  max-width: 680px;
  margin: 0 auto 70px;
}
.reflect__body p {
  font-size: 1.05rem;
  line-height: 2;
  color: var(--txt-primary);
  margin-bottom: 24px;
  text-align: center;
}
.reflect__body em {
  font-family: var(--font-romantic);
  font-style: italic;
  color: var(--gold-300);
}

/* Cita final */
.reflect__quote {
  text-align: center;
  margin: 0 auto 70px;
  max-width: 760px;
}
.reflect__quote p {
  font-family: var(--font-classical);
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.5;
  color: var(--gold-100);
}
.reflect__quote em {
  font-family: var(--font-romantic);
  font-style: italic;
  color: var(--gold-500);
}

/* Llamado final */
.reflect__cta {
  text-align: center;
  max-width: 620px;
  margin: 0 auto;
}
.reflect__cta-text {
  font-size: 0.95rem;
  line-height: 1.9;
  color: var(--txt-dim);
  margin-bottom: 32px;
}
.reflect__cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 13px 30px;
  border: 1px solid var(--gold-700);
  color: var(--gold-300);
  text-decoration: none;
  font-family: var(--font-classical);
  font-size: 0.78rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  transition: color 0.3s;
}
.reflect__cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gold-900);
  transform: translateX(-101%);
  transition: transform 0.4s var(--ease-expo);
}
.reflect__cta-btn:hover::before { transform: translateX(0); }
.reflect__cta-btn:hover { color: var(--gold-100); }
.reflect__cta-btn span { position: relative; z-index: 1; }

@media (max-width: 720px) {
  .reflect__contrast { grid-template-columns: 1fr; }
  .reflect__vs { flex-direction: row; gap: 14px; }
  .reflect__vs-line { width: 40px; height: 1px; }
  .reflect__stats { grid-template-columns: 1fr; }
}
</style>
