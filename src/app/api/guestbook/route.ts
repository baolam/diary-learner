import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PortfolioData, GuestbookEntry } from "@/types";

const dataFilePath = path.join(process.cwd(), "src", "data", "profile.json");

export async function POST(req: Request) {
  try {
    const { name, avatar, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Vui lòng nhập tên và lời nhắn" }, { status: 400 });
    }

    const raw = fs.readFileSync(dataFilePath, "utf8");
    const data: PortfolioData = JSON.parse(raw);

    const newEntry: GuestbookEntry = {
      id: "gb-" + Date.now(),
      name: name.slice(0, 30),
      avatar: avatar || "knight",
      message: message.slice(0, 200),
      timestamp: new Date().toISOString(),
    };

    data.guestbook = [newEntry, ...(data.guestbook || [])].slice(0, 50); // Giữ tối đa 50 tin nhắn

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
