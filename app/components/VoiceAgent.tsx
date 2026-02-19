"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { Phone, PhoneOff, Mic } from "lucide-react";
import Transcript, { TranscriptMessage } from "./Transcript";
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

export default function VoiceAgent({
  onActiveSystemChange,
  onCustomerInfo,
  onAccountDetails,
  onNetworkStatus,
  onTicketInfo,
  onRechargeConfirmation,
}: Props) {
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [language, setLanguage] = useState<string>("Hinglish");
  const activeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      setMessages((prev) => [
        ...prev,
        {
          role: message.source === "ai" ? "agent" : "user",
          text: message.message,
          timestamp: new Date(),
        },
      ]);

      // Simple language detection
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

  useEffect(() => {
    return () => {
      if (activeTimeoutRef.current) clearTimeout(activeTimeoutRef.current);
    };
  }, []);

  const handleStart = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID!,
        connectionType: "webrtc",
      });
    } catch (err) {
      console.error("Failed to start:", err);
    }
  };

  const handleEnd = async () => {
    await conversation.endSession();
    onActiveSystemChange(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Mic size={14} className="text-red-500" />
          Voice Agent
        </h2>
        {isConnected && (
          <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {language}
          </span>
        )}
      </div>

      {/* Orb */}
      <div className="flex justify-center py-8">
        <div className="relative">
          {/* Pulse ring */}
          {isConnected && isSpeaking && (
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-20" />
          )}
          {isConnecting && (
            <div className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-20" />
          )}
          {/* Main orb */}
          <div
            className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${
              isConnected
                ? isSpeaking
                  ? "bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.5)] scale-110"
                  : "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                : isConnecting
                ? "bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                : "bg-gray-200"
            }`}
          >
            <Mic
              size={36}
              className={`transition-colors ${
                isConnected || isConnecting ? "text-white" : "text-gray-400"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Status text */}
      <p className="text-center text-xs text-gray-400 mb-4">
        {isConnecting
          ? "Connecting..."
          : isConnected
          ? isSpeaking
            ? "Agent is speaking..."
            : "Listening..."
          : "Click Start Call to begin"}
      </p>

      {/* Controls */}
      <div className="flex justify-center gap-3 mb-4">
        {!isConnected ? (
          <button
            onClick={handleStart}
            disabled={isConnecting}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            <Phone size={16} />
            {isConnecting ? "Connecting..." : "Start Call"}
          </button>
        ) : (
          <button
            onClick={handleEnd}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            <PhoneOff size={16} />
            End Call
          </button>
        )}
      </div>

      {/* Transcript */}
      <div className="flex-1 min-h-0 border-t border-gray-100 pt-3">
        <Transcript messages={messages} />
      </div>
    </div>
  );
}
