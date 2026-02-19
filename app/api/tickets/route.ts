import { NextRequest, NextResponse } from "next/server";
import { ticketData } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json({ error: "customer_id parameter required" }, { status: 400 });
  }

  const tickets = ticketData[customerId];
  if (!tickets) {
    return NextResponse.json(
      { customer_id: customerId, open_tickets: [], recent_closed: [] }
    );
  }

  return NextResponse.json(tickets);
}
