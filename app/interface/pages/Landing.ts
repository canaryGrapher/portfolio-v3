import { StaticImageData } from 'next/image';
import { ProfessionalExperience, VolunteerExperience } from '@/interface/UserData';

// Base types
interface BasePopupProps<T> {
    isOpen: boolean;
    onClose: () => void;
    experience: T;
}

interface BaseCardProps<T> {
    index: number;
    ref: React.RefObject<HTMLDivElement>;
    onExpand: () => void;
    experience: T;
}

interface BaseProps {
    className?: string;
}

// Specific implementations
type AbstractBackgroundProps = {
    backgroundWallpaper: StaticImageData;
};

type VolunteerPopupProps = BasePopupProps<VolunteerExperience | null>;
type ProfessionalExperiencePopupProps = BasePopupProps<ProfessionalExperience>;

type ExperienceCardProps = BaseCardProps<ProfessionalExperience>;
type VolunteerCardProps = BaseCardProps<VolunteerExperience>;

type ScrollSliderProps = {
    isAutoScrolling: boolean;
    progress: number;
    onToggleAutoScroll: () => void;
    onSeek: (progress: number) => void;
};

type RelatedWorkCardProps = {
    title: string;
    preText: string;
    image: StaticImageData;
    pageRoute: string;
    relatedWorkRef: React.RefObject<HTMLDivElement>;
};

type SkillCardProps = {
    icon: string;
    title: string;
    description: string;
} & BaseProps;

interface CarPlayIconProps {
    title: string;
    icon: StaticImageData;
    pageRoute: string;
    active: boolean;
}

interface CarPlayDeviceProps {
    icons: CarPlayIconProps[];
}

interface AbstractImageProps {
    className?: string;
    image: StaticImageData;
}

export type { 
    AbstractBackgroundProps, 
    VolunteerPopupProps, 
    ExperienceCardProps, 
    BaseProps as ClassNameProps, 
    ProfessionalExperiencePopupProps, 
    ScrollSliderProps, 
    RelatedWorkCardProps, 
    SkillCardProps, 
    VolunteerCardProps,
    CarPlayDeviceProps,
    AbstractImageProps
};