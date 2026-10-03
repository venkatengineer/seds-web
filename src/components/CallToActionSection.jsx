import React from 'react';
import { ArrowUpRight, Sparkles, Calendar, MapPin, Clock, Download } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

export default function CallToActionSection({ onOpenRegister }) {
  const cta = EVENT_CONFIG.cta;

  return (
    <section 
      id="cta" 
      className="relative w-full py-28 sm:py-36 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      <div data-reveal="scale" className="max-w-5xl mx-auto w-full relative rounded-3xl border border-white/[0.16] bg-gradient-to-br from-[#130726] via-[#080213] to-[#020107] p-8 sm:p-14 lg:p-20 shadow-[0_0_60px_rgba(139,92,246,0.25)] overflow-hidden text-center flex flex-col items-center">
        
        {/* Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none -z-10 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.45) 0%, rgba(76, 29, 149, 0.15) 50%, transparent 80%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/50 bg-[#4C1D95]/30 text-[#F7F5FF] font-display text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Sparkles size={12} className="text-[#C084FC]" />
            <span>TOP 2 TEAMS WIN AEROIN INTERNSHIPS</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.04] text-[#E2DEEC] font-display text-xs font-semibold tracking-widest uppercase">
            <Clock size={12} className="text-[#C084FC]" />
            <span>CLOSING: 9 OCTOBER 2026 // 18:00 IST</span>
          </div>
        </div>

        <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          {cta.title}
        </h2>

        <div className="space-y-2 max-w-xl mx-auto mb-8 font-sans text-lg sm:text-2xl text-[#E2DEEC] font-normal leading-relaxed">
          {cta.lines.map((line, i) => (
            <div key={i} className="text-white/90">
              {line}
            </div>
          ))}
        </div>

        <div className="pt-2 mb-10">
          <div className="font-editorial text-2xl sm:text-3xl text-[#C084FC] font-semibold tracking-wider">
            {cta.tagline}
          </div>
          <div className="font-display text-xs tracking-widest text-[#E2DEEC] uppercase mt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-1.5 text-white">
              <Calendar size={13} className="text-[#C084FC]" />
              {EVENT_CONFIG.dates}
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5 text-[#E2DEEC]">
              <MapPin size={13} className="text-[#C084FC]" />
              {EVENT_CONFIG.venue}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-white font-semibold uppercase">
              {cta.feeText} (₹0)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="group relative overflow-hidden px-10 py-4 rounded-full border border-[#8B5CF6] bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-[0.22em] font-bold shadow-[0_0_35px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.8)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <div className="relative flex items-center gap-2">
              <span>{cta.buttonText} (FREE)</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>

          <a
            href={EVENT_CONFIG.pptTemplateUrl}
            download={EVENT_CONFIG.pptTemplateFilename}
            className="group flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 hover:border-[#C084FC] bg-white/[0.04] hover:bg-[#8B5CF6]/20 text-[#F7F5FF] hover:text-white font-display text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            title="Download official presentation deck template (.pptx)"
          >
            <Download size={15} className="text-[#C084FC] group-hover:translate-y-0.5 transition-transform" />
            <span>DOWNLOAD PPT TEMPLATE (.PPTX)</span>
          </a>
        </div>

        <div className="mt-8 text-xs font-mono text-[#E2DEEC]">
          Only 4 members per team (1 Team Lead + 3 members) • Cash prize pool ₹10,000+ • Top 2 teams internships
        </div>
      </div>
    </section>
  );
}
