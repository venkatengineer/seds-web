import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * EDITORIAL MISSION SECTION
 * 
 * Philosophy:
 * - NO four cards!
 * - Editorial storytelling layout with generous negative space.
 * - Monumental statement:
 *   "SPACE IS NOT JUST TO BE OBSERVED. IT IS TO BE BUILT."
 * - Minimal open UI with clean architectural hairline dividers.
 * - 4 Real Categories: Projects, Research, Outreach, Leadership.
 */

export default function MissionSection({ onNavigate }) {
  return (
    <section 
      id="mission" 
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            {SEDS_CONFIG.name} // CHAPTER CHARTER
          </span>
          <h2 className="font-display text-xs tracking-[0.2em] uppercase text-[#A6A0B8]">
            {SEDS_CONFIG.institution} • {SEDS_CONFIG.department}
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#C084FC] uppercase">
          SEDS INDIA OFFICIAL CHAPTER // DIVISION {SEDS_CONFIG.founded}
        </div>
      </div>

      {/* Monumental Statement */}
      <div className="max-w-5xl my-4">
        <h3 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-[#F7F5FF] leading-[0.96]">
          <div>SPACE IS NOT</div>
          <div className="text-white/80">JUST TO BE OBSERVED.</div>
          <div className="text-[#8B5CF6] flex items-baseline gap-4">
            <span>IT IS TO BE BUILT.</span>
            <span className="inline-block w-3 h-3 rounded-full bg-[#8B5CF6] opacity-80" />
          </div>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 pt-8 border-t border-white/[0.06]">
          <div className="lg:col-span-7">
            <p className="font-sans text-base sm:text-lg text-[#F7F5FF]/90 font-light leading-relaxed">
              {SEDS_CONFIG.missionStatement}
            </p>
            <p className="font-sans text-sm sm:text-base text-[#A6A0B8] font-light leading-relaxed mt-4">
              As an official university division of the global SEDS network, our student engineers construct sub-orbital rocket avionics, CubeSat payloads, autonomous planetary rover testbeds, and astrodynamic flight code. We organize <strong className="text-[#F7F5FF]">{EVENT_CONFIG.name}</strong> to bring ambitious student builders together for 48 hours of pure engineering.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between border-l border-white/[0.06] pl-0 lg:pl-8 space-y-6">
            <div className="space-y-2">
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">
                ORGANIZATIONAL IDENTITY
              </span>
              <div className="font-editorial text-xl font-bold text-[#F7F5FF]">
                Students for the Exploration and Development of Space
              </div>
              <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed">
                Operating autonomously at {SEDS_CONFIG.institution}, bridging academic aerospace education and real flight hardware execution.
              </p>
            </div>

            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-[#F7F5FF] hover:text-[#C084FC] transition-colors"
            >
              <span>Explore Student Hardware ↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Actual Categories: Projects, Research, Outreach, Leadership (Editorial Rows, NOT CARDS) */}
      <div className="mt-20 pt-8 border-t border-white/[0.08]">
        <div className="font-display text-xs tracking-[0.25em] uppercase text-[#A6A0B8] mb-8">
          SEDS REC CORE OPERATIONAL PILLARS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SEDS_CONFIG.pillars.map((pillar, idx) => (
            <div key={idx} className="group space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-display text-xs tracking-[0.2em] text-[#8B5CF6] font-semibold">
                  0{idx + 1} // {pillar.tag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#8B5CF6] transition-colors" />
              </div>

              <h4 className="font-display text-lg font-bold tracking-tight text-[#F7F5FF] group-hover:text-[#C084FC] transition-colors">
                {pillar.title}
              </h4>

              <p className="font-sans text-xs text-[#A6A0B8] font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
