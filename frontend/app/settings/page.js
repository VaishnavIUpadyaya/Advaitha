"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    budget: "",
    notifications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrefs({
      ...prefs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prefs),
    });

    if (res.ok) {
      alert("Preferences saved");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="budget"
          placeholder="Monthly budget"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="notifications"
            onChange={handleChange}
          />
          Enable notifications
        </label>

        <button className="bg-black text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}
