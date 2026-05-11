"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { formatDuration, formatDate } from "@/lib/utils";

interface Call {
  id: string;
  callerName: string | null;
  callerPhone: string | null;
  callStatus: string;
  durationSeconds: number | null;
  leadQuality: string | null;
  summary: string | null;
  bookedAppointment: boolean;
  transferredToHuman: boolean;
  crmSynced: boolean;
  createdAt: string;
}

const DEMO_CALLS: Call[] = [
  {
    id: "1",
    callerName: "Mike Johnson",
    callerPhone: "+14165551001",
    callStatus: "COMPLETED",
    durationSeconds: 185,
    leadQuality: "HOT",
    summary: "Customer needs urgent AC repair. Compressor making loud noise. Appointment booked for tomorrow morning.",
    bookedAppointment: true,
    transferredToHuman: false,
    crmSynced: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    callerName: "Sarah Williams",
    callerPhone: "+14165551002",
    callStatus: "COMPLETED",
    durationSeconds: 142,
    leadQuality: "WARM",
    summary: "Interested in furnace maintenance package. Requested quote for annual service plan.",
    bookedAppointment: false,
    transferredToHuman: false,
    crmSynced: true,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    callerName: "David Chen",
    callerPhone: "+14165551003",
    callStatus: "TRANSFERRED",
    durationSeconds: 67,
    leadQuality: "HOT",
    summary: "Emergency - no heat in home with children. Transferred to on-call technician immediately.",
    bookedAppointment: false,
    transferredToHuman: true,
    crmSynced: true,
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: "4",
    callerName: "Unknown Caller",
    callerPhone: "+14165551004",
    callStatus: "MISSED",
    durationSeconds: null,
    leadQuality: null,
    summary: null,
    bookedAppointment: false,
    transferredToHuman: false,
    crmSynced: false,
    createdAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: "5",
    callerName: "Lisa Park",
    callerPhone: "+14165551005",
    callStatus: "COMPLETED",
    durationSeconds: 210,
    leadQuality: "WARM",
    summary: "Wants duct cleaning for 3-bedroom home. Booked appointment for next week.",
    bookedAppointment: true,
    transferredToHuman: false,
    crmSynced: false,
    createdAt: new Date(Date.now() - 28800000).toISOString(),
  },
];

const statusColors: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700",
  MISSED: "bg-red-100 text-red-700",
  TRANSFERRED: "bg-yellow-100 text-yellow-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
};

const qualityColors: Record<string, string> = {
  HOT: "bg-red-100 text-red-700",
  WARM: "bg-orange-100 text-orange-700",
  COLD: "bg-blue-100 text-blue-700",
  SPAM: "bg-gray-100 text-gray-700",
};

export default function CallsPage() {
  const [calls] = useState<Call[]>(DEMO_CALLS);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Calls</h1>
          <p className="text-gray-500 mt-1">View all inbound calls handled by your AI receptionist</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Caller</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Duration</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Lead Quality</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Booked</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call) => (
                  <tr key={call.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center">
                          <Phone className="w-4 h-4 text-brand-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{call.callerName || "Unknown"}</div>
                          <div className="text-gray-500 text-xs">{call.callerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${statusColors[call.callStatus] || "bg-gray-100 text-gray-700"}`}>
                        {call.callStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {call.durationSeconds ? formatDuration(call.durationSeconds) : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {call.leadQuality ? (
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${qualityColors[call.leadQuality] || ""}`}>
                          {call.leadQuality}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {call.bookedAppointment ? (
                        <span className="text-green-600 font-medium">Yes</span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(call.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/calls/${call.id}`} className="text-brand-600 hover:text-brand-700">
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
