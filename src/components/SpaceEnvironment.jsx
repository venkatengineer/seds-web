import React, { useEffect, useRef } from 'react';

/**
 * SPACE ENVIRONMENT (Multi-Layered Volumetric Depth)
 * - Layer A (Deep Background): Microscopic stars with variations in size, opacity, and twinkling depth.
 * - Layer B (Cosmic Midground): Violet nebula clouds, volumetric purple radiance, soft purple cosmic dust.
 * - Parallax depth mapping: background shifts 2-5px, nebula shifts gently, foreground stays stable.
 */

export default function SpaceEnvironment({ mousePos }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // Varied stars with depth, color, and twinkling characteristics
    const starCount = Math.floor((width * height) / 10000); // balanced ~120-180 stars
    const stars = Array.from({ length: starCount }, () => {
      const depth = Math.random() * 0.5 + 0.1;
      const colorRoll = Math.random();
      const color = colorRoll > 0.85 ? '#A855F7' : colorRoll > 0.7 ? '#8B5CF6' : colorRoll > 0.6 ? '#4F46A5' : '#F5F3FF';
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * (depth > 0.35 ? 1.4 : 0.85) + 0.35,
        baseAlpha: Math.random() * 0.45 + 0.15,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
        phase: Math.random() * Math.PI * 2,
        depth: depth,
        color: color,
      };
    });

    // Soft cosmic dust particles (floating purple motes)
    const dustCount = 28;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.15,
      radius: Math.random() * 22 + 8,
      alpha: Math.random() * 0.06 + 0.02,
    }));

    let tick = 0;
    const render = () => {
      tick++;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Controlled mouse parallax offset (background moves 2-5px)
      const targetOffsetX = (mousePos.x - 0.5) * 12;
      const targetOffsetY = (mousePos.y - 0.5) * 12;

      // 1. Draw soft cosmic dust motes
      for (let j = 0; j < dustParticles.length; j++) {
        const d = dustParticles[j];
        d.x = (d.x + d.vx + width) % width;
        d.y = (d.y + d.vy + height) % height;

        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius);
        grad.addColorStop(0, `rgba(139, 92, 246, ${d.alpha})`);
        grad.addColorStop(1, 'rgba(2, 1, 7, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw stars with optical variance
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const alpha = s.baseAlpha + Math.sin(tick * s.twinkleSpeed + s.phase) * 0.18;
        const clampedAlpha = Math.max(0.05, Math.min(0.85, alpha));

        const px = (s.x + targetOffsetX * s.depth + width) % width;
        const py = (s.y + targetOffsetY * s.depth + height) % height;

        ctx.fillStyle = s.color === '#F5F3FF'
          ? `rgba(245, 243, 255, ${clampedAlpha})`
          : s.color === '#A855F7'
          ? `rgba(168, 85, 247, ${clampedAlpha * 1.1})`
          : s.color === '#8B5CF6'
          ? `rgba(139, 92, 246, ${clampedAlpha})`
          : `rgba(79, 70, 165, ${clampedAlpha})`;

        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for closer bright stars
        if (s.size > 1.2 && clampedAlpha > 0.4) {
          ctx.beginPath();
          ctx.arc(px, py, s.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(168, 85, 247, ${clampedAlpha * 0.18})`;
          ctx.fill();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setupCanvas);
    };
  }, [mousePos]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Volumetric Violet Nebula Cloud A (Primary Top-Right) */}
      <div 
        className="absolute -top-[15%] -right-[10%] w-[75vw] h-[75vw] rounded-full pointer-events-none opacity-45 nebula-cloud-primary transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * -18}px, ${(mousePos.y - 0.5) * -18}px)`,
        }}
      />

      {/* Volumetric Violet Nebula Cloud B (Deep Bottom-Left) */}
      <div 
        className="absolute -bottom-[20%] -left-[15%] w-[70vw] h-[70vw] rounded-full pointer-events-none opacity-35 nebula-cloud-secondary transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${(mousePos.x - 0.5) * 15}px, ${(mousePos.y - 0.5) * 15}px)`,
        }}
      />

      {/* Atmospheric Purple Center Core */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(109, 40, 217, 0.18) 0%, rgba(2, 1, 7, 0) 70%)',
          filter: 'blur(110px)',
        }}
      />

      {/* Canvas for varied stars and cosmic dust */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
