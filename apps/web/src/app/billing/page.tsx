"use client";

import { Sidebar } from "@/components/sidebar";
import { CheckCircle } from "lucide-react";
import { PLANS } from "@revenue-reception/shared";

export default function BillingPage() {
  const plans = Object.entries(PLANS);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-500 mt-1">Manage your subscription and view usage</p>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Current Plan: Growth</h3>
              <p className="text-sm text-gray-500 mt-1">750 AI minutes included • CRM integration • SMS follow-up</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$497<span className="text-sm text-gray-500 font-normal">/mo</span></div>
              <div className="text-sm text-green-600">Active</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Minutes Used This Period</span>
              <span className="font-medium">312 / 750</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
              <div className="bg-brand-500 h-2 rounded-full" style={{ width: "41.6%" }} />
            </div>
          </div>
        </div>

        {/* Plans */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Plans</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white rounded-xl border-2 p-6 ${
                key === "GROWTH" ? "border-brand-600" : "border-gray-200"
              }`}
            >
              {key === "GROWTH" && (
                <span className="bg-brand-600 text-white text-xs font-medium px-3 py-1 rounded-full">Current</span>
              )}
              <h3 className="text-lg font-bold text-gray-900 mt-3">{plan.name}</h3>
              <div className="mt-2 mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {plan.minutesIncluded} AI minutes
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {plan.agents} AI receptionist{plan.agents > 1 ? "s" : ""}
                </li>
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-lg font-medium transition ${
                  key === "GROWTH"
                    ? "bg-gray-100 text-gray-500 cursor-default"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                }`}
              >
                {key === "GROWTH" ? "Current Plan" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
