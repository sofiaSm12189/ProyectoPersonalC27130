<template>
  <section class="hero" aria-label="Sección de inicio">
    <div class="hero__particles" aria-hidden="true">
      <span
        v-for="n in 24"
        :key="n"
        class="particle"
        :style="particleStyle(n)"
      ></span>
    </div>

    <div class="hero__split">
      <div class="hero__panel hero__panel--classical">
        <div class="hero__vignette"></div>
        <div class="hero__panel-content">
          <div class="hero__portrait-frame hero__portrait-frame--gold">
            <img
              :src="tchaikovskyImg"
              alt="Piotr Ilyich Tchaikovsky"
              class="hero__portrait hero__portrait--sepia"
              @error="(e) => (e.target.style.display = 'none')"
            />
            <div class="hero__portrait-placeholder">
              <span class="hero__initial">T</span>
              <span class="hero__note">𝄞</span>
            </div>
          </div>

          <div class="hero__meta">
            <span class="hero__year-tag">1840 — 1893</span>
            <h2 class="hero__composer-name">
              Piotr Ilyich<br />
              <strong>Tchaikovsky</strong>
            </h2>
            <blockquote class="hero__quote hero__quote--left">
              "La música no es una ilusión,<br />sino una revelación."
            </blockquote>
          </div>
        </div>
      </div>

      <div class="hero__center-divider" aria-hidden="true">
        <div class="hero__divider-line"></div>
        <div class="hero__divider-icon">♩</div>
        <div class="hero__divider-line hero__divider-line--bottom"></div>
      </div>

      <div class="hero__panel hero__panel--modern">
        <div class="hero__vignette hero__vignette--right"></div>
        <div class="hero__panel-content hero__panel-content--right">
          <div class="hero__portrait-frame hero__portrait-frame--purple">
            <img
              :src="sabrinaImg"
              alt="Sabrina Carpenter"
              class="hero__portrait hero__portrait--vivid"
              @error="(e) => (e.target.style.display = 'none')"
            />
            <div
              class="hero__portrait-placeholder hero__portrait-placeholder--modern"
            >
              <span class="hero__initial hero__initial--modern">S</span>
              <span class="hero__note hero__note--modern">♪</span>
            </div>
          </div>

          <div class="hero__meta hero__meta--right">
            <span class="hero__year-tag hero__year-tag--modern"
              >2004 — hoy</span
            >
            <h2 class="hero__composer-name hero__composer-name--modern">
              Sabrina<br />
              <strong>Carpenter</strong>
            </h2>
            <blockquote class="hero__quote hero__quote--right">
              "Please please please<br />please please"
            </blockquote>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Bloque de título principal ── -->
    <div class="hero__title-block">
      <p class="hero__eyebrow">Un análisis desde 1800 hasta hoy</p>
      <h1 class="hero__title">
        La <em>Evolución</em> de<br />
        la <strong>Música</strong>
      </h1>
      <p class="hero__subtitle-text">
        De la sinfonía que reveló el alma humana<br />
        al pop que fabrica el algoritmo
      </p>
      <a href="#timeline" class="hero__cta">
        <span>Comenzar el viaje</span>
        <span class="hero__cta-arrow" aria-hidden="true">↓</span>
      </a>
    </div>

    <!-- Indicador de scroll -->
    <div class="hero__scroll-indicator" aria-hidden="true">
      <div class="hero__scroll-bar"></div>
    </div>
  </section>
</template>

<script setup>
const tchaikovskyImg = "/images/tchaikovsky.webp";
const sabrinaImg = "/images/sabrina.webp";

function particleStyle(n) {
  return {
    left: `${(n * 17.3) % 100}%`,
    top: `${(n * 31.7) % 100}%`,
    width: `${(n % 2) + 1}px`,
    height: `${(n % 2) + 1}px`,
    animationDelay: `${(n * 0.37) % 5}s`,
    animationDuration: `${3 + (n % 4)}s`,
    opacity: `${0.2 + (n % 5) * 0.08}`,
  };
}
</script>

