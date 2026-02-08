"use client";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase/auth";

export default function SkinAnalysis() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runAnalysis = async () => {
      const uid = auth?.currentUser?.uid || "DEV_USER_001";

      const res = await fetch("/api/skin-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      });

      const data = await res.json();
      setResult(data.analysis || data.error || "");
      setLoading(false);
    };

    runAnalysis();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Skin Analysis</h1>
      {loading ? <p>Analyzing your skin based on onboarding data...</p> : <pre className="mt-4 whitespace-pre-wrap">{result}</pre>}
    </div>
  );
}
