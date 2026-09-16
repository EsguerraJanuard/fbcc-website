"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Ministries", href: "/ministries" },
    { name: "Sermons", href: "/sermons" },
    { name: "Gallery", href: "/gallery" },
    { name: "Prayer Wall", href: "/prayer-wall" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm py-3' : 'bg-white dark:bg-gray-950 py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center gap-3 group">
            <img src="/logo.jpg" alt="FBCC Logo" className="w-10 h-10 rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300" />
            <span className="text-2xl font-serif font-bold text-fbcc-navy dark:text-gray-100 tracking-tight">
              FBCC
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  pathname === link.href 
                    ? "text-fbcc-ocean dark:text-blue-300 bg-blue-50/80 dark:bg-blue-900/30 font-bold shadow-sm" 
                    : "text-gray-700 dark:text-gray-300 hover:text-fbcc-ocean dark:hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/giving" 
              onClick={(e) => handleNavClick(e, "/giving")}
              className="ml-4 px-6 py-2.5 text-sm font-bold text-white bg-fbcc-earth hover:bg-green-700 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Give
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white dark:bg-gray-950 shadow-xl transition-all duration-300 ease-in-out border-b border-gray-100 dark:border-gray-800 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                pathname === link.href
                  ? "text-fbcc-ocean dark:text-blue-300 bg-blue-50/50 dark:bg-blue-900/20 font-bold border-l-4 border-fbcc-ocean dark:border-blue-300"
                  : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-fbcc-ocean dark:hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-300 border-l-4 border-transparent"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/giving" 
            onClick={(e) => handleNavClick(e, "/giving")}
            className="block px-4 py-3 mt-4 text-base font-bold text-center text-white bg-fbcc-earth rounded-lg"
          >
            Support Our Mission
          </Link>
        </div>
      </div>
    </nav>
  );
}
