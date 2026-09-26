import React, { useEffect, useState } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * CINEMATIC ORBITAL ENTRY
 * 
 * Target:
 * 1. Start in near-total darkness.
 * 2. A very distant point of light appears.
 * 3. The camera slowly approaches.
 * 4. A planetary limb begins to appear with atmospheric purple light.
 * 5. SEDS REC identity fades in.
 * 6. ORBITAL 26 appears.
 * 7. Headline reveals.
 * 8. Seamlessly transitions into orbit.
 * 
 * Rules:
 * - Total duration ~3.6s.
 * - Zero strobe, zero flash, zero glitch.
 * - Smooth physical camera feel.
 */

export default function EntryLoader({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: darkness, 1: distant light, 2: planetary limb, 3: SEDS REC, 4: ORBITAL 26, 5: finish

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 350);
    const t2 = setTimeout(() => setStage(2), 1000);
    const t3 = setTimeout(() => setStage(3), 1700);
    const t4 = setTimeout(() => setStage(4), 2400);
    const t5 = setTimeout(() => setStage(5), 3200);
    const t6 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800);

    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skip();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const skip = () => {
    setStage(5);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  if (stage === 6) return null;

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#020107] overflow-hidden select-none cursor-pointer transition-opacity duration-800 ease-out ${
        stage === 5 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Deep Space Background Canvas with Faint Sparse Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[22%] left-[18%] w-1 h-1 rounded-full bg-white/40" />
        <div className="absolute top-[35%] right-[25%] w-1 h-1 rounded-full bg-white/30" />
        <div className="absolute bottom-[28%] left-[32%] w-1.5 h-1.5 rounded-full bg-white/50" />
        <div className="absolute bottom-[18%] right-[15%] w-1 h-1 rounded-full bg-white/35" />
      </div>

      {/* Atmospheric Purple Planetary Limb Emergence */}
      <div
        className={`absolute right-[-10vw] top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full pointer-events-none transition-all duration-1200 ease-out ${
          stage >= 2 ? 'opacity-40 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{
          background: 'radial-gradient(circle at 75% 50%, rgba(139, 92, 246, 0.35) 0%, rgba(76, 29, 149, 0.12) 40%, rgba(2, 1, 7, 0) 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Distant Light Point / Camera Approach Center */}
      <div className="relative flex flex-col items-center justify-center text-center px-6">
        {/* Distant Star Point */}
        <div
          className={`w-2 h-2 rounded-full bg-white transition-all duration-1000 ease-out ${
            stage >= 1
              ? 'opacity-90 scale-100 shadow-[0_0_20px_rgba(192,132,252,0.8)]'
              : 'opacity-0 scale-0'
          }`}
        />

        {/* Brand Reveal: SEDS REC */}
        <div
          className={`mt-8 transition-all duration-800 ease-out ${
            stage >= 3 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-4 blur-xs'
          }`}
        >
          <div className="font-editorial text-2xl sm:text-4xl font-bold tracking-[0.22em] text-[#F7F5FF]">
            {SEDS_CONFIG.name}
          </div>
          <div className="font-display text-xs sm:text-sm tracking-[0.18em] text-[#A6A0B8] mt-1">
            {SEDS_CONFIG.institution}
          </div>
        </div>

        {/* Event Reveal: ORBITAL 26 */}
        <div
          className={`mt-4 flex items-center gap-3 transition-all duration-800 ease-out ${
            stage >= 4 ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-4 blur-xs'
          }`}
        >
          <span className="font-display text-xs tracking-[0.3em] uppercase text-[#8B5CF6] font-semibold">
            {EVENT_CONFIG.presentsText}
          </span>
          <span className="text-white/20 text-xs">/</span>
          <span className="font-editorial text-lg sm:text-xl font-bold tracking-[0.2em] text-[#F7F5FF]">
            {EVENT_CONFIG.name}
          </span>
        </div>
      </div>

      {/* Subtle Skip Prompt */}
      <div
        className={`absolute bottom-8 font-display text-[10px] tracking-[0.25em] text-[#A6A0B8]/40 uppercase transition-opacity duration-500 ${
          stage >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Click anywhere or press Space to skip
      </div>
    </div>
  );
}
