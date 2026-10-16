export const profile = {
  name: "Christopher Seay",
  role: "Senior Full Stack Engineer",
  place: "LaFayette, Georgia",
  coords: "34.704° N  ·  85.281° W",
  email: "christopherseay32@gmail.com",
  phone: "(224) 432-0846",
  phoneHref: "tel:+12244320846",
  linkedin: "https://www.linkedin.com/in/christopher-seay-5ab146427/",
  github: "https://github.com/christophers032",
  cv: "/Christopher_Seay_Resume.pdf",
  intro:
    "I’m a polyglot full-stack engineer, working across React, Go, Python, Node.js, .NET, and Spring Boot, with a current focus on AI/ML integration and data engineering. I build pipelines and ML-powered features that work in production, not just in a notebook, and I own the work end to end, from schema to UI to the CI/CD that ships it. Azure and AWS are where I live day to day.",
  summary:
    "I work across the stack, from React front ends to Golang microservices, with deep roots in Python, Node.js, C#/.NET, and Spring Boot. The problem dictates the tool. Lately that means AI/ML integration and data engineering — pipelines that turn raw geospatial and market data into something a model, or a human, can actually use.",
};

export const nav = [
  { id: "intro", label: "Home", key: "1" },
  { id: "craft", label: "Services", key: "2" },
  { id: "about", label: "About", key: "3" },
  { id: "work", label: "Portfolio", key: "4" },
  { id: "experience", label: "Experience", key: "5" },
  { id: "contact", label: "Contact", key: "6" },
];

export const orbitSkills = [
  { label: "React", x: 6, y: 14, delay: "0s", tone: "mint", blurb: "Interfaces that make spatial data readable." },
  { label: "Python", x: 78, y: 8, delay: "0.4s", tone: "gold", blurb: "Pipelines, models, and the glue between them." },
  { label: "PostGIS", x: 84, y: 42, delay: "0.8s", tone: "sky", blurb: "Where the map becomes a database." },
  { label: "Golang", x: 2, y: 48, delay: "1.1s", tone: "violet", blurb: "Services that stay boring under load." },
  { label: ".NET", x: 42, y: 4, delay: "0.9s", tone: "gold", blurb: "Platform work when the domain is enterprise." },
  { label: "Azure", x: 70, y: 72, delay: "0.2s", tone: "sky", blurb: "Cloud as a daily habitat, not a slide." },
  { label: "OpenLayers", x: 12, y: 76, delay: "1.6s", tone: "mint", blurb: "Maps that are products, not decoration." },
  { label: "AI / ML", x: 48, y: 82, delay: "1.3s", tone: "violet", blurb: "Features that survive outside the notebook." },
];

export const ticker = [
  "React",
  "Python",
  "Node.js",
  "C# / .NET",
  "Golang",
  "Spring Boot",
  "OpenLayers",
  "PostGIS",
  "Databricks",
  "Spark",
  "dbt",
  "Azure",
  "AWS",
  "GDAL",
  "DuckDB",
];

