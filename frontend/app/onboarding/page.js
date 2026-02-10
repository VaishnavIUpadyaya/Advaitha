"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firestore";
import { auth } from "../../lib/firebase/auth";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    skinType: "",
    diet: "",
    sensitivity: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    const uid = auth?.currentUser?.uid || "DEV_USER_001";

    try {
      if (!db) throw new Error("Firestore db is undefined");

      await setDoc(doc(db, "users", uid), {
        ...form,
        createdAt: new Date(),
      });

      router.push("/skin-analysis");
    } catch (err) {
      console.error("onboarding save error:", err);
      alert("Failed to save onboarding");
    }
  };

  return (
    <div className="bg-[#976f4c] min-h-screen flex items-center justify-center">
      <div className="p-10 max-w-4xl mx-auto bg-[#eceadd] rounded-xl shadow-xl scale-[0.86] origin-center">
        <div className="flex flex-col md:flex-row gap-10 items-stretch">
          <div className="hidden md:block w-1/2">
            <img
              src="/onboarding.jpg"
              alt="Onboarding"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6 w-full md:w-1/2 flex flex-col justify-center text-black font-[marcellus]">
            {step !== 4 && (
              <div className="text-3xl font-bold mx-1">
                Tell us about your skin...
              </div>
            )}

            {step === 1 && (
              <div className="w-full max-w-md mx-auto space-y-4 px-4">
                <div className="font-bold text-2xl text-center md:text-left">
                  What is your skin type?
                </div>

                <div className="space-y-3">
                  {[
                    "Dry",
                    "Dry to Normal",
                    "Normal",
                    "Normal to Combination",
                    "Combination to Oily",
                    "Oily",
                  ].map((opt) => (
                    <OptionCard
                      key={opt}
                      text={opt}
                      selected={form.skinType === opt}
                      onClick={() => {
                        setForm({ ...form, skinType: opt });
                        setStep(2);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="w-full max-w-md mx-auto space-y-4 px-4">
                <p className="font-semibold text-center md:text-left">
                  What best describes your diet?
                </p>

                <div className="space-y-3">
                  {[
                    "Balanced",
                    "High Carb",
                    "High Protein",
                    "Vegetarian",
                    "Junk / Processed",
                  ].map((opt) => (
                    <OptionCard
                      key={opt}
                      text={opt}
                      selected={form.diet === opt}
                      onClick={() => {
                        setForm({ ...form, diet: opt });
                        setStep(3);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="font-semibold">Do you have sensitive skin?</p>

                <div className="space-y-3">
                  {["Yes", "No"].map((opt) => (
                    <OptionCard
                      key={opt}
                      text={opt}
                      selected={form.sensitivity === opt}
                      onClick={() => {
                        setForm({ ...form, sensitivity: opt });
                        setStep(4);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center gap-4">
                <div>
                  <img
                    src="/loading.jpg"
                    alt="loading"
                    className="h-20 w-50 object-cover rounded-lg"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-[#a4896a] font-bold px-20 py-3 mt-6 rounded-xl hover:bg-[#796855] text-white transition"
                >
                  Save & Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OptionCard({ text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border rounded-lg text-left transition
        ${selected ? "border-black bg-gray-100" : "border-gray-200 hover:border-[#3a322b] hover:text-white hover:bg-[#6e5846]"}`}
    >
      {text}
    </button>
  );
}
