import { Photos } from "@/assets/images";
import Image from "next/image";

const PhotosFooter = () => {
  return (
    <div className="flex flex-col items-center gap-3 text-center pt-16 pb-8 border-t border-dashed border-gray-300/30 mt-12 w-full clear-both">
        <div className="flex flex-row items-center gap-5 grayscale opacity-70 hover:opacity-100 transition-opacity duration-300">
            <Image src={Photos.iPhone} alt="iPhone" width={24} height={24} className="object-contain" />
            <Image src={Photos.DJIAction} alt="DJI Action" width={20} height={20} className="object-contain" />
            <Image src={Photos.SonyCyberShot} alt="Sony Cyber-Shot" width={38} height={38} className="object-contain" />
        </div>
        <div className="mt-2">
            <p className="text-sm font-bold text-green-800 tracking-wide uppercase">Photos captured by site owner</p>
            <p className="text-[11px] font-semibold text-gray-500 mt-1">All rights reserved &copy; {new Date().getFullYear()}</p>
        </div>
    </div>
  )
}

export default PhotosFooter