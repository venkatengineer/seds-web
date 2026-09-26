/**
 * SEDS REC & EVENT BRANDING CONFIGURATION
 * 
 * CORE IDENTITY:
 * PRIMARY: SEDS REC (Students for the Exploration and Development of Space, Rajalakshmi Engineering College)
 * INSTITUTION: Rajalakshmi Engineering College, Chennai, India
 * EVENT: ORBITAL 26 — 48-Hour Student Space Technology Hackathon
 */

export const SEDS_CONFIG = {
  name: "SEDS REC",
  fullName: "Students for the Exploration and Development of Space",
  institution: "Rajalakshmi Engineering College",
  department: "Department of Aerospace Engineering",
  location: "Chennai, India",
  division: "SEDS India Official Chapter",
  founded: "2020",
  missionStatement: "Empowering student aerospace engineers, computational physicists, and autonomous systems architects to design, build, and launch the technological substrates of future spaceflight.",
  pillars: [
    {
      title: "PROJECTS",
      tag: "FLIGHT HARDWARE",
      desc: "Student-engineered sounding rocket avionics, sub-orbital telemetry, CubeSat structural testbeds, and autonomous planetary rover prototypes.",
    },
    {
      title: "RESEARCH",
      tag: "COMPUTATIONAL ASTRONOMY",
      desc: "N-body orbital mechanics solvers, trajectory optimization manifolds, aerodynamic CFD simulations, and peer-reviewed rocketry publications.",
    },
    {
      title: "OUTREACH",
      tag: "COMMUNITY & EDUCATION",
      desc: "Democratizing space engineering through high-altitude balloon missions, rocketry workshops, astronomy observation nights, and school STEM mentorship.",
    },
    {
      title: "LEADERSHIP",
      tag: "INDUSTRY STANDARDS",
      desc: "Operating student engineering teams under real-world aerospace standards, mission control protocols, and rigorous flight readiness reviews.",
    },
  ],
};

export const SEDS_PROJECTS = [
  {
    id: "astra-4",
    name: "PROJECT ASTRA-4",
    year: "2025–2026",
    category: "PROPULSION & AVIONICS",
    status: "FLIGHT TESTED",
    tagline: "Sub-orbital Sounding Rocket Telemetry & Static Thrust Bench",
    desc: "A custom-engineered solid rocket propulsion static test stand with real-time strain gauge thrust measurement, dual-redundant flight computer, barometric apogee detection, and dual-deployment parachute recovery.",
    image: "/images/projects/rocketry_launch.jpg",
    subsystems: ["Dual-core STM32 Flight Computer", "1000 Hz Telemetry Link", "Pyrotechnic Deployment Controller", "Cryogenic/Solid Static Load Cell"],
  },
  {
    id: "rec-sat",
    name: "REC-SAT 1U",
    year: "2025–2026",
    category: "SATELLITE SYSTEMS",
    status: "LAB TESTBED",
    tagline: "1U CubeSat Flight Computer & Sensor Payload Architecture",
    desc: "Modular 1U CubeSat engineering model featuring gold-plated bus backplanes, magnetic torquer coils for attitude control, UHF ground telemetry, and radiation-hardened memory logging for low Earth orbit payloads.",
    image: "/images/projects/cubesat_avionics.jpg",
    subsystems: ["PC104 Form-factor Bus", "UHF/VHF Transceiver (437 MHz)", "3-Axis Magnetorquer Coils", "Solar Maximum Power Tracking"],
  },
  {
    id: "aura-rover",
    name: "AURA-ROVER",
    year: "2024–2026",
    category: "PLANETARY ROBOTICS",
    status: "PROTOTYPE TESTING",
    tagline: "Autonomous Lunar Surface Exploration Rover Prototype",
    desc: "Field-tested six-wheeled rocker-bogie mobility rover built for extreme terrain traversal, featuring stereo computer vision hazard avoidance, robotic sample manipulation arm, and remote telemetry streaming.",
    image: "/images/projects/planetary_rover.jpg",
    subsystems: ["Rocker-Bogie Articulation", "Stereo Depth Point-Cloud Navigation", "5-DOF Robotic Sampling Arm", "Low-latency Mesh Telemetry"],
  },
  {
    id: "apogee-gs",
    name: "APOGEE GROUND STATION",
    year: "2023–2026",
    category: "COMMUNICATIONS",
    status: "OPERATIONAL",
    tagline: "Automated Dual-Axis Satellite Tracking Array",
    desc: "Autonomous campus ground station utilizing azimuth-elevation rotators to track amateur satellite passes (NOAA, CubeSats, ISS), decoding telemetry and Earth observation weather imagery in real-time.",
    image: "/images/projects/ground_station.jpg",
    subsystems: ["Dual-axis Azimuth/Elevation Rotator", "High-gain Yagi & Parabolic Array", "Software Defined Radio (SDR)", "Automated TLE Ephemeris Tracking"],
  },
];

