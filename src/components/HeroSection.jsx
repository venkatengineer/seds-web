import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * CINEMATIC EDITORIAL HERO
 * 
 * Layout:
 * - Left 45-50%: Typography, brand identity, manifesto, and action buttons.
 * - Right 45-50%: Massive 3D Earth limb rendered in ThreeSpaceEngine with atmospheric violet rim.
 * - Deep negative space, restrained lighting, no flashing or arcade bouncing.
 */

export default function HeroSection({ onOpenRegister, onNavigate, mousePos = { x: 0.5, y: 0.5 } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 4;
  const parallaxY = (mousePos.y - 0.5) * 3;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Soft, Deep Purple Atmospheric Haze in background */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] rounded-full pointer-events-none -z-10 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(109, 40, 217, 0.2) 0%, rgba(50, 16, 95, 0.05) 50%, rgba(2, 1, 7, 0) 80%)',
          filter: 'blur(90px)',
          transform: `translate(${parallaxX * -0.5}px, ${parallaxY * -0.5}px)`,
        }}
      />

      {/* Top Architecture Line */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-[#A6A0B8] font-display text-[11px] tracking-[0.2em] uppercase">
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

      {/* Main Protected Editorial Zone (Left 50% of screen) */}
      <div 
        className="w-full lg:w-[50%] xl:w-[46%] my-auto py-6 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      >
        {/* Brand Hierarchy Stack */}
        <div className="mb-6 space-y-1.5">
          <div className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
            {SEDS_CONFIG.name}
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="font-display text-xs tracking-[0.28em] text-[#8B5CF6] uppercase font-semibold">
              {EVENT_CONFIG.presentsText}
            </span>
            <span className="text-white/20 font-display text-xs">/</span>
            <span className="font-display text-sm sm:text-base font-medium tracking-[0.18em] text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </span>
          </div>
        </div>

        {/* PRIMARY HEADLINE: Staggered Fade-in */}
        <h1 className="font-editorial text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-bold tracking-tight leading-[0.92] text-[#F7F5FF]">
          <div 
            className="transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(8px)',
              filter: mounted ? 'blur(0)' : 'blur(4px)',
              transitionDelay: '100ms',
            }}
          >
            {EVENT_CONFIG.heroHeadline[0]}
          </div>

          <div 
            className="text-white/90 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(8px)',
              filter: mounted ? 'blur(0)' : 'blur(4px)',
              transitionDelay: '250ms',
            }}
          >
            {EVENT_CONFIG.heroHeadline[1]}
          </div>

          <div 
            className="flex items-baseline gap-3 transition-all duration-700 ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(8px)',
              filter: mounted ? 'blur(0)' : 'blur(4px)',
              transitionDelay: '400ms',
            }}
          >
            <span>{EVENT_CONFIG.heroHeadline[2]}</span>
            <span className="inline-block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#8B5CF6] mb-1 sm:mb-2 opacity-90" />
          </div>
        </h1>

        {/* Supporting Narrative */}
        <p 
          className="mt-6 sm:mt-8 max-w-lg font-sans text-sm sm:text-base text-[#A6A0B8] leading-relaxed font-light transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: '550ms',
          }}
        >
          {EVENT_CONFIG.manifesto}
        </p>

        {/* Action Buttons */}
        <div 
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: '700ms',
          }}
        >
          <button
            onClick={onOpenRegister}
            className="group relative overflow-hidden px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-[#F7F5FF] font-display text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-[0_0_28px_rgba(139,92,246,0.35)] transition-all duration-300 ease-out focus:outline-none"
          >
            <div className="relative flex items-center gap-2">
              <span>Register for Orbital 26</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('mission')}
            className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors py-3 px-2 focus:outline-none"
          >
            <span>Explore Mission</span>
            <ArrowDown size={13} className="text-[#8B5CF6]" />
          </button>
        </div>
      </div>

      {/* Bottom Architecture Baseline */}
      <div className="border-t border-white/[0.06] pt-4 flex flex-wrap items-center justify-between gap-4 text-[#A6A0B8] font-display text-[11px] tracking-[0.18em] uppercase">
        <div className="flex items-center gap-3">
          <span className="text-[#F7F5FF]">48-HOUR SPACE SPRINT</span>
          <span className="text-white/20">•</span>
          <span>CHENNAI, INDIA</span>
          <span className="text-white/20">•</span>
          <span className="text-[#C084FC]">₹50,000 PRIZE POOL</span>
        </div>

        <button 
          onClick={() => onNavigate('mission')}
          className="flex items-center gap-2 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors focus:outline-none"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={11} className="text-[#8B5CF6]" />
        </button>
      </div>
    </section>
  );
}
