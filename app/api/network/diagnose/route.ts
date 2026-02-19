import { NextRequest, NextResponse } from "next/server";
import { networkDiagnostics } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");

  if (!phone) {
    return NextResponse.json({ error: "phone parameter required" }, { status: 400 });
  }

  const diagnostics = networkDiagnostics[phone];
  if (!diagnostics) {
    return NextResponse.json({ error: "No diagnostic data found" }, { status: 404 });
  }

  return NextResponse.json(diagnostics);
}
