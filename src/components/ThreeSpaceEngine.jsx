import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * PREMIUM CINEMATIC DARK SPACE ENGINE
 * 
 * Visual Philosophy:
 * - The environment is mostly black (#020107, #04020A).
 * - Light exists WITHIN the darkness: emitted by distant astronomical objects.
 * - Restrained, slow, weighted, cinematic motion. No flashing, no rapid pulses.
 * - Deep 3D Space:
 *   - Background: Very distant, faint pinpoint stars across depth.
 *   - Midground: Soft, deep purple nebula (#32105F, #4C1D95) with high falloff.
 *   - Foreground: Celestial terrestrial planet in deep-space lighting + 4 precision orbital paths.
 * - Camera is the primary animation system, travelling continuously between sectors.
 */

// Camera waypoints for each section with cinematic easing coordinates
const SECTION_CAMERA_TARGETS = {
  hero: {
    pos: new THREE.Vector3(0, 0, 110),
    lookAt: new THREE.Vector3(0, 0, 0),
    planetScale: 1.0,
    orbitSpeed: 0.0012, // Weighted, majestic, slow
  },
  mission: {
    pos: new THREE.Vector3(-18, 6, 75),
    lookAt: new THREE.Vector3(12, 1, 0),
    planetScale: 0.96,
    orbitSpeed: 0.0009,
  },
  challenges: {
    pos: new THREE.Vector3(0, 16, 30),
    lookAt: new THREE.Vector3(8, 8, -35),
    planetScale: 1.08,
    orbitSpeed: 0.0011,
  },
  timeline: {
    pos: new THREE.Vector3(18, 4, -40),
    lookAt: new THREE.Vector3(0, 0, -85),
    planetScale: 1.0,
    orbitSpeed: 0.0009,
  },
  countdown: {
    pos: new THREE.Vector3(0, -12, -100),
    lookAt: new THREE.Vector3(6, -6, -150),
    planetScale: 1.04,
    orbitSpeed: 0.0008,
  },
  prizes: {
    pos: new THREE.Vector3(12, -16, -170),
    lookAt: new THREE.Vector3(4, -12, -220),
    planetScale: 1.12,
    orbitSpeed: 0.0010,
  },
  sponsors: {
    pos: new THREE.Vector3(-10, 0, -240),
    lookAt: new THREE.Vector3(6, 0, -290),
    planetScale: 1.0,
    orbitSpeed: 0.0009,
  },
  faq: {
    pos: new THREE.Vector3(0, 0, -300),
    lookAt: new THREE.Vector3(0, 0, -350),
    planetScale: 0.95,
    orbitSpeed: 0.0008,
  },
  register: {
    pos: new THREE.Vector3(0, 0, -365),
    lookAt: new THREE.Vector3(0, 0, -395),
    planetScale: 0.08, // Smooth convergence into singularity
    orbitSpeed: 0.008,
  },
};

export default function ThreeSpaceEngine({ 
  activeSection, 
  mousePos, 
  isModalOpen, 
  scrollProgress = 0,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    currentCamPos: new THREE.Vector3(0, 0, 110),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    targetCamPos: new THREE.Vector3(0, 0, 110),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    singularityFactor: 1.0,
    moonAngle: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. SCENE & CAMERA SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020107, 0.0011);

    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 3500);
    camera.position.set(0, 0, 110);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    container.appendChild(renderer.domElement);

    // 2. CINEMATIC DIRECTIONAL LIGHTING (Realistic Day/Night & Falloff)
    // Primary Distant Star Light (Illuminates one side with sharp planetary terminator)
    const starSun = new THREE.DirectionalLight(0xffffff, 2.4);
    starSun.position.set(60, 25, 70);
    scene.add(starSun);

    // Distant Astronomical Purple Backlight (Restrained, low intensity falloff)
    const astroPurpleLight = new THREE.DirectionalLight(0x4C1D95, 0.85);
    astroPurpleLight.position.set(-65, -30, -50);
    scene.add(astroPurpleLight);

    // Deep Velvet Space Ambient (Ensures dark side is moody black, not completely washed out)
    const spaceAmbient = new THREE.AmbientLight(0x04020A, 0.35);
    scene.add(spaceAmbient);

    // 3. TEXTURE LOADER & REAL ASSETS
    const texLoader = new THREE.TextureLoader();
    const earthAtmosTex = texLoader.load('/textures/planets/earth_atmos.jpg');
    const earthNormalTex = texLoader.load('/textures/planets/earth_normal.jpg');
    const earthSpecTex = texLoader.load('/textures/planets/earth_specular.jpg');
    const earthCloudsTex = texLoader.load('/textures/planets/earth_clouds.png');
    const moonTex = texLoader.load('/textures/planets/moon.jpg');

    [earthAtmosTex, earthNormalTex, earthSpecTex, earthCloudsTex, moonTex].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.anisotropy = 4;
    });

    // Procedural Particle Glow Texture
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(192, 132, 252, 0.7)');
      grad.addColorStop(0.55, 'rgba(76, 29, 149, 0.25)');
      grad.addColorStop(1, 'rgba(2, 1, 7, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };
    const glowTex = createGlowTexture();

    // 4. LAYER 0: VERY DISTANT STARS (Sparse, quiet, depth-separated)
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const starPalette = [
      new THREE.Color('#F7F5FF'),
      new THREE.Color('#C084FC'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#A6A0B8'),
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 2200;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 1600;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 2400 - 400;

      const col = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[i3] = col.r;
      starColors[i3 + 1] = col.g;
      starColors[i3 + 2] = col.b;

      // Small, dim pinpoints (0.5 to 1.5px)
      starSizes[i] = Math.random() * 1.5 + 0.5;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
      size: 1.6,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. LAYER 1: DEEP SPACE ASTRONOMICAL NEBULA (Subtle, very low opacity)
    const nebulaGroup = new THREE.Group();
    const nebulaCount = 8;
    const nebulaGeo = new THREE.PlaneGeometry(420, 420);

    for (let i = 0; i < nebulaCount; i++) {
      const nebulaMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        color: i % 2 === 0 ? new THREE.Color('#32105F') : new THREE.Color('#4C1D95'),
        transparent: true,
        opacity: Math.random() * 0.035 + 0.015, // Extremely subtle so space stays dark
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh = new THREE.Mesh(nebulaGeo, nebulaMat);
      mesh.position.set(
        (Math.random() - 0.5) * 900,
        (Math.random() - 0.5) * 700,
        (Math.random() - 0.5) * 1300 - 300
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.scale.setScalar(Math.random() * 1.5 + 0.9);
      nebulaGroup.add(mesh);
    }
    scene.add(nebulaGroup);

    // 6. LAYER 2: THE 3D CELESTIAL STRUCTURE (Positioned on the RIGHT half of viewport)
    const celestialSystem = new THREE.Group();
    const updateCelestialPosition = (w) => {
      if (w >= 1024) {
        celestialSystem.position.set(35, 1, -5);
      } else {
        celestialSystem.position.set(0, 16, -20);
      }
    };
    updateCelestialPosition(width);
    scene.add(celestialSystem);

    // Axial Tilt Group (23.5° realistic axial tilt)
    const planetAxialGroup = new THREE.Group();
    planetAxialGroup.rotation.z = THREE.MathUtils.degToRad(-23.5);
    celestialSystem.add(planetAxialGroup);

    // A. REAL PLANET BODY
    const planetRadius = 15.5;
    const planetGeo = new THREE.SphereGeometry(planetRadius, 64, 64);
    const planetMat = new THREE.MeshPhongMaterial({
      map: earthAtmosTex,
      normalMap: earthNormalTex,
      normalScale: new THREE.Vector2(0.8, 0.8),
      specularMap: earthSpecTex,
      specular: new THREE.Color('#6D28D9'), // Deep purple specular ocean gleam
      shininess: 24,
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetAxialGroup.add(planetMesh);

    // B. DYNAMIC CLOUD LAYER (Slow independent atmospheric drift)
    const cloudsGeo = new THREE.SphereGeometry(planetRadius + 0.3, 64, 64);
    const cloudsMat = new THREE.MeshPhongMaterial({
      map: earthCloudsTex,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    planetAxialGroup.add(cloudsMesh);

    // C. RAYLEIGH ATMOSPHERIC SCATTERING SHADER (Deep Purple to Soft Violet Limb)
    const atmosGeo = new THREE.SphereGeometry(planetRadius + 1.0, 64, 64);
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
          float intensity = pow(0.64 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
          vec3 deepPurpleLimb = vec3(0.30, 0.11, 0.58); // #4C1D95
          vec3 softVioletLimb = vec3(0.55, 0.36, 0.96); // #8B5CF6
          vec3 limbColor = mix(deepPurpleLimb, softVioletLimb, clamp(vNormal.y * 0.5 + 0.5, 0.0, 1.0));
          gl_FragColor = vec4(limbColor, 1.0) * intensity * 1.9;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    celestialSystem.add(atmosMesh);

    // D. REAL ORBITING MOON
    const moonRadius = 2.2;
    const moonGeo = new THREE.SphereGeometry(moonRadius, 32, 32);
    const moonMat = new THREE.MeshPhongMaterial({
      map: moonTex,
      bumpMap: moonTex,
      bumpScale: 0.05,
      shininess: 3,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    celestialSystem.add(moonMesh);

    // Subtle Lunar Orbit Path
    const lunarOrbitRadius = 38;
    const lunarOrbitGeo = new THREE.BufferGeometry();
    const lunarPoints = [];
    for (let i = 0; i <= 64; i++) {
      const theta = (i / 64) * Math.PI * 2;
      lunarPoints.push(new THREE.Vector3(
        lunarOrbitRadius * Math.cos(theta),
        (lunarOrbitRadius * 0.22) * Math.sin(theta),
        lunarOrbitRadius * 0.82 * Math.sin(theta)
      ));
    }
    lunarOrbitGeo.setFromPoints(lunarPoints);
    const lunarOrbitMat = new THREE.LineBasicMaterial({
      color: 0x4C1D95,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const lunarOrbitLine = new THREE.Line(lunarOrbitGeo, lunarOrbitMat);
    celestialSystem.add(lunarOrbitLine);

    // E. 4 MAJOR ORBITAL PATHS (Maximum 4 major visible paths)
    const createOrbitRing = (radius, tiltX, tiltY, colorHex, opacity, tubeThickness, withTicks = false) => {
      const ringGroup = new THREE.Group();

      const torusGeo = new THREE.TorusGeometry(radius, tubeThickness, 16, 128);
      const torusMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      torusMesh.rotation.x = Math.PI / 2;
      ringGroup.add(torusMesh);

      if (withTicks) {
        const tickCount = 48;
        const tickPositions = [];
        for (let i = 0; i < tickCount; i++) {
          const theta = (i * 2 * Math.PI) / tickCount;
          const x1 = radius * Math.cos(theta);
          const z1 = radius * Math.sin(theta);
          const len = (i % 6 === 0) ? 1.8 : 0.8;
          const x2 = (radius + len) * Math.cos(theta);
          const z2 = (radius + len) * Math.sin(theta);
          tickPositions.push(x1, 0, z1, x2, 0, z2);
        }
        const tickGeo = new THREE.BufferGeometry();
        tickGeo.setAttribute('position', new THREE.Float32BufferAttribute(tickPositions, 3));
        const tickMat = new THREE.LineBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: opacity * 0.6,
          blending: THREE.AdditiveBlending,
        });
        const ticks = new THREE.LineSegments(tickGeo, tickMat);
        ringGroup.add(ticks);
      }

      ringGroup.rotation.x = tiltX;
      ringGroup.rotation.y = tiltY;
      return ringGroup;
    };

    // 1. Primary Major Ring (Detailed, restrained, radius 27)
    const orbit1 = createOrbitRing(27, THREE.MathUtils.degToRad(68), THREE.MathUtils.degToRad(-24), 0x8B5CF6, 0.7, 0.18, true);
    celestialSystem.add(orbit1);

    // 2. Secondary Orbit Path 1 (Thin, radius 35)
    const orbit2 = createOrbitRing(35, THREE.MathUtils.degToRad(40), THREE.MathUtils.degToRad(42), 0x6D28D9, 0.28, 0.10);
    celestialSystem.add(orbit2);

    // 3. Secondary Orbit Path 2 (Inner, radius 22)
    const orbit3 = createOrbitRing(22, THREE.MathUtils.degToRad(-30), THREE.MathUtils.degToRad(18), 0x4C1D95, 0.22, 0.08);
    celestialSystem.add(orbit3);

    // 4. Subtle Distant Orbit (Hairline, radius 46)
    const orbit4 = createOrbitRing(46, THREE.MathUtils.degToRad(52), THREE.MathUtils.degToRad(10), 0xC084FC, 0.12, 0.06);
    celestialSystem.add(orbit4);

    // Small Satellite Beacon on the primary orbit
    const satGroup = new THREE.Group();
    const satCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xF7F5FF })
    );
    satGroup.add(satCore);
    const satHalo = new THREE.Mesh(
      new THREE.SphereGeometry(2.0, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      })
    );
    satGroup.add(satHalo);
    celestialSystem.add(satGroup);

    // 7. RESIZE HANDLER
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateCelestialPosition(width);
    };
    window.addEventListener('resize', handleResize);

    // 8. ANIMATION LOOP (Controlled, Slow, Weighted Motion)
    let animId;
    let clock = new THREE.Clock();
    let satAngle = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      const targetConfig = SECTION_CAMERA_TARGETS[activeSection] || SECTION_CAMERA_TARGETS.hero;
      const s = stateRef.current;

      const targetSingularity = isModalOpen ? 0.02 : 1.0;
      s.singularityFactor = THREE.MathUtils.lerp(s.singularityFactor, targetSingularity, 0.06);

      const scrollZOffset = (activeSection === 'hero') ? -(scrollProgress * 36) : 0;

      s.targetCamPos.copy(targetConfig.pos);
      s.targetCamPos.z += scrollZOffset;

      // Subtle, weighted mouse camera drift (max 5px, no jitter)
      const mouseOffsetX = (mousePos.x - 0.5) * 6;
      const mouseOffsetY = (mousePos.y - 0.5) * -5;

      s.currentCamPos.x = THREE.MathUtils.lerp(s.currentCamPos.x, s.targetCamPos.x + mouseOffsetX, 0.035);
      s.currentCamPos.y = THREE.MathUtils.lerp(s.currentCamPos.y, s.targetCamPos.y + mouseOffsetY, 0.035);
      s.currentCamPos.z = THREE.MathUtils.lerp(s.currentCamPos.z, s.targetCamPos.z, 0.035);

      camera.position.copy(s.currentCamPos);

      s.targetLookAt.copy(targetConfig.lookAt);
      s.currentLookAt.lerp(s.targetLookAt, 0.035);
      camera.lookAt(s.currentLookAt);

      // Slow, weighted planetary rotation (Noticeable only after observing for a few seconds)
      planetMesh.rotation.y = elapsed * 0.022;
      cloudsMesh.rotation.y = elapsed * 0.032;

      // Slow lunar orbit
      s.moonAngle += 0.005;
      const mx = lunarOrbitRadius * Math.cos(s.moonAngle);
      const my = (lunarOrbitRadius * 0.22) * Math.sin(s.moonAngle);
      const mz = lunarOrbitRadius * 0.82 * Math.sin(s.moonAngle);
      moonMesh.position.set(mx, my, mz);
      moonMesh.rotation.y = elapsed * 0.015;

      // Slow satellite motion on primary ring
      satAngle += 0.009;
      const sx = 27 * Math.cos(satAngle);
      const sz = 27 * Math.sin(satAngle);
      const satPos = new THREE.Vector3(sx, 0, sz);
      satPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(68));
      satPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-24));
      satGroup.position.copy(satPos);

      // Slow differential orbit rotation
      orbit1.rotation.z += targetConfig.orbitSpeed * 0.5;
      orbit2.rotation.z -= targetConfig.orbitSpeed * 0.7;
      orbit3.rotation.z += targetConfig.orbitSpeed * 0.9;
      orbit4.rotation.z -= targetConfig.orbitSpeed * 0.3;

      // Gentle scale interpolation
      const currentScale = targetConfig.planetScale * s.singularityFactor;
      celestialSystem.scale.setScalar(currentScale);

      // Microscopic starfield & nebula drift
      starField.rotation.y = elapsed * 0.0008;
      nebulaGroup.rotation.z = elapsed * 0.0012;

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
  }, [activeSection, isModalOpen]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      style={{ background: '#020107' }}
    />
  );
}
