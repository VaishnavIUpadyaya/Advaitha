import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../../../lib/firebase/firestore";
import { groq } from "../../../lib/groq/client";

export async function POST(req) {
  try {
    const { uid } = await req.json();
    if (!uid)
      return NextResponse.json({ error: "UID required" }, { status: 400 });

    if (!db)
      return NextResponse.json(
        { error: "Firestore db not initialized" },
        { status: 500 },
      );

    const userSnap = await getDoc(doc(db, "users", uid));
    const analysisSnap = await getDoc(doc(db, "analysisResults", uid));

    if (!userSnap.exists() || !analysisSnap.exists()) {
      return NextResponse.json({ error: "Missing user data" }, { status: 404 });
    }

    const user = userSnap.data();
const analysis = analysisSnap.data().analysis;

    const prompt = `
User skin profile:
Skin type: ${user.skinType}
Diet: ${user.diet}
Sensitivity: ${user.sensitivity}

Previous analysis:
${analysis}

Generate a DAILY skincare routine:
- Morning steps
- Night steps
- Weekly care
- Lifestyle tips

Rules:
- Simple steps
- No brands
- No medical advice
`;

    const chat = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content: "You are a skincare assistant. Be safe, simple, and non-medical."
    },
    {
      role: "user",
      content: prompt
    }
  ],
});

const routine = chat.choices[0].message.content;


    await setDoc(doc(db, "routines", uid), {
      routine: analysis,
      createdAt: new Date(),
    });

    return NextResponse.json({ routine });
  } catch (err) {
    console.error("/api/routine error:", err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 },
    );
  }
}
