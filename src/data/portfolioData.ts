import { Project, Publication, Experience, Education, Skill } from '../types';

// TODO: photo/photo2 point at files that don't exist yet. Drop images into
// public/ and update these paths.
export const personalInfo = {
  name: "Shivam Chopra",
  title: "Senior Medical Device Engineer | Robotics PhD",
  tagline: "Robotics, wearable hardware, and automation: building physical systems that sense, adapt, and hold up under real-world constraints.",
  photo: "/shivam.jpg",
  photo2: "",
  email: "shivamchopraphd@gmail.com",
  linkedin: "https://www.linkedin.com/in/choprashivam",
  github: "https://github.com/schopra17",
  scholar: "https://scholar.google.com/citations?hl=en&authuser=2&user=Aa5wayYAAAAJ",
  location: "Boston, MA",
  resumeUrl: "/ShivamChopraResume.pdf",
};

// TODO: exact graduation dates / GPA weren't listed on the old site. Fill in
// if you want them shown (graduationDate is required by the Education type;
// leave as "" if you'd rather not show a date).
export const education: Education[] = [
  {
    id: "edu1",
    degree: "PhD, Mechanical Engineering (Robotics)",
    institution: "UC San Diego (Gravish Lab)",
    location: "San Diego, CA",
    graduationDate: "",
    courses: [
      "Robotics & Biologically Inspired Design",
      "Soft & Underactuated Robotics",
      "Granular Media Mechanics",
      "Mechanism Design",
      "Controls",
    ],
  },
  {
    id: "edu2",
    degree: "BE, Mechanical Engineering",
    institution: "",
    location: "India",
    graduationDate: "",
  },
];

// TODO: exact start/end dates weren't listed on the old site. Fill in.
export const experience: Experience[] = [
  {
    id: "exp1",
    title: "Senior Medical Device Engineer | Subsystem Technical Lead (Electro-Mechanical Hardware)",
    company: "Dexcom",
    location: "Boston, MA",
    startDate: "",
    endDate: "Present",
    responsibilities: [
      "Lead subsystem architecture and validation for a next-generation wearable platform, delivering build-ready hardware and enabling system integration across mechanical, firmware, electronics, and manufacturing teams.",
      "Define electromechanical subsystem architecture and drive cross-functional system tradeoffs (mechanical / electrical / firmware).",
      "Own test and validation strategy along with build readiness; lead test method development.",
      "Bring a robotics background in underactuated systems, sensing, and robot/environment interaction to hardware that must function reliably in unpredictable real-world conditions.",
    ],
  },
  {
    id: "exp2",
    title: "Graduate Researcher",
    company: "Gravish Lab, UC San Diego",
    location: "San Diego, CA",
    startDate: "",
    endDate: "",
    responsibilities: [
      "Designed, built, and tested bio-inspired robotic systems (soft, underactuated, and micro-robotic) operating in granular and fluid environments.",
      "Published in IEEE Robotics and Automation Letters, Advanced Intelligent Systems, and Smart Materials and Structures; work covered by UCSD Today, New Atlas, Interesting Engineering, The Robot Report, Earth.com, IOT World Today, and Tech Times.",
      "Built dedicated test platforms, including fluidized granular beds, high-speed imaging, and force/impact sensing, to quantitatively characterize robot/environment interaction.",
    ],
  },
];

