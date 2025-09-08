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
          technologies: [Technologies.ElectronJS, Technologies.TypeScript, Technologies.ReactJS]
        },
        {
          name: "Micro-service Development and Maintenance",
          technologies: [Technologies.NodeJS, Technologies.PostgreSQL, Technologies.GitHub]
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
          title: "",
          duration: "",
          description: [],
          employmentType: "Full Time"
        }
      ],
      experienceGained: [
        {
          name: "",
          technologies: []
        }
      ],
      companyColor: "",
      gradientColors: []
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
          title: "",
          duration: "",
          description: [],
          employmentType: "Contract"
        }
      ],
      experienceGained: [
        {
          name: "",
          technologies: []
        }
      ],
      companyColor: "",
      gradientColors: []
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
          title: "",
          duration: "",
          description: [],
          employmentType: "Intern"
        }
      ],
      experienceGained: [
        {
          name: "",
          technologies: []
        }
      ],
      companyColor: "",
      gradientColors: []
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
          title: "",
          duration: "",
          description: [],
          employmentType: "Intern"
        }
      ],
      experienceGained: [
        {
          name: "",
          technologies: []
        }
      ],
      companyColor: "",
      gradientColors: []
      // experienceGained: []
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
          title: "",
          duration: "",
          description: [],
          employmentType: "Intern"
        }
      ],
      experienceGained: [
        {
          name: "",
          technologies: []
        }
      ],
      companyColor: "",
      gradientColors: []
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
      companyColor: "#",
      responsibilities: [
        {
          date: "Nov'21-May'22",
          description: [
            "Worked as a Chapter Leader for CodeCademy",
            "Conducted webinars on Binance Ecosystem and Blockchain in general",
            "Promoted CodeCademy as a product in my university"
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
      companyColor: "#",
      responsibilities: [
        {
          date: "Nov'21-May'22",
          description: [
            ""
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
      companyColor: "#",
      responsibilities: [
        {
          date: "Nov'21-May'22",
          description: [
            ""
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
      companyColor: "#",
      responsibilities: [
        {
          date: "",
          description: [
            ""
          ]
        },
        {
          date: "",
          description: [
            ""
          ]
        },
        {
          date: "",
          description: [
            ""
          ]
        }
      ]
    },
    {
      companyName: "Linux User's Group",
      companyDescription: "Linux User's Group is a community of Linux enthusiasts who share their knowledge and experiences with each other.",
      category: "Science & Technology",
      companyLogo: VolunteerWork.LUG,
      role: "Member",
      companyColor: "#",
      responsibilities: [
        {
          date: "",
          description: [
            ""
          ]
        }
      ]
    },
    {
      companyName: "Manipal Information Security Team",
      companyDescription: "Manipal Information Security Team is a student-led organization that promotes information security and cyber awareness among its members.",
      category: "Science & Technology",
      companyLogo: VolunteerWork.MIST,
      role: "Member",
      companyColor: "#",
      responsibilities: [
        {
          date: "",
          description: [
            ""
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
      companyColor: "#",
      responsibilities: [
        {
          date: "",
          description: [
            ""
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
      companyColor: "#",
      responsibilities: [
        {
          date: "",
          description: [
            ""
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