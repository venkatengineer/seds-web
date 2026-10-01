import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * MASTER EDITORIAL MISSION SECTION
 * 
 * Target:
 * - Content reveals sequentially as camera settles:
 *   1. Heading appears
 *   2. Supporting paragraph fades in
 *   3. SEDS REC identity dossier appears
 *   4. 4 operational pillars stagger into view (100–250ms apart)
 * - Minimal open UI with clean architectural dividers.
 */

export default function MissionSection({ onNavigate }) {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      id="mission" 
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div 
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16 transition-all duration-800 ease-out"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '100ms',
        }}
      >
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            {SEDS_CONFIG.name} // CHAPTER CHARTER
          </span>
          <h2 className="font-display text-xs tracking-[0.2em] uppercase text-[#A6A0B8]">
            {SEDS_CONFIG.institution} • {SEDS_CONFIG.location}
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#C084FC] uppercase">
          SEDS INDIA OFFICIAL CHAPTER // DIVISION {SEDS_CONFIG.founded}
        </div>
      </div>

      {/* Monumental Statement (Sequence 1 & 2) */}
      <div className="max-w-5xl my-4">
        <h3 
          className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-[#F7F5FF] leading-[0.96] transition-all duration-800 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            filter: inView ? 'blur(0)' : 'blur(8px)',
            transitionDelay: '200ms',
          }}
        >
          <div>SPACE IS NOT</div>
          <div className="text-white/80">JUST TO BE OBSERVED.</div>
          <div className="text-[#8B5CF6] flex items-baseline gap-4">
            <span>IT IS TO BE BUILT.</span>
            <span className="inline-block w-3 h-3 rounded-full bg-[#8B5CF6] opacity-80 shadow-[0_0_15px_#8B5CF6]" />
          </div>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 pt-8 border-t border-white/[0.06]">
          <div 
            className="lg:col-span-7 transition-all duration-800 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(25px)',
              transitionDelay: '350ms',
            }}
          >
            <p className="font-sans text-base sm:text-lg text-[#F7F5FF]/90 font-light leading-relaxed">
              {SEDS_CONFIG.missionStatement}
            </p>
            <p className="font-sans text-sm sm:text-base text-[#A6A0B8] font-light leading-relaxed mt-4">
              As an official university division of the global SEDS network, our student engineers construct sub-orbital rocket avionics, CubeSat payloads, autonomous planetary rover testbeds, and astrodynamic flight code. We organize <strong className="text-[#F7F5FF]">{EVENT_CONFIG.name}</strong> to bring ambitious student builders together for 48 hours of pure engineering.
            </p>
          </div>

          <div 
            className="lg:col-span-5 flex flex-col justify-between border-l border-white/[0.06] pl-0 lg:pl-8 space-y-6 transition-all duration-800 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(25px)',
              transitionDelay: '500ms',
            }}
          >
            <div className="space-y-2">
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">
                ORGANIZATIONAL IDENTITY
              </span>
              <div className="font-editorial text-xl font-bold text-[#F7F5FF]">
                Students for the Exploration and Development of Space
              </div>
              <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed">
                Operating as an autonomous student space community at {SEDS_CONFIG.institution}, bridging interdisciplinary engineering education and real flight hardware execution.
              </p>
            </div>

            <button
              onClick={() => onNavigate('tracks')}
              className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.2em] text-[#F7F5FF] hover:text-[#C084FC] transition-colors"
            >
              <span>Explore Hackathon Tracks ↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Actual Categories: Projects, Research, Outreach, Leadership (Sequence 4: Staggered) */}
      <div className="mt-20 pt-8 border-t border-white/[0.08]">
        <div 
          className="font-display text-xs tracking-[0.25em] uppercase text-[#A6A0B8] mb-8 transition-all duration-600 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transitionDelay: '650ms',
          }}
        >
          SEDS REC CORE OPERATIONAL PILLARS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SEDS_CONFIG.pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className="group space-y-3 transition-all duration-800 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(25px)',
                transitionDelay: `${750 + idx * 150}ms`,
              }}
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-display text-xs tracking-[0.2em] text-[#8B5CF6] font-semibold">
                  0{idx + 1} // {pillar.tag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#8B5CF6] transition-colors" />
              </div>

              <h4 className="font-display text-lg font-bold tracking-tight text-[#F7F5FF] group-hover:text-[#C084FC] transition-colors">
                {pillar.title}
              </h4>

              <p className="font-sans text-xs text-[#A6A0B8] font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
