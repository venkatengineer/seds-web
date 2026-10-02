/**
 * SEDS SPACE HACKATHON — OFFICIAL COMPREHENSIVE FAQ REGISTRY
 * Incorporates PART 2 of "SEDHACKS ’26 website content document_20261002_085041_0000.docx"
 * combined with the in-depth space engineering directives handbook.
 */

export const FAQ_CATEGORIES = [
  {
    id: "general",
    label: "Mission & General",
    desc: "Core format, dates, venue, free registration, and logistics",
    faqs: [
      {
        num: "01",
        q: "Who can participate in SEDHACKS ’26?",
        a: "Students who meet the event's eligibility criteria can participate. Students currently enrolled in recognized colleges and universities (both undergraduate and postgraduate) across any engineering, science, or technology discipline are encouraged to take part.",
        officialId: 1
      },
      {
        num: "02",
        q: "Is the hackathon free to enter?",
        a: "Yes. Registration is completely free of cost (₹0 entry fee) for all participating teams! There is zero participation fee and zero hidden charges.",
        officialId: 2
      },
      {
        num: "03",
        q: "When and where is SEDHACKS ’26 being conducted?",
        a: "SEDHACKS ’26 takes place on 12–13 October 2026 at Rajalakshmi Engineering College, Chennai, Tamil Nadu, India. The registration deadline is strictly 10 October 2026 // 23:59 IST.",
        officialId: 15
      },
      {
        num: "04",
        q: "How do I register and is there any fee after submitting?",
        a: "Click 'Register Now' on the website and complete the official Google Form with your team details before the 10 October 2026 // 23:59 IST cutoff. There is no fee required after submitting—registration is 100% free.",
        officialId: 17
      },
      {
        num: "05",
        q: "Will food and refreshments be provided?",
        a: "Yes. Food and refreshments will be provided to participants during the 48-hour hackathon event.",
        officialId: 14
      },
      {
        num: "06",
        q: "Do I need to be an expert in space technology?",
        a: "No. You do not need to be a space expert. What matters is your ability to learn, collaborate, experiment, and turn an idea into a working solution. Teams can contribute through different technical and interdisciplinary skills.",
        officialId: 6
      }
    ]
  },
  {
    id: "teams",
    label: "Participation & Teams",
    desc: "Squad rules, team composition, and cross-college criteria",
    faqs: [
      {
        num: "07",
        q: "How many members can be in one team?",
        a: "All teams must register with strictly 4 members (1 Team Leader plus 3 team members) to ensure balanced multidisciplinary capabilities across software, hardware, and engineering.",
        officialId: 4
      },
      {
        num: "08",
        q: "Can students from different departments form a team?",
        a: "Yes. Interdisciplinary teams are highly encouraged! Students from ECE, EEE, CSE, Mechanical, Aerospace, AI/DS, and other science disciplines can combine their unique skills to solve space-related problems.",
        officialId: 3
      },
      {
        num: "09",
        q: "Can students from different colleges form a team?",
        a: "Yes. Cross-college collaborations are permitted as long as all 4 team members are valid university students and carry valid college identification.",
      },
      {
        num: "10",
        q: "Can I participate in more than one team?",
        a: "No. Each participant can be part of only one team. A student cannot be registered on multiple team rosters.",
        officialId: 5
      }
    ]
  },
  {
    id: "domains",
    label: "Tracks & Domains",
    desc: "Five official domains and interdisciplinary project scopes",
    faqs: [
      {
        num: "11",
        q: "What are the hackathon domains?",
        a: "SEDHACKS ’26 features five official domains: 01. Space Applications & Defence Technology, 02. Medical, Food & Agriculture in Space, 03. Space Instrumentation, 04. Sustainability and Energy Management, and 05. Open Innovation.",
        officialId: 9
      },
      {
        num: "12",
        q: "Can our idea combine more than one domain?",
        a: "Yes. Interdisciplinary solutions are welcome. Select the domain that best represents your primary problem or core solution. If your idea does not fit neatly, Domain 05 (Open Innovation) accommodates it.",
        officialId: 10
      },
      {
        num: "13",
        q: "Can we solve an Earth-based problem using space technology?",
        a: "Yes! Your solution can address an Earth-based challenge if it meaningfully uses or is inspired by satellite data, remote sensing, navigation, communication, robotics, or space-derived technologies.",
      },
      {
        num: "14",
        q: "Can we work on an existing idea or research?",
        a: "You may build upon existing research or open-source libraries, but your implementation must demonstrate meaningful originality, improvement, or novel application developed during the hackathon.",
      }
    ]
  },
  {
    id: "build",
    label: "What Can You Build?",
    desc: "Prototypes, software, simulations, AI tools, and key requirements",
    faqs: [
      {
        num: "15",
        q: "What can we build for SEDHACKS ’26?",
        a: "Your solution can take different forms: Hardware Prototype, Software / Web Platform, Mobile Application, AI / Data Solution, Simulation / Digital Model, or Biological / Scientific Concept relevant to your selected domain.",
        officialId: 7
      },
      {
        num: "16",
        q: "Do we need a working prototype?",
        a: "Teams should develop a sufficiently complete solution for demonstration and validation during the final evaluation. The key requirement is: Demonstrate It — your solution should show its working, functionality, or proof-of-concept during evaluation.",
        officialId: 8
      },
      {
        num: "17",
        q: "Can we use AI tools or existing software/libraries?",
        a: "Yes, where relevant. Teams may use AI tools (ChatGPT, Claude, Copilot) as development aids and standard open-source libraries, but must clearly explain the tools, technologies, and resources used, and defend every line of implementation.",
        officialId: 20
      },
      {
        num: "18",
        q: "Can we use simulation instead of physical hardware?",
        a: "Yes. When orbital, planetary, or microgravity hardware implementation is impractical, a well-designed digital simulation or mathematical model can effectively demonstrate system architecture, flight logic, and mission feasibility.",
      },
      {
        num: "19",
        q: "Can our project be completely software-based?",
        a: "Yes, provided the solution addresses a meaningful space-related problem and demonstrates sufficient technical depth, functioning code, and demonstrable utility.",
      }
    ]
  },
  {
    id: "judging",
    label: "Prizes & Judging",
    desc: "Cash prize pool, internship opportunities, rubrics, and evaluation",
    faqs: [
      {
        num: "20",
        q: "What is the prize pool?",
        a: "The total cash prize pool is ₹10,000, awarded across top performing solutions.",
        officialId: 11
      },
      {
        num: "21",
        q: "Are there internship opportunities?",
        a: "Yes! Top 2 teams will receive internship opportunities through our collaboration with Aeroin Space Tech, subject to the applicable selection process.",
        officialId: 12
      },
      {
        num: "22",
        q: "Will participants receive certificates?",
        a: "Yes. Official certificates will be provided to participating teams and participants according to the event guidelines.",
        officialId: 13
      },
      {
        num: "23",
        q: "How will projects be evaluated?",
        a: "Projects are evaluated based on factors such as: Problem understanding, Innovation & originality, Technical implementation, Functionality and demonstration, Practicality and feasibility, and Presentation and communication.",
        officialId: 21
      },
      {
        num: "24",
        q: "Will there be a final presentation?",
        a: "Yes. Shortlisted/final teams will present and demonstrate their working solutions and pitch deck before the jury panel.",
        officialId: 22
      },
      {
        num: "25",
        q: "What happens if our prototype fails during the live demo?",
        a: "Stay calm! Explain the intended architecture, demonstrate whichever functional modules are operational, and clearly communicate what failed and how you would troubleshoot it. Engineering methodology is valued by judges.",
      }
    ]
  },
  {
    id: "ip",
    label: "Originality & IP",
    desc: "Intellectual property ownership, open licenses, and startups",
    faqs: [
      {
        num: "26",
        q: "Who owns our project and intellectual property?",
        a: "100% of all intellectual property, flight code, algorithms, and designs remain exclusively with the participating students. Neither SEDS REC nor Rajalakshmi Engineering College claims any ownership over your creations.",
      },
      {
        num: "27",
        q: "What happens if we use third-party code or datasets?",
        a: "You may use permitted open-source components and public datasets (NASA, ISRO, ESA), but you must respect their licenses and provide proper attribution. Plagiarism of another team's work results in immediate disqualification.",
      },
      {
        num: "28",
        q: "Can we turn our hackathon project into a startup?",
        a: "Yes! SEDHACKS '26 is designed to serve as a launchpad for student deep-tech space startups. Teams retain full freedom to commercialize, publish, or patent their solutions.",
      }
    ]
  },
  {
    id: "during",
    label: "During The Sprint",
    desc: "What to bring, mentor checkpoints, and sprint guidelines",
    faqs: [
      {
        num: "29",
        q: "What should I bring to the hackathon?",
        a: "Participants should bring the equipment and materials required for their project (laptops, chargers, college student IDs, development boards like Arduino/ESP32/Raspberry Pi, sensors, cables), subject to venue safety guidelines.",
        officialId: 19
      },
      {
        num: "30",
        q: "Will mentors be available during the hackathon?",
        a: "Yes! SEDS REC technical mentors and aerospace industry mentors will be available throughout the sprint to help validate concepts, troubleshoot hardware/software bugs, and sharpen your pitch.",
      },
      {
        num: "31",
        q: "Can we refine our idea after registration?",
        a: "Yes. Minor refinements and technical pivoting are permitted during the early phases of the hackathon as you consult with mentors and build your proof-of-concept.",
      }
    ]
  },
  {
    id: "contact",
    label: "Queries & Contact",
    desc: "Official organizing contacts and coordinator details",
    faqs: [
      {
        num: "32",
        q: "Whom can I contact for more information?",
        a: "For queries regarding SEDHACKS ’26, contact SEDS REC Student Coordinator: Sruthi Nisha.J.S at +91 98844 64389 (sruthinishajanardhanansunil.2024.ece@rajalakshmi.edu.in) at Rajalakshmi Engineering College, Chennai.",
        officialId: 23
      }
    ]
  }
];

// Flattened array of all FAQs for search and indexing
export const ALL_FAQS = FAQ_CATEGORIES.flatMap(cat =>
  cat.faqs.map(faq => ({
    ...faq,
    categoryId: cat.id,
    categoryLabel: cat.label,
  }))
);
