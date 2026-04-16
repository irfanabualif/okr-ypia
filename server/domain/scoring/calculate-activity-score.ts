import { TaskStatus } from "@prisma/client";

type Input = {
  status: TaskStatus;
};

export function calculateActivityScore({ status }: Input) {
  if (status === "CANCELLED") {
    return 0;
  }

  return 1;
}