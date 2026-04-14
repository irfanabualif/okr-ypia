import { TaskSourceType, TaskStatus, TaskType } from "@prisma/client";
import { createTask, findAllTasks } from "@/server/repositories/task.repository";

type CreateTaskServiceInput = {
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

export async function getTasks() {
  return findAllTasks();
}

export async function addTask(input: CreateTaskServiceInput) {
  return createTask(input);
}