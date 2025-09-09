import { WorkExperience } from "@/interface/UserData";
import { HeroImage, RelatedWork, VolunteerWork, WorkExBannerBackground, WorkExPopupImages, FunStuff } from "@/assets/images"
import { FunVideo } from "@/assets/videos"
import { IntroLottie, IntroLottieResponsive } from "@/assets/lotties"
import { Skills, Fun } from "@/assets/vectors";
import Technologies from "./Technologies";

const HeroSectionData = {
  name: "Yash Aryan",
  title: ["Developer", "Thinker", "Explorer"],
  description: "I'm a developer who loves to tell stories and explore new things.",
  image: HeroImage,
};

const IntroSectionData = {
  lottieObject: IntroLottie,
  responsiveLottieObject: IntroLottieResponsive,
  lines: [
    "Hello! I am Yash Aryan, a software engineer from India.",
    "I specialize in web development, with experience in AWS Services, Web3 development, and sometimes, designing websites.",
    "Building simplified user experiences that are easy to understand and follow through drives me.",
    "I build with the mindset that I'm the end user, striving to make every interaction effortless and enjoyable."
  ]
}

const SkillsData = {
  skills: [
    {
      name: "Web Development",
      description: "Design and build scalable websites tailored to your brand, optimized for performance and user experience.",
      icon: Skills.webDevelopment,
    },
    {
      name: "Cloud",
      description: "Set up and manage secure, reliable cloud infrastructures to support your business growth.",
      icon: Skills.cloudComputing,
    },
    {
      name: "Product Management",
      description: "Guide product strategy and development, aligning every feature with user needs and business goals.",
      icon: Skills.productManagement,
    },
    {
      name: "API Engineering & Testing",
      description: "Develop robust, well-documented APIs that are scalable and allow straight-forward consumption.",
      icon: Skills.ApiDev,
    },
    {
      name: "System Design",
      description: "Architect technical systems that handle complex workflows and adapt to future requirements.",
      icon: Skills.systemDesign,
    },
    {
      name: "Mobile App Development",
      description: "Create mobile applications for iOS and Android that blend sleek design and smooth usage.",
      icon: Skills.mobileDevelopment,
    }
  ],
};

