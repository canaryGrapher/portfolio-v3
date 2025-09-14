import FooterData from "@/data/Footer";
import { HeroSectionData } from "@/data/pages/landing/UserData";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-5 px-6">
      <div className="grid grid-cols-1 md:grid-cols-5 max-w-7xl mx-auto items-start lg:items-center min-h-[200px]">
        {/* Personal Branding Section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-x-3 col-span-5 md:col-span-1">
          <Image src={FooterData.logo.src} alt="Logo" width={40} height={40} />
          <div className="text-center md:text-left"> 
            <h3 className="font-bold text-black text-lg">{HeroSectionData.name}</h3>
            <p className="text-black text-sm">{HeroSectionData.title.join('. ')}</p>
          </div>
        </div>

        {/* Motivational Quote Section */}
        <div className="flex-1 flex justify-center col-span-5 md:col-span-2 px-10 my-5 md:my-0">
          <blockquote className="text-gray-600 text-center md:text-left italic max-w-md">
            &quot;{FooterData.quote}&quot;
          </blockquote>
        </div>

        {/* Links Section */}
        <div className="flex flex-col-reverse md:flex-row justify-evenly space-x-8 col-span-5 md:col-span-2">
          {FooterData.linksRow.map((row, index) => (
            <div key={index} className="flex flex-col text-center md:text-left w-full">
              <h4 className="font-bold text-black text-sm mb-2">{row.rowTitle}</h4>
              <div className={`grid grid-cols-${row.links.length} md:grid-cols-1 space-y-1 mb-5 md:mb-0 mx-auto md:mx-0`}>
                {row.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-black text-sm hover:text-gray-600 transition-colors"
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};