"use client";

import { useState, useEffect, useRef } from "react";
import HeaderData from "@/data/Headers";
import AdditionalInfo from "@/data/general/AdditionalInfo";
import { HeroSectionData } from "@/data/pages/landing/UserData";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const threshold = 15; // minimum scroll distance in pixels to trigger show/hide
    let accumulatedDiff = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      // Reset accumulated diff if scroll direction changes
      if ((diff > 0 && accumulatedDiff < 0) || (diff < 0 && accumulatedDiff > 0)) {
        accumulatedDiff = 0;
      }

      accumulatedDiff += diff;

      // Force show navbar when at or near the very top
      if (currentScrollY <= 10) {
        setIsVisible(true);
        accumulatedDiff = 0;
      } else if (!isMenuOpen) {
        // Scroll down threshold exceeded -> hide
        if (accumulatedDiff > threshold && currentScrollY > 50) {
          setIsVisible(false);
          accumulatedDiff = 0;
        } 
        // Scroll up threshold exceeded -> show
        else if (accumulatedDiff < -threshold) {
          setIsVisible(true);
          accumulatedDiff = 0;
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      {/* Job Seeking Banner - Static Full Width at the top */}
      {AdditionalInfo.lookingForJob && (
        <div className={`fixed left-0 w-full bg-black/90 backdrop-blur-sm border-b border-white/5 z-50 overflow-hidden h-9 flex items-center transition-all duration-300 ${
          isVisible ? "top-0" : "-top-10"
        }`}>
          <div
            className={`animate-marquee-single whitespace-wrap transition-all duration-300 ${
              isMarqueePaused ? "animate-pause" : ""
            }`}
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
          >
            <div className="flex items-center text-[10px] sm:text-xs text-gray-300 py-2 px-4 whitespace-nowrap uppercase tracking-widest font-extrabold">
              <span>Looking for a job.&nbsp;</span>
              <Link
                href="/page/contacts"
                className="text-emerald-400 hover:text-emerald-300 underline font-extrabold ml-1 animate-pulse"
              >
                Get in touch
              </Link>
              <span>&nbsp;or find social links below.</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Navigation Bar */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[92%] sm:w-[85%] max-w-5xl rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6),_0_0_30px_rgba(16,185,129,0.03)] py-2 px-5 flex items-center justify-between ${
          !isVisible ? "-top-24" : AdditionalInfo.lookingForJob ? "top-[52px]" : "top-5"
        }`}
      >
        {/* Left Side: Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2 group px-2 py-1">
          <Image
            src={HeaderData.logo.src}
            alt="Logo"
            width={20}
            height={20}
            className="group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-black text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 hidden sm:block">
            {HeroSectionData.name.split(" ")[0]}
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {HeaderData.links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="text-[10px] font-black text-gray-300 hover:text-emerald-400 hover:bg-emerald-950/40 px-4 py-2 rounded-full transition-all duration-300 uppercase tracking-widest"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Right Side: CTA Button or Hamburger Icon */}
        <div className="flex items-center gap-3">
          {/* "Let's Talk" Button - Desktop & Tablet */}
          <Link
            href="/page/contacts"
            className="hidden xs:flex relative group overflow-hidden bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 shadow-md shadow-green-950/20 hover:shadow-emerald-950/40 items-center gap-1.5"
          >
            <span>Let&apos;s Talk</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-300"></span>
            </span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 hover:bg-white/5 rounded-full p-1 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-green-950/90 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-300 ease-in-out z-50 md:hidden shadow-2xl flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <Link href="/" onClick={toggleMenu} className="flex items-center gap-2">
            <Image
              src={HeaderData.logo.src}
              alt="Logo"
              width={24}
              height={24}
            />
            <span className="font-black text-xs uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
              {HeroSectionData.name.split(" ")[0]}
            </span>
          </Link>
          <button
            onClick={toggleMenu}
            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/5 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 px-6 py-8 flex flex-col justify-between">
          <ul className="space-y-5">
            {HeaderData.links.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-xl font-bold text-gray-300 hover:text-emerald-400 hover:translate-x-2 transition-all duration-300 block py-1.5 uppercase tracking-wider"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Let's Talk CTA in Mobile Drawer */}
          <Link
            href="/page/contacts"
            onClick={toggleMenu}
            className="w-full justify-center relative flex group overflow-hidden bg-gradient-to-r from-emerald-600 to-green-700 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 shadow-lg items-center gap-2 mb-6"
          >
            <span>Let&apos;s Talk</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-300"></span>
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
};
