import { EffortLevel, TaskComplexity } from "@prisma/client";

type Input = {
  effortLevel: EffortLevel;
  complexity: TaskComplexity;
  durationMinutes: number;
};

export function detectDeepWork({
  effortLevel,
  complexity,
  durationMinutes,
}: Input) {
  return (
    effortLevel === "DEEP_WORK" ||
    (effortLevel === "HIGH" &&
      complexity === "STRATEGIC" &&
      durationMinutes >= 120)
  );
}