import { StaticImageData } from "next/image";
import { Publications } from "@/assets/images";

interface Publications {
  name: string;
  publicationsParent: string;
  link: string;
  image: StaticImageData;
}

const publications: Record<string, Publications> = {
  "3rd IEEE International Conference on Intelligent Engineering and Management (ICIEM) 2022":
    {
      name: "3rd IEEE International Conference on Intelligent Engineering and Management (ICIEM) 2022",
      publicationsParent: "IEEE",
      link: "",
      image: Publications.Publishers.IEEE,
    },
};

export type { Publications };
export default publications;
