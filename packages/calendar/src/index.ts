import { google, calendar_v3 } from "googleapis";

export interface BookAppointmentParams {
  summary: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendeeEmail?: string;
  attendeeName?: string;
  attendeePhone?: string;
  location?: string;
}

export interface AvailableSlot {
  start: Date;
  end: Date;
}

export interface CalendarConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  calendarId?: string;
}

export class CalendarService {
  private calendar: calendar_v3.Calendar;
  private calendarId: string;

  constructor(config?: CalendarConfig) {
    const oauth2Client = new google.auth.OAuth2(
      config?.clientId || process.env.GOOGLE_CLIENT_ID,
      config?.clientSecret || process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      refresh_token: config?.refreshToken || process.env.GOOGLE_REFRESH_TOKEN,
    });

    this.calendar = google.calendar({ version: "v3", auth: oauth2Client });
    this.calendarId = config?.calendarId || process.env.GOOGLE_CALENDAR_ID || "primary";
  }

  async getAvailableSlots(
    date: Date,
    slotDurationMinutes: number = 60,
    businessHoursStart: number = 8,
    businessHoursEnd: number = 18
  ): Promise<AvailableSlot[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(businessHoursStart, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(businessHoursEnd, 0, 0, 0);

    const response = await this.calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        items: [{ id: this.calendarId }],
      },
    });

    const busySlots = response.data.calendars?.[this.calendarId]?.busy || [];
    const availableSlots: AvailableSlot[] = [];
    let currentTime = new Date(startOfDay);

    for (const busy of busySlots) {
      const busyStart = new Date(busy.start || "");
      while (currentTime.getTime() + slotDurationMinutes * 60000 <= busyStart.getTime()) {
        availableSlots.push({
          start: new Date(currentTime),
          end: new Date(currentTime.getTime() + slotDurationMinutes * 60000),
        });
        currentTime = new Date(currentTime.getTime() + slotDurationMinutes * 60000);
      }
      currentTime = new Date(busy.end || "");
    }

    while (currentTime.getTime() + slotDurationMinutes * 60000 <= endOfDay.getTime()) {
      availableSlots.push({
        start: new Date(currentTime),
        end: new Date(currentTime.getTime() + slotDurationMinutes * 60000),
      });
      currentTime = new Date(currentTime.getTime() + slotDurationMinutes * 60000);
    }

    return availableSlots;
  }

  async bookAppointment(params: BookAppointmentParams): Promise<string> {
    const event: calendar_v3.Schema$Event = {
      summary: params.summary,
      description: params.description,
      location: params.location,
      start: {
        dateTime: params.startTime.toISOString(),
        timeZone: "America/Toronto",
      },
      end: {
        dateTime: params.endTime.toISOString(),
        timeZone: "America/Toronto",
      },
      attendees: params.attendeeEmail
        ? [{ email: params.attendeeEmail, displayName: params.attendeeName }]
        : undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const response = await this.calendar.events.insert({
      calendarId: this.calendarId,
      requestBody: event,
      sendUpdates: "all",
    });

    return response.data.id || "";
  }

  async cancelAppointment(eventId: string): Promise<void> {
    await this.calendar.events.delete({
      calendarId: this.calendarId,
      eventId,
      sendUpdates: "all",
    });
  }
}
