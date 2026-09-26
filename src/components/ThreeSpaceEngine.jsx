import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * MASTER HIGH-FIDELITY CINEMATIC SPACE ENGINE
 * 
 * Unifies:
 * - Boot Splash (Phases 0-6) into Hero without visual cuts or scene reloads.
 * - Progressive 3D orbit trajectory drawing (0% -> 100%).
 * - Photorealistic monumental Earth limb with Rayleigh violet atmospheric scattering.
 * - Dynamic independent cloud drift and specular ocean reflectivity.
 * - Distant realistic Moon at authentic orbital perspective.
 * - Stratified pinpoint starfield with 3-layer mouse depth parallax.
 * - Continuous camera travel across all sections via GSAP scroll integration.
 * - Radiant Singularity Collapse transition when approaching registration.
 */

const SECTION_WAYPOINTS = {
  hero: {
    pos: new THREE.Vector3(0, 0, 105),
    lookAt: new THREE.Vector3(0, 0, 0),
    planetOffset: new THREE.Vector3(38, 2, -10),
    planetScale: 1.0,
    orbitSpeed: 0.0012,
  },
  mission: {
    pos: new THREE.Vector3(-14, 4, 80),
    lookAt: new THREE.Vector3(10, 0, 0),
    planetOffset: new THREE.Vector3(46, -6, -30),
    planetScale: 0.92,
    orbitSpeed: 0.0010,
  },
  identity: {
    pos: new THREE.Vector3(12, -8, 65),
    lookAt: new THREE.Vector3(-6, -4, 0),
    planetOffset: new THREE.Vector3(48, -12, -45),
    planetScale: 0.88,
    orbitSpeed: 0.0009,
  },
  projects: {
    pos: new THREE.Vector3(-8, 12, 45),
    lookAt: new THREE.Vector3(12, 6, -15),
    planetOffset: new THREE.Vector3(46, 8, -60),
    planetScale: 0.85,
    orbitSpeed: 0.0011,
  },
  challenges: {
    pos: new THREE.Vector3(4, 16, 25),
    lookAt: new THREE.Vector3(-10, 8, -35),
    planetOffset: new THREE.Vector3(52, 18, -80),
    planetScale: 0.82,
    orbitSpeed: 0.0010,
  },
  timeline: {
    pos: new THREE.Vector3(18, 4, -30),
    lookAt: new THREE.Vector3(0, 0, -85),
    planetOffset: new THREE.Vector3(42, -6, -110),
    planetScale: 0.80,
    orbitSpeed: 0.0009,
  },
  countdown: {
    pos: new THREE.Vector3(0, -10, -85),
    lookAt: new THREE.Vector3(4, -4, -145),
    planetOffset: new THREE.Vector3(36, -22, -150),
    planetScale: 0.85,
    orbitSpeed: 0.0008,
  },
  prizes: {
    pos: new THREE.Vector3(10, -14, -150),
    lookAt: new THREE.Vector3(-4, -10, -210),
    planetOffset: new THREE.Vector3(44, -16, -230),
    planetScale: 0.90,
    orbitSpeed: 0.0010,
  },
  partners: {
    pos: new THREE.Vector3(-6, 2, -220),
    lookAt: new THREE.Vector3(4, 0, -280),
    planetOffset: new THREE.Vector3(46, -2, -300),
    planetScale: 0.80,
    orbitSpeed: 0.0008,
  },
  faq: {
    pos: new THREE.Vector3(0, 0, -280),
    lookAt: new THREE.Vector3(0, 0, -340),
    planetOffset: new THREE.Vector3(52, 6, -370),
    planetScale: 0.75,
    orbitSpeed: 0.0007,
  },
  register: {
    pos: new THREE.Vector3(0, 0, -340),
    lookAt: new THREE.Vector3(0, 0, -380),
    planetOffset: new THREE.Vector3(0, 0, -380),
    planetScale: 0.06, // Singularity collapse
    orbitSpeed: 0.006,
  },
};

