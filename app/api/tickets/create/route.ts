import { NextRequest, NextResponse } from "next/server";
import { generateTicketId } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer_id, issue, category, priority } = body;

  if (!customer_id || !issue || !category || !priority) {
    return NextResponse.json(
      { error: "customer_id, issue, category, and priority required" },
      { status: 400 }
    );
  }

  const ticketId = generateTicketId();
  const now = new Date().toISOString();

  // Estimate resolution based on priority
  const hoursMap: Record<string, number> = { high: 4, medium: 24, low: 72 };
  const hours = hoursMap[priority] || 24;
  const eta = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

  return NextResponse.json({
    success: true,
    ticket_id: ticketId,
    customer_id,
    issue,
    category,
    priority,
    status: "open",
    created: now,
    assigned_to: `${category.charAt(0).toUpperCase() + category.slice(1)} Team`,
    eta_resolution: eta,
    message: `Ticket ${ticketId} created. Estimated resolution: ${hours} hours.`,
  });
}
