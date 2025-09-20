import Socials from "@/data/general/Socials";
import Image from "next/image";

const ContactsSocials = () => {
    return (
        <div className="flex flex-col justify-center h-full space-y-2">
            {Socials.map((social, keyIndex) => (
                <div key={keyIndex} className="flex flex-row items-center gap-2 py-5">
                    <Image src={social.image} alt={social.name} className="w-8 h-8" />
                    <a 
                        href={social.href} 
                        className="text-blue-600 hover:text-blue-700 transition-colors"
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