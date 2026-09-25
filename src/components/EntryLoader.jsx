import React, { useEffect, useState } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * PREMIUM CINEMATIC ENTRANCE
 * 
 * Flow:
 * 1. Almost complete darkness. Only a handful of tiny distant stars.
 * 2. Very subtle purple atmospheric glow appears.
 * 3. A distant orbital ring slowly becomes visible.
 * 4. The camera begins moving forward.
 * 5. SEDS REC appears with subtle opacity + upward movement.
 * 6. PRESENTS / ORBITAL 26 appears.
 * 7. Seamlessly transitions into the live environment.
 * 
 * Strict Rules:
 * - NO FLASH.
 * - NO SCALE EXPLOSION.
 * - NO GLITCH.
 * - NO BOUNCE.
 */

export default function EntryLoader({ onComplete }) {
  const [phase, setPhase] = useState('darkness'); // 'darkness' | 'glow' | 'ring' | 'brand' | 'event' | 'fadeout'
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase('glow'), 350);
    const t1 = setTimeout(() => setPhase('ring'), 850);
    const t2 = setTimeout(() => setPhase('brand'), 1500);
    const t3 = setTimeout(() => setPhase('event'), 2200);
    const t4 = setTimeout(() => setPhase('fadeout'), 3000);
    const t5 = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 3600);

    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        skip();
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const skip = () => {
    setIsDone(true);
    if (onComplete) onComplete();
  };

  if (isDone) return null;

  return (
    <div 
      onClick={skip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020107] overflow-hidden select-none cursor-pointer transition-opacity duration-700 ease-out ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Distant Pinpoint Stars (Sparse, tiny, quiet) */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: '18%', left: '22%', s: 1.2, o: 0.5 },
          { top: '28%', left: '76%', s: 1.0, o: 0.4 },
          { top: '72%', left: '16%', s: 1.4, o: 0.6 },
          { top: '64%', left: '82%', s: 1.0, o: 0.4 },
          { top: '42%', left: '38%', s: 1.2, o: 0.5 },
          { top: '80%', left: '60%', s: 0.8, o: 0.3 },
          { top: '15%', left: '55%', s: 1.0, o: 0.4 },
        ].map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full bg-[#F7F5FF]"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.s}px`,
              height: `${star.s}px`,
              opacity: star.o,
            }}
          />
        ))}
      </div>

      {/* 2. Controlled Forward Gliding Space Core */}
      <div 
        className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center transition-transform duration-1000 ease-out"
        style={{
          transform: phase === 'brand' || phase === 'event' ? 'scale(1.04)' : 'scale(1.0)',
        }}
      >
        {/* Subtle Purple Atmospheric Glow */}
        <div 
          className={`absolute w-72 h-72 rounded-full pointer-events-none transition-all duration-1000 ease-out ${
            phase !== 'darkness' ? 'opacity-60 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            background: 'radial-gradient(circle, rgba(109, 40, 217, 0.22) 0%, rgba(76, 29, 149, 0.08) 50%, rgba(2, 1, 7, 0) 80%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Distant SVG Orbital Ring slowly emerging */}
        <svg 
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-out ${
            phase === 'ring' || phase === 'brand' || phase === 'event' || phase === 'fadeout'
              ? 'opacity-80'
              : 'opacity-0'
          }`} 
          viewBox="0 0 300 300"
        >
          <ellipse
            cx="150"
            cy="150"
            rx="120"
            ry="55"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="1.1"
            transform="rotate(-22 150 150)"
            strokeDasharray="600"
            strokeDashoffset={phase === 'ring' || phase === 'brand' || phase === 'event' ? 0 : 300}
            className="transition-all duration-1000 ease-out"
          />
          <ellipse
            cx="150"
            cy="150"
            rx="135"
            ry="62"
            fill="none"
            stroke="rgba(192, 132, 252, 0.25)"
            strokeWidth="0.75"
            strokeDasharray="3 14"
            transform="rotate(-22 150 150)"
          />
        </svg>

        {/* Astronomical Central Jewel */}
        <div 
          className={`relative z-10 w-2 h-2 rounded-full bg-[#C084FC] transition-all duration-700 ease-out ${
            phase !== 'darkness' ? 'opacity-90 scale-100 shadow-[0_0_15px_#8B5CF6]' : 'opacity-0 scale-50'
          }`}
        />

        {/* Elegant Typography Emergence Sequence */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          {/* PRIMARY: SEDS REC */}
          <div 
            className={`transition-all duration-800 ease-out ${
              phase === 'brand' || phase === 'event' || phase === 'fadeout'
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 translate-y-3 blur-xs'
            }`}
          >
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#F7F5FF]">
              {SEDS_CONFIG.name}
            </span>
            <div className="font-mono-tech text-[9px] uppercase tracking-[0.3em] text-[#A6A0B8] mt-0.5">
              {SEDS_CONFIG.institution}
            </div>
          </div>

          {/* SECONDARY: PRESENTS / ORBITAL 26 */}
          <div 
            className={`mt-3 flex items-center gap-2 transition-all duration-800 ease-out ${
              phase === 'event' || phase === 'fadeout'
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 translate-y-3 blur-xs'
            }`}
          >
            <span className="font-mono-tech text-[10px] tracking-[0.35em] text-[#8B5CF6] uppercase font-semibold">
              {EVENT_CONFIG.presentsText}
            </span>
            <span className="text-white/20 font-mono-tech text-xs">/</span>
            <span className="font-display text-base sm:text-lg font-semibold tracking-[0.2em] text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </span>
          </div>
        </div>
      </div>

      {/* Quiet Skip Prompt */}
      <div 
        className={`absolute bottom-8 font-mono-tech text-[9px] tracking-[0.3em] text-[#A6A0B8]/50 uppercase transition-opacity duration-700 ${
          phase === 'brand' || phase === 'event' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Press Space or Click to Enter
      </div>
    </div>
  );
}
