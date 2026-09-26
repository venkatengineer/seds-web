import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG, PARTNERS_CONFIG } from '../config/event';

/**
 * EDITORIAL PARTNERS & INSTITUTIONAL LOGO WALL
 * 
 * Philosophy:
 * - NO fake constellation of random dots.
 * - NO fake companies or fabricated GPU claims.
 * - Dignified editorial logo wall with clear hierarchy and generous negative space.
 * - Real academic and institutional partners: REC, REC Aerospace Dept, SEDS India.
 * - Clearly marked honest callout for event sponsor inquiries.
 */

export default function SponsorsWall() {
  return (
    <section 
      id="partners" 
      className="relative min-h-[80vh] w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // INSTITUTIONAL BACKING & NETWORK
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            ACADEMIC & CHAPTER ALLIANCE.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          {SEDS_CONFIG.name} × {EVENT_CONFIG.name}
        </div>
      </div>

      {/* Editorial Logo Wall Grid by Categories */}
      <div className="space-y-16">
        {PARTNERS_CONFIG.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
              <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A6A0B8] font-semibold">
                {group.category}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {group.items.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 rounded-2xl border border-white/[0.08] bg-[#07030F]/40 hover:bg-[#07030F]/80 hover:border-[#8B5CF6]/40 transition-all duration-300 flex flex-col justify-between min-h-[140px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-editorial text-2xl font-bold text-[#F7F5FF] group-hover:text-white transition-colors">
                        {item.name}
                      </h3>
                      <div className="font-display text-xs text-[#8B5CF6] uppercase tracking-wider mt-1">
                        {item.type} • {item.location}
                      </div>
                    </div>

                    <span className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#8B5CF6] transition-colors" />
                  </div>

                  <p className="font-sans text-xs text-[#A6A0B8] font-light leading-relaxed mt-4 pt-3 border-t border-white/[0.06]">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Transparent & Honest Sponsor Callout */}
        <div className="p-8 sm:p-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.01] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="font-display text-xs uppercase tracking-[0.2em] text-[#C084FC] font-semibold">
              // PARTNER WITH ORBITAL 26
            </div>
            <h4 className="font-editorial text-2xl font-bold text-[#F7F5FF]">
              Support Student Space Engineering.
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#A6A0B8] font-light leading-relaxed">
              We welcome aerospace industry organizations, software tool providers, and research laboratories to sponsor challenges, mentor teams, or offer specialized tooling licenses to student finalists.
            </p>
          </div>

          <a
            href="mailto:partnerships@sedsrec.in"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/20 hover:bg-[#6D28D9]/40 text-[#F7F5FF] text-xs font-display uppercase tracking-widest font-semibold transition-all shrink-0"
          >
            <span>Inquire for Sponsorship</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
