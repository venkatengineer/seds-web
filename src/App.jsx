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
import AdminPortal from './components/AdminPortal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);

  // Check URL parameters for organizer direct access (?admin=1 or #admin)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || params.get('admin') === 'true' || window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }

      // Keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
          e.preventDefault();
          setIsAdminOpen((prev) => !prev);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  // Boot sequence state
  const isAlreadyBooted = typeof window !== 'undefined' && sessionStorage.getItem('seds_boot_completed') === 'true';
  const [bootPhase, setBootPhase] = useState(isAlreadyBooted ? 13 : 0);
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

  // Focal IntersectionObserver for active navigation tracking (Zero scroll jitter)
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
      element.scrollIntoView({ behavior: 'smooth' });
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
        isBootComplete={isBootComplete}
        activeChallengeIndex={activeChallengeIndex}
        onBootProgress={(phase) => {
          setBootPhase((prev) => (prev >= 13 && phase < 13 ? prev : phase));
        }}
        onBootComplete={() => {
          setBootPhase(13);
          setIsBootComplete(true);
          try { sessionStorage.setItem('seds_boot_completed', 'true'); } catch (_) {}
        }}
      />

      {/* 5. FOREGROUND EDITORIAL UI */}
      <div 
        className={`relative z-20 transition-opacity duration-1000 ${
          bootPhase >= 12 ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </div>

      {/* Registration Portal: Singularity Collapse Transition */}
      <RegistrationPortal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* Restricted Organizer Telemetry Clearance Desk */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
