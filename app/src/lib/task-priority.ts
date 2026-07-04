import { ValidationError } from "./errors";
import { taskPriority } from "../db/schema";

export const TASK_PRIORITIES = taskPriority.enumValues;
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export function parsePriority(value: unknown): TaskPriority | undefined {
  if (value === undefined || value === "") return undefined;
  if (typeof value !== "string" || !TASK_PRIORITIES.includes(value as TaskPriority)) {
    throw new ValidationError(`priority must be one of ${TASK_PRIORITIES.join(", ")}`);
  }
  return value as TaskPriority;
}
