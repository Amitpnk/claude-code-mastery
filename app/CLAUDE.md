# Tech stack
- Node.js 20, TypeScript (strict mode)
- Express for HTTP/API + EJS for server-rendered views (no separate frontend build)
- PostgreSQL 16 + Drizzle ORM (drizzle-kit for migrations)
- vitest for tests, ESLint + Prettier for lint/format
- Local Postgres via `docker compose up -d`

# Conventions
- Use async/await always
- Errors via /lib/errors — throw AppError subclasses, never respond with raw errors from a route
- All DB access goes through Drizzle (src/db/client.ts); no raw SQL in route handlers
- One route file per resource under src/routes/*.routes.ts
- Schema changes go through a Drizzle migration (npm run db:generate, review the SQL, then npm run db:migrate)
- Keep src/views/*.ejs free of business logic — shape data in the route handler

# Do not
- Install packages without asking
- Edit migration files (anything under src/db/migrations/) by hand — regenerate via drizzle-kit
- Commit .env or real credentials
- Add authentication/login — out of scope for this demo app
