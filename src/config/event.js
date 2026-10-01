/**
 * SEDS REC & EVENT BRANDING CONFIGURATION
 * 
 * CORE IDENTITY:
 * PRIMARY: SEDS REC (Students for the Exploration and Development of Space, Rajalakshmi Engineering College)
 * INSTITUTION: Rajalakshmi Engineering College, Chennai, India
 * EVENT: SEDHACKS '26 — Student Space & Technology Hackathon
 */

export const SEDS_CONFIG = {
  name: "SEDS REC",
  fullName: "Students for the Exploration and Development of Space",
  institution: "Rajalakshmi Engineering College",
  location: "Chennai, India",
  division: "SEDS India Official Chapter",
  founded: "2020",
  about: "SEDS REC is a student-led community at Rajalakshmi Engineering College dedicated to promoting interest in space science, technology, innovation and interdisciplinary learning. Through technical activities, industry interactions and student initiatives, SEDS REC provides a platform for students to explore opportunities beyond the classroom.",
  missionStatement: "SEDS REC is a student-led community at Rajalakshmi Engineering College dedicated to promoting interest in space science, technology, innovation and interdisciplinary learning. Through technical activities, industry interactions and student initiatives, SEDS REC provides a platform for students to explore opportunities beyond the classroom.",
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

export const REGISTRATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfEC7Sndyksvk125Jr8TzwKhKVcqiFLFZwL3chNYuNbataJRg/viewform?usp=sharing&ouid=105886379411425310581";
export const REGISTRATION_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfEC7Sndyksvk125Jr8TzwKhKVcqiFLFZwL3chNYuNbataJRg/viewform?embedded=true";

export const EVENT_CONFIG = {
  name: "SEDHACKS '26",
  tagline: "Innovate. Build. Explore Beyond the Sky.",
  presentsText: "PRESENTS",
  heroHeadline: ["INNOVATE.", "BUILD.", "EXPLORE BEYOND THE SKY."],
  manifesto: "SEDS REC presents a student-led hackathon bringing together young innovators from diverse disciplines to develop solutions for challenges related to space, technology and sustainability.",
  dates: "12–13 OCTOBER 2026",
  datesFormatted: "October 12–13, 2026",
  venue: "Rajalakshmi Engineering College, Chennai",
  edition: "2026 EDITION // STUDENT SPACE HACKATHON",
  registrationFormUrl: REGISTRATION_FORM_URL,
  registrationFormEmbedUrl: REGISTRATION_FORM_EMBED_URL,
  prizePool: "₹10,000",
  prizeSummary: "₹10,000",
  grandPrize: "₹10,000",
  grandPrizeNumeric: "₹10,000",
  internshipHeadline: "Top 3 Teams Internship Opportunities",
  internshipDetails: "The Top 3 teams will receive internship opportunities through our industry collaboration with Aeroin Space Tech, subject to the organisation's selection process.",
  industryPartner: "Aeroin Space Tech",
  industryCollaboration: "This hackathon is being conducted with industry collaboration from Aeroin Space Tech, creating opportunities for students to interact with industry perspectives and explore potential internship opportunities.",
  tracks: [
    {
      id: "space-defence",
      chapter: "01",
      number: "01",
      name: "Space Applications & Defence Technology",
      title: "SPACE & DEFENCE",
      subtitle: "Space Applications, Defence Technologies & Flight Hardware",
      desc: "Explore innovative technologies and applications for space and defence.",
      image: "/images/challenges/propulsion.jpg",
      domains: ["Defence Tech", "Space Applications", "Avionics & Telemetry", "Surveillance & Guidance"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "medical-bio",
      chapter: "02",
      number: "02",
      name: "Medical, Food & Agriculture in Space",
      title: "SPACE BIO & MED",
      subtitle: "Off-World Healthcare, Bio-Regenerative Life Support & Space Food",
      desc: "Develop ideas addressing healthcare, food systems and agriculture for space environments.",
      image: "/images/challenges/satellites.jpg",
      domains: ["Space Medicine", "Food Systems", "Microgravity Agriculture", "Bio-Regenerative Life Support"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "autonomous-comms",
      chapter: "03",
      number: "03",
      name: "Autonomous & Communication Technology",
      title: "AUTONOMOUS & COMMS",
      subtitle: "Autonomous Systems, Space Communications & Edge Computing",
      desc: "Build solutions involving autonomous systems, communication technologies and intelligent applications.",
      image: "/images/challenges/astrodynamics.jpg",
      domains: ["Autonomous Flight", "RF & Optical Comms", "Intelligent Systems", "Edge Computing"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "sustainability",
      chapter: "04",
      number: "04",
      name: "Sustainability in Space",
      title: "SPACE SUSTAINABILITY",
      subtitle: "Sustainable Space Exploration, Resource Utilisation & Clean Orbit",
      desc: "Address challenges related to sustainable space exploration, resource utilisation and future space missions.",
      image: "/images/challenges/exploration.jpg",
      domains: ["Debris Remediation", "Resource Utilisation (ISRU)", "Green Propulsion", "Long-Duration Missions"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "open-innovation",
      chapter: "05",
      number: "05",
      name: "Miscellaneous / Open Innovation",
      title: "OPEN INNOVATION",
      subtitle: "Cross-Disciplinary Space Tech, Planetary Science & Disruptive Ideas",
      desc: "Have an innovative space-related idea that does not fit the above tracks? This is your space to explore it.",
      image: "/images/challenges/satellites.jpg",
      domains: ["Open Architecture", "Space Policy & Economics", "Planetary Sciences", "Disruptive Concepts"],
      prize: "Track Recognition & Awards",
    },
  ],
  timeline: [
    {
      stage: "01",
      title: "DISCOVER",
      time: "12 OCT // 09:00 IST",
      tagline: "Mission Briefing & Track Onboarding",
      desc: "SEDS REC opens SEDHACKS '26 at Rajalakshmi Engineering College. Challenge tracks unlock, team workspaces are assigned, and the innovation sprint begins.",
    },
    {
      stage: "02",
      title: "BUILD",
      time: "12 OCT // 14:00 IST",
      tagline: "Architecture Implementation & Mentorship Checkpoints",
      desc: "Teams rapidly develop their solutions across software, hardware, and algorithms with mentorship guidance from SEDS REC and industry experts.",
    },
    {
      stage: "03",
      title: "CREATE",
      time: "13 OCT // 02:00 IST",
      tagline: "System Prototyping & Stress Testing",
      desc: "Overnight sprint refinement. Teams validate functional prototypes, run simulations, stress test edge cases, and finalize presentation dossiers.",
    },
    {
      stage: "04",
      title: "LAUNCH",
      time: "13 OCT // 15:00 IST",
      tagline: "Prototype Demos, Jury Evaluation & Awards",
      desc: "Final live pitch presentations before the SEDS REC & Aeroin Space Tech jury panel. Awards allocation from the ₹10,000 prize pool and top 3 internship selections.",
    },
  ],
  whyParticipate: [
    {
      title: "₹10,000 Prize Pool",
      highlight: "₹10,000",
      desc: "Compete, innovate and get recognised for your solution.",
    },
    {
      title: "Internship Opportunities",
      highlight: "Top 3 Teams",
      desc: "The Top 3 teams will receive internship opportunities through our industry collaboration with Aeroin Space Tech, subject to the organisation's selection process.",
    },
    {
      title: "Industry Collaboration",
      highlight: "Aeroin Space Tech",
      desc: "Interact with real aerospace industry perspectives and explore direct professional growth pathways.",
    },
    {
      title: "SEDS Platform & Mentorship",
      highlight: "SEDS REC",
      desc: "Access guidance from experienced student engineers, academic mentors, and space community peers.",
    },
  ],
  contacts: [
    {
      role: "Student Coordinator",
      name: "Sruthi Nisha.J.S",
      institution: "Rajalakshmi Engineering College, Chennai",
      email: "sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in",
      phone: "+91 98844 64389",
    },
    {
      role: "SEDHACKS '26 Query Desk",
      name: "Event Operations & Support",
      institution: "Rajalakshmi Engineering College, Chennai",
      email: "queries.sedshacks@gmail.com",
      phone: "+91 98844 64389",
    },
  ],
};

export const PARTNERS_CONFIG = [
  {
    category: "INDUSTRY COLLABORATION",
    items: [
      {
        name: "Aeroin Space Tech",
        type: "Aerospace Industry Partner",
        location: "India",
        role: "Industry Collaboration & Internship Opportunities Provider for Top 3 Teams",
      },
    ],
  },
  {
    category: "HOST INSTITUTION",
    items: [
      {
        name: "Rajalakshmi Engineering College",
        type: "Autonomous Academic Institution",
        location: "Chennai, Tamil Nadu",
        role: "Host Campus & Laboratory Infrastructure Provider",
      },
    ],
  },
  {
    category: "ORGANIZING BODY & CHAPTER AFFILIATION",
    items: [
      {
        name: "SEDS REC",
        type: "Student Space Organization",
        location: "REC Chennai",
        role: "Organizing Body & Host of SEDHACKS '26",
      },
      {
        name: "SEDS India",
        type: "National Space Organization",
        location: "National Chapter Network",
        role: "Parent Chapter Affiliation & Student Space Alliance",
      },
    ],
  },
];
