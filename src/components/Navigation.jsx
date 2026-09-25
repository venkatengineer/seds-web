import React, { useState } from 'react';
import { ArrowUpRight, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';
import { toggleOrbitalAmbiance } from '../utils/audio';

/**
 * MINIMAL DARK SPACE NAVIGATION
 * 
 * Philosophy:
 * - Subtle, quiet, floating typography.
 * - Generous gap, no giant glass panels, no pills, no borders around words.
 * - On hover: Text becomes slightly brighter, a tiny violet light appears.
 * - Active item: Shows subtle location (e.g. 01 / MISSION) with slow breathing light (NO blinking).
 * - Clicking triggers smooth camera travel through space.
 */

const NAV_ITEMS = [
  { id: 'mission', num: '01', label: 'MISSION' },
  { id: 'challenges', num: '02', label: 'CHALLENGES' },
  { id: 'timeline', num: '03', label: 'TIMELINE' },
  { id: 'prizes', num: '04', label: 'PRIZES' },
  { id: 'faq', num: '05', label: 'FAQ' },
];

export default function Navigation({ activeSection, onNavigate, onOpenRegister }) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const active = toggleOrbitalAmbiance();
    setIsAudioActive(active);
  };

  const handleItemClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 lg:px-20 py-6 pointer-events-none transition-all duration-300">
        <div className="w-full flex items-center justify-between pointer-events-auto">
          
          {/* PRIMARY BRAND: SEDS REC */}
          <button
            onClick={() => handleItemClick('hero')}
            className="group flex items-center gap-3 text-left focus:outline-none"
            data-interactive="true"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover:bg-[#C084FC] transition-colors duration-400" />
            <div>
              <div className="font-editorial text-lg sm:text-xl tracking-[0.2em] text-[#F7F5FF] font-bold group-hover:text-white transition-colors">
                {SEDS_CONFIG.name}
              </div>
              <div className="font-mono-tech text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#A6A0B8]">
                {SEDS_CONFIG.institution}
              </div>
            </div>
          </button>

          {/* Clean Horizontal Text Navigation (Spacious, No Pills, Generous Gap) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-11">
            {NAV_ITEMS.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`group relative flex items-center gap-2 font-mono-tech text-xs tracking-[0.22em] uppercase transition-all duration-300 py-1.5 focus:outline-none ${
                    isSelected ? 'text-[#F7F5FF] font-medium' : 'text-[#A6A0B8] hover:text-[#F7F5FF]'
                  }`}
                  data-interactive="true"
                >
                  {/* Subtle active / hover violet indicator dot */}
                  <span 
                    className={`w-1 h-1 rounded-full transition-all duration-400 ${
                      isSelected 
                        ? 'bg-[#8B5CF6] opacity-100 scale-100' 
                        : 'bg-[#C084FC] opacity-0 scale-50 group-hover:opacity-60 group-hover:scale-75'
                    }`} 
                  />

                  {/* Micro index label */}
                  {isSelected && (
                    <span className="text-[9px] text-[#8B5CF6] font-mono-tech tracking-wider">
                      {item.num} /
                    </span>
                  )}

                  <span>{item.label}</span>

                  {/* Underline indicator */}
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#8B5CF6]/70 transition-all duration-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Audio Ambiance Toggle (Restrained, quiet) */}
            <button
              onClick={handleAudioToggle}
              title={isAudioActive ? "Mute Cosmic Ambiance" : "Enable Cosmic Ambiance"}
              className={`p-2 rounded-full border transition-all duration-300 focus:outline-none ${
                isAudioActive
                  ? 'border-[#8B5CF6]/60 bg-[#4C1D95]/20 text-[#C084FC]'
                  : 'border-white/10 bg-[#07030F]/60 text-[#A6A0B8] hover:text-[#F7F5FF] hover:border-white/20'
              }`}
              data-interactive="true"
            >
              {isAudioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            {/* Premium Refined Register Button */}
            <button
              onClick={onOpenRegister}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-[#F7F5FF] hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition-all duration-400 ease-out focus:outline-none"
              data-interactive="true"
            >
              <div className="relative flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-[0.2em] font-medium">
                <span>Register</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-white/10 bg-[#07030F]/70 text-[#F7F5FF] hover:border-white/20 focus:outline-none"
              data-interactive="true"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dark Space Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#020107]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 animate-in fade-in duration-400">
          <div className="border-b border-white/[0.06] pb-4">
            <div className="font-editorial text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
              {SEDS_CONFIG.name}
            </div>
            <div className="font-mono-tech text-[10px] tracking-widest text-[#A6A0B8] uppercase">
              {SEDS_CONFIG.institution}
            </div>
          </div>

          <div className="space-y-4 my-auto">
            {NAV_ITEMS.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="w-full flex items-center justify-between text-left py-2.5 border-b border-white/[0.04]"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono-tech text-xs text-[#8B5CF6]">{item.num}</span>
                    <span className={`font-display text-2xl tracking-tight transition-colors ${
                      isSelected ? 'text-[#C084FC]' : 'text-[#F7F5FF]'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/[0.06] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-mono-tech text-xs uppercase tracking-[0.25em] font-semibold text-center shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Register for {EVENT_CONFIG.name}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
