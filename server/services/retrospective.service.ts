import { updateRetrospectiveBlockersAndInsights } from "@/server/repositories/retrospective.repository";
import { prisma } from "@/lib/prisma";
import { findTasksByUserAndDateRange } from "@/server/repositories/task.repository";
import {
  findAllRetrospectives,
  findExistingRetrospective,
  findRetrospectiveById,
} from "@/server/repositories/retrospective.repository";
import { buildWorkSummary } from "@/server/domain/retrospectives/build-work-summary";
import { buildKeyResultImpact } from "@/server/domain/retrospectives/build-key-result-impact";

export async function generateRetrospectivePreview(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const tasks = await findTasksByUserAndDateRange(userId, startDate, endDate);

  const workSummary = buildWorkSummary(tasks);
  const keyResultImpact = buildKeyResultImpact(tasks);

  return {
    tasks,
    workSummary,
    keyResultImpact,
  };
}

export async function createRetrospective(input: {
  userId: string;
  teamId: string;
  weekStart: Date;
  weekEnd: Date;
  blockers?: string | null;
  insights?: string | null;
}) {
  const existing = await findExistingRetrospective(
    input.userId,
    input.weekStart,
    input.weekEnd
  );

  if (existing) {
    return existing;
  }

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

export async function getRetrospectives(filters?: {
  userId?: string;
  weekStart?: Date;
}) {
  return findAllRetrospectives(filters);
}

export async function getRetrospectiveDetail(id: string) {
  return findRetrospectiveById(id);
}

export async function updateRetrospective(input: {
  id: string;
  blockers?: string | null;
  insights?: string | null;
}) {
  return updateRetrospectiveBlockersAndInsights(input);
}