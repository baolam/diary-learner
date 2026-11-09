import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();
    const expected = process.env.ADMIN_PASSCODE;

    if (!expected || passcode !== expected) {
      return NextResponse.json({ error: "Passcode không đúng" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
