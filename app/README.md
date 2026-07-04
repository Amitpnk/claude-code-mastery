# TaskFlow

A small team task/project tracker — the companion demo app used throughout the
[Learn Claude Code the Right Way](../README.md) video series.

## Stack

Node.js 20, TypeScript, Express + EJS, PostgreSQL 16 + Drizzle ORM, vitest.
See [CLAUDE.md](./CLAUDE.md) for conventions.

## Run it

```bash
cp .env.example .env
docker compose up -d       # local Postgres
npm install
npm run db:generate        # generate SQL migrations from src/db/schema.ts
npm run db:migrate         # apply them
npm run db:seed            # sample projects + tasks
npm run dev                # http://localhost:3000
```

## Scripts

| Script            | What it does                          |
|-------------------|----------------------------------------|
| `npm run dev`     | Start the dev server (tsx watch)        |
| `npm run build`   | Compile TypeScript to `dist/`           |
| `npm start`       | Run the compiled build                  |
| `npm run test`    | Run vitest + supertest against the DB   |
| `npm run lint`    | ESLint                                  |
| `npm run format`  | Prettier                                |
