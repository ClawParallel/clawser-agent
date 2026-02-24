import fs from "fs";

async function scanTokens() {
  console.log("🔎 Scanning Base trending tokens...");

  const res = await fetch(
    "https://api.dexscreener.com/latest/dex/search?q=base"
  );
  const data = await res.json();

  return data.pairs.slice(0, 5);
}

function pickToken(tokens) {
  const pick = tokens[Math.floor(Math.random() * tokens.length)];

  return {
    symbol: pick.baseToken.symbol,
    address: pick.baseToken.address,
    price: pick.priceUsd,
    liquidity: pick.liquidity?.usd || 0,
  };
}

function simulateTrade(token) {
  console.log("🎯 Target:", token.symbol);

  const pnl = (Math.random() * 20 - 10).toFixed(2);

  return {
    token: token.symbol,
    address: token.address,
    price: token.price,
    liquidity: token.liquidity,
    pnl: pnl + "%",
    date: new Date().toISOString(),
  };
}

function saveTrade(trade) {
  console.log("🐾 Saving trade...");

  const file = "trades.json";

  let trades = [];
  if (fs.existsSync(file)) {
    trades = JSON.parse(fs.readFileSync(file));
  }

  trades.push(trade);
  fs.writeFileSync(file, JSON.stringify(trades, null, 2));

  console.log("✅ Trade saved");
}

export async function runAgent() {
  console.log("🐾 CLAWSER HUNT START");

  const tokens = await scanTokens();

  const target = pickToken(tokens);

  const trade = simulateTrade(target);

  console.log("📊 Trade result:", trade);

  saveTrade(trade);
}