<style scoped>
/* ── Hero layout ─────────────────────────────────────── */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  background: var(--void);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

/* ── Partículas ──────────────────────────────────────── */
.hero__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: var(--gold-500);
  animation: particleRise linear infinite;
}

@keyframes particleRise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0);
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(-80px) scale(1.8);
  }
}

/* ── Paneles ─────────────────────────────────────────── */
.hero__split {
  position: absolute;
  inset: 0;
  display: flex;
  z-index: 2;
}

.hero__panel {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.hero__panel--classical {
  background: radial-gradient(
    ellipse at 40% 40%,
    #1c0e00 0%,
    #0a0600 60%,
    #040403 100%
  );
}

.hero__panel--modern {
  background: radial-gradient(
    ellipse at 60% 40%,
    #0d0025 0%,
    #08001a 60%,
    #040408 100%
  );
}

/* Viñeta que se funde hacia el centro */
.hero__vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent 60%,
    rgba(4, 4, 10, 0.85) 100%
  );
  z-index: 2;
  pointer-events: none;
}
.hero__vignette--right {
  background: linear-gradient(
    to left,
    transparent 60%,
    rgba(4, 4, 10, 0.85) 100%
  );
}

/* Resplandor ambiental por panel */
.hero__panel--classical::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 35%,
    rgba(201, 168, 76, 0.12) 0%,
    transparent 65%
  );
  pointer-events: none;
}
.hero__panel--modern::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 35%,
    rgba(192, 132, 252, 0.12) 0%,
    transparent 65%
  );
  pointer-events: none;
}

/* ── Contenido interno de cada panel ─────────────────── */
.hero__panel-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 60px 40px 160px 56px;
  gap: 28px;
}
.hero__panel-content--right {
  align-items: flex-end;
  padding: 60px 56px 160px 40px;
}

/* ── Marco del retrato ───────────────────────────────── */
.hero__portrait-frame {
  position: relative;
  width: 260px;
  height: 340px;
  flex-shrink: 0;
}

.hero__portrait-frame--gold {
  box-shadow:
    0 0 0 1px var(--gold-700),
    0 0 32px rgba(201, 168, 76, 0.25);
}
.hero__portrait-frame--purple {
  box-shadow:
    0 0 0 1px var(--purple-mid),
    0 0 32px rgba(192, 132, 252, 0.25);
}

.hero__portrait {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
  z-index: 2;
}
.hero__portrait--sepia {
  filter: sepia(0.45) contrast(1.05) brightness(0.95);
}
.hero__portrait--vivid {
  filter: contrast(1.15) saturate(1.15) brightness(0.95);
}

.hero__portrait-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #1a0e02 0%, #0a0600 100%);
  gap: 4px;
  z-index: 1;
}
.hero__portrait-placeholder--modern {
  background: linear-gradient(180deg, #0d0025 0%, #04040a 100%);
}

.hero__initial {
  font-family: var(--font-classical);
  font-size: 4.5rem;
  font-weight: 900;
  color: var(--gold-500);
  line-height: 1;
  text-shadow: 0 0 20px var(--gold-700);
}
.hero__initial--modern {
  color: var(--purple-glow);
  text-shadow: 0 0 20px var(--purple-mid);
}

.hero__note {
  font-size: 1.8rem;
  color: var(--gold-300);
  opacity: 0.4;
}
.hero__note--modern {
  color: var(--purple-glow);
}

.hero__meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hero__meta--right {
  align-items: flex-end;
  text-align: right;
}

.hero__year-tag {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--gold-700);
}
.hero__year-tag--modern {
  color: var(--purple-mid);
}

.hero__composer-name {
  font-family: var(--font-romantic);
  font-size: 2.4rem;
  font-weight: 400;
  color: var(--gold-100);
  line-height: 1.05;
}
.hero__composer-name strong {
  display: block;
  font-size: 3.2rem;
  font-weight: 700;
}
.hero__composer-name--modern {
  color: var(--txt-bright);
}

