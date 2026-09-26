import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * LARGE EDITORIAL CHALLENGE EXPLORER
 * 
 * Philosophy:
 * - Each challenge is an individual chapter with large editorial title and large cinematic imagery.
 * - 01 PROPULSION
 * - 02 SATELLITES
 * - 03 ASTRODYNAMICS
 * - 04 SPACE EXPLORATION
 * - No four tiny cards. Chapter-based exploration with rich technical depth.
 */

export default function ChallengesSection({ onOpenRegister }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const tracks = EVENT_CONFIG.tracks;
  const currentTrack = tracks[activeChapterIndex];

  const nextChapter = () => {
    setActiveChapterIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevChapter = () => {
    setActiveChapterIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
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
        <div className="flex items-center gap-2 sm:gap-3">
          {tracks.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => setActiveChapterIndex(idx)}
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

      {/* Main Chapter Viewer: Large Editorial Layout */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#07030F]/90 backdrop-blur-xl p-8 sm:p-12 lg:p-16 shadow-[0_20px_70px_rgba(0,0,0,0.7)] transition-all duration-500 overflow-hidden">
        
        {/* Background Soft Purple Radial Light */}
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none opacity-20 -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(76, 29, 149, 0.1) 50%, rgba(2, 1, 7, 0) 80%)',
            filter: 'blur(70px)',
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column (6 Cols): Typography, Description, Domains, CTA */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Chapter Header */}
            <div>
              <div className="flex items-center gap-3 mb-2 font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span>CHAPTER {currentTrack.chapter} OF 04</span>
                <span className="text-white/20">|</span>
                <span className="text-[#C084FC]">{currentTrack.prize}</span>
              </div>

              <h3 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF] leading-[0.98]">
                {currentTrack.name}
              </h3>

              <div className="font-display text-sm sm:text-base text-[#A6A0B8] mt-2 font-medium tracking-wide">
                {currentTrack.subtitle}
              </div>
            </div>

            {/* Problem Statement Narrative */}
            <p className="font-sans text-sm sm:text-base text-[#F7F5FF]/90 font-light leading-relaxed">
              {currentTrack.desc}
            </p>

            {/* Technical Domains */}
            <div className="space-y-2 pt-2">
              <span className="font-display text-[10px] uppercase tracking-widest text-[#8B5CF6] block">
                CORE TECHNICAL DOMAINS:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentTrack.domains.map((dom, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-sans text-[#F7F5FF] flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={12} className="text-[#8B5CF6]" />
                    <span>{dom}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onOpenRegister}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center gap-2"
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

          {/* Right Column (6 Cols): Large Cinematic Chapter Visual */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden aspect-[16/10] border border-white/10 bg-[#020107] shadow-[0_15px_45px_rgba(0,0,0,0.7)] group">
            <img
              key={currentTrack.id}
              src={currentTrack.image}
              alt={currentTrack.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 animate-in fade-in duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07030F]/90 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[#A6A0B8] font-display text-xs uppercase tracking-wider">
              <span>ORBITAL 26 // SECTOR SPEC</span>
              <span className="text-[#8B5CF6] font-semibold">{currentTrack.prize}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
