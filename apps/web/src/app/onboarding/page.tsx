"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Wrench,
  MapPin,
  Clock,
  AlertTriangle,
  Phone,
  BookOpen,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { INDUSTRY_TEMPLATES } from "@revenue-reception/shared";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const STEPS = [
  { num: 1, label: "Industry", icon: Building2 },
  { num: 2, label: "Business Info", icon: Building2 },
  { num: 3, label: "Services", icon: Wrench },
  { num: 4, label: "Service Area", icon: MapPin },
  { num: 5, label: "Hours", icon: Clock },
  { num: 6, label: "Emergency Rules", icon: AlertTriangle },
  { num: 7, label: "Transfer Number", icon: Phone },
  { num: 8, label: "FAQ", icon: BookOpen },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    industry: "",
    businessName: "",
    services: [] as string[],
    serviceArea: "",
    businessHours: {
      monday: { open: "08:00", close: "18:00" },
      tuesday: { open: "08:00", close: "18:00" },
      wednesday: { open: "08:00", close: "18:00" },
      thursday: { open: "08:00", close: "18:00" },
      friday: { open: "08:00", close: "18:00" },
      saturday: { open: "09:00", close: "14:00" },
      sunday: { open: null as string | null, close: null as string | null },
    },
    emergencyKeywords: "no heat, gas leak, carbon monoxide, flooding",
    transferPhoneNumber: "",
    faqItems: [{ question: "", answer: "" }],
  });

  const templates = Object.values(INDUSTRY_TEMPLATES);

  const handleNext = () => {
    if (step < 8) setStep((step + 1) as Step);
  };
  const handleBack = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const handleIndustrySelect = (id: string) => {
    const template = INDUSTRY_TEMPLATES[id];
    setFormData((prev) => ({
      ...prev,
      industry: id,
      services: template ? template.defaultServices : prev.services,
    }));
    handleNext();
  };

  const handleComplete = async () => {
    alert("Onboarding complete! In production, this would create your AI agent via Retell AI.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Progress sidebar */}
      <div className="hidden lg:block w-72 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900">Setup Wizard</span>
        </div>
        <div className="space-y-2">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                s.num === step
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : s.num < step
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {s.num < step ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <s.icon className="w-4 h-4" />
              )}
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 max-w-3xl mx-auto">
        <div className="mb-4 text-sm text-gray-500">Step {step} of 8</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Industry</h2>
                <p className="text-gray-500 mb-6">Select your industry to get a pre-configured AI receptionist template.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleIndustrySelect(t.id)}
                      className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-brand-300 hover:shadow-md transition"
                    >
                      <div className="font-medium text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{t.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
                <p className="text-gray-500 mb-6">Tell us about your business.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Your Business Name"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Services Offered</h2>
                <p className="text-gray-500 mb-6">Select or customize the services your business provides.</p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, i) => (
                    <span
                      key={i}
                      className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a service and press Enter"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const target = e.target as HTMLInputElement;
                      if (target.value.trim()) {
                        setFormData((prev) => ({
                          ...prev,
                          services: [...prev.services, target.value.trim()],
                        }));
                        target.value = "";
                      }
                    }
                  }}
                />
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Area</h2>
                <p className="text-gray-500 mb-6">Where does your business operate?</p>
                <input
                  type="text"
                  value={formData.serviceArea}
                  onChange={(e) => setFormData((prev) => ({ ...prev, serviceArea: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="e.g., Greater Toronto Area"
                />
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Hours</h2>
                <p className="text-gray-500 mb-6">When is your business available for appointments?</p>
                <div className="space-y-3">
                  {Object.entries(formData.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center gap-4">
                      <span className="w-24 text-sm font-medium text-gray-700 capitalize">{day}</span>
                      <input
                        type="time"
                        value={hours.open || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            businessHours: {
                              ...prev.businessHours,
                              [day]: { ...hours, open: e.target.value || null },
                            },
                          }))
                        }
                        className="border border-gray-200 rounded px-2 py-1 text-sm"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="time"
                        value={hours.close || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            businessHours: {
                              ...prev.businessHours,
                              [day]: { ...hours, close: e.target.value || null },
                            },
                          }))
                        }
                        className="border border-gray-200 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Rules</h2>
                <p className="text-gray-500 mb-6">Define keywords that trigger a human transfer.</p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Keywords (comma-separated)</label>
                  <textarea
                    value={formData.emergencyKeywords}
                    onChange={(e) => setFormData((prev) => ({ ...prev, emergencyKeywords: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Transfer Phone Number</h2>
                <p className="text-gray-500 mb-6">Where should urgent calls be transferred to?</p>
                <input
                  type="tel"
                  value={formData.transferPhoneNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, transferPhoneNumber: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder="+1 (416) 555-1234"
                />
              </div>
            )}

            {step === 8 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">FAQ / Knowledge Base</h2>
                <p className="text-gray-500 mb-6">Add common questions and answers your AI should know.</p>
                <div className="space-y-4">
                  {formData.faqItems.map((item, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => {
                          const items = [...formData.faqItems];
                          items[i] = { ...items[i]!, question: e.target.value };
                          setFormData((prev) => ({ ...prev, faqItems: items }));
                        }}
                        className="w-full border-b border-gray-100 pb-2 mb-2 focus:outline-none text-sm font-medium"
                        placeholder="Question"
                      />
                      <textarea
                        value={item.answer}
                        onChange={(e) => {
                          const items = [...formData.faqItems];
                          items[i] = { ...items[i]!, answer: e.target.value };
                          setFormData((prev) => ({ ...prev, faqItems: items }));
                        }}
                        className="w-full focus:outline-none text-sm text-gray-600"
                        placeholder="Answer"
                        rows={2}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        faqItems: [...prev.faqItems, { question: "", answer: "" }],
                      }))
                    }
                    className="text-brand-600 text-sm font-medium hover:text-brand-700"
                  >
                    + Add another FAQ
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          {step < 8 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <CheckCircle className="w-4 h-4" /> Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
