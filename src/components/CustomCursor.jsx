import React, { useEffect, useState } from 'react';

/**
 * Minimal Custom Circular Cursor
 * Sharp dot + lagging thin orbital ring that expands smoothly over interactive elements.
 * Deep violet aura.
 */

export default function CustomCursor({ isPointer }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [lagPos, setLagPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target;
      const interactive = target.closest('button, a, input, select, textarea, [data-interactive="true"]');
      setIsHovered(!!interactive || isPointer);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let rafId;
    const updateLag = () => {
      setLagPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      rafId = requestAnimationFrame(updateLag);
    };
    rafId = requestAnimationFrame(updateLag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [pos, visible, isPointer]);

  if (!visible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Central Sharp Dot */}
      <div
        className="fixed w-1.5 h-1.5 rounded-full bg-[#F5F3FF] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_8px_#FFF]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
      {/* Lagging Subtle Orbital Ring */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isHovered
            ? 'w-10 h-10 border border-[#A855F7]/85 bg-[#8B5CF6]/15 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
            : 'w-6 h-6 border border-white/20'
        }`}
        style={{
          left: `${lagPos.x}px`,
          top: `${lagPos.y}px`,
        }}
      />
    </div>
  );
}
