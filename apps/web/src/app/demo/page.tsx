"use client";

import Link from "next/link";
import { Bot, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20">
              <Bot className="h-6 w-6" />
            </div>
            <p className="text-lg font-bold tracking-tight">RevenueReception AI</p>
          </Link>
          <Link href="/">
            <Button variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            <CheckCircle2 className="h-4 w-4" />
            Free demo — no credit card required
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            See RevenueReception AI <span className="text-cyan-300">in Action</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Book a personalized demo to see how our AI receptionist can answer calls, qualify leads, and book appointments
            for your business — 24/7.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-lg">
          <Card className="rounded-[2rem] border-white/10 bg-white/5">
            <CardContent className="p-8">
              <h2 className="mb-6 text-xl font-bold">Request a Demo</h2>
              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Business Type</label>
                  <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400">
                    <option value="">Select your industry</option>
                    <option value="hvac">HVAC</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="roofing">Roofing</option>
                    <option value="dental">Dental</option>
                    <option value="medspa">Med Spa</option>
                    <option value="law">Law Firm</option>
                    <option value="insurance">Insurance</option>
                    <option value="homecare">PSW / Home Care</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (416) 555-1234"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-14 w-full rounded-full bg-cyan-400 text-base font-bold text-slate-950 hover:bg-cyan-300"
                >
                  Book My Demo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
