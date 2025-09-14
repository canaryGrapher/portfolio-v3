import { StaticImageData } from 'next/image';

export interface Project {
    id: number;
    name: string;
    description: string;
    projectLink: Array<{
        linkName: string;
        link: string;
    }>;
    associatedWith: string | null;
    associatedWithImage?: StaticImageData;
    startDate: string;
    endDate: string;
    technologies: Array<{
        name: string;
        icon: StaticImageData;
    }>;
    image: StaticImageData;
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

export interface ImagePlaceholderProps {
    isWideBox: boolean;
    imageIndex: number;
    span?: number;
}
