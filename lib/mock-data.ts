import {
  Customer,
  BillingAccount,
  NetworkDiagnostics,
  TicketResponse,
} from "./types";

// ─── CRM Mock Data ───

export const customers: Record<string, Customer> = {
  "9876543210": {
    customer_id: "CUST-001",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul.sharma@email.com",
    type: "prepaid",
    language_pref: "hinglish",
    region: "Karnataka",
    circle: "Karnataka",
    since: "2019-03-15",
    segment: "gold",
    last_interaction: "2026-01-28",
    nps_score: 7,
  },
  "9876543211": {
    customer_id: "CUST-002",
    name: "Priya Patel",
    phone: "9876543211",
    email: "priya.patel@email.com",
    type: "postpaid",
    language_pref: "english",
    region: "Maharashtra",
    circle: "Maharashtra",
    since: "2020-07-22",
    segment: "platinum",
    last_interaction: "2026-02-10",
    nps_score: 9,
  },
  "9876543212": {
    customer_id: "CUST-003",
    name: "Amit Kumar",
    phone: "9876543212",
    email: "amit.kumar@email.com",
    type: "prepaid",
    language_pref: "hindi",
    region: "UP",
    circle: "UP East",
    since: "2021-11-03",
    segment: "silver",
    last_interaction: "2026-02-17",
    nps_score: 4,
  },
  "9876543213": {
    customer_id: "CUST-004",
    name: "Sneha Reddy",
    phone: "9876543213",
    email: "sneha.reddy@email.com",
    type: "postpaid",
    language_pref: "english",
    region: "Telangana",
    circle: "Andhra Pradesh & Telangana",
    since: "2018-09-10",
    segment: "gold",
    last_interaction: "2026-02-05",
    nps_score: 8,
  },
  "9876543214": {
    customer_id: "CUST-005",
    name: "Mohammed Irfan",
    phone: "9876543214",
    email: "m.irfan@email.com",
    type: "prepaid",
    language_pref: "hinglish",
    region: "Karnataka",
    circle: "Karnataka",
    since: "2022-01-20",
    segment: "silver",
    last_interaction: "2026-01-15",
    nps_score: 6,
  },
};

// ─── Billing Mock Data ───

