import { Photos } from "@/assets/images";
import Image from "next/image";

const PhotosFooter = () => {
  return (
    <div className="flex flex-col items-center gap-2 text-center pt-10">
        <div className="flex flex-row items-baseline gap-4">
            <Image src={Photos.iPhone} alt="iPhone" width={32} height={32} />
            <Image src={Photos.DJIAction} alt="DJIAction" width={24} height={24} />
            <Image src={Photos.SonyCyberShot} alt="SonyCyberShot" width={46} height={46} />
        </div>
        <div>
            <p className="text-lg text-[#033EDF]">Photos captured by site owner</p>
            <p className="text-sm text-gray-500">All rights reserved</p>
        </div>
    </div>
  )
}

export default PhotosFooter