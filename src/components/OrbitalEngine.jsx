import React, { useEffect, useRef } from 'react';

/**
 * ELEVATED ORBITAL SYSTEM (Midground Layer)
 * 1 major orbit + 2-3 secondary intersecting orbits + controlled orbital particles.
 * Reacts to scroll with section-based camera parameters and mouse parallax.
 * Collapses into a violet singularity during registration transition.
 */

const SECTION_CONFIGS = {
  hero: {
    cx: 0.68,
    cy: 0.48,
    rx: 560,
    ry: 290,
    rotation: -28,
    secondRotation: 36,
    thirdRotation: -75,
    strokeAlpha: 0.32,
    secondaryAlpha: 0.15,
    glowIntensity: 0.55,
    speed: 0.0006,
    scale: 1.0,
  },
  mission: {
    cx: 0.50,
    cy: 0.50,
    rx: 460,
    ry: 260,
    rotation: 18,
    secondRotation: -40,
    thirdRotation: 60,
    strokeAlpha: 0.35,
    secondaryAlpha: 0.18,
    glowIntensity: 0.5,
    speed: 0.00045,
    scale: 0.95,
  },
  challenges: {
    cx: 0.50,
    cy: 0.48,
    rx: 400,
    ry: 400, // Circular alignment for challenge nodes
    rotation: 0,
    secondRotation: 75,
    thirdRotation: -45,
    strokeAlpha: 0.38,
    secondaryAlpha: 0.2,
    glowIntensity: 0.65,
    speed: 0.0005,
    scale: 1.05,
  },
  timeline: {
    cx: 0.50,
    cy: 0.54,
    rx: 720,
    ry: 230,
    rotation: -8,
    secondRotation: 25,
    thirdRotation: -50,
    strokeAlpha: 0.35,
    secondaryAlpha: 0.16,
    glowIntensity: 0.6,
    speed: 0.0004,
    scale: 1.0,
  },
  countdown: {
    cx: 0.50,
    cy: 0.50,
    rx: 500,
    ry: 500, // Massive subtle circle framing countdown
    rotation: 45,
    secondRotation: -45,
    thirdRotation: 0,
    strokeAlpha: 0.32,
    secondaryAlpha: 0.18,
    glowIntensity: 0.5,
    speed: 0.0003,
    scale: 1.1,
  },
  prizes: {
    cx: 0.50,
    cy: 0.46,
    rx: 540,
    ry: 340,
    rotation: 0,
    secondRotation: 42,
    thirdRotation: -65,
    strokeAlpha: 0.42,
    secondaryAlpha: 0.22,
    glowIntensity: 0.85,
    speed: 0.0005,
    scale: 1.25,
  },
  sponsors: {
    cx: 0.50,
    cy: 0.50,
    rx: 480,
    ry: 290,
    rotation: -18,
    secondRotation: 35,
    thirdRotation: -70,
    strokeAlpha: 0.3,
    secondaryAlpha: 0.14,
    glowIntensity: 0.5,
    speed: 0.0004,
    scale: 1.05,
  },
  faq: {
    cx: 0.50,
    cy: 0.50,
    rx: 430,
    ry: 250,
    rotation: -32,
    secondRotation: 28,
    thirdRotation: 80,
    strokeAlpha: 0.25,
    secondaryAlpha: 0.1,
    glowIntensity: 0.4,
    speed: 0.0004,
    scale: 0.95,
  },
};

