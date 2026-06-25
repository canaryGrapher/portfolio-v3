"use client";

import FooterData from "@/data/Footer";
import { HeroSectionData } from "@/data/pages/landing/UserData";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";

export const Footer = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-black pb-8 pt-4">
      <footer className="relative overflow-hidden w-[92%] sm:w-[85%] max-w-7xl mx-auto rounded-3xl bg-neutral-950/50 backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_40px_rgba(16,185,129,0.02)] p-8 sm:p-12">
        {/* Glow effect */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-950/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-green-950/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Section 1: Branding & Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Branding */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl shadow-inner">
                <Image src={FooterData.logo.src} alt="Logo" width={32} height={32} />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 text-lg leading-tight uppercase tracking-wider">
                  {HeroSectionData.name}
                </h3>
                <p className="text-gray-400 text-[9px] mt-1.5 uppercase tracking-widest font-black flex flex-wrap gap-1">
                  {HeroSectionData.title.map((t, idx) => (
                    <span key={idx} className="flex items-center">
                      {t}
                      {idx < HeroSectionData.title.length - 1 && (
                        <span className="text-emerald-500 font-black ml-1">.</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-md mt-1 hidden lg:block">
              Building high-fidelity interactive interfaces, cloud services, and clean developer experiences with forest green style cues.
            </p>
          </div>

          {/* Quote */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center py-4 lg:py-0 min-h-[80px]">
            <blockquote className="text-gray-300 text-center lg:text-right italic max-w-sm text-xs sm:text-sm leading-relaxed relative px-4 lg:px-0">
              <span className="absolute -left-1 lg:hidden -top-3 text-3xl font-serif text-emerald-500/20 leading-none">&ldquo;</span>
              &quot;{FooterData.quote}&quot;
              <span className="absolute -right-1 lg:hidden bottom-0 text-3xl font-serif text-emerald-500/20 leading-none">&rdquo;</span>
            </blockquote>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/5 my-8 relative z-10" />

        {/* Section 2: Horizontal Links Row */}
        <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center gap-6 relative z-10">
          {/* Socials Link Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest md:mr-2 flex-shrink-0">
              Social Profiles
            </span>
            <div className="flex flex-wrap gap-2">
              {FooterData.linksRow[0].links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-emerald-950/30 border border-white/5 hover:border-emerald-500/30 text-gray-300 hover:text-emerald-400 text-xs font-bold transition-all duration-300 shadow-sm hover:scale-[1.03]"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          {/* Reach Out Link Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest md:mr-2 flex-shrink-0">
              Get In Touch
            </span>
            <div className="flex flex-wrap gap-2">
              {FooterData.linksRow[1].links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : "_self"}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white text-xs font-extrabold transition-all duration-300 shadow-md shadow-green-950/20 hover:scale-[1.03]"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-white/5 my-8 relative z-10" />

        {/* Section 3: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left relative z-10">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">
            &copy; {new Date().getFullYear()} {HeroSectionData.name}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[9px] text-gray-400 hover:text-emerald-400 hover:scale-105 transition-all duration-300 font-black uppercase tracking-widest bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-900/30 px-4 py-2 rounded-full cursor-pointer shadow-md shadow-emerald-950/10"
          >
            <span>Back to Top</span>
            <FaArrowUp className="text-[8px]" />
          </button>
        </div>
      </footer>
    </div>
  );
};