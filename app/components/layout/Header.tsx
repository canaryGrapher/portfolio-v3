"use client";

import { useState } from "react";
import HeaderData from "@/data/Headers";
import AdditionalInfo from "@/data/general/AdditionalInfo";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-black absolute top-0 left-0 w-full z-50`}>
      {/* Main Header Content */}
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src={HeaderData.logo.src}
            alt="Logo"
            width={20}
            height={20}
            className="mx-3"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-row md:justify-evenly w-[75%] mx-auto">
          {HeaderData.links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="text-sm font-bold text-gray-300 hover:text-white mx-5 uppercase">
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
          />
        </button>
      </div>

      {/* Job Seeking Banner */}
      {AdditionalInfo.lookingForJob && (
        <div className="bg-black border-t border-gray-800 overflow-hidden">
          <div
            className={`animate-marquee-single whitespace-wrap transition-all duration-300 ${isMarqueePaused ? 'animate-pause' : ''
              }`}
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
          >
            <div className="flex items-center text-sm text-gray-300 py-2 px-4">
              <span>The developer of this website is looking for a job.&nbsp;</span>
              <Link
                href="/contacts"
                className="text-white hover:text-blue-400 underline font-semibold ml-1"
              >
                Click here
              </Link>
              <span>&nbsp;to contact, or see the footer for social links to reach out.</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={toggleMenu} />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <Image
              src={HeaderData.logo.src}
              alt="Logo"
              width={24}
              height={24}
            />
            <button
              onClick={toggleMenu}
              className="w-8 h-8 flex items-center justify-center"
              aria-label="Close menu"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-6">
              {HeaderData.links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className="text-2xl font-black text-gray-300 hover:text-white transition-colors duration-200 block py-1"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
