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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // {EVENT_CONFIG.name} INCENTIVES
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            WHY PARTICIPATE.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#C084FC] uppercase">
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
        <div className="lg:col-span-6 relative p-8 sm:p-12 rounded-3xl border border-white/[0.12] bg-[#07030F]/70 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-[#8B5CF6]/50 transition-all duration-400">
          
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/20 font-display text-[11px] tracking-[0.2em] text-[#C084FC] uppercase font-semibold">
                <Award size={13} />
                <span>CAPITAL POOL</span>
              </span>
              <span className="font-display text-xs text-[#A6A0B8] tracking-widest uppercase">
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

            <h3 className="font-display text-xl sm:text-2xl font-light tracking-[0.16em] uppercase text-[#F7F5FF] mt-3">
              CASH PRIZE POOL
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#A6A0B8] font-light mt-4 leading-relaxed">
              Compete, innovate and get recognised for your solution across space applications, defence, medical biology, autonomous tech, and open innovation.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between text-xs font-display text-[#C084FC]">
            <span>Official SEDS REC Merit Grants</span>
            <span className="text-white/40">•</span>
            <span>Award Certificates</span>
          </div>
        </div>

        {/* Monument 2: Internship Opportunities at Aeroin Space Tech */}
        <div className="lg:col-span-6 relative p-8 sm:p-12 rounded-3xl border border-white/[0.12] bg-[#07030F]/70 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-[#8B5CF6]/50 transition-all duration-400">
          
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/20 font-display text-[11px] tracking-[0.2em] text-[#C084FC] uppercase font-semibold">
                <Briefcase size={13} />
                <span>CAREER LAUNCH</span>
              </span>
              <span className="font-display text-xs text-[#A6A0B8] tracking-widest uppercase">
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

            <h3 className="font-display text-xl sm:text-2xl font-light tracking-[0.16em] uppercase text-[#F7F5FF] mt-3">
              AEROIN SPACE TECH INTERNSHIPS
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#A6A0B8] font-light mt-4 leading-relaxed">
              {EVENT_CONFIG.internshipDetails}
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between text-xs font-display text-[#C084FC]">
            <span>Industry Collaboration</span>
            <span className="text-white/40">•</span>
            <span>Subject to Selection Process</span>
          </div>
        </div>
      </div>

      {/* Additional Value Pillars */}
      <div className="max-w-6xl mx-auto w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/[0.06] bg-[#07030F]/40 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#F7F5FF] font-semibold">
              Industry Perspectives
            </h4>
            <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed">
              Direct exposure to aerospace industry mentors and commercial space engineering practices.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/[0.06] bg-[#07030F]/40 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#F7F5FF] font-semibold">
              SEDS Community Network
            </h4>
            <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed">
              Platform to collaborate across multidisciplinary software, hardware, and space research domains.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/[0.06] bg-[#07030F]/40 flex items-start gap-3">
          <CheckCircle2 size={16} className="text-[#8B5CF6] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-display text-xs uppercase tracking-wider text-[#F7F5FF] font-semibold">
              Autonomous Host Facilities
            </h4>
            <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed">
              Organized at Rajalakshmi Engineering College, Chennai with state-of-the-art labs and testbeds.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Register */}
      <div className="max-w-6xl mx-auto w-full mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-display text-[#A6A0B8]">
        <div className="flex items-center gap-2">
          <span className="text-[#8B5CF6] font-semibold">SEDHACKS '26 INCENTIVES:</span>
          <span>Cash rewards & industry internships for top student innovators</span>
        </div>

        <button
          onClick={onOpenRegister}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 hover:bg-[#6D28D9]/50 text-[#F7F5FF] text-xs font-display uppercase tracking-wider font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <span>Register for SEDHACKS '26</span>
          <ArrowUpRight size={14} className="text-[#C084FC]" />
        </button>
      </div>
    </section>
  );
}
