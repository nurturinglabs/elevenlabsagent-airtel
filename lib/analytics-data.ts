// ─── Support Call Analytics Mock Data ───
// Simulates 45 days of AI voice support data (Jan 8 – Feb 21, 2026)

export interface SupportCall {
  id: string;
  customer_id: string;
  customer_name: string;
  phone: string;
  date: string; // ISO
  duration_seconds: number;
  category: "billing" | "network" | "recharge" | "account" | "complaint";
  language: "hindi" | "english" | "hinglish";
  resolved_by_ai: boolean;
  escalated: boolean;
  csat_score: number | null; // 1–5
  circle: string;
  segment: "silver" | "gold" | "platinum";
}

export const supportCalls: SupportCall[] = [
  // ── January 2026 ─────────────────────────
  { id: "SC-001", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-01-08T09:12:00Z", duration_seconds: 95, category: "recharge", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Karnataka", segment: "gold" },
  { id: "SC-002", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-01-08T11:30:00Z", duration_seconds: 240, category: "network", language: "hindi", resolved_by_ai: false, escalated: true, csat_score: 2, circle: "UP East", segment: "silver" },
  { id: "SC-003", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-01-09T14:20:00Z", duration_seconds: 78, category: "billing", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-004", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-01-10T10:45:00Z", duration_seconds: 132, category: "recharge", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Karnataka", segment: "silver" },
  { id: "SC-005", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-01-11T16:00:00Z", duration_seconds: 65, category: "account", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Telangana", segment: "gold" },
  { id: "SC-006", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-01-13T08:30:00Z", duration_seconds: 310, category: "complaint", language: "hindi", resolved_by_ai: false, escalated: true, csat_score: 1, circle: "UP East", segment: "silver" },
  { id: "SC-007", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-01-14T13:15:00Z", duration_seconds: 88, category: "billing", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Karnataka", segment: "gold" },
  { id: "SC-008", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-01-15T10:00:00Z", duration_seconds: 55, category: "account", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-009", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-01-16T15:40:00Z", duration_seconds: 185, category: "network", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 3, circle: "Karnataka", segment: "silver" },
  { id: "SC-010", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-01-17T09:50:00Z", duration_seconds: 72, category: "recharge", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Telangana", segment: "gold" },
  { id: "SC-011", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-01-19T11:20:00Z", duration_seconds: 280, category: "network", language: "hindi", resolved_by_ai: false, escalated: true, csat_score: 2, circle: "UP East", segment: "silver" },
  { id: "SC-012", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-01-20T14:00:00Z", duration_seconds: 110, category: "billing", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Karnataka", segment: "gold" },
  { id: "SC-013", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-01-21T10:30:00Z", duration_seconds: 45, category: "account", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-014", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-01-22T16:10:00Z", duration_seconds: 155, category: "recharge", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Karnataka", segment: "silver" },
  { id: "SC-015", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-01-23T08:45:00Z", duration_seconds: 190, category: "complaint", language: "english", resolved_by_ai: false, escalated: true, csat_score: 3, circle: "Telangana", segment: "gold" },
  { id: "SC-016", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-01-25T12:00:00Z", duration_seconds: 95, category: "recharge", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "UP East", segment: "silver" },
  { id: "SC-017", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-01-27T09:30:00Z", duration_seconds: 68, category: "account", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Karnataka", segment: "gold" },
  { id: "SC-018", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-01-28T15:15:00Z", duration_seconds: 125, category: "billing", language: "english", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-019", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-01-29T11:00:00Z", duration_seconds: 82, category: "network", language: "english", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Telangana", segment: "gold" },
  { id: "SC-020", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-01-30T10:20:00Z", duration_seconds: 220, category: "complaint", language: "hindi", resolved_by_ai: false, escalated: true, csat_score: 2, circle: "Karnataka", segment: "silver" },

  // ── February 2026 ─────────────────────────
  { id: "SC-021", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-02-01T09:00:00Z", duration_seconds: 75, category: "recharge", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Karnataka", segment: "gold" },
  { id: "SC-022", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-02-02T13:45:00Z", duration_seconds: 165, category: "billing", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 3, circle: "UP East", segment: "silver" },
  { id: "SC-023", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-02-03T10:30:00Z", duration_seconds: 58, category: "account", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-024", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-02-04T14:20:00Z", duration_seconds: 92, category: "recharge", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Telangana", segment: "gold" },
  { id: "SC-025", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-02-05T11:10:00Z", duration_seconds: 290, category: "network", language: "hinglish", resolved_by_ai: false, escalated: true, csat_score: 2, circle: "Karnataka", segment: "silver" },
  { id: "SC-026", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-02-06T08:50:00Z", duration_seconds: 105, category: "billing", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "UP East", segment: "silver" },
  { id: "SC-027", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-02-07T16:30:00Z", duration_seconds: 140, category: "network", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Karnataka", segment: "gold" },
  { id: "SC-028", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-02-08T09:15:00Z", duration_seconds: 48, category: "account", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-029", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-02-09T12:00:00Z", duration_seconds: 88, category: "recharge", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Telangana", segment: "gold" },
  { id: "SC-030", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-02-10T10:40:00Z", duration_seconds: 175, category: "complaint", language: "hindi", resolved_by_ai: false, escalated: true, csat_score: 2, circle: "Karnataka", segment: "silver" },
  { id: "SC-031", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-02-11T14:30:00Z", duration_seconds: 115, category: "recharge", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "UP East", segment: "silver" },
  { id: "SC-032", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-02-12T09:20:00Z", duration_seconds: 62, category: "billing", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Karnataka", segment: "gold" },
  { id: "SC-033", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-02-13T11:45:00Z", duration_seconds: 55, category: "account", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-034", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-02-14T15:00:00Z", duration_seconds: 98, category: "billing", language: "english", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Telangana", segment: "gold" },
  { id: "SC-035", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-02-15T08:30:00Z", duration_seconds: 260, category: "network", language: "hinglish", resolved_by_ai: false, escalated: true, csat_score: 3, circle: "Karnataka", segment: "silver" },
  { id: "SC-036", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-02-16T13:10:00Z", duration_seconds: 85, category: "recharge", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "UP East", segment: "silver" },
  { id: "SC-037", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-02-17T10:00:00Z", duration_seconds: 72, category: "account", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Karnataka", segment: "gold" },
  { id: "SC-038", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-02-18T14:50:00Z", duration_seconds: 42, category: "billing", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-039", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-02-19T09:30:00Z", duration_seconds: 150, category: "network", language: "english", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Telangana", segment: "gold" },
  { id: "SC-040", customer_id: "CUST-005", customer_name: "Mohammed Irfan", phone: "9876543214", date: "2026-02-19T16:20:00Z", duration_seconds: 195, category: "complaint", language: "hindi", resolved_by_ai: false, escalated: true, csat_score: 2, circle: "Karnataka", segment: "silver" },
  { id: "SC-041", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-02-20T08:15:00Z", duration_seconds: 78, category: "recharge", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "UP East", segment: "silver" },
  { id: "SC-042", customer_id: "CUST-001", customer_name: "Rahul Sharma", phone: "9876543210", date: "2026-02-20T12:45:00Z", duration_seconds: 110, category: "billing", language: "hinglish", resolved_by_ai: true, escalated: false, csat_score: 4, circle: "Karnataka", segment: "gold" },
  { id: "SC-043", customer_id: "CUST-002", customer_name: "Priya Patel", phone: "9876543211", date: "2026-02-21T10:00:00Z", duration_seconds: 55, category: "account", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Maharashtra", segment: "platinum" },
  { id: "SC-044", customer_id: "CUST-004", customer_name: "Sneha Reddy", phone: "9876543213", date: "2026-02-21T11:30:00Z", duration_seconds: 68, category: "recharge", language: "english", resolved_by_ai: true, escalated: false, csat_score: 5, circle: "Telangana", segment: "gold" },
  { id: "SC-045", customer_id: "CUST-003", customer_name: "Amit Kumar", phone: "9876543212", date: "2026-02-21T15:00:00Z", duration_seconds: 200, category: "network", language: "hindi", resolved_by_ai: true, escalated: false, csat_score: 3, circle: "UP East", segment: "silver" },
];
