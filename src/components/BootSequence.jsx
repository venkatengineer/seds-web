import React, { useEffect, useState } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * MASTER CINEMATIC BOOT SPLASH
 * 
 * Phases:
 * - Phase 01: VOID (#010106, tiny violet center point emits faint light at ~300ms)
 * - Phase 02: LIGHT (Atmospheric soft violet light spreads, distant stars fade in gradually)
 * - Phase 03: SPACE FORMS (Subtle nebula emerges, 3D orbit trajectory draws progressively)
 * - Phase 04: 3D OBJECT REVEAL (Massive Earth limb emerges from darkness with violet Rayleigh atmospheric rim)
 * - Phase 05: SEDS REC IDENTITY (SEDS REC / Rajalakshmi Engineering College fades in from darkness)
 * - Phase 06: ORBITAL 26 (PRESENTS appears, brief pause, then ORBITAL 26 with soft violet illumination)
 * - Phase 07: SEAMLESS HERO HANDOFF (DO NOT CUT! Boot overlay dissolves into Hero typography)
 * - Phase 08: NAVIGATION & CONTROLS APPEAR
 * 
 * Rules:
 * - NO FLASH.
 * - NO GLITCH.
 * - NO SCALE EXPLOSION.
 * - Same 3D Canvas across the entire experience.
 */

export default function BootSequence({ bootPhase, onSkip, onAdvancePhase }) {
  // If boot is already complete (phase >= 6), render nothing
  if (bootPhase >= 6) return null;

  return (
    <div
      onClick={onSkip}
      className={`fixed inset-0 z-50 flex items-center justify-center select-none cursor-pointer transition-opacity duration-1000 ease-out ${
        bootPhase === 5 ? 'opacity-90' : bootPhase >= 6 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: bootPhase >= 3 ? 'transparent' : '#010106',
        pointerEvents: bootPhase >= 6 ? 'none' : 'auto',
      }}
    >
      {/* PHASE 01: Single Tiny Center Violet Seed Point */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-1000 ease-out pointer-events-none ${
          bootPhase === 0
            ? 'w-1.5 h-1.5 opacity-90 shadow-[0_0_12px_rgba(192,132,252,0.9)]'
            : bootPhase === 1
            ? 'w-3 h-3 opacity-100 shadow-[0_0_35px_rgba(139,92,246,1)]'
            : 'w-4 h-4 opacity-0 scale-150'
        }`}
      />

      {/* PHASE 02: Atmospheric Soft Violet Light Spread */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-1200 ease-out ${
          bootPhase >= 1 && bootPhase < 4
            ? 'w-[45vw] h-[45vw] opacity-40 scale-100'
            : 'w-[10vw] h-[10vw] opacity-0 scale-50'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(76, 29, 149, 0.12) 50%, rgba(1, 1, 6, 0) 80%)',
          filter: 'blur(75px)',
        }}
      />

      {/* Center Editorial Typography Emergence Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        
        {/* PHASE 05: SEDS REC Identity Emergence */}
        <div
          className={`transition-all duration-800 ease-out ${
            bootPhase === 4 || bootPhase === 5
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-6 blur-md'
          }`}
        >
          <div className="font-editorial text-3xl sm:text-5xl font-bold tracking-[0.25em] text-[#F7F5FF]">
            {SEDS_CONFIG.name}
          </div>
          <div className="font-display text-xs sm:text-sm tracking-[0.22em] text-[#A6A0B8] uppercase mt-1">
            {SEDS_CONFIG.institution}
          </div>
        </div>

        {/* PHASE 06: PRESENTS / ORBITAL 26 Reveal */}
        <div
          className={`mt-4 flex items-center gap-3 transition-all duration-800 ease-out ${
            bootPhase === 5
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-6 blur-md'
          }`}
        >
          <span className="font-display text-xs tracking-[0.35em] uppercase text-[#8B5CF6] font-semibold">
            {EVENT_CONFIG.presentsText}
          </span>
          <span className="text-white/20 font-display text-xs">/</span>
          <span className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.22em] text-[#F7F5FF] drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            {EVENT_CONFIG.name}
          </span>
        </div>

        {/* Minimal Progress Line Indicator */}
        <div className="mt-8 w-32 h-[1px] bg-white/10 overflow-hidden relative">
          <div
            className="absolute inset-y-0 left-0 bg-[#8B5CF6] transition-all duration-500 ease-out"
            style={{
              width: `${(bootPhase / 6) * 100}%`,
            }}
          />
        </div>

        <div className="mt-2 font-display text-[9px] tracking-[0.25em] text-[#A6A0B8]/60 uppercase">
          {bootPhase <= 1 && 'INITIALIZING ORBITAL PROTOCOL'}
          {bootPhase === 2 && 'SYNCHRONIZING CELESTIAL VECTORS'}
          {bootPhase === 3 && 'ESTABLISHING EARTH TERMINATOR'}
          {bootPhase === 4 && 'CONNECTING SEDS REC DIVISION'}
          {bootPhase === 5 && 'ENTERING ORBITAL 26 SPRINT'}
        </div>
      </div>

      {/* Skip Prompt (Quiet & Minimal) */}
      <div className="absolute bottom-8 font-display text-[10px] tracking-[0.25em] text-[#A6A0B8]/50 uppercase transition-opacity duration-500 hover:text-white">
        Click anywhere or press Space to skip sequence
      </div>
    </div>
  );
}
