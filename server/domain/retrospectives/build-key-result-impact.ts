type TaskLike = {
  id: string;
  keyResultId?: string | null;
  keyResult?: {
    title: string;
  } | null;
  contributionScore: number;
  isDeepWork: boolean;
};

export function buildKeyResultImpact(tasks: TaskLike[]) {
  const grouped = new Map<
    string,
    {
      keyResultId: string;
      keyResultTitle: string;
      taskCount: number;
      totalContributionScore: number;
      deepWorkCount: number;
    }
  >();

  for (const task of tasks) {
    if (!task.keyResultId || !task.keyResult?.title) {
      continue;
    }

    const existing = grouped.get(task.keyResultId);

    if (existing) {
      existing.taskCount += 1;
      existing.totalContributionScore += task.contributionScore;
      if (task.isDeepWork) {
        existing.deepWorkCount += 1;
      }
    } else {
      grouped.set(task.keyResultId, {
        keyResultId: task.keyResultId,
        keyResultTitle: task.keyResult.title,
        taskCount: 1,
        totalContributionScore: task.contributionScore,
        deepWorkCount: task.isDeepWork ? 1 : 0,
      });
    }
  }

  return Array.from(grouped.values()).sort(
    (a, b) => b.totalContributionScore - a.totalContributionScore
  );
}