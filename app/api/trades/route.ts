import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "trades.json");

export async function GET() {
  if (!fs.existsSync(file)) {
    return Response.json([]);
  }

  const data = fs.readFileSync(file, "utf-8");
  return Response.json(JSON.parse(data));
}