"use client";

import { NetworkStatusDisplay } from "@/lib/types";
import { Signal, Wifi, AlertTriangle } from "lucide-react";

interface Props {
  network: NetworkStatusDisplay;
}

const signalConfig: Record<string, { color: string; label: string }> = {
  good: { color: "text-green-600", label: "Strong" },
  fair: { color: "text-amber-500", label: "Fair" },
  weak: { color: "text-red-500", label: "Weak" },
};

const towerConfig: Record<string, { color: string; bg: string }> = {
  operational: { color: "text-green-700", bg: "bg-green-50" },
  degraded: { color: "text-amber-700", bg: "bg-amber-50" },
  down: { color: "text-red-700", bg: "bg-red-50" },
};

export default function NetworkStatus({ network }: Props) {
  const signal = signalConfig[network.signal_strength] || signalConfig.good;
  const tower = towerConfig[network.tower_status] || towerConfig.operational;

  return (
    <div className="animate-slide-in bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Network Diagnostics
      </h4>

      <div className="grid grid-cols-3 gap-3">
        {/* Signal */}
        <div className="text-center">
          <Signal size={20} className={`mx-auto ${signal.color}`} />
          <p className="text-xs font-medium text-gray-900 mt-1">{signal.label}</p>
          <p className="text-[10px] text-gray-400">Signal</p>
        </div>

        {/* Speed */}
        <div className="text-center">
          <Wifi size={20} className="mx-auto text-blue-500" />
          <p className="text-xs font-medium text-gray-900 mt-1">
            {network.download_speed} Mbps
          </p>
          <p className="text-[10px] text-gray-400">Download</p>
        </div>

        {/* Tower */}
        <div className="text-center">
          <div
            className={`mx-auto w-6 h-6 rounded-full ${tower.bg} flex items-center justify-center`}
          >
            <span className={`text-[10px] font-bold ${tower.color}`}>
              {network.network_type}
            </span>
          </div>
          <p className="text-xs font-medium text-gray-900 mt-1 capitalize">
            {network.tower_status}
          </p>
          <p className="text-[10px] text-gray-400">Tower</p>
        </div>
      </div>

      {/* Outage Banner */}
      {network.has_outage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-red-800">Area Outage Detected</p>
            {network.outage_eta && (
              <p className="text-[10px] text-red-600 mt-0.5">
                Estimated resolution: {new Date(network.outage_eta).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
