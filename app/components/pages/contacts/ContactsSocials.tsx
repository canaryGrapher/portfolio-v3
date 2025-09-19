import Socials from "@/data/general/Socials";
import Image from "next/image";

const ContactsSocials = () => {
    return (
        <div className="flex flex-col justify-evenly h-full space-y-6">
            {Socials.map((social, keyIndex) => (
                <div key={keyIndex} className="flex flex-row items-center gap-3">
                    <Image src={social.image} alt={social.name} className="w-6 h-6" />
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