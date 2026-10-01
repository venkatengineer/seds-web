import React, { useState, useEffect, useRef } from 'react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';
import { ArrowUpRight } from 'lucide-react';

/**
 * SEDS REC IDENTITY SECTION
 * 
 * Target:
 * - Headline: STUDENTS. BUILDERS. EXPLORERS.
 * - Subhead: "Students are building the future of space."
 * - Large authentic documentary photography (/images/team/students_lab.jpg) with cinematic mask reveal.
 * - Operational pillars: Projects, Research, Events, Outreach.
 */

const PILLARS_DETAIL = [
  {
    id: 'projects',
    title: 'PROJECTS & HARDWARE',
    tag: 'HANDS-ON FLIGHT SYSTEMS',
    desc: 'Students design, machine, assemble, and test real aerospace systems. From PCB layout of sub-orbital avionics and CubeSat bus backplanes to solid rocket motor static fire test stands, our teams build flight-ready hardware in the laboratory.',
  },
  {
    id: 'research',
    title: 'RESEARCH & COMPUTATION',
    tag: 'THEORETICAL & APPLIED ASTRODYNAMICS',
    desc: 'Beyond hardware fabrication, SEDS REC students author papers on low-thrust orbital mechanics, N-body gravitational perturbation models, aerodynamic simulations, and computer vision for autonomous planetary surface navigation.',
  },
  {
    id: 'events',
    title: 'EVENTS & SPRINT HACKATHONS',
    tag: 'INTENSIVE TECHNICAL CONVENING',
    desc: `Organizers and hosts of ${EVENT_CONFIG.name}, university avionics soldering bootcamps, high-altitude meteorological balloon launches, and rocketry recovery workshops that gather hundreds of student engineers from across the country.`,
  },
  {
    id: 'outreach',
    title: 'OUTREACH & EDUCATION',
    tag: 'COMMUNITY IMPACT',
    desc: 'Democratizing space technology through public stargazing sessions, hands-on model rocketry sessions for high school students, and open-source aerospace software libraries distributed freely to aspiring young engineers.',
  },
];

export default function IdentitySection({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('projects');
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const currentPillar = PILLARS_DETAIL.find((p) => p.id === activeTab) || PILLARS_DETAIL[0];

  return (
    <section 
      id="identity" 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 overflow-hidden"
    >
      {/* Top Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // SEDS REC DIVISION IDENTITY
          </span>
          <h2 className="font-display text-xs tracking-[0.2em] uppercase text-[#A6A0B8]">
            RAJALAKSHMI ENGINEERING COLLEGE // STUDENT SPACE DIVISION
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#C084FC] uppercase">
          STUDENT SPACE EXPLORATION
        </div>
      </div>

      {/* Main Grid: Left Headline & Content + Right Authentic Lab Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column (5 Cols): Typography & Story */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="font-display text-xs uppercase tracking-[0.25em] text-[#8B5CF6] font-semibold block mb-2">
              WHO WE ARE
            </span>
            <h3 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F5FF] leading-[0.95]">
              <div>STUDENTS.</div>
              <div className="text-white/85">BUILDERS.</div>
              <div className="text-[#8B5CF6]">EXPLORERS.</div>
            </h3>
            <p className="font-display text-base sm:text-lg text-[#F7F5FF] font-medium tracking-tight mt-6">
              Students are building the future of space.
            </p>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#A6A0B8] font-light leading-relaxed">
            SEDS REC is not a fictional corporation or a concept project. We are an active collegiate chapter of Students for the Exploration and Development of Space at {SEDS_CONFIG.institution}. We believe the only way to truly understand aerospace is to design, machine, write code for, and launch real physical hardware.
          </p>

          {/* Interactive Pillars Selector */}
          <div className="space-y-2 pt-4 border-t border-white/[0.08]">
            <span className="font-display text-[10px] tracking-[0.25em] uppercase text-[#A6A0B8] block mb-3">
              EXPLORE OUR OPERATIONS:
            </span>
            <div className="flex flex-wrap gap-2">
              {PILLARS_DETAIL.map((pillar) => {
                const isActive = activeTab === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveTab(pillar.id)}
                    className={`px-4 py-2 rounded-full font-display text-xs uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none ${
                      isActive
                        ? 'border border-[#8B5CF6] bg-[#4C1D95]/30 text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                        : 'border border-white/10 text-[#A6A0B8] hover:text-[#F7F5FF] hover:border-white/20'
                    }`}
                  >
                    {pillar.title.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Brief */}
            <div className="mt-6 pt-4 space-y-2">
              <div className="font-display text-xs text-[#8B5CF6] uppercase tracking-[0.2em] font-semibold">
                // {currentPillar.tag}
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#F7F5FF]/90 font-light leading-relaxed">
                {currentPillar.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Documentary Photograph with Cinematic Image Mask */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#07030F] shadow-[0_20px_60px_rgba(0,0,0,0.6)] group"
            style={{
              clipPath: isRevealed ? 'inset(0% 0% 0% 0% round 1rem)' : 'inset(6% 6% 6% 6% round 1rem)',
              filter: isRevealed ? 'blur(0px) brightness(1)' : 'blur(10px) brightness(0.6)',
              transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s ease-out',
            }}
          >
            <div className="relative overflow-hidden w-full">
              <img 
                src="/images/team/students_lab.jpg" 
                alt="SEDS REC Student Engineering Team in Space Robotics and Satellite Workshop at Rajalakshmi Engineering College" 
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Subtle Vignette Gradient for Desktop Overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#020107] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
            
            {/* Caption: Non-overlapping normal flow below picture on mobile; cinematic absolute overlay on md+ */}
            <div className="p-5 sm:p-6 md:p-8 md:absolute md:bottom-0 md:left-0 md:right-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/[0.08] md:border-t-0 bg-[#07030F] md:bg-transparent z-10">
              <div>
                <span className="font-display text-[10px] tracking-[0.25em] uppercase text-[#8B5CF6] font-semibold block mb-1">
                  DOCUMENTARY PHOTOGRAPHY
                </span>
                <div className="font-display text-sm sm:text-base font-medium text-[#F7F5FF]">
                  Student Space Robotics & Satellite Technology Lab
                </div>
                <div className="font-sans text-xs text-[#A6A0B8] mt-0.5">
                  Rajalakshmi Engineering College // SEDS REC Chapter
                </div>
              </div>

              <button
                onClick={() => onNavigate('tracks')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-[#020107]/80 backdrop-blur-md text-xs font-display uppercase tracking-wider text-white hover:border-[#8B5CF6] transition-colors self-start sm:self-auto shrink-0"
              >
                <span>View Hackathon Tracks</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Sub-strip with authentic student engineering metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06] text-[#A6A0B8] font-display text-[11px] tracking-wider uppercase">
            <div>
              <span className="text-[#8B5CF6] block text-base font-bold">100%</span>
              <span>Student Engineered</span>
            </div>
            <div>
              <span className="text-[#8B5CF6] block text-base font-bold">4+</span>
              <span>Hardware Platforms</span>
            </div>
            <div>
              <span className="text-[#8B5CF6] block text-base font-bold">REC</span>
              <span>Campus Labs</span>
            </div>
            <div>
              <span className="text-[#8B5CF6] block text-base font-bold">SEDS</span>
              <span>India Network</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