export const billingAccounts: Record<string, BillingAccount> = {
  "CUST-001": {
    customer_id: "CUST-001",
    plan: {
      name: "Airtel Unlimited 599",
      price: 599,
      validity_days: 56,
      data_per_day: "2 GB",
      calls: "Unlimited",
      sms: "100/day",
      ott: ["Airtel Xstream", "Amazon Prime Mobile"],
    },
    balance: 247,
    data_used_today: "1.3 GB",
    data_remaining_today: "0.7 GB",
    total_data_used_cycle: "18.3 GB",
    validity_end: "2026-03-15",
    days_remaining: 26,
    auto_recharge: false,
    last_recharge: { amount: 599, date: "2026-01-18", method: "UPI" },
    available_upgrades: [
      { name: "Airtel Unlimited 799", price: 799, data_per_day: "3 GB", validity_days: 56, extras: "Disney+ Hotstar" },
      { name: "Airtel Unlimited 1199", price: 1199, data_per_day: "Unlimited", validity_days: 84, extras: "All OTT" },
    ],
  },
  "CUST-002": {
    customer_id: "CUST-002",
    plan: {
      name: "Airtel Postpaid 999",
      price: 999,
      validity_days: 30,
      data_per_day: "Unlimited",
      calls: "Unlimited",
      sms: "Unlimited",
      ott: ["Airtel Xstream", "Amazon Prime", "Disney+ Hotstar"],
    },
    balance: 0,
    data_used_today: "3.2 GB",
    data_remaining_today: "Unlimited",
    total_data_used_cycle: "42.7 GB",
    validity_end: "2026-03-10",
    days_remaining: 21,
    auto_recharge: true,
    last_recharge: { amount: 999, date: "2026-02-10", method: "Auto-debit" },
    available_upgrades: [
      { name: "Airtel Postpaid 1499", price: 1499, data_per_day: "Unlimited", validity_days: 30, extras: "Netflix + All OTT" },
    ],
  },
  "CUST-003": {
    customer_id: "CUST-003",
    plan: {
      name: "Airtel Smart 299",
      price: 299,
      validity_days: 28,
      data_per_day: "1.5 GB",
      calls: "Unlimited",
      sms: "100/day",
      ott: ["Airtel Xstream"],
    },
    balance: 89,
    data_used_today: "1.1 GB",
    data_remaining_today: "0.4 GB",
    total_data_used_cycle: "12.8 GB",
    validity_end: "2026-02-28",
    days_remaining: 11,
    auto_recharge: false,
    last_recharge: { amount: 299, date: "2026-02-01", method: "UPI" },
    available_upgrades: [
      { name: "Airtel Unlimited 599", price: 599, data_per_day: "2 GB", validity_days: 56, extras: "Amazon Prime Mobile" },
      { name: "Airtel Unlimited 799", price: 799, data_per_day: "3 GB", validity_days: 56, extras: "Disney+ Hotstar" },
    ],
  },
  "CUST-004": {
    customer_id: "CUST-004",
    plan: {
      name: "Airtel Postpaid 749",
      price: 749,
      validity_days: 30,
      data_per_day: "3 GB",
      calls: "Unlimited",
      sms: "Unlimited",
      ott: ["Airtel Xstream", "Amazon Prime Mobile"],
    },
    balance: 0,
    data_used_today: "1.8 GB",
    data_remaining_today: "1.2 GB",
    total_data_used_cycle: "28.5 GB",
    validity_end: "2026-03-05",
    days_remaining: 16,
    auto_recharge: true,
    last_recharge: { amount: 749, date: "2026-02-05", method: "Auto-debit" },
    available_upgrades: [
      { name: "Airtel Postpaid 999", price: 999, data_per_day: "Unlimited", validity_days: 30, extras: "Disney+ Hotstar" },
    ],
  },
  "CUST-005": {
    customer_id: "CUST-005",
    plan: {
      name: "Airtel Value 199",
      price: 199,
      validity_days: 24,
      data_per_day: "1 GB",
      calls: "Unlimited",
      sms: "100/day",
      ott: [],
    },
    balance: 42,
    data_used_today: "0.6 GB",
    data_remaining_today: "0.4 GB",
    total_data_used_cycle: "8.2 GB",
    validity_end: "2026-02-22",
    days_remaining: 5,
    auto_recharge: false,
    last_recharge: { amount: 199, date: "2026-01-30", method: "Paytm" },
    available_upgrades: [
      { name: "Airtel Smart 299", price: 299, data_per_day: "1.5 GB", validity_days: 28, extras: "Airtel Xstream" },
      { name: "Airtel Unlimited 599", price: 599, data_per_day: "2 GB", validity_days: 56, extras: "Amazon Prime Mobile" },
    ],
  },
};

// ─── Network Mock Data ───

