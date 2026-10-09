import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';
import useRegistrationClosed from '../hooks/useRegistrationClosed';

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
  const registrationClosed = useRegistrationClosed();
  const [targetDate] = useState(() => new Date('2026-10-09T23:59:59+05:30').getTime());
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.max(0, new Date('2026-10-09T23:59:59+05:30').getTime() - Date.now());
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
      <div data-reveal="scale" className="relative w-[360px] h-[360px] max-w-[94vw] max-h-[94vw] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] rounded-full flex flex-col items-center justify-center text-center p-6">
        <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
        <div className="absolute inset-10 rounded-full border border-[#8B5CF6]/25 border-dashed animate-[spin_180s_linear_infinite]" />

        {/* Content Centered in Space */}
        <div className="relative z-10 space-y-4">
          <div className="space-y-2">
            <span className="font-display text-xs tracking-[0.3em] uppercase text-[#C084FC] font-bold block">
              // REGISTRATION COUNTDOWN
            </span>
            <div className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </div>
            <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#8B5CF6] bg-gradient-to-r from-[#4C1D95]/80 to-[#6D28D9]/60 text-white font-display text-xs tracking-[0.18em] font-semibold shadow-[0_0_20px_rgba(139,92,246,0.45)]">
                <Calendar size={13} className="text-[#E9D5FF]" />
                <span>{EVENT_CONFIG.dates}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.04] text-[#E2DEEC] font-display text-xs tracking-[0.16em] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
                <span>DEADLINE: {EVENT_CONFIG.registrationDeadline}</span>
              </span>
            </div>
          </div>

          {/* Monumental Digits with Smooth Vertical Slide */}
          <div className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FFFFFF] flex items-center justify-center gap-2 sm:gap-4 my-2">
            <SlidingDigit value={dStr} />
            <span className="text-[#8B5CF6] font-light text-2xl sm:text-4xl">:</span>
            <SlidingDigit value={hStr} />
            <span className="text-[#8B5CF6] font-light text-2xl sm:text-4xl">:</span>
            <SlidingDigit value={mStr} />
            <span className="text-[#8B5CF6] font-light text-2xl sm:text-4xl">:</span>
            <SlidingDigit value={sStr} />
          </div>

          {/* Unit Labels: Bright and clear */}
          <div className="flex items-center justify-center gap-7 sm:gap-11 font-display text-[11px] sm:text-xs tracking-[0.22em] text-[#E2DEEC] uppercase font-semibold">
            <span>DAYS</span>
            <span>HOURS</span>
            <span>MINS</span>
            <span>SECS</span>
          </div>

          <div className="pt-2 space-y-1">
            <div className="font-display text-xs sm:text-sm tracking-[0.25em] uppercase text-[#F7F5FF] font-bold">
              {registrationClosed ? (
                <span className="text-[#C084FC]">REGISTRATION CLOSED</span>
              ) : (
                <>FREE REGISTRATION CLOSES: <span className="text-[#C084FC]">9 OCTOBER 2026 // 11:59 PM IST</span></>
              )}
            </div>
            <p className="max-w-sm mx-auto font-sans text-xs text-[#E2DEEC] font-normal leading-relaxed">
              100% Free of Cost Entry (₹0 Fee). Synchronized with Indian Standard Time (IST). Team slot registration closes strictly at cutoff.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
