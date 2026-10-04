import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { playSignalTone, playLightSweepTone } from '../utils/audio';

/**
 * MASTER CINEMATIC SPACE ENGINE — "THE SIGNAL" & ORBITAL 26
 * 
 * Flawless Architecture:
 * - Single persistent WebGL context mounted once.
 * - Single primary orbital trajectory around Earth with 100% precision satellite tracking.
 * - The Signal: the opening centre dot is the orbital satellite's beacon. It transforms into the satellite,
 *   its orbit traces outward from it, and it starts revolving as the camera pulls back to the Earth sunrise.
 * - Zero stray objects, zero rogue moons without orbits, zero duplicate or stationary floating satellites.
 * - Completely smooth 60fps render loop with Hermite scroll waypoints and 3-layer parallax.
 */

// Continuous orbital trajectory milestones along scroll progress (0.00 -> 1.00)
// Restores the dynamic, prominent Earth movement and deep-space orbital sweep from the 1st prototype
const SCROLL_MILESTONES = [
  // 0.00: HERO APEX — Monumental Earth limb on the right with atmospheric rim glow
  { t: 0.00, cam: new THREE.Vector3(0, 0, 105), look: new THREE.Vector3(0, 0, 0), earth: new THREE.Vector3(36, 1.5, -10), scale: 1.00 },
  // 0.16: HACKATHON TRACKS — Earth dips gracefully lower and deeper, opening spatial clearance for track cards
  { t: 0.16, cam: new THREE.Vector3(2, -2, 98), look: new THREE.Vector3(-2, -1, 0), earth: new THREE.Vector3(43, -6, -20), scale: 0.94 },
  // 0.32: SEDS MISSION — Ascending perspective, Earth glides higher and closer, revealing southern hemisphere
  { t: 0.32, cam: new THREE.Vector3(-4, 3, 92), look: new THREE.Vector3(3, 1, 0), earth: new THREE.Vector3(33, 6, -15), scale: 0.98 },
  // 0.48: SEDS IDENTITY — Wide orbit traverse, Earth sweeps horizontally across background depth
  { t: 0.48, cam: new THREE.Vector3(3, -2, 88), look: new THREE.Vector3(-2, -1, 0), earth: new THREE.Vector3(44, -4, -19), scale: 0.93 },
  // 0.62: TIMELINE TRAJECTORY — Earth aligns with the traveling orbital flight beacon
  { t: 0.62, cam: new THREE.Vector3(-2, 2, 86), look: new THREE.Vector3(2, 0, 0), earth: new THREE.Vector3(34, 4, -14), scale: 0.97 },
  // 0.76: COUNTDOWN HORIZON — Earth aligns with the astronomical circular horizon arc
  { t: 0.76, cam: new THREE.Vector3(0, -3, 89), look: new THREE.Vector3(1, -1, 0), earth: new THREE.Vector3(37, -4, -13), scale: 0.99 },
  // 0.88: PRIZES & REWARDS — Earth looms majestically large with brilliant specular ocean shine
  { t: 0.88, cam: new THREE.Vector3(3, 1, 93), look: new THREE.Vector3(-1, 0, 0), earth: new THREE.Vector3(35, 2, -11), scale: 1.03 },
  // 1.00: DIRECTIVES & FOOTER — Smooth orbital return into stable apex perspective
  { t: 1.00, cam: new THREE.Vector3(0, 0, 102), look: new THREE.Vector3(0, 0, 0), earth: new THREE.Vector3(36, 1.5, -11), scale: 1.00 },
];

function getScrollWaypoint(progress) {
  const p = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < SCROLL_MILESTONES.length - 1; i++) {
    const m1 = SCROLL_MILESTONES[i];
    const m2 = SCROLL_MILESTONES[i + 1];
    if (p >= m1.t && p <= m2.t) {
      const alpha = (p - m1.t) / (m2.t - m1.t);
      const s = alpha * alpha * (3 - 2 * alpha);
      return {
        cam: new THREE.Vector3().lerpVectors(m1.cam, m2.cam, s),
        look: new THREE.Vector3().lerpVectors(m1.look, m2.look, s),
        earth: new THREE.Vector3().lerpVectors(m1.earth, m2.earth, s),
        scale: THREE.MathUtils.lerp(m1.scale, m2.scale, s),
      };
    }
  }
  const last = SCROLL_MILESTONES[SCROLL_MILESTONES.length - 1];
  return { cam: last.cam.clone(), look: last.look.clone(), earth: last.earth.clone(), scale: last.scale };
}

