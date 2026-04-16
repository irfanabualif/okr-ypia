import {
  TaskSourceType,
  TaskStatus,
  TaskType,
  EffortLevel,
  TaskComplexity,
  TaskCategory,
} from "@prisma/client";
import {
  createTask,
  deleteTask,
  findAllTasks,
  findTaskById,
  updateTask,
} from "@/server/repositories/task.repository";

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

  effortLevel: EffortLevel;
  complexity: TaskComplexity;
  durationMinutes: number;
  taskCategory?: TaskCategory | null;
};

type UpdateTaskServiceInput = {
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

export async function getTasks(filters?: {
  search?: string;
  status?: TaskStatus;
  userId?: string;
  sourceType?: TaskSourceType;
}) {
  return findAllTasks(filters);
}

export async function getTaskDetail(id: string) {
  return findTaskById(id);
}

export async function addTask(input: CreateTaskServiceInput) {
  return createTask(input);
}

export async function editTask(input: UpdateTaskServiceInput) {
  return updateTask(input);
}

export async function removeTask(id: string) {
  return deleteTask(id);
}