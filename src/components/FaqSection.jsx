import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * EDITORIAL FAQ SECTION
 * 
 * Target:
 * - Large title: "QUESTIONS?"
 * - Generous vertical spacing.
 * - Very subtle dividers.
 * - Large typography.
 * - No excessive containers or dashboard cards.
 */

const FAQS = [
  {
    q: `What is ${SEDS_CONFIG.name} and who can participate in ${EVENT_CONFIG.name}?`,
    a: `${SEDS_CONFIG.name} (${SEDS_CONFIG.fullName}) is the student-led space technology community established at ${SEDS_CONFIG.institution}, affiliated with the national SEDS India network. Participation in ${EVENT_CONFIG.name} is open to all university undergraduate and postgraduate students. Crews must strictly consist of 4 members only.`,
  },
  {
    q: 'How does the Two-Phase registration and evaluation process work?',
    a: 'Registration is structured in two distinct phases: Phase 1 is completely FREE. Teams submit their team composition (strictly 4 members), selected hackathon track, project title, brief description, and presentation deck (.ppt / .pptx). After evaluation by the SEDS REC review panel and domain experts, approximately 30 shortlisted teams will be invited to Phase 2. The Phase 2 registration fee is ₹300 per person (₹1,200 per 4-member team).',
  },
  {
    q: `What are the 5 official hackathon tracks in ${EVENT_CONFIG.name}?`,
    a: "The hackathon features 5 official tracks: 01. Space Applications & Defence Technology, 02. Medical, Food & Agriculture in Space, 03. Autonomous & Communication Technology, 04. Sustainability in Space, and 05. Miscellaneous / Open Innovation. Teams can submit solutions for any of these domains.",
  },
  {
    q: 'What are the prizes and internship opportunities?',
    a: "SEDHACKS '26 features a ₹10,000 cash prize pool. In addition, through our industry collaboration with Aeroin Space Tech, the Top 3 teams will receive internship opportunities, subject to the organisation's selection process.",
  },
  {
    q: 'Can individuals register solo or with fewer than 4 members?',
    a: 'No. All teams must register with strictly 4 members (1 Team Lead plus 3 team members) to ensure cross-disciplinary capability across aerospace software, hardware, and algorithms.',
  },
  {
    q: 'Do I need prior experience in aerospace engineering or rocketry?',
    a: `No prior aerospace background is required. ${EVENT_CONFIG.name} brings software developers, mathematicians, robotics designers, and physics students together. SEDS REC technical mentors provide guidance, datasets, and baseline libraries across all tracks.`,
  },
  {
    q: `What is the role of ${SEDS_CONFIG.institution}?`,
    a: `${SEDS_CONFIG.institution} is the autonomous host institution providing campus facilities, laboratory testbeds, compute infrastructure, and institutional support for SEDS REC initiatives.`,
  },
  {
    q: 'Who retains the intellectual property developed during the sprint?',
    a: `100% of all intellectual property, flight code, algorithms, and designs remain exclusively with the participating students. Neither ${SEDS_CONFIG.name} nor ${SEDS_CONFIG.institution} claims any ownership or licensing over your creations.`,
  },
  {
    q: 'What format should our initial presentation deck be in?',
    a: 'Phase 1 accepts presentation files in Microsoft PowerPoint (.ppt or .pptx) format up to 25 MB in size. A standardized SEDS template is linked directly within the registration portal.',
  },
  {
    q: `Who can I contact for queries regarding ${EVENT_CONFIG.name}?`,
    a: 'For any questions regarding team registration, problem statements, or event logistics, reach out to Student Coordinator Sruthi Nisha.J.S at +91 98844 64389 (sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in) or contact the hackathon desk at queries.sedshacks@gmail.com.',
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
      className="relative min-h-[75vh] w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20"
    >
      {/* Top Editorial Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6 mb-16">
        <div>
          <span className="font-display text-xs tracking-[0.25em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
            // FREQUENTLY INQUIRED DIRECTIVES
          </span>
          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F5FF]">
            QUESTIONS?
          </h2>
        </div>
        <div className="font-display text-xs tracking-[0.2em] text-[#A6A0B8] uppercase">
          OPERATIONAL CLARIFICATIONS
        </div>
      </div>

      {/* Editorial Accordion: Generous Spacing, Subtle Dividers, Large Typography */}
      <div className="max-w-4xl divide-y divide-white/[0.08]">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-8 sm:py-10">
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-start justify-between text-left gap-6 group focus:outline-none"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-display text-xs tracking-widest text-[#8B5CF6] font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-normal text-[#F7F5FF] group-hover:text-white transition-colors">
                    {item.q}
                  </span>
                </div>

                <div className="p-2 rounded-full border border-white/10 group-hover:border-[#8B5CF6]/50 text-[#A6A0B8] group-hover:text-white transition-colors shrink-0 mt-1">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              {isOpen && (
                <div className="mt-6 pl-8 sm:pl-12 pr-4 sm:pr-12 text-[#A6A0B8] font-sans text-base sm:text-lg font-light leading-relaxed animate-in fade-in duration-300">
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
