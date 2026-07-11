/**
 * Synthesizes a calming, rich mindfulness bell / Tibetan singing bowl sound
 * using the Web Audio API. This avoids loading bulky external files and works offline.
 */
export const playMindfulnessBell = () => {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // 1. Fundamental Pitch (Calming mid-range, ~293.66Hz is D4)
    const fundamentalFreq = 293.66;

    // Oscillator 1: Fundamental
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(fundamentalFreq, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.5, now + 0.08); // Soft attack
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 4.5); // Very long, natural decay

    // Oscillator 2: First Harmonic (Overtone, perfect fifth ~1.5x)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(fundamentalFreq * 1.5, now);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 3.0); // Decays faster

    // Oscillator 3: Second Harmonic (Octave ~2.0x)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(fundamentalFreq * 2.0, now);
    gain3.gain.setValueAtTime(0, now);
    gain3.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    // Oscillator 4: Higher Ring (Metallic chime element ~2.7x)
    const osc4 = ctx.createOscillator();
    const gain4 = ctx.createGain();
    osc4.type = 'sine';
    osc4.frequency.setValueAtTime(fundamentalFreq * 2.7, now);
    gain4.gain.setValueAtTime(0, now);
    gain4.gain.linearRampToValueAtTime(0.08, now + 0.03);
    gain4.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    // Oscillator 5: Grounding Sub-bass (Octave below ~0.5x)
    const oscSub = ctx.createOscillator();
    const gainSub = ctx.createGain();
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(fundamentalFreq * 0.5, now);
    gainSub.gain.setValueAtTime(0, now);
    gainSub.gain.linearRampToValueAtTime(0.3, now + 0.2); // Slower attack
    gainSub.gain.exponentialRampToValueAtTime(0.0001, now + 5.0); // Grounding hum decays very slowly

    // Connect individual nodes
    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);
    osc4.connect(gain4);
    oscSub.connect(gainSub);

    // Master Gain for volume scaling
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.7, now);

    gain1.connect(masterGain);
    gain2.connect(masterGain);
    gain3.connect(masterGain);
    gain4.connect(masterGain);
    gainSub.connect(masterGain);

    // Dynamic Filter to shave off high harshness
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.Q.setValueAtTime(1, now);

    masterGain.connect(filter);
    filter.connect(ctx.destination);

    // Start all components
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc4.start(now);
    oscSub.start(now);

    // Stop to clean up memory
    const duration = 5.5;
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
    osc4.stop(now + duration);
    oscSub.stop(now + duration);
  } catch (error) {
    console.warn('Web Audio Context not supported or interaction blocked:', error);
  }
};
