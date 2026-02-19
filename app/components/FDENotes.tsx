"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface NoteSection {
  title: string;
  items: string[];
}

const sections: NoteSection[] = [
  {
    title: "Data Residency & Compliance",
    items: [
      "In production, all call recordings and transcripts stored in Indian data centers per TRAI regulations",
      "Customer consent captured at call start (\"This call may be recorded for quality purposes\")",
      "PII masked in logs — phone numbers and account details redacted in monitoring systems",
      "Data retention: Recordings auto-deleted after 90 days per telecom guidelines",
    ],
  },
  {
    title: "Authentication & Security",
    items: [
      "Production deployment uses OAuth2 Client Credentials flow via corporate IdP (Okta/Azure AD)",
      "Service account with read-only access to CRM and Billing, write access limited to Ticketing",
      "All API calls over mTLS within internal network",
      "Security review: ElevenLabs SOC 2 Type II compliance documentation provided to Airtel security team",
    ],
  },
  {
    title: "Scale Considerations",
    items: [
      "Airtel handles ~2M customer support calls/day",
      "Architecture uses stateless middleware — horizontally scalable on Kubernetes",
      "Redis caching for plan catalog, tower status (refreshed every 5 min) — avoids redundant SAP/network queries",
      "Customer-specific data always fetched live (balance, usage) — never cached",
      "ElevenLabs platform handles voice agent scaling; middleware designed for 50K+ concurrent webhook calls",
    ],
  },
  {
    title: "Business Impact Estimate",
    items: [
      "Current average call center cost: ~₹15 per call",
      "AI agent handles 60-70% of routine queries (balance, usage, recharge, status check)",
      "Conservative 30% full deflection rate = 600K calls/day handled entirely by AI",
      "Savings: ₹9M/day = ₹270 Crore/year",
      "Additional: 24/7 availability (no night shift staffing), consistent quality, zero hold time",
    ],
  },
  {
    title: "Language Architecture",
    items: [
      "Hindi/English/Hinglish mid-call switching handled by ElevenLabs multilingual model",
      "In production, extend to Kannada, Tamil, Telugu, Bengali, Marathi for regional circles",
      "Language detection automatic — no \"press 1 for Hindi\" needed",
      "Technical terms (4G, data, GB, Mbps, recharge) kept in English across all languages",
    ],
  },
];

export default function FDENotes() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        FDE Deployment Notes
      </h3>

      <div className="space-y-1">
        {sections.map((section, i) => (
          <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-800">{section.title}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === i && (
              <div className="px-4 pb-3">
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-xs text-gray-600 flex gap-2">
                      <span className="text-gray-300 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
