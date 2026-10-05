import React from 'react';
import { ArrowDown, ArrowUpRight, Calendar, Clock, Briefcase, Sparkles, Download } from 'lucide-react';
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

  // Reveal only after the intro overlay has cleared (it exits in ~500ms from phase 13),
  // so the intro title and hero headline are never on screen together
  const isRevealing = bootPhase >= 13;
  const isFullyLive = bootPhase >= 13;

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
        className={`flex items-center justify-between border-b border-white/[0.08] pb-3 text-[#E2DEEC] font-display text-[11px] tracking-[0.2em] uppercase transition-all duration-1000 ease-out ${
          isFullyLive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
          <span className="text-[#F7F5FF] font-medium tracking-widest text-[11px]">
            INTRA-COLLEGE SPACE HACKATHON // REC ONLY
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-[#C084FC] font-semibold tracking-wider text-[11px]">
            <Sparkles size={11} className="text-[#C084FC]" />
            TOP 2 TEAMS GET AEROIN INTERNSHIPS
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px]">
          <span className="text-[#E2DEEC] font-medium">
            CLOSES: {EVENT_CONFIG.registrationDeadline}
          </span>
          <span className="text-white/20">/</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/15 bg-white/[0.04] text-[#E2DEEC] font-semibold tracking-[0.16em]">
            <span>100% FREE (₹0)</span>
          </span>
        </div>
      </div>

      {/* Main Protected Editorial Zone (Left 50% of screen) */}
      <div 
        data-hero-scroll
        className="w-full lg:w-[50%] xl:w-[46%] my-auto py-6 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        }}
      >
        {/* Brand Hierarchy Stack */}
        <div className="mb-6 space-y-3">
          <div 
            className="flex flex-wrap items-center gap-2 font-display text-xs tracking-[0.26em] text-[#C084FC] uppercase font-bold transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(20px)',
              filter: isRevealing ? 'blur(0)' : 'blur(8px)',
              transitionDelay: '450ms',
            }}
          >
            <span className="text-white font-extrabold text-sm sm:text-base tracking-[0.2em]">{EVENT_CONFIG.name}</span>
            <span className="text-white/30">•</span>
            <span className="text-[#E2DEEC] font-medium text-xs tracking-[0.18em]">
              24-HR INNOVATION SPRINT
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#C084FC] font-semibold text-xs tracking-[0.16em]">
              REC STUDENTS ONLY
            </span>
          </div>

          <div 
            className="flex flex-wrap items-center gap-2 pt-0.5 transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(20px)',
              filter: isRevealing ? 'blur(0)' : 'blur(8px)',
              transitionDelay: '550ms',
            }}
          >
            {/* ELEGANT, PROMINENT INTERNSHIP OPPORTUNITY PILL */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/60 bg-[#1A0B33]/85 text-white font-display text-xs uppercase tracking-[0.16em] font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-sm">
              <Briefcase size={12} className="text-[#C084FC]" />
              <span>TOP 2 TEAMS WIN AEROIN INTERNSHIPS</span>
            </span>

            {/* Hackathon Date Pill */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[#E2DEEC] font-display text-xs uppercase tracking-[0.16em] font-medium backdrop-blur-sm">
              <Calendar size={12} className="text-[#C084FC]" />
              <span>{EVENT_CONFIG.dates}</span>
            </span>
          </div>
        </div>

        {/* PRIMARY HEADLINE: Staggered Stately Reveal (600–900ms per line) */}
        <h1 className="font-editorial text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] font-bold tracking-tight leading-[0.94] text-[#F7F5FF]">
          {/* Line 1: FROM IDEAS */}
          <div 
            className="transition-all duration-800 ease-out"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(30px)',
              filter: isRevealing ? 'blur(0)' : 'blur(10px)',
              transitionDelay: '650ms',
            }}
          >
            {EVENT_CONFIG.heroHeadline[0]}
          </div>

          {/* Line 2: TO ORBIT. */}
          <div 
            className="text-white transition-all duration-800 ease-out flex items-baseline gap-3"
            style={{
              opacity: isRevealing ? 1 : 0,
              transform: isRevealing ? 'translateY(0)' : 'translateY(30px)',
              filter: isRevealing ? 'blur(0)' : 'blur(10px)',
              transitionDelay: '780ms',
            }}
          >
            <span>{EVENT_CONFIG.heroHeadline[1]}</span>
            <span className="inline-block w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#8B5CF6] mb-1 sm:mb-2 opacity-90 shadow-[0_0_15px_#8B5CF6]" />
          </div>
        </h1>

        {/* Supporting Narrative: Bright, high-contrast, perfectly legible text */}
        <p 
          className="mt-6 sm:mt-8 max-w-xl font-sans text-sm sm:text-base text-[#E2DEEC] leading-relaxed font-normal transition-all duration-800 ease-out"
          style={{
            opacity: isRevealing ? 1 : 0,
            transform: isRevealing ? 'translateY(0)' : 'translateY(25px)',
            filter: isRevealing ? 'blur(0)' : 'blur(6px)',
            transitionDelay: '920ms',
          }}
        >
          {EVENT_CONFIG.manifesto}
        </p>

        {/* Action Buttons & Clean Directives */}
        <div 
          className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 transition-all duration-800 ease-out"
          style={{
            opacity: isRevealing ? 1 : 0,
            transform: isRevealing ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '1020ms',
          }}
        >
          <button
            onClick={onOpenRegister}
            className="group relative overflow-hidden px-8 py-4 rounded-full border border-[#8B5CF6]/50 bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 transition-all duration-300 ease-out focus:outline-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <div className="relative flex items-center gap-2">
              <span>Register for {EVENT_CONFIG.name} (Free)</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('tracks')}
            className="group flex items-center gap-2.5 px-6 py-4 rounded-full border border-white/15 hover:border-[#8B5CF6]/60 bg-white/[0.04] hover:bg-[#8B5CF6]/20 font-display text-xs uppercase tracking-[0.18em] text-[#F7F5FF] hover:text-white transition-all duration-200 focus:outline-none shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span>Explore 5 Tracks</span>
            <ArrowDown size={13} className="text-[#C084FC] group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href={EVENT_CONFIG.pptTemplateUrl}
            download={EVENT_CONFIG.pptTemplateFilename}
            className="group flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 hover:border-[#C084FC] bg-[#16092E]/80 hover:bg-[#2A104E] font-display text-xs uppercase tracking-[0.16em] text-[#F7F5FF] hover:text-white transition-all duration-200 focus:outline-none shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] cursor-pointer"
            title="Download official presentation deck template (.pptx)"
          >
            <Download size={14} className="text-[#C084FC] group-hover:translate-y-0.5 transition-transform" />
            <span>PPT Template</span>
          </a>

          {/* Clean, Restrained Directives Bar: Dual-tone readable and cohesive */}
          <div className="w-full flex flex-wrap items-center gap-2.5 pt-2 font-mono text-[11px] sm:text-xs text-[#E2DEEC]">
            <span className="inline-flex items-center gap-1.5 text-white font-semibold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span>100% Free of Cost (₹0 Entry Fee)</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[#F7F5FF] font-medium">Only 4 Members</span>
            <span className="text-white/30">•</span>
            <span className="inline-flex items-center gap-1 text-[#C084FC] font-semibold tracking-wider uppercase">
              <Clock size={11} className="text-[#C084FC]" />
              <span>Last Date: {EVENT_CONFIG.registrationDeadline} (18:00 IST)</span>
            </span>
          </div>
        </div>

        {/* Tracks Highlighting Strip: Clean, dark, and elegant */}
        <div
          className="mt-8 pt-5 border-t border-white/[0.1] transition-all duration-800 ease-out"
          style={{
            opacity: isRevealing ? 1 : 0,
            transform: isRevealing ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '1120ms',
          }}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="font-display text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C084FC] font-bold flex items-center gap-1.5">
              <span>// 5 HACKATHON TRACKS</span>
            </span>
            <span className="font-mono text-[11px] text-[#E2DEEC]">100% FREE (₹0) • CLOSES {EVENT_CONFIG.registrationDeadline}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {EVENT_CONFIG.tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  const card = document.getElementById(`track-card-${track.id}`);
                  if (card) {
                    onNavigate(`track-card-${track.id}`);
                  } else {
                    onNavigate('tracks');
                  }
                }}
                className="group px-3 py-1.5 rounded-lg border border-white/10 bg-[#0B0616]/90 hover:border-[#8B5CF6]/60 hover:bg-[#4C1D95]/25 text-left text-xs font-sans text-white transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span className="font-editorial text-[#8B5CF6] font-bold text-xs shrink-0">
                  {track.number}
                </span>
                <span className="font-semibold text-[11px] text-[#F7F5FF] tracking-wide">
                  {track.title}
                </span>
                <ArrowDown size={10} className="text-[#C084FC] opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Architecture Baseline */}
      <div 
        className={`border-t border-white/[0.08] pt-4 flex flex-wrap items-center justify-between gap-4 text-[#E2DEEC] font-display text-[11px] tracking-[0.18em] uppercase transition-all duration-1000 ease-out ${
          isFullyLive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 text-[#F7F5FF] font-semibold tracking-[0.16em] shadow-[0_0_12px_rgba(139,92,246,0.25)]">
            <Calendar size={12} className="text-[#C084FC]" />
            <span>{EVENT_CONFIG.dates}</span>
          </span>
          <span className="text-white/30">•</span>
          <span className="text-white font-medium">CHENNAI, INDIA</span>
          <span className="text-white/30">•</span>
          <span className="text-[#C084FC] font-semibold">{EVENT_CONFIG.prizeSummary} PRIZE POOL</span>
          <span className="text-white/30">•</span>
          <span className="text-[#F7F5FF] font-medium">AEROIN INTERNSHIPS (TOP 2)</span>
          <span className="text-white/30">•</span>
          <span className="text-white font-medium">100% FREE (₹0)</span>
        </div>

        <button 
          onClick={() => onNavigate('tracks')}
          className="flex items-center gap-2 text-[#E2DEEC] hover:text-[#FFFFFF] transition-colors focus:outline-none font-medium"
        >
          <span>EXPLORE HACKATHON</span>
          <ArrowDown size={11} className="text-[#8B5CF6]" />
        </button>
      </div>
    </section>
  );
}
