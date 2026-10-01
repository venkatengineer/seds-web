import React, { useEffect, useState } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';
import { toggleOrbitalAmbiance, getAudioState } from '../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * MASTER CINEMATIC BOOT SEQUENCE OVERLAY — "THE SIGNAL"
 * 
 * Target & Aesthetic:
 * - Opening sequence of a high-budget space film combined with a premium technology product launch.
 * - Zero HUD, zero fake telemetry, zero loading bars, zero glitch/cyberpunk effects.
 * - Pure, restrained editorial elegance.
 * - Phase Progression:
 *   0: Complete Darkness (0.0s -> 0.5s)
 *   1-6: Deep space visual cinema (The Signal -> Stars -> Spacecraft -> Earth Horizon -> Orbit -> Camera Pass)
 *   7: Cosmic darkness pause (200-400ms)
 *   8: SEDS REC & Rajalakshmi Engineering College reveal
 *   9: PRESENTS reveal
 *   10: ORBITAL 26 major title reveal
 *   11: The Light Sweep across trajectory & title
 *   12: BUILD BEYOND THE KNOWN & 48-Hour Space Sprint metadata
 *   13: Seamless handoff into Website Hero (Splash BECOMES the Hero)
 */

export default function BootSequence({ bootPhase, onSkip }) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Sync initial audio state
  useEffect(() => {
    setIsAudioActive(getAudioState());
  }, []);

  const handleAudioToggle = (e) => {
    e.stopPropagation();
    const active = toggleOrbitalAmbiance();
    setIsAudioActive(active);
  };

  // Keyboard shortcut listener to skip or advance
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Escape' || e.key === 'Enter') {
        if (onSkip) onSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSkip]);

  const isHandoff = bootPhase >= 13;

  return (
    <div
      onClick={onSkip}
      className={`fixed inset-0 z-50 flex items-center justify-center select-none cursor-pointer transition-opacity duration-1200 ease-out ${
        isHandoff ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* 1. Deep Space Black Backdrop (Fades out softly after Phase 0 so 3D Canvas shines through) */}
      <div 
        className="absolute inset-0 bg-[#010106] transition-opacity duration-1000 ease-out pointer-events-none"
        style={{
          opacity: bootPhase === 0 ? 1 : 0,
        }}
      />

      {/* 2. Top-Right Discreet Audio Ambiance Toggle */}
      <div className="absolute top-8 right-8 z-30 pointer-events-auto">
        <button
          onClick={handleAudioToggle}
          title={isAudioActive ? 'Mute Deep Space Audio' : 'Enable Deep Space Audio'}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[#A6A0B8] hover:text-[#F7F5FF] hover:border-white/20 transition-all duration-300 text-[10px] font-display tracking-[0.2em] uppercase focus:outline-none"
        >
          {isAudioActive ? (
            <>
              <Volume2 size={12} className="text-[#C084FC]" />
              <span className="text-[#C084FC]">SOUND: ACTIVE</span>
            </>
          ) : (
            <>
              <VolumeX size={12} />
              <span>SOUND: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* 3. Center Atmospheric Glow Dome for Title Illumination */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-1400 ease-out ${
          bootPhase >= 10 && bootPhase < 13
            ? 'w-[70vw] h-[50vw] opacity-40 scale-100'
            : 'w-[20vw] h-[20vw] opacity-0 scale-50'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.28) 0%, rgba(76, 29, 149, 0.1) 50%, rgba(1, 1, 6, 0) 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* 4. MASTER TYPOGRAPHIC STAGING AREA */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none max-w-5xl w-full">
        
        {/* ============================================================ */}
        {/* PHASES 8 & 9: SEDS REC & RAJALAKSHMI ENGINEERING COLLEGE & PRESENTS */}
        {/* ============================================================ */}
        <div
          className={`flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
            bootPhase >= 8
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-6 blur-lg pointer-events-none'
          } ${bootPhase >= 10 ? 'mb-4 sm:mb-6 scale-90 sm:scale-95' : 'my-4'}`}
        >
          {/* SEDS REC */}
          <div className="font-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.24em] text-[#F7F5FF] drop-shadow-[0_0_35px_rgba(139,92,246,0.5)]">
            {SEDS_CONFIG.name}
          </div>

          {/* RAJALAKSHMI ENGINEERING COLLEGE */}
          <div className="font-display text-[10px] sm:text-xs md:text-sm tracking-[0.38em] text-[#C084FC]/85 uppercase mt-2 sm:mt-3 font-medium">
            {SEDS_CONFIG.institution}
          </div>

          {/* PHASE 9: PRESENTS */}
          <div
            className={`transition-all duration-800 ease-out mt-4 sm:mt-5 ${
              bootPhase >= 9
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 translate-y-3 blur-sm'
            }`}
          >
            <div className="font-display text-[11px] sm:text-xs tracking-[0.45em] uppercase text-[#8B5CF6] font-semibold">
              {EVENT_CONFIG.presentsText}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PHASES 10, 11, 12: ORBITAL 26 & THE LIGHT SWEEP & TAGLINE */}
        {/* ============================================================ */}
        <div
          className={`flex flex-col items-center justify-center transition-all duration-1200 ease-out ${
            bootPhase >= 10
              ? 'opacity-100 translate-y-0 filter-none'
              : 'opacity-0 translate-y-8 blur-xl pointer-events-none'
          }`}
        >
          {/* MAJOR TITLE: ORBITAL 26 */}
          <div className="relative inline-block overflow-hidden py-1 px-4 sm:px-6">
            <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] text-[#F7F5FF] leading-none drop-shadow-[0_0_55px_rgba(168,85,247,0.55)]">
              {EVENT_CONFIG.name}
            </h1>

            {/* PHASE 11: SPECULAR CINEMATIC LIGHT SWEEP SHEEN ACROSS THE TITLE */}
            <div
              className={`absolute inset-0 pointer-events-none transition-transform duration-2000 ease-in-out ${
                bootPhase >= 11 ? 'translate-x-[200%]' : '-translate-x-[200%]'
              }`}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 25%, rgba(216, 180, 254, 0.8) 50%, rgba(255,255,255,0.95) 55%, rgba(139, 92, 246, 0.4) 65%, transparent 100%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>

          {/* PHASE 12: EVENT TAGLINE & METADATA */}
          <div
            className={`transition-all duration-1000 ease-out mt-5 sm:mt-7 flex flex-col items-center ${
              bootPhase >= 12
                ? 'opacity-100 translate-y-0 filter-none'
                : 'opacity-0 translate-y-5 blur-sm'
            }`}
          >
            <div className="font-editorial text-base sm:text-xl md:text-2xl font-light tracking-[0.24em] text-[#F7F5FF]/90 text-center px-4">
              {EVENT_CONFIG.tagline}
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4 font-display text-[9px] sm:text-[11px] tracking-[0.32em] text-[#A6A0B8]/80 uppercase">
              <span>{EVENT_CONFIG.dates}</span>
              <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
              <span>CHENNAI, INDIA</span>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Minimal, Unobtrusive Skip Hint (Discreet, disappears once title appears) */}
      <div 
        className={`absolute bottom-8 font-display text-[9px] sm:text-[10px] tracking-[0.32em] text-[#A6A0B8]/40 uppercase transition-all duration-500 hover:text-white ${
          bootPhase >= 1 && bootPhase < 8 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        [ Click or Space to Enter Directly ]
      </div>
    </div>
  );
}
