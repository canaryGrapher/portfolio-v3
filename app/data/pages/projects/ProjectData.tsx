import CompanyData from "@/data/general/Company";
import Technologies from "@/data/general/Technologies";
import { Projects } from "@/assets/images";

const ProjectData = {
  projects: [
    {
      id: 1,
      name: "SelioTube",
      description: "SileoTube is a distraction-blocking extension designed to help you stay focused while using YouTube — so you’re not bombarded with endless recommendations, autoplay videos, or comment noise",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/workvar/SileoTube"
        },
        {
          linkName: "Live product",
          link: "https://microsoftedge.microsoft.com/addons/detail/sileotube/oabppnponkdokefoaonmgeohlpoehjbc"
        }
      ],
      associatedWith: null,
      associatedWithImage: null,
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      technologies: [Technologies["JavaScript"], Technologies["TypeScript"], Technologies["Chromium"]],
      image: Projects.ProjectImages.SileoTube,
    },
    {
      id: 2,
      name: "FireAI.in Landing Page",
      description: "FireAI.in Landing Page is a website that showcases the products and services offered by FireAI. It is a platform that allows users to learn about FireAI's products and services, and to contact FireAI for more information.",
      projectLink: [
        {
          linkName: "Project code",
          link: "null"
        },
        {
          linkName: "Live product",
          link: "https://fireai.in"
        }
      ],
      associatedWith: CompanyData["FireAI"].name,
      associatedWithImage: CompanyData["FireAI"].image,
      startDate: "2024-10-01",
      endDate: "2025-01-30",
      technologies: [Technologies["ReactJS"], Technologies["TypeScript"], Technologies["Tailwind"], Technologies["NodeJS"], Technologies["PostgreSQL"], Technologies["Docker"], Technologies["ElectronJS"]],
      image: Projects.ProjectImages.FireAILandingPage,
    },
    {
      id: 3,
      name: "FireSync",
      description: "FireSync is an application that extracts and syncs data from Tally ERP on a user's PC to FireAI's servers. This helps in dashboarding user's data for better insights of their business.",
      projectLink: [
        {
          linkName: "Project code",
          link: null
        },
        {
          linkName: "Live product",
          link: null
        }
      ],
      associatedWith: CompanyData["FireAI"].name,
      associatedWithImage: CompanyData["FireAI"].image,
      startDate: "2024-10-01",
      endDate: "2025-01-30",
      technologies: [Technologies["ReactJS"], Technologies["TypeScript"], Technologies["Tailwind"], Technologies["NodeJS"], Technologies["PostgreSQL"], Technologies["Docker"], Technologies["ElectronJS"]],
      image: Projects.ProjectImages.FireSync,
    },
    {
      id: 4,
      name: "ScoutSherpa",
      description: "ScoutSherpa is a Digital Adoption Platform based on the popular ShepherdJS project, customized for the needs of ICICI Bank.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/ScoutSherpa"
        },
        {
          linkName: "Live product",
          link: null
        }
      ],
      associatedWith: CompanyData["ICICI Bank"].name,
      associatedWithImage: CompanyData["ICICI Bank"].image,
      startDate: "2023-10-01",
      endDate: "2024-03-30",
      technologies: [Technologies["Svelte"], Technologies["JavaScript"]],
      image: Projects.ProjectImages.ScoutSherpa,
    },
    {
      id: 5,
      name: "Anant",
      description: "aNANt is an initiative of the Materials Theory and Simulations Group, Materials Research Centre, Indian Institute of Science, Bangalore, to develop and host an open-access online repository of functional materials. My work with the team included redesigning and adding additional features to the existing website.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/project-anant"
        },
        {
          linkName: "Live product",
          link: "https://anant.mrc.iisc.ac.in"
        }
      ],
      associatedWith: CompanyData["Indian Institute of Science"].name,
      associatedWithImage: CompanyData["Indian Institute of Science"].image,
      startDate: "2021-10-01",
      endDate: "2022-06-30",
      technologies: [Technologies["ReactJS"], Technologies["NodeJS"], Technologies["MongoDB"], Technologies["ThreeJS"]],
      image: Projects.ProjectImages.Anant,
    },
    {
      id: 6,
      name: "Multipass-control",
      description: "An NPM package to control Multipass VM manager from within your NodeJS application for controls like launching, stopping, or deleting Ubuntu images. This package requires an installation of Multipass on your system. Made this package because I needed to use it in some other project.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/multipass-control"
        },
        {
          linkName: "Live product",
          link: "https://www.npmjs.com/package/multipass-control"
        }
      ],
      associatedWith: null,
      associatedWithImage: null,
      startDate: "2021-06-01",
      endDate: "2021-07-30",
      technologies: [Technologies["JavaScript"], Technologies["NodeJS"], Technologies["NPM"], Technologies["Linux"],Technologies["Multipass"]],
      image: Projects.ProjectImages.MultiPassControl,
    },
    {
      id: 7,
      name: "HelpCorona",
      description: "I saw a lot of people giving out their phone numbers while asking for help on Twitter and other social media platforms during the Covid-19 pandemic, so I created a platform that would allow people to ask for help anonymously and then be reached out by a team of volunteers when a lead was available.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/HelpCorona"
        },
        {
          linkName: "Live product",
          link: null
        }
      ],
      associatedWith: null,
      associatedWithImage: null,
      startDate: "2021-05-01",
      endDate: "2021-05-30",
      technologies: [Technologies["NodeJS"], Technologies["ReactJS"], Technologies["Google Sheets"]],
      image: Projects.ProjectImages.HelpCorona,
    },
    {
      id: 8,
      name: "E-cell Website",
      description: "I was assigned to create a new website for the brand new E-cell of the Manipal Institute of Technology. The website was made using HTML, CSS, and Bootstrap.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/E-cell-MIT"
        },
        {
          linkName: "Live product",
          link: "https://ecellmit.com/"
        }
      ],
      associatedWith: "Manipal E-Cell",
      startDate: "2020-11-01",
      endDate: "2020-12-01",
      technologies: [Technologies["HTML"], Technologies["CSS"], Technologies["Bootstrap"]],
      image: Projects.ProjectImages.EcellWebsite,
    },
    {
      id: 9,
      name: "Open Journal",
      description: "I wanted to have a personal e-journal where I could record my everyday thoughts and ideas. I did not want to use any of the online alternatives, and I wanted it to be running on my home server to access it only at my home. I created this project in ReactJS, NodeJS, and HalfmoonUI. It also comes with a CLI companion app to make posts on the fly but not read it. This companion app runs in the Terminal and can be accessed by a batch/bash file.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/Open-Journal"
        },
        {
          linkName: "Live product",
          link: null
        }
      ],
      associatedWith: null,
      startDate: "2020-10-01",
      endDate: "2020-11-30",
      technologies: [Technologies["MongoDB"], Technologies["NodeJS"], Technologies["ReactJS"], Technologies["HalfMoon"]],
      image: Projects.ProjectImages.OpenJournal,
    },
    {
      id: 10,
      name: "MIST Website",
      description: "I was assigned to create a new website for the creation of the site from scratch. I designed and coded the website, with a few amendments suggested by other club members.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/wearemist_v2"
        },
        {
          linkName: "Live product",
          link: "https://www.wearemist.in"
        }
      ],
      associatedWith: CompanyData["Manipal Institute of Technology"].name,
      associatedWithImage: CompanyData["Manipal Institute of Technology"].image,
      startDate: "2020-03-01",
      endDate: "2020-08-01",
      technologies: [Technologies["ReactJS"], Technologies["NodeJS"], Technologies["MongoDB"]],
      image: Projects.ProjectImages.MISTWebsite,
    },
    {
      id: 11,
      name: "slcmAPI",
      description: "The slcmAPI is the Open-Sourced REST-API for Manipal University's Student Life cycle Management Portal. This API is an aid for those who want to build an app or a website requiring data on SLcM. Avoid the hassle of writing your code to scrape data from the website when all you can do is make queries to this API.",
      projectLink: [
        {
          linkName: "Project code",
          link: "https://github.com/canaryGrapher/slcmAPI"
        },
        {
          linkName: "Live product",
          link: null
        }
      ],
      associatedWith: null,
      associatedWithImage: null,
      startDate: "2020-05-01",
      endDate: "2020-06-30",
      technologies: [Technologies["NodeJS"], Technologies["Express"], Technologies["Puppeteer"]],
      image: Projects.ProjectImages.slcmAPI,
    }
  ],
};

export default ProjectData;