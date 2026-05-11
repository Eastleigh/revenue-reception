---
name: testing-revenue-reception
description: Test the RevenueReception AI frontend end-to-end. Use when verifying UI pages, navigation, demo data rendering, or onboarding wizard flow.
---

# Testing RevenueReception AI

## Prerequisites

- Node.js installed
- Dependencies installed (`npm install` from repo root)
- No database or external services needed for frontend-only testing (demo data is embedded)

## Starting the Dev Server

```bash
cd apps/web
npx next dev --port 3000
```

Wait for the server to be ready (check with `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`).

## Key Pages to Test

| Page | URL | What to Verify |
|------|-----|----------------|
| Landing | `/` | Hero text, 4 feature cards, 8 industry tags, 3 pricing plans ($297/$497/$997) |
| Dashboard | `/dashboard` | 8 metric cards (156 calls, $42,350 revenue, 1357x ROI), lead quality bars, sidebar nav |
| Calls List | `/calls` | 5 demo calls with statuses (COMPLETED, TRANSFERRED, MISSED), durations, lead quality badges |
| Call Detail | `/calls/1` | Mike Johnson call — transcript with AI/Caller bubbles, appointment sidebar, SMS history |
| Onboarding | `/onboarding` | 8-step wizard, HVAC template pre-populates services at step 3, sidebar shows progress |
| Billing | `/billing` | Growth plan active ($497/mo), usage bar 312/750, 3 plan cards |
| Admin | `/admin` | Stats (4 orgs, 15 users, 515 calls, 9 agents), organizations table |

## Onboarding Wizard Steps

1. Industry (8 cards: HVAC, Plumbing, Roofing, Dental, Med Spa, PSW/Home Care, Law Firm, Insurance)
2. Business Info (text input for business name)
3. Services (pre-populated from template, e.g., HVAC has 9 services)
4. Service Area (text input)
5. Business Hours (Mon-Sun time pickers with defaults)
6. Emergency Rules (textarea with pre-populated keywords)
7. Transfer Phone Number (phone input)
8. FAQ / Knowledge Base (question/answer pairs + Complete Setup button)

## Demo Data Values

- Total Calls: 156
- Answered Calls: 142
- Appointments Booked: 47
- Estimated Revenue: $42,350.00
- ROI: 1357x
- Minutes Used: 312
- Lead Quality: Hot 23 (15%), Warm 67 (43%), Cold 48 (31%), Spam 18 (12%)

## Notes

- The frontend uses embedded state/demo data — no API or database connection needed for UI testing
- External service testing (Retell AI, Stripe, Twilio, Google Calendar, CRM) requires real API credentials
- If port 3000 is already in use, kill the existing process or use a different port
- The app might show a brief loading spinner on first page load due to Next.js compilation

## Devin Secrets Needed

None required for frontend-only testing. For full integration testing:
- `RETELL_API_KEY` — Retell AI voice agent
- `STRIPE_SECRET_KEY` — Stripe billing
- `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` — SMS
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Calendar
- `DATABASE_URL` — PostgreSQL connection
