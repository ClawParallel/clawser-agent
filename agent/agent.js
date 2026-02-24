import fs from "fs";

function simulateTrade(token) {
  const pnl = (Math.random() * 2 - 1).toFixed(3);

  const trade = {
    token: token.baseToken.symbol,
    pnl,
    date: new Date().toLocaleDateString(),
  };

  console.log("🐾 Daily trade:", trade);

  // simpan ke file
  const file = "trades.json";

  let trades = [];
  if (fs.existsSync(file)) {
    trades = JSON.parse(fs.readFileSync(file));
  }

  trades.push(trade);
  fs.writeFileSync(file, JSON.stringify(trades, null, 2));
}