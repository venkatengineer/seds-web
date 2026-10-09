/**
 * SEDS REC & EVENT BRANDING CONFIGURATION
 * Fully synchronized with official document:
 * "SEDHACKS ’26 website content document_20261002_085041_0000.docx"
 * 
 * CORE IDENTITY:
 * PRIMARY: SEDS REC (Students for the Exploration and Development of Space, Rajalakshmi Engineering College)
 * INSTITUTION: Rajalakshmi Engineering College, Chennai, India
 * EVENT: SEDHACKS '26 — A Space × Technology × Innovation Hackathon
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
// Registration closes at 12:00 AM IST on 10 Oct 2026 (midnight after the 9 Oct deadline).
export const REGISTRATION_CLOSES_AT = new Date('2026-10-10T00:00:00+05:30').getTime();
export const PPT_TEMPLATE_URL = "/SEDHACKS_ppt_template.pptx";
export const PPT_TEMPLATE_FILENAME = "SEDHACKS_ppt_template.pptx";

export const EVENT_CONFIG = {
  name: "SEDHACKS '26",
  tagline: "From Ideas to Orbit.",
  subTagline: "A Space × Technology × Innovation Hackathon",
  presentsText: "SEDS REC PRESENTS",
  heroHeadline: ["FROM IDEAS", "TO ORBIT.", "A SPACE × TECH HACKATHON"],
  manifesto: "An intra-college hackathon designed to bring together Rajalakshmi Engineering College (REC) innovators from different disciplines to explore challenges connected to space, technology and sustainability. Turn your ideas into practical solutions through hardware prototypes, software, applications, websites, simulations or other working concepts.",
  dates: "12–13 OCTOBER 2026",
  datesFormatted: "October 12–13, 2026",
  registrationDeadline: "9 OCTOBER 2026",
  registrationDeadlineFormatted: "October 9, 2026 // 11:59 PM IST",
  registrationDeadlineTime: "11:59 PM IST",
  venue: "Rajalakshmi Engineering College, Chennai",
  edition: "2026 EDITION // INTRA-COLLEGE SPACE HACKATHON",
  eligibility: "Open exclusively to students of Rajalakshmi Engineering College (REC). Outer college students are not permitted.",
  registrationFee: "100% Free of Cost (₹0 Entry Fee)",
  registrationFormUrl: REGISTRATION_FORM_URL,
  registrationFormEmbedUrl: REGISTRATION_FORM_EMBED_URL,
  pptTemplateUrl: PPT_TEMPLATE_URL,
  pptTemplateFilename: PPT_TEMPLATE_FILENAME,
  prizePool: "₹10,000+",
  prizeSummary: "₹10,000+",
  grandPrize: "₹10,000+",
  grandPrizeNumeric: "₹10,000+",
  internshipHeadline: "Top 2 Teams Internship Opportunities",
  internshipDetails: "Top 2 teams will receive internship opportunities through our collaboration with Aeroin Space Tech, subject to the applicable selection process.",
  industryPartner: "Aeroin Space Tech",
  industryCollaboration: "SEDS REC is collaborating with Aeroin Space Tech to bring industry exposure into SEDHACKS ’26. Through this collaboration, participants get an opportunity to present their ideas in an environment that connects student innovation with industry perspectives. Top 2 teams will receive internship opportunities through Aeroin Space Tech, subject to the applicable selection process.",
  
  // Section: About SEDHACKS '26 (Where Ideas Take Shape)
  about: {
    title: "About SEDHACKS ’26",
    subtitle: "Where Ideas Take Shape",
    lead: "SEDS REC presents SEDHACKS ’26, an intra-college student-led hackathon open exclusively to students of Rajalakshmi Engineering College (REC) across all disciplines to explore challenges connected to space, technology and sustainability.",
    p2: "Participants can turn their ideas into practical solutions through hardware prototypes, software, applications, websites, simulations or other working concepts.",
    p3: "The focus is not only on the idea, but on how effectively you can build, demonstrate and communicate your solution.",
  },

  // Section: Why Participate? (What You Take Away)
  whyParticipate: [
    {
      num: "01",
      title: "Build Something Real",
      desc: "Turn an idea into a working prototype, application, simulation or demonstrable solution.",
      tag: "PROTOTYPING",
      highlight: "Working Solution",
    },
    {
      num: "02",
      title: "Compete & Get Recognised",
      desc: "Compete for a ₹10,000+ prize pool and showcase your work to industry professionals.",
      tag: "AWARDS",
      highlight: "₹10,000+ Prize Pool",
    },
    {
      num: "03",
      title: "Top 2 Teams — Internship Opportunities",
      desc: "Top two teams will receive internship opportunities through our collaboration with Aeroin Space Tech, subject to the applicable selection process.",
      tag: "INDUSTRY CAREER",
      highlight: "Aeroin Space Tech",
    },
    {
      num: "04",
      title: "Learn Beyond the Classroom",
      desc: "Work with students from different backgrounds and gain practical experience in problem-solving and innovation.",
      tag: "COLLABORATION",
      highlight: "Cross-Disciplinary",
    },
    {
      num: "05",
      title: "Get Industry Exposure",
      desc: "Present your solution and receive perspectives from professionals and jury members.",
      tag: "NETWORKING",
      highlight: "Jury Mentorship",
    },
    {
      num: "06",
      title: "Earn Your Certificate",
      desc: "Certificates will be provided to participating teams/participants as per the event guidelines.",
      tag: "CERTIFICATION",
      highlight: "Official Credentials",
    },
  ],

  // Section: Tracks / Domains (Choose Your Mission - Five domains. Countless ways to build.)
  tracks: [
    {
      id: "space-defence",
      chapter: "01",
      number: "01",
      name: "Space Applications & Defence Technology",
      title: "SPACE APPLICATIONS & DEFENCE TECHNOLOGY",
      subtitle: "Space Applications & Defence Technology",
      desc: "Explore technologies that support space missions, exploration, satellite applications and defence systems.",
      thinkAbout: "Satellite-based solutions • Mission support systems • Space situational awareness • Navigation • Remote sensing • Security technologies",
      build: "Hardware prototypes, software platforms, simulations, monitoring systems or intelligent applications.",
      domains: ["Satellite Solutions", "Mission Support", "Space Situational Awareness", "Navigation", "Remote Sensing", "Security Tech"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "medical-bio",
      chapter: "02",
      number: "02",
      name: "Medical, Food & Agriculture in Space",
      title: "MEDICAL, FOOD & AGRICULTURE IN SPACE",
      subtitle: "Medical, Food & Agriculture in Space",
      desc: "How can we support human health, food systems and biological needs beyond Earth? Explore solutions for astronauts, controlled environments and future long-duration missions.",
      thinkAbout: "Astronaut health • Food preservation • Space farming • Plant growth • Nutrition • Biological systems • Resource-efficient agriculture",
      build: "Biological concepts, monitoring systems, prototypes, software tools or experimental models.",
      domains: ["Astronaut Health", "Food Preservation", "Space Farming", "Plant Growth", "Nutrition", "Resource-Efficient Agriculture"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "space-instrumentation",
      chapter: "03",
      number: "03",
      name: "Space Instrumentation",
      title: "SPACE INSTRUMENTATION",
      subtitle: "Space Instrumentation",
      desc: "Design and develop instruments that enable spacecraft and space missions to sense, measure, monitor, and understand their environment.",
      thinkAbout: "Telescopes • Space sensors • Spectrometers • Radiation detection • Thermal measurement • Attitude sensing • Telemetry • Data acquisition • Remote sensing • Payload instrumentation",
      build: "Hardware sensors, optical prototypes, spectrometers, telemetry platforms, DAQ systems, or environmental instrumentation simulations.",
      domains: ["Telescopes & Optics", "Space Sensors", "Spectrometry", "Radiation Detection", "Attitude Sensing", "Telemetry & DAQ", "Remote Sensing"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "sustainability-energy",
      chapter: "04",
      number: "04",
      name: "Sustainability and Energy Management",
      title: "SUSTAINABILITY AND ENERGY MANAGEMENT",
      subtitle: "Sustainability and Energy Management",
      desc: "How can future missions use resources and energy efficiently while reducing waste, powering long-duration space systems, and enabling closed-loop habitats?",
      thinkAbout: "Energy management • Power generation • Battery storage • Solar & nuclear space power • Waste management • Recycling • Resource recovery • Water management • Closed-loop systems",
      build: "Energy management hardware, power distribution simulations, battery management systems, closed-loop life support models, or resource recovery prototypes.",
      domains: ["Energy Management", "Power Generation", "Battery Systems", "Waste Recycling", "Resource Recovery", "Closed-Loop Systems"],
      prize: "Track Recognition & Awards",
    },
    {
      id: "open-innovation",
      chapter: "05",
      number: "05",
      name: "Open Innovation",
      title: "OPEN INNOVATION",
      subtitle: "Open Innovation",
      desc: "Have an idea that does not fit neatly into the other four domains? This is your space to explore it. Bring forward an innovative solution connected to space, technology, exploration or future human missions.",
      thinkAbout: "Interdisciplinary ideas • Space exploration concepts • Novel technologies • Cross-domain applications • Disruptive approaches",
      build: "Anything from a working hardware prototype to an app, website, simulation, scientific model or interdisciplinary concept.",
      note: "Not sure whether your idea fits? Choose the domain that is closest to your solution. Interdisciplinary ideas are welcome.",
      domains: ["Cross-Disciplinary Ideas", "Exploration Concepts", "Scientific Models", "Disruptive Tech"],
      prize: "Track Recognition & Awards",
    },
  ],

  // Section: What Can You Build? (Your Idea. Your Build.)
  whatCanYouBuild: {
    title: "What Can You Build?",
    subtitle: "Your Idea. Your Build.",
    intro: "Your solution can take different forms:",
    types: [
      {
        id: "hardware",
        title: "Hardware Prototype",
        desc: "Build and demonstrate a physical solution.",
        badge: "PHYSICAL",
      },
      {
        id: "software",
        title: "Software / Web Platform",
        desc: "Create a website, dashboard, digital tool or web-based solution.",
        badge: "WEB & CLOUD",
      },
      {
        id: "mobile",
        title: "Mobile Application",
        desc: "Develop an app that addresses your chosen challenge.",
        badge: "NATIVE & HYBRID",
      },
      {
        id: "ai-data",
        title: "AI / Data Solution",
        desc: "Use intelligent systems, data analysis or machine learning where relevant.",
        badge: "INTELLIGENT",
      },
      {
        id: "simulation",
        title: "Simulation / Digital Model",
        desc: "Demonstrate your solution through a simulation or digital model.",
        badge: "COMPUTATIONAL",
      },
      {
        id: "science",
        title: "Biological / Scientific Concept",
        desc: "Develop an experimental proof-of-concept or scientific model where applicable.",
        badge: "RESEARCH & LAB",
      },
    ],
    keyRequirement: {
      title: "The Key Requirement: Demonstrate It.",
      desc: "Your final solution should be sufficiently developed to demonstrate its working, functionality or proof-of-concept during evaluation.",
    },
  },

  // Section: Your Journey at SEDHACKS ’26 (From Registration to Recognition)
  journey: [
    {
      num: "01",
      step: "REGISTER",
      desc: "Submit your details through the official registration form.",
      timing: "Before 9 Oct // 11:59 PM IST",
    },
    {
      num: "02",
      step: "FORM YOUR TEAM",
      desc: "Assemble your 4-member squad of REC students and decide your domain.",
      timing: "Only 4 Members // REC Only",
    },
    {
      num: "03",
      step: "CHOOSE & DEVELOP",
      desc: "Understand the challenge and develop your solution.",
      timing: "Track Onboarding",
    },
    {
      num: "04",
      step: "BUILD & VALIDATE",
      desc: "Develop your prototype, software, simulation or working concept.",
      timing: "24-Hour Sprint",
    },
    {
      num: "05",
      step: "DEMONSTRATE",
      desc: "Show how your solution works during the final evaluation.",
      timing: "Jury Demonstration",
    },
    {
      num: "06",
      step: "PITCH",
      desc: "Present your problem, solution, innovation, prototype and future scope to the jury.",
      timing: "Grand Defense",
    },
    {
      num: "07",
      step: "RECOGNITION",
      desc: "Compete for the ₹10,000+ prize pool and internship opportunities for the Top 2 teams.",
      timing: "Awards Ceremony",
    },
  ],

  // Section: 24-Hour Sprint Timeline
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
      desc: "Final live pitch presentations before the SEDS REC & Aeroin Space Tech jury panel. Awards allocation from the ₹10,000+ prize pool and top 2 internship selections.",
    },
  ],

  // Section: Final Call to Action
  cta: {
    title: "Have an Idea Worth Building?",
    lines: [
      "Bring your curiosity.",
      "Build your solution.",
      "Take it beyond the classroom.",
    ],
    brand: "SEDHACKS ’26",
    tagline: "From Ideas to Orbit.",
    venueDates: "12–13 October 2026 | Rajalakshmi Engineering College, Chennai",
    feeText: "FREE REGISTRATION",
    buttonText: "REGISTER NOW",
  },

  contacts: [
    {
      role: "Student Coordinator",
      badge: "OFFICIAL STUDENT COORDINATOR",
      name: "Sruthi Nisha.J.S",
      institution: "Rajalakshmi Engineering College, Chennai",
      email: "sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in",
      phone: "+91 98844 64389",
    },
    {
      role: "Club President",
      badge: "CLUB PRESIDENT",
      name: "Arun Kumar.S",
      institution: "Rajalakshmi Engineering College, Chennai",
      email: "arunkumar.s.2024.bme@rajalakshmi.edu.in",
      phone: "+91 81221 50038",
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
        role: "Industry Collaboration & Internship Opportunities Provider for Top 2 Teams",
        desc: "SEDS REC is collaborating with Aeroin Space Tech to bring industry exposure into SEDHACKS ’26. Through this collaboration, participants get an opportunity to present their ideas in an environment that connects student innovation with industry perspectives. Top 2 teams will receive internship opportunities through Aeroin Space Tech, subject to the applicable selection process.",
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
        desc: "Autonomous institution offering engineering excellence, compute labs, and venue hosting for SEDHACKS '26 on 12–13 October 2026.",
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
        desc: "Student-led space community driving space science, rocketry, avionics, and student engineering hackathons.",
      },
      {
        name: "SEDS India",
        type: "National Space Organization",
        location: "National Chapter Network",
        role: "Parent Chapter Affiliation & Student Space Alliance",
        desc: "National student space federation fostering aerospace talent across top engineering institutions in India.",
      },
    ],
  },
];

// Re-export comprehensive FAQ registry
export * from './faqs';
