"use client";

import { BackendSystem } from "@/lib/types";
import { Monitor, Cloud, Server, Database, Wifi, Ticket, ChevronRight } from "lucide-react";

interface Props {
  activeSystem: BackendSystem;
}

const systems = [
  { id: "crm" as const, label: "CRM", sub: "Salesforce", icon: Database },
  { id: "billing" as const, label: "Billing", sub: "SAP", icon: Server },
  { id: "network" as const, label: "Network", sub: "Diagnostics", icon: Wifi },
  { id: "ticketing" as const, label: "Ticketing", sub: "ServiceNow", icon: Ticket },
];

export default function ArchitectureDiagram({ activeSystem }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6">
        Enterprise Architecture — Live System Flow
      </h3>

      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {/* Customer / Browser */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
            <Monitor size={22} className="text-gray-600" />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Browser</span>
        </div>

        <ChevronRight size={16} className="text-gray-300" />

        {/* ElevenLabs */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
            <Cloud size={22} className="text-red-500" />
          </div>
          <span className="text-[10px] text-red-500 font-medium">ElevenLabs</span>
        </div>

        <ChevronRight size={16} className="text-gray-300" />

        {/* Middleware */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Server size={22} className="text-blue-500" />
          </div>
          <span className="text-[10px] text-blue-500 font-medium">Middleware</span>
        </div>

        <ChevronRight size={16} className="text-gray-300" />

        {/* Backend Systems */}
        <div className="flex items-center gap-2 sm:gap-3">
          {systems.map((sys) => {
            const isActive = activeSystem === sys.id;
            const Icon = sys.icon;
            return (
              <div key={sys.id} className="flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "bg-green-50 border-green-400 shadow-[0_0_12px_rgba(34,197,94,0.4)]"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Icon
                    size={22}
                    className={`transition-colors duration-500 ${
                      isActive ? "text-green-600" : "text-gray-400"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors duration-500 ${
                    isActive ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {sys.label}
                </span>
                <span className="text-[8px] text-gray-400">{sys.sub}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
