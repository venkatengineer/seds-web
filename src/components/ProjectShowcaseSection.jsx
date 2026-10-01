import React, { useState } from 'react';
import { ArrowUpRight, X, Cpu, Radio, Flame, Compass } from 'lucide-react';
import { SEDS_PROJECTS, EVENT_CONFIG } from '../config/event';

/**
 * PREMIUM PROJECT SHOWCASE SECTION
 * 
 * Philosophy:
 * - Real projects with large documentary engineering photography.
 * - Project Name, Year, Category, Short Description, Subsystems, CTA.
 * - Cinematic image mask reveals and subtle physical depth on hover.
 */

export default function ProjectShowcaseSection({ onOpenRegister }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'PROPULSION & AVIONICS': return <Flame size={16} className="text-[#8B5CF6]" />;
      case 'SATELLITE SYSTEMS': return <Cpu size={16} className="text-[#8B5CF6]" />;
      case 'PLANETARY ROBOTICS': return <Compass size={16} className="text-[#8B5CF6]" />;
      case 'COMMUNICATIONS': return <Radio size={16} className="text-[#8B5CF6]" />;
      default: return <Cpu size={16} className="text-[#8B5CF6]" />;
    }
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20 overflow-hidden"
    >
      {/* Top Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // STUDENT HARDWARE PORTFOLIO
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            ENGINEERING PROOF.
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          BUILT BY SEDS REC STUDENTS
        </div>
      </div>

      {/* Projects Grid: 2x2 Large Editorial Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {SEDS_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-white/[0.08] bg-[#07030F]/80 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-[#8B5CF6]/50 hover:shadow-[0_25px_60px_rgba(76,29,149,0.3)] hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Top Project Visual with Cinematic Mask */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#020107]">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07030F] via-transparent to-transparent opacity-80" />

              {/* Status & Category Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full border border-white/20 bg-[#020107]/80 backdrop-blur-md font-display text-[10px] uppercase tracking-wider text-[#F7F5FF] flex items-center gap-1.5">
                  {getCategoryIcon(project.category)}
                  <span>{project.category}</span>
                </span>

                <span className="px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/40 backdrop-blur-md font-display text-[10px] uppercase tracking-wider text-[#C084FC]">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Bottom Project Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-4">
              <div>
                <div className="flex items-center justify-between text-[#A6A0B8] font-display text-xs tracking-wider uppercase mb-1">
                  <span>CYCLE: {project.year}</span>
                  <span className="text-[#8B5CF6]">{project.tagline}</span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F5FF] group-hover:text-white transition-colors">
                  {project.name}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#A6A0B8] font-light leading-relaxed mt-2">
                  {project.desc}
                </p>
              </div>

              {/* Subsystems Badges */}
              <div className="pt-2">
                <span className="font-display text-[9px] uppercase tracking-widest text-[#8B5CF6] block mb-2">
                  KEY SUBSYSTEMS & CAPABILITIES:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.subsystems.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md border border-white/[0.06] bg-white/[0.02] text-[11px] font-sans text-[#F7F5FF]/85"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Strip */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-wider text-[#A6A0B8] group-hover:text-[#F7F5FF] transition-colors"
                >
                  <span>Technical Specification</span>
                  <ArrowUpRight size={13} className="text-[#8B5CF6]" />
                </button>

                <button
                  onClick={onOpenRegister}
                  className="font-display text-xs uppercase tracking-wider text-[#8B5CF6] hover:text-[#C084FC] transition-colors"
                >
                  Join Chapter ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Specification Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-[#020107]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative max-w-2xl w-full rounded-2xl border border-white/10 bg-[#07030F] p-8 space-y-6 shadow-[0_0_80px_rgba(76,29,149,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
            >
              <X size={16} />
            </button>

            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-display text-xs uppercase tracking-[0.2em] text-[#8B5CF6] font-semibold">
                  {selectedProject.category} // {selectedProject.year}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/30 text-[10px] font-display text-[#C084FC] uppercase">
                  {selectedProject.status}
                </span>
              </div>
              <h4 className="font-editorial text-3xl font-bold text-[#F7F5FF]">
                {selectedProject.name}
              </h4>
              <p className="font-display text-xs text-[#A6A0B8] mt-0.5">
                {selectedProject.tagline}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.name} 
                className="w-full h-full object-cover" 
              />
            </div>

            <p className="font-sans text-sm text-[#F7F5FF]/90 font-light leading-relaxed">
              {selectedProject.desc} Constructed and benchmarked at Rajalakshmi Engineering College campus engineering workshops in accordance with student sounding rocket and CubeSat development standards.
            </p>

            <div className="space-y-2">
              <span className="font-display text-[10px] uppercase tracking-widest text-[#8B5CF6] block">
                INTEGRATED ARCHITECTURE & TELEMETRY:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.subsystems.map((sub, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-xs font-sans text-[#F7F5FF] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="font-display text-xs text-[#A6A0B8]">
                Open for collaboration at {EVENT_CONFIG.name}
              </span>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  onOpenRegister();
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4C1D95] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-wider font-semibold"
              >
                Register For Hackathon
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
