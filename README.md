# SEDS REC presents SEDHACKS '26
### *Continuous 3D Space Environment & Celestial Navigation Engine*

> **Primary Organization:** **SEDS REC** (Students for the Exploration and Development of Space, Rajalakshmi Engineering College)  
> **Secondary Event:** **SEDHACKS '26** (Student Space & Technology Hackathon)  
> **Tagline:** *Innovate. Build. Explore Beyond the Sky.*

---

## ✦ Core Vision: The Website Itself is Space

The user is not looking at a static space wallpaper. The user is **moving through a continuous 3D space world**:
- **3D Celestial Object:** Photorealistic NASA-textured Earth with 23.5° axial tilt, dynamic atmospheric cloud drift, custom Rayleigh scattering limb glow, orbiting 3D cratered Moon, and 4 major orbital paths.
- **Continuous 3D Camera Travel:** Scrolling and navigating flies the camera smoothly through 3D waypoints across space sectors.
- **Astronomical Space Navigation Map (HUD):** A real-time unobtrusive sector widget displaying active sector coordinates and return-to-apex control.
- **Color System:** Grounded in deep black (`#020107`, `#04020A`), space purple (`#32105F`, `#4C1D95`, `#6D28D9`), and astronomical light (`#8B5CF6`, `#C084FC`). Strictly no bright neon, cyan wash, or rainbow gradients.

---

## ✦ 3D Spatial Sectors & Waypoints

```text
Sector 00: Apex Hero System       -> pos: (0, 0, 110)
Sector 01: Mission & Charter      -> pos: (-22, 10, 68)
Sector 02: Challenge Constellation-> pos: (0, 26, 25)
Sector 03: Flight Trajectory      -> pos: (26, 8, -50)
Sector 04: Launch Horizon         -> pos: (0, -18, -125)
Sector 05: Prize Monuments        -> pos: (18, -24, -200)
Sector 06: Orbital Alliances      -> pos: (-16, 0, -280)
Sector 07: Singularity Intake     -> pos: (0, 0, -390) [Collapses into violet point]
```

---

## ✦ Development & Deployment

```bash
# Start development server
npm run dev

# Production build
npm run build
```
Live server: `http://localhost:5173/`
