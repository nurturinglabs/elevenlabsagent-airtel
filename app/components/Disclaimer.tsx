"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function Disclaimer() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center relative">
      <p className="text-xs text-amber-800">
        <span className="font-semibold">Portfolio Demo</span> — Not affiliated
        with Bharti Airtel Limited. Built to demonstrate ElevenLabs
        Conversational AI for enterprise telecom.
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
