import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import ThreeSpaceEngine from './components/ThreeSpaceEngine';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MissionSection from './components/MissionSection';
import IdentitySection from './components/IdentitySection';
import ChallengesSection from './components/ChallengesSection';
import BuildSection from './components/BuildSection';
import TimelineSection from './components/TimelineSection';
import CountdownSection from './components/CountdownSection';
import PrizesSection from './components/PrizesSection';
import SponsorsWall from './components/SponsorsWall';
import FaqSection from './components/FaqSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';
import BootSequence from './components/BootSequence';
import RegistrationPortal from './components/RegistrationPortal';
import { initScrollReveal, initScrollEffects, initPointerEffects } from './utils/motion';

// Sections that don't depend on mouse position are memoized so cursor movement
// doesn't re-render the whole page every frame
const MemoAbout = memo(AboutSection);
const MemoChallenges = memo(ChallengesSection);
const MemoBuild = memo(BuildSection);
const MemoTimeline = memo(TimelineSection);
const MemoCountdown = memo(CountdownSection);
const MemoSponsors = memo(SponsorsWall);
const MemoFaq = memo(FaqSection);
const MemoCta = memo(CallToActionSection);
const MemoMission = memo(MissionSection);
const MemoIdentity = memo(IdentitySection);
const MemoFooter = memo(Footer);

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);

  // Master Cinematic Boot Sequence: Begins at Phase 0 on initial visit
  const [bootPhase, setBootPhase] = useState(0);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const engineRef = useRef(null);

  // Mouse coordinate tracker for 3D camera parallax drift (batched to one update per frame)
  useEffect(() => {
    let rafId = null;
    let latest = null;
    const handleMouseMove = (e) => {
      latest = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          setMousePos(latest);
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Phones/tablets have no mouse: drive the same parallax from device tilt instead
    // (Android/Chrome expose it directly; iOS requires a permission prompt, so it simply stays centred there)
    const isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let baseBeta = null;
    const handleOrientation = (e) => {
      if (e.gamma == null || e.beta == null) return;
      if (baseBeta === null) baseBeta = e.beta;
      const clamp01 = (v) => Math.min(1, Math.max(0, v));
      latest = {
        x: clamp01(0.5 + e.gamma / 50),
        y: clamp01(0.5 + (e.beta - baseBeta) / 50),
      };
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          setMousePos(latest);
        });
      }
    };
    if (isTouch) window.addEventListener('deviceorientation', handleOrientation, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll reveals, scroll progress line and pointer effects start once the site is handed over from the intro
  const isSiteLive = bootPhase >= 13;
  useEffect(() => {
    if (!isSiteLive) return;
    const cleanups = [initScrollReveal(), initScrollEffects(), initPointerEffects()];
    return () => cleanups.forEach((fn) => fn());
  }, [isSiteLive]);

  // Lock scrolling while the intro plays so the page can't drift underneath it
  // (released at the handoff, while the hero is still invisible)
  const isIntroPlaying = bootPhase < 13;
  useEffect(() => {
    if (!isIntroPlaying) return;
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prevOverflow;
    };
  }, [isIntroPlaying]);

  // Focal IntersectionObserver for active navigation tracking (Zero scroll jitter)
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'tracks',
      'challenges',
      'build',
      'prizes',
      'timeline',
      'countdown',
      'partners',
      'faq',
      'cta',
      'mission',
      'identity',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -25% 0px', threshold: 0.1 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth Travel & Scroll to target sector
  const handleNavigate = useCallback((id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 88;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const openRegister = useCallback(() => setIsRegisterOpen(true), []);
  const handleChallengeSelect = useCallback((idx) => setActiveChallengeIndex(idx), []);

  const handleSkipBoot = () => {
    if (engineRef.current && engineRef.current.skipBoot) {
      engineRef.current.skipBoot();
    }
    // Go straight to the handoff: intro text exits, then the hero fades in (no overlap at phase 12)
    setBootPhase(13);
    setTimeout(() => {
      setIsBootComplete(true);
    }, 450);
  };

  const handleReplayBoot = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.location.reload();
  };

  return (
    <div className="relative min-h-screen bg-[#010106] text-[#F7F5FF] overflow-x-hidden selection:bg-[#8B5CF6]/30 selection:text-white">
      
      {/* 1. MASTER CINEMATIC BOOT SEQUENCE (Synchronized with ThreeSpaceEngine) */}
      <BootSequence
        bootPhase={bootPhase}
        onSkip={handleSkipBoot}
      />

      {/* 2. Custom Minimal Circular Cursor with Violet Expansion */}
      <CustomCursor isPointer={false} />

      {/* 3. Subtle Film Grain Overlay */}
      <div className="grain-overlay" />

      {/* 4. MASTER PERSISTENT 3D CELESTIAL ENGINE (Mounted ONCE, never torn down) */}
      <ThreeSpaceEngine
        ref={engineRef}
        activeSection={activeSection}
        mousePos={mousePos}
        isModalOpen={isRegisterOpen}
        isBootComplete={isBootComplete}
        activeChallengeIndex={activeChallengeIndex}
        onBootProgress={(phase) => {
          setBootPhase((prev) => (prev >= 13 && phase < 13 ? prev : phase));
        }}
        onBootComplete={() => {
          setBootPhase(13);
          setIsBootComplete(true);
        }}
      />

      {/* 5. FOREGROUND EDITORIAL UI (Fades in smoothly as boot completes) */}
      <div 
        className={`relative z-20 transition-opacity duration-700 ease-out ${
          bootPhase >= 13 ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Floating Minimal Navigation Dock */}
        <Navigation
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenRegister={openRegister}
          bootPhase={bootPhase}
          onReplayBoot={handleReplayBoot}
        />

        {/* Hero Section: Staggered line reveal coordinated with Boot */}
        <HeroSection
          onOpenRegister={openRegister}
          onNavigate={handleNavigate}
          mousePos={mousePos}
          bootPhase={bootPhase}
        />

        {/* 1. About SEDHACKS '26: Where Ideas Take Shape */}
        <MemoAbout
          onOpenRegister={openRegister}
          onNavigate={handleNavigate}
        />

        {/* 2. Tracks / Domains: Choose Your Mission (5 Official Domains) */}
        <MemoChallenges
          onOpenRegister={openRegister}
          onNodeSelect={handleChallengeSelect}
        />

        {/* 3. What Can You Build?: Your Idea. Your Build. */}
        <MemoBuild
          onOpenRegister={openRegister}
        />

        {/* 4. Why Participate?: ₹10,000 Prize Pool & Aeroin Space Tech Internships */}
        <PrizesSection
          onOpenRegister={openRegister}
          mousePos={mousePos}
        />

        {/* 5. Your Journey at SEDHACKS ’26 & 48-Hour Sprint Trajectory */}
        <MemoTimeline />

        {/* 6. Launch & Registration Deadline Countdown */}
        <MemoCountdown />

        {/* 7. Industry Collaboration: Aeroin Space Tech × SEDS REC */}
        <MemoSponsors />

        {/* 8. Frequently Asked Questions: Official 23 Directives + Handbook */}
        <MemoFaq onOpenRegister={openRegister} />

        {/* 9. Final Call to Action: Have an Idea Worth Building? */}
        <MemoCta onOpenRegister={openRegister} />

        {/* --- NON-HACKATHON / SEDS CHAPTER HERITAGE (Placed Last) --- */}

        {/* 10. SEDS REC Chapter Mission */}
        <MemoMission onNavigate={handleNavigate} />

        {/* 11. SEDS REC Student Identity & Laboratory Documentary */}
        <MemoIdentity onNavigate={handleNavigate} />

        {/* 12. Chapter Lineage & Student Coordinator Footer */}
        <MemoFooter
          onNavigate={handleNavigate}
          onOpenRegister={openRegister}
        />
      </div>

      {/* Registration Portal: Singularity Collapse Transition */}
      <RegistrationPortal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
