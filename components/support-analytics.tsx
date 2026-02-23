"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Phone,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Bot,
  AlertTriangle,
} from "lucide-react";
import { supportCalls, SupportCall } from "@/lib/analytics-data";

// ── Muted, professional palette ──────────────────────────────
// Bar chart uses tonal shades of a single hue (slate/gray) so it reads
// as one cohesive chart. Donut uses 3 restrained tones. Progress bars
// all use the Airtel red at varying opacities.

const BAR_FILLS: Record<string, string> = {
  billing:   "#1e293b", // slate-800
  network:   "#475569", // slate-600
  recharge:  "#94a3b8", // slate-400
  account:   "#cbd5e1", // slate-300
  complaint: "#dc2626", // red-600 (standout)
};

const LANG_FILLS: Record<string, string> = {
  hindi:    "#dc2626", // red-600
  english:  "#64748b", // slate-500
  hinglish: "#e2e8f0", // slate-200
};

const CATEGORY_LABELS: Record<string, string> = {
  billing: "Billing",
  network: "Network",
  recharge: "Recharge",
  account: "Account",
  complaint: "Complaint",
};

// ── Chart data builder ───────────────────────────────────────

type BarRow = { label: string; billing: number; network: number; recharge: number; account: number; complaint: number };

function bucketCalls(calls: SupportCall[], start: Date, end: Date): Omit<BarRow, "label"> {
  const b = calls.filter((c) => {
    const d = new Date(c.date);
    return d >= start && d <= end;
  });
  return {
    billing: b.filter((c) => c.category === "billing").length,
    network: b.filter((c) => c.category === "network").length,
    recharge: b.filter((c) => c.category === "recharge").length,
    account: b.filter((c) => c.category === "account").length,
    complaint: b.filter((c) => c.category === "complaint").length,
  };
}

function computeChartData(calls: SupportCall[], period: "daily" | "weekly" | "monthly"): BarRow[] {
  if (calls.length === 0) return [];
  const rows: BarRow[] = [];

  if (period === "daily") {
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(day.getDate() - i);
      day.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);
      rows.push({
        label: day.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        ...bucketCalls(calls, day, dayEnd),
      });
    }
  } else if (period === "weekly") {
    const current = new Date("2026-01-05");
    const now = new Date();
    while (current <= now) {
      const weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      rows.push({
        label: current.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        ...bucketCalls(calls, current, weekEnd),
      });
      current.setDate(current.getDate() + 7);
    }
  } else {
    const months = [
      { start: new Date("2026-01-01"), end: new Date("2026-01-31T23:59:59.999Z"), label: "Jan" },
      { start: new Date("2026-02-01"), end: new Date("2026-02-28T23:59:59.999Z"), label: "Feb" },
    ];
    for (const m of months) {
      rows.push({ label: m.label, ...bucketCalls(calls, m.start, m.end) });
    }
  }
  return rows;
}

// ── Stat Card (monochrome + red accent) ──────────────────────

