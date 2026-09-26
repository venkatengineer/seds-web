import React, { useState, useEffect, useRef } from 'react';
import { EVENT_CONFIG } from '../config/event';

/**
 * ELEGANT ORBITAL TRAJECTORY TIMELINE
 * 
 * Philosophy:
 * - One trajectory.
 * - One luminous object.
 * - Four stages: DISCOVER, BUILD, CREATE, LAUNCH.
 * - No card grid. No giant bordered boxes.
 * - Clean editorial timeline flow.
 */

export default function TimelineSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [particleCoord, setParticleCoord] = useState({ x: 80, y: 130 });
  const pathRef = useRef(null);

  const stages = EVENT_CONFIG.timeline;
  const currentStage = stages[activeStageIndex];
  const progressWeights = [0.12, 0.38, 0.68, 0.94];

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const targetLength = totalLength * progressWeights[activeStageIndex];
    const point = path.getPointAtLength(targetLength);
    setParticleCoord({ x: point.x, y: point.y });
  }, [activeStageIndex]);

  return (
    <section 
      id="timeline" 
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // ORBITAL FLIGHT TRAJECTORY
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            MISSION STAGES.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          48-HOUR SPRINT SEQUENCE
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-12">
        
        {/* 1. Single Elegant Orbital Trajectory Curve */}
        <div className="relative w-full h-[120px] sm:h-[150px] pointer-events-none">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 900 150"
            preserveAspectRatio="none"
          >
            {/* Base Background Path */}
            <path
              d="M 50 120 C 260 15, 600 135, 850 30"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
            />

            {/* Active Luminous Path Segment */}
            <path
              ref={pathRef}
              d="M 50 120 C 260 15, 600 135, 850 30"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2.2"
              strokeDasharray="1000"
              strokeDashoffset={1000 - progressWeights[activeStageIndex] * 1000}
              className="transition-all duration-700 ease-out"
            />

            {/* Traveling Luminous Object */}
            <g
              className="transition-all duration-700 ease-out"
              transform={`translate(${particleCoord.x}, ${particleCoord.y})`}
            >
              <circle r="16" fill="rgba(139, 92, 246, 0.22)" />
              <circle r="6" fill="none" stroke="#C084FC" strokeWidth="1.5" />
              <circle r="2.5" fill="#F7F5FF" />
            </g>
          </svg>
        </div>

        {/* 2. Four Stage Clickable Markers (Clean open layout, NO CARDS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/[0.08]">
          {stages.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stage.stage}
                onClick={() => setActiveStageIndex(idx)}
                className="group text-left space-y-2 focus:outline-none transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? 'bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]' : 'bg-white/20 group-hover:bg-white/50'
                  }`} />
                  <span className={`font-display text-xs tracking-[0.2em] uppercase ${
                    isActive ? 'text-[#8B5CF6] font-semibold' : 'text-[#A6A0B8]'
                  }`}>
                    STAGE {stage.stage}
                  </span>
                </div>

                <div className={`font-editorial text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                  isActive ? 'text-white' : 'text-[#A6A0B8] group-hover:text-[#F7F5FF]'
                }`}>
                  {stage.title}
                </div>

                <div className="font-display text-[11px] text-[#A6A0B8] uppercase tracking-wider">
                  {stage.time}
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. Active Stage Content Reveal (Clean Editorial Display, NO Giant Box) */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-baseline justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="font-display text-xs uppercase tracking-[0.2em] text-[#C084FC] font-semibold">
              // {currentStage.tagline}
            </div>
            <p className="font-sans text-base sm:text-lg text-[#F7F5FF]/90 font-light leading-relaxed">
              {currentStage.desc}
            </p>
          </div>

          <div className="font-display text-xs text-[#A6A0B8] shrink-0 tracking-wider">
            T+ PHASE {currentStage.stage} OF 04 // FLIGHT PROTOCOL
          </div>
        </div>
      </div>
    </section>
  );
}
