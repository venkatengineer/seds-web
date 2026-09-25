/**
 * SEDS REC & EVENT BRANDING CONFIGURATION
 * 
 * CORE IDENTITY:
 * PRIMARY: SEDS REC (Students for the Exploration and Development of Space, Rajalakshmi Engineering College)
 * EVENT: ORBITAL 26 (Temporary mock event name, easily swappable here)
 */

export const SEDS_CONFIG = {
  name: "SEDS REC",
  tagline: "Students for the Exploration and Development of Space",
  institution: "Rajalakshmi Engineering College",
  location: "Chennai, India",
  division: "SEDS India Official Chapter",
  founded: "2020",
  missionStatement: "Empowering young aerospace engineers, computational physicists, and autonomous systems architects to pioneer the next era of deep space exploration.",
  pillars: [
    {
      title: "ROCKET PROPULSION & AVIONICS",
      desc: "Sub-orbital telemetry computers, hybrid rocket engine test instrumentation, and high-altitude flight sensors.",
    },
    {
      title: "SATELLITE SYSTEMS & CUBESATS",
      desc: "Nano-satellite attitude determination, UHF/VHF ground station communications, and orbital payload architectures.",
    },
    {
      title: "ASTRODYNAMICS & SPACE COMPUTE",
      desc: "N-body gravitational simulations, autonomous orbital debris collision evasion, and optical telemetry networks.",
    },
    {
      title: "RESEARCH & SPACE EXPLORATION",
      desc: "Peer-reviewed rocketry publications, simulated lunar habitats, and space technology innovation incubators.",
    },
  ],
};

export const EVENT_CONFIG = {
  name: "ORBITAL 26", // Easily configurable temporary event name
  presentsText: "PRESENTS",
  heroHeadline: ["BUILD", "BEYOND", "THE KNOWN."],
  heroAlternativeHeadline: ["EXPLORE", "BEYOND", "BOUNDARIES."],
  missionStatement: ["WE EXPLORE", "WHAT COMES NEXT."],
  registrationPrompt: "READY TO BUILD THE UNKNOWN?",
  edition: "2026 // 48-HOUR SPRINT",
  prizeSummary: "₹50K+",
  grandPrize: "₹50K",
  grandPrizeNumeric: "₹50,000",
  secondPrize: "₹25K",
  thirdPrize: "₹15K",
  tracks: [
    {
      id: "ai",
      name: "AI & AUTONOMY",
      short: "AI",
      angle: 90, // Top
      desc: "Autonomous deep-space navigation, predictive solar flare transformer models, and lunar/Martian rover hazard traversal.",
      tags: ["Transformers", "Autonomous Navigation", "Edge AI"],
      prize: "₹15K Grant",
    },
    {
      id: "space",
      name: "SPACE SYSTEMS",
      short: "SPACE",
      angle: 165, // Upper-left
      desc: "Real-time orbital propagation engines, low-thrust trajectory manifolds, and satellite constellation formation sync.",
      tags: ["Astrodynamics", "CubeSat Avionics", "Ephemeris"],
      prize: "₹15K Grant",
    },
    {
      id: "robotics",
      name: "ROBOTICS & MOBILITY",
      short: "ROBOTICS",
      angle: 15, // Upper-right
      desc: "Surface rover kinematics, multi-agent lunar swarms, and extreme-environment robotic sample acquisition mechanisms.",
      tags: ["Kinematics", "Swarm Robotics", "Actuation"],
      prize: "₹15K Grant",
    },
    {
      id: "climate",
      name: "CLIMATE & EARTH OBSERVATION",
      short: "CLIMATE",
      angle: 230, // Lower-left
      desc: "Hyperspectral satellite atmospheric telemetry, greenhouse gas flux tracking, and orbital wildfire boundary models.",
      tags: ["Remote Sensing", "GIS Telemetry", "Spectroscopy"],
      prize: "₹15K Grant",
    },
    {
      id: "deep-compute",
      name: "DEEP SPACE COMMUNICATIONS",
      short: "TELEMETRY",
      angle: 310, // Lower-right
      desc: "Sub-nanowatt optical transceivers, delay-tolerant mesh networking protocols, and quantum key distribution.",
      tags: ["Optical Comms", "DTN Protocols", "DSP"],
      prize: "₹15K Grant",
    },
  ],
};
