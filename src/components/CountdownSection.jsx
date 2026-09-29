import React, { useState, useEffect } from 'react';
import { EVENT_CONFIG } from '../config/event';

/**
 * ASTRONOMICAL COUNTDOWN SECTION
 * 
 * Philosophy:
 * - Placed inside an astronomical environment with a curved atmospheric horizon glow along bottom.
 * - Smooth vertical sliding number transitions when digits change (NO violent flip, NO strobe).
 * - Centered: ORBITAL 26 | 09 : 14 : 29 : 18 | REGISTRATION CLOSES IN.
 */

function SlidingDigit({ value }) {
  return (
    <span className="relative inline-block overflow-hidden h-[1.15em] align-top">
      <span
        key={value}
        className="inline-block transition-all duration-300 ease-out animate-in slide-in-from-top-4 fade-in duration-300"
      >
        {value}
      </span>
    </span>
  );
}

export default function CountdownSection() {
  const [targetDate, setTargetDate] = useState(() => new Date('2026-04-10T23:59:59+05:30').getTime());
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, new Date('2026-04-10T23:59:59+05:30').getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  });


  useEffect(() => {
    const updateCountdown = () => {
      const diff = Math.max(0, targetDate - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const dStr = String(timeLeft.days).padStart(2, '0');
  const hStr = String(timeLeft.hours).padStart(2, '0');
  const mStr = String(timeLeft.minutes).padStart(2, '0');
  const sStr = String(timeLeft.seconds).padStart(2, '0');

  return (
    <section 
      id="countdown" 
      className="relative min-h-[75vh] w-full flex flex-col items-center justify-center py-28 px-6 sm:px-12 z-20 select-none overflow-hidden"
    >
      {/* Distant Earth / Lunar Atmospheric Horizon Glow along bottom */}
      <div 
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-5xl h-64 rounded-t-full pointer-events-none -z-10 opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.45) 0%, rgba(76, 29, 149, 0.15) 50%, rgba(2, 1, 7, 0) 80%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Subtle Slow Astronomical Framing Arc */}
      <div className="relative w-[340px] h-[340px] max-w-[92vw] max-h-[92vw] sm:w-[460px] sm:h-[460px] md:w-[560px] md:h-[560px] rounded-full flex flex-col items-center justify-center text-center p-6">
        <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-10 rounded-full border border-[#8B5CF6]/15 border-dashed animate-[spin_180s_linear_infinite]" />

        {/* Content Centered in Space */}
        <div className="relative z-10 space-y-4">
          <div className="space-y-1">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#8B5CF6] font-semibold block">
              // LAUNCH HORIZON
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </div>
          </div>

          {/* Monumental Digits with Smooth Vertical Slide */}
          <div className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F7F5FF] flex items-center justify-center gap-2 sm:gap-4 my-2">
            <SlidingDigit value={dStr} />
            <span className="text-[#8B5CF6]/40 font-light text-2xl sm:text-4xl">:</span>
            <SlidingDigit value={hStr} />
            <span className="text-[#8B5CF6]/40 font-light text-2xl sm:text-4xl">:</span>
            <SlidingDigit value={mStr} />
            <span className="text-[#8B5CF6]/40 font-light text-2xl sm:text-4xl">:</span>
            <SlidingDigit value={sStr} />
          </div>

          {/* Unit Labels */}
          <div className="flex items-center justify-center gap-7 sm:gap-11 font-display text-[11px] sm:text-xs tracking-[0.22em] text-[#A6A0B8] uppercase">
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MINS</span>
            <span>SECS</span>
          </div>

          <div className="pt-2">
            <div className="font-display text-xs tracking-[0.25em] uppercase text-[#C084FC] font-semibold">
              REGISTRATION CLOSES IN
            </div>
            <p className="max-w-xs mx-auto font-sans text-xs text-[#A6A0B8] font-light leading-relaxed mt-1">
              Synchronized with Indian Standard Time (IST). Final registration cutoff upon crew slot capacity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
