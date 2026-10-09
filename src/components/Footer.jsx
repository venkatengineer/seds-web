import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, MapPin, Phone, Calendar } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';
import useRegistrationClosed from '../hooks/useRegistrationClosed';

export default function Footer({ onNavigate, onOpenRegister }) {
  const registrationClosed = useRegistrationClosed();
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
    <footer className="relative w-full z-20 border-t border-white/[0.12] bg-[#020107] pt-24 pb-14 px-6 sm:px-12 lg:px-16 text-[#E2DEEC] select-none">
      
      {/* Top Footer Grid */}
      <div data-reveal-stagger className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/[0.12]">
        
        {/* Brand & Chapter Lineage */}
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C084FC]" />
              <span className="font-editorial text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
                {SEDS_CONFIG.name}
              </span>
            </div>
            <div className="font-display text-xs uppercase tracking-wider text-[#C084FC] font-semibold">
              {SEDS_CONFIG.fullName}
            </div>
            <div className="font-display text-xs text-[#E2DEEC] font-medium">
              {SEDS_CONFIG.institution} • {SEDS_CONFIG.location}
            </div>
          </div>

          <p className="max-w-md text-xs sm:text-sm font-sans font-normal text-[#E2DEEC] leading-relaxed">
            Advancing student-led space technology, rocketry, CubeSat avionics, and computational astrodynamics. Official organizing community of <strong className="text-white font-semibold">{EVENT_CONFIG.name}</strong>.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/30 text-[#E2DEEC] font-display text-[11px] tracking-wider font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              <span>CLOSES: {EVENT_CONFIG.registrationDeadline} // 11:59 PM IST</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-[#E2DEEC] font-display text-[11px] tracking-wider font-semibold">
              <span>100% FREE REGISTRATION (₹0)</span>
            </span>
          </div>

          <div className="pt-2 font-display text-xs text-[#F7F5FF]">
            FLIGHT CLOCK: <span className="text-[#C084FC] font-medium font-mono-tech">{utcTime || 'SYNCHRONIZING...'}</span>
          </div>
        </div>

        {/* Directory Column - Updated to match hackathon-first layout */}
        <div className="space-y-3 font-display text-xs tracking-wider uppercase">
          <div className="text-[11px] tracking-[0.25em] text-[#F7F5FF] font-semibold mb-4">
            // SECTOR DIRECTORY
          </div>
          <div>
            <button onClick={() => onNavigate('about')} className="text-[#E2DEEC] hover:text-white transition-colors cursor-pointer">
              01 — About SEDHACKS '26
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('tracks')} className="text-[#E2DEEC] hover:text-white transition-colors cursor-pointer">
              02 — Tracks / Domains
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('build')} className="text-[#E2DEEC] hover:text-white transition-colors cursor-pointer">
              03 — What Can You Build?
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('prizes')} className="text-[#E2DEEC] hover:text-white transition-colors cursor-pointer">
              04 — Why Participate / Prizes
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('timeline')} className="text-[#E2DEEC] hover:text-white transition-colors cursor-pointer">
              05 — Your Journey & Schedule
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('countdown')} className="text-[#C084FC] hover:text-white transition-colors cursor-pointer font-semibold">
              06 — Deadline Countdown
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('faq')} className="text-[#E2DEEC] hover:text-white transition-colors cursor-pointer">
              07 — Frequently Asked Questions
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('partners')} className="text-[#E2DEEC] hover:text-white transition-colors cursor-pointer">
              08 — Industry Collaboration
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('mission')} className="text-[#E2DEEC]/80 hover:text-white transition-colors cursor-pointer">
              09 — Chapter Mission
            </button>
          </div>
          <div>
            <button onClick={() => onNavigate('identity')} className="text-[#E2DEEC]/80 hover:text-white transition-colors cursor-pointer">
              10 — SEDS REC Identity
            </button>
          </div>
        </div>

        {/* Chapter Affiliations & Action */}
        <div className="space-y-3 font-display text-xs tracking-wider uppercase">
          <div className="text-[11px] tracking-[0.25em] text-[#F7F5FF] font-semibold mb-4">
            // AFFILIATIONS
          </div>
          <div className="text-[#E2DEEC]">
            Industry Partner: <strong className="text-white">{EVENT_CONFIG.industryPartner}</strong>
          </div>
          <div className="text-[#E2DEEC]">
            SEDS India Official Chapter
          </div>
          <div className="text-[#E2DEEC]">
            {SEDS_CONFIG.institution}
          </div>
          <div className="pt-2">
            <button 
              onClick={onOpenRegister} 
              className="inline-flex items-center gap-1.5 text-white hover:text-[#C084FC] transition-colors font-bold underline cursor-pointer"
            >
              <span>{registrationClosed ? 'Registration Closed' : `Register for ${EVENT_CONFIG.name} (Free Entry) ↗`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Us & Queries Desk */}
      <div data-reveal className="py-12 border-b border-white/[0.12] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-2">
          <div className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] font-semibold">
            // CONTACT US & INQUIRIES
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7F5FF]">
            Questions About {EVENT_CONFIG.name}?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#E2DEEC] font-normal leading-relaxed">
            Reach out to our Student Coordinator or Club President at {SEDS_CONFIG.institution}, Chennai for team registration, problem statements, or event logistics.
          </p>
        </div>

        <div className="lg:col-span-7 flex justify-start lg:justify-end w-full">
          <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EVENT_CONFIG.contacts.map((contact, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-white/[0.12] bg-[#07030F]/80 space-y-2.5 shadow-[0_0_25px_rgba(76,29,149,0.15)] flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-[10px] tracking-widest uppercase text-[#C084FC] block font-semibold">
                    {contact.badge || contact.role.toUpperCase()}
                  </span>
                  <div className="font-display text-lg font-bold text-[#F7F5FF]">
                    {contact.name}
                  </div>
                  <div className="font-sans text-xs text-[#E2DEEC]">
                    {contact.institution}
                  </div>
                </div>
                <div className="pt-2 space-y-2 border-t border-white/[0.12]">
                  <div className="flex items-center gap-2.5 text-xs text-[#C084FC]">
                    <Phone size={13} className="shrink-0 text-[#C084FC]" />
                    <a 
                      href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`} 
                      className="hover:underline font-mono text-[#F7F5FF] text-sm font-semibold"
                    >
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#C084FC]">
                    <Mail size={13} className="shrink-0 text-[#C084FC] mt-0.5" />
                    <a 
                      href={`mailto:${contact.email}`} 
                      className="hover:underline font-mono text-xs leading-snug break-all text-[#E2DEEC] hover:text-white"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Legal Baseline */}
      <div data-reveal className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-display text-xs text-[#E2DEEC] font-medium">
        <div>
          © 2026 {SEDS_CONFIG.name} // {SEDS_CONFIG.institution}. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1 text-[#E2DEEC]">
            <MapPin size={12} className="text-[#C084FC]" />
            <span>CHENNAI, TAMIL NADU, INDIA</span>
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#E2DEEC] hover:text-white transition-colors cursor-pointer"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
