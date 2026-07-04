import "dotenv/config";
import { db, pool } from "./client";
import { projects, tasks } from "./schema";

async function main() {
  const [website, mobile] = await db
    .insert(projects)
    .values([
      { name: "Website Redesign", description: "Refresh the marketing site" },
      { name: "Mobile App", description: "TaskFlow companion app" },
    ])
    .returning();

  await db.insert(tasks).values([
    { projectId: website.id, title: "Wireframe homepage", status: "done", priority: "medium" },
    { projectId: website.id, title: "Build hero section", status: "in_progress", priority: "high" },
    { projectId: website.id, title: "Write copy", status: "todo", priority: "low" },
    { projectId: mobile.id, title: "Set up project skeleton", status: "done", priority: "medium" },
    { projectId: mobile.id, title: "Design onboarding flow", status: "todo", priority: "high" },
  ]);

  console.log("Seeded sample projects and tasks.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
