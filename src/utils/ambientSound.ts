// Web Audio API Ambient Sound Generator for Prayer, Meditation & Sleep
// 100% synthesized client-side, 0 latency, 0 external bandwidth, works offline!

export type AmbientSoundType = 'celestial' | 'rain' | 'waters' | 'none';

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private currentType: AmbientSoundType = 'none';
  private currentVolume: number = 0.25; // 0 to 1

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.1);
    }
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      // Fade out over 0.5s to avoid audio pop
      this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.2);
    }

    setTimeout(() => {
      this.cleanupNodes();
      this.currentType = 'none';
    }, 400);
  }

  private cleanupNodes() {
    for (const node of this.activeNodes) {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {}
      }
    }
    this.activeNodes = [];
    this.masterGain = null;
  }

  public play(type: AmbientSoundType, volume: number = 0.25) {
    if (type === 'none') {
      this.stop();
      return;
    }

    // If already playing this type, just update volume
    if (this.currentType === type && this.masterGain) {
      this.setVolume(volume);
      return;
    }

    this.stop();

    setTimeout(() => {
      const ctx = this.getAudioContext();
      this.currentType = type;
      this.currentVolume = volume;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.gain.setTargetAtTime(this.currentVolume, ctx.currentTime, 0.8); // Smooth fade in
      master.connect(ctx.destination);
      this.masterGain = master;

      if (type === 'celestial') {
        this.createCelestialPad(ctx, master);
      } else if (type === 'rain') {
        this.createRainSound(ctx, master);
      } else if (type === 'waters') {
        this.createWatersSound(ctx, master);
      }
    }, 150);
  }

  // Warm, meditative, sanctuary chord pad (Dmaj9: D3, F#3, A3, C#4, E4)
  private createCelestialPad(ctx: AudioContext, destination: AudioNode) {
    const freqs = [146.83, 220.0, 277.18, 329.63, 440.0]; // D, A, C#, E, A
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, ctx.currentTime);
    filter.Q.setValueAtTime(1.8, ctx.currentTime);
    filter.connect(destination);

    // Slow breath LFO to gently open and close the filter (peaceful ambient swell)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // 1 breath every ~8 seconds

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(180, ctx.currentTime); // Modulate between 240Hz and 600Hz
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.activeNodes.push(lfo);

    // Create detuned warm oscillators
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      // Soft triangle and sine waves
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Subtle detune for shimmer
      osc.detune.setValueAtTime((idx - 2) * 5, ctx.currentTime);

      const level = 0.18 / freqs.length;
      oscGain.gain.setValueAtTime(level, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start();
      this.activeNodes.push(osc);
    });
  }

  // Gentle night rain sound using filtered pink/white noise
  private createRainSound(ctx: AudioContext, destination: AudioNode) {
    const bufferSize = ctx.sampleRate * 3; // 3 seconds loop
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink/Brown noise filter approximation for natural rain
      output[i] = (lastOut + 0.025 * white) / 1.025;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to sound like soft rainfall against window glass
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(900, ctx.currentTime);
    bandpass.Q.setValueAtTime(0.7, ctx.currentTime);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1600, ctx.currentTime);

    whiteNoise.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(destination);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise);
  }

  // Peaceful stream & gentle breeze (Águas Tranquilas - Salmo 23:2)
  private createWatersSound(ctx: AudioContext, destination: AudioNode) {
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.015 * white) / 1.015;
      lastOut = output[i];
      output[i] *= 4.0;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(550, ctx.currentTime);

    // Modulate stream flow
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.25, ctx.currentTime);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(destination);

    lfo.start();
    noise.start();
    this.activeNodes.push(noise, lfo);
  }
}

export const ambientSound = new AmbientSoundEngine();
