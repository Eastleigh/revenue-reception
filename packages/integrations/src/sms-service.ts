import twilio from "twilio";

export interface SendSmsParams {
  to: string;
  body: string;
  from?: string;
}

export interface SmsResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class SmsService {
  private client: twilio.Twilio;
  private fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    const authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || "";

    this.client = twilio(accountSid, authToken);
  }

  async send(params: SendSmsParams): Promise<SmsResult> {
    try {
      const message = await this.client.messages.create({
        to: params.to,
        from: params.from || this.fromNumber,
        body: params.body,
      });

      return { success: true, messageId: message.sid };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  async sendAppointmentConfirmation(
    phone: string,
    businessName: string,
    serviceRequested: string,
    appointmentTime: Date
  ): Promise<SmsResult> {
    const formattedTime = appointmentTime.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    const body = `Hi! Your appointment with ${businessName} for ${serviceRequested} has been confirmed for ${formattedTime}. Reply CANCEL to cancel. - Powered by RevenueReception AI`;

    return this.send({ to: phone, body });
  }

  async sendMissedCallRecovery(phone: string, businessName: string): Promise<SmsResult> {
    const body = `Hi! We noticed you tried to reach ${businessName}. We're sorry we missed your call. How can we help? Reply to this message or call us back anytime. - ${businessName}`;

    return this.send({ to: phone, body });
  }

  async sendLeadNotification(
    ownerPhone: string,
    callerName: string,
    callerPhone: string,
    summary: string
  ): Promise<SmsResult> {
    const body = `🔔 New lead! ${callerName} (${callerPhone}) just called. Summary: ${summary}. Check your dashboard for details.`;

    return this.send({ to: ownerPhone, body });
  }
}
