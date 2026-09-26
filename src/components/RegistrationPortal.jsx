import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * CINEMATIC REGISTRATION PORTAL
 * 
 * Target:
 * - Darkness.
 * - Distant purple light.
 * - Headline: READY TO BUILD BEYOND?
 * - Large CTA: REGISTER FOR ORBITAL 26
 * - Smooth transition into registration form & generated flight pass.
 */

export default function RegistrationPortal({ isOpen, onClose }) {
  const [animStage, setAnimStage] = useState('converge');
  const [step, setStep] = useState('prompt'); // 'prompt' | 'form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teamName: '',
    teamSize: 'Solo (1 Engineer)',
    track: EVENT_CONFIG.tracks[0].name,
    abstract: '',
  });
  const [ticketId, setTicketId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimStage('converge');
      setStep('prompt');
      const t = setTimeout(() => setAnimStage('revealed'), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const newId = `SEDS-REC-${randomHex}`;
    setTicketId(newId);
    setStep('success');

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#C084FC', '#6D28D9', '#F7F5FF'],
      disableForReducedMotion: true,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#020107]/94 backdrop-blur-2xl animate-in fade-in duration-400 overflow-hidden"
      onClick={onClose}
    >
      {/* Distant Purple Light in Center */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -z-10 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(76, 29, 149, 0.15) 50%, rgba(2, 1, 7, 0) 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Main Registration Modal Container */}
      <div 
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#04020A] p-8 sm:p-12 shadow-[0_0_90px_rgba(76,29,149,0.4)] transition-all duration-500 ease-out ${
          animStage === 'revealed' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
        >
          <X size={16} />
        </button>

        {/* STEP A: THE CINEMATIC EMOTIONAL PROMPT */}
        {step === 'prompt' && (
          <div className="py-8 text-center space-y-8">
            <div className="space-y-1">
              <div className="font-editorial text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
                {SEDS_CONFIG.name}
              </div>
              <div className="font-display text-xs tracking-[0.25em] text-[#8B5CF6] uppercase">
                {EVENT_CONFIG.presentsText} // {EVENT_CONFIG.name}
              </div>
            </div>

            <div className="pt-2">
              <h2 className="font-editorial text-4xl sm:text-6xl font-bold text-[#F7F5FF] tracking-tight leading-[0.98]">
                <div>READY TO</div>
                <div className="text-[#C084FC]">BUILD BEYOND?</div>
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#A6A0B8] font-light max-w-md mx-auto mt-4 leading-relaxed">
                48 hours of student aerospace engineering, orbital computation, and real flight software synthesis at {SEDS_CONFIG.institution}.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep('form')}
                className="group relative overflow-hidden px-9 py-4 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-[#F7F5FF] font-display text-xs uppercase tracking-[0.22em] font-semibold hover:shadow-[0_0_35px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 transition-all duration-300 ease-out focus:outline-none"
              >
                <span>REGISTER FOR ORBITAL 26</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP B: REGISTRATION FORM */}
        {step === 'form' && (
          <div>
            <div className="mb-6">
              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#8B5CF6] block mb-1 font-semibold">
                // CREW MANIFEST REGISTRATION
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F5FF]">
                AUTHORIZE REGISTRATION.
              </h3>
              <p className="font-sans text-xs text-[#A6A0B8] font-light mt-1">
                Open to all university student builders, astronomers, and computational engineers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    LEAD ENGINEER *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    INSTITUTIONAL EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="engineer@rec.edu.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    CREW / TEAM NAME
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. REC Orbital Unit"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    CREW SIZE
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  >
                    <option>Solo (1 Engineer)</option>
                    <option>Duo (2 Engineers)</option>
                    <option>Trio (3 Engineers)</option>
                    <option>Squad (4 Engineers)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                  MISSION TRACK *
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                >
                  {EVENT_CONFIG.tracks.map((t) => (
                    <option key={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                  TECHNICAL ABSTRACT / CONCEPT PROPOSAL
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of planned architecture, algorithm mechanics, or telemetry model..."
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-display text-[10px] uppercase tracking-wider text-[#A6A0B8]">
                  ZERO REGISTRATION FEES // OPEN STUDENT INITIATIVE
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs font-semibold uppercase tracking-[0.2em] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Confirm Manifest</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP C: GENERATED FLIGHT PASS */}
        {step === 'success' && (
          <div className="py-4">
            <div className="text-center mb-6">
              <span className="inline-flex p-3 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/20 text-[#C084FC] mb-3">
                <Check size={22} />
              </span>
              <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7F5FF] tracking-tight">
                MANIFEST VERIFIED.
              </h4>
              <p className="font-display text-xs text-[#8B5CF6] tracking-wider uppercase mt-1">
                SEDS REC FLIGHT REGISTRATION CONFIRMED
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#07030F] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <div className="font-editorial text-lg font-bold text-[#F7F5FF]">
                    {SEDS_CONFIG.name}
                  </div>
                  <div className="font-display text-[9px] text-[#A6A0B8] uppercase">
                    {EVENT_CONFIG.name} // REC CHAPTER
                  </div>
                </div>

                <div className="font-display text-xs text-[#8B5CF6] font-semibold">
                  {ticketId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-display">
                <div>
                  <span className="text-[#A6A0B8] block text-[9px] uppercase">LEAD ENGINEER</span>
                  <span className="text-[#F7F5FF]">{formData.name || 'Anonymous Builder'}</span>
                </div>
                <div>
                  <span className="text-[#A6A0B8] block text-[9px] uppercase">CREW</span>
                  <span className="text-[#F7F5FF]">{formData.teamName || 'Solo'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#A6A0B8] block text-[9px] uppercase">TRACK</span>
                  <span className="text-[#8B5CF6]">{formData.track}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-display text-[#A6A0B8] hover:text-white flex items-center justify-center gap-2"
              >
                <Copy size={13} />
                <span>{copied ? 'Pass ID Copied' : 'Copy Flight Pass ID'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-[#F7F5FF] text-black font-display text-xs uppercase tracking-wider font-semibold hover:bg-white"
              >
                Return to Mission
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
