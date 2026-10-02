import React, { useState, useEffect, useRef } from 'react';
import ThreeSpaceEngine from './components/ThreeSpaceEngine';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import IdentitySection from './components/IdentitySection';
import ChallengesSection from './components/ChallengesSection';
import TimelineSection from './components/TimelineSection';
import CountdownSection from './components/CountdownSection';
import PrizesSection from './components/PrizesSection';
import SponsorsWall from './components/SponsorsWall';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import BootSequence from './components/BootSequence';
import RegistrationPortal from './components/RegistrationPortal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);

  // Master Cinematic Boot Sequence: Begins at Phase 0 on initial visit
  const [bootPhase, setBootPhase] = useState(0);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const engineRef = useRef(null);

  // Mouse coordinate tracker for 3D camera parallax drift
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Focal IntersectionObserver for active navigation tracking (Zero scroll jitter)
  useEffect(() => {
    const sections = [
      'hero',
      'tracks',
      'challenges',
      'prizes',
      'timeline',
      'countdown',
      'faq',
      'partners',
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
  const handleNavigate = (id) => {
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
  };

  const handleSkipBoot = () => {
    if (engineRef.current && engineRef.current.skipBoot) {
      engineRef.current.skipBoot();
    }
    setBootPhase(12);
    setTimeout(() => {
      setBootPhase(13);
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
        className={`relative z-20 transition-opacity duration-1000 ${
          bootPhase >= 12 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Floating Minimal Navigation Dock */}
        <Navigation
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenRegister={() => setIsRegisterOpen(true)}
          bootPhase={bootPhase}
          onReplayBoot={handleReplayBoot}
        />

        {/* Hero Section: Staggered line reveal coordinated with Boot */}
        <HeroSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNavigate={handleNavigate}
          mousePos={mousePos}
          bootPhase={bootPhase}
        />

        {/* 1. 5 Official Hackathon Tracks: Positioned first right after Hero */}
        <ChallengesSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNodeSelect={(idx) => setActiveChallengeIndex(idx)}
        />

        {/* 2. Hackathon Rewards: ₹10,000 Prize Pool & Aeroin Space Tech Internships */}
        <PrizesSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          mousePos={mousePos}
        />

        {/* 3. 48-Hour Hackathon Mission Trajectory */}
        <TimelineSection />

        {/* 4. Launch & Registration Deadline Countdown */}
        <CountdownSection />

        {/* 5. Hackathon Directives & Clarification FAQs */}
        <FaqSection onOpenRegister={() => setIsRegisterOpen(true)} />

        {/* 6. Institutional & Industry Collaboration Network */}
        <SponsorsWall />

        {/* --- NON-HACKATHON / SEDS CHAPTER HERITAGE (Placed Last) --- */}

        {/* 7. SEDS REC Chapter Mission */}
        <MissionSection onNavigate={handleNavigate} />

        {/* 8. SEDS REC Student Identity & Laboratory Documentary */}
        <IdentitySection onNavigate={handleNavigate} />

        {/* 9. Chapter Lineage & Student Coordinator Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenRegister={() => setIsRegisterOpen(true)}
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
