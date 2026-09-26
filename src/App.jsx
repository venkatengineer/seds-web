import React, { useState, useEffect } from 'react';
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
import EntryLoader from './components/EntryLoader';
import RegistrationPortal from './components/RegistrationPortal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

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

  // Scroll listener for hero camera forward travel
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(scrollY / windowHeight, 1.0);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to continuously synchronize active section & 3D camera waypoints
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
        { threshold: 0.25 }
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
    <div className="relative min-h-screen bg-[#020107] text-[#F7F5FF] overflow-x-hidden selection:bg-[#8B5CF6]/30 selection:text-white">
      
      {/* 1. Cinematic Entry Experience */}
      <EntryLoader onComplete={() => setHasEntered(true)} />

      {/* 2. Custom Minimal Circular Cursor with Violet Expansion */}
      <CustomCursor isPointer={false} />

      {/* 3. Subtle Film Grain Overlay */}
      <div className="grain-overlay" />

      {/* 4. MASTER 3D SPACE ENVIRONMENT & CINEMATIC CAMERA SYSTEM */}
      <ThreeSpaceEngine
        activeSection={activeSection}
        mousePos={mousePos}
        isModalOpen={isRegisterOpen}
        scrollProgress={scrollProgress}
      />

      {/* 5. FOREGROUND EDITORIAL UI */}
      <div className="relative z-20">
        {/* Floating Minimal Navigation Dock */}
        <Navigation
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* Hero Section: SEDS REC PRESENTS ORBITAL 26 // BUILD BEYOND THE KNOWN */}
        <HeroSection
          onOpenRegister={() => setIsRegisterOpen(true)}
          onNavigate={handleNavigate}
          mousePos={mousePos}
          scrollProgress={scrollProgress}
        />

        {/* SEDS REC Mission: SPACE IS NOT JUST TO BE OBSERVED. IT IS TO BE BUILT. */}
        <MissionSection onNavigate={handleNavigate} />

        {/* SEDS REC Identity: STUDENTS. BUILDERS. EXPLORERS. */}
        <IdentitySection onNavigate={handleNavigate} />

        {/* Student Project Showcase: Engineering Proof with Authentic Documentary Imagery */}
        <ProjectShowcaseSection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* Large Editorial Challenge Explorer: Propulsion, Satellites, Astrodynamics, Exploration */}
        <ChallengesSection
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        {/* Orbital Trajectory Timeline: Single Elegant Trajectory with Traveling Point */}
        <TimelineSection />

        {/* Launch Countdown: Within Astronomical Environment */}
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

      {/* Registration Portal: Emotional Singularity Transition */}
      <RegistrationPortal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
