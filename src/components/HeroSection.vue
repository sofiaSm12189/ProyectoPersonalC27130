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
          <div
            class="hero__portrait-frame hero__portrait-frame--gold"
            @mouseenter="hoverPlay('tchaikovsky')"
            @mouseleave="hoverStop('tchaikovsky')"
            title="Pasa el cursor para escuchar"
          >
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
            <span class="hero__audio-badge" aria-hidden="true">♪</span>
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
          <div
            class="hero__portrait-frame hero__portrait-frame--purple"
            @mouseenter="hoverPlay('sabrina')"
            @mouseleave="hoverStop('sabrina')"
            title="Pasa el cursor para escuchar"
          >
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
            <span class="hero__audio-badge hero__audio-badge--modern" aria-hidden="true">♪</span>
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

    <div class="hero__emit-global" aria-hidden="true">
      <span
        v-for="p in particles"
        :key="p.id"
        class="hero__emit"
        :style="emitStyle(p)"
        >{{ p.sym }}</span
      >
    </div>

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
      <a href="#timeline" class="hero__cta" @click="playClick">
        <span>Comenzar el viaje</span>
        <span class="hero__cta-arrow" aria-hidden="true">↓</span>
      </a>

      <div class="hero__narration">
        <NarrationButton
          src="/audio/narracion1.mp3"
          label="Escuchar la introducción"
        />
      </div>
    </div>

    <div class="hero__scroll-indicator" aria-hidden="true">
      <div class="hero__scroll-bar"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { connectAnalyser, getLevel } from "../composables/useAudioAnalyser.js";
import NarrationButton from "./NarrationButton.vue";

const tchaikovskyImg = "/images/tchaikovsky.webp";
const sabrinaImg = "/images/sabrina.webp";

const clickSound =
  typeof Audio !== "undefined" ? new Audio("/audio/click.mp3") : null;
function playClick() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.volume = 0.6;
  clickSound.play().catch(() => {});
}

const hasAudio = typeof Audio !== "undefined";
const tchaikovskyAudio = hasAudio
  ? new Audio("/audio/audio1tchaikovsky.mp3")
  : null;
const sabrinaAudio = hasAudio ? new Audio("/audio/audio1sabrina.mp3") : null;
[tchaikovskyAudio, sabrinaAudio].forEach((a) => {
  if (a) {
    a.preload = "none";
    a.volume = 0.7;
  }
});

const NOTES = ["♩", "♪", "♫", "♬", "𝄞", "𝄢", "♭", "♯", "♮"];
const MODERN = ["❤️", "💖", "✨", "💫", "📱", "💅", "🎀", "💋", "🔥", "⭐", "🎧", "💕"];

const particles = ref([]);
let pid = 0;
let rafId = null;
let activeSide = null;
const analysers = {};

function spawn(which, intensity) {
  const isT = which === "tchaikovsky";
  const pool = isT ? NOTES : MODERN;
  const baseX = isT ? 3 + Math.random() * 20 : 77 + Math.random() * 20;
  const p = {
    id: pid++,
    sym: pool[Math.floor(Math.random() * pool.length)],
    left: baseX,
    bottom: 26 + Math.random() * 30,
    size: 1 + intensity * 2.1 + Math.random() * 0.5,
    dur: 3.2 + Math.random() * 2.4,
    rise: 300 + intensity * 280 + Math.random() * 340,
    drift: (Math.random() - 0.5) * (isT ? 360 : 360),
    rot: (Math.random() - 0.5) * 90,
    hue: isT ? 38 + Math.random() * 24 : 320 + Math.random() * 40,
    isEmoji: !isT,
  };
  particles.value.push(p);
  setTimeout(() => {
    particles.value = particles.value.filter((x) => x.id !== p.id);
  }, p.dur * 1000);
}

function loop() {
  if (!activeSide) return;
  const obj = analysers[activeSide];
  let level = obj ? getLevel(obj) : 0;
  if (!obj) level = 0.25 + Math.random() * 0.3;
  if (level > 0.12 && particles.value.length < 55 && Math.random() < level * 0.7)
    spawn(activeSide, level);
  rafId = requestAnimationFrame(loop);
}

function hoverPlay(which) {
  const [target, other] =
    which === "tchaikovsky"
      ? [tchaikovskyAudio, sabrinaAudio]
      : [sabrinaAudio, tchaikovskyAudio];
  if (other) other.pause();
  if (target) {
    if (analysers[which] === undefined) analysers[which] = connectAnalyser(target);
    target.play().catch(() => {});
  }
  activeSide = which;
  if (!rafId) rafId = requestAnimationFrame(loop);
}
function hoverStop(which) {
  const target = which === "tchaikovsky" ? tchaikovskyAudio : sabrinaAudio;
  if (target) target.pause();
  if (activeSide === which) {
    activeSide = null;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
}

function emitStyle(p) {
  return {
    left: p.left + "%",
    bottom: p.bottom + "%",
    fontSize: p.size + "rem",
    color: p.isEmoji ? undefined : `hsl(${p.hue}, 90%, 62%)`,
    animationDuration: p.dur + "s",
    "--drift": p.drift + "px",
    "--rise": p.rise + "px",
    "--rot": p.rot + "deg",
  };
}

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  [tchaikovskyAudio, sabrinaAudio].forEach((a) => a && a.pause());
});

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
    #1a0012 0%,
    #12000c 60%,
    #040408 100%
  );
}

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
    rgba(244, 114, 182, 0.12) 0%,
    transparent 65%
  );
  pointer-events: none;
}

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