export const skills: Skill[] = [
  {
    category: "Robotics & Controls",
    items: ["ROS / ROS2", "Physical AI", "VLA", "Sim-to-Real (MuJoCo)", "PID Control", "Underactuated & Compliant Mechanisms", "Soft Robotics", "Granular Jamming"],
  },
  {
    category: "Hardware & Test Systems",
    items: ["Electromechanical System Architecture", "Benchtop Test Platform Design", "Automated Test Systems (LabVIEW/MATLAB/Python)", "Real-Time Data Acquisition & Diagnostics", "Piezoelectric Actuators", "Embedded Strain Sensing", "SCM Fabrication", "Laser Micromachining"],
  },
  {
    category: "Validation & Reliability",
    items: ["Verification & Validation (V&V)", "Risk-Based Test Strategy", "DOE / ANOVA", "Reliability Engineering", "Clinical & Bench Study Design", "Failure Mode Analysis"],
  },
  {
    category: "Leadership & Program",
    items: ["Cross-Functional Technical Leadership", "Subsystem Architecture Ownership", "Build Readiness", "Manufacturing Process Transfer", "Technician Training"],
  },
];

export const projects: Project[] = [
  {
    id: "proj1",
    title: "Underactuated Appendage Robot for Swimming & Sensing in Granular Environments",
    category: "Robotics",
    status: "complete",
    description: "Untethered robot that swims and senses obstacles beneath sand using compliant, underactuated appendages: the fastest untethered digging/sensing robot at the time, and covered by New Atlas, IEEE-adjacent press, and more.",
    fullDescription: "Designed compliant, underactuated robotic mechanisms for granular and underwater environments, building constrained assemblies and iterating through quantitative experiments. The untethered robot could swim and sense obstacles in beach sand: the fastest untethered digging-and-sensing robot at the time, and the first demonstration of a burrowing robot tested on a real beach in San Diego.",
    objectives: [
      "Design underactuated appendages that generate propulsive thrust in granular media.",
      "Add \"terrafoils\" to modulate lift and maintain subsurface depth during locomotion.",
      "Demonstrate obstacle sensing via appendage force changes while swimming under sand.",
    ],
    goals: [
      "Design underactuated appendages that generate propulsive thrust in granular media.",
      "Add \"terrafoils\" to modulate lift and maintain subsurface depth during locomotion.",
      "Demonstrate obstacle sensing via appendage force changes while swimming under sand.",
    ],
    results: [
      "Built and field-tested the first untethered robot able to swim and sense obstacles beneath beach sand: the fastest untethered digging/sensing robot at the time.",
      "Demonstrated obstacle sensing purely from appendage force changes during subsurface swimming, without dedicated sensors.",
      "Published as \"Toward Robotic Sensing and Swimming in Granular Environments using Underactuated Appendages,\" Advanced Intelligent Systems, 2023.",
    ],
    keyTakeaways: [
      "Underactuated, compliant appendage design can substitute for dedicated sensors: obstacle detection emerged from propulsion-force changes alone.",
      "The project drew press coverage from UCSD Today, New Atlas, Interesting Engineering, The Robot Report, Earth.com, IOT World Today, and Tech Times.",
    ],
    images: [],
  },
  {
    id: "proj2",
    title: "Adaptive Granular Jamming Feet for Robot Locomotion on Sand",
    category: "Robotics",
    status: "complete",
    description: "Soft robotic foot that passively reshapes on impact and actively changes stiffness via granular jamming, reducing impact deceleration, penetration depth, and pullout force on sand relative to a rigid foot.",
    fullDescription: "A soft robotic foot that passively changes shape on impact and actively changes stiffness using granular jamming to improve locomotion on sand. Measured impact acceleration, penetration depth, shear traction, and pullout force across foot states, showing substantial reductions relative to a rigid foot.",
    objectives: [
      "Design a granular-jamming foot with an airtight membrane and selectable granular fill.",
      "Study how fill material choice affects stiffness under load.",
      "Quantify locomotion-relevant performance across foot states.",
    ],
    goals: [
      "Design a granular-jamming foot with an airtight membrane and selectable granular fill.",
      "Study how fill material choice affects stiffness under load.",
      "Quantify locomotion-relevant performance across foot states.",
    ],
    results: [
      "Built a fluidized granular test bed and ran drop, shear, and pullout experiments across multiple foot-state conditions.",
      "Measured performance with accelerometry, high-speed imaging, and load-cell instrumentation.",
      "Showed substantial reductions in impact deceleration, penetration depth, and pullout force relative to a rigid foot.",
      "Published as \"Granular Jamming Feet Enable Improved Foot-Ground Interactions for Robot Mobility on Deformable Ground,\" IEEE Robotics and Automation Letters, 2020.",
    ],
    keyTakeaways: [
      "Combining passive shape change with active stiffness control (jamming) outperforms either mechanism alone on deformable ground.",
      "A dedicated fluidized-bed test platform was necessary to get repeatable granular-terrain measurements.",
    ],
    images: [],
  },
  {
    id: "proj3",
    title: "Anisotropic Friction-Enabled Soft Digging Robot",
    category: "Robotics",
    status: "complete",
    description: "Pneumatically actuated, worm-inspired soft robot that digs through granular media using reciprocal elongation/contraction and anisotropic friction features.",
    fullDescription: "A pneumatically actuated, worm-inspired soft robot uses reciprocal elongation/contraction and anisotropic friction features (setae-inspired elements + terrafoils) to dig through granular material. Four air-powered longitudinal muscles demonstrate forward digging under granular media and controlled steering on the surface.",
    objectives: [
      "Design a worm-inspired robot architecture using longitudinal pneumatic muscles and directional friction features.",
      "Study terrafoil angle (lift vs. drag) and setae-angle (anisotropic friction) tradeoffs via controlled experiments.",
      "Demonstrate forward digging and steering through chamber actuation sequences.",
    ],
    goals: [
      "Design a worm-inspired robot architecture using longitudinal pneumatic muscles and directional friction features.",
      "Study terrafoil angle (lift vs. drag) and setae-angle (anisotropic friction) tradeoffs via controlled experiments.",
      "Demonstrate forward digging and steering through chamber actuation sequences.",
    ],
    results: [
      "Built a four-air-muscle worm-inspired robot generating net forward motion through granular media.",
      "Demonstrated controlled forward digging and turning on the surface via actuation-sequence timing.",
      "Published as \"Anisotropic forces for a worm-inspired digging robot,\" IEEE RoboSoft, 2022.",
    ],
    keyTakeaways: [
      "Directional friction features (anisotropic setae) plus terrafoils let a single pneumatic architecture both dig and steer.",
      "Extends the appendage- and jamming-based granular-locomotion work to a worm-like body plan.",
    ],
    images: [],
  },
  {
    id: "proj4",
    title: "RoboBee-Scale Microrobot with Closed-Loop Strain-Based Actuation",
    category: "Robotics",
    status: "complete",
    description: "Lab-built, Harvard RoboBee-scale flapping-wing microrobot with an integrated piezoelectric strain sensor and a LabVIEW PD controller for closed-loop, strain-based wing actuation.",
    fullDescription: "Built a RoboBee-sized flapping-wing robot in-house using Smart Composite Microstructure (SCM) fabrication: piezoelectric actuators, wings, transmission, and body chassis all laser-cut to 10-micron precision. Integrated strain-based sensing actuators onto the robot and closed the loop with a PD controller developed in LabVIEW.",
    objectives: [
      "Fabricate a RoboBee-scale flapping-wing microrobot entirely in-house via SCM laser-cutting and lamination.",
      "Integrate strain-based sensing directly onto the piezoelectric actuator.",
      "Close the loop with a PD controller for strain-based wing actuation.",
    ],
    goals: [
      "Fabricate a RoboBee-scale flapping-wing microrobot entirely in-house via SCM laser-cutting and lamination.",
      "Integrate strain-based sensing directly onto the piezoelectric actuator.",
      "Close the loop with a PD controller for strain-based wing actuation.",
    ],
    results: [
      "Fabricated the full robot (actuators, wings, transmission, and chassis) to 10-micron precision with a UV laser cutter.",
      "Implemented a LabVIEW PD controller for real-time, strain-based feedback control of wing actuation.",
      "Captured high-speed video validating sensing of fluid-surface contact during flight.",
    ],
    keyTakeaways: [
      "On-board strain sensing enables closed-loop control without adding separate sensor hardware to a milligram-scale robot.",
      "SCM fabrication (laser micromachining + lamination) is precise enough to build every structural layer of a RoboBee-scale robot in-house.",
    ],
    images: [],
  },
  {
    id: "proj5",
    title: "Embedded Sensing for Micro-Robotic Applications",
    category: "Robotics",
    status: "complete",
    description: "Piezoelectric bending actuator with an integrated strain-sensing region, fabricated via Smart Composite Microstructures (SCM), enabling on-board detection of wing collisions and degradation in micro-robotic flight.",
    fullDescription: "Invented a piezoelectric bending actuator with integrated strain-sensing regions fabricated using Smart Composite Microstructure (SCM) processes. The sensing regions measure actuator deflection via the piezoelectric effect, showing a linear relationship between sensor output and displacement over a wide range of voltages/frequencies, and demonstrating detection of wing collisions and wing degradation in micro-robotic flight contexts.",
    objectives: [
      "Design an actuator architecture with electrically isolated sensing strips mechanically coupled to the actuation layer.",
      "Fabricate the design via SCM (laser micromachining + lamination) and build a repeatable displacement-sensing test setup.",
      "Demonstrate sensing utility through wing-collision and wing-degradation experiments.",
    ],
    goals: [
      "Design an actuator architecture with electrically isolated sensing strips mechanically coupled to the actuation layer.",
      "Fabricate the design via SCM (laser micromachining + lamination) and build a repeatable displacement-sensing test setup.",
      "Demonstrate sensing utility through wing-collision and wing-degradation experiments.",
    ],
    results: [
      "Validated a linear relationship between sensor output and displacement across a wide range of voltages and frequencies.",
      "Demonstrated detection of wing collisions and wing degradation in micro-robotic flight contexts.",
      "Published as \"Piezoelectric actuators with on-board sensing for micro-robotic applications,\" Smart Materials and Structures, 2019.",
    ],
    keyTakeaways: [
      "Geometric decoupling (gap + layer design) is what let the sensing region measure deflection without interfering with actuation.",
      "On-board sensing can double as basic health monitoring for micro-robotic wings, detecting both collision and degradation from the same actuator.",
    ],
    images: [],
  },
  {
    id: "proj6",
    title: "Soft Appendage Propulsion via Asymmetry & Compliance",
    category: "Robotics",
    status: "complete",
    description: "Study of how input-torque amplitude and appendage stiffness affect propulsion of a soft appendage in granular media, plus a proposed extension of Resistive Force Theory (RFT) to soft appendages.",
    fullDescription: "Showed how parameters such as amplitude of input torque and stiffness of the appendage affect the propulsion of a model soft appendage in granular media. A hybrid (soft + stiff) appendage was designed for this study, and a modification to Resistive Force Theory (RFT) was proposed to enable its application to soft appendages.",
    objectives: [
      "Design a hybrid (soft + stiff) appendage to study asymmetry and compliance effects on granular propulsion.",
      "Characterize how input torque amplitude and appendage stiffness affect thrust generation.",
      "Extend Resistive Force Theory (RFT) to apply to soft, compliant appendages.",
    ],
    goals: [
      "Design a hybrid (soft + stiff) appendage to study asymmetry and compliance effects on granular propulsion.",
      "Characterize how input torque amplitude and appendage stiffness affect thrust generation.",
      "Extend Resistive Force Theory (RFT) to apply to soft, compliant appendages.",
    ],
    results: [
      "Showed mechanical and actuation asymmetry in soft appendages drives net robotic propulsion in granular media.",
      "Proposed and validated a modification to RFT enabling its use for soft appendage modeling.",
      "Published in Adaptive Motion in Animals and Machines, 2021 (paper + poster).",
    ],
    keyTakeaways: [
      "Asymmetry, not just stiffness, is a first-order driver of thrust generation for soft appendages in granular media.",
      "Classical RFT, developed for rigid limbs, needed a targeted modification to remain predictive for compliant appendages.",
    ],
    images: [],
  },
  {
    id: "proj7",
    title: "Phase-Change Actuated Soft Digging Robot",
    category: "Robotics",
    status: "complete",
    description: "Self-contained, phase-change-actuated digging robot powered by a low-boiling-point liquid coolant, inspired by digging turtles, mole crickets, and moles.",
    fullDescription: "For this study, digging robots were designed with appendage-enabled digging inspired by digging in turtles, mole crickets, and moles. An actuation technique was presented where the digging robot was powered by a self-contained phase-change actuation system using two appendages, using a liquid coolant as the low-boiling-point fluid (~37°C). The design has a small form factor compared to bulky electromechanical systems.",
    objectives: [
      "Design appendage-based digging actuation inspired by biological diggers (turtles, mole crickets, moles).",
      "Develop a self-contained phase-change actuation system as an alternative to bulky electromechanical drivetrains.",
      "Demonstrate digging using two phase-change-actuated appendages.",
    ],
    goals: [
      "Design appendage-based digging actuation inspired by biological diggers (turtles, mole crickets, moles).",
      "Develop a self-contained phase-change actuation system as an alternative to bulky electromechanical drivetrains.",
      "Demonstrate digging using two phase-change-actuated appendages.",
    ],
    results: [
      "Built a self-contained digging actuator powered by phase change in a low-boiling-point liquid coolant (~37°C).",
      "Achieved a small form factor relative to comparable electromechanical digging systems.",
      "Presented as a poster on phase-change actuation for soft digging robots.",
    ],
    keyTakeaways: [
      "Phase-change actuation can replace bulky motors and gearing for simple, repetitive digging motions.",
      "A near-body-temperature (~37°C) working fluid keeps the actuation system compact and self-contained.",
    ],
    images: [],
  },
  {
    id: "proj8",
    title: "Electromechanical Subsystem Technical Lead: Next-Gen Architecture",
    category: "Wearable Hardware",
    status: "in-progress",
    description: "Leading system-level development of a critical electromechanical sensor-connect subsystem for a new wearable electronics architecture, from architecture definition through build readiness, validation planning, and cross-functional execution.",
    fullDescription: "Description generalized to protect confidential product details (Dexcom). As Subsystem Technical Lead, led system-level development of a critical electromechanical sensor-connect subsystem for a new electronics architecture, spanning architecture definition, build readiness, validation planning, and cross-functional execution.",
    objectives: [
      "Own electromechanical interface execution and integration readiness.",
      "Stabilize and transfer a sensitive manufacturing process to enable scalable builds.",
      "Coordinate firmware integration under cybersecurity/data constraints for end-to-end demonstrations.",
    ],
    goals: [
      "Own electromechanical interface execution and integration readiness.",
      "Stabilize and transfer a sensitive manufacturing process to enable scalable builds.",
      "Coordinate firmware integration under cybersecurity/data constraints for end-to-end demonstrations.",
    ],
    results: [
      "Delivered build-ready subsystem architecture and enabled system integration across mechanical, firmware, electronics, and manufacturing teams.",
      "Stabilized and transferred a sensitive manufacturing process to a scalable build state.",
      "Coordinated cross-functional firmware integration for end-to-end demonstrations under cybersecurity/data constraints.",
    ],
    keyTakeaways: [
      "System-level ownership of an electromechanical interface means coordinating mechanical, firmware, electronics, and manufacturing simultaneously, not sequentially.",
      "Process stabilization and transfer is as critical to build readiness as the design itself.",
    ],
    images: [],
  },
  {
    id: "proj9",
    title: "Risk-Based Test Platforms & Automated Validation Systems",
    category: "Wearable Hardware",
    status: "complete",
    description: "System-level automated test architectures (HW + SW + UI) and real-time data acquisition/diagnostic pipelines supporting feasibility through V&V and clinical readiness.",
    fullDescription: "Description generalized to protect confidential product details (Dexcom). Led system-level test strategy by translating requirements and failure modes into targeted test methods and decision-ready evidence for stakeholders on a high-priority program. Built system-level automated test architectures and real-time data acquisition/diagnostic pipelines supporting feasibility through V&V and clinical readiness, including automated benchtop test systems and tooling.",
    objectives: [
      "Translate requirements and failure modes into targeted, risk-based test methods.",
      "Build system-level automated test architectures and diagnostic pipelines spanning feasibility through V&V and clinical readiness.",
      "Design benchtop electromechanical test systems enabling repeatable experimentation.",
    ],
    goals: [
      "Translate requirements and failure modes into targeted, risk-based test methods.",
      "Build system-level automated test architectures and diagnostic pipelines spanning feasibility through V&V and clinical readiness.",
      "Design benchtop electromechanical test systems enabling repeatable experimentation.",
    ],
    results: [
      "Developed system-level automated test architectures (LabVIEW/MATLAB/Python) and diagnostic pipelines.",
      "Designed benchtop electromechanical systems enabling repeatable experimentation and validation.",
      "Led mechanical test efforts and technician training in a structured workstream.",
    ],
    keyTakeaways: [
      "Risk-based test method development turns ambiguous failure modes into decision-ready evidence for stakeholders faster than exhaustive testing.",
      "Automated diagnostic pipelines pay off across the full feasibility-through-clinical-readiness timeline, not just one phase.",
    ],
    images: [],
  },
  {
    id: "proj10",
    title: "Wear Duration Extension: 10 → 15 Days (Reliability Program)",
    category: "Wearable Hardware",
    status: "complete",
    description: "Led cross-functional bench, preclinical, and clinical test execution to extend wearable patch wear duration from 10 to 15 days through data-driven reliability characterization.",
    fullDescription: "Description generalized to protect confidential product details (Dexcom). Led cross-functional test execution across bench, preclinical, and clinical studies to support extension of wearable patch wear duration from 10 to 15 days through data-driven reliability characterization.",
    objectives: [
      "Characterize patch reliability on bench and in human studies.",
      "Design and drive clinical studies for patch reliability and safety evaluation.",
      "De-risk the 15-day patch to enable progression to product development.",
    ],
    goals: [
      "Characterize patch reliability on bench and in human studies.",
      "Design and drive clinical studies for patch reliability and safety evaluation.",
      "De-risk the 15-day patch to enable progression to product development.",
    ],
    results: [
      "Led test leadership evaluating the patch both on bench and on human subjects.",
      "De-risked the 15-day patch, clearing the path to product development.",
      "The selected patch became one of the top technologies enabling the product's 15-day wear period.",
    ],
    keyTakeaways: [
      "Extending wear duration is a reliability problem as much as a design problem; it took bench, preclinical, and clinical evidence together.",
      "De-risking early is what let the 15-day patch move into product development.",
    ],
    images: [],
  },
  {
    id: "proj11",
    title: "Pupper v3: Boston Robot Hackers Club",
    category: "Current Platforms",
    status: "in-progress",
    description: "Modifying the Stanford Pupper v3 quadruped with a 5-person hobby team to learn physical-AI skills and build an outreach platform for high schoolers.",
    fullDescription: "Making modifications to the Stanford Pupper v3 quadruped. The goal is to learn physical-AI skills and deploy them on Pupper so it can be used as an outreach and learning project for high schoolers. The team (5 people, part of the Boston Robot Hackers Club) meets weekly to update and upgrade the robot, building on the open-source repo from the Stanford team (github.com/Nate711/pupperv3-monorepo).",
    objectives: [
      "Learn and apply physical-AI / VLA / sim-to-real skills on a real quadruped platform.",
      "Get Pupper running in simulation (MuJoCo) and on real hardware.",
      "Build toward an outreach program teaching robotics and AI to Boston-area high schoolers.",
    ],
    goals: [
      "Learn and apply physical-AI / VLA / sim-to-real skills on a real quadruped platform.",
      "Get Pupper running in simulation (MuJoCo) and on real hardware.",
      "Build toward an outreach program teaching robotics and AI to Boston-area high schoolers.",
    ],
    results: [
      "Ran the simulated Pupper in the MuJoCo environment.",
      "Ran basic PID control on Pupper's legs in the real world using the ROS2 framework.",
    ],
    keyTakeaways: [
      "Weekly hands-on iteration with a small team is an effective way to build physical-AI skills outside of work.",
      "Project is ongoing; more detail will be added as it grows.",
    ],
    skills: ["ROS2", "Physical AI", "VLA", "Sim-to-Real (MuJoCo)"],
    images: [],
  },
  {
    id: "proj12",
    title: "Seeed Studio reBOT Arm",
    category: "Current Platforms",
    status: "in-progress",
    description: "Hands-on with the Seeed Studio reBOT Arm B601 RS (48V QDD motors, 2.5kg payload), the platform used at the Revolute physical-AI hackathon.",
    fullDescription: "Exploring the Seeed Studio reBOT Arm B601 RS as a platform for physical-AI experimentation: leader-arm teleoperation and imitation learning, paired with a reComputer Jetson Orin Nano for on-edge inference. First used while co-organizing the Revolute hackathon in Cambridge, MA.",
    objectives: [
      "Get comfortable with the reBOT Arm hardware and software stack (QDD motors, leader-arm teleoperation).",
      "Run imitation-learning workflows using the leader arm for data collection.",
      "Use the reComputer Jetson Orin Nano for on-edge inference.",
    ],
    goals: [
      "Get comfortable with the reBOT Arm hardware and software stack (QDD motors, leader-arm teleoperation).",
      "Run imitation-learning workflows using the leader arm for data collection.",
      "Use the reComputer Jetson Orin Nano for on-edge inference.",
    ],
    results: [
      "Used the platform while co-organizing and running the Revolute hackathon in Cambridge, MA.",
    ],
    keyTakeaways: [
      "Project is ongoing; more detail will be added as it grows.",
    ],
    skills: ["Teleoperation", "Imitation Learning", "Jetson Orin Nano"],
    images: [],
  },
];

