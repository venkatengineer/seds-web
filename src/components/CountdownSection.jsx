import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../config/event';

/**
 * PREMIUM DEEP SPACE COUNTDOWN
 * 
 * Philosophy:
 * - Information floating quietly in deep space.
 * - Large typography: 09 : 14 : 32 : 07
 * - Very subtle glowing purple light behind numbers with soft falloff.
 * - ZERO flashing, ZERO rapid pulsing every second.
 * - No giant glass card, no neon box.
 */

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 9, hours: 14, minutes: 32, seconds: 7 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="countdown" 
      className="relative min-h-[70vh] w-full flex flex-col items-center justify-center py-24 px-6 sm:px-12 z-20 select-none overflow-hidden"
    >
      {/* Soft Purple Distant Light Behind Countdown (High falloff) */}
      <div 
        className="absolute w-[450px] h-[450px] rounded-full pointer-events-none -z-10 opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(109, 40, 217, 0.25) 0%, rgba(50, 16, 95, 0.08) 50%, rgba(2, 1, 7, 0) 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Thin, Slow-Rotating Orbital Framing (180s rotation, very subtle) */}
      <div className="relative w-[340px] h-[340px] max-w-[94vw] max-h-[94vw] sm:w-[480px] sm:h-[480px] md:w-[600px] md:h-[600px] rounded-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
        <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-8 rounded-full border border-[#8B5CF6]/15 border-dashed animate-[spin_180s_linear_infinite]" />
        <div className="absolute inset-20 rounded-full border border-white/[0.03]" />

        {/* Content Centered in Deep Space */}
        <div className="relative z-10 space-y-4">
          <div>
            <span className="font-mono-tech text-[10px] tracking-[0.35em] text-[#8B5CF6] uppercase block mb-1">
              // LAUNCH HORIZON
            </span>
            <div className="font-mono-tech text-xs tracking-[0.4em] uppercase text-[#A6A0B8]">
              UNTIL ORBITAL SPRINT
            </div>
          </div>

          {/* Monumental Numbers (Quiet, Steady, No Flashing) */}
          <div className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7F5FF] flex items-center justify-center gap-2 sm:gap-4 my-2">
            <span>{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="text-[#8B5CF6]/40 font-light text-2xl sm:text-4xl">:</span>
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-[#8B5CF6]/40 font-light text-2xl sm:text-4xl">:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-[#8B5CF6]/40 font-light text-2xl sm:text-4xl">:</span>
            <span className="text-[#F7F5FF]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          {/* Unit Labels */}
          <div className="flex items-center justify-center gap-6 sm:gap-11 font-mono-tech text-[10px] sm:text-xs tracking-[0.25em] text-[#A6A0B8] uppercase">
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MIN</span>
            <span>SEC</span>
          </div>

          {/* Subtext */}
          <p className="max-w-xs mx-auto font-sans text-xs text-[#A6A0B8] font-light leading-relaxed pt-2">
            Synchronized with Indian Standard Time (IST). Registration closes upon slot exhaustion.
          </p>
        </div>
      </div>
    </section>
  );
}
