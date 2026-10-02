import React, { useState, useMemo } from 'react';
import { Plus, Minus, Search, X, HelpCircle, Phone, Mail, ArrowUpRight, Sparkles } from 'lucide-react';
import { SEDS_CONFIG, EVENT_CONFIG, FAQ_CATEGORIES, ALL_FAQS } from '../config/event';

/**
 * COMPREHENSIVE EDITORIAL FAQ SECTION
 * Transcribed directly from SEDS_Space_Hackathon_Stronger_FAQs.docx
 * 
 * Features:
 * - Complete 38 original questions + event parameters (41 total)
 * - Category filter pills with count badges
 * - Instant keyword search across questions and answers
 * - High-contrast, legible typography (#FFFFFF questions, #E2DEEC answers)
 * - Highlighted registration deadline and ₹0 fee reminders
 * - Student Coordinator contact card
 */

export default function FaqSection({ onOpenRegister }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  // Filtered FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    let list = ALL_FAQS;

    if (activeCategory !== 'all') {
      list = list.filter((item) => item.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.q.toLowerCase().includes(q) ||
          item.a.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, searchQuery]);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setOpenIndex(0); // auto-open first result in new category
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <section 
      id="faq" 
      className="relative min-h-[85vh] w-full flex flex-col justify-center py-32 px-6 sm:px-12 lg:px-16 z-20"
    >
      {/* Top Editorial Eyebrow */}
      <div data-reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.12] pb-8 mb-12">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-display text-xs tracking-[0.25em] uppercase text-[#A855F7] font-semibold flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#C084FC]" />
              // FREQUENTLY ASKED DIRECTIVES
            </span>

            {/* Registration deadline badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/30 text-[#E2DEEC] font-display text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              LAST DATE TO REGISTER: 10 OCT 2026 // 23:59 IST
            </span>

            {/* 100% Free badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-[#E2DEEC] font-display text-[11px] font-semibold tracking-wider uppercase">
              100% FREE REGISTRATION (₹0)
            </span>
          </div>

          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F5FF]">
            QUESTIONS?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#E2DEEC] max-w-2xl leading-relaxed">
            Everything you need to know about <strong className="text-white font-semibold">{EVENT_CONFIG.name}</strong>, team formation rules, problem scopes, hardware/AI allowances, intellectual property rights, and presentation guidelines.
          </p>
        </div>

        <div className="text-right flex flex-col items-start lg:items-end gap-1">
          <span className="font-display text-xs tracking-[0.2em] text-[#C084FC] uppercase font-semibold">
            {ALL_FAQS.length} DIRECTIVES INDEXED
          </span>
          <span className="font-sans text-xs text-[#E2DEEC]">
            From SEDS REC Space Hackathon Handbook
          </span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div data-reveal className="mb-10 space-y-6">
        
        {/* Instant Search Bar */}
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#C084FC]">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. registration fee, AI tools, team size, hardware, prizes, IP)..."
            className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/[0.16] bg-[#07030F]/90 text-white placeholder-[#9E9AA7] font-sans text-sm sm:text-base focus:outline-none focus:border-[#A855F7] focus:ring-2 focus:ring-[#A855F7]/30 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#E2DEEC] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-900">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-3.5 py-1.5 rounded-full font-display text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#8B5CF6] text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                : 'border border-white/[0.12] bg-[#090514]/60 text-[#E2DEEC] hover:text-white hover:border-white/30'
            }`}
          >
            All Questions ({ALL_FAQS.length})
          </button>

          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-display text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B5CF6] text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    : 'border border-white/[0.12] bg-[#090514]/60 text-[#E2DEEC] hover:text-white hover:border-white/30'
                }`}
              >
                {cat.label} ({cat.faqs.length})
              </button>
            );
          })}
        </div>

        {/* Active Filter Status */}
        <div className="flex items-center justify-between text-xs font-display text-[#E2DEEC] pt-1">
          <div>
            Showing <strong className="text-white">{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? 'result' : 'results'}
            {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
          </div>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="text-[#C084FC] hover:underline cursor-pointer"
            >
              Reset search
            </button>
          )}
        </div>
      </div>

      {/* Accordion Content */}
      {filteredFaqs.length === 0 ? (
        <div className="py-16 text-center max-w-xl mx-auto space-y-4">
          <HelpCircle size={40} className="mx-auto text-[#A855F7] opacity-60" />
          <h3 className="font-editorial text-2xl font-bold text-white">
            No matching questions found
          </h3>
          <p className="font-sans text-sm text-[#E2DEEC]">
            We couldn't find an answer matching &ldquo;{searchQuery}&rdquo;. Try using broader terms like &ldquo;team&rdquo;, &ldquo;hardware&rdquo;, &ldquo;fee&rdquo;, or contact our Student Coordinator directly.
          </p>
          <button
            onClick={handleClearSearch}
            className="px-5 py-2 rounded-full border border-[#8B5CF6] bg-[#8B5CF6]/20 text-white font-display text-xs tracking-wider uppercase hover:bg-[#8B5CF6]/40 transition-colors"
          >
            Show All Questions
          </button>
        </div>
      ) : (
        <div data-reveal className="max-w-4xl divide-y divide-white/[0.12]">
          {filteredFaqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.num || idx} className="py-7 sm:py-8 transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-start justify-between text-left gap-4 sm:gap-6 group focus:outline-none cursor-pointer"
                >
                  <div className="flex items-start gap-3 sm:gap-5">
                    {/* Index Number */}
                    <span className="font-mono-tech text-xs sm:text-sm tracking-wider text-[#C084FC] font-bold mt-1 shrink-0">
                      {item.num}
                    </span>

                    {/* Question + Category Badge */}
                    <div className="space-y-1">
                      <div className="inline-block font-display text-[10px] uppercase tracking-wider text-[#A855F7] font-semibold">
                        {item.categoryLabel}
                      </div>
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-[#FFFFFF] group-hover:text-[#C084FC] transition-colors leading-snug">
                        {item.q}
                      </h3>
                    </div>
                  </div>

                  {/* Expand/Collapse Toggle Button */}
                  <div className="p-2 sm:p-2.5 rounded-full border border-white/20 group-hover:border-[#8B5CF6] text-[#E2DEEC] group-hover:text-white transition-colors shrink-0 mt-1">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="mt-5 pl-7 sm:pl-10 pr-2 sm:pr-8 text-[#E2DEEC] font-sans text-base sm:text-lg font-normal leading-relaxed animate-in fade-in duration-200">
                    <p className="bg-white/[0.02] p-5 sm:p-6 rounded-xl border border-white/[0.08]">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Student Coordinator Contact & Help Desk Card */}
      <div data-reveal className="mt-20 max-w-4xl p-8 rounded-2xl border border-white/[0.14] bg-gradient-to-br from-[#0c051a] to-[#04010a] shadow-[0_0_35px_rgba(139,92,246,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-display tracking-widest uppercase text-[#C084FC] font-semibold">
            <Sparkles size={12} />
            DIRECT HUMAN ASSISTANCE
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white">
            Have a question not listed here?
          </h3>
          <p className="font-sans text-sm text-[#E2DEEC] leading-relaxed">
            Reach out to official Student Coordinator <strong className="text-white">Sruthi Nisha.J.S</strong> at {SEDS_CONFIG.institution}, Chennai for queries regarding team registration, tracks, presentation deck formatting, or hackathon logistics.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="tel:9884464389" 
              className="inline-flex items-center gap-2 font-mono text-sm text-white hover:text-[#C084FC] transition-colors"
            >
              <Phone size={14} className="text-[#A855F7]" />
              <span>+91 98844 64389</span>
            </a>
            <a 
              href="mailto:sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in" 
              className="inline-flex items-center gap-2 font-mono text-xs text-[#E2DEEC] hover:text-white transition-colors"
            >
              <Mail size={14} className="text-[#A855F7]" />
              <span>sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in</span>
            </a>
          </div>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-full border border-[#8B5CF6] bg-[#8B5CF6]/30 hover:bg-[#8B5CF6]/50 text-white font-display text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
            >
              <span>REGISTER (FREE ₹0)</span>
              <ArrowUpRight size={14} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
