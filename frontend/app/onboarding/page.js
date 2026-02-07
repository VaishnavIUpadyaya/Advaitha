"use client";
import { db } from "@/lib/firebase/firestore";
import { useState } from "react";

export default function Onboarding() {
  const [form, setForm] = useState({
    skinType: "",
    diet: "",
    sensitivity: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Onboarding</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="skinType"
          placeholder="Skin type"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="diet"
          placeholder="Diet type"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          name="sensitivity"
          placeholder="Sensitive? yes/no"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}
