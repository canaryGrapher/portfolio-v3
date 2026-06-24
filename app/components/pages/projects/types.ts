export interface Project {
    name: string;
    description: string;
    projectLink: Array<{
        linkName: string;
        link: string;
    }>;
    associatedWith: string | null;
    associatedWithImage?: string;
    startDate: string;
    endDate: string;
    technologies: Array<{
        name: string;
        icon: string;
    }>;
    image: string;
}

export interface ProjectsGridProps {
    projects: Project[];
}

export interface ProjectCardProps {
    project: Project;
    variant: 'green' | 'white';
    span?: number;
    formatDateRange: (startDate: string, endDate: string) => string;
    onClick: () => void;
}

export interface ProjectModalProps {
    project: Project;
    formatDateRange: (startDate: string, endDate: string) => string;
    onClose: () => void;
}