.hero__quote {
  font-family: var(--font-romantic);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--txt-bright);
  line-height: 1.55;
  max-width: 300px;
  opacity: 1;
}
.hero__quote--left {
  border-left: 2px solid var(--gold-500);
  padding-left: 12px;
}
.hero__quote--right {
  border-right: 2px solid var(--purple-glow);
  padding-right: 12px;
}

.hero__center-divider {
  width: 2px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 4;
  padding: 60px 0 160px;
}

.hero__divider-line {
  flex: 1;
  width: 1px;
  background: linear-gradient(to bottom, transparent, var(--gold-500));
}
.hero__divider-line--bottom {
  background: linear-gradient(to bottom, var(--purple-glow), transparent);
}

.hero__divider-icon {
  font-size: 1.4rem;
  color: var(--gold-500);
  padding: 10px 0;
  filter: drop-shadow(0 0 8px var(--gold-500));
  animation: dividerPulse 3s ease-in-out infinite;
}

@keyframes dividerPulse {
  0%,
  100% {
    filter: drop-shadow(0 0 8px var(--gold-500));
  }
  50% {
    filter: drop-shadow(0 0 20px var(--gold-300));
  }
}

.hero__title-block {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 24px 56px;
  width: 100%;
  background: linear-gradient(
    to top,
    var(--void) 50%,
    rgba(4, 4, 10, 0.5) 80%,
    transparent 100%
  );
}

.hero__eyebrow {
  font-size: 0.65rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold-700);
  margin-bottom: 14px;
}

.hero__title {
  font-family: var(--font-classical);
  font-size: clamp(2.2rem, 5.5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.1;
  color: var(--gold-100);
  letter-spacing: -0.5px;
  margin-bottom: 18px;
}
.hero__title em {
  font-family: var(--font-romantic);
  font-style: italic;
  color: var(--gold-500);
}
.hero__title strong {
  display: inline;
  color: var(--txt-bright);
}

.hero__subtitle-text {
  font-size: 0.9rem;
  color: var(--txt-dim);
  line-height: 1.85;
  margin-bottom: 36px;
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 30px;
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
.hero__cta::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--gold-900);
  transform: translateX(-101%);
  transition: transform 0.4s var(--ease-expo);
}
.hero__cta:hover::before {
  transform: translateX(0);
}
.hero__cta:hover {
  color: var(--gold-100);
}
.hero__cta span,
.hero__cta-arrow {
  position: relative;
  z-index: 1;
}
.hero__cta-arrow {
  animation: arrowBounce 2s ease-in-out infinite;
  font-size: 1.1rem;
}

@keyframes arrowBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

.hero__scroll-indicator {
  position: absolute;
  bottom: 18px;
  right: 22px;
  z-index: 10;
}
.hero__scroll-bar {
  width: 1px;
  height: 42px;
  background: linear-gradient(to bottom, transparent, var(--gold-500));
  animation: scrollGrow 2.2s ease-in-out infinite;
  transform-origin: top;
}
@keyframes scrollGrow {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scaleY(1);
  }
}

@media (max-width: 768px) {
  .hero__split {
    flex-direction: column;
  }
  .hero__panel {
    height: 38vh;
    min-height: 220px;
  }

  .hero__panel-content,
  .hero__panel-content--right {
    padding: 30px 20px 20px 20px;
    align-items: center;
    justify-content: flex-start;
  }

  .hero__portrait-frame {
    width: 220px;
    height: 280px;
  }

  .hero__quote,
  .hero__quote--left,
  .hero__quote--right {
    display: none;
  }

  .hero__center-divider {
    width: 100%;
    height: 2px;
    flex-direction: row;
    padding: 0 60px;
  }
  .hero__divider-line,
  .hero__divider-line--bottom {
    flex: 1;
    height: 1px;
    width: auto;
    background: linear-gradient(
      to right,
      transparent,
      var(--gold-500),
      transparent
    );
  }

  .hero__title-block {
    padding: 0 16px 40px;
  }

  .hero__title {
    font-size: 2rem;
  }
}
</style>
