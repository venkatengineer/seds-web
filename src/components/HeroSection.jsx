import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * PREMIUM CINEMATIC HERO COMPOSITION
 * 
 * Philosophy:
 * - Aggressive use of dark space. 60% negative space on left/center.
 * - Headline is primary focal point; 3D celestial system is secondary on the right.
 * - Headline lines enter one by one with opacity + 6px movement + slight blur removal.
 * - ZERO flashing, ZERO bouncing UI (no animate-bounce, no animate-ping).
 * - Typography: Crisp white #F7F5FF with subtle lavender #C084FC highlight.
 */

export default function HeroSection({ onOpenRegister, onNavigate, mousePos, scrollProgress = 0 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Smooth, subtle foreground drift (3-5px max)
  const fgOffsetX = (mousePos.x - 0.5) * 5;
  const fgOffsetY = (mousePos.y - 0.5) * 4;

  // Gentle scroll forward scale (1.0 -> 1.04)
  const heroScale = 1.0 + Math.min(scrollProgress, 1.0) * 0.04;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-12 lg:px-20 z-20 select-none overflow-hidden"
    >
      {/* Soft, Deep Purple Atmospheric Haze (Very low opacity falloff) */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[45vh] rounded-full pointer-events-none -z-10 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(109, 40, 217, 0.22) 0%, rgba(50, 16, 95, 0.08) 50%, rgba(2, 1, 7, 0) 80%)',
          filter: 'blur(90px)',
          transform: `translate(${fgOffsetX * -0.5}px, ${fgOffsetY * -0.5}px)`,
        }}
      />

      {/* Top Quiet Architecture Baseline */}
      <div className="flex items-center justify-between hairline-dark-b pb-3 text-[#A6A0B8] font-mono-tech text-[10px] tracking-[0.25em] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
          <span className="text-[#F7F5FF] font-medium">{SEDS_CONFIG.name}</span>
          <span className="text-white/20">/</span>
          <span className="hidden sm:inline text-[#A6A0B8]">{SEDS_CONFIG.institution}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[#C084FC] font-medium">{EVENT_CONFIG.name}</span>
          <span className="text-white/20">/</span>
          <span>APRIL 2026</span>
        </div>
      </div>

      {/* Main Protected Typography Zone (Left 58% of Viewport) */}
      <div 
        className="w-full lg:w-[60%] xl:w-[55%] my-auto py-2 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${fgOffsetX}px, ${fgOffsetY}px, 0) scale(${heroScale})`,
        }}
      >
        {/* Brand Hierarchy Stack */}
        <div className="mb-4 sm:mb-6 space-y-1.5">
          {/* PRIMARY: SEDS REC */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#F7F5FF]">
              {SEDS_CONFIG.name}
            </span>
            <span className="hidden sm:inline font-mono-tech text-[9px] tracking-[0.25em] text-[#A6A0B8] uppercase">
              // {SEDS_CONFIG.institution}
            </span>
          </div>

          {/* PRESENTS & EVENT NAME */}
          <div className="flex items-center gap-2.5 pt-0.5">
            <span className="font-mono-tech text-[10px] sm:text-xs tracking-[0.35em] text-[#8B5CF6] uppercase font-semibold">
              {EVENT_CONFIG.presentsText}
            </span>
            <span className="text-white/20 font-mono-tech text-xs">/</span>
            <span className="font-display text-base sm:text-lg font-semibold tracking-[0.2em] text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full border border-white/10 text-[9px] font-mono-tech text-[#C084FC] uppercase tracking-wider">
              {EVENT_CONFIG.edition}
            </span>
          </div>
        </div>

        {/* PRIMARY HEADLINE: Staggered Entrance (Line by Line with Opacity + 6px + Blur Removal) */}
        <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl xl:text-[6.75rem] font-bold tracking-tight leading-[0.92] text-[#F7F5FF]">
          {/* Line 1: BUILD */}
          <div 
            className="transition-all duration-800 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(6px)',
              filter: mounted ? 'blur(0)' : 'blur(4px)',
              transitionDelay: '100ms',
            }}
          >
            {EVENT_CONFIG.heroHeadline[0]}
          </div>

          {/* Line 2: BEYOND */}
          <div 
            className="text-white/90 transition-all duration-800 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(6px)',
              filter: mounted ? 'blur(0)' : 'blur(4px)',
              transitionDelay: '300ms',
            }}
          >
            {EVENT_CONFIG.heroHeadline[1]}
          </div>

          {/* Line 3: THE KNOWN */}
          <div 
            className="flex items-baseline gap-3 transition-all duration-800 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(6px)',
              filter: mounted ? 'blur(0)' : 'blur(4px)',
              transitionDelay: '500ms',
            }}
          >
            <span>{EVENT_CONFIG.heroHeadline[2]}</span>
            <span className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#8B5CF6] mb-1 sm:mb-2 opacity-90" />
          </div>
        </h1>

        {/* Supporting Manifesto */}
        <p 
          className="mt-6 sm:mt-8 max-w-xl font-sans text-sm sm:text-base text-[#A6A0B8] leading-relaxed font-light transition-all duration-800 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(6px)',
            transitionDelay: '700ms',
          }}
        >
          A premiere deep-space hackathon hosted by <span className="text-[#F7F5FF] font-medium">{SEDS_CONFIG.name}</span> at {SEDS_CONFIG.institution}. 
          Bringing student engineers, astronomers, and computational architects together to build the technological substrates of future spaceflight.
        </p>

        {/* Action Row: Controlled Easing, No Flashing */}
        <div 
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 transition-all duration-800 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(6px)',
            transitionDelay: '850ms',
          }}
        >
          <button
            onClick={onOpenRegister}
            className="group relative overflow-hidden px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-[#F7F5FF] font-mono-tech text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-400 ease-out focus:outline-none"
            data-interactive="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <div className="relative flex items-center gap-2">
              <span>Register for Orbital 26</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('mission')}
            className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors py-3 px-2 focus:outline-none"
            data-interactive="true"
          >
            <span>Explore Mission</span>
            <ArrowDown size={13} className="text-[#8B5CF6]" />
          </button>
        </div>
      </div>

      {/* Bottom Quiet Architecture Strip */}
      <div className="hairline-dark-t pt-4 flex flex-wrap items-center justify-between gap-4 text-[#A6A0B8] font-mono-tech text-[10px] tracking-[0.2em] uppercase">
        <div className="flex items-center gap-3">
          <span className="text-[#F7F5FF]">48-HOUR SPACE SPRINT</span>
          <span className="text-white/20">•</span>
          <span>CHENNAI, INDIA</span>
          <span className="text-white/20">•</span>
          <span className="text-[#C084FC]">₹50K PRIZE POOL</span>
        </div>

        <div 
          onClick={() => onNavigate('mission')}
          className="flex items-center gap-2 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={11} className="text-[#8B5CF6]" />
        </div>
      </div>
    </section>
  );
}
