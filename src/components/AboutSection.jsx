import React from 'react';
import { ArrowUpRight, Sparkles, Cpu, Layers, Award, ShieldCheck, Clock } from 'lucide-react';
import { EVENT_CONFIG, SEDS_CONFIG } from '../config/event';

/**
 * ABOUT SEDHACKS '26 SECTION
 * Transcribed from: "SEDHACKS ’26 website content document_20261002_085041_0000.docx"
 * 
 * Content:
 * About SEDHACKS ’26
 * Where Ideas Take Shape
 * - Paragraph 1: SEDS REC presents SEDHACKS ’26...
 * - Paragraph 2: Participants can turn their ideas into practical solutions...
 * - Paragraph 3: The focus is not only on the idea, but on how effectively you can build...
 */

export default function AboutSection({ onOpenRegister, onNavigate }) {
  const about = EVENT_CONFIG.about;

  return (
    <section 
      id="about" 
      className="relative min-h-[70vh] w-full flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.12] pb-6 mb-12">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] font-semibold flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#C084FC]" />
              // ABOUT {EVENT_CONFIG.name}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/30 text-[#E2DEEC] font-display text-[11px] font-semibold tracking-wider uppercase">
              <Clock size={11} className="text-[#C084FC]" />
              LAST DATE TO REGISTER: 9 OCT 2026 // 18:00 IST
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-[#E2DEEC] font-display text-[11px] font-semibold tracking-wider uppercase">
              100% FREE ENTRY (₹0)
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            {about.subtitle.toUpperCase()}
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#E2DEEC] uppercase font-medium">
          {about.title.toUpperCase()}
        </div>
      </div>

      {/* Main Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto w-full">
        
        {/* Left Column: Editorial Paragraphs */}
        <div data-reveal className="lg:col-span-7 space-y-6">
          <p className="font-editorial text-xl sm:text-2xl text-white font-medium leading-snug">
            {about.lead}
          </p>

          <p className="font-sans text-base sm:text-lg text-[#E2DEEC] leading-relaxed font-normal">
            {about.p2}
          </p>

          <div className="p-6 rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-r from-[#4C1D95]/20 to-[#0A0614]/80 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
            <span className="font-display text-[10px] uppercase tracking-widest text-[#C084FC] block font-semibold mb-2">
              CORE EVALUATION PRINCIPLE
            </span>
            <p className="font-editorial text-lg sm:text-xl text-[#F7F5FF] italic font-semibold leading-snug">
              &ldquo;{about.p3}&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenRegister}
              className="px-7 py-3.5 rounded-full border border-[#8B5CF6] bg-[#8B5CF6]/30 hover:bg-[#8B5CF6]/50 text-white font-display text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
            >
              <span>REGISTER YOUR TEAM (FREE ₹0)</span>
              <ArrowUpRight size={14} />
            </button>

            <button
              onClick={() => onNavigate('tracks')}
              className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 text-[#E2DEEC] hover:text-white font-display text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer"
            >
              EXPLORE 5 DOMAINS
            </button>
          </div>
        </div>

        {/* Right Column: Key Takeaway Cards */}
        <div data-reveal-stagger className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="p-5 rounded-xl border border-white/[0.12] bg-[#07030F]/80 backdrop-blur-md space-y-1.5">
            <div className="flex items-center gap-2 text-[#C084FC] font-display text-xs tracking-wider uppercase font-semibold">
              <Award size={14} />
              <span>₹10,000 Cash Pool</span>
            </div>
            <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
              Merit grant rewards for winning student teams across all technical tracks.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#8B5CF6]/50 bg-[#160A2C]/85 backdrop-blur-md space-y-1.5 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
            <div className="flex items-center gap-2 text-white font-display text-xs tracking-wider uppercase font-bold">
              <Sparkles size={14} className="text-[#C084FC] animate-pulse" />
              <span>Top 2 Teams Win Aeroin Internships</span>
            </div>
            <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed font-normal">
              Direct aerospace industry exposure and internship opportunities through collaboration with Aeroin Space Tech (subject to selection process).
            </p>
          </div>

          <div className="p-5 rounded-xl border border-white/[0.12] bg-[#07030F]/80 backdrop-blur-md space-y-1.5">
            <div className="flex items-center gap-2 text-white font-display text-xs tracking-wider uppercase font-semibold">
              <ShieldCheck size={14} className="text-[#C084FC]" />
              <span>100% Free Registration (₹0)</span>
            </div>
            <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
              Zero participation fee. Host institution and SEDS REC charge ₹0 entry fee.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-white/[0.12] bg-[#07030F]/80 backdrop-blur-md space-y-1.5">
            <div className="flex items-center gap-2 text-[#C084FC] font-display text-xs tracking-wider uppercase font-semibold">
              <Cpu size={14} />
              <span>Hardware, Software & Sims</span>
            </div>
            <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
              Demonstrate working builds via microcontrollers, web apps, AI algorithms, or digital simulations.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