export const services = [
  {
    icon: "code",
    title: "Full-Stack Application Modernization",
    copy: "Migrate legacy ASP.NET, PHP, or monolithic systems to modern React + .NET Core or Vue + Node.js stacks with cloud deployment, CI/CD, and responsive UIs.",
  },
  {
    icon: "layout",
    title: "AI Agent & Workflow Automation",
    copy: "Build intelligent assistants that deliver real-time guidance, next-best-action suggestions, and automated task execution—like digital paperwork or knowledge retrieval, during live user interactions using Python, LLM APIs, and event-driven backends.",
  },
  {
    icon: "cloud",
    title: "Cloud-Native Architecture (Azure Focus)",
    copy: "Establish GitHub Actions or Azure DevOps pipelines, containerize apps with Docker, and integrate automated testing to enable rapid, reliable releases for mid-size engineering teams.",
  },
  {
    icon: "tools",
    title: "DevOps & CI/CD Enablement",
    copy: "I help you position your brand correctly, boosting positive results through best practices in digital marketing.",
  },
  {
    icon: "asterisk",
    title: "Healthcare IT Systems Integration",
    copy: "Develop HIPAA-compliant patient portals, scheduling tools, or data exchange platforms with FHIR/HL7 integrations, audit logging, and role-based access for regional health systems.",
  },
  {
    icon: "bot",
    title: "AI-Powered Operational Intelligence",
    copy: "Enhance logistics or field operations with lightweight ML models that predict ETAs, detect anomalies in shipment data, or auto-triage incidents—using GPS, EDI, or IoT telemetry processed in Python or .NET.",
  },
  {
    icon: "database",
    title: "Data Engineering & Pipelines",
    copy: "Design and run ingest-to-insight pipelines on Databricks, Spark, dbt, and DuckDB, with geospatial layers in PostGIS and GeoParquet, so raw sources become clean, versioned data that a model or a dashboard can trust.",
  },
  {
    icon: "shield",
    title: "Legacy-to-Cloud Migration Strategy",
    copy: "Assess on-prem or outdated systems and deliver a phased, low-risk roadmap to cloud (Azure/AWS), preserving data integrity while reducing cost and technical debt.",
  },
];
export const figures = [
  { n: 9, sign: "+", label: "9+ years of experience in the technology market" },
  { n: 50, sign: "+", label: "More than 50 successful projects delivered" },
  { n: 90, sign: "%", label: "90% of our clients return for new projects" },
  { n: 20, sign: "+", label: "Over 20 satisfied clients in various sectors" },
];

export const stats = [
  { n: 250, suffix: "+", label: "geospatial sources ingested" },
  { n: 120, suffix: "+", label: "UI components in the system" },
  { n: 75, suffix: "%", label: "faster design-to-dev handoff" },
  { n: 50, suffix: "%", label: "faster mapping time-to-result" },
];

export const principles = [
  {
    title: "Polyglot by necessity",
    copy: "The right language for the job — not the comfortable one.",
  },
  {
    title: "End-to-end ownership",
    copy: "Schema to UI polish to the pipeline that deploys it.",
  },
  {
    title: "AI-forward, production-true",
    copy: "Practical ML that ships, not slides.",
  },
  {
    title: "Cloud as a daily habitat",
    copy: "Azure and AWS are where the work actually lives.",
  },
];

export const filters = ["All", "AI", "Backend", "Full Stack", "Data Engineering", "Automation", "DevOps", "Cloud", "AWS", "API Integration", "Web", "Healthcare", "NLP", "Search"];