.hero__portrait-frame {
  position: relative;
  width: 260px;
  height: 340px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.4s var(--ease-expo);
}
.hero__portrait-frame:hover {
  transform: scale(1.02);
}

.hero__audio-badge {
  position: absolute;
  bottom: -14px;
  right: -14px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--gold-300);
  background: var(--deep);
  border: 1px solid var(--gold-700);
  box-shadow: 0 0 14px rgba(201, 168, 76, 0.3);
  z-index: 5;
  animation: badgePulse 2.2s ease-in-out infinite;
  transition: transform 0.3s, color 0.3s, border-color 0.3s;
}
.hero__audio-badge--modern {
  color: var(--pink-glow);
  border-color: var(--pink-glow);
  box-shadow: 0 0 14px rgba(244, 114, 182, 0.3);
}
.hero__portrait-frame:hover .hero__audio-badge {
  transform: scale(1.2);
  color: var(--gold-100);
}
.hero__portrait-frame--purple:hover .hero__audio-badge--modern {
  color: #fff;
}
@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.12); }
}

.hero__emit-global {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
  z-index: 5;
}
.hero__emit {
  position: absolute;
  line-height: 1;
  opacity: 0;
  will-change: transform, opacity;
  animation-name: emitRise;
  animation-timing-function: cubic-bezier(0.25, 0.5, 0.4, 1);
  animation-fill-mode: forwards;
  filter: drop-shadow(0 0 8px currentColor);
}
@keyframes emitRise {
  0%   { opacity: 0; transform: translate(0, 0) scale(0.3) rotate(0deg); }
  15%  { opacity: 1; }
  80%  { opacity: 0.85; }
  100% { opacity: 0; transform: translate(var(--drift), calc(-1 * var(--rise))) scale(1.3) rotate(var(--rot)); }
}

.hero__portrait-frame--gold {
  box-shadow:
    0 0 0 1px var(--gold-700),
    0 0 32px rgba(201, 168, 76, 0.25);
}
.hero__portrait-frame--purple {
  box-shadow:
    0 0 0 1px var(--pink-glow),
    0 0 32px rgba(244, 114, 182, 0.25);
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
  background: linear-gradient(180deg, #1a0012 0%, #04040a 100%);
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
  color: var(--pink-glow);
  text-shadow: 0 0 20px var(--pink-glow);
}

.hero__note {
  font-size: 1.8rem;
  color: var(--gold-300);
  opacity: 0.4;
}
.hero__note--modern {
  color: var(--pink-glow);
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
  color: var(--pink-glow);
}

.hero__composer-name {
  font-family: var(--font-romantic);
  font-size: clamp(1.3rem, 1.9vw, 2.4rem);
  font-weight: 400;
  color: var(--gold-100);
  line-height: 1.05;
}
.hero__composer-name strong {
  display: block;
  font-size: clamp(1.9rem, 2.8vw, 3.2rem);
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
  border-right: 2px solid var(--pink-glow);
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
  background: linear-gradient(to bottom, var(--pink-glow), transparent);
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
    var(--void) 20%,
    rgba(4, 4, 10, 0.45) 48%,
    transparent 78%
  );
}

.hero__eyebrow {
  font-size: 0.95rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gold-500);
  margin-bottom: 18px;
  text-shadow: 0 0 14px rgba(201, 168, 76, 0.35);
}

.hero__title {
  font-family: var(--font-classical);
  font-size: clamp(2rem, 4.2vw, 4.5rem);
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

.hero__narration {
  margin-top: 24px;
  display: flex;
  justify-content: center;
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

@media (max-width: 900px) {

  .hero {
    height: auto;
    min-height: 100vh;
    justify-content: flex-start;
  }

  .hero__split {
    position: relative;
    inset: auto;
    flex-direction: column;
    z-index: 2;
  }

  .hero__panel {
    height: auto;
    min-height: 0;
    padding: 30px 0 10px;
  }

  .hero__panel-content,
  .hero__panel-content--right {
    padding: 6px 20px;
    align-items: center;
    text-align: center;
    justify-content: flex-start;
    gap: 16px;
  }

  .hero__meta,
  .hero__meta--right {
    align-items: center;
    text-align: center;
  }

  .hero__portrait-frame {
    width: 170px;
    height: 218px;
  }

  .hero__vignette,
  .hero__vignette--right {
    display: none;
  }

  .hero__quote,
  .hero__quote--left,
  .hero__quote--right {
    display: none;
  }

  .hero__center-divider {
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 6px 50px;
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
    position: relative;
    background: var(--void);
    padding: 24px 16px 60px;
  }

  .hero__title {
    font-size: 2rem;
  }
}
</style>
