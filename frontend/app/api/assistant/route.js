import {NextResponse} from "next/server";
import {model} from "@/lib/gemini/client";

export async function POST(req) {
    const {query}=await req.json();

    const prompt=`You are a skincare assistant . Answer clearly and safely. Question:${query}`;
    const result=await model.generateContent(prompt);
    const reply=result.response.text();

    return NextResponse.json({reply});
}