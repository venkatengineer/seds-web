import React from 'react';
import { Cpu, Globe, Smartphone, Bot, Binary, FlaskConical, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

const BUILD_ICONS = {
  hardware: Cpu,
  software: Globe,
  mobile: Smartphone,
  'ai-data': Bot,
  simulation: Binary,
  science: FlaskConical,
};

export default function BuildSection({ onOpenRegister }) {
  const buildInfo = EVENT_CONFIG.whatCanYouBuild;

  return (
    <section 
      id="build" 
      className="relative min-h-[75vh] w-full flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-12 lg:px-16 z-20 select-none overflow-hidden"
    >
      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.12] pb-6 mb-12">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] font-semibold flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#C084FC]" />
              // ARTIFACT TYPES & MANIFESTATION
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-display text-[11px] font-bold tracking-wider uppercase">
              ALL MODALITIES WELCOME
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            {buildInfo.subtitle.toUpperCase()}
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#E2DEEC] uppercase font-medium">
          {buildInfo.title.toUpperCase()}
        </div>
      </div>

      <p className="font-sans text-base sm:text-lg text-[#E2DEEC] max-w-2xl mb-10 leading-relaxed">
        {buildInfo.intro} Choose whatever format brings your space innovation to life effectively.
      </p>

      {/* 6 Build Modality Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full mb-12">
        {buildInfo.types.map((type, idx) => {
          const Icon = BUILD_ICONS[type.id] || Cpu;
          return (
            <div 
              key={type.id}
              className="p-6 sm:p-7 rounded-2xl border border-white/[0.12] bg-[#07030F]/90 hover:border-[#8B5CF6]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-[#C084FC] group-hover:text-white group-hover:border-[#8B5CF6]/50 transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono-tech text-xs tracking-wider text-[#A855F7] font-bold">
                    0{idx + 1}
                  </span>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[10px] font-display uppercase tracking-widest text-[#E2DEEC] mb-2">
                  {type.badge}
                </span>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#C084FC] transition-colors mb-2">
                  {type.title}
                </h3>

                <p className="font-sans text-sm text-[#E2DEEC] leading-relaxed">
                  {type.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* The Key Requirement: Demonstrate It Banner */}
      <div className="max-w-6xl mx-auto w-full p-8 sm:p-10 rounded-2xl border border-[#8B5CF6]/40 bg-gradient-to-r from-[#17092c] via-[#0b0417] to-[#04010a] shadow-[0_0_40px_rgba(139,92,246,0.2)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-display tracking-widest uppercase text-[#C084FC] font-bold">
            <CheckCircle2 size={14} className="text-[#C084FC]" />
            <span>CRITICAL JURY CRITERIA</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
            {buildInfo.keyRequirement.title}
          </h3>
          <p className="font-sans text-sm sm:text-base text-[#E2DEEC] leading-relaxed">
            {buildInfo.keyRequirement.desc}
          </p>
        </div>

        {onOpenRegister && (
          <button
            onClick={onOpenRegister}
            className="shrink-0 px-7 py-3.5 rounded-full border border-[#8B5CF6] bg-[#8B5CF6]/30 hover:bg-[#8B5CF6]/50 text-white font-display text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
          >
            <span>REGISTER NOW (FREE ₹0)</span>
            <ArrowUpRight size={14} />
          </button>
        )}
      </div>
    </section>
  );
}
