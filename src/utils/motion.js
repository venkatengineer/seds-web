/**
 * SITE-WIDE MOTION LAYER
 *
 * Scroll animations:
 *  - Reveal on scroll: any `[data-reveal]` block (or `[data-reveal="scale"]`) and every child of a
 *    `[data-reveal-stagger]` grid fades/slides in as it enters the viewport (children cascade).
 *  - Thin violet scroll-progress line along the top of the viewport.
 *  - Hero content drifts up and fades as you scroll away from it (`[data-hero-scroll]`).
 *
 * Pointer animations:
 *  - Cards (children of `[data-reveal-stagger]` with rounded corners, or `[data-fx-card]`) get a
 *    soft spotlight that follows the pointer and a subtle 3D tilt (mouse/pen only).
 *  - Pill buttons are gently magnetic toward the cursor (mouse/pen only).
 *  - A ripple pulses out from every press on buttons, links and cards — mouse AND touch.
 *  - Touch: tapping a card lights its spotlight at the tap point.
 *
 * All state lives in data-attributes / inline styles React never manages, so re-renders can't clobber it.
 * Everything is skipped under `prefers-reduced-motion: reduce`.
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/* ------------------------------------------------------------------ */
/* 1. SCROLL REVEAL                                                    */
/* ------------------------------------------------------------------ */

export function initScrollReveal(root = document) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {};

  const targets = [];
  root.querySelectorAll('[data-reveal]').forEach((el) => targets.push({ el, delay: 0 }));
  root.querySelectorAll('[data-reveal-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      // Cascade siblings 90ms apart (capped so long grids don't drag)
      targets.push({ el: child, delay: Math.min(i, 6) * 90 });
    });
  });

  const delays = new WeakMap();
  const timers = new Set();

  const finish = (el) => {
    el.removeAttribute('data-sr');
    el.style.transitionDelay = '';
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        observer.unobserve(el);
        const delay = delays.get(el) || 0;
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.setAttribute('data-sr', 'shown');
        // Hand the element back to its own styles (hover lifts etc.) once the reveal has played
        const t = setTimeout(() => {
          timers.delete(t);
          finish(el);
        }, delay + 950);
        timers.add(t);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  targets.forEach(({ el, delay }) => {
    if (el.hasAttribute('data-sr')) return;
    delays.set(el, delay);
    el.setAttribute('data-sr', 'hidden');
    observer.observe(el);
  });

  return () => {
    observer.disconnect();
    timers.forEach(clearTimeout);
    targets.forEach(({ el }) => finish(el));
  };
}

/* ------------------------------------------------------------------ */
/* 2. SCROLL-LINKED EFFECTS (progress line + hero drift)               */
/* ------------------------------------------------------------------ */

export function initScrollEffects() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  const reduced = prefersReducedMotion();
  const hero = document.querySelector('[data-hero-scroll]');
  let rafId = null;

  const update = () => {
    rafId = null;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    bar.style.transform = `scaleX(${p})`;

    if (hero && !reduced) {
      const heroP = clamp(window.scrollY / (window.innerHeight * 0.85), 0, 1);
      hero.style.setProperty('--hero-progress', heroP.toFixed(4));
    }
  };

  const onScroll = () => {
    if (rafId === null) rafId = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (rafId !== null) cancelAnimationFrame(rafId);
    bar.remove();
    if (hero) hero.style.removeProperty('--hero-progress');
  };
}

/* ------------------------------------------------------------------ */
/* 3. POINTER EFFECTS                                                   */
/* ------------------------------------------------------------------ */

const CARD_SEL = '[data-fx-card]';
const MAGNET_SEL = 'button.rounded-full, a.rounded-full';
const PRESSABLE_SEL = 'button, a, [role="button"], [data-fx-card]';

