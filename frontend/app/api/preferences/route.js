import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();
    const { uid, ...prefs } = body;

    if (!uid) {
      return NextResponse.json(
        { error: "Missing uid" },
        { status: 400 }
      );
    }

    await setDoc(doc(db, "preferences", uid), prefs);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
