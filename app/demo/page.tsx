"use client";

import { useState, useCallback } from "react";
import Disclaimer from "../components/Disclaimer";
import VoiceAgent from "../components/VoiceAgent";
import LiveDashboard from "../components/LiveDashboard";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import FDENotes from "../components/FDENotes";
import {
  BackendSystem,
  CustomerInfoDisplay,
  AccountDetailsDisplay,
  NetworkStatusDisplay,
  TicketInfoDisplay,
  RechargeConfirmationDisplay,
} from "@/lib/types";

export default function DemoPage() {
  // Dashboard state
  const [activeSystem, setActiveSystem] = useState<BackendSystem>(null);
  const [customer, setCustomer] = useState<CustomerInfoDisplay | null>(null);
  const [account, setAccount] = useState<AccountDetailsDisplay | null>(null);
  const [network, setNetwork] = useState<NetworkStatusDisplay | null>(null);
  const [tickets, setTickets] = useState<{ data: TicketInfoDisplay; isNew: boolean }[]>([]);
  const [recharge, setRecharge] = useState<RechargeConfirmationDisplay | null>(null);

  const handleTicketInfo = useCallback((data: TicketInfoDisplay, isNew: boolean) => {
    setTickets((prev) => {
      const exists = prev.some((t) => t.data.ticket_id === data.ticket_id);
      if (exists) return prev;
      return [...prev, { data, isNew }];
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Disclaimer />

      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              <span className="text-red-600">airtel</span> Customer Support
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Powered by{" "}
              <span className="font-medium text-gray-700">ElevenLabs Conversational AI</span>
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Demo Phones</p>
              <p className="text-xs text-gray-500 font-mono">
                9876543210 &middot; 9876543211 &middot; 9876543212
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ minHeight: "70vh" }}>
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 flex flex-col">
            <VoiceAgent
              onActiveSystemChange={setActiveSystem}
              onCustomerInfo={setCustomer}
              onAccountDetails={setAccount}
              onNetworkStatus={setNetwork}
              onTicketInfo={handleTicketInfo}
              onRechargeConfirmation={setRecharge}
            />
          </div>

          <div className="lg:col-span-3 bg-gray-50 rounded-2xl border border-gray-200 p-5 flex flex-col">
            <LiveDashboard
              customer={customer}
              account={account}
              network={network}
              tickets={tickets}
              recharge={recharge}
            />
          </div>
        </div>

        <div className="mt-8">
          <ArchitectureDiagram activeSystem={activeSystem} />
        </div>

        <div className="mt-8">
          <FDENotes />
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-12 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">
          Portfolio Demo &middot; Not affiliated with Bharti Airtel Limited &middot;
          Built with{" "}
          <span className="text-red-500 font-medium">ElevenLabs</span> &middot; 2026
        </p>
      </footer>
    </div>
  );
}
