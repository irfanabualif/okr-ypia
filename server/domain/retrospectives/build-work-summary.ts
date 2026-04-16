type TaskLike = {
  id: string;
  title: string;
  status: string;
  taskDate: Date;
  keyResultId?: string | null;
  keyResult?: {
    title: string;
  } | null;

  activityScore: number;
  contributionScore: number;
  isDeepWork: boolean;
  taskCategory?: string | null;
};

export function buildWorkSummary(tasks: TaskLike[]) {
  return tasks.map((task) => ({
    taskId: task.id,
    title: task.title,
    status: task.status,
    taskDate: task.taskDate,
    keyResultId: task.keyResultId ?? null,
    keyResultTitle: task.keyResult?.title ?? null,

    activityScore: task.activityScore,
    contributionScore: task.contributionScore,
    isDeepWork: task.isDeepWork,
    taskCategory: task.taskCategory ?? null,
  }));
}