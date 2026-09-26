import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

/**
 * MASTER HIGH-PERFORMANCE CINEMATIC SPACE ENGINE
 * 
 * Architecture & Art Direction:
 * - MOUNTS ONCE. Single WebGL context, never destroyed or re-created across phases or sections.
 * - Master GSAP Timeline orchestrates an 8-phase Hollywood-grade Boot Sequence.
 * - Anamorphic Singularity Flare: Central radiant quantum core + horizontal anamorphic laser streak + gravitational wave ripples.
 * - True Relativistic Hyperspace Warp Streaks: 1,600 LineSegments stretching along Z with Doppler chromatic gradient.
 * - Articulated 3U Aerospace CubeSat with solar array deployment animation and dual telemetry beacons.
 * - Photorealistic Earth with custom Rayleigh atmospheric scattering shader, day/night terminator, and drifting clouds.
 * - Continuous 3D orbital trajectory spline tracing around the planet with a traveling luminous pulse.
 * - 5 3D interactive constellation beacon nodes for Challenges sector.
 * - Radiant Singularity Accretion Vortex for Registration climax.
 * - Smooth camera flight paths and 3-layer mouse depth parallax.
 */

// Camera waypoints for each section
const WAYPOINTS = {
  hero: {
    camPos: new THREE.Vector3(0, 0, 105),
    lookAt: new THREE.Vector3(0, 0, 0),
    planetOffset: new THREE.Vector3(38, 2, -10),
    planetScale: 1.0,
    orbitSpeed: 0.0012,
  },
  mission: {
    camPos: new THREE.Vector3(-14, 4, 80),
    lookAt: new THREE.Vector3(10, 0, 0),
    planetOffset: new THREE.Vector3(46, -6, -30),
    planetScale: 0.92,
    orbitSpeed: 0.0010,
  },
  identity: {
    camPos: new THREE.Vector3(12, -8, 65),
    lookAt: new THREE.Vector3(-6, -4, 0),
    planetOffset: new THREE.Vector3(48, -12, -45),
    planetScale: 0.88,
    orbitSpeed: 0.0009,
  },
  projects: {
    camPos: new THREE.Vector3(-8, 12, 45),
    lookAt: new THREE.Vector3(12, 6, -15),
    planetOffset: new THREE.Vector3(46, 8, -60),
    planetScale: 0.85,
    orbitSpeed: 0.0011,
  },
  challenges: {
    camPos: new THREE.Vector3(2, 12, 28),
    lookAt: new THREE.Vector3(-4, 6, -40),
    planetOffset: new THREE.Vector3(56, 18, -85),
    planetScale: 0.82,
    orbitSpeed: 0.0010,
  },
  timeline: {
    camPos: new THREE.Vector3(18, 4, -30),
    lookAt: new THREE.Vector3(0, 0, -85),
    planetOffset: new THREE.Vector3(42, -6, -110),
    planetScale: 0.80,
    orbitSpeed: 0.0009,
  },
  countdown: {
    camPos: new THREE.Vector3(0, -10, -85),
    lookAt: new THREE.Vector3(4, -4, -145),
    planetOffset: new THREE.Vector3(36, -22, -150),
    planetScale: 0.85,
    orbitSpeed: 0.0008,
  },
  prizes: {
    camPos: new THREE.Vector3(10, -14, -150),
    lookAt: new THREE.Vector3(-4, -10, -210),
    planetOffset: new THREE.Vector3(44, -16, -230),
    planetScale: 0.90,
    orbitSpeed: 0.0010,
  },
  partners: {
    camPos: new THREE.Vector3(-6, 2, -220),
    lookAt: new THREE.Vector3(4, 0, -280),
    planetOffset: new THREE.Vector3(46, -2, -300),
    planetScale: 0.80,
    orbitSpeed: 0.0008,
  },
  faq: {
    camPos: new THREE.Vector3(0, 0, -280),
    lookAt: new THREE.Vector3(0, 0, -340),
    planetOffset: new THREE.Vector3(52, 6, -370),
    planetScale: 0.75,
    orbitSpeed: 0.0007,
  },
  register: {
    camPos: new THREE.Vector3(0, 0, -340),
    lookAt: new THREE.Vector3(0, 0, -385),
    planetOffset: new THREE.Vector3(0, 0, -385),
    planetScale: 0.05,
    orbitSpeed: 0.008,
  },
};

