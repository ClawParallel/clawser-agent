import cron from "node-cron";
import { runAgent } from "./agent.js";

console.log("🐾 Clawser Daily Agent Active");

cron.schedule("0 9 * * *", async () => {
  console.log("🐾 Daily hunt started...");
  await runAgent();
});