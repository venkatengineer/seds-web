import React, { useState, useEffect } from 'react';
import { X, Clock, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

/**
 * DEADLINE EXTENSION POPUP
 * 
 * Appears smoothly after the cinematic bootsplash sequence completes.
 * Alerts visitors that the registration deadline has been extended until today 11:59 PM IST.
 */
export default function DeadlineExtensionPopup({ isOpen, onClose, onOpenRegister }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const target = new Date('2026-10-09T23:59:59+05:30').getTime();
    const diff = Math.max(0, target - Date.now());
    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isExpired: diff <= 0,
    };
  });

  useEffect(() => {
    const target = new Date('2026-10-09T23:59:59+05:30').getTime();
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isExpired: diff <= 0,
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const hStr = String(timeLeft.hours).padStart(2, '0');
  const mStr = String(timeLeft.minutes).padStart(2, '0');
  const sStr = String(timeLeft.seconds).padStart(2, '0');

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40 animate-in slide-in-from-bottom-2 fade-in duration-500">
      <div className="relative overflow-hidden rounded-2xl border border-[#A855F7]/60 bg-[#0B061A]/95 backdrop-blur-2xl p-5 shadow-[0_0_40px_rgba(168,85,247,0.35),0_15px_35px_rgba(0,0,0,0.85)] select-none">
        
        {/* Subtle Ambient Violet Corner Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8B5CF6]/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#4C1D95]/30 rounded-full blur-xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C084FC] opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A855F7]" />
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9333EA]/30 border border-[#C084FC]/40 text-[#E9D5FF] text-[10px] font-mono font-bold tracking-widest uppercase">
              <Zap size={10} className="text-[#C084FC]" />
              TIME EXTENDED
            </span>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={onClose}
            className="text-[#A6A0B8] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
            title="Dismiss notification"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mt-3">
          <div className="flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-[#4C1D95]/40 border border-[#8B5CF6]/30 text-[#C084FC] shrink-0 mt-0.5 shadow-[0_0_15px_rgba(139,92,246,0.25)]">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="font-editorial text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
                Time Extended Till Today 11:59 PM!
              </h3>
              <p className="font-sans text-xs text-[#E2DEEC] mt-1 leading-relaxed">
                Registration for <strong className="text-white font-semibold">{EVENT_CONFIG.name}</strong> has been extended till today <span className="text-[#C084FC] font-semibold">11:59 PM IST</span>. Register fast before slots close!
              </p>
            </div>
          </div>

          {/* Live Remaining Countdown Strip */}
          {!timeLeft.isExpired && (
            <div className="mt-3 py-1.5 px-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between font-mono text-[11px] text-[#E2DEEC]">
              <span className="flex items-center gap-1 text-[#C084FC]">
                <Clock size={11} />
                CLOSES IN:
              </span>
              <span className="font-bold text-white tracking-widest">
                {hStr}h : {mStr}m : {sStr}s
              </span>
            </div>
          )}

          {/* Primary Action Button */}
          <div className="mt-3.5 flex items-center gap-2">
            <button
              onClick={() => {
                if (onOpenRegister) onOpenRegister();
                if (onClose) onClose();
              }}
              className="flex-1 group flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] hover:from-[#6D28D9] hover:to-[#9333EA] text-white font-display text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)] transition-all cursor-pointer"
            >
              <span>Register Fast</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-[#E2DEEC] hover:text-white font-display text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>

          <div className="mt-2 text-center font-mono text-[10px] text-[#A6A0B8] uppercase tracking-wider">
            100% Free Entry (₹0 Fee) • REC Students Only
          </div>
        </div>

      </div>
    </div>
  );
}
