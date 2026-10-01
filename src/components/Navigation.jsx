import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Volume2, VolumeX, Menu, X, RotateCcw } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';
import { toggleOrbitalAmbiance } from '../utils/audio';

/**
 * PREMIUM MINIMAL EDITORIAL NAVIGATION
 * 
 * Target:
 * - Hidden during boot sequence. Fades in only after Hero completes (Phase 7).
 * - Left: SEDS REC (subtle, refined).
 * - Center: MISSION | IDENTITY | PROJECTS | CHALLENGES | TIMELINE | PRIZES | FAQ
 * - Right: Replay Boot button + Audio Ambiance + REGISTER
 * - On hover: subtle violet light, smooth underline. No glowing boxes.
 */

const NAV_LINKS = [
  { id: 'mission', label: 'MISSION' },
  { id: 'identity', label: 'IDENTITY' },
  { id: 'tracks', label: 'TRACKS' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'prizes', label: 'WHY PARTICIPATE' },
  { id: 'faq', label: 'FAQ' },
];

export default function Navigation({ 
  activeSection, 
  onNavigate, 
  onOpenRegister, 
  bootPhase = 13,
  onReplayBoot,
}) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const active = toggleOrbitalAmbiance();
    setIsAudioActive(active);
  };

  const handleLinkClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isNavVisible = bootPhase >= 13;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 lg:px-16 py-4 pointer-events-none transition-all duration-300 ease-out ${
          isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        } ${
          isScrolled 
            ? 'bg-[#020107]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.6)]' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full flex items-center justify-between pointer-events-auto">
          
          {/* Left: SEDS REC Identity */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="group flex flex-col text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] group-hover:bg-[#C084FC] transition-colors" />
              <span className="font-editorial text-base sm:text-lg font-bold tracking-[0.2em] text-[#F7F5FF] group-hover:text-white transition-colors">
                {SEDS_CONFIG.name}
              </span>
            </div>
            <span className="pl-4 font-display text-[9px] uppercase tracking-[0.16em] text-[#A6A0B8]">
              {SEDS_CONFIG.institution}
            </span>
          </button>

          {/* Center: Minimal Text Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            {NAV_LINKS.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative group font-display text-xs tracking-[0.22em] uppercase transition-colors duration-300 py-1 focus:outline-none ${
                    isSelected ? 'text-[#F7F5FF] font-medium' : 'text-[#A6A0B8] hover:text-[#F7F5FF]'
                  }`}
                >
                  <span>{item.label}</span>
                  
                  {/* Subtle underline on hover & active */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#8B5CF6] transition-all duration-300 ${
                      isSelected ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-70 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right: Audio Ambiance & Register */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Replay Cinematic Boot */}
            {onReplayBoot && (
              <button
                onClick={onReplayBoot}
                title="Replay Cinematic Boot Experience"
                className="p-2 rounded-full border border-white/10 bg-transparent text-[#A6A0B8] hover:text-[#F7F5FF] hover:border-white/20 transition-all duration-300 focus:outline-none hidden sm:flex items-center gap-1.5 text-[10px] font-display uppercase tracking-wider"
              >
                <RotateCcw size={12} />
                <span className="hidden xl:inline">Boot</span>
              </button>
            )}

            <button
              onClick={handleAudioToggle}
              title={isAudioActive ? 'Mute Deep Space Ambiance' : 'Enable Deep Space Ambiance'}
              className={`p-2 rounded-full border transition-all duration-300 focus:outline-none ${
                isAudioActive
                  ? 'border-[#8B5CF6]/50 bg-[#4C1D95]/20 text-[#C084FC]'
                  : 'border-white/10 bg-transparent text-[#A6A0B8] hover:text-[#F7F5FF] hover:border-white/20'
              }`}
            >
              {isAudioActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            <button
              onClick={onOpenRegister}
              className="group relative overflow-hidden px-5 py-2.5 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/20 hover:bg-[#6D28D9]/40 text-[#F7F5FF] hover:border-[#8B5CF6] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
            >
              <div className="flex items-center gap-1.5 font-display text-xs uppercase tracking-[0.2em] font-medium">
                <span>Register</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-white/10 text-[#F7F5FF] hover:border-white/20 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dark Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#020107]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 animate-in fade-in duration-300">
          <div className="border-b border-white/[0.08] pb-4">
            <div className="font-editorial text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
              {SEDS_CONFIG.name}
            </div>
            <div className="font-display text-xs tracking-wider text-[#A6A0B8]">
              {SEDS_CONFIG.institution}
            </div>
          </div>

          <div className="space-y-4 my-auto">
            {NAV_LINKS.map((item) => {
              const isSelected = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className="w-full flex items-center justify-between text-left py-2.5 border-b border-white/[0.04]"
                >
                  <span className={`font-display text-xl tracking-wide ${
                    isSelected ? 'text-[#C084FC] font-semibold' : 'text-[#F7F5FF]'
                  }`}>
                    {item.label}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/[0.08]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#4C1D95] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-[0.22em] font-semibold text-center shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              Register for {EVENT_CONFIG.name}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
