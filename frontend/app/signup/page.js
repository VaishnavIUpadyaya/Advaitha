"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      router.push("/onboarding");
    } catch (err) {
      setError(err.code.replace("auth/", "").replaceAll("-", " "));
    }
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Inter:wght@300;400;500&display=swap");

        /* PAGE */
        .page {
  min-height: 100vh;
  background: #9b7351; /* caramel brown */
  display: flex;
  align-items: center;
  justify-content: center;
}


        /* CARD */
        .card {
          width: 460px;
          background: #f8f1ec;
          border-radius: 28px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }

        /* IMAGE */
        .signup-image {
          display: flex;
          justify-content: center;
          padding: 2rem 2rem 0;
        }

        .signup-image img {
          border-radius: 18px;
          object-fit: cover;
        }

        /* CONTENT */
        .content {
          padding: 2.4rem;
          text-align: center;
        }

        h2 {
          font-family: "Playfair Display", serif;
          font-size: 2rem;
          font-weight: 500;
          color: #3a2416;
          margin-bottom: 0.4rem;
        }

        .subtitle {
          font-family: "Inter", sans-serif;
          font-size: 0.9rem;
          color: #6f3f2b;
          margin-bottom: 2rem;
        }

        /* INPUTS */
        input {
          width: 100%;
          padding: 0.9rem 1rem;
          margin-bottom: 1.3rem;
          border-radius: 12px;
          border: none;
          background: #f0e4dc;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          color: #3a2416;
        }

        input::placeholder {
          color: #7a5a48;
        }

        input:focus {
          outline: none;
          background: #ead8cd;
        }

        .error {
          font-size: 0.85rem;
          color: #9c1c1c;
          margin-bottom: 1rem;
        }

        /* BUTTON */
        .primary {
          width: 100%;
          padding: 0.95rem;
          background: linear-gradient(135deg, #6f3f2b, #4a2a1c);
          color: white;
          border-radius: 999px;
          border: none;
          font-family: "Inter", sans-serif;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transition: all 0.25s ease;
        }

        .primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35);
        }

        .secondary {
          margin-top: 1.6rem;
          background: none;
          border: none;
          font-family: "Inter", sans-serif;
          font-size: 0.85rem;
          color: #6f3f2b;
          cursor: pointer;
          width: 100%;
        }

        .secondary:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="page">
        <div className="card">

          {/* IMAGE SECTION */}
          <div className="signup-image">
            <Image
              src="/signup.jpg"
              alt="Skincare"
              width={160}
              height={200}
              priority
            />
          </div>

          {/* FORM SECTION */}
          <div className="content">
            <h2>Create Account</h2>
            <div className="subtitle">
              Start your personalized skincare journey
            </div>

            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <div className="error">{error}</div>}

              <button className="primary">Sign up</button>
            </form>

            <button
              className="secondary"
              onClick={() => router.push("/login")}
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
