"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase/firestore";
import { auth } from "../../lib/firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Settings() {
  const [form, setForm] = useState({
    skinType: "",
    diet: "",
    sensitivity: "",
  });

  const uid = auth?.currentUser?.uid || "DEV_USER_001";

  useEffect(() => {
    const loadData = async () => {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) setForm(snap.data());
    };
    loadData();
  }, [uid]);

  const saveChanges = async () => {
    await setDoc(doc(db, "users", uid), form, { merge: true });
    alert("Settings updated");
  };

  return (
    <div className="relative min-h-screen bg-[#b46247] text-black">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/leaves.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />

      <div className="relative z-10 min-h-screen flex justify-center items-center">
        <div className="bg-[#eceadd] p-10 rounded-xl shadow-xl w-full max-w-3xl">
          <h1 className="text-2xl font-bold mb-6 font-[marcellus]">
            Update Preferences
          </h1>

          <Section
            title="Skin Type"
            options={[
              "Dry",
              "Dry to Normal",
              "Normal",
              "Normal to Combination",
              "Combination to Oily",
              "Oily",
            ]}
            value={form.skinType}
            onSelect={(v) => setForm({ ...form, skinType: v })}
          />

          <Section
            title="Diet"
            options={[
              "Balanced",
              "High Carb",
              "High Protein",
              "Vegetarian",
              "Junk / Processed",
            ]}
            value={form.diet}
            onSelect={(v) => setForm({ ...form, diet: v })}
          />

          <Section
            title="Sensitivity"
            options={["Yes", "No"]}
            value={form.sensitivity}
            onSelect={(v) => setForm({ ...form, sensitivity: v })}
          />

          <div className="mt-8 flex justify-center">
            <button
              onClick={saveChanges}
              className="bg-[#a4896a] hover:bg-[#796855] font-[marcellus] text-white px-6 py-2 rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, options, value, onSelect }) {
  return (
    <div className="mb-6">
      <p className="font-semibold mb-3 font-[marcellus]">{title}</p>

      <select
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        className="border p-3 w-full rounded font-[marcellus]"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
