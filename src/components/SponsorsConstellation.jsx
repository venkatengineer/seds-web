import React, { useState } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * RESTRAINED ORBITAL ALLIANCE SYSTEM
 * 
 * Philosophy:
 * - 2 Clean Concentric Orbital Paths.
 * - Deep space dark palette, thin hairline connections.
 * - Smooth hover reveals partner grants and research dossiers.
 * - ZERO flashing, ZERO rapid pulsing.
 */

const SPONSORS = [
  // Inner Orbit
  {
    id: 'seds-india',
    name: 'SEDS INDIA',
    tier: 'NATIONAL CHAPTER NETWORK',
    orbit: 'inner',
    angle: 45,
    domain: 'Student Space Exploration Alliance',
    grant: 'National Space Fellowships & Publication Grants',
  },
  {
    id: 'rec-rnd',
    name: 'REC R&D CELL',
    tier: 'HOST INSTITUTION',
    orbit: 'inner',
    angle: 135,
    domain: 'Rajalakshmi Engineering College',
    grant: 'Campus Avionics Labs & Prototyping Infrastructure',
  },
  {
    id: 'isro-alumni',
    name: 'ISRO ALUMNI NETWORK',
    tier: 'RESEARCH MENTORSHIP',
    orbit: 'inner',
    angle: 225,
    domain: 'Propulsion & Flight Guidance Advisory',
    grant: 'Direct Technical Review & Jury Deliberation',
  },
  {
    id: 'cosmic-gpu',
    name: 'APOGEE COMPUTE',
    tier: 'GPU CLOUD PATRON',
    orbit: 'inner',
    angle: 315,
    domain: 'Distributed H100 Accelerators',
    grant: '$120,000 Direct GPU Credits for Finalists',
  },

  // Outer Orbit
  {
    id: 'deep-attenuate',
    name: 'DEEP ATTENUATE',
    tier: 'TELEMETRY LABS',
    orbit: 'outer',
    angle: 20,
    domain: 'Optical Communications & DSP',
    grant: 'Delay-Tolerant Testbed Hardware Access',
  },
  {
    id: 'kepler-ai',
    name: 'KEPLER DYNAMICS',
    tier: 'ASTRODYNAMICS VECTOR',
    orbit: 'outer',
    angle: 100,
    domain: 'Autonomous Spacecraft Attitude Control',
    grant: 'Real-time Ephemeris & Conjunction APIs',
  },
  {
    id: 'zenith-robotics',
    name: 'ZENITH SYSTEMS',
    tier: 'SURFACE ROBOTICS',
    orbit: 'outer',
    angle: 180,
    domain: 'Lunar Rover Mobility Kinematics',
    grant: 'Actuation & Swarm Simulation Licenses',
  },
  {
    id: 'helios-lab',
    name: 'HELIOS ENERGY',
    tier: 'SOLAR HELIOPHYSICS',
    orbit: 'outer',
    angle: 260,
    domain: 'Space Solar Power Beaming',
    grant: 'Coronal Mass Ejection Research Datasets',
  },
];

export default function SponsorsConstellation() {
  const [hoveredSponsor, setHoveredSponsor] = useState(SPONSORS[0]);

  return (
    <section 
      id="sponsors" 
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 z-20 select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-dark-b pb-6 mb-16">
        <div>
          <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-[#8B5CF6] block mb-1">
            // PATRONS & CHAPTER ALLIANCES
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            ORBITAL ALLIANCES.
          </h2>
        </div>
        <div className="font-mono-tech text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          {SEDS_CONFIG.name} × {EVENT_CONFIG.name}
        </div>
      </div>

      {/* Controlled Orbital Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: 2-Orbit Geometrical Map (7 Cols) */}
        <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] flex items-center justify-center rounded-2xl border border-white/[0.06] bg-[#07030F]/40 backdrop-blur-md p-6 overflow-hidden">
          
          {/* Concentric Orbital Reference Paths */}
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/[0.04]" />
          <div className="absolute w-[410px] h-[410px] rounded-full border border-white/[0.02]" />

          {/* SVG connecting lines to center */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
            {SPONSORS.map((s) => {
              const rad = (s.angle * Math.PI) / 180;
              const r = s.orbit === 'inner' ? 140 : 205;
              const x = 250 + r * Math.cos(rad);
              const y = 250 + r * Math.sin(rad);
              const isHovered = hoveredSponsor?.id === s.id;

              return (
                <line
                  key={s.id}
                  x1="250"
                  y1="250"
                  x2={x}
                  y2={y}
                  stroke={isHovered ? '#8B5CF6' : 'rgba(255, 255, 255, 0.05)'}
                  strokeWidth={isHovered ? 1.4 : 0.75}
                  className="transition-colors duration-300"
                />
              );
            })}
          </svg>

          {/* Central SEDS Hub */}
          <div className="relative z-10 w-12 h-12 rounded-full border border-[#8B5CF6]/50 bg-[#07030F] flex items-center justify-center text-center shadow-[0_0_20px_rgba(109,40,217,0.3)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
          </div>

          {/* Controlled Sponsor Nodes */}
          {SPONSORS.map((s) => {
            const rad = (s.angle * Math.PI) / 180;
            const r = s.orbit === 'inner' ? 135 : 195;
            const x = r * Math.cos(rad);
            const y = r * Math.sin(rad);
            const isHovered = hoveredSponsor?.id === s.id;

            return (
              <button
                key={s.id}
                onMouseEnter={() => setHoveredSponsor(s)}
                onClick={() => setHoveredSponsor(s)}
                className={`absolute group transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 p-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  isHovered ? 'scale-115 z-20 opacity-100' : 'opacity-60 hover:opacity-100 z-10'
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                data-interactive="true"
              >
                <span className="relative flex items-center justify-center w-4 h-4">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isHovered ? 'bg-[#C084FC] shadow-[0_0_10px_#8B5CF6]' : 'bg-[#8B5CF6]'
                    }`}
                  />
                </span>

                <span
                  className={`font-mono-tech text-[8px] uppercase tracking-wider transition-colors duration-300 ${
                    isHovered ? 'text-[#F7F5FF] font-medium' : 'text-[#A6A0B8]'
                  }`}
                >
                  {s.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Partner Detail Dossier (5 Cols) */}
        <div className="lg:col-span-5 p-8 rounded-2xl border border-white/[0.06] bg-[#07030F]/60 backdrop-blur-md flex flex-col justify-between min-h-[420px] sm:min-h-[480px] h-auto">
          <div>
            <div className="flex items-center justify-between pb-4 hairline-dark-b mb-6">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#8B5CF6]">
                // {hoveredSponsor.tier}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F5FF] mb-2">
              {hoveredSponsor.name}
            </h3>

            <div className="font-mono-tech text-xs text-[#A6A0B8] mb-6">
              {hoveredSponsor.domain}
            </div>

            <div className="space-y-2 p-5 rounded-xl border border-white/[0.04] bg-white/[0.01]">
              <div className="font-mono-tech text-[9px] uppercase tracking-widest text-[#8B5CF6]">
                // RESOURCE PROVISION TO FINALISTS
              </div>
              <p className="font-sans text-sm text-[#F7F5FF]/90 font-light leading-relaxed">
                {hoveredSponsor.grant}
              </p>
            </div>
          </div>

          <div className="pt-6 hairline-dark-t flex items-center justify-between font-mono-tech text-xs text-[#A6A0B8]">
            <span>SEDS CHAPTER PARTNER</span>
            <span className="text-[#C084FC]">VERIFIED ALLIANCE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
