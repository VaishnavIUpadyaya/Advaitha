"use client";
import { useState } from "react";
import { auth } from "../../lib/firebase/auth";

export default function RoutinePage() {
  const [routine, setRoutine] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoutine = async () => {
    setLoading(true);
    const uid = auth?.currentUser?.uid || "DEV_USER_001";

    const res = await fetch("/api/routine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
    });

    const data = await res.json();
    setRoutine(data.routine || data.error || "");
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Your Routine</h1>

      <button onClick={generateRoutine} className="bg-black text-white px-4 py-2 mt-4">
        Generate Routine
      </button>

      {loading && <p>Generating...</p>}
      {routine && <pre className="mt-4 whitespace-pre-wrap">{routine}</pre>}
    </div>
  );
}