export const EVENT_CONFIG = {
  name: "ORBITAL 26",
  presentsText: "PRESENTS",
  heroHeadline: ["BUILD", "BEYOND", "THE KNOWN."],
  manifesto: "A 48-hour student space technology hackathon bringing together engineers, computational architects, and physical scientists to build the software, hardware, and algorithms that belong in space.",
  edition: "2026 EDITION // 48-HOUR SPRINT",
  prizeSummary: "₹50,000",
  grandPrize: "₹50,000",
  grandPrizeNumeric: "₹50,000",
  secondPrize: "₹25,000",
  thirdPrize: "₹15,000",
  tracks: [
    {
      id: "propulsion",
      chapter: "01",
      name: "PROPULSION & AVIONICS",
      title: "PROPULSION",
      subtitle: "Guidance, Thrust Instrumentation & Flight Computing",
      desc: "Design real-time avionics, thrust measurement telemetry, or autonomous trajectory correction systems for sub-orbital and orbital launch vehicles.",
      image: "/images/challenges/propulsion.jpg",
      domains: ["Rocket Avionics", "Static Fire Instrumentation", "Guidance & Control", "Telemetry Protocols"],
      prize: "₹10,000 Track Grant",
    },
    {
      id: "satellites",
      chapter: "02",
      name: "SATELLITE SYSTEMS & CUBESATS",
      title: "SATELLITES",
      subtitle: "CubeSat Architectures, Payloads & Formation Flight",
      desc: "Develop CubeSat attitude determination algorithms, delay-tolerant optical/RF telemetry protocols, or distributed constellation management engines.",
      image: "/images/challenges/satellites.jpg",
      domains: ["ADCS Algorithms", "CubeSat Payloads", "Constellation Ephemeris", "Ground Telemetry"],
      prize: "₹10,000 Track Grant",
    },
    {
      id: "astrodynamics",
      chapter: "03",
      name: "ASTRODYNAMICS & SPACE COMPUTE",
      title: "ASTRODYNAMICS",
      subtitle: "Orbital Mechanics, N-Body Solvers & Collision Evasion",
      desc: "Construct high-precision gravity manifold solvers, low-thrust interplanetary transfer models, or autonomous space debris conjunction evasion architectures.",
      image: "/images/challenges/astrodynamics.jpg",
      domains: ["Lagrange Point Manifolds", "N-Body Physics", "Debris Conjunction", "Ephemeris APIs"],
      prize: "₹10,000 Track Grant",
    },
    {
      id: "exploration",
      chapter: "04",
      name: "SPACE EXPLORATION & ROBOTICS",
      title: "SPACE EXPLORATION",
      subtitle: "Planetary Rovers, Autonomous Sampling & Lunar Habitats",
      desc: "Build autonomous rover obstacle navigation, robotic soil sampling computer vision, or extreme-environment environmental monitoring telemetry.",
      image: "/images/challenges/exploration.jpg",
      domains: ["Rocker-Bogie Kinematics", "Surface Computer Vision", "Swarm Exploration", "Habitat Life Support"],
      prize: "₹10,000 Track Grant",
    },
  ],
  timeline: [
    {
      stage: "01",
      title: "DISCOVER",
      time: "FRIDAY 18:00 IST",
      tagline: "Mission Briefing & Problem Statement Release",
      desc: "SEDS REC flight directors convene all crews for the official technical briefing. Challenge problem statements, baseline ephemeris APIs, and testbed access are unlocked.",
    },
    {
      stage: "02",
      title: "BUILD",
      time: "SATURDAY 06:00 IST",
      tagline: "Architecture Implementation & Mentorship Checkpoints",
      desc: "Intensive 24-hour engineering sprint. Teams construct their algorithms, telemetry decoders, and hardware simulators with guidance from aerospace faculty and industry mentors.",
    },
    {
      stage: "03",
      title: "CREATE",
      time: "SATURDAY 22:00 IST",
      tagline: "Telemetry Stress Testing & Hardware Integration",
      desc: "Dry-run verification against simulated space conditions: radiation packet loss, sensor drift, and latency. Final code freezes and flight readiness documentation completed.",
    },
    {
      stage: "04",
      title: "LAUNCH",
      time: "SUNDAY 16:00 IST",
      tagline: "Live Jury Deliberation & Prize Allocation",
      desc: "Public live demonstration of working prototypes before the SEDS jury panel. Grand prize of ₹50,000 awarded alongside track grants and fellowship incubation slots.",
    },
  ],
};

export const PARTNERS_CONFIG = [
  {
    category: "HOST INSTITUTION",
    items: [
      {
        name: "Rajalakshmi Engineering College",
        type: "Autonomous Academic Institution",
        location: "Chennai, Tamil Nadu",
        role: "Institutional Host & Laboratory Infrastructure",
      },
      {
        name: "Department of Aerospace Engineering",
        type: "Academic Department",
        location: "REC Chennai",
        role: "Faculty Mentorship & Wind Tunnel / Avionics Facilities",
      },
    ],
  },
  {
    category: "CHAPTER AFFILIATION",
    items: [
      {
        name: "SEDS India",
        type: "National Space Organization",
        location: "National Chapter Network",
        role: "Official Chapter Recognition & Technical Network",
      },
      {
        name: "SEDS REC Chapter",
        type: "Student Space Organization",
        location: "REC Chennai",
        role: "Organizing Body & Space Innovation Sprint Host",
      },
    ],
  },
  {
    category: "INNOVATION & RESEARCH",
    items: [
      {
        name: "Institution's Innovation Council (IIC)",
        type: "Innovation Ecosystem",
        location: "REC Campus",
        role: "Student Entrepreneurship & Prototyping Incubation",
      },
      {
        name: "REC Research & Development Cell",
        type: "Research Support",
        location: "REC Campus",
        role: "Compute Facilities & Research Grant Sponsorship",
      },
    ],
  },
];
