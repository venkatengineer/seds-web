import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

export default function Footer({ onNavigate, onOpenRegister }) {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full z-20 hairline-dark-t bg-[#020107] pt-20 pb-12 px-6 sm:px-12 lg:px-20 text-[#A6A0B8] select-none">
      
      {/* Top Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 hairline-dark-b">
        
        {/* Brand & Chapter Lineage */}
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span className="font-editorial text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
                {SEDS_CONFIG.name}
              </span>
            </div>
            <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[#8B5CF6]">
              {SEDS_CONFIG.tagline}
            </div>
            <div className="font-mono-tech text-[10px] text-[#A6A0B8] uppercase">
              {SEDS_CONFIG.institution} • {SEDS_CONFIG.location}
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm font-sans font-light text-[#A6A0B8] leading-relaxed">
            Advancing empirical space exploration, satellite hardware, and computational rocketry. 
            Host organization of <strong className="text-[#F7F5FF]">{EVENT_CONFIG.name}</strong> space innovation sprint.
          </p>

          <div className="pt-2 font-mono-tech text-[11px] text-[#F7F5FF]">
            FLIGHT CLOCK: <span className="text-[#8B5CF6]">{utcTime || 'SYNCHRONIZING...'}</span>
          </div>
        </div>

        {/* Directory Column */}
        <div className="space-y-3 font-mono-tech text-xs tracking-wider uppercase">
          <div className="text-[10px] tracking-[0.25em] text-[#F7F5FF] font-semibold mb-4">
            // FLIGHT DIRECTORY
          </div>
          <div>
            <button onClick={() => onNavigate('mission')} className="hover:text-[#F7F5FF] transition-colors">
              01 — SEDS Mission
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('challenges')} className="hover:text-[#F7F5FF] transition-colors">
              02 — Constellation Tracks
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('timeline')} className="hover:text-[#F7F5FF] transition-colors">
              03 — Flight Trajectory
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('countdown')} className="hover:text-[#F7F5FF] transition-colors">
              04 — Launch Countdown
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('prizes')} className="hover:text-[#F7F5FF] transition-colors">
              05 — Prize Monuments
            </button>
          </div>
        </div>

        {/* Chapter Directives */}
        <div className="space-y-3 font-mono-tech text-xs tracking-wider uppercase">
          <div className="text-[10px] tracking-[0.25em] text-[#F7F5FF] font-semibold mb-4">
            // PROTOCOLS
          </div>
          <div>
            <span className="hover:text-[#F7F5FF] cursor-pointer">
              SEDS India Charter Directives
            </span>
          </div>
          <div>
            <span className="hover:text-[#F7F5FF] cursor-pointer">
              Open Space Research Standards
            </span>
          </div>
          <div>
            <span className="hover:text-[#F7F5FF] cursor-pointer">
              Codebase Integrity Protocols
            </span>
          </div>
          <div>
            <button onClick={onOpenRegister} className="text-[#8B5CF6] hover:text-[#C084FC] transition-colors">
              Register Manifest ↗
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal Baseline */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[10px] text-[#A6A0B8]/60">
        <div>
          © 2026 {SEDS_CONFIG.name} // RAJALAKSHMI ENGINEERING COLLEGE. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <span>COORDINATES: 13.0082° N, 80.0034° E</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
          >
            <span>APEX</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
