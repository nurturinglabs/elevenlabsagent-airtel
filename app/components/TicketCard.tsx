"use client";

import { TicketInfoDisplay } from "@/lib/types";
import { Ticket, Clock } from "lucide-react";

interface Props {
  ticket: TicketInfoDisplay;
  isNew?: boolean;
}

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-blue-100 text-blue-700",
};

const statusColors: Record<string, string> = {
  open: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
};

export default function TicketCard({ ticket, isNew }: Props) {
  return (
    <div
      className={`animate-slide-in bg-white rounded-xl border p-4 ${
        isNew ? "border-green-300 ring-1 ring-green-200" : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Ticket size={16} className="text-gray-400" />
          <span className="text-xs font-mono font-semibold text-gray-900">
            {ticket.ticket_id}
          </span>
          {isNew && (
            <span className="text-[9px] font-bold uppercase bg-green-500 text-white px-1.5 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              priorityColors[ticket.priority] || priorityColors.medium
            }`}
          >
            {ticket.priority}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              statusColors[ticket.status] || statusColors.open
            }`}
          >
            {ticket.status.replace("_", " ")}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-2">{ticket.issue}</p>

      {ticket.eta && (
        <div className="flex items-center gap-1.5 mt-2 text-[10px] text-gray-400">
          <Clock size={10} />
          <span>ETA: {new Date(ticket.eta).toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
