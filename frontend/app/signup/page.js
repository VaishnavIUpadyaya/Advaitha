"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LeafBackground from "../components/LeafBackground";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        createdAt: new Date(),
      });
      await updateProfile(cred.user, {
        displayName: name,
      });
      router.push("/onboarding");
    } catch (err) {
      setError(err.code.replace("auth/", "").replaceAll("-", " "));
    }
  };

  return (
    <LeafBackground>
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-[460px] bg-[#f8f1ec] rounded-[28px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="flex justify-center pt-8 px-8">
            <Image
              src="/signup.jpg"
              alt="Skincare"
              width={160}
              height={200}
              priority
              className="rounded-[18px] object-cover"
            />
          </div>

          <div className="px-10 py-10 text-center">
            <h2 className="font-[marcellus] text-[2rem] font-medium text-[#3a2416] mb-2">
              Create Account
            </h2>

            <div className="text-[0.9rem] text-[#6f3f2b] mb-8">
              Start your personalized skincare journey
            </div>

            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-[0.9rem] mb-5 rounded-[12px] bg-[#f0e4dc] text-[#3a2416] text-[0.95rem] placeholder-[#7a5a48] focus:outline-none focus:bg-[#ead8cd]"
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-[0.9rem] mb-5 rounded-[12px] bg-[#f0e4dc] text-[#3a2416] text-[0.95rem] placeholder-[#7a5a48] focus:outline-none focus:bg-[#ead8cd]"
              />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-[0.9rem] mb-5 rounded-[12px] bg-[#f0e4dc] text-[#3a2416] text-[0.95rem] placeholder-[#7a5a48] focus:outline-none focus:bg-[#ead8cd]"
              />

              {error && (
                <div className="text-[0.85rem] text-[#9c1c1c] mb-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="font-[marcellus] w-full py-[0.95rem] bg-gradient-to-br from-[#6f3f2b] to-[#4a2a1c] text-white rounded-full text-[0.95rem] shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all duration-300"
              >
                Sign up
              </button>
            </form>

            <button
              onClick={() => router.push("/login")}
              className="mt-6 text-[0.85rem] text-[#6f3f2b] hover:underline w-full"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </LeafBackground>
  );
}
