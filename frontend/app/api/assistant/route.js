import { NextResponse } from "next/server";

async function listModels(apiKey) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`,
    { method: "GET" }
  );
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`ListModels failed: ${res.status} ${txt}`);
  }
  return res.json();
}

async function tryGenerateWithModel(apiKey, modelName, prompt) {

  const candidatePaths = [];

  if (modelName.startsWith("models/")) {
    candidatePaths.push(modelName);
    candidatePaths.push(modelName.replace(/^models\//, ""));
  } else {
    candidatePaths.push(modelName);
    candidatePaths.push(`models/${modelName}`);
  }

  for (const m of candidatePaths) {
    const url = `https://generativelanguage.googleapis.com/v1/${m}:generateContent?key=${apiKey}`;
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      const json = await resp.json().catch(() => null);

      if (!resp.ok) {
        continue;
      }

      const text =
        json?.candidates?.[0]?.content?.parts?.[0]?.text ||
        json?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text ||
        json?.output?.[0]?.content?.[0]?.text ||
        json?.output?.text ||
        null;

      if (text) {
        return { text, modelUsed: m, raw: json };
      }
      return { text: null, modelUsed: m, raw: json };
    } catch (err) {
      continue;
    }
  }

  return null;
}

export async function POST(req) {
  try {
    const { query, history = [] } = await req.json();

    if (!query || !query.toString().trim()) {
      return NextResponse.json({ error: "Query missing" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not set on server" },
        { status: 500 }
      );
    }

    const prompt = `
You are a helpful, safety-conscious skincare assistant.
Answer clearly and concisely. Do not give medical diagnoses.
Conversation history:
${(history || []).map((m) => `${m.role}: ${m.text}`).join("\n")}

User question:
${query}
`;

    let modelsList = [];
    try {
      const listResponse = await listModels(apiKey);
      modelsList = Array.isArray(listResponse?.models)
        ? listResponse.models.map((m) => m.name || m.model || m)
        : [];
    } catch (err) {
      console.warn("ListModels failed:", err.message);
    }
    const fallbackCandidates = [
      "models/gemini-2.5-pro",
      "models/gemini-2.5-flash",
      "models/gemini-2.5-flash-lite",
      "models/gemini-2.0-flash",
      "models/gemini-1.5-flash-001",
      "models/gemini-1.5-pro-001",
      "gemini-2.5-pro",
      "gemini-2.5-flash",
      "gemini-2.5-flash-lite",
      "gemini-2.0-flash",
      "gemini-1.5-flash-001",
      "gemini-1.5-pro-001",
    ];

    const candidates = [
      ...Array.from(new Set([...(modelsList || []), ...fallbackCandidates])),
    ];

    let lastErr = null;
    for (const candidate of candidates) {
      try {
        const result = await tryGenerateWithModel(apiKey, candidate, prompt);
        if (result && result.text) {
          return NextResponse.json({
            reply: result.text,
            model: result.modelUsed,
          });
        } else if (result && result.raw) {
          return NextResponse.json(
            {
              error: "Model responded but no text found",
              model: result.modelUsed,
              raw: result.raw,
            },
            { status: 502 }
          );
        }
      } catch (err) {
        lastErr = err;
        continue;
      }
    }

    return NextResponse.json(
      {
        error:
          "No compatible Gemini model accepted the request. See server logs for details.",
        lastError: lastErr?.message || null,
        tried: candidates.slice(0, 10),
      },
      { status: 502 }
    );
  } catch (err) {
    console.error("Assistant route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
