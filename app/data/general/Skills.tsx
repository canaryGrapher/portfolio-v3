import { Skills } from "@/assets/vectors";

const SkillsData = {
    skills: [
        {
            name: "Web Development & API Engineering",
            description: "Design and build scalable web applications with robust, well-documented APIs, optimized for performance, maintainability, and seamless integrations.",
            icon: Skills.webDevelopment,
            focusAreas: [
                "Scalable Frontend Architecture",
                "Robust API Design (REST/GraphQL)",
                "State Management & Data Flow",
                "Core Web Vitals Optimization"
            ],
            techStack: ["NextJS", "ReactJS", "NodeJS", "ExpressJS", "TypeScript", "Tailwind"],
            impact: "High-performance, secure, and SEO-optimized modern web applications."
        },
        {
            name: "Cloud & DevOps",
            description: "Set up and manage secure, reliable cloud infrastructures to support business growth and automate development pipelines.",
            icon: Skills.cloudComputing,
            focusAreas: [
                "Infrastructure as Code",
                "Containerization & Orchestration",
                "CI/CD Pipeline Automation",
                "Cloud Security & Compliance"
            ],
            techStack: ["Google Cloud", "Docker", "ECS", "EC2", "GitHubActions", "CloudWatch"],
            impact: "99.9% uptime architectures with zero-downtime deployment pipelines."
        },
        {
            name: "Product Management",
            description: "Guide product strategy and development, aligning every feature with user needs, roadmap constraints, and business goals.",
            icon: Skills.productManagement,
            focusAreas: [
                "Agile / Scrum Methodologies",
                "Product Strategy & Roadmap",
                "User Research & Analytics",
                "Stakeholder Alignment"
            ],
            techStack: ["Jira", "Confluence", "Excel", "PowerPoint", "StakeholderManagement"],
            impact: "On-time delivery of customer-centric products with clear ROI metrics."
        },
        {
            name: "System Design & Databases",
            description: "Architect distributed database systems and workflows capable of scaling seamlessly under high loads.",
            icon: Skills.systemDesign,
            focusAreas: [
                "Distributed Database Architectures",
                "Caching & Performance Tuning",
                "Event-Driven Workflows",
                "Data Integrity & Migrations"
            ],
            techStack: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "APIGateway"],
            impact: "High-throughput, low-latency data layers designed for future scale."
        },
        {
            name: "Mobile App Development",
            description: "Create native and cross-platform mobile applications for iOS and Android that blend sleek design and smooth usage.",
            icon: Skills.mobileDevelopment,
            focusAreas: [
                "Cross-Platform Native Apps",
                "Offline-First Storage",
                "Sleek UI/UX Transitions",
                "App Store Publishing"
            ],
            techStack: ["ReactJS", "TypeScript", "LocalStorage", "GitHub"],
            impact: "Highly responsive, feature-rich iOS and Android mobile solutions."
        },
        {
            name: "Vibe Coding & Prototyping",
            description: "Rapidly transform raw ideas into functional products using AI-assisted development, accelerating iteration and delivery.",
            icon: Skills.vibeCoding,
            focusAreas: [
                "AI-Assisted Development",
                "Rapid MVP Prototyping",
                "Prompt Engineering & Automation",
                "Mentorship & Best Practices"
            ],
            techStack: ["JavaScript", "TypeScript", "GitHub", "Mentorship", "TechnicalWriting"],
            impact: "Drastically reduced time-to-market for early-stage software products."
        }
    ],
};

export default SkillsData;