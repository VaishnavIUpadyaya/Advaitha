import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4 ${
        isScrolled 
          ? "bg-[#0f1115]/80 backdrop-blur-lg border-b border-white/10 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#b46247] to-[#d4846d] flex items-center justify-center font-bold text-white text-xs">
            A
          </div>
          <span className="text-xl font-bold tracking-tighter text-white uppercase font-[marcellus]">
            Advaitha
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="/about_us" className="hover:text-[#d4846d] transition-colors">About us</a>
          <a href="/settings" className="hover:text-[#d4846d] transition-colors">Settings</a>
          <a href="/profile" className="hover:text-[#d4846d] transition-colors">Profile</a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="px-5 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
            Support
          </button>
        </div>
      </div>
    </nav>
  );
}