"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/trades")
      .then(r => r.json())
      .then(setTrades);
  }, []);

  return (
    <main className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl mb-6">
        🐾 CLAWSER DASHBOARD
      </h1>

      {trades.map((t, i) => (
        <div key={i} className="bg-zinc-900 p-4 mb-3 rounded">
          <p>Token: {t.token}</p>
          <p>PnL: {t.pnl} ETH</p>
          <p>Date: {t.date}</p>
        </div>
      ))}
    </main>
  );
}