export default function OrbitalEngine({ activeSection, mousePos, isModalOpen, scrollProgress = 0 }) {
  const canvasRef = useRef(null);

  // Interpolated smooth state
  const stateRef = useRef({
    cx: 0.68,
    cy: 0.48,
    rx: 560,
    ry: 290,
    rotation: -28,
    secondRotation: 36,
    thirdRotation: -75,
    strokeAlpha: 0.32,
    secondaryAlpha: 0.15,
    glowIntensity: 0.55,
    speed: 0.0006,
    scale: 1.0,
    angleOffset1: 0,
    angleOffset2: 0,
    singularityScale: 1.0, // For registration collapse
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

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

    const lerp = (a, b, t) => a + (b - a) * t;

    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const targetConfig = SECTION_CONFIGS[activeSection] || SECTION_CONFIGS.hero;
      const s = stateRef.current;

      // Singularity collapse transition when registration modal is open
      const targetSingularity = isModalOpen ? 0.03 : 1.0;
      s.singularityScale = lerp(s.singularityScale, targetSingularity, 0.09);

      // Smooth interpolation toward section parameters
      const lerpSpeed = 0.045;
      s.cx = lerp(s.cx, targetConfig.cx, lerpSpeed);
      s.cy = lerp(s.cy, targetConfig.cy, lerpSpeed);

      const isMobile = width < 768;
      const scaleMultiplier = isMobile ? (width / 520) : (Math.min(width, 1800) / 1440);

      // Camera forward movement on scroll in hero
      const scrollZoom = activeSection === 'hero' ? (1 + scrollProgress * 0.15) : 1.0;

      const targetRx = targetConfig.rx * scaleMultiplier * targetConfig.scale * s.singularityScale * scrollZoom;
      const targetRy = (isMobile ? targetConfig.rx * 0.95 : targetConfig.ry) * scaleMultiplier * targetConfig.scale * s.singularityScale * scrollZoom;

      s.rx = lerp(s.rx, targetRx, lerpSpeed);
      s.ry = lerp(s.ry, targetRy, lerpSpeed);
      s.rotation = lerp(s.rotation, isMobile ? 85 : targetConfig.rotation, lerpSpeed);
      s.secondRotation = lerp(s.secondRotation, isMobile ? -25 : targetConfig.secondRotation, lerpSpeed);
      s.thirdRotation = lerp(s.thirdRotation, isMobile ? 45 : targetConfig.thirdRotation, lerpSpeed);
      s.strokeAlpha = lerp(s.strokeAlpha, targetConfig.strokeAlpha, lerpSpeed);
      s.secondaryAlpha = lerp(s.secondaryAlpha, targetConfig.secondaryAlpha, lerpSpeed);
      s.glowIntensity = lerp(s.glowIntensity, targetConfig.glowIntensity, lerpSpeed);
      s.speed = lerp(s.speed, isModalOpen ? 0.0035 : targetConfig.speed, lerpSpeed);

      // Parallax mouse offsets (orbital geometry moves slightly faster than background: ~30-45px)
      const mouseOffsetX = (mousePos.x - 0.5) * 42;
      const mouseOffsetY = (mousePos.y - 0.5) * 42;
      const mouseTilt = (mousePos.x - 0.5) * 6;

      const centerX = s.cx * width + mouseOffsetX;
      const centerY = s.cy * height + mouseOffsetY;
      const totalRotation1 = ((s.rotation + mouseTilt) * Math.PI) / 180;
      const totalRotation2 = ((s.secondRotation + mouseTilt * 0.8) * Math.PI) / 180;
      const totalRotation3 = ((s.thirdRotation + mouseTilt * 0.5) * Math.PI) / 180;

      s.angleOffset1 += s.speed;
      s.angleOffset2 -= s.speed * 1.35;

      // ----------------------------------------------------------------------
      // 1. THIRD ORBITAL REFERENCE PATH (Distant, soft, subtle purple-blue)
      // ----------------------------------------------------------------------
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(totalRotation3);

      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * 1.35, s.ry * 1.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(79, 70, 165, ${s.secondaryAlpha * 0.5})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 20]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // ----------------------------------------------------------------------
      // 2. SECONDARY INTERSECTING ORBIT (Electric Violet #A855F7)
      // ----------------------------------------------------------------------
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(totalRotation2);

      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * 0.96, s.ry * 0.88, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(168, 85, 247, ${s.secondaryAlpha * 0.85})`;
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Particle 2 moving along secondary orbit
      const p2x = s.rx * 0.96 * Math.cos(s.angleOffset2);
      const p2y = s.ry * 0.88 * Math.sin(s.angleOffset2);
      ctx.beginPath();
      ctx.arc(p2x, p2y, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = '#A855F7';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p2x, p2y, 7, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.25)';
      ctx.fill();

      ctx.restore();

      // ----------------------------------------------------------------------
      // 3. MAJOR PRIMARY ORBIT (SEDS Cosmic Violet #8B5CF6 & Deep Purple #6D28D9)
      // ----------------------------------------------------------------------
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(totalRotation1);

      // Outer Concentric Hairline Track
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * 1.18, s.ry * 1.18, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245, 243, 255, ${s.secondaryAlpha * 0.45})`;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 18]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Primary Volumetric Atmospheric Glow along Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, ${s.glowIntensity * 0.18})`;
      ctx.lineWidth = 10;
      ctx.stroke();

      // Primary Ring Gradient Stroke
      const grad = ctx.createLinearGradient(-s.rx, -s.ry, s.rx, s.ry);
      grad.addColorStop(0, `rgba(245, 243, 255, ${s.strokeAlpha * 0.3})`);
      grad.addColorStop(0.35, `rgba(109, 40, 217, ${s.glowIntensity * 0.95})`);
      grad.addColorStop(0.65, `rgba(139, 92, 246, ${s.glowIntensity})`);
      grad.addColorStop(0.85, `rgba(168, 85, 247, ${s.glowIntensity * 0.9})`);
      grad.addColorStop(1, `rgba(245, 243, 255, ${s.strokeAlpha * 0.3})`);

      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Inner Reference Ellipse
      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx * 0.76, s.ry * 0.76, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245, 243, 255, ${s.secondaryAlpha * 0.35})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Astronomical Degree Graduation Ticks (48 divisions)
      const tickCount = 48;
      for (let i = 0; i < tickCount; i++) {
        const theta = (i * 2 * Math.PI) / tickCount;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        const isMajor = i % 6 === 0;

        const p1x = s.rx * cos;
        const p1y = s.ry * sin;
        const tickLength = isMajor ? 7.5 : 3.5;
        const p2x = (s.rx + tickLength) * cos;
        const p2y = (s.ry + tickLength) * sin;

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.strokeStyle = isMajor
          ? `rgba(168, 85, 247, ${s.strokeAlpha * 0.9})`
          : `rgba(245, 243, 255, ${s.strokeAlpha * 0.25})`;
        ctx.lineWidth = isMajor ? 1.2 : 0.6;
        ctx.stroke();
      }

      // Traveling Primary Luminous Particle (Node 1) with Vector Trail
      const nodeAngle = s.angleOffset1 % (Math.PI * 2);
      const nx = s.rx * Math.cos(nodeAngle);
      const ny = s.ry * Math.sin(nodeAngle);

      const trailAngle = nodeAngle - 0.28;
      const tx = s.rx * Math.cos(trailAngle);
      const ty = s.ry * Math.sin(trailAngle);

      const trailGrad = ctx.createLinearGradient(tx, ty, nx, ny);
      trailGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
      trailGrad.addColorStop(1, 'rgba(168, 85, 247, 0.85)');

      ctx.beginPath();
      ctx.ellipse(0, 0, s.rx, s.ry, 0, trailAngle, nodeAngle);
      ctx.strokeStyle = trailGrad;
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Particle 1 Core & Luminous Aura
      ctx.beginPath();
      ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#8B5CF6';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(nx, ny, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(168, 85, 247, 0.35)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(nx, ny, 1.4, 0, Math.PI * 2);
      ctx.fillStyle = '#F5F3FF';
      ctx.fill();

      // Cardinal stationary reference points
      const cardinalAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      cardinalAngles.forEach((angle) => {
        const qx = s.rx * Math.cos(angle);
        const qy = s.ry * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(qx, qy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 243, 255, ${s.strokeAlpha * 0.85})`;
        ctx.fill();
      });

      // Singularity core when registration collapses
      if (s.singularityScale < 0.6) {
        ctx.beginPath();
        ctx.arc(0, 0, 18 * (1 - s.singularityScale), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${0.95 * (1 - s.singularityScale)})`;
        ctx.fill();
      }

      ctx.restore();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setupCanvas);
    };
  }, [activeSection, mousePos, isModalOpen, scrollProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
