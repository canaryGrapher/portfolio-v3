import { StaticImageData } from "next/image";

interface ProfessionalExperience {
  companyName: string;
  bannerImage: StaticImageData;
  popupImage: StaticImageData;
  jobTitle: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  companyDescription: string;
  rolesAndResponsibilities: {
    title: string;
    duration: string;
    description: string[];
    employmentType: string;
  }[];
  experienceGained: {
    name: string;
    technologies: {
      icon: StaticImageData;
      name: string;
    }[];
  }[];
  companyColor: string;
  gradientColors: string[];
}

interface VolunteerExperience {
  companyName: string;
  companyDescription: string;
  category: string;
  companyLogo: StaticImageData;
  role: string; 
  companyColor: string;
  responsibilities: {
    date: string;
    description: string[];
  }[];
}

interface WorkExperience {
  professionalWorkExperience: ProfessionalExperience[];
  volunteerWorkExperience: VolunteerExperience[];
}

export type { WorkExperience, ProfessionalExperience, VolunteerExperience };
