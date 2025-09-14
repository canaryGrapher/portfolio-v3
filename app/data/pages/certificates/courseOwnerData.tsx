import { StaticImageData } from "next/image";

type CourseOwnerData = {
    name: string;
    image: StaticImageData | string;
}

type CourseOwnerRecordType = Record<string, CourseOwnerData>;

const courseOwnerData: CourseOwnerRecordType = {
    "Google": {
        name: "Google",
        image: "https://ik.imagekit.io/canarygrapher/Portfolio/home/Certificates/canaryGrapher_Q2yi-4dUALuR.jpg?updatedAt=1639174719460"
    }
}



export default courseOwnerData;