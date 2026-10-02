import React from 'react';
import { ArrowUpRight, Sparkles, Briefcase } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG, PARTNERS_CONFIG } from '../config/event';

/**
 * INDUSTRY COLLABORATION & ALLIANCE WALL
 * Transcribed from: "SEDHACKS ’26 website content document_20261002_085041_0000.docx"
 * 
 * Title: Industry Collaboration
 * Subtitle: Built With Industry. Driven By Students.
 */

export default function SponsorsWall() {
  return (
    <section 
      id="partners" 
      className="relative min-h-[80vh] w-full flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.12] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] block mb-1 font-semibold flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#C084FC]" />
            // INDUSTRY COLLABORATION
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            BUILT WITH INDUSTRY. DRIVEN BY STUDENTS.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#E2DEEC] uppercase font-medium">
          AEROIN SPACE TECH × {SEDS_CONFIG.name}
        </div>
      </div>

      {/* Featured Industry Collaboration Hero Banner (From Document) */}
      <div data-reveal="scale" className="mb-14 p-8 sm:p-10 rounded-3xl border border-[#8B5CF6]/40 bg-gradient-to-br from-[#1b0a33] via-[#090314] to-[#04010a] shadow-[0_0_40px_rgba(139,92,246,0.2)]">
        <div className="flex items-center gap-2 font-display text-xs tracking-[0.25em] uppercase text-[#C084FC] font-bold mb-3">
          <Briefcase size={14} />
          <span>OFFICIAL INDUSTRY PARTNER // AEROIN SPACE TECH</span>
        </div>

        <p className="font-editorial text-xl sm:text-2xl text-white font-medium leading-relaxed mb-4">
          SEDS REC is collaborating with Aeroin Space Tech to bring industry exposure into SEDHACKS ’26.
        </p>

        <p className="font-sans text-sm sm:text-base text-[#E2DEEC] leading-relaxed mb-6">
          Through this collaboration, participants get an opportunity to present their ideas in an environment that connects student innovation with industry perspectives.
        </p>

        <div className="pt-4 border-t border-white/[0.12] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-display text-xs uppercase tracking-widest text-[#C084FC] font-bold block">
              AND THERE IS MORE:
            </span>
            <p className="font-sans text-sm text-[#F7F5FF] font-semibold mt-0.5">
              Top 2 teams will receive internship opportunities through Aeroin Space Tech, subject to the applicable selection process.
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full border border-purple-500/50 bg-purple-950/40 text-purple-200 text-xs font-display uppercase tracking-wider shrink-0 font-semibold">
            TOP 2 TEAMS ELIGIBLE
          </span>
        </div>
      </div>

      {/* Editorial Logo Wall Grid by Categories */}
      <div className="space-y-16">
        {PARTNERS_CONFIG.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" />
              <span className="font-display text-xs tracking-[0.25em] uppercase text-[#E2DEEC] font-semibold">
                {group.category}
              </span>
            </div>

            <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {group.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative p-8 rounded-2xl border border-white/[0.12] bg-[#07030F]/70 hover:bg-[#07030F]/90 hover:border-[#8B5CF6]/60 transition-all duration-300 flex flex-col justify-between min-h-[140px] shadow-[0_0_20px_rgba(76,29,149,0.15)] ${
                    group.items.length === 1 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#F7F5FF] group-hover:text-white transition-colors">
                        {item.name}
                      </h3>
                      <div className="font-display text-xs text-[#C084FC] uppercase tracking-wider mt-1 font-semibold">
                        {item.type} • {item.location}
                      </div>
                    </div>

                    <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#A855F7] transition-colors" />
                  </div>

                  <p className="font-sans text-xs text-[#E2DEEC] font-normal leading-relaxed mt-4 pt-3 border-t border-white/[0.12]">
                    {item.desc || item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
