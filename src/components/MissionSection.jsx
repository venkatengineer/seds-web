import React from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * MISSION SECTION — QUIET SPACE SECTOR
 * 
 * Philosophy:
 * - Entering a quieter, deep region of space.
 * - Deep black background, subtle purple nebula falloff.
 * - One slow distant orbital geometry.
 * - Large typography: THE MISSION & WE EXPLORE WHAT COMES NEXT.
 * - Restrained, clean layout with thin hairline borders.
 */

export default function MissionSection({ onNavigate }) {
  return (
    <section 
      id="mission" 
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 z-20 overflow-hidden"
    >
      {/* Distant Slow-Moving Orbital Arc (Quiet, 140s slow rotation) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-20 -z-10">
        <svg className="w-full h-full animate-[spin_140s_linear_infinite]" viewBox="0 0 500 500">
          <ellipse
            cx="250"
            cy="250"
            rx="230"
            ry="130"
            fill="none"
            stroke="#6D28D9"
            strokeWidth="0.9"
            strokeDasharray="4 16"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="170"
            ry="230"
            fill="none"
            stroke="#4C1D95"
            strokeWidth="0.75"
            strokeDasharray="2 14"
          />
          <circle cx="250" cy="120" r="2.5" fill="#F7F5FF" opacity="0.8" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-dark-b pb-6 mb-12">
        <div>
          <span className="font-editorial text-sm tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            {SEDS_CONFIG.name}
          </span>
          <h2 className="font-mono-tech text-xs tracking-[0.3em] uppercase text-[#A6A0B8]">
            // THE MISSION & CHARTER
          </h2>
        </div>
        <div className="font-mono-tech text-xs tracking-[0.2em] text-[#C084FC] uppercase">
          RAJALAKSHMI ENGINEERING COLLEGE // SPACE DIVISION
        </div>
      </div>

      {/* Monumental Statement */}
      <div className="my-6 lg:my-10">
        <div className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F7F5FF] leading-[0.95]">
          <div>{EVENT_CONFIG.missionStatement[0]}</div>
          <div className="text-white/85 pl-4 sm:pl-16 lg:pl-24 flex items-center gap-4">
            <span>{EVENT_CONFIG.missionStatement[1]}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] opacity-90" />
          </div>
        </div>

        <p className="mt-8 max-w-2xl font-sans text-base sm:text-lg text-[#A6A0B8] font-light leading-relaxed">
          {SEDS_CONFIG.missionStatement} As part of the national SEDS network, our student division conducts empirical aerospace research, builds flight-ready avionics, and hosts <span className="text-[#F7F5FF] font-medium">{EVENT_CONFIG.name}</span> to accelerate space computational breakthroughs.
        </p>
      </div>

      {/* 4 Technical Divisions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
        {SEDS_CONFIG.pillars.map((pillar, idx) => (
          <div 
            key={idx}
            className="group relative p-6 rounded-2xl border border-white/[0.06] bg-[#07030F]/40 hover:border-[#8B5CF6]/40 transition-all duration-400 flex flex-col justify-between"
            data-interactive="true"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-tech text-xs tracking-[0.2em] text-[#8B5CF6]">
                  0{idx + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/15 group-hover:bg-[#8B5CF6] transition-colors duration-400" />
              </div>

              <h3 className="font-display text-base font-semibold tracking-wide text-[#F7F5FF] mb-2 group-hover:text-white transition-colors duration-300">
                {pillar.title}
              </h3>

              <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 hairline-dark-t flex items-center justify-between text-[10px] font-mono-tech text-[#A6A0B8]">
              <span>DIVISION 0{idx + 1}</span>
              <span className="text-[#C084FC]">ACTIVE</span>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Credentials Badge */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#07030F]/60 backdrop-blur-md p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-[#8B5CF6]/40 bg-[#32105F]/30 flex items-center justify-center text-[#C084FC]">
            <span className="font-editorial text-xs font-bold">REC</span>
          </div>
          <div>
            <div className="font-display text-sm text-[#F7F5FF] font-medium">
              Rajalakshmi Engineering College Space Division
            </div>
            <div className="font-mono-tech text-xs text-[#A6A0B8]">
              Affiliated with SEDS India & SEDS Global Space Network
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 font-mono-tech text-xs text-[#A6A0B8]">
          <span>FOUNDED {SEDS_CONFIG.founded}</span>
          <span className="text-white/20">|</span>
          <span className="text-[#8B5CF6]">ANNUAL HACKATHON SERIES</span>
        </div>
      </div>
    </section>
  );
}