export default function ThreeSpaceEngine({ 
  activeSection = 'hero', 
  mousePos = { x: 0.5, y: 0.5 }, 
  isModalOpen = false, 
  scrollProgress = 0,
  bootPhase = 7, // 0 to 7
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    currentCamPos: new THREE.Vector3(0, 0, 145),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    targetCamPos: new THREE.Vector3(0, 0, 105),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    singularityFactor: 1.0,
    orbitProgress: 0.0,
    sunIntensity: 0.0,
    starOpacity: 0.0,
    moonAngle: 0.4,
    satAngle: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020107, 0.0009);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 4000);
    // Initial camera position depends on bootPhase
    const initialZ = bootPhase < 2 ? 145 : 105;
    camera.position.set(0, 0, initialZ);
    stateRef.current.currentCamPos.set(0, 0, initialZ);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    // 2. DIRECTIONAL CINEMATIC LIGHTING
    const sunLight = new THREE.DirectionalLight(0xffffff, bootPhase >= 3 ? 2.8 : 0.0);
    sunLight.position.set(85, 30, 75);
    scene.add(sunLight);

    const rimPurpleLight = new THREE.DirectionalLight(0x4C1D95, bootPhase >= 3 ? 0.9 : 0.0);
    rimPurpleLight.position.set(-80, -35, -45);
    scene.add(rimPurpleLight);

    const ambientLight = new THREE.AmbientLight(0x030108, bootPhase >= 2 ? 0.45 : 0.0);
    scene.add(ambientLight);

    // 3. TEXTURES
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

    // Procedural soft glow texture
    const makeGlowTex = () => {
      const cvs = document.createElement('canvas');
      cvs.width = 64;
      cvs.height = 64;
      const ctx = cvs.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(192, 132, 252, 0.7)');
      grad.addColorStop(0.6, 'rgba(76, 29, 149, 0.25)');
      grad.addColorStop(1, 'rgba(2, 1, 7, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(cvs);
    };
    const glowTex = makeGlowTex();

    // 4. DISTANT PINPOINT STARFIELD (Layered by depth)
    const starCount = 2200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const starPalette = [
      new THREE.Color('#F7F5FF'),
      new THREE.Color('#E0D8FF'),
      new THREE.Color('#C4B5FD'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#94A3B8'),
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 2600;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 1800;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 2800 - 500;

      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;

      starSizes[i] = Math.random() * 1.4 + 0.6;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
      size: 1.4,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: bootPhase >= 1 ? 0.75 : 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. DEEP PURPLE COSMIC NEBULA
    const nebulaGroup = new THREE.Group();
    const nebulaGeo = new THREE.PlaneGeometry(500, 500);

    for (let i = 0; i < 6; i++) {
      const nebulaMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        color: i % 2 === 0 ? new THREE.Color('#2E1065') : new THREE.Color('#4C1D95'),
        transparent: true,
        opacity: bootPhase >= 2 ? Math.random() * 0.028 + 0.012 : 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(nebulaGeo, nebulaMat);
      mesh.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 1200 - 400
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.scale.setScalar(Math.random() * 1.6 + 0.8);
      nebulaGroup.add(mesh);
    }
    scene.add(nebulaGroup);

    // 6. MONUMENTAL CELESTIAL SYSTEM (Massive Earth Limb on the Right)
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

    // Axial Tilt (-23.5 degrees)
    const axialTiltGroup = new THREE.Group();
    axialTiltGroup.rotation.z = THREE.MathUtils.degToRad(-23.5);
    celestialSystem.add(axialTiltGroup);

    // A. PLANETARY BODY (Monumental Earth Scale: radius 22.5)
    const planetRadius = 22.5;
    const planetGeo = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMat = new THREE.MeshPhongMaterial({
      map: earthAtmosTex,
      normalMap: earthNormalTex,
      normalScale: new THREE.Vector2(0.85, 0.85),
      specularMap: earthSpecTex,
      specular: new THREE.Color('#4C1D95'),
      shininess: 20,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    axialTiltGroup.add(planetMesh);

    // B. DRIFTING CLOUDS
    const cloudsGeo = new THREE.SphereGeometry(planetRadius + 0.35, 64, 64);
    const cloudsMat = new THREE.MeshPhongMaterial({
      map: earthCloudsTex,
      transparent: true,
      opacity: 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    axialTiltGroup.add(cloudsMesh);

    // C. RAYLEIGH ATMOSPHERIC SCATTERING SHADER (Thin Violet Rim Light)
    const atmosGeo = new THREE.SphereGeometry(planetRadius + 1.25, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.66 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          vec3 deepViolet = vec3(0.24, 0.08, 0.52);
          vec3 softViolet = vec3(0.55, 0.36, 0.96);
          vec3 atmosphericRim = mix(deepViolet, softViolet, clamp(vNormal.y * 0.5 + 0.5, 0.0, 1.0));
          gl_FragColor = vec4(atmosphericRim, 1.0) * intensity * 2.1;
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
    const moonRadius = 3.0;
    const moonGeo = new THREE.SphereGeometry(moonRadius, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({
      map: moonTex,
      bumpMap: moonTex,
      bumpScale: 0.06,
      shininess: 2,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    celestialSystem.add(moonMesh);

    // E. PROGRESSIVE ORBITAL TRAJECTORY (Draws 0% -> 100% during Boot Phase 2)
    const orbitRadius = 36.5;
    const orbitPointsCount = 180;
    const orbitPositions = new Float32Array(orbitPointsCount * 3);
    for (let i = 0; i < orbitPointsCount; i++) {
      const theta = (i / (orbitPointsCount - 1)) * Math.PI * 2;
      orbitPositions[i * 3] = orbitRadius * Math.cos(theta);
      orbitPositions[i * 3 + 1] = 0;
      orbitPositions[i * 3 + 2] = orbitRadius * Math.sin(theta);
    }
    const orbitGeo = new THREE.BufferGeometry();
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPositions, 3));
    
    // Set initial draw range based on bootPhase
    const initialDraw = bootPhase >= 3 ? orbitPointsCount : 0;
    orbitGeo.setDrawRange(0, initialDraw);

    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = THREE.MathUtils.degToRad(64);
    orbitLine.rotation.y = THREE.MathUtils.degToRad(-26);
    celestialSystem.add(orbitLine);

    // Tiny Satellite Tracker
    const satGroup = new THREE.Group();
    const satBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xF7F5FF })
    );
    satGroup.add(satBody);

    const satHalo = new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      })
    );
    satGroup.add(satHalo);
    celestialSystem.add(satGroup);

    // 7. RADIANT SINGULARITY CORE (For Registration collapse destination)
    const singularityGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const singularityMat = new THREE.MeshBasicMaterial({
      color: 0xC084FC,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const singularityMesh = new THREE.Mesh(singularityGeo, singularityMat);
    singularityMesh.position.set(0, 0, -385);
    scene.add(singularityMesh);

    // 8. RESIZE HANDLER
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateCelestialBase(width);
    };
    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const s = stateRef.current;

      // Handle Progressive Boot Transition in 3D
      if (bootPhase === 0) {
        sunLight.intensity = 0.0;
        ambientLight.intensity = 0.0;
        starMat.opacity = THREE.MathUtils.lerp(starMat.opacity, 0.0, 0.05);
        orbitGeo.setDrawRange(0, 0);
        s.targetCamPos.set(0, 0, 145);
      } else if (bootPhase === 1) {
        starMat.opacity = THREE.MathUtils.lerp(starMat.opacity, 0.75, 0.04);
        ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, 0.35, 0.04);
        s.targetCamPos.set(0, 0, 130);
      } else if (bootPhase === 2) {
        // Orbit draws progressively 0% -> 100%
        s.orbitProgress = THREE.MathUtils.lerp(s.orbitProgress, 1.0, 0.04);
        orbitGeo.setDrawRange(0, Math.floor(s.orbitProgress * orbitPointsCount));
        s.targetCamPos.set(0, 0, 120);
      } else if (bootPhase === 3) {
        // Sun ramps up and reveals Earth limb
        sunLight.intensity = THREE.MathUtils.lerp(sunLight.intensity, 2.8, 0.035);
        rimPurpleLight.intensity = THREE.MathUtils.lerp(rimPurpleLight.intensity, 0.9, 0.035);
        orbitGeo.setDrawRange(0, orbitPointsCount);
        s.targetCamPos.set(0, 0, 110);
      } else {
        // Boot complete or in Hero: normal target waypoints
        sunLight.intensity = THREE.MathUtils.lerp(sunLight.intensity, 2.8, 0.05);
        rimPurpleLight.intensity = THREE.MathUtils.lerp(rimPurpleLight.intensity, 0.9, 0.05);
        orbitGeo.setDrawRange(0, orbitPointsCount);
        starMat.opacity = 0.75;
      }

      // Camera Waypoint Target based on activeSection
      const targetConfig = SECTION_WAYPOINTS[activeSection] || SECTION_WAYPOINTS.hero;

      // Singularity modal collapse factor
      const targetSingularity = (isModalOpen || activeSection === 'register') ? 0.04 : 1.0;
      s.singularityFactor = THREE.MathUtils.lerp(s.singularityFactor, targetSingularity, 0.05);

      // Hero scroll parallax forward movement
      const scrollOffsetZ = activeSection === 'hero' ? -(scrollProgress * 28) : 0;

      if (bootPhase >= 4) {
        s.targetCamPos.copy(targetConfig.pos);
        s.targetCamPos.z += scrollOffsetZ;
      }

      // Multi-layer mouse parallax (Controlled, weighted, 3 layers)
      const mouseFactorX = (mousePos.x - 0.5);
      const mouseFactorY = (mousePos.y - 0.5);

      const mouseCamX = mouseFactorX * 5.0;
      const mouseCamY = mouseFactorY * -4.0;

      s.currentCamPos.x = THREE.MathUtils.lerp(s.currentCamPos.x, s.targetCamPos.x + mouseCamX, 0.032);
      s.currentCamPos.y = THREE.MathUtils.lerp(s.currentCamPos.y, s.targetCamPos.y + mouseCamY, 0.032);
      s.currentCamPos.z = THREE.MathUtils.lerp(s.currentCamPos.z, s.targetCamPos.z, 0.032);
      camera.position.copy(s.currentCamPos);

      s.targetLookAt.copy(targetConfig.lookAt);
      s.currentLookAt.lerp(s.targetLookAt, 0.032);
      camera.lookAt(s.currentLookAt);

      // Celestial position lerp
      if (width >= 1024 && bootPhase >= 3) {
        celestialSystem.position.lerp(targetConfig.planetOffset, 0.032);
      }

      // Parallax layer 1: background stars (subtle 0.8x)
      starField.position.x = mouseFactorX * -2.5;
      starField.position.y = mouseFactorY * 2.0;

      // Parallax layer 2: midground planet & clouds (1.6x)
      planetMesh.rotation.y = elapsed * 0.018;
      cloudsMesh.rotation.y = elapsed * 0.026;

      // Parallax layer 3: foreground satellite
      s.satAngle += 0.007;
      const sx = orbitRadius * Math.cos(s.satAngle);
      const sz = orbitRadius * Math.sin(s.satAngle);
      const satPos = new THREE.Vector3(sx, 0, sz);
      satPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(64));
      satPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-26));
      satGroup.position.copy(satPos);

      // Distant Moon in orbital path
      s.moonAngle += 0.0035;
      const lunarDist = 58;
      moonMesh.position.set(
        lunarDist * Math.cos(s.moonAngle),
        lunarDist * 0.25 * Math.sin(s.moonAngle),
        lunarDist * 0.7 * Math.sin(s.moonAngle) - 25
      );
      moonMesh.rotation.y = elapsed * 0.012;

      // Scale transition & singularity collapse
      const currentScale = targetConfig.planetScale * s.singularityFactor;
      celestialSystem.scale.setScalar(currentScale);

      // Singularity core pulse when entering register
      if (s.singularityFactor < 0.2) {
        singularityMat.opacity = THREE.MathUtils.lerp(singularityMat.opacity, 0.9, 0.08);
        const singScale = 1.0 + Math.sin(elapsed * 4.0) * 0.15;
        singularityMesh.scale.setScalar(singScale);
      } else {
        singularityMat.opacity = THREE.MathUtils.lerp(singularityMat.opacity, 0.0, 0.08);
      }

      // Deep space subtle drift
      starField.rotation.y = elapsed * 0.0006;
      nebulaGroup.rotation.z = elapsed * 0.0009;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeSection, isModalOpen, bootPhase]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      style={{ background: '#010106' }}
    />
  );
}
