"use client";

export default function LeafBackground({ children, textColor = "text-black" }) {
  return (
    <div className={`relative min-h-screen bg-[#b46247] ${textColor}`}>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url('/leaves.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />

      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
