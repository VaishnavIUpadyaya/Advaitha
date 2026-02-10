"use client";

import { useState } from "react";

export default function AssistantPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!query.trim() || loading) return;

    const userText = query.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userText, history: messages }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text:
              data?.error ||
              `Server error (${res.status}). Check server logs for details.`,
          },
        ]);
        return;
      }

      if (data?.reply) {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      } else if (data?.text) {
        setMessages((prev) => [...prev, { role: "bot", text: data.text }]);
      } else if (data?.raw) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Model replied but unrecognized format." },
        ]);
        console.log("raw model response:", data.raw);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "No reply from model." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Network error. Try again." },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#7f5b3f] text-[#f7efe7] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white/[0.03] border border-white/20 rounded-2xl flex flex-col h-[80vh]">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold">AI Support</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                  m.role === "user" ? "bg-[#976f4c]" : "bg-white/[0.06]"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && <div className="text-xs opacity-70">Processing…</div>}
        </div>

        <div className="p-4 border-t border-white/10 flex gap-2">
          <input
            className="flex-1 bg-white/[0.06] px-3 py-2 rounded-lg"
            placeholder="Ask here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            className="px-4 py-2 bg-[#976f4c] rounded-lg font-bold disabled:opacity-60"
            onClick={sendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
