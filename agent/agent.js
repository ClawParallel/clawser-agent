import fs from "fs";

const API_KEY = process.env.BANKR_API_KEY;

async function scanTokens() {
  const res = await fetch(
    "https://api.dexscreener.com/latest/dex/search?q=base"
  );
  const data = await res.json();

  return data.pairs.slice(0, 5);
}

async function executeBankrTrade(tokenSymbol) {
  console.log("🏦 Executing Bankr trade...");

  const res = await fetch("https://api.bankr.bot/swap", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chain: "base",
      tokenIn: "ETH",
      tokenOut: tokenSymbol,
      amount: "0.001",
    }),
  });

  const data = await res.json();
  console.log("🏦 Bankr result:", data);

  return data;
}

function saveTrade(token, result) {
  const trade = {
    token,
    result,
    date: new Date().toISOString(),
  };

  console.log("🐾 Trade saved:", trade);

  const file = "trades.json";

  let trades = [];
  if (fs.existsSync(file)) {
    trades = JSON.parse(fs.readFileSync(file));
  }

  trades.push(trade);
  fs.writeFileSync(file, JSON.stringify(trades, null, 2));
}

export async function runAgent() {
  console.log("🐾 CLAWSER HUNT START");

  const tokens = await scanTokens();
  const pick = tokens[Math.floor(Math.random() * tokens.length)];

  const symbol = pick.baseToken.symbol;

  console.log("🎯 Target token:", symbol);

  const result = await executeBankrTrade(symbol);

  saveTrade(symbol, result);
}