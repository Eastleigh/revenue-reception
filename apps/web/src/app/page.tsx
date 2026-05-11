"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Calendar,
  MessageSquare,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Phone,
    title: "24/7 AI Receptionist",
    description: "Never miss a revenue call. Our AI answers instantly, qualifies leads, and sounds natural.",
  },
  {
    icon: Calendar,
    title: "Auto-Book Appointments",
    description: "AI checks your calendar, finds open slots, and books appointments in real time.",
  },
  {
    icon: MessageSquare,
    title: "SMS Confirmations",
    description: "Automatic text confirmations, missed call recovery, and follow-up messages.",
  },
  {
    icon: BarChart3,
    title: "Revenue Attribution",
    description: "See exactly how much revenue your AI receptionist generates with ROI dashboards.",
  },
];

const industries = [
  "HVAC", "Plumbing", "Roofing", "Dental", "Med Spa",
  "Home Care", "Law Firms", "Insurance",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RevenueReception</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <Link
              href="/onboarding"
              className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Phone Reception
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Never Miss Another{" "}
            <span className="text-brand-600">Revenue Call</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI receptionist answers 24/7, qualifies the caller, books the
            appointment, and updates your CRM — so you never lose a lead again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="bg-brand-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-brand-700 transition flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 px-8 py-3 rounded-lg text-lg font-medium border border-gray-200 hover:border-gray-300 transition"
            >
              View Demo
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Industries */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium mb-6">
            BUILT FOR LOCAL SERVICE BUSINESSES
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {industries.map((industry) => (
              <span
                key={industry}
                className="bg-white px-4 py-2 rounded-full text-gray-700 text-sm font-medium border border-gray-200"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything Your Receptionist Does, But Better
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From answering calls to booking appointments and tracking revenue — all automated.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-brand-200 hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Set Up Your AI", desc: "Choose your industry template, add your business details, and connect your calendar." },
              { step: "2", title: "Forward Your Calls", desc: "Route your business phone to your AI receptionist number. Works with any phone system." },
              { step: "3", title: "Watch Revenue Grow", desc: "Every call is answered, qualified, and booked. Track ROI in your dashboard." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: "Starter", price: "$297", features: ["300 AI minutes/mo", "1 AI receptionist", "Basic dashboard", "Call logging"] },
            { name: "Growth", price: "$497", features: ["750 AI minutes/mo", "CRM integration", "SMS follow-up", "Calendar booking", "Advanced analytics"], popular: true },
            { name: "Agency", price: "$997", features: ["2000 AI minutes/mo", "5 client accounts", "White-label dashboard", "Multi-location", "API access"] },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`bg-white p-8 rounded-xl border-2 ${plan.popular ? "border-brand-600 shadow-lg" : "border-gray-200"}`}
            >
              {plan.popular && (
                <span className="bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mt-4">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/onboarding"
                className={`block text-center py-3 rounded-lg font-medium transition ${
                  plan.popular
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RevenueReception AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
