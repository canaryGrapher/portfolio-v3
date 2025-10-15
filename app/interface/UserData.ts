interface ProfessionalExperience {
  companyName: string;
  bannerImage: string;
  popupImage: string;
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
      icon: string;
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
  companyLogo: string;
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
