import { prisma } from "@/lib/prisma";
import { TaskSourceType, TaskStatus, TaskType } from "@prisma/client";

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
};

export async function findAllTasks() {
  return prisma.task.findMany({
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
  return prisma.task.create({
    data,
  });
}