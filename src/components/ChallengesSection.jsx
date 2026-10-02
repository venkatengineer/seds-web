import React, { useState } from 'react';
import { 
  Shield, 
  Sprout, 
  Telescope, 
  Zap, 
  Lightbulb, 
  ArrowUpRight, 
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * OFFICIAL HACKATHON TRACKS SECTION — "TRACKS / DOMAINS"
 * Transcribed from: "SEDHACKS ’26 website content document_20261002_085041_0000.docx"
 * 
 * Title: Tracks / Domains
 * Subtitle: Choose Your Mission
 * Intro: Five domains. Countless ways to build.
 */

const TRACK_ICONS = {
  'space-defence': Shield,
  'medical-bio': Sprout,
  'space-instrumentation': Telescope,
  'autonomous-comms': Telescope,
  'sustainability-energy': Zap,
  'sustainability': Zap,
  'open-innovation': Lightbulb,
};

const TRACK_THEMES = {
  'space-defence': {
    accent: '#8B5CF6',
    border: 'border-white/[0.08]',
    glow: 'rgba(139, 92, 246, 0.18)',
  },
  'medical-bio': {
    accent: '#8B5CF6',
    border: 'border-white/[0.08]',
    glow: 'rgba(139, 92, 246, 0.18)',
  },
  'space-instrumentation': {
    accent: '#8B5CF6',
    border: 'border-white/[0.08]',
    glow: 'rgba(139, 92, 246, 0.18)',
  },
  'autonomous-comms': {
    accent: '#8B5CF6',
    border: 'border-white/[0.08]',
    glow: 'rgba(139, 92, 246, 0.18)',
  },
  'sustainability-energy': {
    accent: '#8B5CF6',
    border: 'border-white/[0.08]',
    glow: 'rgba(139, 92, 246, 0.18)',
  },
  'sustainability': {
    accent: '#8B5CF6',
    border: 'border-white/[0.08]',
    glow: 'rgba(139, 92, 246, 0.18)',
  },
  'open-innovation': {
    accent: '#8B5CF6',
    border: 'border-white/[0.08]',
    glow: 'rgba(139, 92, 246, 0.18)',
  },
};

export default function ChallengesSection({ onOpenRegister, onNodeSelect }) {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const tracks = EVENT_CONFIG.tracks;

  const handleTrackSelect = (idx, id) => {
    setActiveTrackId(prev => (prev === id ? null : id));
    if (onNodeSelect) onNodeSelect(idx);
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
        className={`group relative rounded-2xl border bg-[#090514]/90 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-[0_15px_40px_rgba(0,0,0,0.85)] overflow-hidden w-full ${
          isHighlighted 
            ? 'border-[#8B5CF6] shadow-[0_0_35px_rgba(139,92,246,0.3)] ring-1 ring-[#8B5CF6]' 
            : `${theme.border} hover:border-[#8B5CF6]/70 hover:shadow-[0_15px_35px_rgba(139,92,246,0.2)]`
        }`}
      >
        {/* Restrained Ambient Radial Light Behind Card */}
        <div 
          className={`absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none -z-10 transition-opacity duration-500 ${
            isHighlighted ? 'opacity-25' : 'opacity-0 group-hover:opacity-15'
          }`}
          style={{
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Card Main Body */}
        <div className="flex flex-col flex-1">
          {/* Header: Icon, Track Number & Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#C084FC] group-hover:border-[#8B5CF6]/50 group-hover:bg-[#4C1D95]/25 group-hover:text-white transition-all duration-300">
                <Icon size={18} />
              </span>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#8B5CF6]">
                {track.number}
              </span>
            </div>

            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] font-display text-[10px] uppercase tracking-widest text-[#E2DEEC] group-hover:border-[#8B5CF6]/40 group-hover:text-[#F7F5FF] transition-colors">
              DOMAIN {track.number}
            </span>
          </div>

          {/* Domain Title */}
          <h3 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#F7F5FF] leading-snug group-hover:text-white transition-colors mb-3">
            {track.name}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm text-[#E2DEEC] font-normal leading-relaxed mb-4">
            {track.desc}
          </p>

          {/* Think About Details from doc */}
          {track.thinkAbout && (
            <div className="mt-2 pt-3 border-t border-white/[0.08] space-y-1.5">
              <span className="font-display text-[10px] uppercase tracking-widest text-[#C084FC] block font-semibold">
                THINK ABOUT:
              </span>
              <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
                {track.thinkAbout}
              </p>
            </div>
          )}

          {/* Build Details from doc */}
          {track.build && (
            <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-1.5">
              <span className="font-display text-[10px] uppercase tracking-widest text-[#C084FC] block font-semibold">
                BUILD:
              </span>
              <p className="font-sans text-xs text-white/90 leading-relaxed">
                {track.build}
              </p>
            </div>
          )}

          {/* Interdisciplinary note on Track 5 */}
          {track.note && (
            <div className="mt-3 p-3 rounded-lg border border-[#8B5CF6]/20 bg-[#8B5CF6]/[0.06] text-xs text-[#E2DEEC] italic">
              {track.note}
            </div>
          )}
        </div>

        {/* Card Footer: Pinned at bottom */}
        <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between gap-2 shrink-0">
          <span className="font-mono text-[10px] text-[#E2DEEC] uppercase tracking-wider font-medium">
            Strictly 4 Members • ₹0 Entry (Free)
          </span>

          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 text-xs font-display text-[#C084FC] hover:text-white uppercase tracking-wider font-semibold transition-colors group-hover:underline cursor-pointer"
          >
            <span>Choose Domain</span>
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
      {/* Backward-compatibility anchor */}
      <span id="challenges" className="absolute -top-28" />

      {/* Protective Dark Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020107] via-[#020107]/95 via-65% to-transparent pointer-events-none -z-10" />

      {/* Centered Editorial Container */}
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Eyebrow & Headline */}
        <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5 mb-8">
          <div>
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#C084FC] block mb-1 font-bold flex items-center gap-2">
              <Sparkles size={13} className="text-[#8B5CF6]" />
              <span>// CHOOSE YOUR MISSION</span>
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
              TRACKS / DOMAINS.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 font-display text-[10px] tracking-[0.2em] text-[#F7F5FF] uppercase font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              TOP 2 TEAMS: AEROIN INTERNSHIPS
            </span>
            <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] font-display text-[10px] tracking-[0.2em] text-[#E2DEEC] uppercase font-semibold">
              DEADLINE: 9 OCT, 18:00 IST • 100% FREE (₹0)
            </span>
            <span className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] font-display text-[10px] tracking-[0.2em] text-[#C084FC] uppercase font-semibold">
              ₹10,000 PRIZES
            </span>
          </div>
        </div>

        {/* Overview Manifesto Banner */}
        <div data-reveal className="mb-10 p-5 sm:p-6 rounded-2xl border border-white/[0.12] bg-[#0B0616]/95 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-display text-[10px] uppercase tracking-[0.25em] text-[#C084FC] font-bold">
                FIVE DOMAINS. COUNTLESS WAYS TO BUILD.
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] font-mono text-[#E2DEEC]">LAST DATE: 9 OCTOBER 2026</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#F7F5FF] font-normal leading-relaxed">
              Explore technologies that support space missions, health in orbit, autonomous rovers, space sustainability, or open innovation. Hardware prototypes, software platforms, AI tools, and simulations are all welcomed.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-[#8B5CF6]/50 bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-wider font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all cursor-pointer"
            >
              <span>Register Now (Free)</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Symmetrical Grid: Row 1 (3 cards) + Row 2 (2 cards centered) */}
        <div className="space-y-6">
          {/* Top Row: 3 Tracks */}
          <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {tracks.slice(0, 3).map((track, idx) => renderTrackCard(track, idx))}
          </div>

          {/* Bottom Row: 2 Tracks Centered */}
          <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <div className="hidden lg:block opacity-0 pointer-events-none" />
            {tracks.slice(3, 5).map((track, idx) => renderTrackCard(track, idx + 3))}
            <div className="hidden lg:block opacity-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