const WorkExperienceData: WorkExperience = {
  professionalWorkExperience: [
    {
      companyName: "FireAI",
      bannerImage: WorkExBannerBackground.FireAIBannerBackground,
      popupImage: WorkExPopupImages.FireAIPopupImage,
      jobTitle: "Lead Application Developer",
      employmentType: "Full Time",
      startDate: "Oct'24",
      endDate: "Jun'25",
      companyDescription: "A software company specializing in AI-powered business intelligence. Their platform transforms complex business data into actionable insights with real-time analytics, predictive capabilities, and secure automation—helping organizations make smarter, faster decisions and drive growth",
      rolesAndResponsibilities: [
        {
          title: "Lead Application Developer",
          duration: "Oct'24 - Jun'25",
          description: [
            "Developed a high-performance synchronization application end-to-end  using ElectronJS from prototyping to production for cross-device data sync, enhancing efficiency and security end-to-end.",
            "Created a Node.js microservice to integrate third-party platforms with FireAI, enabling seamless data import and automation.",
            "Led the end-to-end development and deployment of FireAI's landing page, resulting in improved performance and user engagement.",
            "Utilized AWS services for deployment, monitoring, and scaling of the application, ensuring high availability and performance.",
            "Worked closely with the product team to understand user needs and requirements, and delivered features that met their expectations.",
            "Collaborated with the design team to create a visually appealing and user-friendly interface for the application.",
            "Worked closely with the Business Analytics team to integrate the application with their platform, enabling seamless data transfer and automation."
          ],
          employmentType: "Full Time"
        }
      ],
      experienceGained: [
        {
          name: "Desktop Application Development",
          technologies: [Technologies.ElectronJS, Technologies.ReactJS]
        },
        {
          name: "Micro-service Development",
          technologies: [Technologies.NodeJS, Technologies.ExpressJS, Technologies.PostgreSQL, Technologies.Redis, Technologies.GitHub]
        },
        {
          name: "Service Deployment",
          technologies: [Technologies.Docker, Technologies.ECS, Technologies.Route53, Technologies.EC2, Technologies.GitHubActions, Technologies.RDS, Technologies.CloudWatch, Technologies.APIGateway]
        },
        {
          name: "Frontend Application Development",
          technologies: [Technologies.ReactJS, Technologies.LocalStorage, Technologies.Tailwind, Technologies.NextJS, Technologies.Redux, Technologies.MicrosoftClarity]
        }
      ],
      companyColor: "#0169FD",
      gradientColors: ["#0169FD", "#0F1D77"]
    },
    {
      companyName: "ICICI Bank",
      bannerImage: WorkExBannerBackground.ICICIBankBannerBackground,
      popupImage: WorkExPopupImages.ICICIBankPopupImage,
      jobTitle: "Deputy Manager II",
      employmentType: "Full Time",
      startDate: "Aug'22",
      endDate: "Sep'24",
      companyDescription: "ICICI Bank is one of India's leading private sector banks, delivering a comprehensive range of banking and financial services to corporate, retail, and SME customers. With a global presence and deep expertise, ICICI Bank is recognized for innovation, reliability, and financial strength",
      rolesAndResponsibilities: [
        {
          title: "Deputy Manager II",
          duration: "Aug'22 - Sep'24",
          description: [
            "Contributed to the design and development of composite APIs that streamline multiple service calls into single endpoints, improving efficiency and developer experience.",
            "Collaborated with cross-functional teams to align backend services with evolving customer needs and digital strategy.",
            "Planned and prototyped flows like Digital Adoption Platform and Web Authentication.",
            "Developed modular front-end components to optimize the user onboarding journey.",
            "Provided targeted code snippets and quick-fix implementations to assist core developers in resolving issues like OTP field masking and password manager compatibility.",
            "Conducted comprehensive end-to-end testing of RESTful APIs using Postman.",
            "Built and maintained automated test suites to ensure high availability and minimize regression issues.",
          ],
          employmentType: "Full Time"
        }
      ],
      experienceGained: [
        {
          name: "Product Management",
          technologies: [Technologies.Jira, Technologies.Confluence, Technologies.Excel, Technologies.PowerPoint, Technologies.Word, Technologies.MSTeams, Technologies.StakeholderManagement]
        },
        {
          name: "Api Testing & Monitoring",
          technologies: [Technologies.Postman, Technologies.Dynatrace]
        },
        {
          name: "Frontend Development",
          technologies: [Technologies.Svelte, Technologies.JavaScript, Technologies.GitHub]
        }
      ],
      companyColor: "#FA6316",
      gradientColors: ["#AF1C21", "#F35F20"]
    },
    {
      companyName: "Leap Wallet",
      bannerImage: WorkExBannerBackground.LeapWalletBannerBackground,
      popupImage: WorkExPopupImages.LeapWalletPopupImage,
      jobTitle: "Full Stack Developer",
      employmentType: "Contract",
      startDate: "Jul'22",
      endDate: "Jul'22",
      companyDescription: "Leap Wallet is a versatile crypto wallet designed for the web3 ecosystem, enabling users to securely manage cryptocurrencies, NFTs, staking rewards, and airdrops across multiple chains. With mobile and browser apps, Leap Wallet streamlines DeFi, trading, and portfolio management for both enthusiasts and developers",
      rolesAndResponsibilities: [
        {
          title: "Full Stack Developer",
          duration: "Jul'22 - Jul'22",
          description: [
            "Contributed actively towards the Chromium extension development",
            "Implemented multi-currency support for enhanced user experience.",
            "Optimized forgot password flow for seamless navigation.",
            "Managed chain flow and enabled token swap flow for improved functionality.",
          ],
          employmentType: "Contract"
        }
      ],
      experienceGained: [
        {
          name: "Chromium Extension Development",
          technologies: [Technologies.Chromium, Technologies.ReactJS, Technologies.GitHub]
        },
        {
          name: "Blockchain",
          technologies: [Technologies.Web3, Technologies.Metamask, Technologies.Solana]
        },
      ],
      companyColor: "#14D95B",
      gradientColors: ["#14D95B", "#029956"]
    },
    {
      companyName: "NonceBlox",
      bannerImage: WorkExBannerBackground.NonceBloxBannerBackground,
      popupImage: WorkExPopupImages.NonceBloxPopupImage,
      jobTitle: "Full Stack Developer",
      employmentType: "Intern",
      startDate: "Jul'21",
      endDate: "Sep'21",
      companyDescription: "Nonceblox is a blockchain technology company specializing in creating scalable and secure blockchain solutions. They develop applications and platforms across multiple chains such as Ethereum and Polygon, helping businesses harness Web3 innovations for digital transformation and growth.",
      rolesAndResponsibilities: [
        {
          title: "Full Stack Developer",
          duration: "Jul'21 - Sep'21",
          description: [
            "Communicated design discrepancies with clients for projects like Polygon Governance and Nervora.",
            "Managed junior interns on various projects, reporting progress to project manager.",
            "Developed backend support for web applications like ForestKnight and Bloktopia.",
            "Integrated Web3 technologies for crypto wallets using Web3.js and MetaMask.",
          ],
          employmentType: "Intern"
        }
      ],
      experienceGained: [
        {
          name: "Frontend Development",
          technologies: [Technologies.ReactJS, Technologies.Tailwind, Technologies.BootStrap, Technologies.Web3, Technologies.Metamask, Technologies.Ethereum]
        },
        {
          name: "Backend Development",
          technologies: [Technologies.NodeJS, Technologies.ExpressJS, Technologies.Redis, Technologies.GitHub]
        }
      ],
      companyColor: "#A179D1",
      gradientColors: ["#A68EDD", "#9343B1"]
    },
    {
      companyName: "The ChillSpace",
      bannerImage: WorkExBannerBackground.ChillSpaceBannerBackground,
      popupImage: WorkExPopupImages.ChillSpacePopupImage,
      jobTitle: "Frontend Developer",
      employmentType: "Intern",
      startDate: "Sep'20",
      endDate: "Nov'20",
      companyDescription: "The ChillSpace is a vibrant community hub and co-working space based out of Manipal, that fosters creativity, collaboration, and innovation. It offers flexible workstations, event hosting, and networking opportunities in a comfortable and inspiring environment, supporting startups, freelancers, and creative professionals.",
      rolesAndResponsibilities: [
        {
          title: "Frontend Developer",
          duration: "Sep'20 - Nov'20",
          description: [
            "Reproduced web pages from UI designs using HTML, CSS, and JavaScript for the 'Hourglass Portal' project.",
            "Suggested structural changes for better usability and coordinated with the design team for enhancements.",
            "Contributed to the development of a user management portal-cum-reward system for the Recreation Center at The ChillSpace.",
          ],
          employmentType: "Intern"
        }
      ],
      experienceGained: [
        {
          name: "Frontend Development",
          technologies: [Technologies.HTML, Technologies.CSS, Technologies.JavaScript, Technologies.BootStrap]
        }
      ],
      companyColor: "#D25E61",
      gradientColors: ["#0C0C0C", "#CF5E5E"]
    },
    {
      companyName: "IonCure",
      bannerImage: WorkExBannerBackground.IonCureBannerBackground,
      popupImage: WorkExPopupImages.IonCurePopupImage,
      jobTitle: "Web Designer and Developer",
      employmentType: "Intern",
      startDate: "May'20",
      endDate: "Aug'20",
      companyDescription: "Ioncure Tech Private Limited is an AI-driven health-tech company focused on innovative drug discovery, epilepsy care, brain diagnostics, and biotech solutions. Their technology combines research and data to improve patient outcomes and advance medical science globally.",
      rolesAndResponsibilities: [
        {
          title: "Web Designer and Developer",
          duration: "May'20 - Aug'20",
          description: [
            "Designed and developed a website for Ioncure's Solve@Pandemic 2020 project",
            "Analyzed company requirements to create a suitable website",
            "Coordinated with senior employees to ensure the application met their expectations",
          ],
          employmentType: "Intern"
        }
      ],
      experienceGained: [
        {
          name: "Frontend Development",
          technologies: [Technologies.HTML, Technologies.CSS, Technologies.JavaScript, Technologies.BootStrap]
        },
        {
          name: "Web Design",
          technologies: [Technologies.AdobeXD, Technologies.Figma]
        }
      ],
      companyColor: "#FEADA9",
      gradientColors: ["#AF1C21", "#EF752B"]
    }
  ],
  volunteerWorkExperience: [
    {
      companyName: "Binance",
      companyDescription: "A student-focused initiative that promotes crypto education and Web3 engagement on campuses",
      category: "Education",
      companyLogo: VolunteerWork.Binance,
      role: "Campus BUIDLer",
      companyColor: "#CFC615",
      responsibilities: [
        {
          date: "Nov'21 - May'22",
          description: [
            "Worked as a Campus Ambassador for Binance",
            "Conducted webinars on Binance Ecosystem and Blockchain in general",
            "Promoted Binance as a product in my university"
          ]
        }
      ]
    },
    {
      companyName: "Codecademy",
      companyDescription: "Community-led local groups to support each other through coding meetups, study sessions, and projects.",
      category: "Education",
      companyLogo: VolunteerWork.CodeCademy,
      role: "Chapter Leader",
      companyColor: "#204056",
      responsibilities: [
        {
          date: "Nov'21-May'22",
          description: [
            "Chapter leader for the Manipal Chapter of the Codecademy Community.",
            "Organize events and share knowledge with community members through webinars and chats.",
            "Promote Codecademy as a product in my university",
            "Help others achieve their learning goals by providing guidance and support",
            "Assist in the development of the Codecademy community"
          ]
        }
      ]
    },
    {
      companyName: "Rotaract Club of Manipal",
      companyDescription: "Rotaract Club of Manipal is a student-led organization that promotes leadership, service, and fellowship among its members.",
      category: "Social Service",
      companyLogo: VolunteerWork.Rotaract,
      role: "Member",
      companyColor: "#B33B60",
      responsibilities: [
        {
          date: "Nov'21-May'22",
          description: [
            "Served as an engaged member of the club for nearly one academic year",
            "Participated in community service initiatives, including visiting nursing homes to interact with senior citizens",
            "Contributed to animal welfare by delivering donations collected from the university to an animal care center"
          ]
        }
      ]
    },
    {
      companyName: "AIESEC",
      companyDescription: "Youth-run organization offering global leadership development through internships and volunteer projects.",
      category: "Environment",
      companyLogo: VolunteerWork.AIESEC,
      role: "Member",
      companyColor: "#377CEB",
      responsibilities: [
        {
          date: "Nov'21-May'22",
          description: [
            "Volunteered for the World Cleanup Day event organized by AIESEC at Manipal Academy of Higher Education",
            "Collaborated with fellow volunteers to clean various areas around the university",
            "Actively participated in environmental initiatives by picking up litter and promoting cleanliness"
          ]
        }
      ]
    },
    {
      companyName: "Tech Tatva",
      companyDescription: "MIT Manipal's annual national-level technical fest that provides students a platform to showcase innovation through competitions, workshops, and talks.",
      category: "Science & Technology",
      companyLogo: VolunteerWork.TechTatva,
      role: "Event Organizer",
      companyColor: "#C64421",
      responsibilities: [
        {
          date: "Sept'20-Oct'20",
          description: [
            "One of the three Category Heads for Manipal Institute of Technology's tech-fest TechTatva'20, Turing, a CyberSec related category.",
            "Oversee Ctrl+C event, a WebDev event where the participants were challenged to create a rigged website replicating the one provided to them and extract data from the account upon successful login.",
            "Oversee the event and act immediately in case of server crashes, or other discrepancies",
            "Responsible for maintaining the deployment of the other events under this category on the server.",
            "Event Head for Manipal Institute of Technology's tech-fest TechTatva'20, for Turing, a CyberSec-related category.",
            "Oversee the Ctrl+C event, a WebDev event where the participants had to create a rigged website replicating the one provided to them and extract data from the account upon successful login."
          ]
        },
        {
          date: "Sept'19-Oct'19",
          description: [
            "Assigned with the task of creating web vulnerability questions for the CTF event.",
            "Responsible for deployment of a part of the questions"
          ]
        },
        {
          date: "Sept'18-Oct'18",
          description: [
            "Part of the System Admin and Web Development team for managing the website of the tech-fest of Manipal Institute of Technology"
          ]
        }
      ]
    },
    {
      companyName: "Linux User's Group",
      companyDescription: "Linux User's Group is a community of Linux enthusiasts who share their knowledge and experiences with each other.",
      category: "Science & Technology",
      companyLogo: VolunteerWork.LUG,
      role: "Core Committee Member",
      companyColor: "#F0CC36",
      responsibilities: [
        {
          date: "Sept'18-Jul'21",
          description: [
            "Joined the Linux Users Group community to expand skills and knowledge as a beginner in Linux",
            "Actively contributed to discussions and supported fellow members with Linux-related issues",
            "Advanced to the core committee of the community through active participation and leadership",
            "Organized and conducted seminars and awareness drives to promote Linux adoption",
            "Led the Linux Installation Drive, assisting new students with installing Linux distributions on their PCs and troubleshooting setup issues"
          ]
        }
      ]
    },
    {
      companyName: "Manipal Information Security Team",
      companyDescription: "Manipal Information Security Team is a student-led organization that promotes information security and cyber awareness among its members.",
      category: "Science & Technology",
      companyLogo: VolunteerWork.MIST,
      role: "Head of Web Development",
      companyColor: "#010101",
      responsibilities: [
        {
          date: "Nov'19 - Nov'22",
          description: [
            "Maintaining and updating the club's website, ensuring seamless performance and up-to-date content.",
            "Managing hosting infrastructure for various events organized by the club.",
            "Leading the redesign and development of the club's website for a modernized and improved user experience.",
            "Organizing and conducting technical workshops, webinars, and meetups to share knowledge with fellow members.",
            "Overseeing and mentoring freshers, guiding them through web development projects and event management.",
            "Driving social media campaigns to enhance the club's online presence and engagement.",
          ]
        }
      ]
    },
    {
      companyName: "Sociio",
      companyDescription: "Sociio is a student-led organization that promotes social awareness and community engagement among its members.",
      category: "Health",
      companyLogo: VolunteerWork.Sociio,
      role: "Web Developer",
      companyColor: "#1B9F41",
      responsibilities: [
        {
          date: "Nov'21-May'22",
          description: [
            "Understand the project and make recommendations for various functionalities",
            "Make apt UI designs for the project.",
            "Help with the hosting of the web application on cloud platforms"
          ]
        }
      ]
    },
    {
      companyName: "Indian Institute of Science",
      companyDescription: "Indian Institute of Science is a student-led organization that promotes education and research among its members.",
      category: "Education",
      companyLogo: VolunteerWork.IIsC,
      role: "Web Developer",
      companyColor: "#131313",
      responsibilities: [
        {
          date: "Oct'21-Jun'22",
          description: [
            "Collaborated with the Materials Theory and Simulations Group at the Materials Research Centre, Indian Institute of Science (IISc) Bangalore on the aNANt initiative",
            "Contributed to the development of an open-access online repository of functional materials",
            "Redesigned the existing website to improve usability and interface design",
            "Implemented additional features to enhance the platform's functionality and user experience"
          ]
        }
      ]
    }
  ]
}

