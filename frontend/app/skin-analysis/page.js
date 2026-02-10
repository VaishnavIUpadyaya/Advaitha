"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase/auth";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
export default function SkinAnalysis() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("Times");
    doc.setFontSize(12);

    const title = "Your Skin Analysis Report";
    doc.text(title, 20, 20);

    const wrappedText = doc.splitTextToSize(result, 170);
    doc.text(wrappedText, 20, 35);

    doc.save("skin-analysis-report.pdf");
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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="bg-[#f5efe9] w-full max-w-4xl h-[94vh] rounded-2xl shadow-2xl p-6 flex flex-col">
          <h1 className="text-2xl font-bold font-[marcellus] mb-4 text-center">
            Skin Analysis Report
          </h1>

          {loading ? (
            <p className="text-center mt-10">
              Analyzing your skin based on onboarding data...
            </p>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto border rounded-lg p-8 bg-white">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {result}
                </pre>
              </div>

              {result && (
                <div className="flex justify-end mt-8">
                  <button
                    onClick={downloadPDF}
                    className="bg-[#5e3122] text-white px-4 py-2 rounded-xl hover:bg-[#643824] transition font-semibold"
                  >
                    <Download className="inline-block " size={18} />
                  </button>
                  <div onClick={() => router.push("/profile")}>click here</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