function StatCard({
  icon: Icon,
  value,
  label,
  trend,
  trendLabel,
}: {
  icon: React.ElementType;
  value: string | number;
  label: string;
  trend?: "up" | "down";
  trendLabel?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-3">
      <div className="flex items-start justify-between mb-1.5">
        <div className="w-8 h-8 rounded-md flex items-center justify-center bg-gray-100">
          <Icon className="w-4 h-4 text-gray-500" />
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-[10px] font-medium ${
            trend === "up" ? "text-gray-900" : "text-red-600"
          }`}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendLabel && <span>{trendLabel}</span>}
          </div>
        )}
      </div>
      <p className="text-xl font-bold text-gray-900 leading-none">{value}</p>
      <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}

// ── Progress Bar ─────────────────────────────────────────────

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────

export function SupportAnalytics() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");

  // ── Filter calls by period ────────────────────────────────

  const { filteredCalls, periodLabel } = useMemo(() => {
    const now = new Date();
    let cutoff: Date;
    let label: string;

    if (period === "daily") {
      cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - 7);
      cutoff.setHours(0, 0, 0, 0);
      label = "Last 7 days";
    } else if (period === "weekly") {
      cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - 28);
      cutoff.setHours(0, 0, 0, 0);
      label = "Last 4 weeks";
    } else {
      cutoff = new Date("2026-01-01");
      label = "Jan – Feb 2026";
    }

    const filtered = supportCalls.filter((c) => new Date(c.date) >= cutoff);
    return { filteredCalls: filtered, periodLabel: label };
  }, [period]);

  // ── Metrics ───────────────────────────────────────────────

  const totalCalls = filteredCalls.length;
  const resolvedByAI = filteredCalls.filter((c) => c.resolved_by_ai).length;
  const escalated = filteredCalls.filter((c) => c.escalated).length;
  const automationRate = totalCalls > 0 ? Math.round((resolvedByAI / totalCalls) * 100) : 0;
  const escalationRate = totalCalls > 0 ? Math.round((escalated / totalCalls) * 100) : 0;

  const avgDuration = totalCalls > 0
    ? Math.round(filteredCalls.reduce((s, c) => s + c.duration_seconds, 0) / totalCalls)
    : 0;
  const avgDurationStr = avgDuration >= 60
    ? `${Math.floor(avgDuration / 60)}m ${avgDuration % 60}s`
    : `${avgDuration}s`;

  const csatCalls = filteredCalls.filter((c) => c.csat_score !== null);
  const avgCSAT = csatCalls.length > 0
    ? (csatCalls.reduce((s, c) => s + (c.csat_score || 0), 0) / csatCalls.length).toFixed(1)
    : "–";

  const resolutionRate = totalCalls > 0
    ? Math.round(((totalCalls - escalated) / totalCalls) * 100)
    : 0;

  // ── Chart data ────────────────────────────────────────────

  const chartData = useMemo(() => computeChartData(filteredCalls, period), [filteredCalls, period]);

  const languageData = (["hindi", "english", "hinglish"] as const).map((lang) => ({
    name: lang.charAt(0).toUpperCase() + lang.slice(1),
    value: filteredCalls.filter((c) => c.language === lang).length,
    color: LANG_FILLS[lang],
  }));

  const categoryData = (["billing", "network", "recharge", "account", "complaint"] as const).map((cat) => {
    const count = filteredCalls.filter((c) => c.category === cat).length;
    return {
      category: cat,
      label: CATEGORY_LABELS[cat],
      count,
      pct: totalCalls > 0 ? Math.round((count / totalCalls) * 100) : 0,
      color: BAR_FILLS[cat],
    };
  });

  const circleData: Record<string, number> = {};
  filteredCalls.forEach((c) => {
    circleData[c.circle] = (circleData[c.circle] || 0) + 1;
  });
  const circleEntries = Object.entries(circleData).sort((a, b) => b[1] - a[1]);

  const aiResolved = filteredCalls.filter((c) => c.resolved_by_ai);
  const avgAIDuration = aiResolved.length > 0
    ? Math.round(aiResolved.reduce((s, c) => s + c.duration_seconds, 0) / aiResolved.length)
    : 0;
  const humanEscalated = filteredCalls.filter((c) => c.escalated);
  const avgHumanDuration = humanEscalated.length > 0
    ? Math.round(humanEscalated.reduce((s, c) => s + c.duration_seconds, 0) / humanEscalated.length)
    : 0;

  const highCSAT = csatCalls.filter((c) => (c.csat_score || 0) >= 4).length;
  const highCSATPct = csatCalls.length > 0 ? Math.round((highCSAT / csatCalls.length) * 100) : 0;

  // Red shades for region bars (dark → light)
  const regionShades = ["#991b1b", "#b91c1c", "#dc2626", "#ef4444", "#fca5a5"];

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-80px)]">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Support Analytics</h1>
          <p className="text-xs text-gray-400">{periodLabel} · {totalCalls} calls · AI Voice Agent</p>
        </div>
        <div className="flex rounded-md border border-gray-200 overflow-hidden">
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium ${
                period === p ? "bg-gray-900 text-white" : "bg-white text-gray-400 hover:bg-gray-50"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── 6 Stat Cards ────────────────────────────────── */}
      <div className="grid grid-cols-6 gap-3 flex-shrink-0">
        <StatCard icon={Phone} value={totalCalls} label="Total Calls" trend="up" trendLabel="+5" />
        <StatCard icon={CheckCircle} value={`${resolutionRate}%`} label="Resolution Rate" trend="up" />
        <StatCard icon={Clock} value={avgDurationStr} label="Avg Handle Time" trend="down" trendLabel="-18s" />
        <StatCard icon={TrendingUp} value={avgCSAT} label="CSAT Score" trend="up" />
        <StatCard icon={Bot} value={`${automationRate}%`} label="AI Resolved" trend="up" trendLabel="+3%" />
        <StatCard icon={AlertTriangle} value={`${escalationRate}%`} label="Escalation Rate" trend="down" />
      </div>

      {/* ── Row 1: Stacked bar (large) + Donut (small) ── */}
      <div className="grid grid-cols-[1fr_300px] gap-4 flex-1 min-h-0">
        {/* Call Volume — stacked bar */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call Volume by Category</h3>
            <div className="flex items-center gap-3 text-[10px] text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: BAR_FILLS.billing }} />Billing</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: BAR_FILLS.network }} />Network</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: BAR_FILLS.recharge }} />Recharge</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: BAR_FILLS.account }} />Account</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm inline-block" style={{ backgroundColor: BAR_FILLS.complaint }} />Complaint</span>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "11px", padding: "6px 10px" }} cursor={{ fill: "#f9fafb" }} />
                <Bar dataKey="billing" stackId="a" fill={BAR_FILLS.billing} name="Billing" />
                <Bar dataKey="network" stackId="a" fill={BAR_FILLS.network} name="Network" />
                <Bar dataKey="recharge" stackId="a" fill={BAR_FILLS.recharge} name="Recharge" />
                <Bar dataKey="account" stackId="a" fill={BAR_FILLS.account} name="Account" />
                <Bar dataKey="complaint" stackId="a" fill={BAR_FILLS.complaint} name="Complaint" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Language Distribution — donut */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 flex-shrink-0">Language Split</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={languageData} cx="50%" cy="50%" innerRadius="40%" outerRadius="65%" paddingAngle={3} dataKey="value" stroke="none">
                  {languageData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "6px", border: "1px solid #e5e7eb", fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 flex-shrink-0 pt-1 border-t border-gray-100">
            {languageData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color, border: d.color === "#e2e8f0" ? "1px solid #cbd5e1" : "none" }} />
                  <span className="text-gray-500">{d.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">{d.value}</span>
                  <span className="text-gray-400 w-8 text-right">{totalCalls > 0 ? Math.round((d.value / totalCalls) * 100) : 0}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Categories + Resolution + Regions ──── */}
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Call Categories */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex-shrink-0">Call Categories</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            {categoryData.map((c) => (
              <div key={c.category}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-xs text-gray-500">{c.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-800">{c.count}</span>
                    <span className="text-[10px] text-gray-400">({c.pct}%)</span>
                  </div>
                </div>
                <ProgressBar value={c.count} max={totalCalls} color={c.color} />
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Metrics */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex-shrink-0">Resolution Metrics</h3>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">AI Resolution</span>
                <span className="text-xs font-bold text-gray-800">{automationRate}%</span>
              </div>
              <ProgressBar value={automationRate} max={100} color="#1e293b" />
              <p className="text-[10px] text-gray-400 mt-0.5">{resolvedByAI} of {totalCalls} calls</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Avg AI Duration</span>
                <span className="text-xs font-bold text-gray-800">{Math.floor(avgAIDuration / 60)}m {avgAIDuration % 60}s</span>
              </div>
              <ProgressBar value={300 - avgAIDuration} max={300} color="#475569" />
              <p className="text-[10px] text-gray-400 mt-0.5">vs {Math.floor(avgHumanDuration / 60)}m {avgHumanDuration % 60}s escalated</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">CSAT (4-5 stars)</span>
                <span className="text-xs font-bold text-gray-800">{highCSATPct}%</span>
              </div>
              <ProgressBar value={highCSATPct} max={100} color="#94a3b8" />
              <p className="text-[10px] text-gray-400 mt-0.5">{highCSAT} of {csatCalls.length} rated calls</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Escalation Rate</span>
                <span className="text-xs font-bold text-red-600">{escalationRate}%</span>
              </div>
              <ProgressBar value={escalated} max={totalCalls} color="#dc2626" />
              <p className="text-[10px] text-gray-400 mt-0.5">{escalated} calls needed human agent</p>
            </div>
          </div>
        </div>

        {/* Region Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex flex-col">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex-shrink-0">Region Distribution</h3>
          <div className="flex-1 flex flex-col justify-center gap-3">
            {circleEntries.map(([circle, count], i) => (
              <div key={circle}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">{circle}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-800">{count}</span>
                    <span className="text-[10px] text-gray-400">({totalCalls > 0 ? Math.round((count / totalCalls) * 100) : 0}%)</span>
                  </div>
                </div>
                <ProgressBar value={count} max={totalCalls} color={regionShades[i % regionShades.length]} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
