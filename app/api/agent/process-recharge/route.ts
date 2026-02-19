import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer_id, plan_name } = body;

  if (!customer_id || !plan_name) {
    return NextResponse.json({ error: "customer_id and plan_name are required" }, { status: 400 });
  }

  const baseUrl = req.nextUrl.origin;
  const res = await fetch(`${baseUrl}/api/billing/recharge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_id, plan_name }),
  });
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(data);
}
