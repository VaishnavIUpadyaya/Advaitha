import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "products"));

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products);
  } catch (err) {
    console.error("Products API error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}