import React from 'react';
import { ArrowUpRight, Award, Briefcase, Sparkles, CheckCircle2, Hammer, Users, Lightbulb, FileCheck } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * REWARD & INCENTIVES SECTION — "WHY PARTICIPATE?"
 * Transcribed from: "SEDHACKS ’26 website content document_20261002_085041_0000.docx"
 * 
 * Title: Why Participate?
 * Subtitle: What You Take Away
 * 6 Takeaways:
 * 1. Build Something Real
 * 2. Compete & Get Recognised (₹10,000+ Prize Pool)
 * 3. Top 2 Teams — Internship Opportunities (Aeroin Space Tech)
 * 4. Learn Beyond the Classroom
 * 5. Get Industry Exposure
 * 6. Earn Your Certificate
 */

const TAKEAWAY_ICONS = {
  "01": Hammer,
  "02": Award,
  "03": Briefcase,
  "04": Users,
  "05": Lightbulb,
  "06": FileCheck,
};

export default function PrizesSection({ onOpenRegister, mousePos = { x: 0.5, y: 0.5 } }) {
  const depthX = (mousePos.x - 0.5) * 6;
  const depthY = (mousePos.y - 0.5) * 5;

  return (
    <section 
      id="prizes" 
      className="relative min-h-screen w-full flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.12] pb-6 mb-16">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#C084FC]" />
              // WHAT YOU TAKE AWAY
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/30 text-[#E2DEEC] font-display text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              LAST DATE TO REGISTER: 9 OCT 2026 // 11:59 PM IST
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            WHY PARTICIPATE?
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#E2DEEC] uppercase font-medium">
          PRIZES × INTERNSHIPS × RECOGNITION
        </div>
      </div>

      {/* Dual Core Monuments: Prize Pool + Internship Opportunities */}
      <div data-reveal-stagger 
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto w-full transition-transform duration-500 ease-out mb-16"
        style={{
          transform: `translate3d(${depthX * 0.4}px, ${depthY * 0.4}px, 0)`,
        }}
      >
        {/* Monument 1: ₹10,000+ Prize Pool */}
        <div className="lg:col-span-6 relative p-8 sm:p-12 rounded-3xl border border-white/[0.16] bg-[#07030F]/90 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-[#8B5CF6]/60 transition-all duration-400 shadow-[0_0_30px_rgba(76,29,149,0.2)]">
          
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
              Compete, innovate and get recognised for your solution. Showcase your work to industry professionals across all five technical domains.
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-white/[0.12] flex items-center justify-between text-xs font-display text-[#E2DEEC] font-medium">
            <span>Merit Grants for Top Teams</span>
            <span className="text-white/60">•</span>
            <span>Official Certificates</span>
          </div>
        </div>

        {/* Monument 2: Internship Opportunities at Aeroin Space Tech */}
        <div className="lg:col-span-6 relative p-8 sm:p-12 rounded-3xl border border-[#8B5CF6]/40 bg-[#0B0618]/90 backdrop-blur-xl flex flex-col justify-between overflow-hidden group hover:border-[#8B5CF6]/80 transition-all duration-400 shadow-[0_0_35px_rgba(139,92,246,0.25)]">
          
          {/* Volumetric Purple Ambient Light */}
          <div 
            className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none -z-10 opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(76, 29, 149, 0.12) 50%, transparent 80%)',
              filter: 'blur(75px)',
            }}
          />

          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 font-display text-[11px] tracking-[0.2em] text-[#F7F5FF] uppercase font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Briefcase size={14} className="text-[#C084FC]" />
                <span>EXCLUSIVE CAREER LAUNCHPAD</span>
              </span>
              <span className="font-display text-xs text-[#C084FC] tracking-widest uppercase font-mono-tech">
                02 // INTERNSHIPS
              </span>
            </div>

            <div 
              className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none my-4"
              style={{
                textShadow: '0 0 45px rgba(168, 85, 247, 0.4)',
              }}
            >
              TOP 2 TEAMS
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase text-[#F7F5FF] mt-3">
              AEROIN SPACE TECH INTERNSHIPS
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#E2DEEC] font-normal mt-4 leading-relaxed">
              {EVENT_CONFIG.internshipDetails}
            </p>
          </div>

          <div className="pt-8 mt-8 border-t border-white/[0.12] flex items-center justify-between text-xs font-display text-[#E2DEEC] font-medium">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Sparkles size={12} className="text-[#C084FC]" />
              Direct Aerospace Industry Integration
            </span>
            <span className="text-white/40">•</span>
            <span>Subject to Selection Process</span>
          </div>
        </div>
      </div>

      {/* 6 Key Takeaways Grid from Document */}
      <div className="max-w-6xl mx-auto w-full">
        <div data-reveal className="mb-6 flex items-center justify-between">
          <span className="font-display text-xs tracking-[0.2em] uppercase text-[#C084FC] font-semibold">
            // ALL PARTICIPANT TAKEAWAYS
          </span>
          <span className="font-display text-xs text-[#E2DEEC]">
            6 Core Pillars of Value
          </span>
        </div>

        <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_CONFIG.whyParticipate.map((item) => {
            const Icon = TAKEAWAY_ICONS[item.num] || CheckCircle2;
            return (
              <div 
                key={item.num}
                className="p-6 rounded-2xl border border-white/[0.12] bg-[#07030F]/70 backdrop-blur-md flex flex-col justify-between group hover:border-[#8B5CF6]/50 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#C084FC] group-hover:text-white group-hover:border-[#8B5CF6]/40 transition-colors">
                      <Icon size={16} />
                    </span>
                    <span className="font-mono-tech text-xs tracking-wider text-[#A855F7] font-bold">
                      {item.num}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-display uppercase tracking-widest text-[#A855F7] font-semibold mb-1">
                    {item.tag}
                  </span>

                  <h4 className="font-display text-lg font-bold text-white group-hover:text-[#C084FC] transition-colors mb-2">
                    {item.title}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-[#E2DEEC] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {item.highlight && (
                  <div className="mt-4 pt-3 border-t border-white/[0.08] text-xs font-mono text-[#C084FC]">
                    {item.highlight}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
