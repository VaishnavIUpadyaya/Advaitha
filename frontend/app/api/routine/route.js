import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  }

  try {
    const ref = doc(db, "routines", uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return NextResponse.json(null);
    }

    return NextResponse.json(snap.data());
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { uid, routine } = body;

    const ref = doc(db, "routines", uid);

    await setDoc(ref, routine);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
