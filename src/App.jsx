import React, { useState, useEffect, useRef } from 'react';
import ThreeSpaceEngine from './components/ThreeSpaceEngine';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import IdentitySection from './components/IdentitySection';
import ProjectShowcaseSection from './components/ProjectShowcaseSection';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Boot sequence state (0 to 7)
  const isAlreadyBooted = typeof window !== 'undefined' && sessionStorage.getItem('seds_boot_completed') === 'true';
  const [bootPhase, setBootPhase] = useState(isAlreadyBooted ? 7 : 0);

  // 1. Master Cinematic Boot Sequence Timer (Phases 0 through 7)
  useEffect(() => {
    if (bootPhase >= 7) return;

    const timers = [
      setTimeout(() => setBootPhase(1), 400),   // Phase 1: Light spreads, stars fade in
      setTimeout(() => setBootPhase(2), 1200),  // Phase 2: Space forms, orbit draws 0->100%
      setTimeout(() => setBootPhase(3), 2000),  // Phase 3: Sunlight illuminates Earth limb
      setTimeout(() => setBootPhase(4), 2800),  // Phase 4: SEDS REC identity reveals
      setTimeout(() => setBootPhase(5), 3600),  // Phase 5: ORBITAL 26 reveals
      setTimeout(() => setBootPhase(6), 4400),  // Phase 6: Hero headline reveals line by line
      setTimeout(() => {
        setBootPhase(7);                        // Phase 7: Navigation & full interaction unlocked
        sessionStorage.setItem('seds_boot_completed', 'true');
      }, 5400),
    ];

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        skipBoot();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const skipBoot = () => {
    setBootPhase(6);
    setTimeout(() => {
      setBootPhase(7);
      sessionStorage.setItem('seds_boot_completed', 'true');
    }, 500);
  };

  const replayBoot = () => {
    sessionStorage.removeItem('seds_boot_completed');
    window.scrollTo({ top: 0, behavior: 'instant' });
    setBootPhase(0);
  };

  // 2. Mouse coordinate tracker for 3D camera parallax drift
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

  // 3. Scroll listener for hero camera forward travel & global progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalDocHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = totalDocHeight > 0 ? scrollY / totalDocHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. Continuous IntersectionObserver for section camera waypoints
  useEffect(() => {
    const sections = [
      'hero',
      'mission',
      'identity',
      'projects',
      'challenges',
      'timeline',
      'countdown',
      'prizes',
      'partners',
      'faq',
    ];
    const observers = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.22 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Smooth 3D Travel & Scroll to target sector
  const handleNavigate = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#010106] text-[#F7F5FF] overflow-x-hidden selection:bg-[#8B5CF6]/30 selection:text-white">
      
      {/* 1. MASTER CINEMATIC BOOT SEQUENCE (Unifies with same 3D scene) */}
      <BootSequence
        bootPhase={bootPhase}
        onSkip={skipBoot}
        onAdvancePhase={(p) => setBootPhase(p)}
      />

      {/* 2. Custom Minimal Circular Cursor with Violet Expansion */}
      <CustomCursor isPointer={false} />

      {/* 3. Subtle Film Grain Overlay */}
      <div className="grain-overlay" />

      {/* 4. MASTER PERSISTENT 3D CELESTIAL ENGINE (Runs continuously from Boot through entire site) */}
      <ThreeSpaceEngine
        activeSection={activeSection}
        mousePos={mousePos}
        isModalOpen={isRegisterOpen}
        scrollProgress={scrollProgress}
        bootPhase={bootPhase}
      />

      {/* 5. FOREGROUND EDITORIAL UI */}
      <div 
        className={`relative z-20 transition-opacity duration-1000 ${
          bootPhase >= 6 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Floating Minimal Navigation Dock (Fades in at Phase 7) */}
        <Navigation
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenRegister={() => setIsRegisterOpen(true)}
          bootPhase={bootPhase}
          onReplayBoot={replayBoot}
        />

        {/* Hero Section: SEDS REC PRESENTS ORBITAL 26 // BUILD BEYOND THE KNOWN */}
        <HeroSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNavigate={handleNavigate}
          mousePos={mousePos}
          bootPhase={bootPhase}
        />

        {/* SEDS REC Mission: SPACE IS NOT JUST TO BE OBSERVED. IT IS TO BE BUILT. */}
        <MissionSection onNavigate={handleNavigate} />

        {/* SEDS REC Identity: STUDENTS. BUILDERS. EXPLORERS. */}
        <IdentitySection onNavigate={handleNavigate} />

        {/* Student Project Showcase: Engineering Proof with Authentic Documentary Imagery */}
        <ProjectShowcaseSection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* 5-Node Interactive Spatial Constellation & Editorial Challenge Chapters */}
        <ChallengesSection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* Orbital Trajectory Timeline: Single Curve with Traveling Luminous Beacon */}
        <TimelineSection />

        {/* Launch Countdown: Within Astronomical Environment with Smooth Sliding Digits */}
        <CountdownSection />

        {/* Monumental Prize Destination: ₹50,000 Spatial Composition */}
        <PrizesSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          mousePos={mousePos}
        />

        {/* Institutional & Chapter Partners Logo Wall */}
        <SponsorsWall />

        {/* SEDS REC Directives & Operational FAQ */}
        <FaqSection />

        {/* Chapter Lineage Footer */}
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
