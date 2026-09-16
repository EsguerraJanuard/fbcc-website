"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-fbcc-navy text-fbcc-white mt-auto relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5 pointer-events-none">
        <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99z" /></svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="FBCC Logo" className="w-12 h-12 rounded-full border-2 border-white/20 shadow-md p-0.5 bg-white" />
              <span className="font-serif font-bold text-xl tracking-tight leading-tight">First Baptist Church<br/><span className="text-blue-300 text-sm">of Cabalantian</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              "The lahar may have buried our building, but it could not bury His church."<br/><br/>
              Shining the light of Christ in San Fernando, Pampanga, and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm tracking-widest uppercase text-blue-300 mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/" onClick={(e) => handleLinkClick(e, "/")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Home</Link></li>
              <li><Link href="/about" onClick={(e) => handleLinkClick(e, "/about")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Our Story</Link></li>
              <li><Link href="/ministries" onClick={(e) => handleLinkClick(e, "/ministries")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Ministries</Link></li>
              <li><Link href="/sermons" onClick={(e) => handleLinkClick(e, "/sermons")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Sermons Archive</Link></li>
              <li><Link href="/gallery" onClick={(e) => handleLinkClick(e, "/gallery")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-sm tracking-widest uppercase text-emerald-400 mb-6">Connect</h3>
            <ul className="space-y-3">
              <li><Link href="/prayer-wall" onClick={(e) => handleLinkClick(e, "/prayer-wall")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Prayer Wall</Link></li>
              <li><Link href="/contact" onClick={(e) => handleLinkClick(e, "/contact")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Contact Us</Link></li>
              <li><Link href="/giving" onClick={(e) => handleLinkClick(e, "/giving")} className="text-gray-300 hover:text-white hover:translate-x-1 inline-block transition-all text-sm">Support Our Mission</Link></li>
            </ul>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="font-bold text-sm tracking-widest uppercase text-gray-500 mb-6 text-white">Visit Us</h3>
            <address className="text-gray-300 not-italic space-y-1 text-sm leading-relaxed mb-6">
              <p>Purok 1, Bulaon</p>
              <p>City of San Fernando</p>
              <p>Pampanga, Philippines</p>
            </address>
            <a href="https://www.facebook.com/fbccabalantian" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] hover:text-white border border-[#1877F2]/30 px-5 py-2.5 rounded-full transition-all text-sm font-bold group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              Follow on Facebook
            </a>
          </div>
          
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-center text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">
            &copy; {new Date().getFullYear()} First Baptist Church of Cabalantian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
