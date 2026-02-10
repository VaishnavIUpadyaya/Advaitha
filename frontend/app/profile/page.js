"use client";

import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firestore";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const uid = user.uid;

        const userSnap = await getDoc(doc(db, "users", uid));
        const analysisSnap = await getDoc(doc(db, "analysisResults", uid));

        setUserInfo({
          name:
            user.displayName ||
            (userSnap.exists() ? userSnap.data().name : "User"),
          email: user.email,
          ...(userSnap.exists() ? userSnap.data() : {}),
        });

        if (analysisSnap.exists()) {
          setAnalysis(analysisSnap.data().analysis);
        }
      } catch (err) {
        console.error("profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#b46247] text-[#f7efe7] selection:bg-[#b46247]/30">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/leaves.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-12 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-[#b46247]/5 blur-[120px] pointer-events-none rounded-full" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl bg-black/90 border border-white/10 rounded-[2.5rem] flex flex-col h-[80vh] backdrop-blur-xl shadow-2xl overflow-hidden relative z-10"
          >
            <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b46247] animate-pulse shadow-[0_0_10px_#b46247]" />
                <h1 className="text-sm font-bold tracking-widest uppercase">
                  Advaitha Profile
                </h1>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <p className="text-xs uppercase tracking-widest">
                    Retrieving Data...
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 transition-all hover:bg-white/[0.07]">
                      <h2 className="text-[10px] text-[#b46247] font-bold tracking-[0.2em] uppercase mb-4">
                        Account
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] opacity-40 uppercase mb-1">
                            Full Name
                          </p>
                          <p className="text-sm font-medium">
                            {userInfo?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] opacity-40 uppercase mb-1">
                            Email Address
                          </p>
                          <p className="text-sm font-medium opacity-80">
                            {userInfo?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 transition-all hover:bg-white/[0.07]">
                      <h2 className="text-[10px] text-[#b46247] font-bold tracking-[0.2em] uppercase mb-4">
                        Skin Profile
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] opacity-40 uppercase mb-1">
                            Type
                          </p>
                          <p className="text-sm">{userInfo?.skinType || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] opacity-40 uppercase mb-1">
                            Diet
                          </p>
                          <p className="text-sm">{userInfo?.diet || "—"}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[10px] opacity-40 uppercase mb-1">
                            Sensitivity Level
                          </p>
                          <p className="text-sm">
                            {userInfo?.sensitivity || "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <h2 className="text-[10px] text-[#b46247] font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#b46247] rounded-full" />
                      Skin Analysis Result
                    </h2>

                    {analysis ? (
                      <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300 font-sans">
                          {analysis}
                        </pre>
                      </div>
                    ) : (
                      <div className="h-32 flex items-center justify-center border border-dashed border-white/10 rounded-2xl opacity-30">
                        <p className="text-sm italic">
                          No analysis generated yet.
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="px-8 py-4 bg-white/5 border-t border-white/10">
              <p className="text-[10px] text-center opacity-30 uppercase tracking-[0.2em]">
                Skin Profile & Diagnostics
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
