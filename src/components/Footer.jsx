import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, MapPin, Phone, Calendar } from 'lucide-react';
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
    <footer className="relative w-full z-20 border-t border-white/[0.08] bg-[#020107] pt-24 pb-14 px-6 sm:px-12 lg:px-16 text-[#A6A0B8] select-none">
      
      {/* Top Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/[0.06]">
        
        {/* Brand & Chapter Lineage */}
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <span className="font-editorial text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
                {SEDS_CONFIG.name}
              </span>
            </div>
            <div className="font-display text-xs uppercase tracking-wider text-[#8B5CF6] font-medium">
              {SEDS_CONFIG.fullName}
            </div>
            <div className="font-display text-xs text-[#A6A0B8]">
              {SEDS_CONFIG.institution} • {SEDS_CONFIG.location}
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm font-sans font-light text-[#A6A0B8] leading-relaxed">
            Advancing student-led space technology, rocketry, CubeSat avionics, and computational astrodynamics. Official organizing community of <strong className="text-[#F7F5FF]">{EVENT_CONFIG.name}</strong>.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/70 bg-[#4C1D95]/40 text-[#F7F5FF] font-display text-xs tracking-wider font-semibold shadow-[0_0_12px_rgba(139,92,246,0.3)]">
              <Calendar size={12} className="text-[#C084FC]" />
              <span>{EVENT_CONFIG.dates}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 font-display text-[11px] tracking-wider font-semibold">
              <span>100% FREE REGISTRATION (₹0)</span>
            </span>
          </div>

          <div className="pt-2 font-display text-xs text-[#F7F5FF]">
            FLIGHT CLOCK: <span className="text-[#8B5CF6] font-medium">{utcTime || 'SYNCHRONIZING...'}</span>
          </div>
        </div>

        {/* Directory Column */}
        <div className="space-y-3 font-display text-xs tracking-wider uppercase">
          <div className="text-[11px] tracking-[0.25em] text-[#F7F5FF] font-semibold mb-4">
            // SECTOR DIRECTORY
          </div>
          <div>
            <button onClick={() => onNavigate('mission')} className="hover:text-[#F7F5FF] transition-colors">
              01 — Chapter Mission
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('identity')} className="hover:text-[#F7F5FF] transition-colors">
              02 — SEDS REC Identity
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('tracks')} className="hover:text-[#F7F5FF] transition-colors">
              03 — Hackathon Tracks
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('timeline')} className="hover:text-[#F7F5FF] transition-colors">
              04 — Flight Trajectory
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('prizes')} className="hover:text-[#F7F5FF] transition-colors">
              05 — Why Participate
            </button>
          </div>
        </div>

        {/* Chapter Affiliations & Action */}
        <div className="space-y-3 font-display text-xs tracking-wider uppercase">
          <div className="text-[11px] tracking-[0.25em] text-[#F7F5FF] font-semibold mb-4">
            // AFFILIATIONS
          </div>
          <div className="text-[#A6A0B8]">
            Industry Partner: {EVENT_CONFIG.industryPartner}
          </div>
          <div className="text-[#A6A0B8]">
            SEDS India Official Chapter
          </div>
          <div className="text-[#A6A0B8]">
            {SEDS_CONFIG.institution}
          </div>
          <div className="pt-2">
            <button 
              onClick={onOpenRegister} 
              className="text-[#8B5CF6] hover:text-[#C084FC] transition-colors font-medium"
            >
              Register for {EVENT_CONFIG.name} (Free Entry) ↗
            </button>
          </div>
        </div>
      </div>

      {/* Contact Us & Queries Desk */}
      <div className="py-12 border-b border-white/[0.06] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-2">
          <div className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] font-semibold">
            // CONTACT US & INQUIRIES
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7F5FF]">
            Questions About {EVENT_CONFIG.name}?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#A6A0B8] font-light leading-relaxed">
            Reach out to Student Coordinator Sruthi Nisha.J.S at {SEDS_CONFIG.institution}, Chennai for team registration, problem statements, or event logistics.
          </p>
        </div>

        <div className="md:col-span-7 flex justify-start md:justify-end">
          <div className="w-full max-w-md p-6 rounded-2xl border border-white/[0.08] bg-[#07030F]/60 space-y-2.5">
            <span className="font-display text-[10px] tracking-widest uppercase text-[#8B5CF6] block font-semibold">
              OFFICIAL STUDENT COORDINATOR
            </span>
            <div className="font-display text-lg font-semibold text-[#F7F5FF]">
              Sruthi Nisha.J.S
            </div>
            <div className="font-sans text-xs text-[#A6A0B8]">
              {SEDS_CONFIG.institution}, Chennai
            </div>
            <div className="pt-2 space-y-2 border-t border-white/[0.06]">
              <div className="flex items-center gap-2.5 text-xs text-[#C084FC]">
                <Phone size={13} className="shrink-0 text-[#8B5CF6]" />
                <a href="tel:9884464389" className="hover:underline font-mono text-[#F7F5FF] text-sm">
                  +91 98844 64389
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-[#C084FC]">
                <Mail size={13} className="shrink-0 text-[#8B5CF6] mt-0.5" />
                <a 
                  href="mailto:sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in" 
                  className="hover:underline font-mono text-xs leading-snug break-all text-[#A6A0B8] hover:text-[#F7F5FF]"
                >
                  sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Baseline */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-display text-xs text-[#A6A0B8]/70">
        <div>
          © 2026 {SEDS_CONFIG.name} // {SEDS_CONFIG.institution}. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#8B5CF6]" />
            <span>CHENNAI, TAMIL NADU, INDIA</span>
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
