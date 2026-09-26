import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * MASTER CINEMATIC HERO SECTION
 * 
 * Target:
 * - Boot Phase 6 triggers the staggered reveal:
 *   BUILD (opacity 0->1, translateY 30px->0, blur 10px->0)
 *   BEYOND (staggered delay)
 *   THE KNOWN. (staggered delay)
 * - Navigation and bottom architecture bar fade in at Phase 7.
 * - Contrast: moving 3D environment + rock-solid editorial typography.
 */

export default function HeroSection({ 
  onOpenRegister, 
  onNavigate, 
  mousePos = { x: 0.5, y: 0.5 }, 
  bootPhase = 7,
}) {
  const parallaxX = (mousePos.x - 0.5) * 4;
  const parallaxY = (mousePos.y - 0.5) * 3;

  const isRevealing = bootPhase >= 6;
  const isFullyLive = bootPhase >= 7;

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-10 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Soft Deep Purple Atmospheric Haze in background */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] rounded-full pointer-events-none -z-10 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(109, 40, 217, 0.2) 0%, rgba(50, 16, 95, 0.05) 50%, rgba(2, 1, 7, 0) 80%)',
          filter: 'blur(90px)',
          transform: `translate(${parallaxX * -0.5}px, ${parallaxY * -0.5}px)`,
        }}
      />

      {/* Top Architecture Baseline (Fades in at Phase 7) */}
      <div 
        className={`flex items-center justify-between border-b border-white/[0.06] pb-3 text-[#A6A0B8] font-display text-[11px] tracking-[0.2em] uppercase transition-all duration-1000 ease-out ${
          isFullyLive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
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
          <div 
            className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F7F5FF] transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(20px)',
              filter: isRevealing ? 'blur(0)' : 'blur(8px)',
              transitionDelay: '100ms',
            }}
          >
            {SEDS_CONFIG.name}
          </div>

          <div 
            className="flex items-center gap-2 pt-0.5 transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(20px)',
              filter: isRevealing ? 'blur(0)' : 'blur(8px)',
              transitionDelay: '250ms',
            }}
          >
            <span className="font-display text-xs tracking-[0.28em] text-[#8B5CF6] uppercase font-semibold">
              {EVENT_CONFIG.presentsText}
            </span>
            <span className="text-white/20 font-display text-xs">/</span>
            <span className="font-display text-sm sm:text-base font-medium tracking-[0.18em] text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </span>
          </div>
        </div>

        {/* PRIMARY HEADLINE: Staggered Stately Reveal (600–900ms per line) */}
        <h1 className="font-editorial text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[6.25rem] font-bold tracking-tight leading-[0.92] text-[#F7F5FF]">
          {/* Line 1: BUILD */}
          <div 
            className="transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(30px)',
              filter: isRevealing ? 'blur(0)' : 'blur(10px)',
              transitionDelay: '350ms',
            }}
          >
            {EVENT_CONFIG.heroHeadline[0]}
          </div>

          {/* Line 2: BEYOND */}
          <div 
            className="text-white/90 transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(30px)',
              filter: isRevealing ? 'blur(0)' : 'blur(10px)',
              transitionDelay: '600ms',
            }}
          >
            {EVENT_CONFIG.heroHeadline[1]}
          </div>

          {/* Line 3: THE KNOWN */}
          <div 
            className="flex items-baseline gap-3 transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(30px)',
              filter: isRevealing ? 'blur(0)' : 'blur(10px)',
              transitionDelay: '850ms',
            }}
          >
            <span>{EVENT_CONFIG.heroHeadline[2]}</span>
            <span className="inline-block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#8B5CF6] mb-1 sm:mb-2 opacity-90 shadow-[0_0_15px_#8B5CF6]" />
          </div>
        </h1>

        {/* Supporting Narrative */}
        <p 
          className="mt-6 sm:mt-8 max-w-lg font-sans text-sm sm:text-base text-[#A6A0B8] leading-relaxed font-light transition-all duration-800 ease-out"
          style={{
            opacity: isRevealing ? 1 : 0,
            transform: isRevealing ? 'translateY(0)' : 'translateY(25px)',
            filter: isRevealing ? 'blur(0)' : 'blur(6px)',
            transitionDelay: '1050ms',
          }}
        >
          {EVENT_CONFIG.manifesto}
        </p>

        {/* Action Buttons */}
        <div 
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 transition-all duration-800 ease-out"
          style={{
            opacity: isRevealing ? 1 : 0,
            transform: isRevealing ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '1250ms',
          }}
        >
          <button
            onClick={onOpenRegister}
            className="group relative overflow-hidden px-8 py-4 rounded-full border border-[#8B5CF6]/50 bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-[#F7F5FF] font-display text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 transition-all duration-300 ease-out focus:outline-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
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

      {/* Bottom Architecture Baseline (Fades in at Phase 7) */}
      <div 
        className={`border-t border-white/[0.06] pt-4 flex flex-wrap items-center justify-between gap-4 text-[#A6A0B8] font-display text-[11px] tracking-[0.18em] uppercase transition-all duration-1000 ease-out ${
          isFullyLive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
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
