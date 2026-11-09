import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PortfolioData } from "@/types";

const dataFilePath = path.join(process.cwd(), "src", "data", "profile.json");

export async function POST(req: Request) {
  try {
    const { passcode, status, mood, hp, mp } = await req.json();

    if (!process.env.ADMIN_PASSCODE || passcode !== process.env.ADMIN_PASSCODE) {
      return NextResponse.json({ error: "Passcode không đúng" }, { status: 401 });
    }

    const raw = fs.readFileSync(dataFilePath, "utf8");
    const data: PortfolioData = JSON.parse(raw);

    if (status !== undefined) data.profile.status = status;
    if (mood !== undefined) data.profile.mood = mood;
    if (hp !== undefined) data.profile.hp = hp;
    if (mp !== undefined) data.profile.mp = mp;

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ success: true, profile: data.profile });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
