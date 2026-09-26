import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * HIGH-FIDELITY CINEMATIC SPACE ENGINE
 * 
 * Art Direction:
 * - Almost total black cosmos (#020107, #030109).
 * - Massive planetary body (Earth limb) occupying 45-50% of the viewport on the right.
 * - Deep day/night terminator: majority of the planet in realistic darkness.
 * - Ultra-thin, realistic violet atmospheric rim scattering (Rayleigh limb shader).
 * - Photorealistic textures: albedo, normal bump, specular ocean reflection, independent drifting clouds.
 * - ONE single elegant, high-precision orbital trajectory with a distant satellite beacon.
 * - Distant realistic Moon at true visual scale.
 * - Depth-stratified pinpoint stars (dim, realistic magnitudes, no arcade sparkle).
 * - Faint deep purple nebula veil in deep space.
 * - Camera motion between section waypoints: smooth, physical, cinematic easing.
 */

const SECTION_CAMERA_TARGETS = {
  hero: {
    pos: new THREE.Vector3(0, 0, 105),
    lookAt: new THREE.Vector3(0, 0, 0),
    planetOffset: new THREE.Vector3(38, 2, -10),
    planetScale: 1.0,
  },
  mission: {
    pos: new THREE.Vector3(-14, 4, 80),
    lookAt: new THREE.Vector3(10, 0, 0),
    planetOffset: new THREE.Vector3(44, -4, -30),
    planetScale: 0.92,
  },
  identity: {
    pos: new THREE.Vector3(12, -8, 65),
    lookAt: new THREE.Vector3(-6, -4, 0),
    planetOffset: new THREE.Vector3(48, -12, -45),
    planetScale: 0.88,
  },
  projects: {
    pos: new THREE.Vector3(-8, 12, 45),
    lookAt: new THREE.Vector3(12, 6, -15),
    planetOffset: new THREE.Vector3(46, 8, -60),
    planetScale: 0.85,
  },
  challenges: {
    pos: new THREE.Vector3(4, 16, 25),
    lookAt: new THREE.Vector3(-10, 8, -35),
    planetOffset: new THREE.Vector3(50, 18, -80),
    planetScale: 0.82,
  },
  timeline: {
    pos: new THREE.Vector3(18, 4, -30),
    lookAt: new THREE.Vector3(0, 0, -85),
    planetOffset: new THREE.Vector3(42, -6, -110),
    planetScale: 0.80,
  },
  countdown: {
    pos: new THREE.Vector3(0, -10, -85),
    lookAt: new THREE.Vector3(4, -4, -145),
    planetOffset: new THREE.Vector3(36, -22, -150),
    planetScale: 0.85,
  },
  prizes: {
    pos: new THREE.Vector3(10, -14, -150),
    lookAt: new THREE.Vector3(-4, -10, -210),
    planetOffset: new THREE.Vector3(44, -16, -230),
    planetScale: 0.90,
  },
  partners: {
    pos: new THREE.Vector3(-6, 2, -220),
    lookAt: new THREE.Vector3(4, 0, -280),
    planetOffset: new THREE.Vector3(46, -2, -300),
    planetScale: 0.80,
  },
  faq: {
    pos: new THREE.Vector3(0, 0, -280),
    lookAt: new THREE.Vector3(0, 0, -340),
    planetOffset: new THREE.Vector3(52, 6, -370),
    planetScale: 0.75,
  },
  register: {
    pos: new THREE.Vector3(0, 0, -340),
    lookAt: new THREE.Vector3(0, 0, -380),
    planetOffset: new THREE.Vector3(55, 0, -420),
    planetScale: 0.45,
  },
};

export default function ThreeSpaceEngine({ 
  activeSection = 'hero', 
  mousePos = { x: 0.5, y: 0.5 }, 
  isModalOpen = false, 
  scrollProgress = 0,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    currentCamPos: new THREE.Vector3(0, 0, 105),
    currentLookAt: new THREE.Vector3(0, 0, 0),
    targetCamPos: new THREE.Vector3(0, 0, 105),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    singularityFactor: 1.0,
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
    camera.position.set(0, 0, 105);

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
    // Primary Star (Sun) - creates sharp realistic day/night planetary terminator
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8);
    sunLight.position.set(85, 30, 75);
    scene.add(sunLight);

    // Deep space astronomical violet back rim fill
    const rimPurpleLight = new THREE.DirectionalLight(0x4C1D95, 0.9);
    rimPurpleLight.position.set(-80, -35, -45);
    scene.add(rimPurpleLight);

    // Dark ambient space light (preserves deep shadows without pitch black clipping)
    const ambientLight = new THREE.AmbientLight(0x030108, 0.45);
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
      grad.addColorStop(0.25, 'rgba(192, 132, 252, 0.6)');
      grad.addColorStop(0.6, 'rgba(76, 29, 149, 0.2)');
      grad.addColorStop(1, 'rgba(2, 1, 7, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(cvs);
    };
    const glowTex = makeGlowTex();

    // 4. DISTANT PINPOINT STARFIELD (Layered by depth, sparse & authentic)
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

      // Realistic pinpoint dimensions
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
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 5. DEEP PURPLE COSMIC NEBULA (Very subtle, soft falloff, barely perceptible)
    const nebulaGroup = new THREE.Group();
    const nebulaGeo = new THREE.PlaneGeometry(500, 500);

    for (let i = 0; i < 6; i++) {
      const nebulaMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        color: i % 2 === 0 ? new THREE.Color('#2E1065') : new THREE.Color('#4C1D95'),
        transparent: true,
        opacity: Math.random() * 0.028 + 0.012,
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

    // B. DRIFTING CLOUDS (Slightly larger, dynamic rotation)
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
    // As mandated: purple identity appears NOT as purple paint, but as ATMOSPHERIC LIGHT.
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
          vec3 deepViolet = vec3(0.24, 0.08, 0.52); // #3D1485
          vec3 softViolet = vec3(0.55, 0.36, 0.96); // #8B5CF6
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

    // E. ONE ELEGANT ORBITAL TRAJECTORY (Single precise path with subtle satellite beacon)
    const orbitRadius = 36.5;
    const orbitGeo = new THREE.TorusGeometry(orbitRadius, 0.12, 16, 160);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = THREE.MathUtils.degToRad(64);
    orbitMesh.rotation.y = THREE.MathUtils.degToRad(-26);
    celestialSystem.add(orbitMesh);

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

    // 7. RESIZE
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateCelestialBase(width);
    };
    window.addEventListener('resize', handleResize);

    // 8. ANIMATION LOOP
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const s = stateRef.current;

      const targetConfig = SECTION_CAMERA_TARGETS[activeSection] || SECTION_CAMERA_TARGETS.hero;

      // Singularity modal collapse
      const targetSingularity = isModalOpen ? 0.05 : 1.0;
      s.singularityFactor = THREE.MathUtils.lerp(s.singularityFactor, targetSingularity, 0.05);

      // Hero scroll parallax forward movement
      const scrollOffsetZ = activeSection === 'hero' ? -(scrollProgress * 28) : 0;

      s.targetCamPos.copy(targetConfig.pos);
      s.targetCamPos.z += scrollOffsetZ;

      // Parallax mouse drift (controlled 4-6px)
      const mouseOffsetX = (mousePos.x - 0.5) * 5.5;
      const mouseOffsetY = (mousePos.y - 0.5) * -4.5;

      s.currentCamPos.x = THREE.MathUtils.lerp(s.currentCamPos.x, s.targetCamPos.x + mouseOffsetX, 0.032);
      s.currentCamPos.y = THREE.MathUtils.lerp(s.currentCamPos.y, s.targetCamPos.y + mouseOffsetY, 0.032);
      s.currentCamPos.z = THREE.MathUtils.lerp(s.currentCamPos.z, s.targetCamPos.z, 0.032);
      camera.position.copy(s.currentCamPos);

      s.targetLookAt.copy(targetConfig.lookAt);
      s.currentLookAt.lerp(s.targetLookAt, 0.032);
      camera.lookAt(s.currentLookAt);

      // Smooth celestial group displacement per section
      if (width >= 1024) {
        celestialSystem.position.lerp(targetConfig.planetOffset, 0.032);
      }

      // Slow, weighted planetary rotation (Noticeable only after steady observation)
      planetMesh.rotation.y = elapsed * 0.018;
      cloudsMesh.rotation.y = elapsed * 0.026;

      // Distant Moon in orbital path
      s.moonAngle += 0.0035;
      const lunarDist = 58;
      moonMesh.position.set(
        lunarDist * Math.cos(s.moonAngle),
        lunarDist * 0.25 * Math.sin(s.moonAngle),
        lunarDist * 0.7 * Math.sin(s.moonAngle) - 25
      );
      moonMesh.rotation.y = elapsed * 0.012;

      // Single Satellite trajectory travel
      s.satAngle += 0.007;
      const sx = orbitRadius * Math.cos(s.satAngle);
      const sz = orbitRadius * Math.sin(s.satAngle);
      const satPos = new THREE.Vector3(sx, 0, sz);
      satPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(64));
      satPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-26));
      satGroup.position.copy(satPos);

      // Scale transition
      const currentScale = targetConfig.planetScale * s.singularityFactor;
      celestialSystem.scale.setScalar(currentScale);

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
  }, [activeSection, isModalOpen]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      style={{ background: '#020107' }}
    />
  );
}
