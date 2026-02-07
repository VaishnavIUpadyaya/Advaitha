"use client";
import { useEffect, useState } from "react";


export default function SkinAnalysis() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  const user = { uid: "TEST_UID" };

  useEffect(() => {
    const fetchAnalysis = async () => {
      const res = await fetch("/api/skin-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          save: false,
        }),
      });

      const data = await res.json();
      setResult(data.analysis);
      setLoading(false);
    };

    fetchAnalysis();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Skin Analysis Result</h1>

      {loading ? (
        <p>Analyzing your skin based on onboarding data...</p>
      ) : (
        <pre className="mt-4 whitespace-pre-wrap">{result}</pre>
      )}
    </div>
  );
}
