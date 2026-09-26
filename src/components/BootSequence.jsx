import React, { useEffect } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * MASTER CINEMATIC BOOT SEQUENCE OVERLAY
 * 
 * Target:
 * - Fluid, ZERO-GLITCH DOM presentation synchronized with ThreeSpaceEngine's master GSAP timeline.
 * - Progresses smoothly: Void (0) -> Light (1) -> Orbit (2) -> Earth Sunrise (3) -> SEDS REC (4) -> ORBITAL 26 (5) -> Hero Handoff (6) -> Live (7).
 * - NEVER unmounts abruptly! Smoothly dissolves opacity over 1000ms at phase 6 into the Hero headline.
 * - Continuous black backdrop opacity fade eliminates any background snapping.
 */

export default function BootSequence({ bootPhase, onSkip }) {
  // Keyboard listener for Space or Esc to skip sequence
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Escape' || e.key === 'Enter') {
        if (onSkip) onSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSkip]);

  const isHandoff = bootPhase >= 6;

  return (
    <div
      onClick={onSkip}
      className={`fixed inset-0 z-50 flex items-center justify-center select-none cursor-pointer transition-opacity duration-1000 ease-out ${
        isHandoff ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* 1. Deep Space Black Backdrop with Smooth 1.5s Opacity Dissolve */}
      <div 
        className="absolute inset-0 bg-[#010106] transition-opacity duration-1200 ease-out pointer-events-none"
        style={{
          opacity: bootPhase >= 3 ? 0 : 1,
        }}
      />

      {/* 2. Top Aerospace Flight Telemetry Header (Minimal, Real Context) */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between text-[#A6A0B8]/60 font-display text-[10px] tracking-[0.25em] uppercase pointer-events-none transition-opacity duration-700">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span>{SEDS_CONFIG.name} // FLIGHT OPS</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[9px] tracking-[0.28em] text-[#A6A0B8]/40">
          <span>LEO: 420 KM</span>
          <span>/</span>
          <span>INC: 51.6°</span>
          <span>/</span>
          <span>SYS: OPTIMAL</span>
        </div>
      </div>

      {/* 3. Center Atmospheric Glow Dome */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-1200 ease-out ${
          bootPhase >= 1 && bootPhase < 4
            ? 'w-[50vw] h-[50vw] opacity-40 scale-100'
            : 'w-[15vw] h-[15vw] opacity-0 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(76, 29, 149, 0.15) 50%, rgba(1, 1, 6, 0) 80%)',
          filter: 'blur(80px)',
        }}
      />

      {/* 4. Center Typographic Staging Area */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none max-w-2xl">
        
        {/* PHASE 0 & 1: Hyperspace Vector Lock Indicator */}
        <div
          className={`transition-all duration-700 ease-out ${
            bootPhase <= 1
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 -translate-y-4 blur-sm pointer-events-none'
          }`}
        >
          <div className="font-display text-[11px] tracking-[0.4em] uppercase text-[#C084FC]">
            {bootPhase === 0 ? 'INITIALIZING QUANTUM SINGULARITY' : 'RELATIVISTIC WARP VELOCITY LOCK'}
          </div>
        </div>

        {/* PHASE 2 & 3: Orbital Vector Lock */}
        <div
          className={`transition-all duration-700 ease-out ${
            bootPhase === 2 || bootPhase === 3
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 -translate-y-4 blur-sm pointer-events-none'
          }`}
        >
          <div className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A6A0B8]">
            {bootPhase === 2 ? 'SYNCHRONIZING ORBITAL TRAJECTORY' : 'ESTABLISHING CELESTIAL TERMINATOR'}
          </div>
        </div>

        {/* PHASE 4: SEDS REC Identity Reveal */}
        <div
          className={`transition-all duration-900 ease-out ${
            bootPhase === 4
              ? 'opacity-100 translate-y-0 filter-none'
              : bootPhase > 4
              ? 'opacity-0 -translate-y-6 blur-md pointer-events-none'
              : 'opacity-0 translate-y-8 blur-lg pointer-events-none'
          }`}
        >
          <div className="font-editorial text-4xl sm:text-6xl font-bold tracking-[0.22em] text-[#F7F5FF] drop-shadow-[0_0_35px_rgba(139,92,246,0.6)]">
            {SEDS_CONFIG.name}
          </div>
          <div className="font-display text-xs sm:text-sm tracking-[0.28em] text-[#C084FC] uppercase mt-2 font-medium">
            {SEDS_CONFIG.institution}
          </div>
          <div className="font-display text-[9px] tracking-[0.3em] text-[#A6A0B8]/60 uppercase mt-2">
            CHAPTER OF SEDS INDIA
          </div>
        </div>

        {/* PHASE 5: PRESENTS / ORBITAL 26 Lockup */}
        <div
          className={`transition-all duration-900 ease-out ${
            bootPhase === 5
              ? 'opacity-100 translate-y-0 filter-none'
              : bootPhase > 5
              ? 'opacity-0 -translate-y-6 blur-md pointer-events-none'
              : 'opacity-0 translate-y-8 blur-lg pointer-events-none'
          }`}
        >
          <div className="font-display text-xs tracking-[0.4em] uppercase text-[#8B5CF6] font-semibold mb-2">
            {EVENT_CONFIG.presentsText}
          </div>
          <div className="font-editorial text-3xl sm:text-5xl font-bold tracking-[0.2em] text-[#F7F5FF] drop-shadow-[0_0_40px_rgba(168,85,247,0.7)]">
            {EVENT_CONFIG.name}
          </div>
          <div className="font-display text-[10px] tracking-[0.3em] uppercase text-[#A6A0B8] mt-2">
            NATIONAL STUDENT SPACE INNOVATION SPRINT
          </div>
        </div>

        {/* Minimal Progress Bar with Radiant Traveling Indicator */}
        <div className="mt-10 w-48 h-[2px] bg-white/10 overflow-hidden relative rounded-full">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7C3AED] to-[#C084FC] transition-all duration-500 ease-out shadow-[0_0_12px_#A855F7]"
            style={{
              width: `${(Math.min(bootPhase, 5) / 5) * 100}%`,
            }}
          />
        </div>

        <div className="mt-3 font-display text-[9px] tracking-[0.25em] text-[#A6A0B8]/60 uppercase">
          {bootPhase <= 0 && 'STAGE 01 // SINGULARITY GENESIS'}
          {bootPhase === 1 && 'STAGE 02 // RELATIVISTIC ACCELERATION'}
          {bootPhase === 2 && 'STAGE 03 // TRAJECTORY VECTOR SYNC'}
          {bootPhase === 3 && 'STAGE 04 // CELESTIAL SUNRISE'}
          {bootPhase === 4 && 'STAGE 05 // CHAPTER IDENTITY LOCK'}
          {bootPhase >= 5 && 'STAGE 06 // MISSION ENVIRONMENT READY'}
        </div>
      </div>

      {/* 5. Bottom Skip Prompt (Subtle, Responsive) */}
      <div className="absolute bottom-8 font-display text-[10px] tracking-[0.3em] text-[#A6A0B8]/40 uppercase transition-colors duration-300 hover:text-white">
        [ Press Space or Click to Enter Directly ]
      </div>
    </div>
  );
}
