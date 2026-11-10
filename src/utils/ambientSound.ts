// Web Audio API Ambient Sound Generator for Prayer, Meditation & Sleep
// 100% synthesized client-side, 0 latency, 0 external bandwidth, continuous loop!

export type AmbientSoundType = 'celestial' | 'rain' | 'waters' | 'none';

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];
  private currentType: AmbientSoundType = 'none';
  private currentVolume: number = 0.3; // 0 to 1
  private isRunning: boolean = false;

  private getAudioContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public getCurrentType(): AmbientSoundType {
    return this.currentType;
  }

  public isAmbientRunning(): boolean {
    return this.isRunning && this.currentType !== 'none';
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
    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch {}
      this.masterGain = null;
    }
  }

  public stop() {
    this.isRunning = false;
    this.currentType = 'none';

    if (this.masterGain && this.ctx) {
      try {
        // Quick 150ms smooth fadeout before cleaning up
        this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.05);
      } catch {}
    }

    setTimeout(() => {
      this.cleanupNodes();
    }, 180);
  }

  public play(type: AmbientSoundType, volume?: number) {
    if (volume !== undefined) {
      this.currentVolume = Math.max(0, Math.min(1, volume));
    }

    if (type === 'none') {
      this.stop();
      return;
    }

    // If ALREADY running this exact ambient type, just ensure volume and audio context are live!
    if (this.isRunning && this.currentType === type && this.masterGain && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.masterGain.gain.setTargetAtTime(this.currentVolume, this.ctx.currentTime, 0.05);
      return;
    }

    // Stop and cleanly remove any existing nodes synchronously
    this.cleanupNodes();

    const ctx = this.getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    this.currentType = type;
    this.isRunning = true;

    // Master volume gain
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.01, ctx.currentTime);
    master.gain.setTargetAtTime(this.currentVolume, ctx.currentTime, 0.2); // Smooth 200ms ramp up
    master.connect(ctx.destination);
    this.masterGain = master;

    if (type === 'celestial') {
      this.createCelestialPad(ctx, master);
    } else if (type === 'rain') {
      this.createRainSound(ctx, master);
    } else if (type === 'waters') {
      this.createWatersSound(ctx, master);
    }
  }

  // Warm, meditative celestial chord pad (C Major 9: C3, G3, B3, D4, E4, G4)
  private createCelestialPad(ctx: AudioContext, destination: AudioNode) {
    const freqs = [130.81, 196.0, 246.94, 293.66, 329.63, 392.0];
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    filter.connect(destination);

    // Slow breath LFO: oscillates filter smoothly between 500Hz and 800Hz
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime); // ~10s breath cycle

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(150, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    this.activeNodes.push(lfo);

    // Warm oscillators
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Subtle micro-detune for chorus shimmer
      osc.detune.setValueAtTime((idx - 2.5) * 4, ctx.currentTime);

      const level = 0.22 / freqs.length;
      oscGain.gain.setValueAtTime(level, ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start();
      this.activeNodes.push(osc);
    });
  }

  // Continuous rain sound (pink noise approximation)
  private createRainSound(ctx: AudioContext, destination: AudioNode) {
    const bufferSize = ctx.sampleRate * 4; // 4 seconds continuous loop
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Paul Kellet's refined pink noise filter
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1000, ctx.currentTime);
    bandpass.Q.setValueAtTime(0.6, ctx.currentTime);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(2200, ctx.currentTime);

    whiteNoise.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(destination);

    whiteNoise.start();
    this.activeNodes.push(whiteNoise);
  }

  // Gentle stream & peaceful breeze (Águas Tranquilas)
  private createWatersSound(ctx: AudioContext, destination: AudioNode) {
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      output[i] = last * 3.0;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.18, ctx.currentTime);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(160, ctx.currentTime);

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
