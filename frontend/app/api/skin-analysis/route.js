import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase/firestore";
import { model } from "../../../lib/gemini/client";

export async function POST(req) {
  try {
    const { uid } = await req.json();
    if (!uid) return NextResponse.json({ error: "UID required" }, { status: 400 });

    console.log("server /api/skin-analysis - db:", !!db);

    if (!db) {
      return NextResponse.json({ error: "Firestore db not initialized" }, { status: 500 });
    }

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "No onboarding data" }, { status: 404 });
    }

    const user = userSnap.data();

    const prompt = `
User onboarding data:
Skin type: ${user.skinType}
Diet: ${user.diet}
Sensitivity: ${user.sensitivity}

Generate:
1. Ingredients to USE
2. Ingredients to AVOID
3. AM routine
4. PM routine
5. Diet tips

No brands. No medical claims.
`;
    console.log("GEMINI key present:", !!process.env.GEMINI_API_KEY, "slice:", (process.env.GEMINI_API_KEY || "").slice(-6));
    
    const result = await model.generateContent(prompt);
    const analysis = result.response.text();

    await setDoc(doc(db, "analysisResults", uid), {
      analysis,
      createdAt: new Date(),
    });

    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("/api/skin-analysis error:", err);
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
