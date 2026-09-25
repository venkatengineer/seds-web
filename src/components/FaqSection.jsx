import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

const FAQS = [
  {
    q: `What is ${SEDS_CONFIG.name} and who can participate in ${EVENT_CONFIG.name}?`,
    a: `${SEDS_CONFIG.name} (${SEDS_CONFIG.tagline}) is the premier student space exploration chapter based at ${SEDS_CONFIG.institution}. Participation in ${EVENT_CONFIG.name} is open to all university students, researchers, and independent developers globally. Teams of 1 to 4 members are welcome in both hybrid physical and remote formats.`,
  },
  {
    q: 'Do I need prior experience in aerospace or rocketry?',
    a: `No prior aerospace experience is required. ${EVENT_CONFIG.name} welcomes software engineers, AI developers, mathematicians, and hardware designers. SEDS REC mentors will provide starter ephemeris APIs, satellite telemetry datasets, and baseline astrodynamics libraries at the start of the sprint.`,
  },
  {
    q: 'What is the role of Rajalakshmi Engineering College?',
    a: `${SEDS_CONFIG.institution} is the host institution providing lab access, high-bandwidth compute networks, prototyping facilities, and academic faculty mentorship for the ${SEDS_CONFIG.name} chapter and this innovation sprint.`,
  },
  {
    q: 'Who retains the intellectual property developed during the hackathon?',
    a: `100% of the intellectual property, codebases, algorithms, and designs remain exclusively with the participating teams. Neither ${SEDS_CONFIG.name} nor ${SEDS_CONFIG.institution} claims any rights over your creations.`,
  },
  {
    q: 'How does the evaluation process work?',
    a: 'Projects will be evaluated on technical rigor, mathematical validity, autonomous operational capability, and system architecture. The jury comprises aerospace researchers, SEDS alumni, and distributed computing engineers.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      className="relative min-h-[70vh] w-full flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-20 z-20"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-dark-b pb-6 mb-16">
        <div>
          <span className="font-mono-tech text-xs tracking-[0.3em] uppercase text-[#8B5CF6] block mb-1">
            // {SEDS_CONFIG.name} DIRECTIVES
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F7F5FF]">
            FREQUENT DIRECTIVES.
          </h2>
        </div>
        <div className="font-mono-tech text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          OPERATIONAL PROTOCOLS
        </div>
      </div>

      {/* Minimal Architectural Accordion */}
      <div className="max-w-4xl divide-y divide-white/[0.06]">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-6 sm:py-8">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left gap-6 group focus:outline-none"
                data-interactive="true"
              >
                <div className="flex items-start gap-4 sm:gap-8">
                  <span className="font-mono-tech text-xs tracking-widest text-[#8B5CF6] mt-1">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-lg sm:text-2xl font-normal text-[#F7F5FF] group-hover:text-white transition-colors">
                    {item.q}
                  </span>
                </div>

                <div className="p-2 rounded-full border border-white/10 group-hover:border-[#8B5CF6]/50 text-[#A6A0B8] group-hover:text-white transition-colors shrink-0">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              {isOpen && (
                <div className="mt-4 pl-8 sm:pl-16 pr-4 sm:pr-12 text-[#A6A0B8] font-sans text-sm sm:text-base font-light leading-relaxed animate-in fade-in duration-300">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
