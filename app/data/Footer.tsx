import { Logo } from "@/assets/vectors";

const FooterData = {
  logo: Logo,
  quote: "People don't care about what you say, they care about what you build.",
  linksRow: [
    {
        rowTitle: "Socials",
        links: [
            {
                title: "LinkedIn",
                href: "https://www.linkedin.com/in/yasharyan/",
            },
            {
                title: "GitHub",
                href: "https://github.com/canaryGrapher",
            },
            {
                title: "Instagram",
                href: "https://www.instagram.com/lifethrottling",
            },
            {
                title: "Twitter",
                href: "https://x.com/canaryGrapher",
            },
            {
                title: "Dev.to",
                href: "https://dev.to/canarygrapher",
            }
        ],
    },
    {
        rowTitle: "Reach Out",
        links: [
            {
                title: "Email",
                href: "mailto:hello@yasharyan.com",
            },
            {
                title: "Resume",
                href: "/resume",
            },
            {
                title: "Calendly",
                href: "https://cal.com/yasharyan",
            },
        ],
    },
  ],
};

export default FooterData;