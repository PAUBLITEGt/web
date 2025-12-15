# PAUDRONIX GT - E-commerce Platform

## Overview

PAUDRONIX GT is a Guatemalan e-commerce platform selling streaming services, clothing, and shoes. The application features a customer-facing product catalog with WhatsApp integration for purchases, and an admin dashboard for product and order management. The site uses a dark cyberpunk/neon aesthetic with orange and gold accent colors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state, React Context for app-level state
- **Styling**: Tailwind CSS v4 with custom theme variables, shadcn/ui component library
- **Build Tool**: Vite with custom plugins for meta images and Replit integration
- **Fonts**: Orbitron (display) and Rajdhani (body) for cyberpunk aesthetic

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Design**: RESTful endpoints under `/api/` prefix
- **Session Management**: express-session with connect-pg-simple for PostgreSQL session storage

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema validation
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Tables**: users, products, orders with UUID primary keys using `gen_random_uuid()`

### Authentication
- Simple username/password authentication stored in localStorage
- Admin panel accessible at `/admin` route
- No session-based auth currently implemented (uses client-side flag)

### Key Design Patterns
- **Shared Schema**: Database types and validation schemas shared between client and server via `@shared/*` path alias
- **Storage Interface**: `IStorage` interface in `server/storage.ts` abstracts database operations for testability
- **Query Client**: Centralized TanStack Query configuration in `client/src/lib/queryClient.ts`
- **Context Provider**: `AppProvider` wraps application with products, orders, and auth state

### Build Process
- Development: Vite dev server with HMR for client, tsx for server
- Production: `script/build.ts` bundles client with Vite and server with esbuild
- Static files served from `dist/public` in production

## External Dependencies

### Database
- PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- Drizzle Kit for migrations (`npm run db:push`)

### Third-Party Services
- WhatsApp Business API for customer orders (redirects to `wa.me/50237871216`)
- Google Fonts for Orbitron and Rajdhani typefaces

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `express`: HTTP server
- `framer-motion`: Animations on homepage
- `date-fns`: Date formatting with Spanish locale
- `react-hook-form`: Form handling in admin panel
- Full shadcn/ui component library (Radix UI primitives)

### Deployment
- Configured for DigitalOcean Droplet deployment (see `GUIA_DROPLET.md`)
- PM2 for process management in production
- Nginx reverse proxy recommended for HTTPS