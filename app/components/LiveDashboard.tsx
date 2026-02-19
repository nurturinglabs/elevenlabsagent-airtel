"use client";

import {
  CustomerInfoDisplay,
  AccountDetailsDisplay,
  NetworkStatusDisplay,
  TicketInfoDisplay,
  RechargeConfirmationDisplay,
} from "@/lib/types";
import CustomerCard from "./CustomerCard";
import AccountDetails from "./AccountDetails";
import NetworkStatus from "./NetworkStatus";
import TicketCard from "./TicketCard";
import RechargeConfirmation from "./RechargeConfirmation";
import { LayoutDashboard } from "lucide-react";

interface Props {
  customer: CustomerInfoDisplay | null;
  account: AccountDetailsDisplay | null;
  network: NetworkStatusDisplay | null;
  tickets: { data: TicketInfoDisplay; isNew: boolean }[];
  recharge: RechargeConfirmationDisplay | null;
}

export default function LiveDashboard({
  customer,
  account,
  network,
  tickets,
  recharge,
}: Props) {
  const isEmpty = !customer && !account && !network && tickets.length === 0 && !recharge;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <LayoutDashboard size={16} className="text-gray-400" />
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Live Dashboard
        </h2>
      </div>

      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <LayoutDashboard size={24} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400">
              Start a call to see live data here
            </p>
            <p className="text-xs text-gray-300 mt-1">
              Customer info, account details, and diagnostics will appear in real-time
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3">
          {customer && <CustomerCard customer={customer} />}
          {account && <AccountDetails account={account} />}
          {network && <NetworkStatus network={network} />}
          {recharge && <RechargeConfirmation recharge={recharge} />}
          {tickets.map((t) => (
            <TicketCard key={t.data.ticket_id} ticket={t.data} isNew={t.isNew} />
          ))}
        </div>
      )}
    </div>
  );
}
