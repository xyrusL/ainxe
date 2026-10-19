/**
 * Synthesized Web Audio API sound effects & Lo-Fi Aesthetic Music Generator
 * Free, offline, zero-latency, rich audible volume.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: number | null = null;
  private isMusicPlaying = false;
  private musicGainNode: GainNode | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /** Soft wooden marimba tap on button clicks */
  playButtonTap() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio context might be restricted before user interaction
    }
  }

  /** Gentle water droplet chime on lake click */
  playWaterDrop() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1250, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.36, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } catch {
      // Ignore
    }
  }

  /** Cute retro 8-bit boop for the ( x _ x ) features state */
  playBoop() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(220, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.26, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.19);
    } catch {
      // Ignore
    }
  }

  /**
   * Iconic NES Super Mario Death Sound Effect!
   * Sequence of notes: B4 -> F5 -> rest -> F5 -> F5 -> E5 -> D5 -> C5
   */
  playMarioDeath() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      // Dip background music briefly so the death sound is crisp, hilarious, and punchy
      if (this.musicGainNode) {
        this.musicGainNode.gain.setValueAtTime(0.02, ctx.currentTime);
        this.musicGainNode.gain.setValueAtTime(0.28, ctx.currentTime + 1.8);
      }

      // Notes: [freq, startOffset, duration]
      const notes: [number, number, number][] = [
        [493.88, 0.00, 0.14], // B4
        [698.46, 0.16, 0.14], // F5
        // short rest
        [698.46, 0.42, 0.13], // F5
        [698.46, 0.58, 0.11], // F5
        [659.25, 0.71, 0.11], // E5
        [587.33, 0.84, 0.11], // D5
        [523.25, 0.97, 0.40], // C5
      ];

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.42, ctx.currentTime);
      masterGain.connect(ctx.destination);

      notes.forEach(([freq, start, dur]) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'square'; // Authentic NES 8-bit square wave
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

        noteGain.gain.setValueAtTime(0.40, ctx.currentTime + start);
        noteGain.gain.setValueAtTime(0.40, ctx.currentTime + start + dur - 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      });
    } catch (e) {
      console.error('Mario death sound failed', e);
    }
  }

  /**
   * Aesthetic Lo-Fi Background Music
   * Generates a warm, repeating chord progression with dreamy electric piano tones at comfortable volume
   */
  startAestheticMusic() {
    try {
      const ctx = this.getContext();
      if (!ctx || this.isMusicPlaying) return;

      const masterMusicGain = ctx.createGain();
      masterMusicGain.gain.setValueAtTime(0.28, ctx.currentTime);
      masterMusicGain.connect(ctx.destination);
      this.musicGainNode = masterMusicGain;

      // Warm Lo-Fi 7th & 9th chords: Cmaj9 -> Am9 -> Fmaj7 -> Gadd9
      const chords = [
        [261.63, 329.63, 392.0, 493.88, 587.33], // C4, E4, G4, B4, D5 (Cmaj9)
        [220.0, 261.63, 329.63, 392.0, 493.88],  // A3, C4, E4, G4, B4 (Am9)
        [174.61, 220.0, 261.63, 329.63, 392.0],  // F3, A3, C4, E4, G4 (Fmaj9)
        [196.0, 246.94, 293.66, 392.0, 440.0],   // G3, B3, D4, G4, A4 (Gadd9)
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!this.ctx || !this.isMusicPlaying) return;
        const now = this.ctx.currentTime;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        // Staggered arpeggiated piano notes with warm tone
        currentChord.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const noteGain = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();

          // Warm electric piano tone
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          // Clear, audible lowpass warm filter
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now);

          noteGain.gain.setValueAtTime(0.001, now + idx * 0.12);
          noteGain.gain.linearRampToValueAtTime(0.24, now + idx * 0.12 + 0.05);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 2.8);

          osc.connect(filter);
          filter.connect(noteGain);
          noteGain.connect(masterMusicGain);

          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 2.9);
        });
      };

      this.isMusicPlaying = true;
      playChord();
      this.musicInterval = window.setInterval(playChord, 3200);
    } catch (e) {
      console.error('Failed to start aesthetic music', e);
    }
  }

  stopAestheticMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.musicGainNode && this.ctx) {
      this.musicGainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.musicGainNode.disconnect();
      this.musicGainNode = null;
    }
    this.isMusicPlaying = false;
  }

  toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopAestheticMusic();
      return false;
    } else {
      this.startAestheticMusic();
      return true;
    }
  }

  isMusicOn(): boolean {
    return this.isMusicPlaying;
  }
}

export const sounds = new SoundEngine();
