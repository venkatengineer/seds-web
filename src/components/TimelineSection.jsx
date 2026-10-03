import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * MASTER JOURNEY & SPRINT TIMELINE
 * Transcribed from: "SEDHACKS ’26 website content document_20261002_085041_0000.docx"
 * 
 * Includes:
 * 1. Your Journey at SEDHACKS ’26: From Registration to Recognition (7 Milestones)
 * 2. 24-Hour Hackathon Mission Trajectory: DISCOVER, BUILD, CREATE, LAUNCH
 */

export default function TimelineSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [particleCoord, setParticleCoord] = useState({ x: 80, y: 130 });
  const pathRef = useRef(null);

  const stages = EVENT_CONFIG.timeline;
  const currentStage = stages[activeStageIndex];
  const progressWeights = [0.12, 0.38, 0.68, 0.94];
  const journey = EVENT_CONFIG.journey;

  useEffect(() => {
    try {
      if (!pathRef.current) return;
      const path = pathRef.current;
      if (typeof path.getTotalLength !== 'function' || typeof path.getPointAtLength !== 'function') return;
      const totalLength = path.getTotalLength();
      if (typeof totalLength !== 'number' || isNaN(totalLength)) return;
      const targetLength = totalLength * progressWeights[activeStageIndex];
      const point = path.getPointAtLength(targetLength);
      if (point && typeof point.x === 'number' && typeof point.y === 'number') {
        setParticleCoord({ x: point.x, y: point.y });
      }
    } catch (err) {
      console.warn('Timeline trajectory calculation notice:', err);
    }
  }, [activeStageIndex]);

  return (
    <section 
      id="timeline" 
      className="relative min-h-screen w-full flex flex-col justify-center py-28 sm:py-36 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.12] pb-6 mb-16">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#C084FC]" />
              // YOUR JOURNEY AT {EVENT_CONFIG.name}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/30 text-[#E2DEEC] font-display text-[11px] font-semibold tracking-wider uppercase">
              <Clock size={11} className="text-[#C084FC]" />
              LAST DATE TO REGISTER: 9 OCT 2026 // 18:00 IST
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            FROM REGISTRATION TO RECOGNITION.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#E2DEEC] uppercase font-medium">
          ROADMAP & 24-HR SPRINT
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-16">
        
        {/* 1. SEVEN MILESTONES OF YOUR JOURNEY (From Document) */}
        <div>
          <div data-reveal className="mb-6 flex items-center justify-between">
            <span className="font-display text-xs tracking-[0.2em] uppercase text-[#C084FC] font-semibold">
              // PARTICIPANT LIFECYCLE (7 PHASES)
            </span>
            <span className="font-display text-xs text-[#E2DEEC]">
              Steps 01 through 07
            </span>
          </div>

          <div data-reveal-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {journey.map((item, idx) => (
              <div 
                key={item.num}
                className={`p-5 rounded-2xl border bg-[#07030F]/80 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  idx === 6 
                    ? 'border-[#8B5CF6]/50 sm:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#1b0d2d] to-[#07030F] shadow-[0_0_20px_rgba(139,92,246,0.2)]' 
                    : 'border-white/[0.12] hover:border-[#8B5CF6]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-tech text-xs tracking-wider text-[#A855F7] font-bold">
                      {item.num}
                    </span>
                    <span className="text-[10px] font-mono text-[#E2DEEC] uppercase tracking-wider">
                      {item.timing}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white mb-2">
                    {item.step}
                  </h3>

                  <p className="font-sans text-xs text-[#E2DEEC] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 24-HOUR SPRINT TRAJECTORY */}
        <div data-reveal className="pt-10 border-t border-white/[0.12] space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-display text-xs tracking-[0.2em] uppercase text-[#A855F7] font-semibold block mb-1">
                // 12–13 OCTOBER 2026 // ON-SITE SPRINT
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-white">
                24-Hour Flight Trajectory
              </h3>
            </div>
            <span className="px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-950/30 text-purple-200 text-xs font-display tracking-wider uppercase">
              Rajalakshmi Engineering College
            </span>
          </div>

          {/* SVG Trajectory Arc */}
          <div className="relative w-full h-[120px] sm:h-[150px] pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 900 150"
              preserveAspectRatio="none"
            >
              {/* Base Background Trajectory Arc */}
              <path
                d="M 50 120 C 260 20, 600 135, 850 35"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
              />

              {/* Active Luminous Trajectory Segment */}
              <path
                ref={pathRef}
                d="M 50 120 C 260 20, 600 135, 850 35"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2.4"
                strokeDasharray="1000"
                strokeDashoffset={1000 - progressWeights[activeStageIndex] * 1000}
                className="transition-all duration-700 ease-out"
              />

              {/* Traveling Luminous Beacon */}
              <g
                className="transition-all duration-700 ease-out"
                transform={`translate(${particleCoord.x}, ${particleCoord.y})`}
              >
                <circle r="22" fill="rgba(139, 92, 246, 0.20)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                <circle r="8" fill="none" stroke="#C084FC" strokeWidth="1.5" />
                <circle r="3" fill="#F7F5FF" />
              </g>
            </svg>
          </div>

          {/* Four Stage Selectors */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/[0.12]">
            {stages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setActiveStageIndex(idx)}
                  className="group text-left space-y-2 focus:outline-none transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full transition-all duration-400 ${
                      isActive ? 'bg-[#A855F7] shadow-[0_0_12px_#A855F7] scale-125' : 'bg-white/30 group-hover:bg-white/60'
                    }`} />
                    <span className={`font-display text-xs tracking-[0.2em] uppercase transition-colors ${
                      isActive ? 'text-[#C084FC] font-bold' : 'text-[#E2DEEC]/70 group-hover:text-[#E2DEEC]'
                    }`}>
                      STAGE {stage.stage}
                    </span>
                  </div>

                  <div className={`font-editorial text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                    isActive ? 'text-white' : 'text-[#E2DEEC]/80 group-hover:text-white'
                  }`}>
                    {stage.title}
                  </div>

                  <div className="font-display text-[11px] text-[#E2DEEC] uppercase tracking-wider font-mono-tech">
                    {stage.time}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Content Reveal */}
          <div className="pt-8 border-t border-white/[0.12] flex flex-col md:flex-row md:items-baseline justify-between gap-6">
            <div key={currentStage.stage} className="max-w-2xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400">
              <div className="font-display text-xs uppercase tracking-[0.2em] text-[#C084FC] font-semibold">
                // {currentStage.tagline}
              </div>
              <p className="font-sans text-base sm:text-lg text-white font-normal leading-relaxed">
                {currentStage.desc}
              </p>
            </div>

            <div className="font-display text-xs text-[#E2DEEC] shrink-0 tracking-wider font-mono-tech">
              T+ PHASE {currentStage.stage} OF 04 // FLIGHT PROTOCOL
            </div>
          </div>
        </div>

        {/* Registration Cutoff Strip */}
        <div data-reveal className="p-4 sm:p-5 rounded-xl border border-[#8B5CF6]/40 bg-[#160A2C]/80 flex flex-wrap items-center justify-between gap-4 text-xs font-display">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
            <span className="text-[#C084FC] font-bold uppercase tracking-wider">REGISTRATION DEADLINE:</span>
            <span className="text-[#F7F5FF] font-semibold">{EVENT_CONFIG.registrationDeadline} // 18:00 IST</span>
          </div>
          <div className="text-white font-medium uppercase tracking-wider font-mono text-[11px]">
            100% FREE ENTRY (₹0 FEE) • ONLY 4 MEMBERS
          </div>
        </div>
      </div>
    </section>
  );
}
