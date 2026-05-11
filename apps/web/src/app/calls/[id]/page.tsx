"use client";

import { Sidebar } from "@/components/sidebar";
import {
  Phone,
  Clock,
  User,
  MessageSquare,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { formatDuration } from "@/lib/utils";

const DEMO_CALL = {
  id: "1",
  callerName: "Mike Johnson",
  callerPhone: "+14165551001",
  callStatus: "COMPLETED",
  callDirection: "INBOUND",
  durationSeconds: 185,
  leadQuality: "HOT",
  callIntent: "repair",
  summary:
    "Customer needs urgent AC repair. Compressor is making a loud grinding noise. Unit is 8 years old. Customer mentioned they have a warranty that might still be active. Appointment booked for tomorrow morning at 9 AM.",
  bookedAppointment: true,
  estimatedRevenue: 1200,
  transferredToHuman: false,
  crmSynced: true,
  recordingUrl: null,
  startedAt: new Date(Date.now() - 3600000).toISOString(),
  endedAt: new Date(Date.now() - 3600000 + 185000).toISOString(),
  transcript: [
    { role: "agent", content: "Hello! Thank you for calling Demo HVAC Company. My name is Alex. How can I help you today?" },
    { role: "user", content: "Hi, my AC unit is making a really loud grinding noise and I'm worried it might break down completely." },
    { role: "agent", content: "I'm sorry to hear that. That does sound concerning. Let me help you get that taken care of. Can I get your name please?" },
    { role: "user", content: "It's Mike Johnson." },
    { role: "agent", content: "Thank you Mike. And can I confirm your phone number? Is it the number you're calling from?" },
    { role: "user", content: "Yes, that's correct." },
    { role: "agent", content: "Great. Now, the grinding noise from your AC - is this something that just started, or has it been getting worse over time?" },
    { role: "user", content: "It started a couple days ago but it's definitely getting louder." },
    { role: "agent", content: "I understand. Do you know how old your AC unit is?" },
    { role: "user", content: "About 8 years. I think I might still have a warranty on it actually." },
    { role: "agent", content: "That's good to know. We can definitely check on that when our technician comes out. Would you like me to book a service appointment? I have availability tomorrow morning at 9 AM or in the afternoon at 2 PM." },
    { role: "user", content: "Tomorrow at 9 AM works perfect." },
    { role: "agent", content: "Excellent! I've booked you for tomorrow at 9 AM. You'll receive a text confirmation shortly. Is there anything else I can help you with?" },
    { role: "user", content: "No, that's all. Thanks!" },
    { role: "agent", content: "You're welcome Mike. We'll see you tomorrow. Have a great day!" },
  ],
  appointment: {
    customerName: "Mike Johnson",
    serviceRequested: "AC Repair",
    appointmentStart: new Date(Date.now() + 43200000).toISOString(),
    status: "SCHEDULED",
  },
  smsMessages: [
    {
      recipientPhone: "+14165551001",
      messageBody: "Hi Mike! Your appointment with Demo HVAC Company for AC Repair has been confirmed for tomorrow at 9:00 AM. Reply CANCEL to cancel.",
      status: "DELIVERED",
      sentAt: new Date(Date.now() - 3500000).toISOString(),
    },
  ],
};

export default function CallDetailPage() {
  const call = DEMO_CALL;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Link href="/calls" className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Calls
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Call Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-gray-900">Call Details</h1>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {call.callStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Caller</div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-gray-400" />
                    <span className="text-sm font-medium">{call.callerName}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Phone</div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{call.callerPhone}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Duration</div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{formatDuration(call.durationSeconds)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Lead Quality</div>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">
                    {call.leadQuality}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">AI Summary</h3>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{call.summary}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  {call.bookedAppointment ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-gray-300" />}
                  <span>Appointment Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  {call.crmSynced ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-gray-300" />}
                  <span>CRM Synced</span>
                </div>
                <div className="flex items-center gap-2">
                  {call.transferredToHuman ? <CheckCircle className="w-4 h-4 text-yellow-500" /> : <XCircle className="w-4 h-4 text-gray-300" />}
                  <span>Transferred</span>
                </div>
                <div>
                  <span className="text-gray-500">Est. Revenue:</span>{" "}
                  <span className="font-medium text-green-600">${call.estimatedRevenue}</span>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Transcript
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {call.transcript.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "agent" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                        msg.role === "agent"
                          ? "bg-brand-50 text-brand-900"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <div className="text-xs font-medium mb-1 opacity-60">
                        {msg.role === "agent" ? "AI Receptionist" : "Caller"}
                      </div>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar panels */}
          <div className="space-y-6">
            {call.appointment && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Appointment
                </h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-500">Customer:</span> {call.appointment.customerName}</div>
                  <div><span className="text-gray-500">Service:</span> {call.appointment.serviceRequested}</div>
                  <div><span className="text-gray-500">Time:</span> {new Date(call.appointment.appointmentStart).toLocaleString()}</div>
                  <div>
                    <span className="text-gray-500">Status:</span>{" "}
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{call.appointment.status}</span>
                  </div>
                </div>
              </div>
            )}

            {call.smsMessages.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> SMS History
                </h3>
                <div className="space-y-3">
                  {call.smsMessages.map((sms, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="text-gray-600 mb-1">{sms.messageBody}</div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>To: {sms.recipientPhone}</span>
                        <span className="text-green-600">{sms.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
