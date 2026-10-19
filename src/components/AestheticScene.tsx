import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Compass, Volume2, VolumeX } from 'lucide-react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const AestheticScene: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);

  const handleLakeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setRipples((prev) => [...prev.slice(-6), newRipple]);
  };

  const toggleCalmHum = () => {
    if (!isPlayingAudio) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Create a very subtle pink-noise / gentle night breeze hum
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start(0);
        setIsPlayingAudio(true);
      } catch (err) {
        console.error('Audio playback failed', err);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-10">
      {/* Outer Glow Halo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-teal-500/10 to-rose-500/20 rounded-3xl blur-2xl opacity-50" />

      {/* Main Sanctuary Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#090d16] shadow-2xl group select-none cursor-pointer"
        onClick={handleLakeClick}
      >
        {/* Top Minimal HUD Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-[#07090e]/90 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-slate-300 flex items-center gap-1.5">
              <Moon size={12} className="text-sky-300" />
              AINXE SANCTUARY // NOCTURNAL SHIFT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleCalmHum();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors"
              title="Toggle calm atmospheric ambient sound"
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 size={13} className="text-emerald-400 animate-pulse" />
                  <span>CALM SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={13} className="text-slate-400" />
                  <span>CALM SOUND: OFF</span>
                </>
              )}
            </button>

            <span className="hidden sm:inline-block text-[11px] font-mono text-sky-400/80 bg-sky-950/40 px-2.5 py-0.5 rounded-full border border-sky-500/30">
              CLICK LAKE FOR RIPPLES
            </span>
          </div>
        </div>

        {/* Pixel Art Scenery Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src="/hero-landscape.jpg"
            alt="AINXE Sanctuary — Solitary developer gazing across a calm midnight lake under starry skies"
            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-[1.015]"
            loading="eager"
          />

          {/* Breathing Lantern Glow Overlay (Placed directly over the dock's lantern) */}
          <div
            className="absolute top-[65%] left-[53.8%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-amber-400/30 blur-xl pointer-events-none animate-pulse-glow"
            aria-hidden="true"
          />

          {/* Water Shimmer Highlight Gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-60 pointer-events-none"
            aria-hidden="true"
          />

          {/* Animated Water Ripples on Click */}
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                initial={{ scale: 0.1, opacity: 0.85 }}
                animate={{ scale: 3.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: ripple.x,
                  top: ripple.y,
                  width: 50,
                  height: 25,
                  transform: 'translate(-50%, -50%)',
                }}
                className="rounded-[50%] border-2 border-sky-300/80 pointer-events-none shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                onAnimationComplete={() => {
                  setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
                }}
              />
            ))}
          </AnimatePresence>

          {/* Floating Fireflies drifting over water */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${20 + i * 12}%`,
                  y: `${55 + (i % 3) * 10}%`,
                  opacity: 0.3,
                  scale: 0.8,
                }}
                animate={{
                  y: [`${55 + (i % 3) * 10}%`, `${50 + (i % 3) * 10}%`, `${57 + (i % 3) * 10}%`],
                  x: [`${20 + i * 12}%`, `${22 + i * 12}%`, `${19 + i * 12}%`],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.7,
                }}
                className="absolute w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
              />
            ))}
          </div>
        </div>

        {/* Bottom Caption Pill */}
        <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-[#07090e]/80 border border-white/10 backdrop-blur-md text-[11px] text-slate-300 font-mono flex items-center gap-2">
            <Sparkles size={12} className="text-amber-400" />
            <span>Digital sanctuary where craft meets quiet intention.</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Compass size={13} className="text-teal-400" />
            <span>EST. 2026 // AINXE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
