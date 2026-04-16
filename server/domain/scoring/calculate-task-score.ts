import { TaskSourceType, TaskType } from "@prisma/client";

type CalculateTaskScoreInput = {
  taskType: TaskType;
  sourceType: TaskSourceType;
  keyResultId?: string | null;
};

export function calculateTaskScore({
  taskType,
  sourceType,
  keyResultId,
}: CalculateTaskScoreInput) {
  let taskTypeScore = 0;
  let sourceTypeBonus = 0;
  let keyResultBonus = 0;

  if (taskType === "ROUTINE") {
    taskTypeScore = 1;
  }

  if (taskType === "INITIATIVE") {
    taskTypeScore = 2;
  }

  if (sourceType === "OKR") {
    sourceTypeBonus = 2;
  }

  if (sourceType === "OPERATIONAL") {
    sourceTypeBonus = 1;
  }

  if (sourceType === "SUPPORT") {
    sourceTypeBonus = 1;
  }

  if (sourceType === "AD_HOC") {
    sourceTypeBonus = 0;
  }

  if (keyResultId) {
    keyResultBonus = 2;
  }

  const finalScore = taskTypeScore + sourceTypeBonus + keyResultBonus;

  return {
    taskTypeScore,
    sourceTypeBonus,
    keyResultBonus,
    finalScore,
  };
}