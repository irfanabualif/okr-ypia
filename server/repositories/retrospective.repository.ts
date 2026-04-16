import { prisma } from "@/lib/prisma";

export async function findAllRetrospectives(filters?: {
  userId?: string;
  weekStart?: Date;
}) {
  return prisma.retrospective.findMany({
    where: {
      ...(filters?.userId
        ? {
            userId: filters.userId,
          }
        : {}),
      ...(filters?.weekStart
        ? {
            weekStart: filters.weekStart,
          }
        : {}),
    },
    orderBy: [{ weekStart: "desc" }, { createdAt: "desc" }],
    include: {
      user: true,
      team: true,
    },
  });
}

export async function findRetrospectiveById(id: string) {
  return prisma.retrospective.findUnique({
    where: { id },
    include: {
      user: true,
      team: true,
    },
  });
}

export async function findExistingRetrospective(
  userId: string,
  weekStart: Date,
  weekEnd: Date
) {
  return prisma.retrospective.findFirst({
    where: {
      userId,
      weekStart,
      weekEnd,
    },
  });
}

export async function updateRetrospectiveBlockersAndInsights(input: {
  id: string;
  blockers?: string | null;
  insights?: string | null;
}) {
  return prisma.retrospective.update({
    where: { id: input.id },
    data: {
      blockers: input.blockers ?? null,
      insights: input.insights ?? null,
    },
  });
}