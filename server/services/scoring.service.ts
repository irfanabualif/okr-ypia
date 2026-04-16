import {
  EffortLevel,
  TaskComplexity,
  TaskStatus,
} from "@prisma/client";
import { calculateActivityScore } from "@/server/domain/scoring/calculate-activity-score";
import { calculateContributionScore } from "@/server/domain/scoring/calculate-contribution-score";
import { detectDeepWork } from "@/server/domain/scoring/detect-deep-work";

export function getTaskMetrics(input: {
  status: TaskStatus;
  effortLevel: EffortLevel;
  complexity: TaskComplexity;
  durationMinutes: number;
}) {
  const activityScore = calculateActivityScore({
    status: input.status,
  });

  const contribution = calculateContributionScore({
    effortLevel: input.effortLevel,
    complexity: input.complexity,
    durationMinutes: input.durationMinutes,
  });

  const isDeepWork = detectDeepWork({
    effortLevel: input.effortLevel,
    complexity: input.complexity,
    durationMinutes: input.durationMinutes,
  });

  return {
    activityScore,
    contributionScore: contribution.score,
    effortWeight: contribution.effortWeight,
    complexityWeight: contribution.complexityWeight,
    durationMultiplier: contribution.durationMultiplier,
    isDeepWork,
  };
}