const ThreeSpaceEngine = forwardRef(function ThreeSpaceEngine({ 
  activeSection = 'hero', 
  mousePos = { x: 0.5, y: 0.5 }, 
  isModalOpen = false, 
  scrollProgress = 0,
  onBootProgress,
  onBootComplete,
  isBootComplete = false,
  activeChallengeIndex = 0,
}, ref) {
  const containerRef = useRef(null);
  const bootTlRef = useRef(null);

  useImperativeHandle(ref, () => ({
    skipBoot: () => {
      if (bootTlRef.current) {
        bootTlRef.current.kill();
      }
      gsap.to(motionRef.current, {
        camZ: 105,
        fov: 46,
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        orbitDrawProgress: 1.0,
        solarDeployAngle: 1.57,
        warpFactor: 0.0,
        warpOpacity: 0.0,
        starOpacity: 0.85,
        singularityAlpha: 0.0,
        anamorphicAlpha: 0.0,
        shockwaveAlpha: 0.0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          if (onBootComplete) onBootComplete();
        }
      });
    }
  }));

  // Live props ref so animation loop reads latest values without triggering re-render
  const propsRef = useRef({
    activeSection,
    mousePos,
    isModalOpen,
    scrollProgress,
    activeChallengeIndex,
    isBootComplete,
  });

  useEffect(() => {
    propsRef.current = {
      activeSection,
      mousePos,
      isModalOpen,
      scrollProgress,
      activeChallengeIndex,
      isBootComplete,
    };
  }, [activeSection, mousePos, isModalOpen, scrollProgress, activeChallengeIndex, isBootComplete]);

  // Master Boot & Motion State Object driven by GSAP
  const motionRef = useRef({
    // Camera
    camZ: isBootComplete ? 105 : 340,
    fov: isBootComplete ? 46 : 80,
    
    // Singularity & Anamorphic Flare
    singularityScale: isBootComplete ? 0.0 : 1.0,
    singularityAlpha: isBootComplete ? 0.0 : 1.0,
    anamorphicScaleX: isBootComplete ? 0.0 : 0.05,
    anamorphicAlpha: isBootComplete ? 0.0 : 0.0,
    shockwaveRadius: 0.0,
    shockwaveAlpha: 0.0,
    
    // Warp Streaks
    warpFactor: 0.0,
    warpOpacity: 0.0,
    
    // Starlight & Environment
    starOpacity: isBootComplete ? 0.85 : 0.0,
    sunIntensity: isBootComplete ? 2.8 : 0.0,
    atmosphereAlpha: isBootComplete ? 1.0 : 0.0,
    
    // Orbital path & Spacecraft
    orbitDrawProgress: isBootComplete ? 1.0 : 0.0,
    solarDeployAngle: isBootComplete ? 1.57 : 0.0, // 0 to PI/2 radians
    
    // Registration Singularity Climax
    singularityFactor: 1.0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010106, 0.00075);

    const camera = new THREE.PerspectiveCamera(
      motionRef.current.fov,
      width / height,
      0.1,
      5000
    );
    camera.position.set(0, 0, motionRef.current.camZ);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. DIRECTIONAL & AMBIENT LIGHTING
    const sunLight = new THREE.DirectionalLight(0xffffff, motionRef.current.sunIntensity);
    sunLight.position.set(95, 34, 75);
    scene.add(sunLight);

    const rimVioletLight = new THREE.DirectionalLight(0x7C3AED, 1.2);
    rimVioletLight.position.set(-85, -35, -45);
    scene.add(rimVioletLight);

    const ambientLight = new THREE.AmbientLight(0x05020D, 0.5);
    scene.add(ambientLight);

    // 3. TEXTURE GENERATORS & LOADERS
    const makeGlowTex = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 128;
      cvs.height = 128;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.18, 'rgba(192, 132, 252, 0.9)');
      grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.35)');
      grad.addColorStop(1, 'rgba(1, 1, 6, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(cvs);
    };
    const glowTex = makeGlowTex();

    // Anamorphic horizontal laser streak flare texture
    const makeAnamorphicTex = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 512;
      cvs.height = 64;
      const ctx = cvs.getContext('2d');
      
      const grad = ctx.createRadialGradient(256, 32, 0, 256, 32, 256);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.12, 'rgba(216, 180, 254, 0.95)');
      grad.addColorStop(0.35, 'rgba(139, 92, 246, 0.6)');
      grad.addColorStop(0.7, 'rgba(76, 29, 149, 0.2)');
      grad.addColorStop(1, 'rgba(1, 1, 6, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 64);

      // Central razor laser line
      const lineGrad = ctx.createLinearGradient(0, 32, 512, 32);
      lineGrad.addColorStop(0, 'rgba(139, 92, 246, 0)');
      lineGrad.addColorStop(0.35, 'rgba(192, 132, 252, 0.8)');
      lineGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      lineGrad.addColorStop(0.65, 'rgba(192, 132, 252, 0.8)');
      lineGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = lineGrad;
      ctx.fillRect(0, 30, 512, 4);

      return new THREE.CanvasTexture(cvs);
    };
    const anamorphicTex = makeAnamorphicTex();

    // Gravitational shockwave ring texture
    const makeRingTex = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 128;
      cvs.height = 128;
      const ctx = cvs.getContext('2d');
      ctx.beginPath();
      ctx.arc(64, 64, 58, 0, Math.PI * 2);
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.85)';
      ctx.stroke();
      return new THREE.CanvasTexture(cvs);
    };
    const ringTex = makeRingTex();

    // Planetary texture loader
    const texLoader = new THREE.TextureLoader();
    const earthAtmosTex = texLoader.load('/textures/planets/earth_atmos.jpg');
    const earthNormalTex = texLoader.load('/textures/planets/earth_normal.jpg');
    const earthSpecTex = texLoader.load('/textures/planets/earth_specular.jpg');
    const earthCloudsTex = texLoader.load('/textures/planets/earth_clouds.png');
    const moonTex = texLoader.load('/textures/planets/moon.jpg');

    [earthAtmosTex, earthNormalTex, earthSpecTex, earthCloudsTex, moonTex].forEach((t) => {
      t.wrapS = THREE.RepeatWrapping;
      t.anisotropy = 4;
    });

    // 4. ANAMORPHIC SINGULARITY & GRAVITATIONAL LENSING SYSTEM
    const singularityGroup = new THREE.Group();
    scene.add(singularityGroup);

    // Quantum Core
    const singCoreGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const singCoreMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: motionRef.current.singularityAlpha,
    });
    const singCoreMesh = new THREE.Mesh(singCoreGeo, singCoreMat);
    singularityGroup.add(singCoreMesh);

    // Radiant Corona
    const singCoronaGeo = new THREE.PlaneGeometry(16, 16);
    const singCoronaMat = new THREE.MeshBasicMaterial({
      map: glowTex,
      color: 0xC084FC,
      transparent: true,
      opacity: motionRef.current.singularityAlpha,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const singCoronaMesh = new THREE.Mesh(singCoronaGeo, singCoronaMat);
    singularityGroup.add(singCoronaMesh);

    // Anamorphic Horizontal Laser Flare Beam
    const anamorphicGeo = new THREE.PlaneGeometry(280, 2.8);
    const anamorphicMat = new THREE.MeshBasicMaterial({
      map: anamorphicTex,
      transparent: true,
      opacity: motionRef.current.anamorphicAlpha,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const anamorphicMesh = new THREE.Mesh(anamorphicGeo, anamorphicMat);
    anamorphicMesh.scale.x = motionRef.current.anamorphicScaleX;
    singularityGroup.add(anamorphicMesh);

    // Gravitational Wave Expansion Shockwave Rings
    const shockwaveGeo = new THREE.PlaneGeometry(1, 1);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      map: ringTex,
      transparent: true,
      opacity: motionRef.current.shockwaveAlpha,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    singularityGroup.add(shockwaveMesh);

    // Quantum Dust Swirl (Converges inward during Phase 0)
    const dustCount = 350;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustVel = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const rad = 25 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      dustPos[i * 3] = rad * Math.cos(theta);
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      dustPos[i * 3 + 2] = rad * Math.sin(theta);
      dustVel[i * 3] = -dustPos[i * 3] * 0.02;
      dustVel[i * 3 + 1] = -dustPos[i * 3 + 1] * 0.02;
      dustVel[i * 3 + 2] = -dustPos[i * 3 + 2] * 0.02;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.2,
      map: glowTex,
      color: 0xC084FC,
      transparent: true,
      opacity: motionRef.current.singularityAlpha * 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustField = new THREE.Points(dustGeo, dustMat);
    singularityGroup.add(dustField);

    // 5. TRUE RELATIVISTIC HYPERSPACE WARP STREAKS (1,600 LineSegments)
    const warpCount = 1600;
    const warpLineGeo = new THREE.BufferGeometry();
    const warpPositions = new Float32Array(warpCount * 2 * 3); // 2 vertices per line segment
    const warpColors = new Float32Array(warpCount * 2 * 3);
    const warpBaseZ = new Float32Array(warpCount);

    const warpColorHead = new THREE.Color('#FFFFFF');
    const warpColorTail = new THREE.Color('#7C3AED');
    const warpColorMid = new THREE.Color('#93C5FD');

    for (let i = 0; i < warpCount; i++) {
      const idx = i * 6;
      const x = (Math.random() - 0.5) * 2200;
      const y = (Math.random() - 0.5) * 1600;
      const z = (Math.random() - 0.5) * 2400 - 200;
      warpBaseZ[i] = z;

      // Head vertex
      warpPositions[idx] = x;
      warpPositions[idx + 1] = y;
      warpPositions[idx + 2] = z;

      // Tail vertex (initially collapsed)
      warpPositions[idx + 3] = x;
      warpPositions[idx + 4] = y;
      warpPositions[idx + 5] = z;

      // Head color (crystalline white)
      warpColors[idx] = warpColorHead.r;
      warpColors[idx + 1] = warpColorHead.g;
      warpColors[idx + 2] = warpColorHead.b;

      // Tail color (Doppler violet/blue)
      const tailChoice = i % 2 === 0 ? warpColorTail : warpColorMid;
      warpColors[idx + 3] = tailChoice.r;
      warpColors[idx + 4] = tailChoice.g;
      warpColors[idx + 5] = tailChoice.b;
    }

    warpLineGeo.setAttribute('position', new THREE.BufferAttribute(warpPositions, 3));
    warpLineGeo.setAttribute('color', new THREE.BufferAttribute(warpColors, 3));

    const warpMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: motionRef.current.warpOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const warpStreakMesh = new THREE.LineSegments(warpLineGeo, warpMat);
    scene.add(warpStreakMesh);

    // 6. PERSISTENT DEEP COSMIC STARFIELD (3,000 background points)
    const starCount = 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starPal = [
      new THREE.Color('#F7F5FF'),
      new THREE.Color('#E0D8FF'),
      new THREE.Color('#C4B5FD'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#93C5FD'),
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 3200;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 2400;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 3600 - 500;

      const c = starPal[Math.floor(Math.random() * starPal.length)];
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.4,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: motionRef.current.starOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 7. DEEP COSMIC NEBULA CLOUDS
    const nebulaGroup = new THREE.Group();
    const nebulaGeo = new THREE.PlaneGeometry(600, 600);
    for (let i = 0; i < 7; i++) {
      const nebulaMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        color: i % 2 === 0 ? new THREE.Color('#1E0B40') : new THREE.Color('#3B0764'),
        transparent: true,
        opacity: Math.random() * 0.04 + 0.02,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(nebulaGeo, nebulaMat);
      mesh.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 1400 - 600
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.scale.setScalar(Math.random() * 1.8 + 1.0);
      nebulaGroup.add(mesh);
    }
    scene.add(nebulaGroup);

    // 8. MONUMENTAL CELESTIAL SYSTEM (EARTH LIMB ON RIGHT)
    const celestialSystem = new THREE.Group();
    scene.add(celestialSystem);

    const updateCelestialBase = (w) => {
      if (w >= 1024) {
        celestialSystem.position.set(38, 2, -10);
      } else {
        celestialSystem.position.set(0, 18, -25);
      }
    };
    updateCelestialBase(width);

    // Axial Tilt
    const axialTiltGroup = new THREE.Group();
    axialTiltGroup.rotation.z = THREE.MathUtils.degToRad(-23.5);
    celestialSystem.add(axialTiltGroup);

    // A. PLANETARY BODY (Radius 24)
    const planetRadius = 24.0;
    const planetGeo = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMat = new THREE.MeshPhongMaterial({
      map: earthAtmosTex,
      normalMap: earthNormalTex,
      normalScale: new THREE.Vector2(0.9, 0.9),
      specularMap: earthSpecTex,
      specular: new THREE.Color('#6D28D9'),
      shininess: 28,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    axialTiltGroup.add(planetMesh);

    // B. DYNAMIC ATMOSPHERIC CLOUD LAYER
    const cloudsGeo = new THREE.SphereGeometry(planetRadius + 0.38, 64, 64);
    const cloudsMat = new THREE.MeshPhongMaterial({
      map: earthCloudsTex,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    axialTiltGroup.add(cloudsMesh);

    // C. PHOTOREALISTIC RAYLEIGH ATMOSPHERIC SCATTERING SHADER
    const atmosGeo = new THREE.SphereGeometry(planetRadius + 1.45, 64, 64);
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
          fresnel = pow(fresnel, 2.7);

          vec3 normWorld = normalize(vNormal);
          float sunDot = dot(normWorld, uSunDirection);

          // Atmospheric Rayleigh gradient ramp
          vec3 deepViolet = vec3(0.20, 0.08, 0.50); // Deep ionosphere
          vec3 electricViolet = vec3(0.62, 0.38, 1.00); // Luminous limb
          vec3 terminatorAmber = vec3(0.95, 0.65, 0.45); // Sunrise terminator

          float dayFactor = clamp(sunDot * 1.4 + 0.4, 0.0, 1.0);
          vec3 baseColor = mix(deepViolet, electricViolet, dayFactor);

          // Terminator golden-amber accent
          float terminator = pow(1.0 - abs(sunDot), 2.8);
          vec3 rimColor = mix(baseColor, terminatorAmber, terminator * 0.4);

          float intensity = fresnel * (clamp(sunDot * 1.8 + 0.4, 0.08, 2.2)) * uAtmosphereAlpha;
          gl_FragColor = vec4(rimColor * 1.8, intensity * 0.95);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    celestialSystem.add(atmosMesh);

    // D. DISTANT REALISTIC MOON
    const moonRadius = 3.2;
    const moonGeo = new THREE.SphereGeometry(moonRadius, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({
      map: moonTex,
      bumpMap: moonTex,
      bumpScale: 0.08,
      shininess: 2,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    celestialSystem.add(moonMesh);

    // E. 3D ORBITAL TRAJECTORY SPLINE
    const orbitRadius = 38.0;
    const orbitPointsCount = 240;
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
      color: 0xA855F7,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = THREE.MathUtils.degToRad(64);
    orbitLine.rotation.y = THREE.MathUtils.degToRad(-26);
    celestialSystem.add(orbitLine);

    // F. HIGH-TECH 3D CUBESAT WITH ARTICULATING SOLAR ARRAYS
    const satGroup = new THREE.Group();

    // 3U Satellite Chassis
    const satChassisGeo = new THREE.BoxGeometry(0.9, 0.9, 2.0);
    const satChassisMat = new THREE.MeshStandardMaterial({
      color: 0x231F35,
      metalness: 0.92,
      roughness: 0.18,
    });
    const satChassis = new THREE.Mesh(satChassisGeo, satChassisMat);
    satGroup.add(satChassis);

    // Solar Wings Hinges & Panels (Articulate on deploy)
    const solarHingeLeft = new THREE.Group();
    solarHingeLeft.position.set(-0.45, 0, 0);
    satGroup.add(solarHingeLeft);

    const solarHingeRight = new THREE.Group();
    solarHingeRight.position.set(0.45, 0, 0);
    satGroup.add(solarHingeRight);

    const panelGeo = new THREE.BoxGeometry(1.7, 0.04, 1.0);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x1E1B4B,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x2E1065,
      emissiveIntensity: 0.3,
    });

    const leftPanel = new THREE.Mesh(panelGeo, panelMat);
    leftPanel.position.set(-0.85, 0, 0);
    solarHingeLeft.add(leftPanel);

    const rightPanel = new THREE.Mesh(panelGeo, panelMat);
    rightPanel.position.set(0.85, 0, 0);
    solarHingeRight.add(rightPanel);

    // High-Gain Parabolic Dish Antenna
    const dishGeo = new THREE.ConeGeometry(0.5, 0.25, 16, 1, true);
    const dishMat = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.9,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.position.set(0, 0, -1.1);
    dish.rotation.x = Math.PI;
    satGroup.add(dish);

    // Dual Optical Status Telemetry Beacons
    const beaconGreen = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x34D399 })
    );
    beaconGreen.position.set(0.35, 0.5, 0.8);
    satGroup.add(beaconGreen);

    const beaconViolet = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xF7F5FF })
    );
    beaconViolet.position.set(-0.35, 0.5, 0.8);
    satGroup.add(beaconViolet);

    const satHalo = new THREE.Mesh(
      new THREE.SphereGeometry(2.4, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      })
    );
    satGroup.add(satHalo);
    celestialSystem.add(satGroup);

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

    // 10. RADIANT SINGULARITY ACCRETION VORTEX (REGISTRATION PORTAL)
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

    // 11. MASTER GSAP CINEMATIC BOOT TIMELINE (ZERO-GLITCH ARCHITECTURE)
    let bootTl = null;

    if (!propsRef.current.isBootComplete) {
      bootTl = gsap.timeline({
        onComplete: () => {
          if (onBootComplete) onBootComplete();
        },
      });
      bootTlRef.current = bootTl;

      // PHASE 01: VOID & QUANTUM SINGULARITY EMERGENCE (0.0s -> 1.0s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(0);
      }, null, 0.0);

      bootTl.to(motionRef.current, {
        singularityScale: 1.8,
        singularityAlpha: 1.0,
        anamorphicScaleX: 0.35,
        anamorphicAlpha: 0.8,
        duration: 1.0,
        ease: 'power2.out',
      }, 0.0);

      // PHASE 02: IGNITION & RELATIVISTIC WARP ACCELERATION (1.0s -> 2.6s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(1);
      }, null, 1.0);

      bootTl.to(motionRef.current, {
        anamorphicScaleX: 1.6,
        anamorphicAlpha: 1.0,
        shockwaveRadius: 35.0,
        shockwaveAlpha: 0.9,
        duration: 0.6,
        ease: 'power3.in',
      }, 1.0);

      bootTl.to(motionRef.current, {
        warpFactor: 1.0, // Stretches LineSegments along Z
        warpOpacity: 0.95,
        starOpacity: 0.9,
        camZ: 170,
        duration: 1.5,
        ease: 'power3.inOut',
      }, 1.1);

      // Fade out singularity core after ignition
      bootTl.to(motionRef.current, {
        singularityAlpha: 0.0,
        anamorphicAlpha: 0.0,
        shockwaveAlpha: 0.0,
        duration: 0.6,
        ease: 'power2.out',
      }, 1.8);

      // PHASE 03: SPACE FORMS & ORBIT REVEAL (2.6s -> 4.2s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(2);
      }, null, 2.6);

      bootTl.to(motionRef.current, {
        warpFactor: 0.0, // Decelerates warp streaks smoothly back to pinpoint stars
        warpOpacity: 0.0,
        orbitDrawProgress: 1.0, // Dynamic trajectory vector drawing
        solarDeployAngle: 1.57, // Unfolds CubeSat solar arrays
        camZ: 125,
        fov: 52,
        duration: 1.6,
        ease: 'power2.out',
      }, 2.6);

      // PHASE 04: ASTRONOMICAL REVEAL (ATMOSPHERIC SUNRISE) (4.2s -> 5.5s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(3);
      }, null, 4.2);

      bootTl.to(motionRef.current, {
        sunIntensity: 2.8,
        atmosphereAlpha: 1.0,
        camZ: 108,
        fov: 46,
        duration: 1.3,
        ease: 'power2.out',
        onUpdate: () => {
          sunLight.intensity = motionRef.current.sunIntensity;
          atmosUniforms.uAtmosphereAlpha.value = motionRef.current.atmosphereAlpha;
        },
      }, 4.2);

      // PHASE 05: SEDS REC IDENTITY (5.5s -> 6.5s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(4);
      }, null, 5.5);

      bootTl.to(motionRef.current, {
        camZ: 105,
        duration: 1.0,
        ease: 'power1.out',
      }, 5.5);

      // PHASE 06: ORBITAL 26 REVEAL (6.5s -> 7.6s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(5);
      }, null, 6.5);

      bootTl.to(motionRef.current, {
        duration: 1.1,
      }, 6.5);

      // PHASE 07: SEAMLESS HERO HANDOFF (7.6s -> 8.5s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(6);
      }, null, 7.6);

      bootTl.to(motionRef.current, {
        duration: 0.9,
      }, 7.6);

      // PHASE 08: LIVE FULL INTERACTIVE STATE (8.5s)
      bootTl.call(() => {
        if (onBootProgress) onBootProgress(7);
      }, null, 8.5);
    }

    // High-speed skip handler without visual pop
    container.__skipBoot = () => {
      if (bootTl && bootTl.isActive()) {
        bootTl.timeScale(8.0); // Ultra-fast smooth scrub
      }
    };

    // 12. WINDOW RESIZE HANDLER
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateCelestialBase(width);
    };
    window.addEventListener('resize', handleResize);

    // 13. MASTER CONTINUOUS 60FPS RENDER LOOP
    let animId;
    let clock = new THREE.Clock();
    let satAngle = 0;
    let moonAngle = 0.4;

    const currentCamPos = new THREE.Vector3(0, 0, motionRef.current.camZ);
    const targetCamPos = new THREE.Vector3(0, 0, motionRef.current.camZ);
    const currentLookAt = new THREE.Vector3(0, 0, 0);
    const targetLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const p = propsRef.current;
      const m = motionRef.current;

      // 1. Update Singularity & Anamorphic Flare
      singCoreMesh.scale.setScalar(m.singularityScale);
      singCoreMat.opacity = m.singularityAlpha;
      singCoronaMesh.scale.setScalar(m.singularityScale * 1.5);
      singCoronaMat.opacity = m.singularityAlpha * 0.9;
      anamorphicMesh.scale.x = m.anamorphicScaleX;
      anamorphicMat.opacity = m.anamorphicAlpha;

      if (m.shockwaveAlpha > 0.01) {
        shockwaveMesh.scale.setScalar(m.shockwaveRadius);
        shockwaveMat.opacity = m.shockwaveAlpha;
      }

      // Swirl stardust into singularity during Phase 0
      if (m.singularityAlpha > 0.05) {
        const dPos = dustGeo.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
          const i3 = i * 3;
          dPos[i3] += dustVel[i3];
          dPos[i3 + 1] += dustVel[i3 + 1];
          dPos[i3 + 2] += dustVel[i3 + 2];
        }
        dustGeo.attributes.position.needsUpdate = true;
        dustMat.opacity = m.singularityAlpha * 0.75;
      }

      // 2. Update Relativistic Warp Line Streaks
      warpMat.opacity = m.warpOpacity;
      if (m.warpOpacity > 0.01) {
        const warpPosArr = warpLineGeo.attributes.position.array;
        const stretchZ = m.warpFactor * 135.0;

        for (let i = 0; i < warpCount; i++) {
          const idx = i * 6;
          const bz = warpBaseZ[i];
          // Head
          warpPosArr[idx + 2] = bz;
          // Tail stretches forward along Z vector
          warpPosArr[idx + 5] = bz + stretchZ;
        }
        warpLineGeo.attributes.position.needsUpdate = true;
      }

      // 3. Update Orbital Trajectory Spline & Satellite Deployment
      orbitGeo.setDrawRange(0, Math.floor(m.orbitDrawProgress * orbitPointsCount));
      solarHingeLeft.rotation.y = -m.solarDeployAngle;
      solarHingeRight.rotation.y = m.solarDeployAngle;

      // 4. Camera Waypoint Navigation
      const wp = WAYPOINTS[p.activeSection] || WAYPOINTS.hero;
      const targetSingularity = (p.isModalOpen || p.activeSection === 'register') ? 0.04 : 1.0;
      m.singularityFactor = THREE.MathUtils.lerp(m.singularityFactor, targetSingularity, 0.05);

      const scrollOffsetZ = p.activeSection === 'hero' ? -(p.scrollProgress * 28) : 0;

      if (p.isBootComplete || m.camZ <= 112) {
        targetCamPos.copy(wp.camPos);
        targetCamPos.z += scrollOffsetZ;
        targetLookAt.copy(wp.lookAt);
      } else {
        targetCamPos.set(0, 0, m.camZ);
        targetLookAt.set(0, 0, 0);
      }

      // 3-Layer Mouse Parallax
      const mouseFactorX = (p.mousePos.x - 0.5);
      const mouseFactorY = (p.mousePos.y - 0.5);
      const mouseCamX = mouseFactorX * 5.2;
      const mouseCamY = mouseFactorY * -4.2;

      currentCamPos.x = THREE.MathUtils.lerp(currentCamPos.x, targetCamPos.x + mouseCamX, 0.04);
      currentCamPos.y = THREE.MathUtils.lerp(currentCamPos.y, targetCamPos.y + mouseCamY, 0.04);
      currentCamPos.z = THREE.MathUtils.lerp(currentCamPos.z, targetCamPos.z, 0.04);
      camera.position.copy(currentCamPos);

      currentLookAt.lerp(targetLookAt, 0.04);
      camera.lookAt(currentLookAt);

      camera.fov = m.fov;
      camera.updateProjectionMatrix();

      // Celestial position lerp
      if (width >= 1024 && (p.isBootComplete || m.sunIntensity > 0.8)) {
        celestialSystem.position.lerp(wp.planetOffset, 0.04);
      }

      // Parallax layer 1: background stars
      starField.position.x = mouseFactorX * -3.0;
      starField.position.y = mouseFactorY * 2.2;
      starMat.opacity = m.starOpacity;

      // Parallax layer 2: planetary body & clouds
      planetMesh.rotation.y = elapsed * 0.016;
      cloudsMesh.rotation.y = elapsed * 0.024;

      // Parallax layer 3: orbiting satellite
      satAngle += 0.0065;
      const sx = orbitRadius * Math.cos(satAngle);
      const sz = orbitRadius * Math.sin(satAngle);
      const satPos = new THREE.Vector3(sx, 0, sz);
      satPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(64));
      satPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-26));
      satGroup.position.copy(satPos);

      // Satellite beacons blinking
      const pulseGreen = Math.sin(elapsed * 8.0) > 0.3 ? 1.0 : 0.2;
      const pulseViolet = Math.sin(elapsed * 4.0) > 0.1 ? 1.0 : 0.15;
      beaconGreen.scale.setScalar(pulseGreen * 1.2 + 0.2);
      beaconViolet.scale.setScalar(pulseViolet * 1.3 + 0.2);

      // Distant Moon
      moonAngle += 0.003;
      const lunarDist = 60;
      moonMesh.position.set(
        lunarDist * Math.cos(moonAngle),
        lunarDist * 0.25 * Math.sin(moonAngle),
        lunarDist * 0.7 * Math.sin(moonAngle) - 25
      );
      moonMesh.rotation.y = elapsed * 0.01;

      // Celestial Scale & Singularity Factor
      const currentScale = wp.planetScale * m.singularityFactor;
      celestialSystem.scale.setScalar(currentScale);

      // Constellation Sector Visibility & Active Node Highlighting
      const inChallenges = p.activeSection === 'challenges';
      constellationGroup.visible = inChallenges || p.activeSection === 'projects';
      if (constellationGroup.visible) {
        constellationGroup.rotation.z = elapsed * 0.0008;
        challengeNodeMeshes.forEach((meshObj, idx) => {
          const isSelected = p.activeChallengeIndex === idx;
          const targetScale = isSelected ? 1.45 : 1.0;
          meshObj.group.scale.setScalar(
            THREE.MathUtils.lerp(meshObj.group.scale.x, targetScale, 0.08)
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

      // Ambient star & nebula drift
      starField.rotation.y = elapsed * 0.0005;
      nebulaGroup.rotation.z = elapsed * 0.0008;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (bootTl) bootTl.kill();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []); // MOUNTS ONCE! NEVER RE-MOUNTS!

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      style={{ background: '#010106' }}
    />
  );
});

export default ThreeSpaceEngine;