const RelatedWorkData = [
  {
    title: "Projects",
    preText: "Applying the experience through",
    image: RelatedWork.Projects,
    pageRoute: "/page/projects",
    active: true
  },
  {
    title: "Blogs",
    preText: "Sharing my two-cents through",
    image: RelatedWork.Blogs,
    pageRoute: "/page/blogs",
    active: true
  },
  {
    title: "Certificates",
    preText: "Showing off my skills through",
    image: RelatedWork.Certificates,
    pageRoute: "/page/certificates",
    active: true
  },
  {
    title: "Publications",
    preText: "Becoming more knowledgeable through",
    image: RelatedWork.Publications,
    pageRoute: "/page/publications",
    active: true
  }
]

const FunStuffData = {
  backgroundVideo: FunVideo,
  icons: [
    {
      title: "Photos",
      icon: Fun.PhotosIcon,
      pageRoute: "/page/photos",
      active: true
    },
    {
      title: "Trips",
      icon: Fun.TripsIcon,
      pageRoute: "/page/trips",
      active: true
    },
    {
      title: "Contacts",
      icon: Fun.ContactsIcon,
      pageRoute: "/page/contacts",
      active: true
    },
    {
      title: "Updates",
      icon: Fun.UpdatesIcon,
      pageRoute: "/page/updates",
      active: true
    },
    {
      title: "Calendar",
      icon: Fun.CalendarIcon,
      pageRoute: "/page/calendar",
      active: true
    }
  ]
}


export { HeroSectionData, IntroSectionData, SkillsData, WorkExperienceData, RelatedWorkData, FunStuffData };