import {
  TaskSourceType,
  TaskStatus,
  TaskType,
  EffortLevel,
  TaskComplexity,
  TaskCategory,
} from "@prisma/client";
import { getTaskMetrics } from "@/server/services/scoring.service";

import { prisma } from "@/lib/prisma";

type CreateTaskInput = {
  userId: string;
  teamId: string;
  objectiveId?: string | null;
  keyResultId?: string | null;
  sourceType: TaskSourceType;
  taskType: TaskType;
  title: string;
  description?: string | null;
  taskDate: Date;
  status: TaskStatus;

  effortLevel: EffortLevel;
  complexity: TaskComplexity;
  durationMinutes: number;
  taskCategory?: TaskCategory | null;
};

export async function findAllTasks(filters?: {
  search?: string;
  status?: TaskStatus;
  userId?: string;
  sourceType?: TaskSourceType;
}) {
  return prisma.task.findMany({
    where: {
      ...(filters?.search
        ? {
            title: {
              contains: filters.search,
              mode: "insensitive",
            },
          }
        : {}),
      ...(filters?.status
        ? {
            status: filters.status,
          }
        : {}),
      ...(filters?.userId
        ? {
            userId: filters.userId,
          }
        : {}),
      ...(filters?.sourceType
        ? {
            sourceType: filters.sourceType,
          }
        : {}),
    },
    orderBy: [{ taskDate: "desc" }, { createdAt: "desc" }],
    include: {
      user: true,
      team: true,
      objective: true,
      keyResult: true,
    },
  });
}

export async function createTask(data: CreateTaskInput) {
  const metrics = getTaskMetrics({
    status: data.status,
    effortLevel: data.effortLevel,
    complexity: data.complexity,
    durationMinutes: data.durationMinutes,
  });

  return prisma.task.create({
    data: {
      ...data,
      activityScore: metrics.activityScore,
      contributionScore: metrics.contributionScore,
      isDeepWork: metrics.isDeepWork,
    },
    include: {
      user: true,
      team: true,
      objective: true,
      keyResult: true,
    },
  });
}

export async function findTasksByUserAndDateRange(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  return prisma.task.findMany({
    where: {
      userId,
      taskDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: [{ taskDate: "asc" }, { createdAt: "asc" }],
    include: {
      user: true,
      team: true,
      objective: true,
      keyResult: true,
    },
  });
}

export async function findTaskById(id: string) {
  return prisma.task.findUnique({
    where: { id },
    include: {
      user: true,
      team: true,
      objective: true,
      keyResult: true,
    },
  });
}

type UpdateTaskInput = {
  id: string;
  userId: string;
  teamId: string;
  objectiveId?: string | null;
  keyResultId?: string | null;
  sourceType: TaskSourceType;
  taskType: TaskType;
  title: string;
  description?: string | null;
  taskDate: Date;
  status: TaskStatus;

  effortLevel: EffortLevel;
  complexity: TaskComplexity;
  durationMinutes: number;
  taskCategory?: TaskCategory | null;  
};

export async function updateTask(data: UpdateTaskInput) {
  const { id, ...rest } = data;

  const metrics = getTaskMetrics({
    status: rest.status,
    effortLevel: rest.effortLevel,
    complexity: rest.complexity,
    durationMinutes: rest.durationMinutes,
  });

  return prisma.task.update({
    where: { id },
    data: {
      ...rest,
      activityScore: metrics.activityScore,
      contributionScore: metrics.contributionScore,
      isDeepWork: metrics.isDeepWork,
    },
    include: {
      user: true,
      team: true,
      objective: true,
      keyResult: true,
    },
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({
    where: { id },
  });
}