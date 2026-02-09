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
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400;500&display=swap");

        /* PAGE */
        .page {
          min-height: 100vh;
          background: #9c734f;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        /* CARD */
        .card {
          position: relative;
          width: 920px;
          background: #f4efdf;
          border-radius: 18px;
          padding: 3rem 3rem 3rem 7rem;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        /* IMAGE BLOCK */
        .image-block {
          position: absolute;
          left: -70px;
          top: 50%;
          transform: translateY(-50%);
          width: 300px;
          height: 420px;
          border-radius: 24px 24px 60px 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
        }

        /* CONTENT */
        .content {
          grid-column: 2;
        }

        h2 {
          font-family: "Playfair Display", serif;
          font-size: 2rem;
          font-weight: 500;
          color: #2b1a12;
          margin-bottom: 0.6rem;
        }

        .subtitle {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: #5a4638;
          margin-bottom: 2rem;
        }

        input {
          width: 100%;
          padding: 0.9rem 1rem;
          margin-bottom: 1.3rem;
          border-radius: 10px;
          border: none;
          background: #ebe5d6;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
        }

        input:focus {
          outline: none;
          background: #e2dccb;
        }

        .error {
          font-size: 0.85rem;
          color: #b00020;
          margin-bottom: 1rem;
        }

        .primary {
          width: 100%;
          padding: 0.95rem;
          background: #2b1a12;
          color: white;
          border-radius: 999px;
          border: none;
          font-family: "Inter", sans-serif;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .primary:hover {
          background: #1f120c;
        }

        .secondary {
          margin-top: 1.4rem;
          background: none;
          border: none;
          font-family: "Inter", sans-serif;
          font-size: 0.85rem;
          color: #5a4638;
          cursor: pointer;
        }

        .secondary:hover {
          text-decoration: underline;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .card {
            grid-template-columns: 1fr;
            padding: 2.5rem;
          }

          .image-block {
            position: relative;
            left: 0;
            top: 0;
            transform: none;
            width: 100%;
            height: 760px;
            margin-bottom: 2rem;
            border-radius: 18px;
          }

          .content {
            grid-column: auto;
          }
        }
      `}</style>

      <div className="page">
        <div className="card">
          {/* IMAGE */}
          <div className="image-block">
            <Image
              src="/login2.jpg"
              alt="Skincare"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* CONTENT */}
          <div className="content">
            <h2>Welcome Back</h2>
            <div className="subtitle">
              Continue your personalized skincare journey
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <div className="error">{error}</div>}

              <button className="primary">Login</button>
            </form>

            <button
              className="secondary"
              onClick={() => router.push("/signup")}
            >
              Don’t have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
