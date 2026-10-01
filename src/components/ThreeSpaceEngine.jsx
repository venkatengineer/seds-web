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
 * - Introductory spacecraft with The Signal emitter swoops past camera into deep space and cleanly vanishes during Phase 4 Earth sunrise.
 * - Zero stray objects, zero rogue moons without orbits, zero duplicate or stationary floating satellites.
 * - Completely smooth 60fps render loop with Hermite scroll waypoints and 3-layer parallax.
 */

// Continuous orbital trajectory milestones along scroll progress (0.00 -> 1.00)
// Restores the dynamic, prominent Earth movement and deep-space orbital sweep from the 1st prototype
// Harmonized with the Hackathon-First layout:
// Hero -> Tracks -> Prizes -> Timeline -> Countdown -> FAQ -> Partners -> Mission & Identity -> Footer
const SCROLL_MILESTONES = [
  // 0.00: HERO APEX — Monumental Earth limb on the right with atmospheric rim glow
  { t: 0.00, cam: new THREE.Vector3(0, 0, 105), look: new THREE.Vector3(0, 0, 0), earth: new THREE.Vector3(36, 1.5, -10), scale: 1.00 },
  // 0.16: HACKATHON TRACKS — Earth dips gracefully lower and deeper, opening spatial clearance for track cards
  { t: 0.16, cam: new THREE.Vector3(2, -2, 98), look: new THREE.Vector3(-2, -1, 0), earth: new THREE.Vector3(43, -6, -20), scale: 0.94 },
  // 0.30: PRIZES & REWARDS — Earth sweeps majestically into view with brilliant specular ocean shine
  { t: 0.30, cam: new THREE.Vector3(-3, 2, 92), look: new THREE.Vector3(2, 1, 0), earth: new THREE.Vector3(34, 4, -13), scale: 1.02 },
  // 0.44: TIMELINE TRAJECTORY — Earth aligns with the traveling orbital flight trajectory beacon
  { t: 0.44, cam: new THREE.Vector3(3, -2, 88), look: new THREE.Vector3(-2, -1, 0), earth: new THREE.Vector3(44, -4, -18), scale: 0.95 },
  // 0.58: COUNTDOWN HORIZON — Earth aligns with the astronomical circular horizon arc
  { t: 0.58, cam: new THREE.Vector3(0, -3, 89), look: new THREE.Vector3(1, -1, 0), earth: new THREE.Vector3(37, -4, -13), scale: 0.99 },
  // 0.72: DIRECTIVES & FAQ — Wide orbit traverse, Earth sweeps horizontally across background depth
  { t: 0.72, cam: new THREE.Vector3(-2, 2, 87), look: new THREE.Vector3(2, 0, 0), earth: new THREE.Vector3(43, -5, -19), scale: 0.94 },
  // 0.84: PARTNERS & ALLIANCE — Smooth orbital sweep showcasing institutional alliance
  { t: 0.84, cam: new THREE.Vector3(2, -1, 90), look: new THREE.Vector3(-1, 0, 0), earth: new THREE.Vector3(41, -2, -16), scale: 0.97 },
  // 0.92: SEDS MISSION & IDENTITY — Ascending perspective, Earth glides higher and closer, revealing southern hemisphere
  { t: 0.92, cam: new THREE.Vector3(-4, 3, 92), look: new THREE.Vector3(3, 1, 0), earth: new THREE.Vector3(33, 6, -14), scale: 1.00 },
  // 1.00: FOOTER — Smooth orbital return into stable apex perspective
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

    // Intro Spacecraft Lifecycle (Active in Phases 1-3, exits in Phase 4)
    introSatOpacity: isBootComplete ? 0.0 : 1.0,
    satSilhouetteAlpha: isBootComplete ? 1.0 : 0.0,
    satRimLight: isBootComplete ? 1.2 : 0.0,
    satFillLight: isBootComplete ? 0.7 : 0.0,
    satEmitterLight: isBootComplete ? 0.0 : 0.0,
    satSolarDeploy: isBootComplete ? 1.57 : 0.0,

    // Phase 4: Earth & Sunlight
    earthRevealAlpha: isBootComplete ? 1.0 : 0.0,
    earthPosX: isBootComplete ? 38 : 22,
    earthPosY: isBootComplete ? 2 : -18,
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
        earthPosX: 38,
        earthPosY: 2,
        earthPosZ: -10,
        earthScale: 1.0,
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        orbitDrawProgress: 1.0,
        orbitLineAlpha: 0.45,
        orbitBeaconAlpha: 1.0,
        signalPointAlpha: 0.0,
        signalGlowAlpha: 0.0,
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

    // High-res planetary maps for Earth
    const texLoader = new THREE.TextureLoader();
    const earthAtmosTex = texLoader.load('/textures/planets/earth_atmos.jpg');
    const earthNormalTex = texLoader.load('/textures/planets/earth_normal.jpg');
    const earthSpecTex = texLoader.load('/textures/planets/earth_specular.jpg');
    const earthCloudsTex = texLoader.load('/textures/planets/earth_clouds.png');

    [earthAtmosTex, earthNormalTex, earthSpecTex, earthCloudsTex].forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.anisotropy = 4;
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
    introSpacecraftGroup.add(satChassis);

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
    introSpacecraftGroup.add(mliTop);

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
      introSpacecraftGroup.add(rail);
    });

    // Articulated Solar Array Wings
    const solarHingeLeft = new THREE.Group();
    solarHingeLeft.position.set(-0.6, 0, 0);
    introSpacecraftGroup.add(solarHingeLeft);

    const solarHingeRight = new THREE.Group();
    solarHingeRight.position.set(0.6, 0, 0);
    introSpacecraftGroup.add(solarHingeRight);

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
    introSpacecraftGroup.add(dish);

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
    introSpacecraftGroup.add(mast);

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

    // 6. MONUMENTAL PLANETARY SYSTEM (Earth Viewed from Orbit)
    const celestialSystem = new THREE.Group();
    celestialSystem.position.set(motionRef.current.earthPosX, motionRef.current.earthPosY, motionRef.current.earthPosZ);
    scene.add(celestialSystem);

    // Axial Tilt
    const axialTiltGroup = new THREE.Group();
    axialTiltGroup.rotation.z = THREE.MathUtils.degToRad(-23.5);
    celestialSystem.add(axialTiltGroup);

    // Photorealistic Earth (Radius 28)
    const planetRadius = 28.0;
    const planetGeo = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMat = new THREE.MeshPhongMaterial({
      map: earthAtmosTex,
      normalMap: earthNormalTex,
      normalScale: new THREE.Vector2(0.95, 0.95),
      specularMap: earthSpecTex,
      specular: new THREE.Color('#6D28D9'),
      shininess: 32,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    axialTiltGroup.add(planetMesh);

    // Dynamic Cloud Layer
    const cloudsGeo = new THREE.SphereGeometry(planetRadius + 0.42, 64, 64);
    const cloudsMat = new THREE.MeshPhongMaterial({
      map: earthCloudsTex,
      transparent: true,
      opacity: 0.76,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    axialTiltGroup.add(cloudsMesh);

    // Rayleigh Atmospheric Scattering Shader
    const atmosGeo = new THREE.SphereGeometry(planetRadius + 1.6, 64, 64);
    const atmosUniforms = {
      uSunDirection: { value: new THREE.Vector3(95, 34, 75).normalize() },
      uAtmosphereAlpha: { value: motionRef.current.atmosphereAlpha },
    };

    const atmosMat = new THREE.ShaderMaterial({
      uniforms: atmosUniforms,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform vec3 uSunDirection;
        uniform float uAtmosphereAlpha;

        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = 1.0 - max(0.0, dot(viewDir, vNormal));
          fresnel = pow(fresnel, 2.8);

          vec3 normWorld = normalize(vNormal);
          float sunDot = dot(normWorld, uSunDirection);

          // Deep aerospace Rayleigh violet ionosphere ramp
          vec3 deepIonosphere = vec3(0.20, 0.08, 0.50);
          vec3 electricViolet = vec3(0.58, 0.35, 1.00);
          vec3 terminatorGold = vec3(0.96, 0.68, 0.42);

          float dayFactor = clamp(sunDot * 1.4 + 0.4, 0.0, 1.0);
          vec3 baseColor = mix(deepIonosphere, electricViolet, dayFactor);

          // Golden-amber terminator accent
          float terminator = pow(1.0 - abs(sunDot), 2.9);
          vec3 rimColor = mix(baseColor, terminatorGold, terminator * 0.45);

          float intensity = fresnel * (clamp(sunDot * 1.8 + 0.35, 0.08, 2.2)) * uAtmosphereAlpha;
          gl_FragColor = vec4(rimColor * 1.85, intensity * 0.96);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    celestialSystem.add(atmosMesh);

    // 7. THE SINGLE ELEGANT ORBITAL TRAJECTORY & SATELLITE (100% Mathematically Aligned)
    const orbitRadius = 45.0;
    const orbitPointsCount = 280;

    // Dedicated Orbit Group handles the 3D inclination
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = THREE.MathUtils.degToRad(62);
    orbitGroup.rotation.y = THREE.MathUtils.degToRad(-24);
    celestialSystem.add(orbitGroup);

    // Orbit Trajectory Line (Defined in orbitGroup local coordinates)
    const orbitPositions = new Float32Array(orbitPointsCount * 3);
    for (let i = 0; i < orbitPointsCount; i++) {
      const theta = (i / (orbitPointsCount - 1)) * Math.PI * 2;
      orbitPositions[i * 3] = orbitRadius * Math.cos(theta);
      orbitPositions[i * 3 + 1] = 0;
      orbitPositions[i * 3 + 2] = orbitRadius * Math.sin(theta);
    }
    const orbitGeo = new THREE.BufferGeometry();
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
    orbitGeo.setDrawRange(0, Math.floor(motionRef.current.orbitDrawProgress * orbitPointsCount));

    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: motionRef.current.orbitLineAlpha,
      blending: THREE.AdditiveBlending,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitGroup.add(orbitLine);

    // Precision Orbital Satellite (Added directly to orbitGroup, locked to the line)
    const orbitSatellite = new THREE.Group();

    // Satellite Bus Chassis
    const orbSatBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.85, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x1B1828,
        metalness: 0.94,
        roughness: 0.2,
      })
    );
    orbitSatellite.add(orbSatBody);

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
    orbitSatellite.add(orbSatMli);

    // Dual Solar Array Panels
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
    orbLeftWing.position.set(-1.25, 0, 0);
    orbitSatellite.add(orbLeftWing);

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
    orbRightWing.position.set(1.25, 0, 0);
    orbitSatellite.add(orbRightWing);

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
    orbitSatellite.add(orbDish);

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

    orbitGroup.add(orbitSatellite);

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

    // 11. MASTER GSAP CINEMATIC BOOT TIMELINE — "THE SIGNAL"
    let bootTl = null;

    if (!propsRef.current.isBootComplete) {
      bootTl = gsap.timeline({
        onComplete: () => {
          if (onBootComplete) onBootComplete();
        },
      });
      bootTlRef.current = bootTl;

      // ==========================================
      // PHASE 0: COMPLETE DARKNESS (0.0s -> 0.5s)
      // Viewport is almost black. No UI, no buttons, no spinners.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(0);
      }, null, 0.0);

      // ==========================================
      // PHASE 1: THE SIGNAL (0.5s -> 2.8s)
      // Solitary 1-3px violet point appears at center. Fades in softly.
      // Camera begins slow, physical forward travel in 3D.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(1);
        playSignalTone();
      }, null, 0.5);

      bootTl.to(motionRef.current, {
        signalPointAlpha: 1.0,
        signalGlowAlpha: 0.85,
        duration: 1.4,
        ease: 'power2.inOut',
      }, 0.5);

      bootTl.to(motionRef.current, {
        camZ: 190,
        duration: 2.3,
        ease: 'power2.out',
      }, 0.5);

      // ==========================================
      // PHASE 2: SPACE REVEALS ITSELF (2.8s -> 5.0s)
      // Multi-depth stars gradually emerge. Very subtle purple nebula.
      // Space remains vast and empty.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(2);
      }, null, 2.8);

      bootTl.to(motionRef.current, {
        starDeepAlpha: 0.65,
        starMidAlpha: 0.70,
        nebulaAlpha: 0.035,
        camZ: 130,
        duration: 2.2,
        ease: 'power2.inOut',
      }, 2.8);

      // ==========================================
      // PHASE 3: THE SIGNAL IS REVEALED (5.0s -> 7.8s)
      // Point is attached to an orbital spacecraft.
      // Silhouette -> subtle edge rim light -> surface details -> violet illumination.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(3);
      }, null, 5.0);

      // Camera gets close to the spacecraft
      bootTl.to(motionRef.current, {
        camZ: 65,
        camX: 1.2,
        camY: 0.6,
        lookZ: -35,
        lookX: 0.2,
        duration: 2.8,
        ease: 'power2.inOut',
      }, 5.0);

      // Step A: Silhouette against stars
      bootTl.to(motionRef.current, {
        satSilhouetteAlpha: 1.0,
        duration: 0.8,
        ease: 'power1.out',
      }, 5.0);

      // Step B: Subtle edge light
      bootTl.to(motionRef.current, {
        satRimLight: 0.9,
        duration: 1.0,
        ease: 'power2.out',
      }, 5.6);

      // Step C & D: Surface details & solar deploy & forward violet illumination
      bootTl.to(motionRef.current, {
        satFillLight: 0.6,
        satSolarDeploy: 1.57,
        satEmitterLight: 2.2,
        duration: 1.4,
        ease: 'power2.out',
      }, 6.2);

      // ==========================================
      // PHASE 4: PLANETARY HORIZON (7.8s -> 10.5s)
      // Camera sweeps forward past the introductory spacecraft.
      // The introductory spacecraft smoothly glides past camera and exits the scene.
      // Massive realistic Earth horizon revealed!
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(4);
      }, null, 7.8);

      // Intro spacecraft glides past camera shoulder and vanishes
      bootTl.to(introSpacecraftGroup.position, {
        x: -20,
        y: 10,
        z: 85,
        duration: 2.4,
        ease: 'power2.in',
      }, 7.8);

      bootTl.to(motionRef.current, {
        introSatOpacity: 0.0,
        duration: 1.5,
        ease: 'power2.in',
        onComplete: () => {
          introSpacecraftGroup.visible = false;
        }
      }, 8.2);

      // Camera moves to view Earth from orbit
      bootTl.to(motionRef.current, {
        camZ: 42,
        camX: 6.5,
        camY: 3.2,
        lookX: 14.0,
        lookY: -8.0,
        lookZ: -20.0,
        earthRevealAlpha: 1.0,
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        starDeepAlpha: 0.85,
        starMidAlpha: 0.90,
        duration: 2.7,
        ease: 'power3.inOut',
      }, 7.8);

      // ==========================================
      // PHASE 5: ORBIT (10.5s -> 13.0s)
      // Single elegant orbital trajectory curve appears and draws progressively.
      // Luminous satellite travels along it with 100% precision.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(5);
      }, null, 10.5);

      bootTl.to(motionRef.current, {
        orbitLineAlpha: 0.55,
        orbitDrawProgress: 1.0,
        orbitBeaconAlpha: 1.0,
        camX: 9.0,
        camY: 4.8,
        camZ: 38.0,
        duration: 2.5,
        ease: 'power2.inOut',
      }, 10.5);

      // ==========================================
      // PHASE 6: CAMERA PASS (13.0s -> 15.5s)
      // Camera travels along trajectory.
      // Camera glides into darker region of space. Earth moves out of view.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(6);
      }, null, 13.0);

      bootTl.to(motionRef.current, {
        camX: -4.0,
        camY: 1.0,
        camZ: 55.0,
        lookX: 0.0,
        lookY: 0.0,
        lookZ: 0.0,
        duration: 2.5,
        ease: 'power2.inOut',
      }, 13.0);

      // ==========================================
      // PHASE 7: EVERYTHING GOES DARK AGAIN (15.5s -> 16.8s)
      // Environment dims down. Orbital line fades. Brief cosmic pause.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(7);
      }, null, 15.5);

      bootTl.to(motionRef.current, {
        orbitLineAlpha: 0.0,
        orbitBeaconAlpha: 0.0,
        signalPointAlpha: 0.0,
        signalGlowAlpha: 0.0,
        sunIntensity: 0.35,
        atmosphereAlpha: 0.3,
        duration: 1.0,
        ease: 'power2.out',
      }, 15.5);

      // ==========================================
      // PHASE 8: SEDS REC REVEAL (16.8s -> 18.6s)
      // Typography appears in center: "SEDS REC" & "RAJALAKSHMI ENGINEERING COLLEGE"
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(8);
      }, null, 16.8);

      bootTl.to(motionRef.current, {
        camX: 0,
        camY: 0,
        camZ: 68,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        duration: 1.8,
        ease: 'power1.out',
      }, 16.8);

      // ==========================================
      // PHASE 9: PRESENTS (18.6s -> 19.6s)
      // Subtle violet typography appears beneath SEDS REC.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(9);
      }, null, 18.6);

      // ==========================================
      // PHASE 10: ORBITAL 26 (19.6s -> 21.8s)
      // Thin orbital path forms behind title. Large premium typography reveal.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(10);
      }, null, 19.6);

      bootTl.to(motionRef.current, {
        titleOrbitAlpha: 0.5,
        titleOrbitProgress: 1.0,
        duration: 1.8,
        ease: 'power2.out',
      }, 19.6);

      // ==========================================
      // PHASE 11: THE LIGHT SWEEP (21.8s -> 23.8s)
      // Soft violet light source sweeps across trajectory behind "ORBITAL 26".
      // Space catches subtle illumination.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(11);
        playLightSweepTone();
      }, null, 21.8);

      bootTl.to(motionRef.current, {
        sweepLightX: 90.0,
        sweepLightAlpha: 1.0,
        sunIntensity: 1.8,
        atmosphereAlpha: 0.8,
        duration: 2.0,
        ease: 'power2.inOut',
      }, 21.8);

      // ==========================================
      // PHASE 12: EVENT TAGLINE (23.8s -> 25.4s)
      // "BUILD BEYOND THE KNOWN." + "48-HOUR SPACE SPRINT • CHENNAI, INDIA"
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(12);
      }, null, 23.8);

      // ==========================================
      // PHASE 13: TRANSITION INTO WEBSITE HERO (25.4s -> 27.2s)
      // Camera moves forward into Hero composition.
      // Earth settles into hero position on the right (38, 2, -10).
      // Website hero typography takes over seamlessly.
      // ==========================================
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(13);
      }, null, 25.4);

      bootTl.to(motionRef.current, {
        camX: 0,
        camY: 0,
        camZ: 105,
        lookX: 0,
        lookY: 0,
        lookZ: 0,
        earthPosX: 38,
        earthPosY: 2,
        earthPosZ: -10,
        earthScale: 1.0,
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        orbitLineAlpha: 0.45,
        orbitBeaconAlpha: 1.0,
        titleOrbitAlpha: 0.0,
        sweepLightAlpha: 0.0,
        duration: 1.8,
        ease: 'power3.inOut',
      }, 25.4);
    }

    // 12. WINDOW RESIZE HANDLER
    handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (renderer) renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 13. MASTER CONTINUOUS 60FPS RENDER LOOP
    let clock = new THREE.Clock();
    let satAngle = 0;
    let smoothScroll = 0;
    const currentCamPos = new THREE.Vector3(0, 0, motionRef.current.camZ);
    const targetCamPos = new THREE.Vector3(0, 0, motionRef.current.camZ);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const targetEarthPos = new THREE.Vector3(38, 2, -10);
    let targetEarthScale = 1.0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const p = propsRef.current;
      const m = motionRef.current;

      // 1. Introductory spacecraft updates
      introSpacecraftGroup.visible = m.introSatOpacity > 0.01;
      if (introSpacecraftGroup.visible) {
        signalCoreMat.opacity = m.signalPointAlpha * m.introSatOpacity;
        signalHaloMat.opacity = m.signalGlowAlpha * m.introSatOpacity;
        signalPointLight.intensity = m.satEmitterLight * m.introSatOpacity;
        satRimLight.intensity = m.satRimLight;
        satFillLight.intensity = m.satFillLight;
        solarHingeLeft.rotation.y = -m.satSolarDeploy;
        solarHingeRight.rotation.y = m.satSolarDeploy;
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
      atmosUniforms.uAtmosphereAlpha.value = m.atmosphereAlpha;

      // 4. Single Orbital Trajectory & Precision Satellite Tracking
      orbitMat.opacity = m.orbitLineAlpha;
      orbitGeo.setDrawRange(0, Math.floor(m.orbitDrawProgress * orbitPointsCount));
      
      satAngle += 0.0055;
      const ox = orbitRadius * Math.cos(satAngle);
      const oz = orbitRadius * Math.sin(satAngle);
      orbitSatellite.position.set(ox, 0, oz);
      orbitSatellite.rotation.y = -satAngle + Math.PI / 2;
      orbEmitterHalo.quaternion.copy(camera.quaternion);
      orbitSatellite.visible = m.orbitBeaconAlpha > 0.01;

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

      const isScrollActive = p.isBootComplete || smoothScroll > 0.005 || m.sunIntensity > 1.0;
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
      const mouseCamX = mouseFactorX * 4.5;
      const mouseCamY = mouseFactorY * -3.5;

      currentCamPos.x = THREE.MathUtils.lerp(currentCamPos.x, targetCamPos.x + mouseCamX, 0.05);
      currentCamPos.y = THREE.MathUtils.lerp(currentCamPos.y, targetCamPos.y + mouseCamY, 0.05);
      currentCamPos.z = THREE.MathUtils.lerp(currentCamPos.z, targetCamPos.z, 0.05);
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(targetLookAt, 0.05);
      camera.lookAt(currentLookAt);

      camera.fov = m.fov;
      camera.updateProjectionMatrix();

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
