import cron from "node-cron";
import { runAgent } from "./agent.js";

console.log("🐾 CLAWSER DAILY AGENT ACTIVE");

runAgent();

cron.schedule("0 9 * * *", async () => {
  console.log("🐾 Daily hunt started...");
  await runAgent();
});