export const networkDiagnostics: Record<string, NetworkDiagnostics> = {
  "9876543210": {
    phone: "9876543210",
    sim_status: "active",
    network_type: "4G",
    signal_strength: "good",
    current_tower: "KA-BLR-MG-Road-042",
    tower_status: "operational",
    tower_load: "72%",
    speed_test: { download_mbps: 12.4, upload_mbps: 3.1, latency_ms: 34 },
    recent_issues: [],
    area_outages: [],
    last_tower_switch: "2026-02-17T10:23:00Z",
  },
  "9876543211": {
    phone: "9876543211",
    sim_status: "active",
    network_type: "4G",
    signal_strength: "good",
    current_tower: "MH-MUM-Andheri-089",
    tower_status: "operational",
    tower_load: "58%",
    speed_test: { download_mbps: 22.6, upload_mbps: 5.8, latency_ms: 18 },
    recent_issues: [],
    area_outages: [],
    last_tower_switch: "2026-02-17T08:12:00Z",
  },
  "9876543212": {
    phone: "9876543212",
    sim_status: "active",
    network_type: "4G",
    signal_strength: "weak",
    current_tower: "UP-LKO-Gomti-017",
    tower_status: "degraded",
    tower_load: "94%",
    speed_test: { download_mbps: 1.2, upload_mbps: 0.3, latency_ms: 210 },
    recent_issues: ["tower_congestion", "weather_interference"],
    area_outages: [
      {
        area: "Gomti Nagar",
        since: "2026-02-17T08:00:00Z",
        eta_resolution: "2026-02-17T18:00:00Z",
        reason: "fiber cut",
      },
    ],
    last_tower_switch: "2026-02-17T09:45:00Z",
  },
  "9876543213": {
    phone: "9876543213",
    sim_status: "active",
    network_type: "4G",
    signal_strength: "good",
    current_tower: "TS-HYD-Hitech-025",
    tower_status: "operational",
    tower_load: "45%",
    speed_test: { download_mbps: 28.3, upload_mbps: 7.2, latency_ms: 15 },
    recent_issues: [],
    area_outages: [],
    last_tower_switch: "2026-02-17T11:05:00Z",
  },
  "9876543214": {
    phone: "9876543214",
    sim_status: "active",
    network_type: "4G",
    signal_strength: "fair",
    current_tower: "KA-BLR-Whitefield-031",
    tower_status: "operational",
    tower_load: "81%",
    speed_test: { download_mbps: 6.8, upload_mbps: 1.9, latency_ms: 52 },
    recent_issues: ["tower_congestion"],
    area_outages: [],
    last_tower_switch: "2026-02-17T07:33:00Z",
  },
};

// ─── Ticketing Mock Data ───

export const ticketData: Record<string, TicketResponse> = {
  "CUST-001": {
    customer_id: "CUST-001",
    open_tickets: [
      {
        ticket_id: "TKT-44921",
        issue: "Slow internet speed",
        category: "network",
        priority: "medium",
        status: "in_progress",
        created: "2026-02-15T14:30:00Z",
        last_update: "2026-02-16T09:00:00Z",
        assigned_to: "Network Team - Karnataka",
        notes: "Tower congestion identified. Capacity upgrade scheduled.",
      },
    ],
    recent_closed: [
      {
        ticket_id: "TKT-43102",
        issue: "Recharge not credited",
        status: "resolved",
        created: "2026-01-20T11:00:00Z",
        resolved: "2026-01-20T11:45:00Z",
      },
    ],
  },
  "CUST-002": {
    customer_id: "CUST-002",
    open_tickets: [],
    recent_closed: [
      {
        ticket_id: "TKT-42890",
        issue: "International roaming activation",
        status: "resolved",
        created: "2026-01-10T08:30:00Z",
        resolved: "2026-01-10T09:15:00Z",
      },
    ],
  },
  "CUST-003": {
    customer_id: "CUST-003",
    open_tickets: [
      {
        ticket_id: "TKT-45102",
        issue: "No network coverage in Gomti Nagar area",
        category: "network",
        priority: "high",
        status: "open",
        created: "2026-02-17T10:00:00Z",
        last_update: "2026-02-17T10:00:00Z",
        assigned_to: "Network Team - UP East",
        notes: "Fiber cut reported. Maintenance team dispatched.",
      },
    ],
    recent_closed: [],
  },
  "CUST-004": {
    customer_id: "CUST-004",
    open_tickets: [],
    recent_closed: [
      {
        ticket_id: "TKT-41567",
        issue: "Postpaid bill dispute",
        status: "resolved",
        created: "2025-12-15T14:00:00Z",
        resolved: "2025-12-18T11:30:00Z",
      },
    ],
  },
  "CUST-005": {
    customer_id: "CUST-005",
    open_tickets: [],
    recent_closed: [],
  },
};

// ─── Helpers ───

let ticketCounter = 45200;
export function generateTicketId(): string {
  return `TKT-${++ticketCounter}`;
}

let txnCounter = 900000;
export function generateTransactionId(): string {
  return `TXN${++txnCounter}`;
}
