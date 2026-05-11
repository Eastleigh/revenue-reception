import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const org = await prisma.organization.create({
    data: {
      companyName: "Demo HVAC Company",
      industry: "HVAC",
      plan: "GROWTH",
      billingStatus: "ACTIVE",
    },
  });

  const user = await prisma.user.create({
    data: {
      email: "demo@revenuereception.ai",
      name: "Demo Owner",
      role: "OWNER",
      organizationId: org.id,
    },
  });

  await prisma.businessProfile.create({
    data: {
      organizationId: org.id,
      businessName: "Demo HVAC Company",
      businessHours: {
        monday: { open: "08:00", close: "18:00" },
        tuesday: { open: "08:00", close: "18:00" },
        wednesday: { open: "08:00", close: "18:00" },
        thursday: { open: "08:00", close: "18:00" },
        friday: { open: "08:00", close: "18:00" },
        saturday: { open: "09:00", close: "14:00" },
        sunday: { open: null, close: null },
      },
      serviceArea: "Greater Toronto Area",
      servicesOffered: [
        "AC Installation",
        "AC Repair",
        "Furnace Installation",
        "Furnace Repair",
        "Duct Cleaning",
        "Thermostat Installation",
        "Emergency HVAC Service",
      ],
      pricingNotes: "Service call starts at $89. Free estimates on installations.",
      emergencyRules: {
        keywords: ["no heat", "gas leak", "carbon monoxide", "flooding"],
        action: "transfer_to_human",
      },
      transferPhoneNumber: "+14165551234",
      bookingRules: {
        minNoticeHours: 2,
        maxDaysAhead: 14,
        slotDurationMinutes: 60,
      },
      faqContent: {
        items: [
          {
            question: "What areas do you service?",
            answer: "We service the entire Greater Toronto Area including Mississauga, Brampton, Markham, and Vaughan.",
          },
          {
            question: "Do you offer emergency service?",
            answer: "Yes, we offer 24/7 emergency HVAC service. Emergency calls are transferred to our on-call technician.",
          },
          {
            question: "How much does a service call cost?",
            answer: "Our standard service call fee is $89, which is waived if you proceed with the repair.",
          },
        ],
      },
    },
  });

  const agent = await prisma.agent.create({
    data: {
      organizationId: org.id,
      agentName: "HVAC Reception AI",
      industryTemplate: "hvac",
      voiceId: "eleven_multilingual_v2",
      status: "ACTIVE",
      phoneNumber: "+14165550001",
    },
  });

  const now = new Date();
  const calls = [];
  for (let i = 0; i < 15; i++) {
    const startedAt = new Date(now.getTime() - i * 3600000 * Math.random() * 48);
    const duration = Math.floor(Math.random() * 300) + 30;
    const endedAt = new Date(startedAt.getTime() + duration * 1000);
    const qualities: Array<"HOT" | "WARM" | "COLD" | "SPAM"> = ["HOT", "WARM", "COLD", "SPAM"];
    const statuses: Array<"COMPLETED" | "MISSED" | "TRANSFERRED"> = ["COMPLETED", "COMPLETED", "COMPLETED", "MISSED", "TRANSFERRED"];

    calls.push(
      prisma.call.create({
        data: {
          organizationId: org.id,
          retellCallId: `demo_call_${i}`,
          callerPhone: `+1416555${String(1000 + i).slice(-4)}`,
          callerName: `Demo Caller ${i + 1}`,
          callStatus: statuses[Math.floor(Math.random() * statuses.length)]!,
          callDirection: "INBOUND",
          startedAt,
          endedAt,
          durationSeconds: duration,
          summary: `Customer called about ${["AC repair", "furnace issue", "duct cleaning", "thermostat installation", "emergency heating"][i % 5]}. ${i % 3 === 0 ? "Appointment booked." : "Follow-up needed."}`,
          leadQuality: qualities[Math.floor(Math.random() * qualities.length)],
          callIntent: ["repair", "installation", "maintenance", "emergency", "quote"][i % 5],
          bookedAppointment: i % 3 === 0,
          estimatedRevenue: Math.floor(Math.random() * 3000) + 200,
          transferredToHuman: i % 7 === 0,
          crmSynced: i % 2 === 0,
        },
      })
    );
  }
  await Promise.all(calls);

  const futureDate = new Date(now.getTime() + 86400000);
  await prisma.appointment.create({
    data: {
      organizationId: org.id,
      customerName: "John Smith",
      customerPhone: "+14165551001",
      customerEmail: "john.smith@example.com",
      serviceRequested: "AC Repair",
      appointmentStart: futureDate,
      appointmentEnd: new Date(futureDate.getTime() + 3600000),
      status: "SCHEDULED",
    },
  });

  await prisma.usageRecord.create({
    data: {
      organizationId: org.id,
      minutesUsed: 47.5,
      estimatedCost: 4.75,
      billingPeriod: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
    },
  });

  console.log("Seed completed successfully!");
  console.log(`  Organization: ${org.id}`);
  console.log(`  User: ${user.id}`);
  console.log(`  Agent: ${agent.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
