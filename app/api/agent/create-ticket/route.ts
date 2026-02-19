import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer_id, issue, category, priority } = body;

  if (!customer_id || !issue || !category || !priority) {
    return NextResponse.json(
      { error: "customer_id, issue, category, and priority are required" },
      { status: 400 }
    );
  }

  const baseUrl = req.nextUrl.origin;
  const res = await fetch(`${baseUrl}/api/tickets/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_id, issue, category, priority }),
  });
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}
