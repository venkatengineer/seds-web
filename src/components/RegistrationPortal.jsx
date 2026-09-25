import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * REFINED REGISTRATION PORTAL
 * 
 * Philosophy:
 * - Emotional conclusion of the deep space journey.
 * - Smooth convergence into a quiet violet singularity focal point (NO flash, NO explosion).
 * - Text: READY TO BUILD THE UNKNOWN? [ REGISTER ]
 * - Button hover: Light gently expands, button slightly rises 2-3px, surrounding space responds softly.
 * - ZERO flashing, ZERO rapid pulsing.
 */

export default function RegistrationPortal({ isOpen, onClose }) {
  const [animStage, setAnimStage] = useState('converge'); // 'converge' | 'revealed'
  const [step, setStep] = useState('prompt'); // 'prompt' | 'form' | 'success'
  const [focusedField, setFocusedField] = useState(null);
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
      const t = setTimeout(() => setAnimStage('revealed'), 400);
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

    // Quiet, elegant confetti sparks (lavender, violet, white)
    confetti({
      particleCount: 50,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#020107]/92 backdrop-blur-xl animate-in fade-in duration-400 overflow-hidden"
      onClick={onClose}
    >
      {/* Main Registration Modal Container */}
      <div 
        className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#04020A] p-8 sm:p-12 shadow-[0_0_80px_rgba(76,29,149,0.35)] transition-all duration-500 ease-out ${
          animStage === 'revealed' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors"
          data-interactive="true"
        >
          <X size={16} />
        </button>

        {/* STEP A: THE SINGULARITY EMOTIONAL PROMPT */}
        {step === 'prompt' && (
          <div className="py-6 text-center space-y-6">
            <div className="space-y-1">
              <div className="font-editorial text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
                {SEDS_CONFIG.name}
              </div>
              <div className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8B5CF6] uppercase">
                PRESENTS // {EVENT_CONFIG.name}
              </div>
            </div>

            <div className="pt-2">
              <h2 className="font-editorial text-4xl sm:text-5xl font-bold text-[#F7F5FF] tracking-tight leading-[1.05]">
                <div>READY TO BUILD</div>
                <div className="text-[#C084FC]">THE UNKNOWN?</div>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#A6A0B8] font-light max-w-md mx-auto mt-4 leading-relaxed">
                48 hours of computational aerospace engineering and orbital problem solving at {SEDS_CONFIG.institution}.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setStep('form')}
                className="group relative overflow-hidden px-10 py-3.5 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-[#F7F5FF] font-mono-tech text-xs uppercase tracking-[0.25em] font-semibold hover:shadow-[0_0_35px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition-all duration-400 ease-out focus:outline-none"
                data-interactive="true"
              >
                <span>[ REGISTER ]</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP B: REGISTRATION FORM */}
        {step === 'form' && (
          <div>
            <div className="mb-6">
              <span className="font-mono-tech text-[10px] tracking-[0.3em] uppercase text-[#8B5CF6] block mb-1">
                // CREW MANIFEST
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#F7F5FF]">
                AUTHORIZE REGISTRATION.
              </h3>
              <p className="font-sans text-xs text-[#A6A0B8] font-light mt-1">
                Open to all student engineers and researchers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    LEAD ENGINEER *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senthil Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-mono-tech text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    TRANSMISSION EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="engineer@rec.edu.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-mono-tech text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    CREW / TEAM NAME
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. REC Orbital Unit"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-mono-tech text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    CREW COMPLEMENT
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] font-mono-tech text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                  >
                    <option>Solo (1 Engineer)</option>
                    <option>Duo (2 Engineers)</option>
                    <option>Trio (3 Engineers)</option>
                    <option>Squad (4 Engineers)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                  MISSION VECTOR *
                </label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] font-mono-tech text-xs focus:outline-none focus:border-[#8B5CF6] transition-all"
                >
                  {EVENT_CONFIG.tracks.map((t) => (
                    <option key={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                  ABSTRACT / PROPOSAL
                </label>
                <textarea
                  rows={2}
                  placeholder="Summary of research focus or algorithmic architecture..."
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-mono-tech text-xs focus:outline-none focus:border-[#8B5CF6] transition-all resize-none"
                />
              </div>

              <div className="pt-4 hairline-dark-t flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono-tech text-[9px] text-[#A6A0B8]">
                  ZERO FEES // OPEN ACCESS
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-mono-tech text-xs font-semibold uppercase tracking-[0.2em] hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2"
                  data-interactive="true"
                >
                  <span>Authorize Pass</span>
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
                TRANSMISSION VERIFIED.
              </h4>
              <p className="font-mono-tech text-xs text-[#8B5CF6] tracking-wider uppercase mt-1">
                SEDS REC MANIFEST CONFIRMED
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#07030F] p-6 space-y-4">
              <div className="flex items-center justify-between hairline-dark-b pb-3">
                <div>
                  <div className="font-editorial text-lg font-bold text-[#F7F5FF]">
                    {SEDS_CONFIG.name}
                  </div>
                  <div className="font-mono-tech text-[8px] text-[#A6A0B8] uppercase">
                    {EVENT_CONFIG.name} // REC CHAPTER
                  </div>
                </div>

                <div className="font-mono-tech text-xs text-[#8B5CF6] font-semibold">
                  {ticketId}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono-tech">
                <div>
                  <span className="text-[#A6A0B8] block text-[9px] uppercase">LEAD PILOT</span>
                  <span className="text-[#F7F5FF]">{formData.name || 'Anonymous'}</span>
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
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono-tech text-[#A6A0B8] hover:text-white flex items-center justify-center gap-2"
              >
                <Copy size={13} />
                <span>{copied ? 'Pass ID Copied' : 'Copy Flight ID'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-[#F7F5FF] text-black font-mono-tech text-xs uppercase tracking-wider font-semibold hover:bg-white"
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
