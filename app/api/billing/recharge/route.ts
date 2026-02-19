import { NextRequest, NextResponse } from "next/server";
import { billingAccounts, generateTransactionId } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer_id, plan_name } = body;

  if (!customer_id || !plan_name) {
    return NextResponse.json({ error: "customer_id and plan_name required" }, { status: 400 });
  }

  const account = billingAccounts[customer_id];
  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  // Find the plan price from current plan or upgrades
  let amount = account.plan.price;
  const upgrade = account.available_upgrades.find((u) => u.name === plan_name);
  if (upgrade) {
    amount = upgrade.price;
  } else if (account.plan.name === plan_name) {
    amount = account.plan.price;
  }

  // Calculate new validity
  const validityDays = upgrade ? upgrade.validity_days : account.plan.validity_days;
  const newValidity = new Date();
  newValidity.setDate(newValidity.getDate() + validityDays);

  return NextResponse.json({
    success: true,
    transaction_id: generateTransactionId(),
    customer_id,
    plan_name,
    amount,
    new_validity: newValidity.toISOString().split("T")[0],
    message: `Recharge of ₹${amount} for ${plan_name} successful.`,
  });
}
