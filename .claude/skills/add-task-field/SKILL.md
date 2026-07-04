---
name: add-task-field
description: Add a new field to a TaskFlow resource (tasks or projects) — schema, migration, API, view, seed, and test, in the right order. Use for requests like "add a due date to tasks" or "add an assignee".
---

Follow these steps in order. Don't skip or reorder them — each step depends on the one before it.

1. **Schema** — in `app/src/db/schema.ts`, add the column to the relevant table. If the field is a fixed set of values, add a `pgEnum` for it first (follow the existing `taskStatus`/`taskPriority` pattern) and give the column a sensible `.default(...)`.
2. **Migration** — run `npm run db:generate` from `app/`, then read the generated SQL under `src/db/migrations/` before applying it. Run `npm run db:migrate`. Never hand-edit a migration file (see `app/CLAUDE.md`).
3. **API** — in `app/src/routes/projects.routes.ts` (and `app/src/app.ts` for the form-post routes), accept the new field as optional input, validate it, and pass it through on insert. If it's an enum, share the allowed-values list and a `parseX` validator via a small helper in `app/src/lib/` (see `task-priority.ts`) so both the JSON API and the HTML form routes use the same validation.
4. **View** — update the relevant `app/src/views/*.ejs` template(s): add a form input for setting the field, and render it (e.g. as a badge) wherever the resource is listed. Add matching styles in `app/src/public/styles.css`, following the existing badge color pattern.
5. **Seed** — update `app/src/db/seed.ts` so the sample data exercises more than one value of the new field.
6. **Test** — add cases to `app/tests/projects.test.ts` (or a new resource-specific test file) covering: the default value, an explicit valid value, and rejection of an invalid value.
7. **Verify** — from `app/`, run `npm run lint` and `npm run test`. Both must be clean before considering the field done.
