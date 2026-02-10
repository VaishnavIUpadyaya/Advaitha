"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ChatWidget() {
  const pathname = usePathname();

  if (pathname === "/assistant") return null;

  return (
    <Link href="/assistant" className="fixed bottom-8 right-8 z-[999] group">
      <div className="relative">

        <span className="absolute right-full mr-5 px-4 py-2 rounded-xl bg-[#1e293b] text-[#38bdf8] text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 pointer-events-none whitespace-nowrap border border-[#38bdf8]/20 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          System Online
        </span>

        <motion.div 
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-14 bg-[#1e293b] rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center border-b-4 border-black/20"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-1 h-4 bg-[#64748b]"></div>
            <div className="w-3 h-3 bg-[#94a3b8] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"></div>
          </div>

          <div className="absolute -left-1 w-2 h-6 bg-[#0f172a] rounded-full" />
          <div className="absolute -right-1 w-2 h-6 bg-[#0f172a] rounded-full" />
          <div className="w-[80%] h-[65%] bg-[#0f172a] rounded-xl flex items-center justify-center gap-2 border border-white/5">
            <div className="relative w-3 h-3 rounded-full bg-[#22d3ee] shadow-[0_0_12px_#22d3ee]">
              <motion.div 
                animate={{ opacity: [1, 0.1, 1] }} 
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2] }}
                className="absolute inset-0 bg-[#22d3ee] rounded-full"
              />
            </div>
            <div className="relative w-3 h-3 rounded-full bg-[#22d3ee] shadow-[0_0_12px_#22d3ee]">
              <motion.div 
                animate={{ opacity: [1, 0.1, 1] }} 
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2] }}
                className="absolute inset-0 bg-[#22d3ee] rounded-full"
              />
            </div>
          </div>
        </motion.div>
        <div className="absolute -inset-3 rounded-full border border-[#22d3ee]/20 scale-75 group-hover:scale-110 group-hover:opacity-100 opacity-0 transition-all duration-700 pointer-events-none animate-pulse" />
      </div>
    </Link>
  );
}