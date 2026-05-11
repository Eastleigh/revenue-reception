import { Router } from "express";
import { z } from "zod";
import { prisma } from "@revenue-reception/database";

const router = Router();

const bookSchema = z.object({
  organizationId: z.string(),
  callId: z.string().optional(),
  customerName: z.string(),
  customerPhone: z.string(),
  customerEmail: z.string().optional(),
  serviceRequested: z.string(),
  appointmentStart: z.string().transform((s) => new Date(s)),
  appointmentEnd: z.string().transform((s) => new Date(s)),
});

router.post("/book", async (req, res) => {
  try {
    const data = bookSchema.parse(req.body);

    const appointment = await prisma.appointment.create({
      data: {
        organizationId: data.organizationId,
        callId: data.callId || null,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        serviceRequested: data.serviceRequested,
        appointmentStart: data.appointmentStart,
        appointmentEnd: data.appointmentEnd,
        status: "SCHEDULED",
      },
    });

    if (data.callId) {
      await prisma.call.update({
        where: { id: data.callId },
        data: { bookedAppointment: true },
      });
    }

    try {
      const { CalendarService } = await import("@revenue-reception/calendar");
      const calendarService = new CalendarService();
      const eventId = await calendarService.bookAppointment({
        summary: `${data.serviceRequested} - ${data.customerName}`,
        description: `Customer: ${data.customerName}\nPhone: ${data.customerPhone}\nService: ${data.serviceRequested}`,
        startTime: data.appointmentStart,
        endTime: data.appointmentEnd,
        attendeeEmail: data.customerEmail,
        attendeeName: data.customerName,
      });

      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { calendarEventId: eventId, status: "CONFIRMED" },
      });
    } catch (calError) {
      console.warn("Calendar integration not configured:", calError);
    }

    res.json({ success: true, appointment });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: error.errors });
      return;
    }
    console.error("Calendar booking error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/slots", async (req, res) => {
  try {
    const date = req.query.date as string;
    if (!date) {
      res.status(400).json({ error: "date query param required (YYYY-MM-DD)" });
      return;
    }

    try {
      const { CalendarService } = await import("@revenue-reception/calendar");
      const calendarService = new CalendarService();
      const slots = await calendarService.getAvailableSlots(new Date(date));
      res.json({ slots });
    } catch {
      const requestedDate = new Date(date);
      const slots = [];
      for (let hour = 8; hour < 18; hour++) {
        const start = new Date(requestedDate);
        start.setHours(hour, 0, 0, 0);
        const end = new Date(start.getTime() + 3600000);
        slots.push({ start, end });
      }
      res.json({ slots, source: "default" });
    }
  } catch (error) {
    console.error("Calendar slots error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { router as calendarRouter };
