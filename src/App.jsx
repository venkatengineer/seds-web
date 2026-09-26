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
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);

  // Boot sequence state
  const isAlreadyBooted = typeof window !== 'undefined' && sessionStorage.getItem('seds_boot_completed') === 'true';
  const [bootPhase, setBootPhase] = useState(isAlreadyBooted ? 7 : 0);
  const [isBootComplete, setIsBootComplete] = useState(isAlreadyBooted);
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

  // Global scroll listener for camera flight & progress
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

  // Continuous IntersectionObserver for section camera waypoints
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

  // Smooth Travel & Scroll to target sector
  const handleNavigate = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSkipBoot = () => {
    if (engineRef.current && engineRef.current.skipBoot) {
      engineRef.current.skipBoot();
    }
    setBootPhase(6);
    setTimeout(() => {
      setBootPhase(7);
      setIsBootComplete(true);
      try { sessionStorage.setItem('seds_boot_completed', 'true'); } catch (_) {}
    }, 450);
  };

  const handleReplayBoot = () => {
    try { sessionStorage.removeItem('seds_boot_completed'); } catch (_) {}
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
        scrollProgress={scrollProgress}
        isBootComplete={isBootComplete}
        activeChallengeIndex={activeChallengeIndex}
        onBootProgress={(phase) => {
          setBootPhase((prev) => (prev >= 6 && phase < 6 ? prev : phase));
        }}
        onBootComplete={() => {
          setBootPhase(7);
          setIsBootComplete(true);
          try { sessionStorage.setItem('seds_boot_completed', 'true'); } catch (_) {}
        }}
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
          onReplayBoot={handleReplayBoot}
        />

        {/* Hero Section: Staggered line reveal coordinated with Boot */}
        <HeroSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNavigate={handleNavigate}
          mousePos={mousePos}
          bootPhase={bootPhase}
        />

        {/* SEDS REC Mission: Staggered sequential reveals */}
        <MissionSection onNavigate={handleNavigate} />

        {/* SEDS REC Identity: Real documentary evidence with image masks */}
        <IdentitySection onNavigate={handleNavigate} />

        {/* Student Project Showcase: Real hardware with physical depth */}
        <ProjectShowcaseSection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* 5-Node Interactive Spatial Constellation */}
        <ChallengesSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNodeSelect={(idx) => setActiveChallengeIndex(idx)}
        />

        {/* Orbital Trajectory Timeline: Single Curve with Traveling Luminous Beacon */}
        <TimelineSection />

        {/* Launch Countdown: Smooth Sliding Numbers */}
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
