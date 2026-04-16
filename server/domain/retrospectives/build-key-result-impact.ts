import type { KeyResult, Objective, Task } from "@prisma/client";

type TaskWithRelations = Task & {
  objective: Objective | null;
  keyResult: KeyResult | null;
};

export function buildKeyResultImpact(tasks: TaskWithRelations[]) {
  const grouped = new Map<
    string,
    {
      keyResultId: string;
      keyResultTitle: string;
      objectiveTitle: string | null;
      taskCount: number;
      taskTitles: string[];
    }
  >();

  for (const task of tasks) {
    if (!task.keyResult) continue;

    const existing = grouped.get(task.keyResult.id);

    if (existing) {
      existing.taskCount += 1;
      existing.taskTitles.push(task.title);
      continue;
    }

    grouped.set(task.keyResult.id, {
      keyResultId: task.keyResult.id,
      keyResultTitle: task.keyResult.title,
      objectiveTitle: task.objective?.title ?? null,
      taskCount: 1,
      taskTitles: [task.title],
    });
  }

  return Array.from(grouped.values());
}