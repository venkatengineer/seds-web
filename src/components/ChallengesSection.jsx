import React, { useState } from 'react';
import { 
  Shield, 
  Sprout, 
  Cpu, 
  Recycle, 
  Lightbulb, 
  ArrowUpRight, 
  Layers
} from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * OFFICIAL HACKATHON TRACKS SECTION
 * 
 * Replaces all placeholder problem statements with the exact 5 official tracks:
 * 01. Space Applications & Defence Technology
 * 02. Medical, Food & Agriculture in Space
 * 03. Autonomous & Communication Technology
 * 04. Sustainability in Space
 * 05. Miscellaneous / Open Innovation
 * 
 * Layout & Alignment Architecture:
 * - 6-column symmetrical desktop grid (3 cards top row, 2 cards centered bottom row).
 * - Identical card widths across all 5 tracks (33.3% each).
 * - Exact vertical alignment baselines for Title, Subtitle, Description, Domain Badges, and CTA.
 * - Interactive filter bar to spotlight specific tracks or view all 5 simultaneously.
 */

const TRACK_ICONS = {
  'space-defence': Shield,
  'medical-bio': Sprout,
  'autonomous-comms': Cpu,
  'sustainability': Recycle,
  'open-innovation': Lightbulb,
};

const TRACK_THEMES = {
  'space-defence': {
    accent: '#8B5CF6',
    border: 'border-[#8B5CF6]/30',
    glow: 'rgba(139, 92, 246, 0.25)',
  },
  'medical-bio': {
    accent: '#C084FC',
    border: 'border-[#C084FC]/30',
    glow: 'rgba(192, 132, 252, 0.25)',
  },
  'autonomous-comms': {
    accent: '#A855F7',
    border: 'border-[#A855F7]/30',
    glow: 'rgba(168, 85, 247, 0.25)',
  },
  'sustainability': {
    accent: '#818CF8',
    border: 'border-[#818CF8]/30',
    glow: 'rgba(129, 140, 248, 0.25)',
  },
  'open-innovation': {
    accent: '#D8B4FE',
    border: 'border-[#D8B4FE]/30',
    glow: 'rgba(216, 180, 254, 0.25)',
  },
};

