import Socials from "@/data/general/Socials";
import Image from "next/image";

const ContactsSocials = () => {
    return (
        <div className="flex flex-col justify-center h-full gap-4 w-full max-w-sm mx-auto md:mx-0">
            <h3 className="text-green-800 uppercase tracking-widest text-[10px] font-black border-b border-gray-200 pb-2 mb-2 text-center md:text-left">
                Connect Online
            </h3>
            {Socials.map((social, keyIndex) => (
                <div key={keyIndex} className="flex flex-row items-center gap-4 py-1.5 px-3 bg-white/50 backdrop-blur-sm border border-gray-200/60 rounded-2xl hover:border-green-200/40 hover:bg-green-50/20 transition-all duration-300 group shadow-sm">
                    <div className="w-10 h-10 bg-white border border-gray-200/60 rounded-xl flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <Image src={social.image} alt={social.name} className="w-6 h-6 object-contain" />
                    </div>
                    <a 
                        href={social.href} 
                        className="text-gray-700 hover:text-green-800 transition-colors font-extrabold uppercase text-xs tracking-widest group-hover:translate-x-1.5 transition-transform duration-300 flex-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {social.name}
                    </a>
                </div>
            ))}
        </div>
    )
}

export default ContactsSocials;