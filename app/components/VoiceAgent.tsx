"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { Phone, PhoneOff, Mic } from "lucide-react";
import {
  BackendSystem,
  CustomerInfoDisplay,
  AccountDetailsDisplay,
  NetworkStatusDisplay,
  TicketInfoDisplay,
  RechargeConfirmationDisplay,
} from "@/lib/types";

interface Props {
  onActiveSystemChange: (system: BackendSystem) => void;
  onCustomerInfo: (data: CustomerInfoDisplay) => void;
  onAccountDetails: (data: AccountDetailsDisplay) => void;
  onNetworkStatus: (data: NetworkStatusDisplay) => void;
  onTicketInfo: (data: TicketInfoDisplay, isNew: boolean) => void;
  onRechargeConfirmation: (data: RechargeConfirmationDisplay) => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function VoiceAgent({
  onActiveSystemChange,
  onCustomerInfo,
  onAccountDetails,
  onNetworkStatus,
  onTicketInfo,
  onRechargeConfirmation,
}: Props) {
  const [language, setLanguage] = useState<string>("Hinglish");
  const [callDuration, setCallDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const activeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const highlightSystem = useCallback(
    (system: BackendSystem) => {
      onActiveSystemChange(system);
      if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = setTimeout(() => {
        onActiveSystemChange(null);
      }, 3000);
    },
    [onActiveSystemChange]
  );

  const conversation = useConversation({
    onMessage: (message) => {
      // Language detection from agent messages
      const text = message.message.toLowerCase();
      const hindiPattern = /[\u0900-\u097F]|kya|hai|mein|mera|kaise|nahi|kitna|aapka|kab|chahiye/;
      const englishPattern = /^[a-zA-Z0-9\s.,!?'"()-]+$/;

      if (hindiPattern.test(text) && !englishPattern.test(text)) {
        setLanguage("Hindi");
      } else if (englishPattern.test(text)) {
        setLanguage("English");
      } else {
        setLanguage("Hinglish");
      }
    },
    onError: (error) => {
      console.error("Conversation error:", error);
    },
    clientTools: {
      display_customer_info: async (params: Record<string, unknown>) => {
        highlightSystem("crm");
        onCustomerInfo(params as unknown as CustomerInfoDisplay);
        return "Customer info displayed on dashboard";
      },
      display_account_details: async (params: Record<string, unknown>) => {
        highlightSystem("billing");
        onAccountDetails(params as unknown as AccountDetailsDisplay);
        return "Account details displayed on dashboard";
      },
      display_network_status: async (params: Record<string, unknown>) => {
        highlightSystem("network");
        onNetworkStatus(params as unknown as NetworkStatusDisplay);
        return "Network status displayed on dashboard";
      },
      display_ticket_info: async (params: Record<string, unknown>) => {
        highlightSystem("ticketing");
        const isNew = (params as Record<string, unknown>).status === "open";
        onTicketInfo(params as unknown as TicketInfoDisplay, isNew);
        return "Ticket info displayed on dashboard";
      },
      show_recharge_confirmation: async (params: Record<string, unknown>) => {
        highlightSystem("billing");
        onRechargeConfirmation(params as unknown as RechargeConfirmationDisplay);
        return "Recharge confirmation displayed on dashboard";
      },
    },
  });

  const { status, isSpeaking } = conversation;
  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  // Call duration timer
  useEffect(() => {
    if (isConnected) {
      setCallDuration(0);
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isConnected]);

  useEffect(() => {
    return () => {
      if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
    };
  }, []);

  const handleStart = async () => {
    setError(null);
    try {
      if (!process.env.NEXT_PUBLIC_AGENT_ID) {
        setError("Agent ID not configured. Set NEXT_PUBLIC_AGENT_ID in environment variables.");
        return;
      }
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID,
        connectionType: "webrtc",
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to start call";
      setError(msg.includes("Permission") || msg.includes("NotAllowed")
        ? "Microphone access denied. Please allow microphone permissions."
        : msg);
      console.error("Failed to start:", err);
    }
  };

  const handleEnd = async () => {
    await conversation.endSession();
    onActiveSystemChange(null);
  };

  return (
    <div className="flex flex-col h-full items-center justify-center">
      {/* Language badge */}
      {isConnected && (
        <div className="mb-6">
          <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full uppercase tracking-wider">
            {language}
          </span>
        </div>
      )}

      {/* Orb area */}
      <div className="relative flex items-center justify-center my-8">
        {/* Outer ripple rings */}
        {isConnected && isSpeaking && (
          <>
            <div className="absolute w-48 h-48 rounded-full border border-red-200 animate-ping opacity-10" />
            <div className="absolute w-40 h-40 rounded-full border border-red-300 animate-ping opacity-15" style={{ animationDelay: "0.3s" }} />
          </>
        )}
        {isConnected && !isSpeaking && (
          <div className="absolute w-40 h-40 rounded-full border border-red-200 animate-pulse opacity-20" />
        )}
        {isConnecting && (
          <div className="absolute w-40 h-40 rounded-full border border-amber-300 animate-ping opacity-15" />
        )}

        {/* Main orb */}
        <div
          className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 ease-in-out ${
            isConnected
              ? isSpeaking
                ? "bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_60px_rgba(239,68,68,0.5)] scale-110"
                : "bg-gradient-to-br from-red-500 to-red-600 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
              : isConnecting
              ? "bg-gradient-to-br from-amber-400 to-amber-500 shadow-[0_0_30px_rgba(251,191,36,0.3)] animate-pulse"
              : "bg-gray-200"
          }`}
        >
          <Mic
            size={40}
            className={`transition-all duration-500 ${
              isConnected
                ? isSpeaking
                  ? "text-white scale-110"
                  : "text-white/90"
                : isConnecting
                ? "text-white"
                : "text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Call timer */}
      {isConnected && (
        <div className="mb-2">
          <span className="text-2xl font-mono font-light text-gray-800 tracking-widest">
            {formatDuration(callDuration)}
          </span>
        </div>
      )}

      {/* Status text */}
      <p className="text-sm text-gray-400 mb-8">
        {isConnecting
          ? "Connecting to Airtel AI..."
          : isConnected
          ? isSpeaking
            ? "Agent is speaking"
            : "Listening..."
          : "Call Airtel AI Support"}
      </p>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isConnected ? (
          <button
            onClick={handleStart}
            disabled={isConnecting}
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Phone size={24} />
          </button>
        ) : (
          <button
            onClick={handleEnd}
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <PhoneOff size={24} />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500 mt-4 text-center max-w-xs">
          {error}
        </p>
      )}

      {/* Hint */}
      {!isConnected && !isConnecting && !error && (
        <p className="text-[10px] text-gray-300 mt-4">
          Try: &quot;Mera balance kitna hai?&quot; or &quot;My internet is slow&quot;
        </p>
      )}
    </div>
  );
}
