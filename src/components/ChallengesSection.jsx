import React, { useState } from 'react';
import { 
  Shield, 
  Sprout, 
  Cpu, 
  Recycle, 
  Lightbulb, 
  ArrowUpRight, 
  Layers,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * OFFICIAL HACKATHON TRACKS SECTION — PIXEL-PERFECT SYMMETRICAL ARCHITECTURE
 * 
 * SEDS REC SEDHACKS '26 Tracks:
 * 01. Space Applications & Defence Technology
 * 02. Medical, Food & Agriculture in Space
 * 03. Autonomous & Communication Technology
 * 04. Sustainability in Space
 * 05. Miscellaneous / Open Innovation
 * 
 * Flawless Visual Alignment:
 * - Centered max-w-6xl container: Leaves the 3D planet safely in negative space on the right.
 * - Solid opaque dark obsidian cards (bg-[#0A0518]): 100% readable, zero background bleeding.
 * - Identical card widths across both rows (~364px).
 * - Row 1 (3 cards) + Row 2 (2 cards centered directly beneath Row 1).
 * - Locked vertical baseline heights for Title, Subtitle, Description, Focus Tags, and Footer CTA.
 * - Smooth scroll-mt-28 offset so navbar never overlaps card headers.
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

  const handleTrackSelect = (idx, id) => {
    setActiveTrackId(prev => (prev === id ? null : id));
    if (onNodeSelect) onNodeSelect(idx);

    const cardEl = document.getElementById(`track-card-${id}`);
    if (cardEl) {
      const navOffset = 95;
      const elementPosition = cardEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderTrackCard = (track, idx) => {
    const Icon = TRACK_ICONS[track.id] || Layers;
    const theme = TRACK_THEMES[track.id] || TRACK_THEMES['space-defence'];
    const isHighlighted = activeTrackId === track.id;

    return (
      <div
        key={track.id}
        id={`track-card-${track.id}`}
        onMouseEnter={() => {
          if (onNodeSelect) onNodeSelect(idx);
        }}
        className={`group relative rounded-3xl border bg-[#0A0518] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden ${
          isHighlighted 
            ? 'border-[#8B5CF6] shadow-[0_0_50px_rgba(139,92,246,0.35)] ring-1 ring-[#8B5CF6]' 
            : `${theme.border} hover:border-[#8B5CF6]/80 hover:shadow-[0_20px_60px_rgba(109,40,217,0.3)]`
        }`}
      >
        {/* Soft Ambient Radial Light Behind Card */}
        <div 
          className={`absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none -z-10 transition-opacity duration-500 ${
            isHighlighted ? 'opacity-35' : 'opacity-0 group-hover:opacity-25'
          }`}
          style={{
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
        />

        {/* Card Main Body */}
        <div className="flex flex-col flex-1">
          {/* 1. Card Top: Icon, Track Number & Track Badge */}
          <div className="flex items-center justify-between mb-4 h-10">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#C084FC] group-hover:border-[#8B5CF6]/50 group-hover:bg-[#4C1D95]/25 group-hover:text-white transition-all duration-300">
                <Icon size={18} />
              </span>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#8B5CF6]">
                {track.number}
              </span>
            </div>

            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] font-display text-[10px] uppercase tracking-widest text-[#A6A0B8] group-hover:border-[#8B5CF6]/40 group-hover:text-[#F7F5FF] transition-colors">
              TRACK {track.number}
            </span>
          </div>

          {/* 2. Track Title: Locked height, no text wrap clipping */}
          <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#F7F5FF] leading-snug group-hover:text-white transition-colors h-[4.25rem] flex items-start break-words">
            {track.name}
          </h3>

          {/* 3. Subtitle description: Locked height */}
          <div className="font-display text-xs text-[#8B5CF6] uppercase tracking-wider font-semibold h-[2.5rem] flex items-center leading-tight mt-1">
            {track.subtitle}
          </div>

          {/* 4. Track Core Description: Locked height */}
          <p className="font-sans text-xs sm:text-sm text-[#A6A0B8] font-light leading-relaxed mt-2 h-[4.5rem]">
            {track.desc}
          </p>

          {/* 5. Key Focus Domains: Locked height */}
          <div className="mt-4 pt-4 border-t border-white/[0.08] flex-1 flex flex-col justify-start">
            <span className="font-display text-[9px] uppercase tracking-widest text-[#C084FC] block font-semibold mb-2">
              FOCUS DOMAINS:
            </span>
            <div className="flex flex-wrap gap-1.5 min-h-[5.5rem] content-start">
              {track.domains.map((dom, dIdx) => (
                <span
                  key={dIdx}
                  className="px-2.5 py-1 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs font-sans text-[#F7F5FF]/90 group-hover:border-white/20 transition-colors"
                >
                  {dom}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Card Footer: Pinned at the bottom */}
        <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
          <span className="font-display text-[10px] text-[#A6A0B8] uppercase tracking-wider">
            3–4 Members • Free Phase 1
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
  };

  return (
    <section 
      id="tracks" 
      className="relative min-h-screen w-full flex flex-col justify-center pt-24 pb-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden scroll-mt-28"
    >
      {/* Invisible anchor for backward-compatibility with #challenges links */}
      <span id="challenges" className="absolute -top-28" />

      {/* Centered Editorial Container */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Eyebrow & Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-10">
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
        <div className="mb-8 p-6 sm:p-7 rounded-2xl border border-white/[0.08] bg-[#0A0518]/90 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="space-y-1.5 max-w-3xl">
            <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[#C084FC] font-semibold">
              INNOVATION DIRECTIVES
            </span>
            <p className="font-sans text-xs sm:text-sm text-[#F7F5FF]/90 font-light leading-relaxed">
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

        {/* Quick Track Switcher Pills */}
        <div className="mb-10 flex flex-wrap items-center gap-2 pb-2">
          <button
            onClick={() => setActiveTrackId(null)}
            className={`px-4 py-2 rounded-full border font-display text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTrackId === null
                ? 'border-[#8B5CF6] bg-[#6D28D9]/25 text-[#F7F5FF] shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                : 'border-white/10 bg-[#0A0518] text-[#A6A0B8] hover:border-white/20 hover:text-[#F7F5FF]'
            }`}
          >
            ALL TRACKS (5)
          </button>

          {tracks.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(idx, track.id)}
              className={`px-4 py-2 rounded-full border font-display text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                activeTrackId === track.id
                  ? 'border-[#8B5CF6] bg-[#6D28D9]/25 text-[#F7F5FF] shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                  : 'border-white/10 bg-[#0A0518] text-[#A6A0B8] hover:border-white/20 hover:text-[#F7F5FF]'
              }`}
            >
              <span className="text-[#8B5CF6] font-semibold">{track.number}.</span>
              <span>{track.title}</span>
            </button>
          ))}
        </div>

        {/* Row 1: Tracks 01, 02, 03 (3 Equal Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tracks.slice(0, 3).map((track, idx) => renderTrackCard(track, idx))}
        </div>

        {/* Row 2: Tracks 04, 05 (2 Centered Cards with Identical Width) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[760px] mx-auto w-full mt-6 lg:mt-8">
          {tracks.slice(3, 5).map((track, idx) => renderTrackCard(track, idx + 3))}
        </div>

        {/* Bottom Track Summary Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-display text-[#A6A0B8]">
          <div className="flex items-center gap-3">
            <span className="text-[#8B5CF6] font-semibold">SEDHACKS '26 TRACKS:</span>
            <span>5 official domains • Free Phase 1 submission • Cash prizes & Aeroin Space Tech internships</span>
          </div>

          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 hover:border-[#8B5CF6]/50 bg-[#0A0518] text-[#F7F5FF] hover:text-white transition-all text-xs font-display uppercase tracking-wider"
          >
            <span>Submit for Any Track ↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
