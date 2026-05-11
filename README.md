# RevenueReception AI

> Never miss another revenue call. AI phone receptionist SaaS for local service businesses.

RevenueReception AI uses [Retell AI](https://www.retellai.com/) to create AI phone receptionists that answer inbound calls 24/7, qualify leads, book appointments, send SMS confirmations, update CRM records, transfer urgent calls to a human, and show revenue attribution in a dashboard.

## Tech Stack

- **Frontend**: Next.js 15, TailwindCSS, Framer Motion, Recharts
- **Backend**: Node.js + Express, Zod validation
- **Database**: PostgreSQL + Prisma ORM
- **Voice AI**: Retell AI (abstracted via VoiceProviderService)
- **Payments**: Stripe subscriptions + usage-based billing
- **SMS**: Twilio
- **Calendar**: Google Calendar API
- **CRM**: GoHighLevel, HubSpot, Webhook (extensible)

## Project Structure

```
/apps/web          → Next.js frontend (dashboard, onboarding, call viewer)
/apps/api          → Express API (webhooks, routes, services)
/packages/database → Prisma schema & client
/packages/shared   → Shared types, constants, industry templates
/packages/retell   → Retell AI integration (VoiceProviderService)
/packages/billing  → Stripe billing integration
/packages/calendar → Google Calendar integration
/packages/crm      → CRM integrations (GHL, HubSpot, Webhook)
/packages/integrations → SMS (Twilio) integration
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Retell AI account (for voice agents)
- Stripe account (for billing)
- Twilio account (for SMS)
- Google Cloud project (for Calendar)

### Installation

```bash
# Clone the repository
git clone https://github.com/Eastleigh/revenue-reception.git
cd revenue-reception

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your API keys in .env

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed demo data
npm run db:seed

# Start development servers
npm run dev
```

### Running

- Frontend: http://localhost:3000
- API: http://localhost:3001
- API Health: http://localhost:3001/api/health

## Industry Templates

Pre-configured AI receptionist templates for:

| Industry | Template ID |
|----------|------------|
| HVAC | `hvac` |
| Plumbing | `plumbing` |
| Roofing | `roofing` |
| Dental | `dental` |
| Med Spa | `medspa` |
| PSW / Home Care | `psw_homecare` |
| Law Firm | `law_firm` |
| Insurance | `insurance` |

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/onboarding/complete` | Complete business onboarding |
| POST | `/api/agents/create` | Create Retell AI agent |
| GET | `/api/agents` | List agents |
| POST | `/api/webhooks/retell` | Retell AI webhook (call events) |
| POST | `/api/webhooks/stripe` | Stripe webhook (billing events) |
| GET | `/api/dashboard/metrics` | Dashboard analytics |
| GET | `/api/calls` | List calls |
| GET | `/api/calls/:id` | Call detail |
| POST | `/api/calendar/book` | Book appointment |
| GET | `/api/calendar/slots` | Available calendar slots |
| POST | `/api/crm/sync` | Sync call to CRM |
| POST | `/api/crm/connect` | Connect CRM integration |
| POST | `/api/sms/send` | Send SMS |
| POST | `/api/billing/create-checkout-session` | Create Stripe checkout |
| POST | `/api/billing/portal` | Stripe billing portal |
| GET | `/api/admin/organizations` | List all orgs (admin) |
| GET | `/api/admin/usage` | Usage overview (admin) |
| GET | `/api/admin/health` | System health |
| GET | `/api/health` | API health check |

## Retell AI Setup

1. Create an account at [retellai.com](https://www.retellai.com/)
2. Get your API key from the dashboard
3. Add it to `.env` as `RETELL_API_KEY`
4. The system will automatically create agents when businesses complete onboarding
5. Configure your webhook URL in Retell to point to: `https://your-api-domain.com/api/webhooks/retell`

## Stripe Setup

1. Create products and prices in Stripe Dashboard for each plan:
   - Starter: $297/month
   - Growth: $497/month
   - Agency: $997/month
2. Add the price IDs to `.env`
3. Set up webhook endpoint: `https://your-api-domain.com/api/webhooks/stripe`
4. Events to listen for: `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`

## Google Calendar Setup

1. Create a project in Google Cloud Console
2. Enable the Google Calendar API
3. Create OAuth2 credentials
4. Generate a refresh token using the OAuth2 playground
5. Add credentials to `.env`

## HVAC Call Flow (Demo)

1. Greet caller
2. Ask name
3. Ask phone number
4. Ask service needed (repair, installation, maintenance, emergency)
5. Check if emergency → transfer to human
6. Ask address/service area
7. Ask preferred appointment time
8. Book appointment if available
9. Send SMS confirmation
10. Update CRM
11. Transfer emergency calls to on-call technician

## Deployment

### Frontend (Vercel)

```bash
cd apps/web
vercel deploy
```

### Backend (Railway/Render)

Deploy `apps/api` with:
- Build command: `npm run build`
- Start command: `npm start`
- Set all environment variables

### Database

Use [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) for managed PostgreSQL.

## Pricing Plans

| Plan | Price | Minutes | Agents | Key Features |
|------|-------|---------|--------|--------------|
| Starter | $297/mo | 300 | 1 | Basic dashboard, call logging |
| Growth | $497/mo | 750 | 3 | CRM, SMS, Calendar, analytics |
| Agency | $997/mo | 2000 | 10 | White-label, multi-location, API |

Overage: $0.15/minute after included minutes.

## License

Private - All rights reserved.
