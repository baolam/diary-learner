import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PortfolioData } from "@/types";

const dataFilePath = path.join(process.cwd(), "src", "data", "profile.json");

function getStoredData(): PortfolioData {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading data file:", err);
    throw new Error("Unable to read profile data");
  }
}

function saveStoredData(data: PortfolioData) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing data file:", err);
    throw new Error("Unable to save profile data");
  }
}

// GET: Lấy dữ liệu công khai
export async function GET() {
  try {
    const data = getStoredData();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: Cập nhật dữ liệu từ trang Admin
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode, payload } = body;

    if (!passcode || !process.env.ADMIN_PASSCODE || passcode !== process.env.ADMIN_PASSCODE) {
      return NextResponse.json({ error: "Sai passcode quản trị" }, { status: 401 });
    }

    if (!payload) {
      return NextResponse.json({ error: "Payload không hợp lệ" }, { status: 400 });
    }

    const currentData = getStoredData();
    const updatedData: PortfolioData = {
      ...currentData,
      ...payload,
    };

    saveStoredData(updatedData);

    return NextResponse.json({
      success: true,
      message: "Cập nhật dữ liệu thành công!",
      data: updatedData,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
