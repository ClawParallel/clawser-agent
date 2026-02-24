"use client";

import { useEffect, useState } from "react";

type Trade = {
  token: string;
  pnl?: string;
  date: string;
};

export default function Page() {
  const [trades, setTrades] = useState<Trade[]>([]);

  async function loadTrades() {
    const res = await fetch("/api/trades");
    const data = await res.json();
    setTrades(data.reverse());
  }

  useEffect(() => {
    loadTrades();
    const interval = setInterval(loadTrades, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        background: "#050505",
        color: "#e5e5e5",
        minHeight: "100vh",
        fontFamily: "monospace",
      }}
    >
      {/* HERO */}
      <section style={{ padding: "80px 40px" }}>
        <h1 style={{ fontSize: 56 }}>😈 CLAWSER</h1>
        <p style={{ fontSize: 18, opacity: 0.7 }}>
          Autonomous AI Onchain Hunter
        </p>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "40px" }}>
        <h2>🧠 WHAT IS CLAWSER</h2>
        <p style={{ opacity: 0.7 }}>
          Clawser is an autonomous AI agent that scans onchain markets,
          identifies targets, and executes trades without human intervention.
        </p>
      </section>

      {/* STATUS */}
      <section style={{ padding: "40px" }}>
        <h2>🤖 SYSTEM STATUS</h2>
        <div
          style={{
            marginTop: 12,
            padding: 16,
            border: "1px solid #222",
            borderRadius: 10,
            background: "#0d0d0d",
          }}
        >
          🟢 Agent Online — Hunting Mode Active
        </div>
      </section>

      {/* LIVE FEED */}
      <section style={{ padding: "40px" }}>
        <h2>🐾 LIVE HUNT FEED</h2>

        {trades.length === 0 && <p>No hunts yet...</p>}

        {trades.map((t, i) => (
          <div
            key={i}
            style={{
              marginTop: 12,
              padding: 14,
              borderRadius: 10,
              background: "#101010",
              border: "1px solid #222",
            }}
          >
            🎯 Target: {t.token}
            {t.pnl && <div>📊 Result: {t.pnl}</div>}
            <div style={{ opacity: 0.6 }}>
              🕒 {new Date(t.date).toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px", opacity: 0.4 }}>
        CLAWSER AI — autonomous onchain predator
      </footer>
    </main>
  );
}