export default function ChallengesSection({ onOpenRegister, onNodeSelect }) {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const tracks = EVENT_CONFIG.tracks;

  const handleTrackHover = (idx, id) => {
    setActiveTrackId(id);
    if (onNodeSelect) onNodeSelect(idx);
  };

  const handleFilterClick = (id) => {
    setActiveTrackId(prev => (prev === id ? null : id));
  };

  return (
    <section 
      id="tracks" 
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Invisible anchor for backward-compatibility with #challenges links */}
      <span id="challenges" className="absolute -top-20" />

      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span>// SEDS REC PRESENTS {EVENT_CONFIG.name}</span>
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            HACKATHON TRACKS.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          5 OFFICIAL DOMAINS // OPEN TO ALL DISCIPLINES
        </div>
      </div>

      {/* Overview Manifesto Banner */}
      <div className="mb-10 p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#07030F]/60 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-3xl">
          <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[#C084FC] font-semibold">
            INNOVATION DIRECTIVES
          </span>
          <p className="font-sans text-sm sm:text-base text-[#F7F5FF]/90 font-light leading-relaxed">
            Select any of the 5 official hackathon tracks below to build and deploy your solution. Projects are evaluated on technical feasibility, engineering innovation, and real-world impact across space, technology, and sustainability.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRegister}
            className="group flex items-center gap-2 px-6 py-3 rounded-full border border-[#8B5CF6]/50 bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-wider font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all"
          >
            <span>Register Your Team</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Interactive Domain Navigation Filter Pills */}
      <div className="mb-12 flex flex-wrap items-center gap-2.5 pb-2">
        <button
          onClick={() => setActiveTrackId(null)}
          className={`px-4 py-2 rounded-full border font-display text-xs uppercase tracking-wider transition-all duration-200 ${
            activeTrackId === null
              ? 'border-[#8B5CF6] bg-[#6D28D9]/25 text-[#F7F5FF] shadow-[0_0_15px_rgba(139,92,246,0.25)]'
              : 'border-white/10 bg-white/[0.02] text-[#A6A0B8] hover:border-white/20 hover:text-[#F7F5FF]'
          }`}
        >
          ALL TRACKS (5)
        </button>

        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => handleFilterClick(track.id)}
            className={`px-4 py-2 rounded-full border font-display text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
              activeTrackId === track.id
                ? 'border-[#8B5CF6] bg-[#6D28D9]/25 text-[#F7F5FF] shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                : 'border-white/10 bg-white/[0.02] text-[#A6A0B8] hover:border-white/20 hover:text-[#F7F5FF]'
            }`}
          >
            <span className="text-[#8B5CF6] font-semibold">{track.number}.</span>
            <span>{track.title}</span>
          </button>
        ))}
      </div>

      {/* The 5 Tracks: Symmetrical 6-Column Layout (3 Cards Row 1, 2 Centered Cards Row 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch">
        {tracks.map((track, idx) => {
          const Icon = TRACK_ICONS[track.id] || Layers;
          const theme = TRACK_THEMES[track.id] || TRACK_THEMES['space-defence'];
          const isHighlighted = activeTrackId === track.id;
          const isDimmed = activeTrackId !== null && !isHighlighted;

          // Responsive grid layout:
          // Desktop (lg): 6 columns. Row 1 has items 0, 1, 2 (span 2 each). Row 2 has item 3 (col-start-2 span 2) and item 4 (span 2).
          // Tablet (md): 2 columns. Items 0, 1, 2, 3 take 1 col. Item 4 spans 2 columns and centers at 50% width.
          const gridPlacement = 
            idx < 3
              ? 'lg:col-span-2 md:col-span-1'
              : idx === 3
              ? 'lg:col-start-2 lg:col-span-2 md:col-span-1'
              : 'lg:col-span-2 md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto w-full';

          return (
            <div
              key={track.id}
              id={`track-card-${track.id}`}
              onMouseEnter={() => handleTrackHover(idx, track.id)}
              className={`group relative rounded-3xl border bg-[#07030F]/85 backdrop-blur-xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${gridPlacement} ${
                isHighlighted 
                  ? 'border-[#8B5CF6] shadow-[0_20px_60px_rgba(109,40,217,0.35)] scale-[1.01]' 
                  : isDimmed 
                  ? 'border-white/[0.06] opacity-70' 
                  : `${theme.border} hover:border-[#8B5CF6] hover:shadow-[0_20px_60px_rgba(109,40,217,0.25)]`
              }`}
            >
              {/* Soft Ambient Radial Light Behind Card */}
              <div 
                className={`absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none -z-10 transition-opacity duration-500 ${
                  isHighlighted ? 'opacity-40' : 'opacity-0 group-hover:opacity-30'
                }`}
                style={{
                  background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
                  filter: 'blur(50px)',
                }}
              />

              {/* Card Main Body */}
              <div className="flex flex-col flex-1">
                {/* 1. Card Top: Icon, Track Number & Track Badge */}
                <div className="flex items-center justify-between mb-5 h-10">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#C084FC] group-hover:border-[#8B5CF6]/50 group-hover:bg-[#4C1D95]/20 group-hover:text-white transition-all duration-300">
                      <Icon size={18} />
                    </span>
                    <span className="font-editorial text-2xl font-bold tracking-tight text-[#8B5CF6]">
                      {track.number}
                    </span>
                  </div>

                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] font-display text-[10px] uppercase tracking-widest text-[#A6A0B8] group-hover:border-[#8B5CF6]/40 group-hover:text-[#F7F5FF] transition-colors">
                    TRACK {track.number}
                  </span>
                </div>

                {/* 2. Track Title: Locked min-height for uniform alignment */}
                <h3 className="font-editorial text-2xl sm:text-[1.65rem] font-bold tracking-tight text-[#F7F5FF] leading-snug group-hover:text-white transition-colors min-h-[4.25rem] flex items-start">
                  {track.name}
                </h3>

                {/* 3. Subtitle description: Locked min-height */}
                <div className="font-display text-xs text-[#8B5CF6] uppercase tracking-wider font-medium min-h-[2.5rem] flex items-center mt-1 leading-normal">
                  {track.subtitle}
                </div>

                {/* 4. Track Core Description: Locked min-height */}
                <p className="font-sans text-sm text-[#A6A0B8] font-light leading-relaxed mt-3 min-h-[4.75rem]">
                  {track.desc}
                </p>

                {/* 5. Key Focus Domains: Locked layout */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex-1 flex flex-col justify-start">
                  <span className="font-display text-[9px] uppercase tracking-widest text-[#C084FC] block font-semibold mb-2.5">
                    FOCUS DOMAINS:
                  </span>
                  <div className="flex flex-wrap gap-1.5 min-h-[5.5rem] content-start">
                    {track.domains.map((dom, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs font-sans text-[#F7F5FF]/85 group-hover:border-white/15 transition-colors"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Card Footer: Pinned at the bottom */}
              <div className="pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between gap-4 shrink-0">
                <span className="font-display text-[10px] text-[#A6A0B8] uppercase tracking-wider">
                  Open for All Crews (3–4 Members)
                </span>

                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center gap-1.5 text-xs font-display text-[#C084FC] hover:text-white uppercase tracking-wider font-semibold transition-colors group-hover:underline"
                >
                  <span>Select Track</span>
                  <ArrowUpRight size={13} className="text-[#8B5CF6]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Track Summary Bar */}
      <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-display text-[#A6A0B8]">
        <div className="flex items-center gap-3">
          <span className="text-[#8B5CF6] font-semibold">SEDHACKS '26 TRACKS:</span>
          <span>5 official domains • Free Phase 1 submission • Cash prizes & Aeroin Space Tech internships</span>
        </div>

        <button
          onClick={onOpenRegister}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 hover:border-[#8B5CF6]/50 bg-[#07030F] text-[#F7F5FF] hover:text-white transition-all text-xs font-display uppercase tracking-wider"
        >
          <span>Submit for Any Track ↗</span>
        </button>
      </div>
    </section>
  );
}
