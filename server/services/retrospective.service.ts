import { prisma } from "@/lib/prisma";
import { buildKeyResultImpact } from "@/server/domain/retrospectives/build-key-result-impact";
import { buildWorkSummary } from "@/server/domain/retrospectives/build-work-summary";
import { findAllRetrospectives } from "@/server/repositories/retrospective.repository";

export async function getRetrospectives(filters?: {
  userId?: string;
  weekStart?: Date;
}) {
  return findAllRetrospectives(filters);
}

export async function generateRetrospectivePreview(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      taskDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: [{ taskDate: "asc" }, { createdAt: "asc" }],
    include: {
      keyResult: true,
      objective: true,
      team: true,
      user: true,
    },
  });

  const workSummary = buildWorkSummary(tasks);
  const keyResultImpact = buildKeyResultImpact(tasks);

  const totalTasks = tasks.length;
  const totalActivityScore = tasks.reduce((total, task) => {
    return total + task.activityScore;
  }, 0);

  const totalContributionScore = tasks.reduce((total, task) => {
    return total + task.contributionScore;
  }, 0);

  const deepWorkCount = tasks.filter((task) => task.isDeepWork).length;

  return {
    workSummary,
    keyResultImpact,
    totals: {
      totalTasks,
      totalActivityScore,
      totalContributionScore,
      deepWorkCount,
    },
  };
}

export async function saveRetrospective(input: {
  userId: string;
  teamId: string;
  weekStart: Date;
  weekEnd: Date;
  blockers?: string | null;
  insights?: string | null;
}) {
  const preview = await generateRetrospectivePreview(
    input.userId,
    input.weekStart,
    input.weekEnd
  );

  return prisma.retrospective.create({
    data: {
      userId: input.userId,
      teamId: input.teamId,
      weekStart: input.weekStart,
      weekEnd: input.weekEnd,
      workSummary: preview.workSummary,
      keyResultImpact: preview.keyResultImpact,
      blockers: input.blockers ?? null,
      insights: input.insights ?? null,
    },
  });
}