// Minimalist Web Audio API orbital sound synthesizer
// Generates an ultra-restrained, cinematic low-frequency orbital resonance (55Hz / 110Hz)
// Absolutely no harsh noises, purely subtle spatial ambiance.

let audioCtx = null;
let masterGain = null;
let osc1 = null;
let osc2 = null;
let filter = null;
let lfo = null;
let isPlaying = false;

export function toggleOrbitalAmbiance() {
  if (!isPlaying) {
    return startOrbitalAmbiance();
  } else {
    return stopOrbitalAmbiance();
  }
}

export function startOrbitalAmbiance() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Master Gain (low volume, subtle)
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.06, now + 3);
    masterGain.connect(audioCtx.destination);

    // Low-pass filter for warm, dark sound
    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);
    filter.Q.setValueAtTime(2, now);
    filter.connect(masterGain);

    // Sub-bass fundamental (55Hz - A1 note)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, now);
    osc1.connect(filter);
    osc1.start();

    // Harmonic fifth / orbital frequency (82.5Hz - E2 note)
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(82.41, now);
    osc2.connect(filter);
    osc2.start();

    // Subtle LFO for breathing filter modulation (0.1 Hz)
    lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.08, now);
    lfoGain.gain.setValueAtTime(40, now);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    isPlaying = true;
    return true;
  } catch (e) {
    console.warn("Audio Context init prevented by browser policy", e);
    return false;
  }
}

export function stopOrbitalAmbiance() {
  if (!audioCtx || !masterGain) {
    isPlaying = false;
    return false;
  }

  const now = audioCtx.currentTime;
  masterGain.gain.setValueAtTime(masterGain.gain.value, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

  setTimeout(() => {
    try {
      if (osc1) { osc1.stop(); osc1.disconnect(); }
      if (osc2) { osc2.stop(); osc2.disconnect(); }
      if (lfo) { lfo.stop(); lfo.disconnect(); }
    } catch (_) {}
    isPlaying = false;
  }, 1300);

  isPlaying = false;
  return false;
}

export function getAudioState() {
  return isPlaying;
}
