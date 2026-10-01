import React, { useState } from 'react';
import { 
  Shield, 
  Sprout, 
  Cpu, 
  Recycle, 
  Lightbulb, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
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
  const [activeTrackId, setActiveTrackId] = useState(EVENT_CONFIG.tracks[0].id);
  const tracks = EVENT_CONFIG.tracks;

  const handleTrackHover = (idx, id) => {
    setActiveTrackId(id);
    if (onNodeSelect) onNodeSelect(idx);
  };

  return (
    <section 
      id="tracks" 
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Invisible anchor for backward-compatibility with #challenges links */}
      <span id="challenges" className="absolute -top-20" />

      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
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
      <div className="mb-12 p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#07030F]/60 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
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

      {/* The 5 Tracks: High-Impact Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {tracks.map((track, idx) => {
          const Icon = TRACK_ICONS[track.id] || Layers;
          const theme = TRACK_THEMES[track.id] || TRACK_THEMES['space-defence'];
          const isFeatured = idx === 0 || idx === 1;

          return (
            <div
              key={track.id}
              onMouseEnter={() => handleTrackHover(idx, track.id)}
              className={`group relative rounded-3xl border bg-[#07030F]/80 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1.5 overflow-hidden ${
                idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
              } ${theme.border} hover:border-[#8B5CF6] hover:shadow-[0_20px_60px_rgba(109,40,217,0.25)]`}
            >
              {/* Soft Ambient Radial Light Behind Card on Hover */}
              <div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none -z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
                  filter: 'blur(50px)',
                }}
              />

              {/* Card Top: Track Number, Icon & Chapter Badge */}
              <div>
                <div className="flex items-center justify-between mb-6">
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

                {/* Track Title (Verbatim from DOCX) */}
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F5FF] leading-snug group-hover:text-white transition-colors">
                  {track.name}
                </h3>

                {/* Subtitle description */}
                {track.subtitle && (
                  <div className="font-display text-xs text-[#8B5CF6] uppercase tracking-wider mt-2 font-medium">
                    {track.subtitle}
                  </div>
                )}

                {/* Track Core Description (Verbatim from DOCX) */}
                <p className="font-sans text-sm sm:text-base text-[#A6A0B8] font-light leading-relaxed mt-4">
                  {track.desc}
                </p>

                {/* Key Ideation & Domain Badges */}
                <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-2">
                  <span className="font-display text-[9px] uppercase tracking-widest text-[#C084FC] block font-semibold">
                    FOCUS DOMAINS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {track.domains.map((dom, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs font-sans text-[#F7F5FF]/85 group-hover:border-white/15 transition-colors"
                      >
                        {dom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Action */}
              <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-center justify-between gap-4">
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
