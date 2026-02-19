// ─── CRM Types ───

export interface Customer {
  customer_id: string;
  name: string;
  phone: string;
  email: string;
  type: "prepaid" | "postpaid";
  language_pref: "hindi" | "english" | "hinglish";
  region: string;
  circle: string;
  since: string;
  segment: "silver" | "gold" | "platinum";
  last_interaction: string;
  nps_score: number;
}

// ─── Billing Types ───

export interface Plan {
  name: string;
  price: number;
  validity_days: number;
  data_per_day: string;
  calls: string;
  sms: string;
  ott: string[];
}

export interface PlanUpgrade {
  name: string;
  price: number;
  data_per_day: string;
  validity_days: number;
  extras: string;
}

export interface BillingAccount {
  customer_id: string;
  plan: Plan;
  balance: number;
  data_used_today: string;
  data_remaining_today: string;
  total_data_used_cycle: string;
  validity_end: string;
  days_remaining: number;
  auto_recharge: boolean;
  last_recharge: {
    amount: number;
    date: string;
    method: string;
  };
  available_upgrades: PlanUpgrade[];
}

export interface RechargeResponse {
  success: boolean;
  transaction_id: string;
  customer_id: string;
  plan_name: string;
  amount: number;
  new_validity: string;
  message: string;
}

// ─── Network Types ───

export interface SpeedTest {
  download_mbps: number;
  upload_mbps: number;
  latency_ms: number;
}

export interface AreaOutage {
  area: string;
  since: string;
  eta_resolution: string;
  reason: string;
}

export interface NetworkDiagnostics {
  phone: string;
  sim_status: string;
  network_type: string;
  signal_strength: "good" | "fair" | "weak";
  current_tower: string;
  tower_status: "operational" | "degraded" | "down";
  tower_load: string;
  speed_test: SpeedTest;
  recent_issues: string[];
  area_outages: AreaOutage[];
  last_tower_switch: string;
}

// ─── Ticketing Types ───

export interface Ticket {
  ticket_id: string;
  issue: string;
  category?: string;
  priority?: string;
  status: string;
  created: string;
  last_update?: string;
  assigned_to?: string;
  notes?: string;
  resolved?: string;
}

export interface TicketResponse {
  customer_id: string;
  open_tickets: Ticket[];
  recent_closed: Ticket[];
}

// ─── Dashboard Display Types (client tool params) ───

export interface CustomerInfoDisplay {
  name: string;
  phone: string;
  type: string;
  segment: string;
  region: string;
}

export interface AccountDetailsDisplay {
  plan_name: string;
  balance: number;
  data_remaining: string;
  validity_end: string;
  days_remaining: number;
}

export interface NetworkStatusDisplay {
  signal_strength: string;
  network_type: string;
  download_speed: number;
  tower_status: string;
  has_outage: boolean;
  outage_eta: string;
}

export interface TicketInfoDisplay {
  ticket_id: string;
  issue: string;
  status: string;
  priority: string;
  eta: string;
}

export interface RechargeConfirmationDisplay {
  plan_name: string;
  amount: number;
  transaction_id: string;
  new_validity: string;
}

// ─── Architecture Diagram ───

export type BackendSystem =
  | "crm"
  | "billing"
  | "network"
  | "ticketing"
  | null;
