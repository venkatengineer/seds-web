import React from 'react';
import { ArrowUpRight, Award, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * REWARD & INCENTIVES SECTION — "WHY PARTICIPATE"
 * 
 * Based directly on SEDS REC Hackathon 2026 Content:
 * 1. ₹10,000 Prize Pool: Compete, innovate and get recognised for your solution.
 * 2. Internship Opportunities: Top 3 teams receive internship opportunities through
 *    industry collaboration with Aeroin Space Tech (subject to selection process).
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.12] pb-6 mb-16">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] font-semibold">
              // {EVENT_CONFIG.name} INCENTIVES
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/50 bg-amber-500/10 text-amber-300 font-display text-[11px] font-bold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              LAST DATE TO REGISTER: 10 OCT 2026
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            WHY PARTICIPATE.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#E2DEEC] uppercase font-medium">
          PRIZES × INDUSTRY INTERNSHIPS
        </div>
      </div>

      {/* Dual Core Monuments: Prize Pool + Internship Opportunities */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto w-full transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${depthX * 0.4}px, ${depthY * 0.4}px, 0)`,
        }}
      >
        {/* Monument 1: ₹10,000 Prize Pool */}
        <div className="lg:col-span-6 relative p-8 sm:p-12 rounded-3xl border border-white/[0.16] bg-[#07030F]/80 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-[#8B5CF6]/60 transition-all duration-400 shadow-[0_0_30px_rgba(76,29,149,0.2)]">
          
          {/* Volumetric Purple Ambient Light */}
          <div 
            className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full pointer-events-none -z-10 opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(76, 29, 149, 0.1) 60%, transparent 80%)',
              filter: 'blur(70px)',
            }}
          />

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 font-display text-[11px] tracking-[0.2em] text-[#E2DEEC] uppercase font-semibold">
                <Award size={13} className="text-[#C084FC]" />
                <span>CAPITAL POOL</span>
              </span>
              <span className="font-display text-xs text-[#E2DEEC] tracking-widest uppercase font-mono-tech">
                01 // REWARD
              </span>
            </div>

            <div 
              className="font-editorial text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#F7F5FF] leading-none my-4"
              style={{
                textShadow: '0 0 45px rgba(139, 92, 246, 0.35)',
              }}
            >
              {EVENT_CONFIG.prizePool}
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-medium tracking-[0.16em] uppercase text-[#F7F5FF] mt-3">
              CASH PRIZE POOL
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#E2DEEC] font-normal mt-4 leading-relaxed">
              Compete, innovate and get recognised for your solution across space applications, defence, medical biology, autonomous tech, and open innovation.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-white/[0.12] flex items-center justify-between text-xs font-display text-[#E2DEEC] font-medium">
            <span>Official SEDS REC Merit Grants</span>
            <span className="text-white/60">•</span>
            <span>Award Certificates</span>
          </div>
        </div>

        {/* Monument 2: Internship Opportunities at Aeroin Space Tech */}
        <div className="lg:col-span-6 relative p-8 sm:p-12 rounded-3xl border border-white/[0.16] bg-[#07030F]/80 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-[#8B5CF6]/60 transition-all duration-400 shadow-[0_0_30px_rgba(76,29,149,0.2)]">
          
          {/* Volumetric Purple Ambient Light */}
          <div 
            className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none -z-10 opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(50, 16, 95, 0.1) 60%, transparent 80%)',
              filter: 'blur(70px)',
            }}
          />

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 font-display text-[11px] tracking-[0.2em] text-[#E2DEEC] uppercase font-semibold">
                <Briefcase size={13} className="text-[#C084FC]" />
                <span>CAREER LAUNCH</span>
              </span>
              <span className="font-display text-xs text-[#E2DEEC] tracking-widest uppercase font-mono-tech">
                02 // INTERNSHIPS
              </span>
            </div>

            <div 
              className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F5FF] leading-none my-4"
              style={{
                textShadow: '0 0 45px rgba(168, 85, 247, 0.35)',
              }}
            >
              TOP 3 TEAMS
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-medium tracking-[0.16em] uppercase text-[#F7F5FF] mt-3">
              AEROIN SPACE TECH INTERNSHIPS
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#E2DEEC] font-normal mt-4 leading-relaxed">
              {EVENT_CONFIG.internshipDetails}
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-white/[0.12] flex items-center justify-between text-xs font-display text-[#E2DEEC] font-medium">
            <span>Industry Collaboration</span>
            <span className="text-white/60">•</span>
            <span>Subject to Selection Process</span>
          </div>
        </div>
      </div>

      {/* Additional Value Pillars */}
      <div className="max-w-6xl mx-auto w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/[0.12] bg-[#07030F]/60 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-[#A855F7] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#F7F5FF] font-semibold">
              Industry Perspectives
            </h4>
            <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
              Direct exposure to aerospace industry mentors and commercial space engineering practices.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/[0.12] bg-[#07030F]/60 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-[#A855F7] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#F7F5FF] font-semibold">
              SEDS Community Network
            </h4>
            <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
              Platform to collaborate across multidisciplinary software, hardware, and space research domains.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/[0.12] bg-[#07030F]/60 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-[#A855F7] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#F7F5FF] font-semibold">
              Autonomous Host Facilities
            </h4>
            <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
              Organized at Rajalakshmi Engineering College, Chennai with state-of-the-art labs and testbeds.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Register with Deadline Warning */}
      <div className="max-w-6xl mx-auto w-full mt-10 p-6 rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] flex flex-wrap items-center justify-between gap-4 text-xs font-display">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-amber-500/50 bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            CLOSES: {EVENT_CONFIG.registrationDeadline} // 23:59 IST
          </span>
          <span className="text-[#E2DEEC] font-medium">
            Cash rewards & industry internships • <strong className="text-emerald-300 font-bold">100% Free Registration (₹0 Fee)</strong> • Strictly 4-Member Teams
          </span>
        </div>

        <button
          onClick={onOpenRegister}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#8B5CF6] bg-[#6D28D9]/40 hover:bg-[#6D28D9] text-[#F7F5FF] text-xs font-display uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] cursor-pointer"
        >
          <span>Register for SEDHACKS '26 (Free)</span>
          <ArrowUpRight size={14} className="text-[#F7F5FF]" />
        </button>
      </div>
    </section>
  );
}
