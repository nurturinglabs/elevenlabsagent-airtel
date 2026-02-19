import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const phone = body.phone;

  if (!phone) {
    return NextResponse.json({ error: "phone is required" }, { status: 400 });
  }

  const baseUrl = req.nextUrl.origin;
  const res = await fetch(`${baseUrl}/api/crm/customer?phone=${phone}`);
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}
