"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <style jsx>{`
        /* Import luxury fonts */
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap");

        .landing {
          position: relative;
          min-height: 100vh;
          background-image: url("/hero.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Dim overlay */
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
        }

        /* Content */
        .content {
          position: relative;
          text-align: center;
          color: #ffffff;
          max-width: 680px;
          padding: 2rem;
        }

        .content h1 {
          font-family: "Playfair Display", serif;
          font-size: 3rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          margin-bottom: 1.2rem;
        }

        .content p {
          font-family: "Inter", sans-serif;
          font-size: 1.05rem;
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 2.8rem;
          color: #eaeaea;
        }

        .buttons {
  display: flex;
  gap: 1.2rem;
  justify-content: center;
}

/* PRIMARY – Get Started */
.primary {
  font-family: "Inter", sans-serif;
  padding: 0.85rem 2.4rem;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  transition: all 0.25s ease;
}

.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
}

/* SECONDARY – Login */
.secondary {
  font-family: "Inter", sans-serif;
  padding: 0.85rem 2.2rem;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  backdrop-filter: blur(6px);
  transition: all 0.25s ease;
}

.secondary:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}


        /* Mobile */
        @media (max-width: 768px) {
          .content h1 {
            font-size: 2.3rem;
          }
        }
      `}</style>

      <section className="landing">
        <div className="overlay"></div>

        <div className="content">
          <h1>Your Daily Skincare Companion</h1>

          <p>
            Build a personalized skincare routine, stay consistent,
            and understand your skin better — naturally.
          </p>

          <div className="buttons">
            <button
              className="primary"
              onClick={() => router.push("/signup")}
            >
              Get Started
            </button>

            <button
              className="secondary"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
