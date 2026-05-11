"use client";

import { Sidebar } from "@/components/sidebar";
import { Building2, Users, Phone, Bot } from "lucide-react";

const DEMO_ORGS = [
  { id: "1", companyName: "Demo HVAC Company", industry: "HVAC", plan: "GROWTH", billingStatus: "ACTIVE", calls: 156, agents: 2, users: 3 },
  { id: "2", companyName: "Toronto Plumbing Pros", industry: "Plumbing", plan: "STARTER", billingStatus: "ACTIVE", calls: 89, agents: 1, users: 2 },
  { id: "3", companyName: "Bright Smile Dental", industry: "Dental", plan: "GROWTH", billingStatus: "ACTIVE", calls: 203, agents: 1, users: 4 },
  { id: "4", companyName: "Apex Roofing", industry: "Roofing", plan: "AGENCY", billingStatus: "ACTIVE", calls: 67, agents: 5, users: 6 },
];

export default function AdminPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-1">Manage all organizations and system health</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-brand-600" />
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-gray-500">Organizations</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-600" />
              <div>
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-600" />
              <div>
                <div className="text-2xl font-bold">515</div>
                <div className="text-sm text-gray-500">Total Calls</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-brand-600" />
              <div>
                <div className="text-2xl font-bold">9</div>
                <div className="text-sm text-gray-500">Active Agents</div>
              </div>
            </div>
          </div>
        </div>

        {/* Orgs Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">All Organizations</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Company</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Industry</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Plan</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Calls</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Agents</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_ORGS.map((org) => (
                <tr key={org.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-sm text-gray-900">{org.companyName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{org.industry}</td>
                  <td className="px-6 py-4">
                    <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-xs font-medium">{org.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">{org.billingStatus}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{org.calls}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{org.agents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
