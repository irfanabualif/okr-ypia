import { EffortLevel, TaskComplexity } from "@prisma/client";

type Input = {
  effortLevel: EffortLevel;
  complexity: TaskComplexity;
  durationMinutes: number;
};

function getEffortWeight(effortLevel: EffortLevel) {
  switch (effortLevel) {
    case "LOW":
      return 1;
    case "MEDIUM":
      return 3;
    case "HIGH":
      return 5;
    case "DEEP_WORK":
      return 8;
    default:
      return 1;
  }
}

function getComplexityWeight(complexity: TaskComplexity) {
  switch (complexity) {
    case "ROUTINE":
      return 1;
    case "MODERATE":
      return 1.5;
    case "STRATEGIC":
      return 2;
    default:
      return 1;
  }
}

function getDurationMultiplier(durationMinutes: number) {
  if (durationMinutes >= 240) return 2;
  if (durationMinutes >= 120) return 1.5;
  if (durationMinutes >= 60) return 1.25;
  return 1;
}

export function calculateContributionScore({
  effortLevel,
  complexity,
  durationMinutes,
}: Input) {
  const effortWeight = getEffortWeight(effortLevel);
  const complexityWeight = getComplexityWeight(complexity);
  const durationMultiplier = getDurationMultiplier(durationMinutes);

  const score = effortWeight * complexityWeight * durationMultiplier;

  return {
    effortWeight,
    complexityWeight,
    durationMultiplier,
    score,
  };
}