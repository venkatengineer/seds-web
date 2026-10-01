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
 * OFFICIAL HACKATHON TRACKS SECTION — FLAWLESS SYMMETRICAL ARCHITECTURE
 * 
 * 5 Official SEDHACKS '26 Tracks:
 * 01. Space Applications & Defence Technology
 * 02. Medical, Food & Agriculture in Space
 * 03. Autonomous & Communication Technology
 * 04. Sustainability in Space
 * 05. Miscellaneous / Open Innovation
 * 
 * Perfect Layout & Alignment Guarantees:
 * - Left-to-Center protective gradient backdrop: Prevents 3D planet from colliding with card text.
 * - IDENTICAL WIDTHS FOR ALL 5 CARDS: Row 1 (3 cards) + Row 2 (2 cards centered directly beneath Row 1).
 * - IDENTICAL COMPACT HEIGHTS: Zero empty black void inside Card 04 or Card 05.
 * - Solid opaque dark obsidian cards (bg-[#0B0616]): 100% readable, zero background bleeding.
 * - Locked internal baselines: Titles (h-14), Subtitles (h-6), Descriptions (h-14), Focus Tags (h-20).
 * - Scroll offset clearance (scroll-mt-28): Never cut off or overlapped by fixed navigation bar.
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
    border: 'border-[#8B5CF6]/35',
    glow: 'rgba(139, 92, 246, 0.25)',
  },
  'medical-bio': {
    accent: '#C084FC',
    border: 'border-[#C084FC]/35',
    glow: 'rgba(192, 132, 252, 0.25)',
  },
  'autonomous-comms': {
    accent: '#A855F7',
    border: 'border-[#A855F7]/35',
    glow: 'rgba(168, 85, 247, 0.25)',
  },
  'sustainability': {
    accent: '#818CF8',
    border: 'border-[#818CF8]/35',
    glow: 'rgba(129, 140, 248, 0.25)',
  },
  'open-innovation': {
    accent: '#D8B4FE',
    border: 'border-[#D8B4FE]/35',
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
        className={`group relative rounded-2xl border bg-[#0B0616] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.85)] overflow-hidden w-full ${
          isHighlighted 
            ? 'border-[#8B5CF6] shadow-[0_0_40px_rgba(139,92,246,0.35)] ring-1 ring-[#8B5CF6]' 
            : `${theme.border} hover:border-[#8B5CF6]/80 hover:shadow-[0_15px_40px_rgba(109,40,217,0.25)]`
        }`}
      >
        {/* Soft Ambient Radial Light Behind Card */}
        <div 
          className={`absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none -z-10 transition-opacity duration-500 ${
            isHighlighted ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
          }`}
          style={{
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Card Main Body */}
        <div className="flex flex-col flex-1">
          {/* 1. Header: Icon, Track Number & Badge */}
          <div className="flex items-center justify-between mb-3 h-8">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#C084FC] group-hover:border-[#8B5CF6]/50 group-hover:bg-[#4C1D95]/25 group-hover:text-white transition-all duration-300">
                <Icon size={16} />
              </span>
              <span className="font-editorial text-xl font-bold tracking-tight text-[#8B5CF6]">
                {track.number}
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] font-display text-[9px] uppercase tracking-widest text-[#A6A0B8] group-hover:border-[#8B5CF6]/40 group-hover:text-[#F7F5FF] transition-colors">
              TRACK {track.number}
            </span>
          </div>

          {/* 2. Track Title: Locked height, no awkward text clipping */}
          <h3 className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-[#F7F5FF] leading-snug group-hover:text-white transition-colors h-14 flex items-center break-words">
            {track.name}
          </h3>

          {/* 3. Subtitle: Locked height */}
          <div className="font-display text-[11px] text-[#8B5CF6] uppercase tracking-wider font-semibold h-6 flex items-center leading-tight truncate">
            {track.subtitle}
          </div>

          {/* 4. Description: Locked height, bright and readable */}
          <p className="font-sans text-xs sm:text-[13px] text-[#E2DEEC] font-normal leading-relaxed mt-2 h-14 overflow-hidden">
            {track.desc}
          </p>

          {/* 5. Key Focus Domains: Locked height (zero empty void) */}
          <div className="mt-3 pt-3 border-t border-white/[0.08] flex-1 flex flex-col justify-start">
            <span className="font-display text-[9px] uppercase tracking-widest text-[#C084FC] block font-semibold mb-1.5">
              FOCUS DOMAINS:
            </span>
            <div className="flex flex-wrap gap-1.5 h-20 content-start overflow-hidden">
              {track.domains.map((dom, dIdx) => (
                <span
                  key={dIdx}
                  className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.05] text-[11px] font-sans text-white font-medium group-hover:border-white/20 transition-colors"
                >
                  {dom}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Card Footer: Pinned at the bottom */}
        <div className="pt-3 mt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 shrink-0">
          <span className="font-display text-[9px] text-emerald-400 uppercase tracking-wider font-semibold">
            4 Members Only • 100% Free Entry (₹0)
          </span>

          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1 text-xs font-display text-[#C084FC] hover:text-white uppercase tracking-wider font-semibold transition-colors group-hover:underline"
          >
            <span>Select Track</span>
            <ArrowUpRight size={12} className="text-[#8B5CF6]" />
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

      {/* Protective Dark Gradient Backdrop: Shields UI from 3D planet */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020107] via-[#020107]/95 via-65% to-transparent pointer-events-none -z-10" />

      {/* Centered Editorial Container */}
      <div className="max-w-5xl mx-auto w-full">
        {/* Top Eyebrow & Headline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5 mb-8">
          <div>
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#C084FC] block mb-1 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span>// PRIMARY CHALLENGE DOMAINS</span>
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
              HACKATHON TRACKS.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full border border-amber-400/80 bg-amber-950/40 font-display text-[10px] tracking-[0.2em] text-amber-200 uppercase font-bold shadow-[0_0_15px_rgba(251,191,36,0.35)]">
              DEADLINE: 10 OCT 2026 • 100% FREE (₹0)
            </span>
            <span className="px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/30 font-display text-[10px] tracking-[0.2em] text-emerald-300 uppercase font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              ₹10,000 PRIZES
            </span>
          </div>
        </div>

        {/* Overview Manifesto Banner */}
        <div className="mb-6 p-5 sm:p-6 rounded-2xl border border-white/[0.12] bg-[#0B0616]/95 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-display text-[9px] uppercase tracking-[0.25em] text-[#C084FC] font-bold">
                INNOVATION DIRECTIVES
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] font-mono text-amber-300 font-bold">LAST DATE: 10 OCTOBER 2026</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#F7F5FF] font-normal leading-relaxed">
              Select any of the 5 official hackathon tracks below to build and deploy your solution. Projects are evaluated on technical feasibility, engineering innovation, and real-world impact across space, technology, and sustainability.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#8B5CF6]/50 bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-wider font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all"
            >
              <span>Register Your Team (Free)</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Track Switcher Pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2 pb-1">
          <button
            onClick={() => setActiveTrackId(null)}
            className={`px-3.5 py-1.5 rounded-full border font-display text-[11px] uppercase tracking-wider transition-all duration-200 ${
              activeTrackId === null
                ? 'border-[#8B5CF6] bg-[#6D28D9]/25 text-[#F7F5FF] shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                : 'border-white/10 bg-[#0B0616] text-[#A6A0B8] hover:border-white/20 hover:text-[#F7F5FF]'
            }`}
          >
            ALL TRACKS (5)
          </button>

          {tracks.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(idx, track.id)}
              className={`px-3.5 py-1.5 rounded-full border font-display text-[11px] uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                activeTrackId === track.id
                  ? 'border-[#8B5CF6] bg-[#6D28D9]/25 text-[#F7F5FF] shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                  : 'border-white/10 bg-[#0B0616] text-[#A6A0B8] hover:border-white/20 hover:text-[#F7F5FF]'
              }`}
            >
              <span className="text-[#8B5CF6] font-semibold">{track.number}.</span>
              <span>{track.title}</span>
            </button>
          ))}
        </div>

        {/* Row 1: Tracks 01, 02, 03 (3 Equal Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tracks.slice(0, 3).map((track, idx) => renderTrackCard(track, idx))}
        </div>

        {/* Row 2: Tracks 04, 05 (2 Centered Cards with EXACT SAME WIDTH as Row 1) */}
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {tracks.slice(3, 5).map((track, idx) => (
            <div 
              key={track.id} 
              className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex"
            >
              {renderTrackCard(track, idx + 3)}
            </div>
          ))}
        </div>

        {/* Bottom Track Summary Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-display text-[#A6A0B8]">
          <div className="flex items-center gap-3">
            <span className="text-[#8B5CF6] font-semibold">SEDHACKS '26 TRACKS:</span>
            <span>5 official domains • Completely Free of Cost (₹0 Entry Fee) • Cash prizes & Aeroin Space Tech internships</span>
          </div>

          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 hover:border-[#8B5CF6]/50 bg-[#0B0616] text-[#F7F5FF] hover:text-white transition-all text-xs font-display uppercase tracking-wider"
          >
            <span>Submit for Any Track ↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
