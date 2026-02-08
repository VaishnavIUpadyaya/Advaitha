import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-001",
});