const ThreeSpaceEngine = forwardRef(function ThreeSpaceEngine({ 
  activeSection = 'hero', 
  mousePos = { x: 0.5, y: 0.5 }, 
  isModalOpen = false, 
  onBootProgress,
  onBootComplete,
  isBootComplete = false,
  activeChallengeIndex = 0,
}, ref) {
  const containerRef = useRef(null);
  const bootTlRef = useRef(null);

  // Live props ref so animation loop reads latest values without triggering re-render
  const propsRef = useRef({
    activeSection,
    mousePos,
    isModalOpen,
    activeChallengeIndex,
    isBootComplete,
  });

  useEffect(() => {
    propsRef.current = {
      activeSection,
      mousePos,
      isModalOpen,
      activeChallengeIndex,
      isBootComplete,
    };
  }, [activeSection, mousePos, isModalOpen, activeChallengeIndex, isBootComplete]);

  // Master Boot & Motion State Object driven by GSAP
  const motionRef = useRef({
    // Camera Position & Target
    camX: 0,
    camY: 0,
    camZ: isBootComplete ? 105 : 300,
    lookX: 0,
    lookY: 0,
    lookZ: isBootComplete ? 0 : -35,
    fov: 46,

    // Phase 1 & 2: The Signal & Stars
    signalPointAlpha: isBootComplete ? 0.0 : 0.0,
    signalGlowAlpha: isBootComplete ? 0.0 : 0.0,
    starDeepAlpha: isBootComplete ? 0.85 : 0.0,
    starMidAlpha: isBootComplete ? 0.90 : 0.0,
    nebulaAlpha: isBootComplete ? 0.04 : 0.0,

    // Legacy intro spacecraft — kept hidden; the orbital satellite now carries the whole intro
    introSatOpacity: 0.0,

    // The Signal -> Satellite (Phases 1-3): the centre dot IS the orbital satellite's beacon
    satMorph: isBootComplete ? 1.0 : 0.0, // 0 = pure signal dot, 1 = fully formed satellite
    signalFlare: 0.0,
    satRimLight: isBootComplete ? 1.2 : 0.0,
    satFillLight: isBootComplete ? 0.7 : 0.0,
    satEmitterLight: isBootComplete ? 2.2 : 0.0,
    satSolarDeploy: isBootComplete ? 1.57 : 0.0,
    satSpeed: isBootComplete ? 1.0 : 0.0, // 0 = parked at the start of its orbit, 1 = cruising
    satFocus: isBootComplete ? 0.0 : 1.0, // 1 = camera locked onto the satellite
    focusDist: 335,
    focusOffX: 0,
    focusOffY: 0,

    // Phase 4: Earth & Sunlight
    earthRevealAlpha: isBootComplete ? 1.0 : 0.0,
    earthPosX: isBootComplete ? 36 : 22,
    earthPosY: isBootComplete ? 1.5 : -18,
    earthPosZ: isBootComplete ? -10 : -15,
    earthScale: isBootComplete ? 1.0 : 0.9,
    sunIntensity: isBootComplete ? 2.8 : 0.0,
    atmosphereAlpha: isBootComplete ? 1.0 : 0.0,

    // Phase 5 & 6: Single Orbital Trajectory
    orbitDrawProgress: isBootComplete ? 1.0 : 0.0,
    orbitLineAlpha: isBootComplete ? 0.45 : 0.0,
    orbitBeaconAlpha: isBootComplete ? 1.0 : 0.0,

    // Phase 10 & 11: Title Orbit Path & Light Sweep
    titleOrbitAlpha: 0.0,
    titleOrbitProgress: 0.0,
    sweepLightX: -90.0,
    sweepLightAlpha: 0.0,

    // Post-Boot & Registration Singularities
    singularityFactor: 1.0,
  });

  // Skip boot handler
  const introSpacecraftRef = useRef(null);

  useImperativeHandle(ref, () => ({
    skipBoot: () => {
      if (bootTlRef.current) {
        bootTlRef.current.kill();
      }
      gsap.to(motionRef.current, {
        camX: 0,
        camY: 0,
        camZ: 105,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        fov: 46,
        starDeepAlpha: 0.85,
        starMidAlpha: 0.90,
        nebulaAlpha: 0.04,
        introSatOpacity: 0.0,
        earthRevealAlpha: 1.0,
        earthPosX: 36,
        earthPosY: 1.5,
        earthPosZ: -10,
        earthScale: 1.0,
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        orbitDrawProgress: 1.0,
        orbitLineAlpha: 0.45,
        orbitBeaconAlpha: 1.0,
        satMorph: 1.0,
        signalFlare: 0.0,
        satRimLight: 0.9,
        satFillLight: 0.6,
        satEmitterLight: 2.2,
        satSolarDeploy: 1.57,
        satSpeed: 1.0,
        satFocus: 0.0,
        sweepLightAlpha: 0.0,
        titleOrbitAlpha: 0.0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          if (introSpacecraftRef.current) {
            introSpacecraftRef.current.visible = false;
          }
          if (onBootComplete) onBootComplete();
        }
      });
    }
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = null;
    let renderer = null;
    let bootTl = null;
    let handleResize = null;

    try {
      let width = window.innerWidth;
      let height = window.innerHeight;
      const isMobile = width < 768;
      // Phones/tablets: lighter textures, geometry and pixel ratio so the GPU isn't overloaded
      const isLowPower = isMobile || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

      // 1. SCENE SETUP
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x010106, 0.00065);

      const camera = new THREE.PerspectiveCamera(
        motionRef.current.fov,
        width / height,
        0.1,
        6000
      );
      camera.position.set(motionRef.current.camX, motionRef.current.camY, motionRef.current.camZ);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowPower ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);

    // 2. DIRECTIONAL & AMBIENT LIGHTING
    const sunLight = new THREE.DirectionalLight(0xffffff, motionRef.current.sunIntensity);
    sunLight.position.set(95, 34, 75);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x04020B, 0.45);
    scene.add(ambientLight);

    const satRimLight = new THREE.DirectionalLight(0xD8B4FE, motionRef.current.satRimLight);
    satRimLight.position.set(-15, 12, 10);
    scene.add(satRimLight);

    const satFillLight = new THREE.DirectionalLight(0x7C3AED, motionRef.current.satFillLight);
    satFillLight.position.set(15, -8, 20);
    scene.add(satFillLight);

    // 3. TEXTURE GENERATORS & LOADERS
    const makeGlowTex = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 128;
      cvs.height = 128;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.18, 'rgba(192, 132, 252, 0.95)');
      grad.addColorStop(0.45, 'rgba(124, 58, 237, 0.4)');
      grad.addColorStop(1, 'rgba(1, 1, 6, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(cvs);
    };
    const glowTex = makeGlowTex();

    // High-res (4K) planetary maps for Earth
    // day = surface albedo, night = city lights, brc = R: bump, G: roughness (oceans dark), B: clouds
    const texLoader = new THREE.TextureLoader();
    const texRes = isLowPower ? 2048 : 4096;
    const earthDayTex = texLoader.load(`/textures/planets/earth_day_${texRes}.jpg`);
    const earthNightTex = texLoader.load(`/textures/planets/earth_night_${texRes}.jpg`);
    const earthBrcTex = texLoader.load(`/textures/planets/earth_bump_roughness_clouds_${texRes}.jpg`);

    // Color maps must be decoded as sRGB, otherwise the planet renders washed-out and grey
    earthDayTex.colorSpace = THREE.SRGBColorSpace;
    earthNightTex.colorSpace = THREE.SRGBColorSpace;

    const maxAniso = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    [earthDayTex, earthNightTex, earthBrcTex].forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.anisotropy = maxAniso;
    });

    // 4. MULTI-LAYER COSMIC STARFIELD
    const starDeepCount = isMobile ? 1200 : 2500;
    const starDeepGeo = new THREE.BufferGeometry();
    const starDeepPos = new Float32Array(starDeepCount * 3);
    const starDeepColors = new Float32Array(starDeepCount * 3);

    const starPal = [
      new THREE.Color('#F7F5FF'),
      new THREE.Color('#E0D8FF'),
      new THREE.Color('#C4B5FD'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#93C5FD'),
    ];

    for (let i = 0; i < starDeepCount; i++) {
      const i3 = i * 3;
      starDeepPos[i3] = (Math.random() - 0.5) * 3600;
      starDeepPos[i3 + 1] = (Math.random() - 0.5) * 2600;
      starDeepPos[i3 + 2] = (Math.random() - 0.5) * 3800 - 600;

      const c = starPal[Math.floor(Math.random() * starPal.length)];
      starDeepColors[i3] = c.r;
      starDeepColors[i3 + 1] = c.g;
      starDeepColors[i3 + 2] = c.b;
    }

    starDeepGeo.setAttribute('position', new THREE.BufferAttribute(starDeepPos, 3));
    starDeepGeo.setAttribute('color', new THREE.BufferAttribute(starDeepColors, 3));

    const starDeepMat = new THREE.PointsMaterial({
      size: 1.1,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: motionRef.current.starDeepAlpha,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starDeepField = new THREE.Points(starDeepGeo, starDeepMat);
    scene.add(starDeepField);

    // Mid-range stars layer
    const starMidCount = isMobile ? 400 : 800;
    const starMidGeo = new THREE.BufferGeometry();
    const starMidPos = new Float32Array(starMidCount * 3);
    const starMidColors = new Float32Array(starMidCount * 3);

    for (let i = 0; i < starMidCount; i++) {
      const i3 = i * 3;
      starMidPos[i3] = (Math.random() - 0.5) * 2200;
      starMidPos[i3 + 1] = (Math.random() - 0.5) * 1600;
      starMidPos[i3 + 2] = (Math.random() - 0.5) * 2000 - 100;

      const c = starPal[Math.floor(Math.random() * starPal.length)];
      starMidColors[i3] = c.r;
      starMidColors[i3 + 1] = c.g;
      starMidColors[i3 + 2] = c.b;
    }

    starMidGeo.setAttribute('position', new THREE.BufferAttribute(starMidPos, 3));
    starMidGeo.setAttribute('color', new THREE.BufferAttribute(starMidColors, 3));

    const starMidMat = new THREE.PointsMaterial({
      size: 1.6,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: motionRef.current.starMidAlpha,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starMidField = new THREE.Points(starMidGeo, starMidMat);
    scene.add(starMidField);

    // Subtle dark volumetric nebula clouds
    const nebulaGroup = new THREE.Group();
    const nebulaGeo = new THREE.PlaneGeometry(750, 750);
    for (let i = 0; i < 5; i++) {
      const nebulaMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        color: i % 2 === 0 ? new THREE.Color('#1A0A38') : new THREE.Color('#2A0A4A'),
        transparent: true,
        opacity: motionRef.current.nebulaAlpha,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(nebulaGeo, nebulaMat);
      mesh.position.set(
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 900,
        (Math.random() - 0.5) * 1200 - 800
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.scale.setScalar(Math.random() * 1.6 + 1.1);
      nebulaGroup.add(mesh);
    }
    scene.add(nebulaGroup);

    // 5. INTRODUCTORY SPACECRAFT WITH "THE SIGNAL" EMITTER (Phases 1-3 only)
    const introSpacecraftGroup = new THREE.Group();
    introSpacecraftGroup.position.set(0, 0, -35);
    scene.add(introSpacecraftGroup);
    introSpacecraftRef.current = introSpacecraftGroup;

    // Hull unfolds out of the signal dot (scaled by satMorph); the dot itself stays on the outer group
    const introHull = new THREE.Group();
    introHull.scale.setScalar(Math.max(0.001, motionRef.current.satMorph));
    introSpacecraftGroup.add(introHull);

    // 3U Modular Bus Chassis
    const satChassisGeo = new THREE.BoxGeometry(1.2, 1.2, 2.8);
    const satChassisMat = new THREE.MeshStandardMaterial({
      color: 0x1A1626,
      metalness: 0.94,
      roughness: 0.22,
      transparent: true,
      opacity: 1.0,
    });
    const satChassis = new THREE.Mesh(satChassisGeo, satChassisMat);
    introHull.add(satChassis);

    // MLI Gold Kapton Thermal Blanket Facets
    const mliGeo = new THREE.PlaneGeometry(1.16, 2.7);
    const mliMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      metalness: 0.88,
      roughness: 0.32,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });
    const mliTop = new THREE.Mesh(mliGeo, mliMat);
    mliTop.position.set(0, 0.605, 0);
    mliTop.rotation.x = -Math.PI / 2;
    introHull.add(mliTop);

    // Corner Deployer Rails
    const railGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.9, 8);
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x9388A2,
      metalness: 0.95,
      roughness: 0.15,
      transparent: true,
      opacity: 1.0,
    });
    [
      [-0.6, -0.6],
      [0.6, -0.6],
      [-0.6, 0.6],
      [0.6, 0.6],
    ].forEach(([rx, ry]) => {
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(rx, ry, 0);
      rail.rotation.x = Math.PI / 2;
      introHull.add(rail);
    });

    // Articulated Solar Array Wings
    const solarHingeLeft = new THREE.Group();
    solarHingeLeft.position.set(-0.6, 0, 0);
    introHull.add(solarHingeLeft);

    const solarHingeRight = new THREE.Group();
    solarHingeRight.position.set(0.6, 0, 0);
    introHull.add(solarHingeRight);

    const panelGeo = new THREE.BoxGeometry(2.2, 0.05, 1.4);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x12162B,
      metalness: 0.88,
      roughness: 0.16,
      emissive: 0x1D1445,
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 1.0,
    });

    const leftPanel = new THREE.Mesh(panelGeo, panelMat);
    leftPanel.position.set(-1.1, 0, 0);
    solarHingeLeft.add(leftPanel);

    const rightPanel = new THREE.Mesh(panelGeo, panelMat);
    rightPanel.position.set(1.1, 0, 0);
    solarHingeRight.add(rightPanel);

    // High-Gain Parabolic Communications Dish
    const dishGeo = new THREE.ConeGeometry(0.65, 0.3, 24, 1, true);
    const dishMat = new THREE.MeshStandardMaterial({
      color: 0xDFE3E8,
      metalness: 0.92,
      roughness: 0.18,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.position.set(0, 0, -1.55);
    dish.rotation.x = Math.PI;
    introHull.add(dish);

    // Forward Optical Telemetry Mast
    const mastGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.7, 12);
    const mastMat = new THREE.MeshStandardMaterial({
      color: 0x2E1065,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 1.0,
    });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.set(0, 0, 1.6);
    mast.rotation.x = Math.PI / 2;
    introHull.add(mast);

    // THE SIGNAL EMITTER (Housed directly on the forward mast)
    const signalCoreGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const signalCoreMat = new THREE.MeshBasicMaterial({
      color: 0xF7F5FF,
      transparent: true,
      opacity: motionRef.current.signalPointAlpha,
    });
    const signalCoreMesh = new THREE.Mesh(signalCoreGeo, signalCoreMat);
    signalCoreMesh.position.set(0, 0, 2.0);
    introSpacecraftGroup.add(signalCoreMesh);

    // Atmospheric violet scattering halo
    const signalHaloGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const signalHaloMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      color: 0x8B5CF6,
      transparent: true,
      opacity: motionRef.current.signalGlowAlpha,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const signalHaloMesh = new THREE.Mesh(signalHaloGeo, signalHaloMat);
    signalHaloMesh.position.set(0, 0, 2.0);
    introSpacecraftGroup.add(signalHaloMesh);

    const signalPointLight = new THREE.PointLight(0xA855F7, motionRef.current.satEmitterLight, 18);
    signalPointLight.position.set(0, 0, 2.2);
    introSpacecraftGroup.add(signalPointLight);

    // Hull materials fade together as the spacecraft exits (instead of popping out)
    const introSatMats = [satChassisMat, mliMat, railMat, panelMat, dishMat, mastMat];

    // 6. MONUMENTAL PLANETARY SYSTEM (Earth Viewed from Orbit)
    const celestialSystem = new THREE.Group();
    celestialSystem.position.set(motionRef.current.earthPosX, motionRef.current.earthPosY, motionRef.current.earthPosZ);
    scene.add(celestialSystem);

    // Axial Tilt
    const axialTiltGroup = new THREE.Group();
    axialTiltGroup.rotation.z = THREE.MathUtils.degToRad(-23.5);
    celestialSystem.add(axialTiltGroup);

    // Photorealistic Earth (Radius 28)
    // Custom shaders lit ONLY by the sun direction, so the violet spacecraft rim/fill
    // lights no longer tint the planet purple.
    const planetRadius = 28.0;
    const sunDirWorld = new THREE.Vector3(95, 34, 75).normalize();

    // Shared uniforms: sun direction is supplied in VIEW space and refreshed every frame
    const earthUniforms = {
      uSunDirView: { value: new THREE.Vector3() },
      uSunIntensity: { value: motionRef.current.sunIntensity },
      uReveal: { value: motionRef.current.earthRevealAlpha },
      uAtmosphereAlpha: { value: motionRef.current.atmosphereAlpha },
      uAtmoDayColor: { value: new THREE.Color('#4db2ff') },
      uAtmoTwilightColor: { value: new THREE.Color('#bc490b') },
    };

    const earthVertexShader = `
      varying vec2 vUv;
      varying vec3 vNormalView;
      varying vec3 vViewPos;
      void main() {
        vUv = uv;
        vNormalView = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPos = mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const earthAtmoChunk = `
      uniform vec3 uSunDirView;
      uniform float uAtmosphereAlpha;
      uniform vec3 uAtmoDayColor;
      uniform vec3 uAtmoTwilightColor;

      // Blue sky on the day side, warm orange scattering along the terminator
      vec3 atmosphereColor(float sunOrientation) {
        return mix(uAtmoTwilightColor, uAtmoDayColor, smoothstep(-0.05, 0.45, sunOrientation));
      }
    `;

    const planetMat = new THREE.ShaderMaterial({
      uniforms: {
        ...earthUniforms,
        uDayMap: { value: earthDayTex },
        uNightMap: { value: earthNightTex },
        uBrcMap: { value: earthBrcTex },
        uBumpScale: { value: 0.08 },
      },
      vertexShader: earthVertexShader,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormalView;
        varying vec3 vViewPos;
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uBrcMap;
        uniform float uBumpScale;
        uniform float uSunIntensity;
        uniform float uReveal;
        ${earthAtmoChunk}

        // Derivative-based bump mapping (Mikkelsen) — terrain relief along the terminator
        vec3 perturbNormal(vec3 surfPos, vec3 surfNorm) {
          vec2 dSTdx = dFdx(vUv);
          vec2 dSTdy = dFdy(vUv);
          float hll = texture2D(uBrcMap, vUv).r;
          vec2 dHdxy = uBumpScale * vec2(
            texture2D(uBrcMap, vUv + dSTdx).r - hll,
            texture2D(uBrcMap, vUv + dSTdy).r - hll
          );
          vec3 sigmaX = dFdx(surfPos);
          vec3 sigmaY = dFdy(surfPos);
          vec3 r1 = cross(sigmaY, surfNorm);
          vec3 r2 = cross(surfNorm, sigmaX);
          float det = dot(sigmaX, r1);
          vec3 grad = sign(det) * (dHdxy.x * r1 + dHdxy.y * r2);
          return normalize(abs(det) * surfNorm - grad);
        }

        void main() {
          vec3 geomN = normalize(vNormalView);
          vec3 V = normalize(-vViewPos);
          vec3 L = normalize(uSunDirView);
          vec3 N = perturbNormal(vViewPos, geomN);

          vec3 day = texture2D(uDayMap, vUv).rgb;
          vec3 night = texture2D(uNightMap, vUv).rgb;
          vec4 brc = texture2D(uBrcMap, vUv);
          float ocean = 1.0 - smoothstep(0.08, 0.35, brc.g);

          float sunOrientation = dot(geomN, L);
          float NdotL = max(dot(N, L), 0.0);

          // Diffuse sunlight + faint earthshine
          vec3 color = day * (NdotL * uSunIntensity * 0.42 + 0.004);

          // Sun glint on oceans (Blinn-Phong with Schlick fresnel)
          vec3 H = normalize(L + V);
          float specPow = mix(14.0, 90.0, ocean);
          float fres = 0.04 + 0.96 * pow(1.0 - max(dot(H, V), 0.0), 5.0);
          float spec = pow(max(dot(N, H), 0.0), specPow) * NdotL * fres;
          color += vec3(1.0, 0.94, 0.86) * spec * (0.15 + ocean * 2.2) * uSunIntensity * 0.45;

          // City lights fade in across the terminator onto the night side
          float dayStrength = smoothstep(-0.25, 0.45, sunOrientation);
          color += night * vec3(1.0, 0.82, 0.58) * (1.0 - dayStrength) * 1.35 * uReveal;

          // Atmospheric haze toward the limb
          float fresnel = 1.0 - abs(dot(V, geomN));
          float atmoMix = clamp(smoothstep(-0.15, 0.8, sunOrientation) * pow(fresnel, 2.0), 0.0, 1.0);
          color = mix(color, atmosphereColor(sunOrientation) * (0.35 + uSunIntensity * 0.22), atmoMix * uAtmosphereAlpha);

          gl_FragColor = vec4(color, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });
    const sphereSegs = isLowPower ? 96 : 128;
    const planetGeo = new THREE.SphereGeometry(planetRadius, sphereSegs, sphereSegs);
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    axialTiltGroup.add(planetMesh);

    // Dynamic Cloud Layer (alpha from the B channel; sunlit by day, dark by night so it occludes city lights)
    const cloudsMat = new THREE.ShaderMaterial({
      uniforms: {
        ...earthUniforms,
        uBrcMap: { value: earthBrcTex },
      },
      vertexShader: earthVertexShader,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormalView;
        varying vec3 vViewPos;
        uniform sampler2D uBrcMap;
        uniform float uSunIntensity;
        ${earthAtmoChunk}

        void main() {
          vec3 geomN = normalize(vNormalView);
          vec3 V = normalize(-vViewPos);
          float sunOrientation = dot(geomN, normalize(uSunDirView));

          float cloud = smoothstep(0.2, 1.0, texture2D(uBrcMap, vUv).b);
          float lit = clamp((sunOrientation + 0.06) / 1.06, 0.0, 1.0);
          vec3 color = vec3(0.92) * lit * uSunIntensity * 0.42;

          float fresnel = 1.0 - abs(dot(V, geomN));
          float atmoMix = clamp(smoothstep(-0.15, 0.8, sunOrientation) * pow(fresnel, 2.0), 0.0, 1.0);
          color = mix(color, atmosphereColor(sunOrientation) * (0.35 + uSunIntensity * 0.22), atmoMix * uAtmosphereAlpha);

          gl_FragColor = vec4(color, cloud * 0.95);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const cloudsGeo = new THREE.SphereGeometry(planetRadius + 0.22, sphereSegs, sphereSegs);
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    axialTiltGroup.add(cloudsMesh);

    // Outer atmospheric scattering shell — thin blue rim that fades smoothly into space
    const atmosMat = new THREE.ShaderMaterial({
      uniforms: earthUniforms,
      vertexShader: earthVertexShader,
      fragmentShader: `
        varying vec3 vNormalView;
        varying vec3 vViewPos;
        ${earthAtmoChunk}

        void main() {
          vec3 N = normalize(vNormalView);
          vec3 V = normalize(-vViewPos);
          float sunOrientation = dot(N, normalize(uSunDirView));
          float fresnel = 1.0 - abs(dot(V, N));

          // 1 at the planet limb, 0 at the outer edge of the shell
          float alpha = pow(clamp((1.0 - fresnel) / 0.27, 0.0, 1.0), 3.0);
          alpha *= smoothstep(-0.3, 0.7, sunOrientation) * uAtmosphereAlpha;

          gl_FragColor = vec4(atmosphereColor(sunOrientation), alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(new THREE.SphereGeometry(planetRadius * 1.04, 96, 96), atmosMat);
    celestialSystem.add(atmosMesh);

    // 7. THE SINGLE ELEGANT ORBITAL TRAJECTORY & SATELLITE (100% Mathematically Aligned)
    const orbitRadius = 45.0;
    const orbitPointsCount = 280;
    // Where the satellite is born (left of Earth, never occluded by the planet from the intro camera)
    const orbitStartAngle = Math.PI;

    // Dedicated Orbit Group handles the 3D inclination
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = THREE.MathUtils.degToRad(62);
    orbitGroup.rotation.y = THREE.MathUtils.degToRad(-24);
    celestialSystem.add(orbitGroup);

    // Orbit Trajectory Line (Defined in orbitGroup local coordinates)
    // Points run from half a lap behind the satellite's birth point to half a lap ahead, so a
    // centred draw range makes the orbit grow outward from the satellite in both directions
    const orbitPositions = new Float32Array(orbitPointsCount * 3);
    for (let i = 0; i < orbitPointsCount; i++) {
      const theta = orbitStartAngle - Math.PI + (i / (orbitPointsCount - 1)) * Math.PI * 2;
      orbitPositions[i * 3] = orbitRadius * Math.cos(theta);
      orbitPositions[i * 3 + 1] = 0;
      orbitPositions[i * 3 + 2] = orbitRadius * Math.sin(theta);
    }
    const orbitGeo = new THREE.BufferGeometry();
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
    const setOrbitDraw = (progress) => {
      const count = Math.floor(progress * orbitPointsCount);
      orbitGeo.setDrawRange(Math.floor((orbitPointsCount - count) / 2), count);
    };
    setOrbitDraw(motionRef.current.orbitDrawProgress);

    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: motionRef.current.orbitLineAlpha,
      blending: THREE.AdditiveBlending,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitGroup.add(orbitLine);

    // Precision Orbital Satellite (Added directly to orbitGroup, locked to the line)
    // During the intro it starts as nothing but its beacon (the centre "signal" dot); the hull
    // group grows out of that dot (satMorph) and the solar wings swing open (satSolarDeploy).
    const orbitSatellite = new THREE.Group();
    const orbSatHull = new THREE.Group();
    orbitSatellite.add(orbSatHull);

    // Satellite Bus Chassis
    const orbSatBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.85, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x1B1828,
        metalness: 0.94,
        roughness: 0.2,
      })
    );
    orbSatHull.add(orbSatBody);

    // Gold Kapton MLI Blanket
    const orbSatMli = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 1.75),
      new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 0.9,
        roughness: 0.28,
        side: THREE.DoubleSide,
      })
    );
    orbSatMli.position.set(0, 0.435, 0);
    orbSatMli.rotation.x = -Math.PI / 2;
    orbSatHull.add(orbSatMli);

    // Dual Solar Array Panels on hinges at the bus edges (folded along the bus until deployed)
    const orbHingeLeft = new THREE.Group();
    orbHingeLeft.position.set(-0.425, 0, 0);
    orbSatHull.add(orbHingeLeft);

    const orbHingeRight = new THREE.Group();
    orbHingeRight.position.set(0.425, 0, 0);
    orbSatHull.add(orbHingeRight);

    const orbLeftWing = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.04, 0.9),
      new THREE.MeshStandardMaterial({
        color: 0x111628,
        metalness: 0.88,
        roughness: 0.15,
        emissive: 0x241044,
        emissiveIntensity: 0.35,
      })
    );
    orbLeftWing.position.set(-0.825, 0, 0);
    orbHingeLeft.add(orbLeftWing);

    const orbRightWing = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.04, 0.9),
      new THREE.MeshStandardMaterial({
        color: 0x111628,
        metalness: 0.88,
        roughness: 0.15,
        emissive: 0x241044,
        emissiveIntensity: 0.35,
      })
    );
    orbRightWing.position.set(0.825, 0, 0);
    orbHingeRight.add(orbRightWing);

    // Communications Dish
    const orbDish = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 0.2, 16, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0xDFE3E8,
        metalness: 0.9,
        roughness: 0.2,
        side: THREE.DoubleSide,
      })
    );
    orbDish.position.set(0, 0, -1.0);
    orbDish.rotation.x = Math.PI;
    orbSatHull.add(orbDish);

    // Telemetry Beacon (The Signal Light traveling on orbit)
    const orbEmitterCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xF7F5FF })
    );
    orbEmitterCore.position.set(0, 0, 1.0);
    orbitSatellite.add(orbEmitterCore);

    const orbEmitterHalo = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 3.2),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        color: 0xC084FC,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    orbEmitterHalo.position.set(0, 0, 1.0);
    orbitSatellite.add(orbEmitterHalo);

    // Violet emitter glow that washes over the hull as it forms
    const orbSignalLight = new THREE.PointLight(0xA855F7, motionRef.current.satEmitterLight, 18);
    orbSignalLight.position.set(0, 0, 1.2);
    orbitSatellite.add(orbSignalLight);

    orbitGroup.add(orbitSatellite);

    // Hull materials fade with orbitBeaconAlpha × satMorph (instead of popping in/out via `visible`)
    const orbSatMats = [
      orbSatBody.material,
      orbSatMli.material,
      orbLeftWing.material,
      orbRightWing.material,
      orbDish.material,
    ];
    orbSatMats.forEach((mat) => { mat.transparent = true; });
    orbEmitterCore.material.transparent = true;

    // 8. TITLE ORBITAL PATH & CONTROLLED LIGHT SWEEP (Phases 10-11)
    const titleOrbitGroup = new THREE.Group();
    titleOrbitGroup.position.set(0, 0, 15);
    scene.add(titleOrbitGroup);

    // Thin violet arc behind ORBITAL 26
    const titleArcRadius = 52.0;
    const titleArcCount = 120;
    const titleArcPos = new Float32Array(titleArcCount * 3);
    for (let i = 0; i < titleArcCount; i++) {
      const frac = (i / (titleArcCount - 1));
      const angle = (frac - 0.5) * Math.PI * 0.65;
      titleArcPos[i * 3] = titleArcRadius * Math.sin(angle);
      titleArcPos[i * 3 + 1] = -titleArcRadius * Math.cos(angle) + 42.0;
      titleArcPos[i * 3 + 2] = -5.0;
    }
    const titleArcGeo = new THREE.BufferGeometry();
    titleArcGeo.setAttribute('position', new THREE.BufferAttribute(titleArcPos, 3));
    titleArcGeo.setDrawRange(0, 0);

    const titleArcMat = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: motionRef.current.titleOrbitAlpha,
      blending: THREE.AdditiveBlending,
    });
    const titleArcLine = new THREE.Line(titleArcGeo, titleArcMat);
    titleOrbitGroup.add(titleArcLine);

    // Controlled Cinematic Light Sweep
    const sweepPointLight = new THREE.PointLight(0xC084FC, 0, 95);
    sweepPointLight.position.set(motionRef.current.sweepLightX, 1.5, 10);
    scene.add(sweepPointLight);

    const sweepBeamGeo = new THREE.PlaneGeometry(35, 1.8);
    const sweepBeamMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      color: 0xD8B4FE,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sweepBeamMesh = new THREE.Mesh(sweepBeamGeo, sweepBeamMat);
    sweepBeamMesh.position.set(motionRef.current.sweepLightX, 1.5, 10);
    scene.add(sweepBeamMesh);

    // 9. 3D CONSTELLATION NODES FOR CHALLENGES SECTOR
    const constellationGroup = new THREE.Group();
    const challengeNodeData = [
      { id: 'propulsion', pos: new THREE.Vector3(-14, 12, -45) },
      { id: 'satellites', pos: new THREE.Vector3(16, 8, -40) },
      { id: 'astrodynamics', pos: new THREE.Vector3(10, -12, -50) },
      { id: 'exploration', pos: new THREE.Vector3(-10, -14, -48) },
      { id: 'climate', pos: new THREE.Vector3(-18, 0, -38) },
    ];

    const challengeNodeMeshes = challengeNodeData.map((node) => {
      const nodeMeshGroup = new THREE.Group();
      nodeMeshGroup.position.copy(node.pos);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.7, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xE9D5FF })
      );
      nodeMeshGroup.add(core);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(2.2, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0x8B5CF6,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
        })
      );
      nodeMeshGroup.add(halo);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.05, 8, 32),
        new THREE.MeshBasicMaterial({
          color: 0xC084FC,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
        })
      );
      ring.rotation.x = Math.PI / 2;
      nodeMeshGroup.add(ring);

      constellationGroup.add(nodeMeshGroup);
      return { group: nodeMeshGroup, core, halo, ring };
    });
    scene.add(constellationGroup);

    // Connecting vectors between constellation nodes
    const constLineGeo = new THREE.BufferGeometry();
    const constLinePos = [];
    for (let i = 0; i < challengeNodeData.length; i++) {
      const p1 = challengeNodeData[i].pos;
      const p2 = challengeNodeData[(i + 1) % challengeNodeData.length].pos;
      constLinePos.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
    }
    constLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(constLinePos, 3));
    const constLineMesh = new THREE.LineSegments(
      constLineGeo,
      new THREE.LineBasicMaterial({
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
      })
    );
    constellationGroup.add(constLineMesh);

    // 10. REGISTRATION PORTAL ACCRETION VORTEX
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, 0, -385);

    const portalCore = new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xF5F3FF,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
      })
    );
    portalGroup.add(portalCore);

    const portalHalo = new THREE.Mesh(
      new THREE.SphereGeometry(15.0, 32, 32),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
      })
    );
    portalGroup.add(portalHalo);

    const portalAccretion = new THREE.Mesh(
      new THREE.RingGeometry(5.0, 24.0, 64),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        color: 0xA855F7,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      })
    );
    portalAccretion.rotation.x = THREE.MathUtils.degToRad(70);
    portalGroup.add(portalAccretion);
    scene.add(portalGroup);

    // 11. MASTER GSAP CINEMATIC BOOT TIMELINE — "THE SIGNAL" (~12s total)
    // NOTE: assigns the outer `bootTl` (no re-declaration) so cleanup can kill it.
    // Previously a shadowed `let` left the first StrictMode timeline running alongside the second.
    if (!propsRef.current.isBootComplete) {
      bootTl = gsap.timeline({
        onComplete: () => {
          if (onBootComplete) onBootComplete();
        },
      });
      bootTlRef.current = bootTl;

      // ==========================================
      // PHASE 0: COMPLETE DARKNESS (0.0s -> 0.15s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(0);
      }, null, 0.0);

      // ==========================================
      // PHASE 1: THE SIGNAL (0.15s -> 0.9s)
      // Solitary violet point appears at center. Camera begins forward travel.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(1);
        playSignalTone();
      }, null, 0.15);

      // The dot is the orbital satellite's beacon (hull not yet formed, satMorph = 0)
      bootTl.to(motionRef.current, {
        orbitBeaconAlpha: 1.0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.15);

      bootTl.to(motionRef.current, {
        focusDist: 225,
        duration: 1.0,
        ease: 'power2.out',
      }, 0.15);

      // ==========================================
      // PHASE 2: SPACE REVEALS ITSELF (0.9s -> 1.8s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(2);
      }, null, 0.9);

      bootTl.to(motionRef.current, {
        starDeepAlpha: 0.65,
        starMidAlpha: 0.70,
        nebulaAlpha: 0.035,
        focusDist: 165,
        duration: 1.1,
        ease: 'power2.inOut',
      }, 0.9);

      // ==========================================
      // PHASE 3: THE SIGNAL TRANSFORMS INTO THE SATELLITE (1.8s -> 3.2s)
      // Dot flares -> hull unfolds out of it -> solar wings open -> orbit draws outward
      // from the satellite -> satellite starts revolving along it.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(3);
      }, null, 1.8);

      // Camera closes in on the forming satellite at a slight three-quarter angle
      bootTl.to(motionRef.current, {
        focusDist: 22,
        focusOffX: 5.0,
        focusOffY: 3.0,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 1.8);

      // Flare of the signal right as the transformation begins, then it calms into the beacon
      bootTl.to(motionRef.current, {
        signalFlare: 1.0,
        duration: 0.3,
        ease: 'power2.out',
      }, 1.8);

      bootTl.to(motionRef.current, {
        signalFlare: 0.0,
        duration: 0.9,
        ease: 'power2.inOut',
      }, 2.1);

      // Hull grows and untwists out of the dot
      bootTl.to(motionRef.current, {
        satMorph: 1.0,
        duration: 1.1,
        ease: 'expo.out',
      }, 1.9);

      bootTl.to(motionRef.current, {
        satRimLight: 0.9,
        duration: 0.6,
        ease: 'power2.out',
      }, 2.1);

      bootTl.to(motionRef.current, {
        satFillLight: 0.6,
        satSolarDeploy: 1.57,
        satEmitterLight: 2.2,
        duration: 0.9,
        ease: 'power2.out',
      }, 2.4);

      // The orbit traces itself outward from the satellite in both directions while it forms
      bootTl.to(motionRef.current, {
        orbitLineAlpha: 0.55,
        orbitDrawProgress: 1.0,
        duration: 1.8,
        ease: 'power2.inOut',
      }, 2.2);

      // Once formed, the satellite eases into motion along its orbit
      bootTl.to(motionRef.current, {
        satSpeed: 1.0,
        duration: 1.6,
        ease: 'power2.in',
      }, 2.9);

      // ==========================================
      // PHASE 4: PLANETARY HORIZON (3.2s -> 4.9s)
      // Camera releases the satellite and pulls back as Earth rises beneath its orbit.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(4);
      }, null, 3.2);

      bootTl.to(motionRef.current, {
        satFocus: 0.0,
        duration: 1.7,
        ease: 'power3.inOut',
      }, 3.2);

      bootTl.to(motionRef.current, {
        camZ: 42,
        camX: 6.5,
        camY: 3.2,
        lookX: 14.0,
        lookY: -8.0,
        lookZ: -20.0,
        starDeepAlpha: 0.85,
        starMidAlpha: 0.90,
        duration: 1.7,
        ease: 'power3.inOut',
      }, 3.2);

      // Sunrise slightly trails the camera move so the terminator sweeps across the planet
      bootTl.to(motionRef.current, {
        earthRevealAlpha: 1.0,
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        duration: 1.6,
        ease: 'power2.inOut',
      }, 3.5);

      // ==========================================
      // PHASE 5: ORBIT (4.9s -> 6.1s)
      // Camera drifts along the (already formed) orbit as the satellite cruises.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(5);
      }, null, 4.9);

      bootTl.to(motionRef.current, {
        camX: 9.0,
        camY: 4.8,
        camZ: 38.0,
        duration: 1.3,
        ease: 'power2.inOut',
      }, 4.9);

      // ==========================================
      // PHASE 6: CAMERA PASS (6.1s -> 7.1s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(6);
      }, null, 6.1);

      bootTl.to(motionRef.current, {
        camX: -4.0,
        camY: 1.0,
        camZ: 55.0,
        lookX: 0.0,
        lookY: 0.0,
        lookZ: 0.0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 6.1);

      // ==========================================
      // PHASE 7: EVERYTHING GOES DARK AGAIN (7.1s -> 7.5s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(7);
      }, null, 7.1);

      // The satellite keeps revolving through the dark beat; only the orbit line dims
      bootTl.to(motionRef.current, {
        orbitLineAlpha: 0.25,
        sunIntensity: 0.35,
        atmosphereAlpha: 0.3,
        duration: 0.6,
        ease: 'power2.out',
      }, 7.1);

      // ==========================================
      // PHASE 8: SEDS REC REVEAL (7.5s -> 8.0s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(8);
      }, null, 7.5);

      bootTl.to(motionRef.current, {
        camX: 0,
        camY: 0,
        camZ: 68,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        duration: 1.2,
        ease: 'power1.out',
      }, 7.5);

      // ==========================================
      // PHASE 9: PRESENTS (8.0s -> 8.4s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(9);
      }, null, 8.0);

      // ==========================================
      // PHASE 10: ORBITAL 26 (8.4s -> 9.1s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(10);
      }, null, 8.4);

      bootTl.to(motionRef.current, {
        titleOrbitAlpha: 0.5,
        titleOrbitProgress: 1.0,
        duration: 1.0,
        ease: 'power2.out',
      }, 8.4);

      // ==========================================
      // PHASE 11: THE LIGHT SWEEP (9.1s -> 10.2s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(11);
        playLightSweepTone();
      }, null, 9.1);

      bootTl.to(motionRef.current, {
        sweepLightX: 90.0,
        sweepLightAlpha: 1.0,
        sunIntensity: 1.8,
        atmosphereAlpha: 0.8,
        duration: 1.1,
        ease: 'power2.inOut',
      }, 9.1);

      // ==========================================
      // PHASE 12: EVENT TAGLINE (9.9s -> 10.9s)
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(12);
      }, null, 9.9);

      // ==========================================
      // PHASE 13: TRANSITION INTO WEBSITE HERO (10.9s -> 12.3s)
      // Intro typography exits first; hero UI fades in only after it is gone (see App/BootSequence).
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(13);
      }, null, 10.9);

      bootTl.to(motionRef.current, {
        camX: 0,
        camY: 0,
        camZ: 105,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        earthPosX: 36,
        earthPosY: 1.5,
        earthPosZ: -10,
        earthScale: 1.0,
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        orbitLineAlpha: 0.45,
        orbitBeaconAlpha: 1.0,
        titleOrbitAlpha: 0.0,
        sweepLightAlpha: 0.0,
        duration: 1.4,
        ease: 'power3.inOut',
      }, 10.9);
    }

    // 12. WINDOW RESIZE HANDLER
    handleResize = () => {
      // Mobile browsers fire resize whenever the address bar shows/hides while scrolling.
      // Keep the tallest height for the same width so the canvas isn't reallocated mid-scroll.
      if (isLowPower && window.innerWidth === width && window.innerHeight <= height) return;
      if (isLowPower && window.innerWidth === width) {
        height = window.innerHeight;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (renderer) renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 13. MASTER CONTINUOUS 60FPS RENDER LOOP
    let clock = new THREE.Clock();
    let satAngle = orbitStartAngle;
    let smoothScroll = 0;
    const currentCamPos = new THREE.Vector3(0, 0, motionRef.current.camZ);
    const targetCamPos = new THREE.Vector3(0, 0, motionRef.current.camZ);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const targetEarthPos = new THREE.Vector3(38, 2, -10);
    let targetEarthScale = 1.0;
    const focusPoint = new THREE.Vector3();
    const focusCam = new THREE.Vector3();
    const satWorldQuat = new THREE.Quaternion();

    // Intro starts already framed on the satellite's beacon, so the first dot sits dead centre
    if (!propsRef.current.isBootComplete) {
      celestialSystem.scale.setScalar(motionRef.current.earthScale);
      orbitSatellite.position.set(orbitRadius * Math.cos(satAngle), 0, orbitRadius * Math.sin(satAngle));
      orbitSatellite.rotation.y = -satAngle + Math.PI / 2;
      orbEmitterCore.getWorldPosition(currentLookAt);
      currentCamPos.set(currentLookAt.x, currentLookAt.y, currentLookAt.z + motionRef.current.focusDist);
      camera.position.copy(currentCamPos);
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const p = propsRef.current;
      const m = motionRef.current;

      // 1. Satellite key lights (scene-level) & legacy intro spacecraft (kept hidden)
      satRimLight.intensity = m.satRimLight;
      satFillLight.intensity = m.satFillLight;
      introSpacecraftGroup.visible = m.introSatOpacity > 0.01;
      if (introSpacecraftGroup.visible) {
        // Dot -> satellite morph: hull grows out of the signal point while untwisting into place
        const morph = m.satMorph;
        introHull.visible = morph > 0.001;
        introHull.scale.setScalar(Math.max(0.001, morph));
        introHull.rotation.z = (1 - morph) * 1.4;
        introSatMats.forEach((mat) => { mat.opacity = m.introSatOpacity * Math.min(1, morph * 1.6); });

        // Signal flares at the start of the morph, then shrinks into the satellite's forward beacon
        signalCoreMesh.scale.setScalar(2.2 - morph * 1.2 + m.signalFlare * 1.5);
        signalHaloMesh.scale.setScalar(1 + m.signalFlare * 1.8);
        signalCoreMat.opacity = m.signalPointAlpha * m.introSatOpacity;
        signalHaloMat.opacity = Math.min(1, (m.signalGlowAlpha + m.signalFlare * 0.4) * m.introSatOpacity);
        signalPointLight.intensity = (m.satEmitterLight + m.signalFlare * 3.0) * m.introSatOpacity;
        // satSolarDeploy 0 = wings folded along the bus, 1.57 = wings fully extended
        solarHingeLeft.rotation.y = -(Math.PI / 2 - m.satSolarDeploy);
        solarHingeRight.rotation.y = Math.PI / 2 - m.satSolarDeploy;
        introSpacecraftGroup.rotation.y = elapsed * 0.04;
        introSpacecraftGroup.rotation.x = Math.sin(elapsed * 0.02) * 0.08;
        signalHaloMesh.quaternion.copy(camera.quaternion);
      }

      // 2. Stars & Nebula opacity
      starDeepMat.opacity = m.starDeepAlpha;
      starMidMat.opacity = m.starMidAlpha;
      nebulaGroup.children.forEach((mesh) => {
        mesh.material.opacity = m.nebulaAlpha;
      });

      // 3. Earth & Atmosphere shader updates
      sunLight.intensity = m.sunIntensity;
      earthUniforms.uSunIntensity.value = m.sunIntensity;
      earthUniforms.uReveal.value = m.earthRevealAlpha;
      earthUniforms.uAtmosphereAlpha.value = m.atmosphereAlpha;

      // 4. Single Orbital Trajectory & Precision Satellite Tracking
      orbitMat.opacity = m.orbitLineAlpha;
      setOrbitDraw(m.orbitDrawProgress);

      satAngle += 0.0055 * m.satSpeed;
      const ox = orbitRadius * Math.cos(satAngle);
      const oz = orbitRadius * Math.sin(satAngle);
      orbitSatellite.position.set(ox, 0, oz);
      orbitSatellite.rotation.y = -satAngle + Math.PI / 2;
      // Billboard the halo in world space (the satellite sits inside the tilted orbit group)
      orbitSatellite.getWorldQuaternion(satWorldQuat);
      orbEmitterHalo.quaternion.copy(satWorldQuat.invert()).multiply(camera.quaternion);
      orbitSatellite.visible = m.orbitBeaconAlpha > 0.01;
      if (orbitSatellite.visible) {
        // Dot -> satellite morph: hull grows out of the beacon (z = 1.0) while untwisting into place
        const morph = m.satMorph;
        orbSatHull.visible = morph > 0.001;
        orbSatHull.scale.setScalar(Math.max(0.001, morph));
        orbSatHull.position.z = 1.0 - morph;
        orbSatHull.rotation.z = (1 - morph) * 1.4;
        // satSolarDeploy 0 = wings folded along the bus, 1.57 = wings fully extended
        orbHingeLeft.rotation.y = -(Math.PI / 2 - m.satSolarDeploy);
        orbHingeRight.rotation.y = Math.PI / 2 - m.satSolarDeploy;
        const hullAlpha = m.orbitBeaconAlpha * Math.min(1, morph * 1.6);
        orbSatMats.forEach((mat) => { mat.opacity = hullAlpha; });

        // Beacon: a lone bright dot before the morph, flares as it begins, settles as the nose light
        orbEmitterCore.scale.setScalar(1 + (1 - morph) * 1.2 + m.signalFlare * 1.5);
        orbEmitterHalo.scale.setScalar(1 + (1 - morph) * 3.5 + m.signalFlare * 3.0);
        orbEmitterCore.material.opacity = m.orbitBeaconAlpha;
        orbEmitterHalo.material.opacity = Math.min(1, 0.9 + m.signalFlare * 0.3) * m.orbitBeaconAlpha;
        orbSignalLight.intensity = (m.satEmitterLight + m.signalFlare * 3.0) * m.orbitBeaconAlpha;
      }

      // 5. Title Orbit & Light Sweep
      titleArcMat.opacity = m.titleOrbitAlpha;
      titleArcGeo.setDrawRange(0, Math.floor(m.titleOrbitProgress * titleArcCount));
      sweepPointLight.position.x = m.sweepLightX;
      sweepPointLight.intensity = m.sweepLightAlpha * 3.5;
      sweepBeamMesh.position.x = m.sweepLightX;
      sweepBeamMat.opacity = m.sweepLightAlpha * 0.85;
      sweepBeamMesh.quaternion.copy(camera.quaternion);

      // 6. Scroll & Interactive Hero Tracking
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawScroll = docHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / docHeight)) : 0;
      smoothScroll = THREE.MathUtils.lerp(smoothScroll, rawScroll, 0.075);

      const wp = getScrollWaypoint(smoothScroll);

      const targetSingularity = (p.isModalOpen || p.activeSection === 'register') ? 0.04 : 1.0;
      m.singularityFactor = THREE.MathUtils.lerp(m.singularityFactor, targetSingularity, 0.06);

      // Only hand camera control to scroll once the intro has finished — otherwise the
      // boot camera path gets hijacked mid-sequence (sunIntensity > 1 from phase 4 onward)
      const isScrollActive = p.isBootComplete;
      if (isScrollActive) {
        targetCamPos.copy(wp.cam);
        targetLookAt.copy(wp.look);
        targetEarthPos.copy(wp.earth);
        targetEarthScale = wp.scale;
      } else {
        targetCamPos.set(m.camX, m.camY, m.camZ);
        targetLookAt.set(m.lookX, m.lookY, m.lookZ);
        targetEarthPos.set(m.earthPosX, m.earthPosY, m.earthPosZ);
        targetEarthScale = m.earthScale;

        // Phases 1-3: camera locked onto the satellite's beacon (the centre dot), released in Phase 4
        if (m.satFocus > 0.001) {
          orbEmitterCore.getWorldPosition(focusPoint);
          focusCam.set(focusPoint.x + m.focusOffX, focusPoint.y + m.focusOffY, focusPoint.z + m.focusDist);
          targetCamPos.lerp(focusCam, m.satFocus);
          targetLookAt.lerp(focusPoint, m.satFocus);
        }
      }

      // Responsive adjustments for mobile/tablet (< 1024px)
      // Maintains smooth vertical scroll drift & dynamic perspective without freezing
      if (width < 1024) {
        targetEarthPos.x = THREE.MathUtils.lerp(targetEarthPos.x * 0.25, 2, 0.75);
        targetEarthPos.y = THREE.MathUtils.lerp(targetEarthPos.y, 14 - smoothScroll * 12, 0.75);
        targetEarthPos.z = THREE.MathUtils.lerp(targetEarthPos.z, -22 - smoothScroll * 5, 0.75);
        targetEarthScale *= 0.78;
      }

      // 3-Layer Mouse Parallax
      const mouseFactorX = (p.mousePos.x - 0.5);
      const mouseFactorY = (p.mousePos.y - 0.5);
      // Parallax is softened while the camera is in close on the forming satellite
      const parallaxScale = 1 - motionRef.current.satFocus * 0.8;
      const mouseCamX = mouseFactorX * 4.5 * parallaxScale;
      const mouseCamY = mouseFactorY * -3.5 * parallaxScale;

      currentCamPos.x = THREE.MathUtils.lerp(currentCamPos.x, targetCamPos.x + mouseCamX, 0.05);
      currentCamPos.y = THREE.MathUtils.lerp(currentCamPos.y, targetCamPos.y + mouseCamY, 0.05);
      currentCamPos.z = THREE.MathUtils.lerp(currentCamPos.z, targetCamPos.z, 0.05);
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(targetLookAt, 0.05);
      camera.lookAt(currentLookAt);

      camera.fov = m.fov;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      earthUniforms.uSunDirView.value.copy(sunDirWorld).transformDirection(camera.matrixWorldInverse);

      // Celestial position lerp: Continuous and silky smooth 3D Earth travel
      celestialSystem.position.lerp(targetEarthPos, 0.06);
      const currentScale = targetEarthScale * m.singularityFactor;
      celestialSystem.scale.setScalar(currentScale);

      // Physical planetary scroll roll & atmospheric cloud drift from 1st prototype
      planetMesh.rotation.y = elapsed * 0.015 + smoothScroll * 3.5;
      cloudsMesh.rotation.y = elapsed * 0.022 + smoothScroll * 4.2;
      axialTiltGroup.rotation.z = THREE.MathUtils.degToRad(-23.5) + Math.sin(smoothScroll * Math.PI) * 0.07;
      axialTiltGroup.rotation.x = Math.sin(smoothScroll * Math.PI * 2) * 0.04;

      // Parallax star drift
      starDeepField.position.x = mouseFactorX * -2.5;
      starDeepField.position.y = mouseFactorY * 1.8;
      starDeepField.rotation.y = elapsed * 0.0004;
      nebulaGroup.rotation.z = elapsed * 0.0006;

      // Constellation Sector Visibility & Active Node Highlighting
      const inChallenges = p.activeSection === 'challenges' || p.activeSection === 'tracks';
      constellationGroup.visible = inChallenges;
      if (constellationGroup.visible) {
        constellationGroup.rotation.z = elapsed * 0.0008;
        challengeNodeMeshes.forEach((meshObj, idx) => {
          const isSelected = p.activeChallengeIndex === idx;
          const targetNodeScale = isSelected ? 1.45 : 1.0;
          meshObj.group.scale.setScalar(
            THREE.MathUtils.lerp(meshObj.group.scale.x, targetNodeScale, 0.08)
          );
          meshObj.halo.material.opacity = isSelected ? 0.7 : 0.25;
        });
      }

      // Singularity Vortex for Registration Portal Climax
      if (m.singularityFactor < 0.2) {
        portalCore.material.opacity = THREE.MathUtils.lerp(portalCore.material.opacity, 0.95, 0.08);
        portalHalo.material.opacity = THREE.MathUtils.lerp(portalHalo.material.opacity, 0.75, 0.08);
        portalAccretion.material.opacity = THREE.MathUtils.lerp(portalAccretion.material.opacity, 0.65, 0.08);
        portalAccretion.rotation.z += 0.035;
        const pulse = 1.0 + Math.sin(elapsed * 5.0) * 0.12;
        portalCore.scale.setScalar(pulse);
      } else {
        portalCore.material.opacity = THREE.MathUtils.lerp(portalCore.material.opacity, 0.0, 0.08);
        portalHalo.material.opacity = THREE.MathUtils.lerp(portalHalo.material.opacity, 0.0, 0.08);
        portalAccretion.material.opacity = THREE.MathUtils.lerp(portalAccretion.material.opacity, 0.0, 0.08);
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

      animate();
    } catch (err) {
      console.warn("ThreeSpaceEngine WebGL initialization notice:", err);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (handleResize) window.removeEventListener('resize', handleResize);
      if (bootTl) {
        try { bootTl.kill(); } catch (_) {}
      }
      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        try { container.removeChild(renderer.domElement); } catch (_) {}
      }
      if (renderer) {
        try { renderer.dispose(); } catch (_) {}
      }
    };
  }, []); // MOUNTS ONCE! NEVER RE-MOUNTS!

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#010106]" 
      style={{
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), rgba(255, 255, 255, 0))'
      }}
    />
  );
});

export default ThreeSpaceEngine;
