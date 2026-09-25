import React, { useState } from 'react';
import { ArrowUpRight, X, CheckCircle2 } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * RESTRAINED CHALLENGE CONSTELLATION
 * 
 * Philosophy:
 * - 1 Central Node: ORBITAL 26.
 * - 5 Surrounding Outer Vectors: SPACE, AI, ROBOTICS, CLIMATE, INNOVATION.
 * - Thin, elegant connections.
 * - When selecting a node: Node illuminates softly, connected line brightens, other nodes dim, dossier fades in.
 * - ZERO flashing, zero strobing dash animations.
 */

const CONSTELLATION_NODES = [
  {
    id: 'ai',
    index: '01',
    name: 'AI & AUTONOMY',
    short: 'AI',
    cx: 250,
    cy: 70,
    desc: 'Autonomous deep-space navigation, predictive solar flare transformer models, and lunar/Martian rover hazard traversal.',
    tags: ['Vision Transformers', 'Autonomous Flight', 'Edge AI'],
    prize: '₹15K Grant',
  },
  {
    id: 'space',
    index: '02',
    name: 'SPACE SYSTEMS',
    short: 'SPACE',
    cx: 95,
    cy: 155,
    desc: 'Real-time orbital propagation engines, low-thrust trajectory manifolds, and satellite constellation formation sync.',
    tags: ['Astrodynamics', 'CubeSat Avionics', 'Ephemeris APIs'],
    prize: '₹15K Grant',
  },
  {
    id: 'robotics',
    index: '03',
    name: 'ROBOTICS & MOBILITY',
    short: 'ROBOTICS',
    cx: 405,
    cy: 155,
    desc: 'Surface rover kinematics, multi-agent lunar swarms, and extreme-environment robotic sample acquisition mechanisms.',
    tags: ['Kinematics', 'Swarm Robotics', 'Actuation'],
    prize: '₹15K Grant',
  },
  {
    id: 'climate',
    index: '04',
    name: 'CLIMATE & EARTH OBSERVATION',
    short: 'CLIMATE',
    cx: 125,
    cy: 350,
    desc: 'Hyperspectral satellite atmospheric telemetry, greenhouse gas flux tracking, and orbital wildfire boundary models.',
    tags: ['Remote Sensing', 'GIS Telemetry', 'Spectroscopy'],
    prize: '₹15K Grant',
  },
  {
    id: 'deep-compute',
    index: '05',
    name: 'DEEP SPACE TELEMETRY',
    short: 'TELEMETRY',
    cx: 375,
    cy: 350,
    desc: 'Sub-nanowatt optical transceivers, delay-tolerant mesh networking protocols, and quantum key distribution.',
    tags: ['Optical Comms', 'DTN Protocols', 'DSP'],
    prize: '₹15K Grant',
  },
];

