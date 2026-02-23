"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SupportAnalytics } from "@/components/support-analytics";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">airtel</span>
              <span className="text-sm text-gray-400 font-medium">Analytics</span>
            </div>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Dashboard */}
      <div className="pt-14 px-5 py-4 h-screen overflow-hidden">
        <SupportAnalytics />
      </div>
    </div>
  );
}
