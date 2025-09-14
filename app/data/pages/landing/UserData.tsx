import { WorkExperience } from "@/interface/UserData";
import { HeroImage, RelatedWork, VolunteerWork, WorkExBannerBackground, WorkExPopupImages } from "@/assets/images"
import { FunVideo } from "@/assets/videos"
import { IntroLottie, IntroLottieResponsive } from "@/assets/lotties"
import { Fun } from "@/assets/vectors";
import Technologies from "../../general/Technologies";
import CompanyData from "@/data/general/Company";

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

const WorkExperienceData: WorkExperience = {
  professionalWorkExperience: [
    {
      companyName: CompanyData["FireAI"].name,
      bannerImage: CompanyData["FireAI"].backgroundImage,
      popupImage: CompanyData["FireAI"].image,
      jobTitle: "Lead Application Developer",
      employmentType: "Full Time",
      startDate: "Oct'24",
      endDate: "Jun'25",
      companyDescription: CompanyData["FireAI"].description,
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
      companyColor: CompanyData["FireAI"].companyColor,
      gradientColors: CompanyData["FireAI"].companyGradient
    },
    {
      companyName: CompanyData["ICICI Bank"].name,
      bannerImage: CompanyData["ICICI Bank"].backgroundImage,
      popupImage: CompanyData["ICICI Bank"].image,
      jobTitle: "Deputy Manager II",
      employmentType: "Full Time",
      startDate: "Aug'22",
      endDate: "Sep'24",
      companyDescription: CompanyData["ICICI Bank"].description,
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
      companyColor: CompanyData["ICICI Bank"].companyColor,
      gradientColors: CompanyData["ICICI Bank"].companyGradient
    },
    {
      companyName: CompanyData["Leap Wallet"].name,
      bannerImage: CompanyData["Leap Wallet"].backgroundImage,
      popupImage: CompanyData["Leap Wallet"].image,
      jobTitle: "Full Stack Developer",
      employmentType: "Contract",
      startDate: "Jul'22",
      endDate: "Jul'22",
      companyDescription: CompanyData["Leap Wallet"].description,
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
      companyColor: CompanyData["Leap Wallet"].companyColor,
      gradientColors: CompanyData["Leap Wallet"].companyGradient
    },
    {
      companyName: CompanyData["NonceBlox"].name,
      bannerImage: CompanyData["NonceBlox"].backgroundImage,
      popupImage: CompanyData["NonceBlox"].image,
      jobTitle: "Full Stack Developer",
      employmentType: "Intern",
      startDate: "Jul'21",
      endDate: "Sep'21",
      companyDescription: CompanyData["NonceBlox"].description,
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
      companyColor: CompanyData["NonceBlox"].companyColor,
      gradientColors: CompanyData["NonceBlox"].companyGradient
    },
    {
      companyName: CompanyData["The ChillSpace"].name,
      bannerImage: CompanyData["The ChillSpace"].backgroundImage,
      popupImage: CompanyData["The ChillSpace"].image,
      jobTitle: "Frontend Developer",
      employmentType: "Intern",
      startDate: "Sep'20",
      endDate: "Nov'20",
      companyDescription: CompanyData["The ChillSpace"].description,
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
      companyColor: CompanyData["The ChillSpace"].companyColor,
      gradientColors: CompanyData["The ChillSpace"].companyGradient
    },
    {
      companyName: CompanyData["IonCure"].name,
      bannerImage: CompanyData["IonCure"].backgroundImage,
      popupImage: CompanyData["IonCure"].image,
      jobTitle: "Web Designer and Developer",
      employmentType: "Intern",
      startDate: "May'20",
      endDate: "Aug'20",
      companyDescription: CompanyData["IonCure"].description,
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
      companyColor: CompanyData["IonCure"].companyColor,
      gradientColors: CompanyData["IonCure"].companyGradient
    }
  ],
  volunteerWorkExperience: [
    {
      companyName: CompanyData["Binance"].name,
      companyDescription: CompanyData["Binance"].description,
      category: "Education",
      companyLogo: CompanyData["Binance"].image,
      role: "Campus BUIDLer",
      companyColor: CompanyData["Binance"].companyColor,
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
      companyName: CompanyData["Codecademy"].name,
      companyDescription: CompanyData["Codecademy"].description,
      category: "Education",
      companyLogo: CompanyData["Codecademy"].image,
      role: "Chapter Leader",
      companyColor: CompanyData["Codecademy"].companyColor,
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
      companyName: CompanyData["Rotaract Club of Manipal"].name,
      companyDescription: CompanyData["Rotaract Club of Manipal"].description,
      category: "Social Service",
      companyLogo: CompanyData["Rotaract Club of Manipal"].image,
      role: "Member",
      companyColor: CompanyData["Rotaract Club of Manipal"].companyColor,
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
      companyName: CompanyData["AIESEC"].name,
      companyDescription: CompanyData["AIESEC"].description,
      category: "Environment",
      companyLogo: CompanyData["AIESEC"].image,
      role: "Member",
      companyColor: CompanyData["AIESEC"].companyColor,
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
      companyName: CompanyData["Tech Tatva"].name,
      companyDescription: CompanyData["Tech Tatva"].description,
      category: "Science & Technology",
      companyLogo: CompanyData["Tech Tatva"].image,
      role: "Event Organizer",
      companyColor: CompanyData["Tech Tatva"].companyColor,
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
      companyName: CompanyData["Linux User's Group"].name,
      companyDescription: CompanyData["Linux User's Group"].description,
      category: "Science & Technology",
      companyLogo: CompanyData["Linux User's Group"].image,
      role: "Core Committee Member",
      companyColor: CompanyData["Linux User's Group"].companyColor,
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
      companyName: CompanyData["Manipal Information Security Team"].name,
      companyDescription: CompanyData["Manipal Information Security Team"].description,
      category: "Science & Technology",
      companyLogo: CompanyData["Manipal Information Security Team"].image,
      role: "Head of Web Development",
      companyColor: CompanyData["Manipal Information Security Team"].companyColor,
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
      companyName: CompanyData["Sociio"].name,
      companyDescription: CompanyData["Sociio"].description,
      category: "Health",
      companyLogo: CompanyData["Sociio"].image,
      role: "Web Developer",
      companyColor: CompanyData["Sociio"].companyColor,
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
      companyName: CompanyData["Indian Institute of Science"].name,
      companyDescription: CompanyData["Indian Institute of Science"].description,
      category: "Education",
      companyLogo: CompanyData["Indian Institute of Science"].image,
      role: "Web Developer",
      companyColor: CompanyData["Indian Institute of Science"].companyColor,
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


export { HeroSectionData, IntroSectionData, WorkExperienceData, RelatedWorkData, FunStuffData };