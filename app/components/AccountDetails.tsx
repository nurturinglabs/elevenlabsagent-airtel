"use client";

import { AccountDetailsDisplay } from "@/lib/types";
import { CreditCard, Calendar, Database } from "lucide-react";

interface Props {
  account: AccountDetailsDisplay;
}

export default function AccountDetails({ account }: Props) {
  // Parse data remaining for progress bar (e.g., "0.7 GB" → 0.7)
  const dataNum = parseFloat(account.data_remaining.replace(/[^\d.]/g, "")) || 0;
  const dataMax = 2; // rough estimate for progress bar
  const dataPercent = Math.min((dataNum / dataMax) * 100, 100);

  return (
    <div className="animate-slide-in bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Account Details
        </h4>
        <span className="text-xs font-medium text-red-600">{account.plan_name}</span>
      </div>

      {/* Balance */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
          <CreditCard size={16} className="text-green-600" />
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">₹{account.balance}</p>
          <p className="text-[10px] text-gray-400">Current Balance</p>
        </div>
      </div>

      {/* Data Remaining */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-gray-600">
            <Database size={12} /> Data Remaining Today
          </span>
          <span className="font-medium text-gray-900">{account.data_remaining}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${dataPercent}%`,
              backgroundColor: dataPercent > 50 ? "#22c55e" : dataPercent > 20 ? "#f59e0b" : "#ef4444",
            }}
          />
        </div>
      </div>

      {/* Validity */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Calendar size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{account.days_remaining} days left</p>
          <p className="text-[10px] text-gray-400">Valid until {account.validity_end}</p>
        </div>
      </div>
    </div>
  );
}
