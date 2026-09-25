import React from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * SPATIAL PRIZE MONUMENTS
 * 
 * Philosophy:
 * - Avoids generic 3-card layout.
 * - Creates spatial depth: Grand Prize (₹50K) large and close with soft purple falloff halo.
 * - Secondary prizes placed deeper in visual field (scale 0.88, subtle parallax).
 * - ZERO flashing, ZERO rapid pulsing.
 */

export default function PrizesSection({ onOpenRegister, mousePos = { x: 0.5, y: 0.5 } }) {
  // Controlled parallax depth calculation (max 6-8px)
  const depthOffsetX = (mousePos.x - 0.5) * 8;
  const depthOffsetY = (mousePos.y - 0.5) * 6;

  return (
    <section 
      id="prizes" 
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 z-20 select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-dark-b pb-6 mb-16">
        <div>
          <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-[#8B5CF6] block mb-1">
            // {SEDS_CONFIG.name} REWARDS & GRANTS
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            PRIZE MONUMENTS.
          </h2>
        </div>
        <div className="font-mono-tech text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          {EVENT_CONFIG.name} // CAPITAL ALLOCATION
        </div>
      </div>

      {/* Primary Grand Prize (Closer in Depth, Monumental Scale, Soft Purple Halo) */}
      <div className="relative text-center my-6 py-8 flex flex-col items-center justify-center">
        
        {/* Soft Volumetric Purple Halo (Low contrast, realistic falloff) */}
        <div 
          className="absolute w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] rounded-full pointer-events-none -z-10 opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(109, 40, 217, 0.25) 0%, rgba(50, 16, 95, 0.08) 50%, rgba(2, 1, 7, 0) 80%)',
            filter: 'blur(90px)',
            transform: `translate(${depthOffsetX * -0.5}px, ${depthOffsetY * -0.5}px)`,
          }}
        />

        {/* Framing Orbital Reference Arc */}
        <div className="absolute w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] rounded-full border border-white/[0.04] pointer-events-none -z-10" />

        {/* Position Tag */}
        <div className="inline-flex items-center gap-2 mb-3 font-mono-tech text-xs tracking-[0.35em] uppercase text-[#8B5CF6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
          <span>POSITION 01 // ORBIT APEX</span>
        </div>

        {/* Monumental ₹50K Typography */}
        <div 
          className="font-editorial text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-bold tracking-tighter text-[#F7F5FF] leading-none my-2"
          style={{
            textShadow: '0 0 50px rgba(109, 40, 217, 0.25)',
          }}
        >
          {EVENT_CONFIG.grandPrize}
        </div>

        {/* Grand Prize Label */}
        <div className="font-display text-lg sm:text-2xl font-light tracking-[0.22em] uppercase text-[#F7F5FF] mt-2">
          GRAND PRIZE & SEDS FELLOWSHIP
        </div>

        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#A6A0B8] font-light mt-2">
          Unrestricted non-dilutive capital awarded to the most rigorously engineered flight software or astrodynamics model.
        </p>
      </div>

      {/* Secondary Prizes (Deeper in the Visual Field: Scale 0.88 & Subtle Parallax) */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14 max-w-4xl mx-auto w-full my-6 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${depthOffsetX * 0.3}px, ${depthOffsetY * 0.3}px, 0)`,
        }}
      >
        {/* Position 02 */}
        <div className="relative p-7 rounded-2xl border border-white/[0.06] bg-[#07030F]/50 backdrop-blur-md text-center flex flex-col items-center justify-center hover:border-white/20 transition-all duration-300 scale-95 hover:scale-100">
          <span className="font-mono-tech text-[10px] tracking-[0.28em] text-[#A6A0B8] uppercase mb-1.5">
            POSITION 02 // VECTOR RUNNER-UP
          </span>
          <div className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#F7F5FF] my-1">
            {EVENT_CONFIG.secondPrize}
          </div>
          <div className="font-display text-xs uppercase tracking-widest text-[#8B5CF6]">
            Runner-Up System Award
          </div>
        </div>

        {/* Position 03 */}
        <div className="relative p-7 rounded-2xl border border-white/[0.06] bg-[#07030F]/50 backdrop-blur-md text-center flex flex-col items-center justify-center hover:border-white/20 transition-all duration-300 scale-95 hover:scale-100">
          <span className="font-mono-tech text-[10px] tracking-[0.28em] text-[#A6A0B8] uppercase mb-1.5">
            POSITION 03 // INNOVATION MERIT
          </span>
          <div className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#F7F5FF] my-1">
            {EVENT_CONFIG.thirdPrize}
          </div>
          <div className="font-display text-xs uppercase tracking-widest text-[#8B5CF6]">
            Bronze Flight Merit
          </div>
        </div>
      </div>

      {/* Bottom CTA to Register */}
      <div className="text-center pt-4">
        <button
          onClick={onOpenRegister}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-[#8B5CF6]/50 bg-[#07030F]/60 text-xs font-mono-tech uppercase tracking-[0.2em] text-[#F7F5FF] hover:text-white transition-all duration-300"
          data-interactive="true"
        >
          <span>Compete for Capital Grants ↗</span>
        </button>
      </div>
    </section>
  );
}
