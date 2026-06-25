import certificateProviders from "./certificateProviders"
import courseOwnerData from "./courseOwnerData";

// importing types
type CertificateData = {
    name: string;
    providers: {
        name: string;
        icon: string;
    };
    organization: {
        name: string;
        image: string;
    };
    issuedDate: string;
    category: string;
    link: string;
    image: string;
    body?: string;
}

// importing types 
const certificateData: CertificateData[] = [
    {
        name: "MERN Stack Front To Back: Full Stack React, Redux & Node.js",
        providers: certificateProviders["Udemy"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2022",
        category: "Programming",
        link: "https://www.udemy.com/certificate/UC-2f866c6f-6465-4bbf-ad90-969747f80bac/",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/udemy_LFu_kWqON.png?ik-sdk-version=javascript-1.4.3&updatedAt=1654027829213",
        body: "Build and deploy a full stack social network application using Node.js, Express, React, Redux, and MongoDB, covering JWT authentication, API deployment, and state management."
    },
    {
        name: "Campus BUIDLer Program",
        providers: certificateProviders["Binance"],
        organization: courseOwnerData["Google"],
        issuedDate: "Nov 2021",
        category: "Leadership",
        link: "https://certificate.evidenz.io/check/E98B5BFA969C27BBFE68CC317A312CE943BB7BF22D646F6EDF61D6662C4E11B5Y1BwMmZ6dVZ6QkFFcEZjbEduM1BkWjlLVFZOZDk0bjRwb1FUOXRLTkVLZmVleTlr",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/binanceAcademy_ocSYi2TaAjJ.png?updatedAt=1639174894227",
        body: "A specialized educational program by Binance Academy covering blockchain fundamentals, cryptocurrency ecosystems, smart contracts, and decentralized application development."
    },
    {
        name: "Social Entrepreneurship",
        providers: certificateProviders["HP LIFE"],
        organization: courseOwnerData["Google"],
        issuedDate: "Nov 2021",
        category: "Leadership",
        link: "https://www.life-global.org/certificate?UUID=62ab007d-f91a-4444-acde-53dc04c4c4df",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/hpLife_Qp6x9Fqlg04.jpg?updatedAt=1639130929232",
        body: "An HP LIFE course teaching how to design, launch, and manage sustainable business models that address social challenges and create community impact."
    },
    {
        name: "AWS Cloud Computing",
        providers: certificateProviders["LetsUpgrade"],
        organization: courseOwnerData["Google"],
        issuedDate: "Sept 2022",
        category: "Cloud",
        link: "https://verify.letsupgrade.in/#verify/LUAWS0820A1455",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/letsUpgrade_sJO9OXn-a.jpg?updatedAt=1639130948080",
        body: "An introductory course on Amazon Web Services covering core cloud concepts, virtual servers, storage services, identity management, and cloud architecture basics."
    },
    {
        name: "Blockchain Essentials",
        providers: certificateProviders["LetsUpgrade"],
        organization: courseOwnerData["Google"],
        issuedDate: "Aug 2020",
        category: "Blockchain",
        link: "https://verify.letsupgrade.in/#verify/LUBL0720A0683",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/letsUpgrade_sJO9OXn-a.jpg?updatedAt=1639130948080",
        body: "Introduces the fundamental concepts of distributed ledgers, consensus algorithms, cryptography, smart contracts, and real-world blockchain use cases."
    },
    {
        name: "Hands on Arduino",
        providers: certificateProviders["Microsoft Student Partners India"],
        organization: courseOwnerData["Google"],
        issuedDate: "Mar 2019",
        category: "IoT",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/microsoftStudentPartner_Q2yi-4dUALuR.jpg?updatedAt=1639174719460",
        body: "A practical workshop on building IoT and hardware projects using the Arduino microcontroller, integrating sensors, actuators, and basic C++ programming."
    },
    {
        name: "Learn the Command Line Course",
        providers: certificateProviders["Codecademy"],
        organization: courseOwnerData["Google"],
        issuedDate: "Nov 2018",
        category: "Programming",
        link: "https://www.codecademy.com/profiles/CanaryGrapher/certificates/c87ba0541f8be78bc2f4ba1128233f6f",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/codecademy_VvXWpQbxm.jpg?updatedAt=1639174719229",
        body: "A Codecademy course on navigating files and directories, redirecting input/output, configuring shell environments, and automating tasks using Unix commands."
    },
    {
        name: "Learn TypeScript Course",
        providers: certificateProviders["Codecademy"],
        organization: courseOwnerData["Google"],
        issuedDate: "Oct 2021",
        category: "Programming",
        link: "https://www.codecademy.com/profiles/CanaryGrapher/certificates/56fb1e71303e37b643bb1905f31c8a09",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/codecademy_VvXWpQbxm.jpg?updatedAt=1639174719229",
        body: "Covers type definitions, interfaces, classes, generics, and module systems in TypeScript to build safer, more maintainable JavaScript applications."
    },
    {
        name: "Learn Go Course",
        providers: certificateProviders["Codecademy"],
        organization: courseOwnerData["Google"],
        issuedDate: "Oct 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/codecademy_VvXWpQbxm.jpg?updatedAt=1639174719229",
        body: "Teaches the fundamentals of the Go programming language (Golang), covering syntax, control flow, functions, structs, interfaces, and concurrency."
    },
    {
        name: "Learn Git Course",
        providers: certificateProviders["Codecademy"],
        organization: courseOwnerData["Google"],
        issuedDate: "Oct 2021",
        category: "Programming",
        link: "https://www.codecademy.com/profiles/CanaryGrapher/certificates/a8ab218d5950c29861635cc0bf12fd13",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/codecademy_VvXWpQbxm.jpg?updatedAt=1639174719229",
        body: "Covers version control fundamentals with Git, including branching, merging, conflict resolution, rebasing, and collaborating via remote repositories."
    },
    {
        name: "Webflow Tools for Web Developers",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "https://www.linkedin.com/learning/workflow-tools-for-web-developers",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "Teaches web developers how to use Webflow for rapid prototyping, visual designing, responsive layout creation, and integrating custom code."
    },
    {
        name: "Succeesing in DevOps",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "DevOps",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "A LinkedIn Learning course explaining DevOps culture, continuous integration and delivery (CI/CD), infrastructure as code (IaC), and site reliability engineering."
    },
    {
        name: "React:Server-Side Rendering (2018)",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "Covers the implementation of server-side rendering (SSR) in React applications using Express, Redux, React Router, and Next.js for improved SEO and performance."
    },
    {
        name: "React: Ecosystems",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "Explores the broader React ecosystem, focusing on state management (Redux, MobX), routing, testing libraries, static site generators, and styling solutions."
    },
    {
        name: "React.js: Building an Interface",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "A hands-on guide to building interactive, responsive user interfaces in React, covering components, props, state, event handling, and data binding."
    },
    {
        name: "Learning Node.js",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "Explores server-side JavaScript development with Node.js, covering file system operations, event emitters, HTTP modules, and package management with npm."
    },
    {
        name: "Inclusive Tech: Building Your Team",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "Focuses on building diverse, equitable, and inclusive engineering teams, covering hiring practices, mentorship, and fostering collaboration."
    },
    {
        name: "GraphQL Essential Training",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "Introduces the core concepts of GraphQL, including schemas, queries, mutations, resolvers, and integrating GraphQL APIs with frontend clients."
    },
    {
        name: "Git Essential Training: The Basics",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "A fundamental guide to version control, covering repository initialization, staging files, committing changes, branching, and basic merge operations."
    },
    {
        name: "Learning npm the Node Package Manager",
        providers: certificateProviders["LinkedIn Learning"],
        organization: courseOwnerData["Google"],
        issuedDate: "Jun 2021",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/linkedinLearning_zKtWHPC4Gh9.jpg?updatedAt=1639174719385",
        body: "Explains package management in Node.js, covering npm commands, dependency management, semantic versioning, and publishing custom packages."
    },
    {
        name: "Technical Support Fundamentals",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Jan 2022",
        category: "Technology",
        link: "https://www.coursera.org/account/accomplishments/certificate/GM6MFP9GPR2Q",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/Google_qHK5fZg0N6?updatedAt=1760627416913",
        body: "A Google Career Certificate course introducing IT support roles, computer hardware, operating systems, networking, and troubleshooting methodology."
    },
    {
        name: "Algorithmic Thinking (Part 1)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Sept 2021",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/NFFNRJB5BHT4",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/Rice%20University_H-AVJiIO_",
        body: "A Rice University course on algorithmic problem-solving, covering graph representations, search algorithms, and mathematical analysis of network structures."
    },
    {
        name: "Algorithmic Thinking (Part 2)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Nov 2021",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/EAGG5MHQ2BEV",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/Rice%20University_H-AVJiIO_",
        body: "Focuses on advanced algorithmic strategies, covering dynamic programming, divide-and-conquer algorithms, and clustering algorithms in Python."
    },
    {
        name: "Principles of Computing (Part 1)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/J64R9JYX9GA2",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/Rice%20University_H-AVJiIO_",
        body: "Teaches mathematical and programming principles, covering combinatorics, probability, recursion, and algorithmic complexity in Python."
    },
    {
        name: "Principles of Computing (Part 2)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Oct 2021",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/SD5SNSAXQCUF",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/Rice%20University_H-AVJiIO_",
        body: "Explores advanced computing principles, covering tree structures, grid-based search, sorting algorithms, and building game AI using minimax."
    },
    {
        name: "An Introduction to Interactive Programming in Python (Part 1)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Apr 2021",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/VM6EGTHRG2DU",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/Rice%20University_H-AVJiIO_",
        body: "A Rice University course on programming fundamentals in Python, building interactive games with graphics, event handlers, and user input."
    },
    {
        name: "An Introduction to Interactive Programming in Python (Part 2)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2021",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/E2VBF44TF32D",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/Rice%20University_H-AVJiIO_",
        body: "Builds on basic Python programming to implement more complex projects using object-oriented principles, sprites, and physics collision detection."
    },
    {
        name: "Getting Started with Go",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Oct 2020",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/MCZ7SAEVQRJD",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20California_C60j93Rdk?updatedAt=1760627620725",
        body: "A UC Irvine course introducing the Go language, covering basic data types, control flow, functions, object-oriented concepts, and JSON marshaling."
    },
    {
        name: "Blockchain Platforms",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2020",
        category: "Blockchain",
        link: "https://www.coursera.org/account/accomplishments/certificate/XG7EVU4CCP73",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Buffalo_DKNjPKCwA?updatedAt=1760627761072",
        body: "An in-depth review of major blockchain networks (Ethereum, Hyperledger, Corda), evaluating their architectures, consensus models, and use cases."
    },
    {
        name: "Blockchain Specialization",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2020",
        category: "Blockchain",
        link: "https://www.coursera.org/account/accomplishments/specialization/certificate/PP6JELVRVAHC",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Buffalo_DKNjPKCwA?updatedAt=1760627761072",
        body: "A comprehensive multi-course series covering blockchain foundations, smart contracts, decentralized applications (dapps), and enterprise platforms."
    },
    {
        name: "Decentralized Applications (Dapps)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2020",
        category: "Blockchain",
        link: "https://www.coursera.org/account/accomplishments/certificate/24EA362GSZSF",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Buffalo_DKNjPKCwA?updatedAt=1760627761072",
        body: "Covers the architecture, design, and development of decentralized applications, focusing on web3 integration, frontend clients, and smart contracts."
    },
    {
        name: "Smart Contracts",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2020",
        category: "Blockchain",
        link: "https://www.coursera.org/account/accomplishments/certificate/QA8SSY93WSSZ",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Buffalo_DKNjPKCwA?updatedAt=1760627761072",
        body: "Teaches the design, coding, testing, and deployment of secure smart contracts using Solidity, Remix IDE, Truffle, and Metamask."
    },
    {
        name: "Blockchain Basics",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Mar 2020",
        category: "Blockchain",
        link: "https://www.coursera.org/account/accomplishments/verify/7MX9V5K68364",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Buffalo_DKNjPKCwA?updatedAt=1760627761072",
        body: "Provides a foundational overview of blockchain technology, explaining decentralization, cryptography, consensus algorithms, and ledger states."
    },
    {
        name: "Front-End Web UI Framework and Tools: Bootstrap 4",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2020",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/certificate/VDT9F9QAUHBB",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Hong%20Kong_57YKggiyya?updatedAt=1760627867186",
        body: "A HKUST course on modern frontend development, covering responsive grid systems, components, CSS preprocessors (Less/Sass), and build tools."
    },
    {
        name: "Visual Elements of User Interface Designs",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Apr 2020",
        category: "UI/UX",
        link: "https://www.coursera.org/account/accomplishments/certificate/6K7UTD4JL3JD",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/CalArts_XvQ8m9T3T?updatedAt=1760627815070",
        body: "A CalArts course on the visual design layer of UI, focusing on typography, color theory, layout composition, and style guide generation."
    },
    {
        name: "Interactivity with JavaScript",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Aug 2019",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/verify/AAEMW7SD97W7",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Michigan_bIABf4FyD?updatedAt=1760627991245",
        body: "A University of Michigan course teaching DOM manipulation, event-driven programming, form validation, and adding rich interactivity to websites."
    },
    {
        name: "Python Data Structures",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "Jun 2019",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/verify/2RTLH5ZVUHA6",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Michigan_bIABf4FyD?updatedAt=1760627991245",
        body: "Covers core Python data structures including lists, dictionaries, tuples, and files, and how to use them to perform complex text analysis."
    },
    {
        name: "Introduction to CSS3",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2019",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/verify/4RGQMJ2CAHZ3",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Michigan_bIABf4FyD?updatedAt=1760627991245",
        body: "Covers CSS syntax, selectors, typography, box model, layouts (Flexbox), and transitions to style web pages professionally."
    },
    {
        name: "Programming for Everybody (Getting Started with Python)",
        providers: certificateProviders["Coursera"],
        organization: courseOwnerData["Google"],
        issuedDate: "May 2019",
        category: "Programming",
        link: "https://www.coursera.org/account/accomplishments/verify/LFUDUG5ZDC83",
        image: "https://ik.imagekit.io/canarygrapher/yasharyan.dev/Certificates/Instructor/University%20of%20Michigan_bIABf4FyD?updatedAt=1760627991245",
        body: "An introductory course on basic programming concepts using Python, covering variables, conditional execution, loops, and functions."
    },
    {
        name: "Full Stack Programming with Node.js, Express.js, React.js and MySQL",
        providers: certificateProviders["IECSE Manipal"],
        organization: courseOwnerData["Google"],
        issuedDate: "Mar 2019",
        category: "Programming",
        link: "",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/iecseManipal_dWXv5grWvnC.jpg?updatedAt=1639130952909",
        body: "A comprehensive full-stack program by IECSE Manipal covering React interfaces, RESTful API endpoints using Node/Express, and relational databases with MySQL."
    },

]

export type { CertificateData };
export default certificateData;