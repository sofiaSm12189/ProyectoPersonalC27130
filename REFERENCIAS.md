# REFERENCIAS.md
## La Evolución de la Música · IF7102 Multimedios · I Ciclo 2026

Framework elegido: **Vue 3 + Vite** · Opción 2: Infografía Interactiva Animada

---

## 1. Tutoriales y cursos para aprender el framework

- **The Net Ninja — "Vue JS 3 Tutorial for Beginners" (playlist completa)**  
  https://www.youtube.com/watch?v=YrxBCBibVo0&list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1  
  Curso principal que seguí para aprender Vue 3 desde cero: componentes, `<script setup>`,
  reactividad con `ref`, props, `emits`, eventos, renderizado de listas con `v-for`,
  renderizado condicional con `v-if`, y ciclo de vida (`onMounted`).

---

## 2. Documentación oficial consultada

- **Vue 3 — Documentación oficial**  
  https://vuejs.org/guide/introduction.html  
  Composition API, `<script setup>`, `ref`, `computed`, `watch`, `defineProps`,
  `defineEmits`, `defineExpose`, `<Teleport>`, `<Transition>`, ciclo de vida.

- **Vite — Documentación oficial**  
  https://vitejs.dev/guide/  
  Creación del proyecto, servidor de desarrollo, carpeta `public/` y assets estáticos.

- **MDN Web Docs — Intersection Observer API**  
  https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API  
  Animaciones de aparición al hacer scroll y detección de la sección activa.

- **MDN Web Docs — HTMLMediaElement (audio)**  
  https://developer.mozilla.org/es/docs/Web/API/HTMLMediaElement  
  Control del reproductor: `play()`, `pause()`, `currentTime`, `duration`, evento `ended`.

- **MDN Web Docs — Web Audio API (AnalyserNode)**  
  https://developer.mozilla.org/es/docs/Web/API/Web_Audio_API  
  Análisis del audio en tiempo real para las partículas rítmicas del inicio y el
  visualizador de barras del reproductor.

- **MDN Web Docs — Canvas API (getImageData)**  
  https://developer.mozilla.org/es/docs/Web/API/Canvas_API  
  Para calibrar las zonas del cerebro sobre la imagen.

---

## 3. Recursos multimedia y sus licencias

| Recurso | Descripción | Licencia / Origen |
|---------|-------------|-------------------|
| `tchaikovsky.webp`, retratos de compositores clásicos | Retratos de Beethoven, Schubert, Chopin, Liszt, etc. | Dominio público (autores fallecidos hace más de 100 años) — [Wikimedia Commons](https://commons.wikimedia.org) |
| `brain.webp` | Ilustración de cerebro humano | Imagen con licencia libre / dominio público |
| Fotos de artistas modernos (Sabrina, Queen, Nirvana, etc.) | Imágenes de prensa / promocionales | Uso educativo sin fines de lucro |
| Fragmentos de audio de las canciones (`/audio/songs/`) | Extractos representativos de cada época | Uso educativo (fragmentos con fines didácticos) |
| Audios de inicio (`audio1tchaikovsky.mp3`, `audio1sabrina.mp3`) | Piezas características del inicio | Uso educativo |
| Narración (`narration-inicio/algoritmo/reflexion.mp3`) | Narración por sección | **Producción propia** (grabación / texto a voz) |
| Efecto de clic (`click.mp3`) | Sonido de interfaz | Licencia libre |

> Nota: todos los medios se usan con fines exclusivamente educativos dentro de un
> proyecto académico sin fines comerciales.

---

## 4. Artículos académicos citados en el contenido

1. Habibi, A. et al. (2025). *Longitudinal Effects of Continuous Music Training on Cognitive Development: Evidence From the ABCD Study.* Annals of the New York Academy of Sciences. https://nyaspubs.onlinelibrary.wiley.com/doi/10.1111/nyas.70086
2. Cai, Y., Kang, D. & Xu, X. (2025). *Boosting executive function in children aged 3–12 through musical training: a three-level meta-analysis.* Frontiers in Psychology. https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1659927/full
3. Zaatar, M. T. et al. (2023). *The transformative power of music: Insights into neuroplasticity, health, and disease.* Brain, Behavior, & Immunity - Health. https://pmc.ncbi.nlm.nih.gov/articles/PMC10765015/
4. Gold, B. P. et al. (2023). *Auditory and reward structures reflect the pleasure of musical expectancies during naturalistic listening.* Frontiers in Neuroscience. https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2023.1209398/full
5. Salimpoor, V. et al. (2011). *Anatomically distinct dopamine release during anticipation and experience of peak emotion to music.* Nature Neuroscience. https://www.nature.com/articles/nn.2726
6. Limb, C. J. & Braun, A. R. (2008). *Neural substrates of spontaneous musical performance: An fMRI study of jazz improvisation.* PLOS ONE. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0001679
7. Levitin, D. J. (2006). *This Is Your Brain on Music: The Science of a Human Obsession.* Dutton/Plume.
8. Mauch, M. et al. (2015). *The evolution of popular music: USA 1960–2010.* Royal Society Open Science. https://royalsocietypublishing.org/doi/10.1098/rsos.150081

---

## 5. Uso de Inteligencia Artificial

Durante el desarrollo se utilizó **Claude (Anthropic)** como herramienta de apoyo para:

- Explicar conceptos de Vue 3 (Composition API, ciclo de vida, props y emits) y
  resolver dudas durante el aprendizaje del framework.
- Ayudar a estructurar y depurar los componentes (`HeroSection`, `TimelineSection`,
  `EraCard`, `AudioPlayer`, `SongModal`, `BrainDiagram`, etc.).
- Interpretar errores de compilación y de CSS, y resolver problemas de responsividad.
- Apoyar en la redacción y revisión de los textos históricos y de análisis musical,
  los cuales fueron revisados y validados por la estudiante.
- Orientar el uso de la Web Audio API para las animaciones sincronizadas con el audio.

Todo el código fue comprendido y revisado por la estudiante. Durante una consulta podría
explicarse por qué se usó cada parte del framework.
