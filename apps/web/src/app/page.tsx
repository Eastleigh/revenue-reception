"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PhoneCall,
  CalendarCheck,
  MessageSquare,
  BarChart3,
  Zap,
  Building2,
  CheckCircle2,
  ArrowRight,
  Bot,
  Workflow,
  Headphones,
  DollarSign,
  Clock,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MetricProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex items-center gap-3 text-slate-300">
        <Icon className="h-5 w-5 text-cyan-300" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
    </div>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  unit: string;
  desc: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

function PricingCard({ name, price, unit, desc, features, featured, cta }: PricingCardProps) {
  return (
    <Card
      className={`rounded-[2rem] ${
        featured
          ? "border-cyan-300 bg-cyan-300 text-slate-950 shadow-2xl shadow-cyan-400/20"
          : "border-white/10 bg-white/5 text-white"
      }`}
    >
      <CardContent className="p-8">
        {featured && (
          <div className="mb-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-cyan-300">
            Best Value
          </div>
        )}

        <h3 className="text-2xl font-black">{name}</h3>

        <div className="mt-5 flex items-end gap-2">
          <p className="text-5xl font-black">{price}</p>
          <p className={featured ? "mb-2 text-slate-700" : "mb-2 text-slate-400"}>/{unit}</p>
        </div>

        <p className={`mt-4 leading-7 ${featured ? "text-slate-800" : "text-slate-300"}`}>{desc}</p>

        <div className="mt-8 space-y-4">
          {features.map((feature) => (
            <div key={feature} className="flex gap-3">
              <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-none ${featured ? "text-slate-950" : "text-cyan-300"}`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Link href="/demo">
          <Button
            className={`mt-8 h-12 w-full rounded-full font-bold ${
              featured ? "bg-slate-950 text-white hover:bg-slate-800" : "bg-white text-slate-950 hover:bg-slate-200"
            }`}
          >
            {cta}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function RevenueReceptionAIWebsite() {
  const industries = [
    "HVAC",
    "Plumbing",
    "Roofing",
    "Dental Clinics",
    "Med Spas",
    "Law Firms",
    "Insurance",
    "PSW / Home Care",
  ];

  const features = [
    {
      icon: PhoneCall,
      title: "24/7 AI Phone Receptionist",
      desc: "Answers inbound calls instantly, speaks naturally, asks the right questions, and never lets a high-value lead go to voicemail.",
    },
    {
      icon: CalendarCheck,
      title: "Appointment Booking",
      desc: "Connects to Google Calendar, finds available slots, books qualified callers, and sends confirmation automatically.",
    },
    {
      icon: MessageSquare,
      title: "SMS Follow-Up",
      desc: "Sends confirmations, missed-call recovery texts, reminders, and internal notifications after every important call.",
    },
    {
      icon: Workflow,
      title: "CRM Automation",
      desc: "Pushes every qualified lead into GoHighLevel, HubSpot, Salesforce, or a custom CRM using API/webhook integrations.",
    },
    {
      icon: BarChart3,
      title: "Revenue Dashboard",
      desc: "Shows calls handled, appointments booked, leads saved, transfers, revenue estimates, and ROI in one clean dashboard.",
    },
    {
      icon: Headphones,
      title: "Human Transfer Rules",
      desc: "Transfers urgent calls, angry callers, emergency jobs, and high-value opportunities to a real person when needed.",
    },
  ];

  const advantages = [
    "Built for revenue, not just customer support",
    "Industry-specific call flows instead of generic scripts",
    "Missed-call recovery that turns lost leads into booked jobs",
    "Works with Retell AI for natural voice conversations",
    "CRM, calendar, SMS, and analytics built into one system",
    "White-label model for agencies and consultants",
    "Perfect for high-ticket local service businesses",
    "Pay-per-minute pricing — only pay for real conversations",
  ];

  const steps = [
    {
      number: "01",
      title: "Choose Your Industry",
      desc: "Pick a prebuilt template for HVAC, roofing, dental, med spa, legal, insurance, PSW/home care, or another service business.",
    },
    {
      number: "02",
      title: "Train Your AI Receptionist",
      desc: "Add services, business hours, service area, pricing notes, emergency rules, FAQs, and transfer instructions.",
    },
    {
      number: "03",
      title: "Connect Your Tools",
      desc: "Connect Retell AI, Google Calendar, CRM, SMS, Stripe, and your business phone workflow.",
    },
    {
      number: "04",
      title: "Turn Calls Into Revenue",
      desc: "The AI answers, qualifies, books, follows up, transfers when needed, and tracks how much revenue it helped save.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">RevenueReception AI</p>
              <p className="text-xs text-slate-400">AI Voice Agents for Booked Appointments</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#industries" className="hover:text-white">Industries</a>
            <a href="#advantage" className="hover:text-white">Advantages</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </nav>

          <Link href="/demo">
            <Button className="rounded-full bg-cyan-400 px-5 text-slate-950 hover:bg-cyan-300">
              Book Demo
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute right-10 top-48 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Zap className="h-4 w-4" />
              Built with Retell AI + modern SaaS automation
            </div>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
              Turn Every Phone Call Into a <span className="text-cyan-300">Booked Appointment.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              RevenueReception AI is a 24/7 voice receptionist that answers calls, qualifies leads, books appointments,
              sends SMS follow-ups, updates your CRM, and proves how much revenue it helped recover.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/demo">
                <Button className="h-14 rounded-full bg-cyan-400 px-8 text-base font-bold text-slate-950 hover:bg-cyan-300">
                  Get a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  variant="outline"
                  className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-base text-white hover:bg-white/10"
                >
                  See How It Works
                </Button>
              </a>
            </div>

            <div className="mt-8 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                No missed calls
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                More booked jobs
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-300" />
                CRM-ready leads
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card className="rounded-[2rem] border-white/10 bg-white/10 p-2 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <CardContent className="rounded-[1.5rem] bg-slate-900 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Live Call Dashboard</p>
                    <h3 className="text-2xl font-bold">Today&apos;s Revenue Impact</h3>
                  </div>
                  <div className="rounded-full bg-green-400/10 px-3 py-1 text-sm text-green-300">
                    Live
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Metric icon={PhoneCall} label="Calls Answered" value="42" />
                  <Metric icon={CalendarCheck} label="Appointments Booked" value="13" />
                  <Metric icon={DollarSign} label="Estimated Revenue Saved" value="$4,550" />
                  <Metric icon={Clock} label="Avg. Response Time" value="0 sec" />
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-cyan-400 p-3 text-slate-950">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold">AI Call Summary</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Caller needs emergency AC repair in Mississauga. Qualified as high priority, booked for 3:30 PM,
                        SMS confirmation sent, lead pushed to GoHighLevel.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">The product</p>
            <h2 className="text-4xl font-black md:text-5xl">Not a chatbot. A revenue receptionist.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Built to solve the most expensive problem in local service businesses: missed calls, slow follow-up,
              unqualified leads, and appointments that never get booked.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="rounded-3xl border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
              >
                <CardContent className="p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="border-y border-white/10 bg-white/[0.03] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Vertical templates</p>
              <h2 className="text-4xl font-black md:text-5xl">Launch by industry. Win by specialization.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Generic AI phone agents are hard to sell. Industry-specific agents are easy to understand. Each template
                comes with call scripts, qualification rules, transfer logic, and follow-up flows.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <Building2 className="h-5 w-5 text-cyan-300" />
                  <span className="font-semibold">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="advantage" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Your advantage</p>
              <h2 className="text-4xl font-black md:text-5xl">Why this offer is easier to sell.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Business owners do not wake up wanting &quot;AI.&quot; They want more calls answered, more appointments booked,
                less staff pressure, and a clear return on investment. This product speaks their language.
              </p>

              <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6">
                <p className="text-2xl font-black text-cyan-200">Core sales promise:</p>
                <p className="mt-3 text-xl leading-8 text-white">
                  &quot;We answer every call, recover missed leads, book appointments, and show you the revenue we helped save.&quot;
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {advantages.map((item, index) => (
                <div key={index} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-cyan-300" />
                  <p className="text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">How it works</p>
            <h2 className="text-4xl font-black md:text-5xl">From sign-up to booked calls in four steps.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.number} className="rounded-3xl border-white/10 bg-slate-900/70">
                <CardContent className="p-6">
                  <p className="text-5xl font-black text-cyan-400/30">{step.number}</p>
                  <h3 className="mt-5 text-xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Pricing</p>
            <h2 className="text-4xl font-black md:text-5xl">Only pay for real conversations.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              No monthly minimums. No wasted minutes. Just transparent per-minute billing that scales with your call volume.
            </p>
          </div>

          {/* Cost comparison */}
          <div className="mx-auto mb-14 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="mb-4 text-center text-sm font-bold uppercase tracking-widest text-cyan-300">Why per-minute wins</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
                <p className="text-2xl font-black text-red-400">$25/hr</p>
                <p className="mt-1 text-sm text-slate-400">Human receptionist</p>
              </div>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                <p className="text-2xl font-black text-amber-400">$1.50/min</p>
                <p className="mt-1 text-sm text-slate-400">Answering service</p>
              </div>
              <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-center">
                <p className="text-2xl font-black text-cyan-300">$0.69/min</p>
                <p className="mt-1 text-sm text-slate-400">RevenueReception AI</p>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-slate-400">
              A 3-minute call costs you ~$2.07 — and books a $500+ service appointment.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <PricingCard
              name="Pay As You Go"
              price="$0.99"
              unit="min"
              desc="Zero commitment. Perfect for getting started or low-volume businesses."
              features={["No monthly fee", "1 AI receptionist", "Call summaries & transcripts", "Basic dashboard", "SMS confirmations"]}
              cta="Start Free Trial"
            />
            <PricingCard
              featured
              name="Growth"
              price="$0.69"
              unit="min"
              desc="Volume pricing for businesses booking 20+ appointments per month."
              features={["500+ min/month commitment", "Google Calendar booking", "GoHighLevel integration", "Revenue tracking & ROI", "Priority support"]}
              cta="Get Started"
            />
            <PricingCard
              name="Agency"
              price="$0.49"
              unit="min"
              desc="Wholesale rates for agencies reselling AI receptionists to clients."
              features={["2,000+ min/month across accounts", "White-label dashboard", "Multi-location support", "Advanced reporting", "Dedicated onboarding"]}
              cta="Talk to Sales"
            />
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            All plans include unlimited AI receptionists, all 8 industry templates, and full webhook/CRM support. No setup fees.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 p-8 text-center md:p-14">
          <Layers className="mx-auto mb-6 h-12 w-12 text-cyan-200" />
          <h2 className="text-4xl font-black md:text-5xl">
            Build the AI receptionist that local businesses actually pay for.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            Start with HVAC or PSW/home care, prove the system with real calls, then package it as a high-margin SaaS
            and agency white-label offer.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/demo">
              <Button className="h-14 rounded-full bg-cyan-300 px-8 text-base font-bold text-slate-950 hover:bg-cyan-200">
                Start Building
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                className="h-14 rounded-full border-white/20 bg-white/5 px-8 text-base text-white hover:bg-white/10"
              >
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <p>&copy; 2026 RevenueReception AI. All rights reserved.</p>
          <p>Powered by AI voice, automation, and revenue-focused workflows.</p>
        </div>
      </footer>
    </div>
  );
}
