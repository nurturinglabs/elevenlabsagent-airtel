"use client";

import { CustomerInfoDisplay } from "@/lib/types";
import { User, MapPin } from "lucide-react";

interface Props {
  customer: CustomerInfoDisplay;
}

const segmentColors: Record<string, string> = {
  platinum: "bg-purple-100 text-purple-700 border-purple-200",
  gold: "bg-amber-100 text-amber-700 border-amber-200",
  silver: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function CustomerCard({ customer }: Props) {
  return (
    <div className="animate-slide-in bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <User size={18} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{customer.name}</h3>
            <p className="text-xs text-gray-500 font-mono">{customer.phone}</p>
          </div>
        </div>
        <span
          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
            segmentColors[customer.segment] || segmentColors.silver
          }`}
        >
          {customer.segment}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <MapPin size={12} />
          {customer.region}
        </span>
        <span className="capitalize">{customer.type}</span>
      </div>
    </div>
  );
}
