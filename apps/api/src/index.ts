import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { onboardingRouter } from "./routes/onboarding";
import { webhookRouter } from "./routes/webhooks";
import { dashboardRouter } from "./routes/dashboard";
import { callsRouter } from "./routes/calls";
import { calendarRouter } from "./routes/calendar";
import { crmRouter } from "./routes/crm";
import { smsRouter } from "./routes/sms";
import { billingRouter } from "./routes/billing";
import { agentsRouter } from "./routes/agents";
import { adminRouter } from "./routes/admin";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(morgan("combined"));

app.use("/api/webhooks", webhookRouter);

app.use(express.json());

app.use("/api/onboarding", onboardingRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/calls", callsRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/crm", crmRouter);
app.use("/api/sms", smsRouter);
app.use("/api/billing", billingRouter);
app.use("/api/agents", agentsRouter);
app.use("/api/admin", adminRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`RevenueReception API running on port ${PORT}`);
});

export default app;
