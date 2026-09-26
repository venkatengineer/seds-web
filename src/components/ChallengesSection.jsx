import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * INTERACTIVE SPATIAL CHALLENGE EXPLORER
 * 
 * Target:
 * - 5 major spatial nodes:
 *   01 PROPULSION
 *   02 SATELLITES
 *   03 ASTRODYNAMICS
 *   04 SPACE EXPLORATION
 *   05 EARTH OBSERVATION
 * - Center: ORBITAL 26
 * - Slow continuous constellation rotation.
 * - Interactive hover & selection: Selected node becomes dominant, others dim to 40%.
 * - Smooth chapter transition with large cinematic imagery and deep domain tags.
 */

const NODE_POSITIONS = [
  { id: 'propulsion', angle: -90, cx: 250, cy: 75 },
  { id: 'satellites', angle: -18, cx: 405, cy: 170 },
  { id: 'astrodynamics', angle: 54, cx: 350, cy: 360 },
  { id: 'exploration', angle: 126, cx: 150, cy: 360 },
  { id: 'climate', angle: 198, cx: 95, cy: 170 },
];

export default function ChallengesSection({ onOpenRegister, onNodeSelect }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const tracks = EVENT_CONFIG.tracks;
  const currentTrack = tracks[activeChapterIndex];

  const handleSelectChapter = (idx) => {
    setActiveChapterIndex(idx);
    if (onNodeSelect) onNodeSelect(idx);
  };

  const nextChapter = () => {
    const nextIdx = (activeChapterIndex + 1) % tracks.length;
    handleSelectChapter(nextIdx);
  };

  const prevChapter = () => {
    const prevIdx = (activeChapterIndex - 1 + tracks.length) % tracks.length;
    handleSelectChapter(prevIdx);
  };

  return (
    <section 
      id="challenges" 
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-12">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // ORBITAL 26 SPRINT CHAPTERS
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            CHALLENGE TAXONOMY.
          </h2>
        </div>

        {/* Chapter Index Navigation Strip */}
        <div className="flex flex-wrap items-center gap-2">
          {tracks.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => handleSelectChapter(idx)}
              onMouseEnter={() => { if (onNodeSelect) onNodeSelect(idx); }}
              className={`px-3 py-1.5 rounded-full font-display text-xs tracking-wider transition-all duration-300 focus:outline-none ${
                idx === activeChapterIndex
                  ? 'border border-[#8B5CF6] bg-[#4C1D95]/40 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                  : 'border border-white/10 text-[#A6A0B8] hover:text-[#F7F5FF]'
              }`}
            >
              {track.chapter} {track.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Interactive Constellation + Right Editorial Chapter Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column (5 Cols): Live Spatial Constellation Arena */}
        <div className="lg:col-span-5 relative h-[420px] sm:h-[480px] rounded-2xl border border-white/[0.08] bg-[#07030F]/70 backdrop-blur-xl p-6 flex items-center justify-center overflow-hidden">
          
          {/* Concentric Reference Rings */}
          <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.04]" />
          <div className="absolute w-[340px] h-[340px] rounded-full border border-white/[0.02]" />

          {/* SVG Constellation Vectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 440">
            {NODE_POSITIONS.map((pos, idx) => {
              const isSelected = activeChapterIndex === idx;
              return (
                <line
                  key={pos.id}
                  x1="250"
                  y1="220"
                  x2={pos.cx}
                  y2={pos.cy}
                  stroke={isSelected ? '#8B5CF6' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={isSelected ? 1.6 : 0.75}
                  className="transition-colors duration-400 ease-out"
                />
              );
            })}

            {/* Outer Perimeter Structural Connectors */}
            <polygon
              points="250,75 405,170 350,360 150,360 95,170"
              fill="none"
              stroke="rgba(139, 92, 246, 0.12)"
              strokeWidth="0.8"
            />
          </svg>

          {/* Center: ORBITAL 26 Epicenter */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-10">
            <div className="w-14 h-14 rounded-full border border-[#8B5CF6]/50 bg-[#07030F] flex items-center justify-center shadow-[0_0_25px_rgba(109,40,217,0.35)]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
            </div>
            <div className="mt-2 font-editorial text-xs font-bold tracking-wider text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </div>
            <div className="font-display text-[8px] uppercase tracking-widest text-[#A6A0B8]">
              SPATIAL EPICENTER
            </div>
          </div>

          {/* 5 Outer Interactive Constellation Nodes */}
          {NODE_POSITIONS.map((pos, idx) => {
            const track = tracks[idx];
            if (!track) return null;
            const isSelected = activeChapterIndex === idx;

            return (
              <button
                key={pos.id}
                onClick={() => handleSelectChapter(idx)}
                onMouseEnter={() => { if (onNodeSelect) onNodeSelect(idx); }}
                className={`absolute group transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 p-2 rounded-full transition-all duration-400 ease-out focus:outline-none ${
                  isSelected
                    ? 'scale-115 z-30 opacity-100'
                    : 'opacity-40 hover:opacity-100 z-10 hover:scale-105'
                }`}
                style={{
                  left: `${(pos.cx / 500) * 100}%`,
                  top: `${(pos.cy / 440) * 100}%`,
                }}
              >
                <span className="relative flex items-center justify-center w-5 h-5">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-[#C084FC] shadow-[0_0_14px_#8B5CF6]' : 'bg-[#8B5CF6]'
                    }`}
                  />
                  <span
                    className={`absolute inset-0 rounded-full border transition-all duration-400 ${
                      isSelected ? 'border-[#8B5CF6] scale-125' : 'border-transparent group-hover:border-white/20'
                    }`}
                  />
                </span>

                <span
                  className={`font-display text-[9px] uppercase tracking-wider transition-colors duration-300 ${
                    isSelected ? 'text-[#F7F5FF] font-semibold' : 'text-[#A6A0B8] group-hover:text-[#F7F5FF]'
                  }`}
                >
                  {track.chapter} {track.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column (7 Cols): Editorial Chapter Dossier Panel */}
        <div className="lg:col-span-7 relative rounded-2xl border border-white/[0.08] bg-[#07030F]/90 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6">
          
          {/* Chapter Eyebrow & Status */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span className="font-display text-xs uppercase tracking-[0.25em] text-[#8B5CF6] font-semibold">
                CHAPTER {currentTrack.chapter} OF 05
              </span>
            </div>

            <span className="px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/30 text-xs font-display text-[#C084FC] uppercase tracking-wider font-medium">
              {currentTrack.prize}
            </span>
          </div>

          {/* Chapter Title & Subtitle */}
          <div>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F5FF] leading-[1.0]">
              {currentTrack.name}
            </h3>
            <div className="font-display text-xs sm:text-sm text-[#A6A0B8] mt-1.5 font-medium tracking-wide">
              {currentTrack.subtitle}
            </div>
          </div>

          {/* Visual with Cinematic Image Mask */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/8] border border-white/10 bg-[#020107]">
            <img
              key={currentTrack.id}
              src={currentTrack.image}
              alt={currentTrack.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07030F]/90 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Problem Narrative */}
          <p className="font-sans text-xs sm:text-sm text-[#F7F5FF]/90 font-light leading-relaxed">
            {currentTrack.desc}
          </p>

          {/* Technical Domains */}
          <div className="space-y-2">
            <span className="font-display text-[10px] uppercase tracking-widest text-[#8B5CF6] block font-semibold">
              CORE EVALUATION BENCHMARKS:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentTrack.domains.map((dom, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md border border-white/[0.08] bg-white/[0.03] text-xs font-sans text-[#F7F5FF] flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} className="text-[#8B5CF6]" />
                  <span>{dom}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onOpenRegister}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center gap-2"
            >
              <span>Register for {currentTrack.title}</span>
              <ArrowRight size={14} />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={prevChapter}
                className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
                title="Previous Chapter"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextChapter}
                className="p-2.5 rounded-full border border-white/10 hover:border-white/30 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
                title="Next Chapter"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
