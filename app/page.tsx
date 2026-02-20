import Link from "next/link";
import {
  Phone,
  Users,
  Globe,
  Headphones,
  Clock,
  ArrowRight,
  Zap,
  Brain,
  MessageSquare,
  Shield,
  BarChart3,
  Languages,
  Server,
  Wifi,
  CreditCard,
  Ticket,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-red-600">airtel</span>
            <span className="text-sm text-gray-400 font-medium">AI Support</span>
          </div>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Live Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-medium text-red-700">ElevenLabs Conversational AI</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.08] tracking-tight">
              Voice AI for India's
              <br />
              <span className="text-red-600">largest telecom.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-xl">
              What if Airtel's 370 million subscribers could talk to an AI agent that
              understands Hindi, English, and Hinglish — and resolves issues in under 2 minutes
              instead of 12?
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
              >
                Try the Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#why"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 text-gray-600 font-medium border border-gray-200 rounded-xl hover:border-red-200 hover:text-red-600 transition-colors"
              >
                Why this matters
              </a>
            </div>
          </div>

          {/* Scale Numbers */}
          <div className="mt-20 grid grid-cols-4 gap-6">
            {[
              { value: "370M+", label: "Subscribers", sub: "Largest in India, 2nd globally", icon: Users },
              { value: "100M+", label: "Monthly Calls", sub: "To customer support centers", icon: Headphones },
              { value: "12 min", label: "Avg Handle Time", sub: "Current voice support wait", icon: Clock },
              { value: "23", label: "Languages", sub: "Across India's diverse regions", icon: Languages },
            ].map((stat) => (
              <div key={stat.label} className="relative group">
                <div className="p-6 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all">
                  <stat.icon className="w-5 h-5 text-red-500 mb-3" />
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-1">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section id="why" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl font-bold text-gray-900">The scale of the problem</h2>
            <p className="mt-3 text-gray-500 leading-relaxed">
              Airtel is not just any telecom. It's the backbone of connectivity for a third of India.
              Every minute, thousands of customers call in with billing questions, network issues,
              recharge requests, and complaints — in dozens of languages and dialects.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Pain Point Cards */}
            <div className="p-6 rounded-xl bg-white border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Long wait times</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Average 12+ minute handle time per call. Customers wait in IVR queues, get transferred
                between departments, repeat their issue multiple times. CSAT drops with every minute.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                <Languages className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Language complexity</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                India speaks 22 official languages and hundreds of dialects. Most callers switch
                between Hindi and English mid-sentence (Hinglish). Traditional IVRs can't handle this.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <Server className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Fragmented backend systems</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Customer data lives across CRM, billing, network monitoring, and ticketing systems.
                Agents spend half their time just pulling up the right screens. An AI agent can
                query all four simultaneously.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-gray-200">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Cost at scale</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                At 100M+ calls per month, even reducing average handle time by 30 seconds saves
                hundreds of crores annually. Automating 40-60% of routine calls transforms the
                unit economics of support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-gray-900">What this demo shows</h2>
            <p className="mt-3 text-gray-500">
              A fully functional voice AI agent that handles end-to-end customer support
              for Airtel — built on ElevenLabs Conversational AI.
            </p>
          </div>

          {/* Architecture Flow */}
          <div className="grid grid-cols-5 gap-0 items-start mb-16">
            {[
              { icon: Phone, label: "Customer Calls", desc: "Speaks naturally in Hindi, English, or Hinglish", color: "from-red-500 to-red-600", shadow: "shadow-red-500/25" },
              { icon: Brain, label: "AI Understands", desc: "ElevenLabs STT + LLM processes intent in real-time", color: "from-gray-800 to-gray-900", shadow: "shadow-gray-800/25" },
              { icon: Server, label: "Systems Queried", desc: "CRM, Billing, Network, Ticketing — all in parallel", color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/25" },
              { icon: Zap, label: "Action Taken", desc: "Recharge processed, ticket created, issue diagnosed", color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/25" },
              { icon: MessageSquare, label: "Customer Resolved", desc: "Speaks response back naturally with confirmation", color: "from-emerald-500 to-green-600", shadow: "shadow-emerald-500/25" },
            ].map((step, i) => (
              <div key={step.label} className="relative text-center px-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-lg ${step.shadow}`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                {i < 4 && (
                  <div className="absolute top-7 left-[calc(50%+36px)] w-[calc(100%-36px)] h-[1px] bg-gray-300">
                    <ArrowRight className="w-3 h-3 text-gray-400 absolute -right-1.5 -top-1.5" />
                  </div>
                )}
                <h3 className="text-xs font-bold text-gray-900 mt-3">{step.label}</h3>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Capability Cards */}
          <div className="grid grid-cols-3 gap-5">
            {[
              {
                icon: Wifi,
                title: "Network Diagnostics",
                desc: "Real-time signal strength, tower status, speed tests, and outage detection. The agent diagnoses connectivity issues like a Level 2 technician.",
                color: "text-blue-500 bg-blue-50",
              },
              {
                icon: CreditCard,
                title: "Billing & Recharge",
                desc: "Balance checks, plan details, recharge processing, and upgrade recommendations — all handled conversationally without menu navigation.",
                color: "text-emerald-500 bg-emerald-50",
              },
              {
                icon: Ticket,
                title: "Smart Ticketing",
                desc: "Auto-creates tickets with correct priority and category. Checks existing tickets. Escalates when AI confidence is low.",
                color: "text-amber-500 bg-amber-50",
              },
              {
                icon: Users,
                title: "CRM Integration",
                desc: "Instantly identifies the customer, pulls account history, segment tier, and NPS score to personalize every interaction.",
                color: "text-purple-500 bg-purple-50",
              },
              {
                icon: Languages,
                title: "Hindi-English-Hinglish",
                desc: "Seamlessly handles code-switching between languages. Detects preferred language and responds accordingly — no 'Press 1 for English'.",
                color: "text-red-500 bg-red-50",
              },
              {
                icon: Shield,
                title: "Enterprise Ready",
                desc: "Architecture designed for data residency compliance, authentication layers, and horizontal scaling to handle millions of concurrent sessions.",
                color: "text-gray-700 bg-gray-100",
              },
            ].map((cap) => (
              <div key={cap.title} className="p-5 rounded-xl border border-gray-200 hover:border-red-200 hover:shadow-lg transition-all group">
                <div className={`w-10 h-10 rounded-lg ${cap.color} flex items-center justify-center mb-3`}>
                  <cap.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">{cap.title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white">The business case</h2>
            <p className="mt-3 text-gray-400 max-w-lg mx-auto">
              Conservative estimates for deploying voice AI at Airtel's scale.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[
              { value: "40-60%", label: "Calls Automated", desc: "Routine queries handled end-to-end without human agent" },
              { value: "<2 min", label: "Resolution Time", desc: "Down from 12+ minutes average handle time" },
              { value: "500Cr+", label: "Annual Savings", desc: "Estimated cost reduction from automation at scale" },
              { value: "35pts", label: "CSAT Improvement", desc: "From instant resolution and zero hold time" },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-4xl font-bold text-red-500">{metric.value}</p>
                <p className="text-sm font-semibold text-white mt-2">{metric.label}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ElevenLabs */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why ElevenLabs for this</h2>
          <p className="text-gray-500 leading-relaxed mb-10 max-w-2xl">
            This isn't a chatbot with a voice wrapper. ElevenLabs Conversational AI provides the
            full stack — speech-to-text, LLM reasoning, tool orchestration, and text-to-speech —
            over a single low-latency WebRTC connection. That matters when you're handling a call
            where the customer is already frustrated.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Sub-second voice latency via WebRTC — feels like talking to a human",
              "Server tools (webhooks) for real-time backend system access",
              "Client tools for live UI updates while the conversation happens",
              "Native multilingual support — Hindi, English, Hinglish without mode switching",
              "Scalable to millions of concurrent sessions",
              "React SDK for rapid frontend integration",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 p-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <p className="text-sm text-gray-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-red-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            See it in action
          </h2>
          <p className="mt-4 text-red-100 max-w-md mx-auto">
            Call the demo agent, check a balance, report a network issue, or recharge a plan —
            in Hindi or English. Everything works end-to-end.
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all shadow-lg text-lg"
          >
            Launch Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-600">airtel</span>
            <span className="text-xs text-gray-400">AI Support Demo</span>
          </div>
          <p className="text-xs text-gray-400">
            Portfolio Demo &middot; Not affiliated with Bharti Airtel &middot; Built with ElevenLabs &middot; By Umesh
          </p>
        </div>
      </footer>
    </div>
  );
}
