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
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* CENTER CONTAINER */}
      <div style={{ width: "100%", maxWidth: 900 }}>
        
        {/* HERO */}
        <section style={{ marginBottom: 60 }}>
          <h1 style={{ fontSize: 48, marginBottom: 10 }}>
            😈 CLAWSER
          </h1>
          <p style={{ opacity: 0.7 }}>
            Autonomous AI Onchain Hunter
          </p>
        </section>

        {/* ABOUT */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ marginBottom: 10 }}>🧠 WHAT IS CLAWSER</h2>
          <p style={{ opacity: 0.7, lineHeight: 1.6 }}>
            Clawser is an autonomous AI agent that scans onchain markets,
            identifies targets, and executes trades without human intervention.
          </p>
        </section>

        {/* STATUS */}
        <section style={{ marginBottom: 50 }}>
          <h2 style={{ marginBottom: 14 }}>🤖 SYSTEM STATUS</h2>

          <div
            style={{
              padding: 18,
              border: "1px solid #222",
              borderRadius: 12,
              background: "#0d0d0d",
              width: "100%",
            }}
          >
            🟢 Agent Online — Hunting Mode Active
          </div>
        </section>

        {/* LIVE FEED */}
        <section>
          <h2 style={{ marginBottom: 16 }}>🐾 LIVE HUNT FEED</h2>

          {trades.length === 0 && (
            <p style={{ opacity: 0.5 }}>No hunts yet...</p>
          )}

          {trades.map((t, i) => (
            <div
              key={i}
              style={{
                marginTop: 12,
                padding: 16,
                borderRadius: 12,
                background: "#101010",
                border: "1px solid #222",
              }}
            >
              <div>🎯 Target: {t.token}</div>
              {t.pnl && <div>📊 Result: {t.pnl}</div>}
              <div style={{ opacity: 0.6, marginTop: 4 }}>
                🕒 {new Date(t.date).toLocaleString()}
              </div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer
          style={{
            marginTop: 70,
            opacity: 0.4,
            textAlign: "center",
          }}
        >
          CLAWSER AI — autonomous onchain predator
        </footer>
      </div>
    </main>
  );
}