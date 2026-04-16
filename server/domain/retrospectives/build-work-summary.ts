import type { KeyResult, Objective, Task } from "@prisma/client";

type TaskWithRelations = Task & {
  objective: Objective | null;
  keyResult: KeyResult | null;
};

export function buildWorkSummary(tasks: TaskWithRelations[]) {
  return tasks.map((task) => ({
    taskId: task.id,
    title: task.title,
    description: task.description,
    taskDate: task.taskDate,
    status: task.status,
    taskType: task.taskType,
    sourceType: task.sourceType,
    objectiveTitle: task.objective?.title ?? null,
    keyResultTitle: task.keyResult?.title ?? null,
  }));
}