export const publications: Publication[] = [
  {
    id: "pub1",
    title: "Piezoelectric actuators with on-board sensing for micro-robotic applications",
    authors: ["Shivam Chopra", "Nick Gravish"],
    venue: "Smart Materials and Structures, 28(11), p. 115036",
    year: "2019",
    abstract: "Presents a piezoelectric bending actuator with integrated strain-sensing regions fabricated using Smart Composite Microstructure (SCM) processes. The sensing regions measure actuator deflection via the piezoelectric effect, showing a linear relationship between sensor output and displacement over a wide range of voltages and frequencies, and demonstrating detection of wing collisions and wing degradation in micro-robotic flight contexts.",
    pdfUrl: "https://drive.google.com/file/d/1GompEzu_nUzuR9zlYvhs5QhTDiKg8kS8/view?usp=sharing",
    externalUrl: "https://doi.org/10.1088/1361-665X/ab43fe",
  },
  {
    id: "pub2",
    title: "Granular Jamming Feet Enable Improved Foot-Ground Interactions for Robot Mobility on Deformable Ground",
    authors: ["Shivam Chopra", "Michael T. Tolley", "Nick Gravish"],
    venue: "IEEE Robotics and Automation Letters, 5(3), pp. 3975 to 3981",
    year: "2020",
    abstract: "A soft robotic foot passively changes shape on impact and actively changes stiffness using granular jamming to improve locomotion on sand. Measures impact acceleration, penetration depth, shear traction, and pullout force across foot states, showing substantial reductions relative to a rigid foot.",
    pdfUrl: "http://gravishlab.ucsd.edu/PDF/09043501.pdf",
    externalUrl: "https://doi.org/10.1109/LRA.2020.2982361",
  },
  {
    id: "pub3",
    title: "Toward Robotic Sensing and Swimming in Granular Environments using Underactuated Appendages",
    authors: ["Shivam Chopra", "Daniel Vasile", "Siddharth Jadhav", "Michael T. Tolley", "Nick Gravish"],
    venue: "Advanced Intelligent Systems",
    year: "2023",
    abstract: "An untethered robot with compliant, underactuated appendages that swims and senses obstacles in granular media (beach sand): the fastest untethered digging-and-sensing robot at the time, and the first demonstration of a burrowing robot tested on a real beach.",
  },
  {
    id: "pub4",
    title: "Anisotropic forces for a worm-inspired digging robot",
    authors: ["Dean Drotman", "Shivam Chopra", "Nick Gravish", "Michael T. Tolley"],
    venue: "2022 IEEE 5th International Conference on Soft Robotics (RoboSoft), pp. 261 to 266",
    year: "2022",
    abstract: "A pneumatically actuated, worm-inspired soft robot uses reciprocal elongation/contraction and anisotropic friction features (setae-inspired elements and terrafoils) to dig through granular material, demonstrating forward digging and controlled steering.",
  },
  {
    id: "pub5",
    title: "Terrain-Structure Interaction: A Multi-Physics Simulation Framework for Studying the Response of Soft-Body Interaction with Granular Media",
    authors: ["Siddharth Jadhav", "Shivam Chopra", "Nick Gravish", "Michael T. Tolley"],
    venue: "In Preparation",
    year: "",
    abstract: "A multi-physics simulation framework for studying how soft robotic bodies interact with granular media.",
  },
  {
    id: "pub6",
    title: "Stiffness modulation of a soft robotic foot for foot-ground interaction control",
    authors: ["Shivam Chopra", "Emily Lathrop", "Siddharth Jadhav", "Michael T. Tolley", "Nick Gravish"],
    venue: "ASME IDETC 2019 (Conference Presentation)",
    year: "2019",
    abstract: "Early presentation of stiffness-modulated soft robotic foot design for controlling foot-ground interaction, precursor to the granular jamming foot published in IEEE RA-L.",
  },
  {
    id: "pub7",
    title: "Parapodia inspired soft appendages enable robot propulsion in granular media",
    authors: ["Shivam Chopra", "Siddharth Jadhav", "Michael T. Tolley", "Nick Gravish"],
    venue: "Robophysics: Robotics Meets Physics IV, APS March Meeting 2021 (Conference Presentation)",
    year: "2021",
    abstract: "Presentation on parapodia-inspired soft appendages for robot propulsion through granular media.",
    externalUrl: "https://meetings.aps.org/Meeting/MAR21/Session/S14.10",
  },
  {
    id: "pub8",
    title: "Mechanical and actuation asymmetry in soft appendages leads to robotic propulsion in granular media",
    authors: ["Shivam Chopra", "Siddharth Jadhav", "Michael T. Tolley", "Nick Gravish"],
    venue: "Adaptive Motion in Animals and Machines (Conference Presentation)",
    year: "2021",
    abstract: "Shows how input-torque amplitude and appendage stiffness affect propulsion of a model soft appendage in granular media, using a hybrid soft/stiff appendage and a proposed extension of Resistive Force Theory (RFT) to soft appendages.",
    pdfUrl: "http://gravishlab.ucsd.edu/PDF/amam/AMAM_swimming_in_sand.pdf",
  },
];

// TODO: no personal photos migrated yet. Add images and captions here to
// populate the Gallery's "general" tab.
export const galleryImages: { src: string; caption: string }[] = [];
