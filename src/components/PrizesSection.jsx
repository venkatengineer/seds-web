import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * SPATIAL PRIZE COMPOSITION
 * 
 * Target:
 * - NOT three cards.
 * - Huge spatial composition with depth, light, and monumental typography.
 * - ₹50,000 GRAND PRIZE as the primary destination.
 * - Secondary awards placed in orbit around the primary capital pool.
 */

export default function PrizesSection({ onOpenRegister, mousePos = { x: 0.5, y: 0.5 } }) {
  const depthX = (mousePos.x - 0.5) * 6;
  const depthY = (mousePos.y - 0.5) * 5;

  return (
    <section 
      id="prizes" 
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // ORBITAL 26 CAPITAL ALLOCATION
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            PRIZE MONUMENTS.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          NON-DILUTIVE FELLOWSHIP POOL
        </div>
      </div>

      {/* Monumental Spatial Destination: ₹50,000 Grand Prize */}
      <div className="relative text-center my-8 py-12 flex flex-col items-center justify-center">
        
        {/* Soft Volumetric Purple Halo */}
        <div 
          className="absolute w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none -z-10 opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(76, 29, 149, 0.1) 50%, rgba(2, 1, 7, 0) 80%)',
            filter: 'blur(90px)',
            transform: `translate(${depthX * -0.6}px, ${depthY * -0.6}px)`,
          }}
        />

        {/* Delicate Slow Rotating Horizon Arc */}
        <div className="absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full border border-white/[0.04] pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 mb-3 font-display text-xs tracking-[0.3em] uppercase text-[#8B5CF6]">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span>PRIMARY MONUMENT // FIRST POSITION</span>
        </div>

        {/* Monumental ₹50,000 */}
        <div 
          className="font-editorial text-7xl sm:text-9xl md:text-[10rem] lg:text-[11.5rem] font-bold tracking-tight text-[#F7F5FF] leading-none my-2"
          style={{
            textShadow: '0 0 60px rgba(139, 92, 246, 0.25)',
          }}
        >
          {EVENT_CONFIG.grandPrize}
        </div>

        <div className="font-display text-xl sm:text-2xl font-light tracking-[0.2em] uppercase text-[#F7F5FF] mt-2">
          GRAND PRIZE & SEDS INCUBATION
        </div>

        <p className="max-w-md mx-auto text-xs sm:text-sm text-[#A6A0B8] font-light mt-3 leading-relaxed">
          Awarded unconditionally to the team demonstrating outstanding engineering rigor, mathematical fidelity, and flight-ready software architecture.
        </p>
      </div>

      {/* Secondary Awards In Orbit (Depth Tier 2) */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-4xl mx-auto w-full mt-4 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${depthX * 0.4}px, ${depthY * 0.4}px, 0)`,
        }}
      >
        <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#07030F]/60 backdrop-blur-md text-center space-y-2 hover:border-[#8B5CF6]/40 transition-all duration-300">
          <span className="font-display text-[10px] tracking-[0.25em] text-[#A6A0B8] uppercase block">
            SECOND POSITION // RUNNER-UP
          </span>
          <div className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#F7F5FF]">
            {EVENT_CONFIG.secondPrize}
          </div>
          <div className="font-display text-xs uppercase tracking-widest text-[#8B5CF6]">
            Flight Software Runner-Up
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#07030F]/60 backdrop-blur-md text-center space-y-2 hover:border-[#8B5CF6]/40 transition-all duration-300">
          <span className="font-display text-[10px] tracking-[0.25em] text-[#A6A0B8] uppercase block">
            THIRD POSITION // INNOVATION MERIT
          </span>
          <div className="font-editorial text-4xl sm:text-5xl font-bold tracking-tight text-[#F7F5FF]">
            {EVENT_CONFIG.thirdPrize}
          </div>
          <div className="font-display text-xs uppercase tracking-widest text-[#8B5CF6]">
            Aerospace Innovation Award
          </div>
        </div>
      </div>

      {/* Track Grants Strip */}
      <div className="max-w-4xl mx-auto w-full mt-8 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-display text-[#A6A0B8]">
        <div className="flex items-center gap-2">
          <span className="text-[#8B5CF6] font-semibold">TRACK GRANTS:</span>
          <span>₹10,000 awarded across each of the 4 individual challenge chapters</span>
        </div>

        <button
          onClick={onOpenRegister}
          className="inline-flex items-center gap-1.5 text-[#F7F5FF] hover:text-[#C084FC] uppercase tracking-wider transition-colors"
        >
          <span>Compete for Capital Grants</span>
          <ArrowUpRight size={13} className="text-[#8B5CF6]" />
        </button>
      </div>
    </section>
  );
}
