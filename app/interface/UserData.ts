import { StaticImageData } from "next/image";

interface WorkExperience {
    professionalWorkExperience: Array<{
    companyName: string;
    bannerImage: StaticImageData;
    jobTitle: string;
    employmentType: string;
    startDate: string;
    endDate: string;
    companyDescription: string;
    rolesAndResponsibilities: Array<{
        title: string;
        duration: string;
        description: string[];
    }>;
    experienceGained: Array<{
        name: string;
        technologies: Array<{
            icon: StaticImageData;
            name: string;
        }>
    }>;
        companyColor: string;
        gradientColors: string[];
    }>;
    volunteerWorkExperience: Array<{
        companyName: string;
        companyDescription: string;
        category: string;
        companyLogo: StaticImageData;
        role: string;
        companyColor: string;
        responsibilities: Array<{
            date: string;
            description: string[];
        }>;
    }>;
}

export type { WorkExperience };