export const works = [
  {
    id: "convoso",
    code: "01",
    kind: "AI · Contact center",
    filter: "AI",
    cats: ["AI", "Backend", "Full Stack"],
    title: "Convoso Voice AI Agent",
    org: "Convoso",
    years: "2022 — 2026",
    lead: "Contributed to an AI-powered contact center solution that automates outbound conversations, qualifies leads in real time, and supports handoffs to sales teams.",
    points: [
      "AI-powered contact center solution that automates outbound conversations.",
      "Qualifies leads in real time during the call.",
      "Supports handoffs to sales teams.",
    ],
    tags: ["Python", "React", "AWS", "Node.js"],
    accent: "gold",
    image: "/projects/convoso-voice-ai.png",
    live: "https://www.convoso.com/voice-ai-agent/",
  },
  {
    id: "convoso-platform",
    code: "02",
    kind: "Cloud · Contact center",
    filter: "Backend",
    cats: ["Backend", "DevOps", "Cloud"],
    title: "Cloud-Native Contact Center Platform",
    org: "Convoso",
    years: "2022 — 2026",
    lead: "Optimized cloud-native services and automated testing across React and .NET components to improve feature delivery speed by approximately 20%.",
    points: [
      "Optimized cloud-native services across React and .NET components.",
      "Automated testing that improved feature delivery speed by approximately 20%.",
      "Work spans AWS DevOps, serverless functions, and containerized services supporting enterprise-scale sales operations.",
    ],
    tags: ["AWS", "Docker", "React", ".NET", "Automated testing"],
    accent: "violet",
    image: "/projects/convoso-platform-architecture.png",
  },
  {
    id: "aws-etl",
    code: "03",
    kind: "Data · AWS ETL",
    filter: "Backend",
    cats: ["Data Engineering", "Backend", "AWS", "Cloud Architecture"],
    title: "Real-Time ETL & AWS Data Modernization",
    org: "",
    years: "",
    lead: "Modernized a digital lending provider’s data infrastructure by building a scalable, AWS-native ETL pipeline supporting near-real-time processing across 60+ tables. Implemented change data capture, configurable transformations, automated monitoring, and recovery workflows, achieving 80% faster pipeline execution and approximately 50% lower operational costs.",
    points: [
      "Scalable, AWS-native ETL pipeline with near-real-time processing across 60+ tables.",
      "Change data capture, configurable transformations, automated monitoring, and recovery workflows.",
      "80% faster pipeline execution and approximately 50% lower operational costs.",
    ],
    tags: ["AWS EC2", "AWS Glue", "Amazon S3", "Amazon Redshift", "AWS Lambda", "Amazon CloudWatch", "Amazon SNS", "Amazon RDS", "AWS IAM", "AWS Secrets Manager", "SQL", "JSON"],
    accent: "gold",
    image: "/projects/aws-etl.png",
  },
  {
    id: "bokadirect",
    code: "04",
    kind: "AI/ML · E-commerce search",
    filter: "AI",
    cats: ["AI/ML", "Full Stack", "Search"],
    title: "ML-Powered E-commerce Search",
    org: "Bokadirect",
    years: "2020 — 2022",
    lead: "Architected a high-performance e-commerce platform serving more than 20,000 users, including a custom ML-enhanced search engine. Implemented autocomplete, fuzzy search, and Elasticsearch filtering to improve product discovery and search relevance.",
    points: [
      "Architected a high-performance e-commerce platform serving more than 20,000 users.",
      "Built a custom ML-enhanced search engine.",
      "Implemented autocomplete, fuzzy search, and Elasticsearch filtering to improve product discovery and search relevance.",
    ],
    tags: ["React", "C#", ".NET", "Elasticsearch", "Docker", "AWS", "CI/CD"],
    accent: "sky",
    image: "/projects/bokadirect-search.png",
  },
  {
    id: "ecommerce-cicd",
    code: "05",
    kind: "DevOps · AWS pipeline",
    filter: "Backend",
    cats: ["DevOps", "AWS", "Backend"],
    title: "E-commerce Cloud Infrastructure and CI/CD",
    org: "Bokadirect",
    years: "2020 — 2022",
    lead: "Built containerized deployment workflows and automated CI/CD pipelines for an e-commerce application. Supported repeatable releases and zero-downtime deployments.",
    points: [
      "Built containerized deployment workflows for an e-commerce application.",
      "Automated CI/CD pipelines.",
      "Supported repeatable releases and zero-downtime deployments.",
    ],
    tags: ["AWS", "Docker", "CI/CD", "React", "C#", ".NET"],
    accent: "gold",
    image: "/projects/ecommerce-cicd.png",
  },
  {
    id: "headless-cms",
    code: "06",
    kind: "Backend · Headless CMS",
    filter: "Backend",
    cats: ["Backend", "API Integration", "Web"],
    title: "Headless CMS and Database Integration",
    org: "",
    years: "2020 — 2022",
    lead: "Integrated a headless CMS with React frontends and relational databases. Established content workflows and secure data access for interactive applications.",
    points: [
      "Integrated a headless CMS with React frontends and relational databases.",
      "Established content workflows.",
      "Secure data access for interactive applications.",
    ],
    tags: ["Strapi", "React", "MySQL", "SQL Server"],
    accent: "violet",
    image: "/projects/headless-cms.webp",
  },
  {
    id: "eve",
    code: "07",
    kind: "AI · Healthcare NLP",
    filter: "AI",
    cats: ["AI", "NLP", "Healthcare"],
    title: "EVE™ AI System — Automated Chart Abstraction",
    org: "Reveleer",
    years: "2018 — 2020",
    lead: "Developed and deployed NLP models to extract relevant clinical evidence from unstructured medical notes, using pattern recognition and anomaly detection to prioritize charts for review.",
    points: [
      "NLP models that extract relevant clinical evidence from unstructured medical notes.",
      "Pattern recognition and anomaly detection to prioritize charts for review.",
      "Reduced manual review time by 77%.",
      "Improved care-gap detection accuracy by 20%.",
    ],
    tags: ["Python", "NLP", "AI/ML", "Data processing"],
    accent: "mint",
    image: "/projects/eve-reveleer.png",
  },
  {
    id: "clinical-etl",
    code: "08",
    kind: "Data · ETL platform",
    filter: "Backend",
    cats: ["Data Engineering", "Backend", "Cloud Data"],
    title: "Clinical Data Processing and ETL Platform",
    org: "",
    years: "2018 — 2020",
    lead: "Architected production-grade pipelines to transform raw clinical events into structured analytical datasets for AI/ML applications. Automated hourly processing and validation to improve data quality and analytics readiness.",
    points: [
      "Architected production-grade pipelines that transform raw clinical events into structured analytical datasets for AI/ML applications.",
      "Automated hourly processing and validation.",
      "Improved data quality and analytics readiness.",
    ],
    tags: ["Python", "PySpark", "Spring Boot", "Snowflake", "SQL"],
    accent: "mint",
    image: "/projects/clinical-etl.webp",
  },
  {
    id: "clinical-intelligence",
    code: "09",
    kind: "AI · Clinical intelligence",
    filter: "AI",
    cats: ["AI/ML", "Data Engineering", "Healthcare Analytics"],
    title: "AI-Enabled Clinical Intelligence",
    org: "",
    years: "2018 — 2020",
    lead: "Supported data processing for AI-driven clinical insights by structuring medical record information for automated analysis and risk adjustment workflows. The platform helps surface potential diagnoses and supporting clinical evidence.",
    points: [
      "Structured medical record information for automated analysis and risk adjustment workflows.",
      "Supported data processing behind AI-driven clinical insights.",
      "The platform helps surface potential diagnoses and supporting clinical evidence.",
    ],
    tags: ["Python", "PySpark", "NLP", "Spring Boot", "Snowflake"],
    accent: "violet",
    image: "/projects/clinical-intelligence.png",
  },
  {
    id: "marketing-automation",
    code: "10",
    kind: "Python · Automation",
    filter: "Backend",
    cats: ["Python", "Data Engineering", "Automation"],
    title: "Marketing Data Collection Automation",
    org: "",
    years: "2017 — 2018",
    lead: "Created Python scripts to automate web scraping and aggregate campaign performance metrics. Reduced manual data collection and helped the marketing team evaluate advertising performance.",
    points: [
      "Python scripts that automate web scraping and aggregate campaign performance metrics.",
      "Reduced manual data collection.",
      "Helped the marketing team evaluate advertising performance.",
    ],
    tags: ["Python", "Web scraping", "Data processing"],
    accent: "sky",
    image: "/projects/marketing-automation.webp",
  },
  {
    id: "bantee-golf",
    code: "11",
    kind: "Full stack · Golf platform",
    filter: "Full Stack",
    cats: ["Full Stack", "Booking", "3rd-Party APIs"],
    title: "Bantee Golf Platform",
    org: "Full Stack Developer",
    years: "",
    lead: "Developed booking, activity tracking, and user engagement features for an online golf and sports platform.",
    points: [
      "Booking.",
      "Activity tracking.",
      "3rd-party API integrations.",
      "User authentication.",
    ],
    tags: ["PHP", "JavaScript", "REST APIs", "Auth"],
    accent: "mint",
    image: "/projects/bantee-golf.webp",
    live: "https://www.banteegolf.com/",
  },
  {
    id: "medical-billing",
    code: "12",
    kind: "Automation · Medical billing",
    filter: "Automation",
    cats: ["Business Process Automation"],
    title: "Medical Billing — Claims Pre-Check Portal",
    org: "",
    years: "",
    lead: "A multi-tenant web portal for a medical billing company that prepares insurance claims for its clients. Each client uploads a monthly billing sheet in whatever shape their system exports, the portal checks every row against that client’s own reference data, fixes what it can prove and flags what it can’t, and hands the account manager a file ready to submit. Two sides, one source of truth: clients answer only the questions that are theirs, account managers see everything. Owned the whole front end and the checking engine behind it.",
    points: [
      "Multi-tenant web portal that prepares insurance claims for a medical billing company's clients.",
      "Checks every uploaded row against the client's own reference data, fixes what it can prove and flags what it can't.",
      "Owned the whole front end and the checking engine behind it.",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
    accent: "violet",
    image: "/projects/medical-billing.png",
    imageBg: "#141414",
  },];

export const timeline = [
  {
    org: "Convoso · Full-time",
    short: "Convoso",
    stat: "400%",
    statLabel: "conversion growth for clients",
    role: "Senior AI Full Stack Engineer",
    when: "May 2022 — Jun 2026",
    dur: "4 yrs 2 mos",
    where: "Los Angeles Metropolitan Area · Hybrid",
    points: [
      "Enhanced Convoso’s core AI/ML dialing and automation platform leveraging Python and React, utilizing AWS DevOps to orchestrate serverless functions and containerized services that helped clients like C-Squared achieve 400% conversion growth and a 4-8X increase in call center ROI.",
      "Engineered robust Data Engineering pipelines processing millions of daily call events, integrating AI/ML models for Automatic Message Detection (AMD) and caller ID management; this enabled clients like Medigap to triple revenue, increase contact rates by 60-80%, and reduce spam-labeled DIDs by 60%.",
      "Optimized cloud-native architecture and systematic testing (Jest, React Testing Library) across React and .NET services, accelerating feature velocity by ~20% while ensuring enterprise-scale reliability for nationwide, high-volume sales teams.",
    ],
  },
  {
    org: "GRSP Tech · Full-time",
    short: "GRSP Tech",
    stat: "20,000+",
    statLabel: "users on the e-commerce platform",
    role: "Senior Full Stack DevOps Engineer",
    when: "Oct 2020 — May 2022",
    dur: "1 yr 8 mos",
    where: "Atlanta Metropolitan Area · On-site",
    points: [
      "Architected high-performance, full-stack applications using React, C#, and .NET, including a custom, ML-enhanced search engine for Bokadirect’s e-commerce platform (20,000+ users), utilizing AWS DevOps containerization (Docker) and zero-downtime CI/CD deployments.",
      "Developed high-throughput microservices in Golang and Node.js to support real-time Data Engineering processing and customizable search features (autocomplete, fuzzy search, Elasticsearch filtering), significantly improving search relevance and customer satisfaction.",
      "Integrated headless CMS (Strapi) and relational databases (MySQL, SQL Server) with React frontends, ensuring robust security and cross-platform compatibility for interactive user-facing applications, such as a real-time, shareable personality test platform for Tocca Entertainment.",
    ],
  },
  {
    org: "Reveleer · Full-time",
    short: "Reveleer",
    stat: "77%",
    statLabel: "less manual review time",
    role: "Software Engineer | Data Engineering",
    when: "Oct 2018 — Aug 2020",
    dur: "1 yr 11 mos",
    where: "Glendale, California, United States · Hybrid",
    points: [
      "Architected production-grade Data Engineering pipelines using Python, PySpark, and Spring Boot to process large-scale clinical event data, transforming raw logs into structured analytical layers for downstream AI/ML applications.",
      "Developed and deployed AI/ML NLP models (EVE™ AI system) for automated chart abstraction, implementing pattern and anomaly detection logic to filter unstructured medical notes. This reduced manual review time by 77%, improved care gap detection accuracy by 20%, and ensured strict healthcare data quality and regulatory compliance.",
      "Orchestrated end-to-end ingestion, transformation, and validation stages via automated hourly processing jobs, powering real-time analytics dashboards (Care Gap Manager) that delivered a 14% PMPY revenue increase and an 11% lift in RAF scores for multi-state health plans.",
    ],
  },
  {
    org: "Flying V Group · Contract",
    short: "Flying V Group",
    stat: "211%",
    statLabel: "increase in user conversions",
    role: "Web Developer",
    when: "Sep 2017 — Jun 2018",
    dur: "10 mos",
    where: "Newport Beach, California, United States · Hybrid",
    points: [
      "Developed responsive frontend interfaces and landing pages using React and Node.js, supporting digital marketing campaigns that helped drive a 211% increase in user conversions for the client (Pareto Labs).",
      "Wrote foundational Python scripts for basic Data Engineering tasks, such as automating simple web scraping and aggregating campaign performance metrics, helping the marketing team optimize ads and reduce client cost-per-acquisition (CPA) by 83%.",
    ],
  },
  {
    org: "University of California, Santa Cruz · Part-time",
    short: "UC Santa Cruz",
    stat: "1D",
    statLabel: "brown dwarf & hot Jupiter models",
    role: "Undergraduate Research Assistant",
    when: "Jun 2016 — May 2017",
    dur: "1 yr",
    where: "Santa Cruz, California, United States",
    points: [
      "Used Python and FORTRAN to compute 1D models of brown dwarf and hot Jupiter atmospheres and model their spectra to compare to observation.",
    ],
  },
  {
    org: "Crown College, University of California, Santa Cruz",
    short: "Crown College",
    stat: "70+",
    statLabel: "students supported",
    role: "Residential Assistant",
    when: "Aug 2015 — May 2017",
    dur: "1 yr 10 mos",
    where: "Santa Cruz, California, United States",
    points: [
      "Facilitated the social, academic, and personal adjustment of over 70 undergraduate students to the college and greater university community within a team of 20 other coworkers.",
      "Supported the student community with event planning, “front-line” support, and knowledge of inner workings of the campus.",
      "Coordinated large-scale events (like a trip to Lick Observatory east of San Jose) with coworkers, made ads from scratch that were spread around campus, and handled legal aspects (ie, waivers) of trip.",
      "Worked closely with students to help with academic, social, or personal struggles.",
    ],
  },
];
export const education = {
  school: "University of California, Santa Cruz",
  degree: "Bachelor of Science, Astrophysics",
  when: "2012 — 2017",
  activities: ["Slug Rugby", "Astronomy club", "OWL research lab", "Residential assistant"],
};

export const certs = ["SQL for Data Science", "Applied Machine Learning"];

export const certifications = [
  { name: "SQL for Data Science", issuer: "University of California, Davis", mark: "UCD", when: "Jan 2020", id: "9QFF6C2Y8GB5" },
  { name: "Applied Machine Learning", issuer: "University of Michigan", mark: "M", when: "Jan 2021", id: "CX45VSKC5EV4" },
  { name: "Deep Learning", issuer: "DeepLearning.AI", mark: "DL", when: "Jan 2021", id: "XX85S4D5R3P2" },
  { name: "Azure Fundamentals", issuer: "Microsoft", mark: "ms", when: "May 2022", id: "I263-0782" },
  { name: "Azure Data Fundamentals", issuer: "Microsoft", mark: "ms", when: "May 2022", id: "I274-9778" },
  { name: "Azure Data Scientist Associate", issuer: "Microsoft", mark: "ms", when: "May 2022", id: "I289-3884" },
  { name: "Azure AI Fundamentals", issuer: "Microsoft", mark: "ms", when: "May 2022", id: "I269-7831" },
];
export const skills = {
  Languages: ["Python", "JavaScript", "TypeScript", "C#", "Golang", "Java", "SQL", "PHP", "FORTRAN"],
  Frameworks: ["React", "Next.js", "Node.js", ".NET", "Spring Boot", "Strapi", "Jest"],
  "Data & AI": ["PySpark", "Snowflake", "PostgreSQL", "MySQL", "SQL Server", "Elasticsearch", "NLP", "AI/ML"],
  "Cloud & DevOps": ["AWS", "Azure", "AWS Lambda", "Docker", "CI/CD", "GitHub Actions", "Git"],
};

export const layers = [
  { id: "wetlands", label: "Wetlands", hue: "#7dffb3" },
  { id: "energy", label: "Energy markets", hue: "#ffb35c" },
  { id: "wind", label: "Wind / LOS", hue: "#6ec8ff" },
  { id: "grid", label: "Interconnect", hue: "#c9a0ff" },
  { id: "parcels", label: "Parcels", hue: "#f4f1ea" },
];

export const faqs = [
  {
    q: "What kinds of systems do you actually build?",
    a: "Full-stack products with a geospatial or data spine: React UIs, polyglot APIs, PostGIS / Spark pipelines, and Azure or AWS delivery. Energy siting, noise modeling, SaaS design systems, AI features in production.",
  },
  {
    q: "Do you pick one stack and stay there?",
    a: "No. Python, Node, C#/.NET, Golang, Spring Boot, React — the problem picks the tool. I have shipped all of them, often in the same company.",
  },
  {
    q: "Can you own a feature from data to UI to deploy?",
    a: "That is the default. Schema, ingest, model or map, interface, and the pipeline that promotes it. I care as much about CI/CD as the screen.",
  },
  {
    q: "Where are you based?",
    a: "LaFayette, Georgia. I have worked from Santa Cruz, Newport Beach, Glendale, Atlanta, and Los Angeles.",
  },
  {
    q: "Can I track the progress of my project?",
    a: "Yes, I maintain regular communication with clients throughout the project. I use project management tools for frequent updates and hold meetings to discuss progress and any necessary adjustments.",
  },
  {
    q: "What are the costs involved in developing custom software?",
    a: "The cost depends on the complexity of the project, the desired features, and the time needed for development. After discussing your requirements, I will provide a detailed cost estimate.",
  },
  {
    q: "Do you work with user interface (UI) design and user experience (UX)?",
    a: "Yes, I believe a good interface and an intuitive user experience are crucial for software success. I focus on UI/UX design with an emphasis on usability and user satisfaction.",
  },
  {
    q: "Do you offer consulting services before starting development?",
    a: "Yes, I offer consulting to better understand your needs and help define the project requirements. This phase is essential to ensure all important details are covered.",
  },
  {
    q: "Can you integrate the software with other platforms or systems?",
    a: "Yes, I develop solutions that can integrate with other platforms or systems, such as databases, third-party services, APIs, and more. Integrations are planned according to the specific needs of the project.",
  },
  {
    q: "Will the software be responsive and optimized for mobile devices?",
    a: "Yes, all the software I develop is optimized to work well on various devices, including desktops, tablets, and smartphones, ensuring a consistent experience for all users.",
  },
  {
    q: "What types of projects have you developed?",
    a: "I have experience with a wide range of projects, such as e-commerce applications, content management systems, service booking platforms, data analysis dashboards, among others. You can check out examples of previous work in my portfolio.",
  },
  {
    q: "Can I request changes to the project during development?",
    a: "Yes, but depending on the project's phase, changes may affect the timeline and budget. However, I am always flexible and work with clients to accommodate their needs as best as possible.",
  },
  {
    q: "Do you handle the launch and hosting of the software?",
    a: "Yes, I can assist with the software launch and advise you on the best hosting options based on the scale and expected traffic of your project.",
  },];































