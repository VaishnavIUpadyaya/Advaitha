"use client";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 ${
        isScrolled
          ? "bg-[#0f1115]/95 backdrop-blur-md py-3 shadow-2xl border-b border-white/5"
          : "bg-[#0f1115] py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#d4846d] flex items-center justify-center font-bold text-[#0f1115] text-xs shadow-lg">
            A
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase font-marcellus text-white/90">
            Advaitha
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-[0.2em] text-white/90">
          <a href="/about_us" className="hover:opacity-70 transition-opacity">About us</a>
          <a href="/settings" className="hover:opacity-70 transition-opacity">Settings</a>
          <a href="/profile" className="hover:opacity-70 transition-opacity">Profile</a>
          <a href="/products" className="hover:opacity-70 transition-opacity">Products</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => (window.location.href = "/assistant")}
            className="hidden md:inline-flex px-6 py-2 rounded-full border border-[#d4846d] text-white/90 text-[10px] font-bold uppercase tracking-widest hover:bg-[#d4846d] hover:text-[#0f1115] transition-all duration-300"
          >
            Support
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-white/10 rounded-full"
          >
            <span className={`w-5 h-[2px] bg-white transition-all ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`w-5 h-[2px] bg-white my-[3px] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-[2px] bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 px-4 pb-6">
          <div className="flex flex-col space-y-6 text-sm uppercase tracking-[0.2em] text-white/90">
            <a href="/about_us" onClick={() => setMenuOpen(false)} className="hover:opacity-70">About us</a>
            <a href="/settings" onClick={() => setMenuOpen(false)} className="hover:opacity-70">Settings</a>
            <a href="/profile" onClick={() => setMenuOpen(false)} className="hover:opacity-70">Profile</a>
            <a href="/products" onClick={() => setMenuOpen(false)} className="hover:opacity-70">Products</a>

            <button
              onClick={() => (window.location.href = "/assistant")}
              className="mt-4 px-6 py-3 rounded-full border border-[#d4846d] text-white/90 text-[10px] font-bold uppercase tracking-widest hover:bg-[#d4846d] hover:text-[#0f1115] transition-all duration-300"
            >
              Support
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
