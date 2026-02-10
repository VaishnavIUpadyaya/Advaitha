"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#b46247]">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/leaves.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="relative w-[920px] bg-[#f4efdf] rounded-[18px] pl-[7rem] pr-12 pt-16 pb-12 shadow-[0_30px_60px_rgba(0,0,0,0.35)] grid grid-cols-2 gap-12">
          <div className="absolute left-[-70px] top-1/2 -translate-y-1/2 w-[300px] h-[420px] rounded-[24px_24px_60px_24px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
            <Image
              src="/login2.jpg"
              alt="Skincare"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="col-start-2">
            <h2 className="font-[marcellus] text-[2rem] font-medium text-[#2b1a12] mb-2">
              Welcome Back
            </h2>

            <div className="text-[0.9rem] text-[#5a4638] mb-8">
              Continue your personalized skincare journey
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-[0.9rem] mb-5 rounded-[10px] bg-[#ebe5d6] text-[0.95rem] focus:outline-none focus:bg-[#e2dccb]"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-[0.9rem] mb-5 rounded-[10px] bg-[#ebe5d6] text-[0.95rem] focus:outline-none focus:bg-[#e2dccb]"
              />

              {error && (
                <div className="text-[0.85rem] text-[#b00020] mb-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="font-[marcellus] w-full py-[0.95rem] bg-[#2b1a12] text-white rounded-full text-[0.95rem] hover:bg-[#1f120c] transition duration-200"
              >
                Login
              </button>
            </form>

            <button
              onClick={() => router.push("/signup")}
              className="mt-6 text-[0.85rem] text-[#5a4638] hover:underline"
            >
              Don’t have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
