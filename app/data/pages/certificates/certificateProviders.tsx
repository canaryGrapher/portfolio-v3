import { Certificates } from "@/assets/images";
import { StaticImageData } from "next/image";

type CertificateProvider = {
    name: string;
    icon: StaticImageData;
}

type ProviderRecordType = Record<string, CertificateProvider>;

const certificateProviders: ProviderRecordType = {
    "Udemy": {
        name: "Udemy",
        icon: Certificates.Icons.UdemyIcon,
    },
    "Binance": {
        name: "Binance",
        icon: Certificates.Icons.BinanceIcon,
    },
    "Codecademy": {
        name: "Codecademy",
        icon: Certificates.Icons.CodecademyIcon,
    },
    "Coursera": {
        name: "Coursera",
        icon: Certificates.Icons.CourseraIcon,
    },
    "HP LIFE": {
        name: "HP LIFE",
        icon: Certificates.Icons.HPLifeIcon,
    },
    "IECSE Manipal": {
        name: "IECSE Manipal",
        icon: Certificates.Icons.IECSEManipalIcon,
    },
    "LetsUpgrade": {
        name: "LetsUpgrade",
        icon: Certificates.Icons.LetsUpgradeIcon,
    },
    "LinkedIn Learning": {
        name: "LinkedIn Learning",
        icon: Certificates.Icons.LinkedInLearningIcon,
    },
    "Microsoft Student Partners India": {
        name: "Microsoft Student Partners India",
        icon: Certificates.Icons.MicrosoftIcon,
    },
}

export default certificateProviders;