export default function ChallengesSection({ onOpenRegister }) {
  const [activeNodeId, setActiveNodeId] = useState(CONSTELLATION_NODES[0].id);
  const [modalNode, setModalNode] = useState(null);

  const activeNode = CONSTELLATION_NODES.find((n) => n.id === activeNodeId) || CONSTELLATION_NODES[0];

  return (
    <section 
      id="challenges" 
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 z-20 select-none overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-dark-b pb-6 mb-12">
        <div>
          <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-[#8B5CF6] block mb-1">
            // {SEDS_CONFIG.name} CONSTELLATION
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            CHALLENGE TAXONOMY.
          </h2>
        </div>
        <div className="font-mono-tech text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          5 ORBITAL VECTORS // 1 CENTRAL EVENT
        </div>
      </div>

      {/* Main Grid: Left Constellation Arena + Right Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Constellation Visual Arena */}
        <div className="lg:col-span-7 relative h-[440px] sm:h-[520px] flex items-center justify-center rounded-2xl border border-white/[0.06] bg-[#07030F]/40 backdrop-blur-md p-6 overflow-hidden">
          
          {/* Subtle concentric reference tracks */}
          <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.03]" />
          <div className="absolute w-[340px] h-[340px] rounded-full border border-white/[0.02]" />

          {/* SVG Constellation Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 440">
            {/* Center to Node Radial Vectors */}
            {CONSTELLATION_NODES.map((node) => {
              const isConnected = activeNodeId === node.id;
              return (
                <line
                  key={`ray-${node.id}`}
                  x1="250"
                  y1="220"
                  x2={node.cx}
                  y2={node.cy}
                  stroke={isConnected ? '#8B5CF6' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={isConnected ? 1.4 : 0.75}
                  className="transition-colors duration-400 ease-out"
                />
              );
            })}

            {/* Outer Inter-Node Structural Connections */}
            <line x1="250" y1="70" x2="95" y2="155" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.75" />
            <line x1="250" y1="70" x2="405" y2="155" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.75" />
            <line x1="95" y1="155" x2="125" y2="350" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.75" />
            <line x1="405" y1="155" x2="375" y2="350" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.75" />
            <line x1="125" y1="350" x2="375" y2="350" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.75" strokeDasharray="3 8" />
          </svg>

          {/* Central Event Epicenter (ORBITAL 26) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none z-10">
            <div className="relative w-14 h-14 rounded-full border border-[#8B5CF6]/50 bg-[#07030F] flex items-center justify-center shadow-[0_0_25px_rgba(109,40,217,0.3)]">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
              </div>
            </div>
            
            <div className="mt-2 font-display text-xs font-semibold tracking-wider text-[#F7F5FF]">
              {EVENT_CONFIG.name}
            </div>
            <div className="font-mono-tech text-[8px] uppercase tracking-widest text-[#A6A0B8]">
              CENTRAL EPICENTER
            </div>
          </div>

          {/* 5 Outer Vector Nodes */}
          {CONSTELLATION_NODES.map((node) => {
            const isSelected = activeNodeId === node.id;
            const isDimmed = activeNodeId !== null && !isSelected;

            return (
              <button
                key={node.id}
                onMouseEnter={() => setActiveNodeId(node.id)}
                onClick={() => setModalNode(node)}
                className={`absolute group transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 p-2 rounded-full transition-all duration-400 ease-out focus:outline-none ${
                  isSelected 
                    ? 'scale-115 z-30 opacity-100' 
                    : isDimmed 
                    ? 'opacity-35 hover:opacity-100 z-10' 
                    : 'opacity-80 z-20'
                }`}
                style={{
                  left: `${(node.cx / 500) * 100}%`,
                  top: `${(node.cy / 440) * 100}%`,
                }}
                data-interactive="true"
              >
                <span className="relative flex items-center justify-center w-5 h-5">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-[#C084FC] shadow-[0_0_12px_#8B5CF6]' : 'bg-[#8B5CF6]'
                    }`}
                  />
                  <span
                    className={`absolute inset-0 rounded-full border transition-all duration-400 ${
                      isSelected ? 'border-[#8B5CF6] scale-125' : 'border-transparent group-hover:border-white/20'
                    }`}
                  />
                </span>

                <span
                  className={`font-mono-tech text-[9px] uppercase tracking-wider transition-colors duration-300 ${
                    isSelected ? 'text-[#F7F5FF] font-medium' : 'text-[#A6A0B8] group-hover:text-[#F7F5FF]'
                  }`}
                >
                  {node.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Challenge Dossier Panel */}
        <div className="lg:col-span-5 p-8 rounded-2xl border border-white/[0.06] bg-[#07030F]/60 backdrop-blur-md flex flex-col justify-between min-h-[440px] sm:min-h-[520px] h-auto transition-all duration-400">
          <div>
            <div className="flex items-center justify-between pb-4 hairline-dark-b mb-6">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#8B5CF6]">
                VECTOR {activeNode.index} // CONSTELLATION
              </span>
              <span className="px-2.5 py-0.5 rounded-full border border-white/10 font-mono-tech text-[9px] text-[#C084FC] uppercase tracking-wider">
                {activeNode.prize}
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F5FF] mb-4">
              {activeNode.name}
            </h3>

            <p className="font-sans text-sm text-[#A6A0B8] font-light leading-relaxed mb-6">
              {activeNode.desc}
            </p>

            <div className="space-y-2">
              <div className="font-mono-tech text-[9px] tracking-widest uppercase text-[#A6A0B8]">
                // PRIMARY TECHNICAL STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-xs font-mono-tech text-[#F7F5FF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 hairline-dark-t flex items-center justify-between">
            <button
              onClick={() => setModalNode(activeNode)}
              className="font-mono-tech text-xs uppercase tracking-wider text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
            >
              Read Specification ↗
            </button>

            <button
              onClick={onOpenRegister}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-[#F7F5FF] font-mono-tech text-xs uppercase tracking-widest font-medium hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              Deploy Vector
            </button>
          </div>
        </div>
      </div>

      {/* Modal Specification View */}
      {modalNode && (
        <div className="fixed inset-0 z-50 bg-[#020107]/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="relative max-w-lg w-full p-8 rounded-2xl border border-white/10 bg-[#07030F] space-y-6">
            <button
              onClick={() => setModalNode(null)}
              className="absolute top-6 right-6 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <span className="font-mono-tech text-[10px] text-[#8B5CF6] tracking-widest uppercase">
                SPECIFICATION // VECTOR {modalNode.index}
              </span>
              <h4 className="font-editorial text-2xl font-bold text-[#F7F5FF]">
                {modalNode.name}
              </h4>
            </div>

            <p className="font-sans text-sm text-[#A6A0B8] font-light leading-relaxed">
              {modalNode.desc} Participants will be evaluated on architectural rigour, algorithmic fidelity, and reproducible telemetry verification.
            </p>

            <div className="space-y-2">
              <div className="font-mono-tech text-[9px] uppercase tracking-widest text-[#A6A0B8]">
                // BENCHMARK REQUIREMENTS
              </div>
              <ul className="space-y-1.5 text-xs text-[#F7F5FF] font-light">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#8B5CF6]" />
                  <span>Real-time or simulated telemetry streaming</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#8B5CF6]" />
                  <span>Open-source reproducibility guidelines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#8B5CF6]" />
                  <span>Aerospace domain validation documentation</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setModalNode(null);
                onOpenRegister();
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-mono-tech text-xs uppercase tracking-widest font-semibold text-center"
            >
              Register for this Track
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
