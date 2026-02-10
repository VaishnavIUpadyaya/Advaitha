"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AssistantPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage() {
    if (!query.trim() || loading) return;

    const userText = query.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userText, history: messages }),
      });

      const data = await res.json();
      const botText = data?.reply || data?.text || "I'm sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0f1115] text-[#f7efe7] selection:bg-[#b46247]/30">

      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 relative">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-[#b46247]/5 blur-[120px] pointer-events-none rounded-full" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex flex-col h-[75vh] backdrop-blur-xl shadow-2xl overflow-hidden relative z-10"
        >

          <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h1 className="text-sm font-bold tracking-widest uppercase">Advaitha Assistant</h1>
            </div>
            <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Encrypted Session</span>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 px-10">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center italic font-serif">A</div>
                <p className="text-sm italic">Ask me about your skin type, routine optimization, or ingredient safety.</p>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-[#b46247] text-white rounded-tr-none shadow-lg shadow-[#b46247]/10" 
                        : "bg-white/10 text-slate-200 rounded-tl-none border border-white/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white/5 border-t border-white/10">
            <div className="relative flex items-center gap-2">
              <input
                className="flex-1 bg-white/5 border border-white/10 px-6 py-4 rounded-full text-sm focus:outline-none focus:border-[#b46247] transition-all placeholder:text-white/20"
                placeholder="Message Advaitha AI..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
              />
              <button
                className="absolute right-2 p-3 bg-[#b46247] hover:bg-[#d4846d] rounded-full transition-all disabled:opacity-40 disabled:hover:bg-[#b46247]"
                onClick={sendMessage}
                disabled={loading || !query.trim()}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-center mt-3 opacity-30 uppercase tracking-[0.2em]">
              AI may provide general advice; consult a doctor for clinical concerns.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}