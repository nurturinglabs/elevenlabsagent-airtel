"use client";

import { RechargeConfirmationDisplay } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

interface Props {
  recharge: RechargeConfirmationDisplay;
}

export default function RechargeConfirmation({ recharge }: Props) {
  return (
    <div className="animate-slide-in bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 size={20} className="text-green-600" />
        <h4 className="text-sm font-semibold text-green-800">Recharge Successful!</h4>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-green-600">Plan</span>
          <span className="font-medium text-green-900">{recharge.plan_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-600">Amount</span>
          <span className="font-medium text-green-900">₹{recharge.amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-600">Transaction ID</span>
          <span className="font-mono text-green-900">{recharge.transaction_id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-green-600">New Validity</span>
          <span className="font-medium text-green-900">{recharge.new_validity}</span>
        </div>
      </div>
    </div>
  );
}
