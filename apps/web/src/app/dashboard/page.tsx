"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  PhoneIncoming,
  PhoneMissed,
  Calendar,
  ArrowRightLeft,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { MetricCard } from "@/components/metric-card";
import { formatCurrency } from "@/lib/utils";

interface DashboardMetrics {
  totalCalls: number;
  answeredCalls: number;
  missedCalls: number;
  appointmentsBooked: number;
  transfers: number;
  estimatedRevenue: number;
  minutesUsed: number;
  estimatedAiCost: number;
  roi: number;
  leadQualityBreakdown: {
    hot: number;
    warm: number;
    cold: number;
    spam: number;
  };
}

const DEMO_METRICS: DashboardMetrics = {
  totalCalls: 156,
  answeredCalls: 142,
  missedCalls: 14,
  appointmentsBooked: 47,
  transfers: 8,
  estimatedRevenue: 42350,
  minutesUsed: 312,
  estimatedAiCost: 31.2,
  roi: 1357,
  leadQualityBreakdown: { hot: 23, warm: 67, cold: 48, spam: 18 },
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>(DEMO_METRICS);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    fetch(`${apiUrl}/api/dashboard/metrics?organizationId=demo`)
      .then((r) => r.json())
      .then((data) => {
        if (data.totalCalls !== undefined) setMetrics(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Your AI receptionist performance at a glance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Calls"
            value={metrics.totalCalls}
            change="+12% vs last month"
            changeType="positive"
            icon={Phone}
          />
          <MetricCard
            title="Answered Calls"
            value={metrics.answeredCalls}
            change={`${Math.round((metrics.answeredCalls / Math.max(metrics.totalCalls, 1)) * 100)}% answer rate`}
            changeType="positive"
            icon={PhoneIncoming}
          />
          <MetricCard
            title="Appointments Booked"
            value={metrics.appointmentsBooked}
            change="+8 this week"
            changeType="positive"
            icon={Calendar}
          />
          <MetricCard
            title="Estimated Revenue"
            value={formatCurrency(metrics.estimatedRevenue)}
            change={`${metrics.roi}x ROI`}
            changeType="positive"
            icon={DollarSign}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Missed Calls"
            value={metrics.missedCalls}
            changeType="negative"
            icon={PhoneMissed}
          />
          <MetricCard
            title="Transfers to Human"
            value={metrics.transfers}
            icon={ArrowRightLeft}
          />
          <MetricCard
            title="AI Minutes Used"
            value={`${metrics.minutesUsed} min`}
            change={formatCurrency(metrics.estimatedAiCost) + " cost"}
            changeType="neutral"
            icon={Clock}
          />
          <MetricCard
            title="ROI"
            value={`${metrics.roi}x`}
            change="Revenue / AI cost"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Lead Quality Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Lead Quality Breakdown</h3>
            <div className="space-y-4">
              {[
                { label: "Hot Leads", count: metrics.leadQualityBreakdown.hot, color: "bg-red-500" },
                { label: "Warm Leads", count: metrics.leadQualityBreakdown.warm, color: "bg-orange-500" },
                { label: "Cold Leads", count: metrics.leadQualityBreakdown.cold, color: "bg-blue-500" },
                { label: "Spam", count: metrics.leadQualityBreakdown.spam, color: "bg-gray-400" },
              ].map((item) => {
                const total = metrics.totalCalls || 1;
                const pct = Math.round((item.count / total) * 100);
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.count} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a href="/calls" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="font-medium text-gray-900 text-sm">View Recent Calls</div>
                <div className="text-gray-500 text-xs mt-0.5">See transcripts and details</div>
              </a>
              <a href="/onboarding" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="font-medium text-gray-900 text-sm">Add New Agent</div>
                <div className="text-gray-500 text-xs mt-0.5">Create another AI receptionist</div>
              </a>
              <a href="/billing" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="font-medium text-gray-900 text-sm">Manage Billing</div>
                <div className="text-gray-500 text-xs mt-0.5">View usage and upgrade plan</div>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
