let audioCtx = null
const connected = new WeakMap()

function ensureCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    try {
      audioCtx = new AC()
    } catch (e) {
      return null
    }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {})
  return audioCtx
}

export function connectAnalyser(audioEl) {
  const ctx = ensureCtx()
  if (!ctx || !audioEl) return null
  if (connected.has(audioEl)) return connected.get(audioEl)
  try {
    const source = ctx.createMediaElementSource(audioEl)
    const analyser = ctx.createAnalyser()
    analyser.fftSize = 128
    analyser.smoothingTimeConstant = 0.75
    source.connect(ctx.destination)
    source.connect(analyser)
    const data = new Uint8Array(analyser.frequencyBinCount)
    const obj = { analyser, data }
    connected.set(audioEl, obj)
    return obj
  } catch (e) {
    return null
  }
}

export function getLevel(obj) {
  if (!obj) return 0
  obj.analyser.getByteFrequencyData(obj.data)
  const n = Math.min(obj.data.length, 24)
  let sum = 0
  for (let i = 0; i < n; i++) sum += obj.data[i]
  return sum / n / 255
}

export function getBars(obj, count = 24) {
  if (!obj) return new Array(count).fill(0)
  obj.analyser.getByteFrequencyData(obj.data)
  const bins = obj.data.length
  const bars = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor((i / count) * bins)
    bars.push(obj.data[idx] / 255)
  }
  return bars
}

export function resumeCtx() {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => {})
}
