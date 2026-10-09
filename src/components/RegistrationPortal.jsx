import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ShieldCheck, Users, Sparkles, RefreshCw, FileText, Calendar, Download } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG, REGISTRATION_FORM_URL, REGISTRATION_FORM_EMBED_URL, PPT_TEMPLATE_URL, PPT_TEMPLATE_FILENAME } from '../config/event';

/**
 * OFFICIAL ORBITAL 26 REGISTRATION PORTAL (GOOGLE FORM POWERED)
 * 
 * Architecture:
 * - Serverless: Powered directly by the official SEDS REC Google Form
 * - Embedded high-fidelity viewer with seamless loading state
 * - Direct "Open in Full Tab" launcher for unrestricted Google account auth & PPT uploads
 * - Deep space aesthetic strictly matching the ORBITAL 26 design system
 */
export default function RegistrationPortal({ isOpen, onClose }) {
  const [iframeLoading, setIframeLoading] = useState(true);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIframeLoading(true);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-300">
      
      {/* 1. Deep Space Atmospheric Backdrop */}
      <div 
        className="absolute inset-0 bg-[#010106]/90 backdrop-blur-2xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 2. Main Portal Window */}
      <div className="relative w-full max-w-5xl h-[94vh] sm:h-[90vh] bg-[#06040F] border border-white/[0.12] rounded-2xl shadow-[0_0_80px_rgba(139,92,246,0.2)] flex flex-col overflow-hidden z-10 animate-in zoom-in-95 duration-300">
        
        {/* Subtle top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#8B5CF6]/15 via-transparent to-transparent pointer-events-none" />

        {/* Top Control Header */}
        <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-4 border-b border-white/[0.12] bg-[#090615]/90 backdrop-blur-md shrink-0">
          
          {/* Left: Branding & Directives */}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
              <span className="font-display text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C084FC] font-semibold">
                {SEDS_CONFIG.name} // OFFICIAL SUBMISSION
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/15 bg-white/[0.04] text-[10px] font-mono text-[#E2DEEC] font-semibold">
                100% FREE OF COST (₹0)
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/40 text-[10px] font-mono text-[#E2DEEC] font-semibold">
                INTRA-COLLEGE // REC ONLY
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/40 text-[10px] font-mono text-[#E2DEEC] font-semibold">
                DEADLINE: 9 OCT 2026 // 11:59 PM IST
              </span>
            </div>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#F7F5FF]">
              {EVENT_CONFIG.name} REGISTRATION
            </h2>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Download Official PPT Template Button */}
            <a
              href={PPT_TEMPLATE_URL}
              download={PPT_TEMPLATE_FILENAME}
              className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-[#C084FC] bg-[#4C1D95]/60 hover:bg-[#6D28D9] text-[#F7F5FF] text-xs font-display uppercase tracking-[0.14em] font-bold shadow-[0_0_20px_rgba(192,132,252,0.35)] hover:shadow-[0_0_30px_rgba(192,132,252,0.6)] transition-all duration-200 cursor-pointer"
              title="Download official SEDHACKS PPT template (.pptx) for submission"
            >
              <Download size={13} className="text-[#C084FC] group-hover:translate-y-0.5 transition-transform" />
              <span className="hidden sm:inline">Download PPT Template</span>
              <span className="sm:hidden">PPT Template</span>
            </a>

            {/* Open in Full Google Form Window */}
            <a
              href={REGISTRATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-[#8B5CF6] bg-[#6D28D9]/40 hover:bg-[#6D28D9] text-[#F7F5FF] text-xs font-display uppercase tracking-[0.14em] font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-200"
              title="Open Google Form in a new tab"
            >
              <span className="hidden sm:inline">Open in Full Tab</span>
              <span className="sm:hidden">Full Tab</span>
              <ExternalLink size={13} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Close Portal */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full border border-white/20 hover:border-white/50 text-[#E2DEEC] hover:text-white hover:bg-white/[0.1] transition-all duration-200 focus:outline-none cursor-pointer"
              aria-label="Close registration portal"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Quick Requirement Directives Bar */}
        <div className="relative z-10 px-5 sm:px-8 py-3 bg-[#0C091C] border-b border-white/[0.1] flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-[#E2DEEC] shrink-0">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 text-[#F7F5FF] font-semibold font-display tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              <span>REGISTRATION CLOSES: 9 OCT 2026 // 11:59 PM IST</span>
            </span>
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Users size={13} className="text-[#C084FC]" />
              <strong>Eligibility:</strong> REC Students Only (Intra-College)
            </span>
            <span className="flex items-center gap-1.5 text-white font-medium">
              <Users size={13} className="text-[#C084FC]" />
              <strong>Squad Size:</strong> Only 4 Members
            </span>
            <span className="flex items-center gap-1.5 text-white font-medium">
              <ShieldCheck size={13} className="text-[#C084FC]" />
              <strong>Fee:</strong> Completely Free of Cost (₹0 Entry Fee)
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-[#E2DEEC]">
              <FileText size={13} className="text-[#C084FC]" />
              PPT Upload Required
            </span>
          </div>

          <a
            href={PPT_TEMPLATE_URL}
            download={PPT_TEMPLATE_FILENAME}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#C084FC]/70 bg-[#C084FC]/15 hover:bg-[#C084FC]/30 text-white font-mono text-[11px] font-semibold transition-colors cursor-pointer"
            title="Download PPT Template file"
          >
            <Download size={12} className="text-[#C084FC]" />
            <span>Click to Download Official PPT Template (.pptx)</span>
          </a>
        </div>

        {/* Main Form Display Area */}
        <div className="relative flex-1 w-full bg-[#030208] overflow-hidden">
          
          {/* Loading Animation Overlay */}
          {iframeLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#030208] text-[#E2DEEC]">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border border-[#8B5CF6]/30 border-t-[#8B5CF6] animate-spin" />
                <div className="absolute inset-2 rounded-full border border-[#C084FC]/40 border-b-[#C084FC] animate-[spin_1.5s_linear_infinite_reverse]" />
              </div>
              <div className="font-display text-xs tracking-[0.2em] uppercase text-[#F7F5FF] font-semibold">
                INITIALIZING SECURE REGISTRATION FORM...
              </div>
              <p className="text-xs text-[#E2DEEC] max-w-sm text-center px-4 font-sans font-normal">
                Connecting to Google Forms telemetry channel. If loading takes longer, you can open it directly in a new tab.
              </p>
              <a
                href={REGISTRATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#C084FC] hover:text-white transition-colors font-medium"
              >
                <span>Launch in Separate Tab</span>
                <ExternalLink size={12} />
              </a>
            </div>
          )}

          {/* Embedded Google Form */}
          <iframe
            src={REGISTRATION_FORM_EMBED_URL}
            title={`${EVENT_CONFIG.name} Registration Form`}
            width="100%"
            height="100%"
            className="w-full h-full border-0 bg-white"
            onLoad={() => setIframeLoading(false)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Bottom Status / Fallback Notice Footer */}
        <footer className="relative z-10 px-5 sm:px-8 py-3 bg-[#080514] border-t border-white/[0.12] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#E2DEEC] shrink-0">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Sparkles size={13} className="text-[#C084FC] shrink-0" />
            <span className="font-sans text-[11px] sm:text-xs">
              Google Account required for PPT file attachment. If browser restricts sign-in in embedded frame, open in full tab.
            </span>
          </div>

          <a
            href={REGISTRATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#C084FC] hover:text-[#F7F5FF] transition-colors font-display text-[11px] uppercase tracking-wider font-semibold shrink-0"
          >
            <span>Open in Full Tab</span>
            <ExternalLink size={11} />
          </a>
        </footer>
      </div>
    </div>
  );
}
