import { NextRequest, NextResponse } from "next/server";
import { billingAccounts } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json({ error: "customer_id parameter required" }, { status: 400 });
  }

  const account = billingAccounts[customerId];
  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  return NextResponse.json(account);
}
