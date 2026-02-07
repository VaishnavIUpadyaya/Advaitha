import { NextResponse } from "next/server";
import { model } from "@/lib/gemini/client";
import { db } from "@/lib/firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function POST(req) {
  const { uid, save } = await req.json();

  const userSnap = await getDoc(doc(db, "users", uid));
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
3. AM/PM routine
4. Diet tips

No brands. No medical claims.
`;

  const result = await model.generateContent(prompt);
  const analysis = result.response.text();

  if (save === true) {
    await setDoc(doc(db, "analysisResults", uid), {
      analysis,
      createdAt: new Date(),
    });
  }

  return NextResponse.json({ analysis });
}
