import React, { useEffect, useRef, useState } from 'react';

/**
 * Minimal Custom Circular Cursor
 * Sharp dot + lagging thin orbital ring that expands smoothly over interactive elements.
 * Deep violet aura.
 *
 * Hover states: interactive elements (filled violet ring), cards (wide soft ring), and a
 * squeeze on press.
 *
 * Positions are written straight to the DOM (no React re-render per mouse move):
 * the dot tracks the pointer 1:1 inside the event handler, and the ring follows
 * with a short frame-rate-independent ease on requestAnimationFrame.
 */

const RING_FOLLOW = 0.35; // fraction of remaining distance covered per 60fps frame

export default function CustomCursor({ isPointer }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOverCard, setIsOverCard] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

    const target = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let rafId = null;
    let lastTime = 0;
    let hasMoved = false;
    let pressTarget = 1;
    let pressScale = 1;

    const place = (el, x, y, scale = 1) => {
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const tick = (now) => {
      const dt = lastTime ? Math.min((now - lastTime) / 16.667, 4) : 1;
      lastTime = now;
      const k = 1 - Math.pow(1 - RING_FOLLOW, dt);
      ring.x += (target.x - ring.x) * k;
      ring.y += (target.y - ring.y) * k;
      pressScale += (pressTarget - pressScale) * (1 - Math.pow(1 - 0.3, dt));

      if (
        Math.abs(target.x - ring.x) < 0.1 &&
        Math.abs(target.y - ring.y) < 0.1 &&
        Math.abs(pressTarget - pressScale) < 0.002
      ) {
        ring.x = target.x;
        ring.y = target.y;
        pressScale = pressTarget;
        place(ringRef.current, ring.x, ring.y, pressScale);
        rafId = null;
        lastTime = 0;
        return;
      }
      place(ringRef.current, ring.x, ring.y, pressScale);
      rafId = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      place(dotRef.current, target.x, target.y);

      if (!hasMoved) {
        hasMoved = true;
        ring.x = target.x;
        ring.y = target.y;
        place(ringRef.current, ring.x, ring.y);
        setVisible(true);
      }
      if (rafId === null) rafId = requestAnimationFrame(tick);

      const interactive = e.target && e.target.closest
        ? e.target.closest('button, a, input, select, textarea, [data-interactive="true"]')
        : null;
      setIsHovered(!!interactive || isPointer);
      setIsOverCard(!interactive && !!(e.target && e.target.closest && e.target.closest('[data-fx-card]')));
    };

    const handleMouseDown = () => {
      pressTarget = 0.72;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };
    const handleMouseUp = () => {
      pressTarget = 1;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => {
      if (hasMoved) setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isPointer]);

  return (
    <div
      className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-150"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Central Sharp Dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 w-1.5 h-1.5 rounded-full bg-[#F5F3FF] shadow-[0_0_8px_#FFF] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      {/* Lagging Subtle Orbital Ring (only size/colour animate via CSS — position is driven by JS) */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full will-change-transform transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 border border-[#A855F7]/85 bg-[#8B5CF6]/15 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
            : isOverCard
              ? 'w-14 h-14 border border-[#C084FC]/45 bg-[#8B5CF6]/[0.06]'
              : 'w-6 h-6 border border-white/20'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </div>
  );
}
