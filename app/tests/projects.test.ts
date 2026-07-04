import "dotenv/config";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { sql } from "drizzle-orm";
import { app } from "../src/app";
import { db, pool } from "../src/db/client";
import { projects, tasks } from "../src/db/schema";

beforeAll(async () => {
  await db.execute(sql`TRUNCATE TABLE ${tasks}, ${projects} RESTART IDENTITY CASCADE`);
});

afterAll(async () => {
  await pool.end();
});

describe("projects API", () => {
  it("starts with no projects", async () => {
    const res = await request(app).get("/api/projects");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("creates a project", async () => {
    const res = await request(app).post("/api/projects").send({ name: "Test Project" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Project");
  });

  it("rejects a project without a name", async () => {
    const res = await request(app).post("/api/projects").send({});
    expect(res.status).toBe(400);
  });

  it("fetches a project with its tasks", async () => {
    const created = await request(app).post("/api/projects").send({ name: "With Tasks" });
    const projectId = created.body.id;

    await request(app).post(`/api/projects/${projectId}/tasks`).send({ title: "First task" });

    const res = await request(app).get(`/api/projects/${projectId}`);
    expect(res.status).toBe(200);
    expect(res.body.tasks).toHaveLength(1);
    expect(res.body.tasks[0].title).toBe("First task");
  });

  it("404s for a missing project", async () => {
    const res = await request(app).get("/api/projects/999999");
    expect(res.status).toBe(404);
  });

  it("defaults a task's priority to medium", async () => {
    const created = await request(app).post("/api/projects").send({ name: "Priority Default" });
    const res = await request(app)
      .post(`/api/projects/${created.body.id}/tasks`)
      .send({ title: "No priority given" });
    expect(res.status).toBe(201);
    expect(res.body.priority).toBe("medium");
  });

  it("persists an explicit task priority", async () => {
    const created = await request(app).post("/api/projects").send({ name: "Priority Explicit" });
    const res = await request(app)
      .post(`/api/projects/${created.body.id}/tasks`)
      .send({ title: "Urgent task", priority: "high" });
    expect(res.status).toBe(201);
    expect(res.body.priority).toBe("high");
  });

  it("rejects an invalid task priority", async () => {
    const created = await request(app).post("/api/projects").send({ name: "Priority Invalid" });
    const res = await request(app)
      .post(`/api/projects/${created.body.id}/tasks`)
      .send({ title: "Bad priority", priority: "urgent" });
    expect(res.status).toBe(400);
  });

  it("sorts a project's tasks by priority (high to low), then by creation order", async () => {
    const created = await request(app).post("/api/projects").send({ name: "Priority Sort" });
    const projectId = created.body.id;
    await request(app).post(`/api/projects/${projectId}/tasks`).send({ title: "low one", priority: "low" });
    await request(app).post(`/api/projects/${projectId}/tasks`).send({ title: "high one", priority: "high" });
    await request(app).post(`/api/projects/${projectId}/tasks`).send({ title: "medium one", priority: "medium" });

    const res = await request(app).get(`/api/projects/${projectId}`);
    expect(res.body.tasks.map((t: { title: string }) => t.title)).toEqual([
      "high one",
      "medium one",
      "low one",
    ]);
  });
});
