import React from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * RESTRAINED SECTOR INDICATOR
 * 
 * Explicitly HIDDEN in the Hero viewport to remove all cockpit/HUD radar clutter.
 * In subsequent sections, acts as an unobtrusive, subtle sector marker with a quick return to apex.
 */

const SECTOR_METADATA = {
  hero: { code: '00', name: 'APEX SYSTEM' },
  mission: { code: '01', name: 'MISSION & CHARTER' },
  challenges: { code: '02', name: 'CHALLENGES' },
  timeline: { code: '03', name: 'TIMELINE' },
  countdown: { code: '04', name: 'LAUNCH HORIZON' },
  prizes: { code: '05', name: 'PRIZES' },
  sponsors: { code: '06', name: 'ALLIANCES' },
  faq: { code: '07', name: 'FAQ' },
};

export default function SpaceNavigationMap({ activeSection, onNavigate }) {
  // Never show in Hero section
  if (activeSection === 'hero') {
    return null;
  }

  const currentSector = SECTOR_METADATA[activeSection] || SECTOR_METADATA.mission;

  return (
    <aside aria-label="Sector navigation" className="fixed bottom-6 right-6 z-40 select-none hidden md:block transition-all duration-500">
      <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-[#080313]/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
        
        <div className="flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.2em] uppercase">
          <span className="text-[#8B5CF6] font-semibold">SEC {currentSector.code}</span>
          <span className="text-white/20">/</span>
          <span className="text-[#F5F3FF] font-light">{currentSector.name}</span>
        </div>

        <button
          onClick={() => onNavigate('hero')}
          title="Return to top"
          className="ml-2 p-1 rounded-full text-[#9690AA] hover:text-[#F5F3FF] transition-colors focus:outline-none"
          data-interactive="true"
        >
          <ArrowUp size={12} />
        </button>
      </div>
    </aside>
  );
}
