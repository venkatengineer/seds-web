import React, { useState, useEffect, useRef } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * RESTRAINED ORBITAL TRAJECTORY TIMELINE
 * 
 * Philosophy:
 * - One curved orbital trajectory visualization.
 * - 4 interactive mission stages: 01 DISCOVER, 02 BUILD, 03 CREATE, 04 LAUNCH.
 * - A small luminous violet object travels along the path.
 * - Zero overlap: Clean sequential vertical flow (Trajectory -> 4 Stage Cards -> Active Dossier).
 */

const STAGES = [
  {
    id: 'discover',
    index: '01',
    title: 'DISCOVER',
    epoch: 'PHASE 01 // T+00:00',
    time: 'FRIDAY 18:00 IST',
    desc: 'SEDS REC flight directors deliver the opening mission briefing, problem statements unlock, and GPU cluster access is provisioned.',
    progress: 0.12,
  },
  {
    id: 'build',
    index: '02',
    title: 'BUILD',
    epoch: 'PHASE 02 // T+12:00',
    time: 'SATURDAY 06:00 IST',
    desc: 'Core algorithm formulation, mathematical orbital mechanics solvers compiled, and architecture reviews with aerospace mentors.',
    progress: 0.38,
  },
  {
    id: 'create',
    index: '03',
    title: 'CREATE',
    epoch: 'PHASE 03 // T+30:00',
    time: 'SATURDAY 24:00 IST',
    desc: 'Telemetry integration, radiation noise stress tests, and dry-run deployment on SEDS orbital testbeds.',
    progress: 0.68,
  },
  {
    id: 'launch',
    index: '04',
    title: 'LAUNCH',
    epoch: 'PHASE 04 // T+48:00',
    time: 'SUNDAY 18:00 IST',
    desc: 'Final code repository freeze, live public system demonstration to SEDS jury, and grand award ceremony.',
    progress: 0.94,
  },
];

export default function TimelineSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [particleCoord, setParticleCoord] = useState({ x: 120, y: 110 });
  const pathRef = useRef(null);

  const activeStage = STAGES[activeStageIndex];

  // Update physical coordinates along SVG curve
  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const targetLength = totalLength * activeStage.progress;
    const point = path.getPointAtLength(targetLength);
    setParticleCoord({ x: point.x, y: point.y });
  }, [activeStageIndex]);

  return (
    <section 
      id="timeline" 
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 z-20 select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-dark-b pb-6 mb-12">
        <div>
          <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-[#8B5CF6] block mb-1">
            // {SEDS_CONFIG.name} FLIGHT HORIZON
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            ORBITAL TRAJECTORY.
          </h2>
        </div>
        <div className="font-mono-tech text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          {EVENT_CONFIG.name} // 4 MISSION STAGES
        </div>
      </div>

      {/* Main Container with Clean Sequential Flow */}
      <div className="w-full max-w-5xl mx-auto space-y-8">
        
        {/* 1. Curved SVG Trajectory Curve (Isolated in its own container with clear bounds) */}
        <div className="relative w-full h-[140px] sm:h-[180px] pointer-events-none">
          <svg 
            className="w-full h-full overflow-visible" 
            viewBox="0 0 900 180" 
            preserveAspectRatio="none"
          >
            {/* Background Base Trajectory */}
            <path
              d="M 60 150 C 260 20, 560 170, 840 40"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
            />

            {/* Active Trajectory Segment */}
            <path
              ref={pathRef}
              d="M 60 150 C 260 20, 560 170, 840 40"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2.4"
              strokeDasharray="1000"
              strokeDashoffset={1000 - activeStage.progress * 1000}
              className="transition-all duration-600 ease-out"
            />

            {/* Traveling Luminous Violet Object */}
            <g 
              className="transition-all duration-600 ease-out" 
              transform={`translate(${particleCoord.x}, ${particleCoord.y})`}
            >
              <circle r="18" fill="rgba(139, 92, 246, 0.18)" />
              <circle r="7" fill="none" stroke="#C084FC" strokeWidth="1.2" />
              <circle r="3" fill="#F7F5FF" />
            </g>
          </svg>
        </div>

        {/* 2. 4 Interactive Stage Markers (Clean Grid, Fully Separated from SVG and Dossier) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`relative p-5 rounded-2xl border transition-all duration-400 ease-out text-left focus:outline-none ${
                  isActive
                    ? 'border-[#8B5CF6] bg-[#0B0615] scale-[1.02] z-20 opacity-100 shadow-[0_0_25px_rgba(109,40,217,0.25)]'
                    : 'border-white/[0.06] bg-[#07030F]/40 hover:border-white/20 opacity-60 hover:opacity-95 z-10'
                }`}
                data-interactive="true"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono-tech text-[10px] tracking-[0.25em] uppercase ${
                    isActive ? 'text-[#8B5CF6]' : 'text-[#A6A0B8]'
                  }`}>
                    {stage.index} // {stage.id.toUpperCase()}
                  </span>

                  <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#C084FC]' : 'bg-white/15'
                  }`} />
                </div>

                <div className="font-editorial text-lg sm:text-2xl font-bold tracking-tight text-[#F7F5FF] mb-1">
                  {stage.title}
                </div>

                <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[#A6A0B8]">
                  {stage.time}
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. Active Stage Detailed Dossier (Cleanly positioned beneath stage cards) */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#07030F]/60 backdrop-blur-md p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="font-mono-tech text-xs tracking-widest text-[#8B5CF6] uppercase font-semibold">
                {activeStage.epoch}
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono-tech text-xs text-[#A6A0B8] uppercase">
                {activeStage.time}
              </span>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#F7F5FF]/90 font-light leading-relaxed">
              {activeStage.desc}
            </p>
          </div>

          <div className="font-mono-tech text-xs text-[#A6A0B8] shrink-0">
            Phase 0{activeStageIndex + 1} of 04 // SEDS Flight Trajectory
          </div>
        </div>
      </div>
    </section>
  );
}