export function initPointerEffects(root = document) {
  if (prefersReducedMotion()) return () => {};

  // Tag cards: grid children with rounded corners, plain backgrounds (spotlight uses background-image)
  const tagged = [];
  root.querySelectorAll('[data-reveal-stagger] > *').forEach((el) => {
    if (!/\brounded-(xl|2xl|3xl)\b/.test(el.className)) return;
    if (getComputedStyle(el).backgroundImage !== 'none') return;
    el.setAttribute('data-fx-card', '');
    tagged.push(el);
  });

  // Ripple layer (outside React's tree)
  const rippleLayer = document.createElement('div');
  rippleLayer.className = 'fx-ripple-layer';
  rippleLayer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(rippleLayer);

  let activeCard = null;
  let activeMagnet = null;
  const magnets = new Map(); // el -> { x, y, tx, ty }
  let magnetRaf = null;
  let lastMagnetTime = 0;
  const touchTimers = new Set();

  /* --- Card spotlight + tilt --- */
  const setSpot = (card, clientX, clientY) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${clientX - r.left}px`);
    card.style.setProperty('--my', `${clientY - r.top}px`);
    return r;
  };

  const releaseCard = (card) => {
    card.removeAttribute('data-fx-hover');
    card.style.transform = '';
  };

  const handleCardMove = (e) => {
    const card = e.target.closest ? e.target.closest(CARD_SEL) : null;
    if (card !== activeCard) {
      if (activeCard) releaseCard(activeCard);
      activeCard = card;
      if (card) card.setAttribute('data-fx-hover', '');
    }
    if (!card) return;
    const r = setSpot(card, e.clientX, e.clientY);
    if (card.hasAttribute('data-sr')) return; // don't tilt while it's still revealing
    // Bigger cards tilt less so large panels stay calm
    const maxDeg = clamp(1500 / Math.max(r.width, 1), 1.5, 6);
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${(-py * 2 * maxDeg).toFixed(2)}deg) rotateY(${(px * 2 * maxDeg).toFixed(2)}deg)`;
  };

  /* --- Magnetic buttons (JS-eased so it never fights the button's own CSS transitions) --- */
  const magnetTick = (now) => {
    const dt = lastMagnetTime ? Math.min((now - lastMagnetTime) / 16.667, 4) : 1;
    lastMagnetTime = now;
    const k = 1 - Math.pow(1 - 0.22, dt);
    magnets.forEach((st, el) => {
      st.x += (st.tx - st.x) * k;
      st.y += (st.ty - st.y) * k;
      const settled = Math.abs(st.tx - st.x) < 0.05 && Math.abs(st.ty - st.y) < 0.05;
      if (settled && st.tx === 0 && st.ty === 0 && el !== activeMagnet) {
        el.style.transform = '';
        el.style.transitionProperty = '';
        magnets.delete(el);
      } else {
        el.style.transform = `translate3d(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px, 0)`;
      }
    });
    if (magnets.size) {
      magnetRaf = requestAnimationFrame(magnetTick);
    } else {
      magnetRaf = null;
      lastMagnetTime = 0;
    }
  };
  const kickMagnets = () => {
    if (magnetRaf === null) magnetRaf = requestAnimationFrame(magnetTick);
  };

  const qualifiesAsMagnet = (el) =>
    el && el.offsetWidth >= 110 && el.offsetWidth <= 520 && !el.closest('[data-no-magnet]');

  const handleMagnetMove = (e) => {
    let el = e.target.closest ? e.target.closest(MAGNET_SEL) : null;
    if (!qualifiesAsMagnet(el)) el = null;
    if (el !== activeMagnet) {
      if (activeMagnet && magnets.has(activeMagnet)) {
        const st = magnets.get(activeMagnet);
        st.tx = 0;
        st.ty = 0;
      }
      activeMagnet = el;
      if (el && !magnets.has(el)) {
        // Exclude `transform` from the button's own transition list while JS drives it
        const props = getComputedStyle(el).transitionProperty;
        el.style.transitionProperty =
          props === 'all' || props.includes('transform')
            ? 'color, background-color, border-color, box-shadow, opacity, translate, scale'
            : props;
        magnets.set(el, { x: 0, y: 0, tx: 0, ty: 0 });
      }
    }
    if (el) {
      const st = magnets.get(el);
      const r = el.getBoundingClientRect();
      const cx = r.left - st.x + r.width / 2;
      const cy = r.top - st.y + r.height / 2;
      st.tx = clamp((e.clientX - cx) * 0.28, -10, 10);
      st.ty = clamp((e.clientY - cy) * 0.4, -7, 7);
    }
    kickMagnets();
  };

  /* --- Press ripple (mouse + touch) --- */
  const spawnRipple = (x, y, strong) => {
    const ripple = document.createElement('span');
    ripple.className = 'fx-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    rippleLayer.appendChild(ripple);
    const anim = ripple.animate(
      [
        { transform: 'translate(-50%, -50%) scale(0.2)', opacity: strong ? 0.75 : 0.55 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
      ],
      { duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
    anim.onfinish = () => ripple.remove();
  };

  /* --- Event wiring --- */
  const onPointerMove = (e) => {
    if (e.pointerType === 'touch') return;
    handleCardMove(e);
    handleMagnetMove(e);
  };

  const onPointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const target = e.target.closest ? e.target.closest(PRESSABLE_SEL) : null;
    if (!target) return;
    spawnRipple(e.clientX, e.clientY, e.pointerType === 'touch');

    if (e.pointerType === 'touch') {
      const card = e.target.closest(CARD_SEL);
      if (card) {
        setSpot(card, e.clientX, e.clientY);
        card.setAttribute('data-fx-hover', '');
        const t = setTimeout(() => {
          touchTimers.delete(t);
          card.removeAttribute('data-fx-hover');
        }, 650);
        touchTimers.add(t);
      }
    }
  };

  const onLeaveWindow = () => {
    if (activeCard) releaseCard(activeCard);
    activeCard = null;
    if (activeMagnet && magnets.has(activeMagnet)) {
      const st = magnets.get(activeMagnet);
      st.tx = 0;
      st.ty = 0;
    }
    activeMagnet = null;
    kickMagnets();
  };

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  document.addEventListener('mouseleave', onLeaveWindow);

  return () => {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerdown', onPointerDown);
    document.removeEventListener('mouseleave', onLeaveWindow);
    if (magnetRaf !== null) cancelAnimationFrame(magnetRaf);
    touchTimers.forEach(clearTimeout);
    magnets.forEach((_, el) => {
      el.style.transform = '';
      el.style.transitionProperty = '';
    });
    tagged.forEach((el) => {
      releaseCard(el);
      el.removeAttribute('data-fx-card');
    });
    rippleLayer.remove();
  };
}
