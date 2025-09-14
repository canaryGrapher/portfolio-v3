import CompanyData from "@/data/general/Company";
import Technologies from "@/data/general/Technologies";
import { Projects } from "@/assets/images";

const ProjectData = {
  projects: [
    {
      id: 1,
      name: "Multipass NPM Package",
      description: "An NPM package to control Multipass VM manager from within your NodeJS application for controls like launching, stopping, or deleting Ubuntu images. This package requires an installation of Multipass on your system. Made this package because I needed to use it in some other project.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/multipass-npm"
        },
        {
          linkName: "Live product",
          link: "https://www.npmjs.com/package/multipass-npm"
        }
      ],
      associatedWith: CompanyData["FireAI"].name,
      associatedWithImage: CompanyData["FireAI"].image,
      startDate: "2021-06-01",
      endDate: "2022-02-01",
      technologies: [Technologies["NodeJS"], Technologies["TypeScript"], Technologies["NPM"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 2,
      name: "Portfolio Website v3",
      description: "A modern, responsive portfolio website built with Next.js and TypeScript. Features include dynamic content management, smooth animations, and a clean, professional design. This is the third iteration of my personal portfolio, showcasing my growth as a developer.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/portfolio-v3"
        },
        {
          linkName: "Live product",
          link: "https://canarygrapher.dev"
        }
      ],
      associatedWith: null,
      startDate: "2024-01-01",
      endDate: "2024-12-01",
      technologies: [Technologies["NextJS"], Technologies["TypeScript"], Technologies["Tailwind"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 3,
      name: "E-commerce Platform",
      description: "A full-stack e-commerce solution with user authentication, product management, shopping cart, and payment integration. Built with React, Node.js, and PostgreSQL. Features include real-time inventory tracking and admin dashboard.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/ecommerce-platform"
        },
        {
          linkName: "Live product",
          link: "https://ecommerce-demo.canarygrapher.dev"
        }
      ],
      associatedWith: "Freelance Client",
      startDate: "2023-03-01",
      endDate: "2023-08-01",
      technologies: [Technologies["ReactJS"], Technologies["NodeJS"], Technologies["PostgreSQL"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 4,
      name: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and project tracking. Built using React, Socket.io, and MongoDB. Includes drag-and-drop functionality and deadline notifications.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/task-manager"
        },
        {
          linkName: "Live product",
          link: "https://tasks.canarygrapher.dev"
        }
      ],
      associatedWith: CompanyData["FireAI"].name,
      associatedWithImage: CompanyData["FireAI"].image,
      startDate: "2022-09-01",
      endDate: "2023-01-01",
      technologies: [Technologies["ReactJS"], Technologies["Socket.io"], Technologies["MongoDB"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 5,
      name: "Weather Dashboard",
      description: "A responsive weather dashboard that displays current conditions and forecasts for multiple cities. Features include interactive maps, weather alerts, and historical data visualization. Built with React and integrated with multiple weather APIs.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/weather-dashboard"
        },
        {
          linkName: "Live product",
          link: "https://weather.canarygrapher.dev"
        }
      ],
      associatedWith: null,
      startDate: "2023-05-01",
      endDate: "2023-07-01",
      technologies: [Technologies["ReactJS"], Technologies["TypeScript"], Technologies["Chart.js"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 6,
      name: "Blockchain Voting System",
      description: "A decentralized voting system built on Ethereum blockchain. Features include voter authentication, transparent vote counting, and immutable record keeping. Smart contracts ensure the integrity of the voting process.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/blockchain-voting"
        },
        {
          linkName: "Live product",
          link: "https://voting.canarygrapher.dev"
        }
      ],
      associatedWith: "University Project",
      startDate: "2022-01-01",
      endDate: "2022-05-01",
      technologies: [Technologies["Ethereum"], Technologies["Web3"], Technologies["Solidity"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 7,
      name: "AI Chatbot Assistant",
      description: "An intelligent chatbot powered by OpenAI's GPT API. Features include natural language processing, context awareness, and multi-language support. Integrated with various platforms including Slack and Discord.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/ai-chatbot"
        },
        {
          linkName: "Live product",
          link: "https://chatbot.canarygrapher.dev"
        }
      ],
      associatedWith: CompanyData["FireAI"].name,
      associatedWithImage: CompanyData["FireAI"].image,
      startDate: "2023-09-01",
      endDate: "2023-12-01",
      technologies: [Technologies["NodeJS"], Technologies["OpenAI"], Technologies["TypeScript"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 8,
      name: "Mobile Expense Tracker",
      description: "A cross-platform mobile application for tracking personal expenses and budgeting. Features include receipt scanning, category management, and spending analytics. Built with React Native and integrated with cloud storage.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/expense-tracker"
        },
        {
          linkName: "Live product",
          link: "https://apps.apple.com/expense-tracker"
        }
      ],
      associatedWith: null,
      startDate: "2023-01-01",
      endDate: "2023-04-01",
      technologies: [Technologies["React Native"], Technologies["Firebase"], Technologies["TypeScript"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 9,
      name: "Real-time Analytics Dashboard",
      description: "A comprehensive analytics dashboard for monitoring application performance and user behavior. Features include real-time data visualization, custom metrics, and automated reporting. Built with React and integrated with multiple data sources.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/analytics-dashboard"
        },
        {
          linkName: "Live product",
          link: "https://analytics.canarygrapher.dev"
        }
      ],
      associatedWith: "Enterprise Client",
      startDate: "2022-06-01",
      endDate: "2022-11-01",
      technologies: [Technologies["ReactJS"], Technologies["D3.js"], Technologies["WebSocket"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 10,
      name: "API Gateway Service",
      description: "A microservices API gateway built with Node.js and Express. Features include request routing, authentication, rate limiting, and monitoring. Handles thousands of requests per minute with high availability and fault tolerance.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/api-gateway"
        },
        {
          linkName: "Live product",
          link: "https://api.canarygrapher.dev"
        }
      ],
      associatedWith: CompanyData["FireAI"].name,
      associatedWithImage: CompanyData["FireAI"].image,
      startDate: "2022-03-01",
      endDate: "2022-08-01",
      technologies: [Technologies["NodeJS"], Technologies["Express"], Technologies["Redis"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 11,
      name: "Social Media Scheduler",
      description: "A web application for scheduling and managing social media posts across multiple platforms. Features include content calendar, post preview, and analytics. Integrated with Twitter, LinkedIn, and Instagram APIs.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/social-scheduler"
        },
        {
          linkName: "Live product",
          link: "https://scheduler.canarygrapher.dev"
        }
      ],
      associatedWith: null,
      startDate: "2023-06-01",
      endDate: "2023-09-01",
      technologies: [Technologies["ReactJS"], Technologies["NodeJS"], Technologies["MongoDB"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 12,
      name: "Cloud Storage Manager",
      description: "A cloud storage management application that supports multiple providers including AWS S3, Google Drive, and Dropbox. Features include file synchronization, backup scheduling, and storage analytics. Built with React and Node.js.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/cloud-storage-manager"
        },
        {
          linkName: "Live product",
          link: "https://storage.canarygrapher.dev"
        }
      ],
      associatedWith: "Cloud Solutions Inc",
      startDate: "2022-10-01",
      endDate: "2023-02-01",
      technologies: [Technologies["ReactJS"], Technologies["AWS"], Technologies["TypeScript"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 13,
      name: "Machine Learning Model API",
      description: "A RESTful API service for serving machine learning models. Features include model versioning, A/B testing, and performance monitoring. Supports multiple ML frameworks and provides real-time predictions.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/ml-model-api"
        },
        {
          linkName: "Live product",
          link: "https://ml-api.canarygrapher.dev"
        }
      ],
      associatedWith: CompanyData["FireAI"].name,
      associatedWithImage: CompanyData["FireAI"].image,
      startDate: "2023-04-01",
      endDate: "2023-08-01",
      technologies: [Technologies["Python"], Technologies["FastAPI"], Technologies["Docker"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 14,
      name: "Document Management System",
      description: "An enterprise document management system with version control, collaboration features, and advanced search capabilities. Built with React, Node.js, and Elasticsearch. Features include document approval workflows and audit trails.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/document-management"
        },
        {
          linkName: "Live product",
          link: "https://docs.canarygrapher.dev"
        }
      ],
      associatedWith: "Enterprise Solutions Ltd",
      startDate: "2023-02-01",
      endDate: "2023-06-01",
      technologies: [Technologies["ReactJS"], Technologies["Elasticsearch"], Technologies["NodeJS"]],
      image: Projects.ProjectImages.React,
    },
    {
      id: 15,
      name: "IoT Device Monitor",
      description: "A real-time monitoring system for IoT devices with data visualization and alerting. Features include device status tracking, data logging, and predictive maintenance. Built with React, Node.js, and MQTT protocol.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/iot-monitor"
        },
        {
          linkName: "Live product",
          link: "https://iot.canarygrapher.dev"
        }
      ],
      associatedWith: null,
      startDate: "2023-10-01",
      endDate: "2024-01-01",
      technologies: [Technologies["ReactJS"], Technologies["MQTT"], Technologies["TypeScript"]],
      image: Projects.ProjectImages.React,
    }
  ],
};

export default ProjectData;