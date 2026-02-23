# Airtel AI Support

Voice agent for telecom customer support — handles balance checks, network troubleshooting, recharges, and support tickets. Built on ElevenLabs Conversational AI with WebRTC.

**Live:** [elevenlabsagent-airtel.vercel.app](https://elevenlabsagent-airtel.vercel.app)

## What It Does

A customer calls in, speaks naturally, and the voice agent handles the request end-to-end by querying backend systems in real-time:

- **CRM** — customer lookup by phone number
- **Billing** — balance, plan details, recharge processing
- **Network** — signal strength, speed tests, outage detection
- **Ticketing** — create and retrieve support tickets

The dashboard shows live backend activity as the agent works.

## ElevenLabs Integration

**Conversational AI** via `@elevenlabs/react` with WebRTC streaming.

**Server Tools** (agent calls these API routes):
| Tool | Endpoint | Purpose |
|------|----------|---------|
| lookup-customer | `/api/agent/lookup-customer` | Find customer by phone |
| account-details | `/api/agent/account-details` | Get billing info |
| network-diagnostic | `/api/agent/network-diagnostic` | Run network diagnostics |
| process-recharge | `/api/agent/process-recharge` | Process a recharge |
| create-ticket | `/api/agent/create-ticket` | Create support ticket |
| get-tickets | `/api/agent/get-tickets` | Retrieve ticket history |

**Client Tools** (agent triggers these UI updates):
| Tool | What It Does |
|------|-------------|
| display_customer_info | Shows customer identity and segment |
| display_account_details | Shows balance, plan, data usage |
| display_network_status | Shows signal, speed, outage info |
| display_ticket_info | Shows ticket details and status |
| show_recharge_confirmation | Shows recharge confirmation |

## Pages

- `/` — Landing page with problem/solution framing
- `/demo` — Interactive voice agent with live dashboard
- `/analytics` — Support call analytics (call volume, CSAT, resolution rates)

## Demo Phone Numbers

- `9876543210` — Rahul Sharma (Prepaid, Gold)
- `9876543211` — Priya Patel (Postpaid, Platinum)
- `9876543212` — Amit Kumar (Prepaid, Silver)

## Tech Stack

Next.js 16 | TypeScript | Tailwind v4 | ElevenLabs SDK | Recharts | Vercel

## Setup

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_AGENT_ID=your_elevenlabs_agent_id
```

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).
