import { ContentStatus } from "@prisma/client";

const allowedTransitions: Record<ContentStatus, ContentStatus[]> = {
  IDEA: ["PENDING", "CANCELLED"],
  PENDING: ["PRODUCTION", "CANCELLED"],
  PRODUCTION: ["REVIEW", "REVISION", "CANCELLED"],
  REVIEW: ["APPROVED", "REVISION", "CANCELLED"],
  REVISION: ["REVIEW", "CANCELLED"],
  APPROVED: ["PUBLISHED", "REVISION", "CANCELLED"],
  PUBLISHED: [],
  CANCELLED: [],
};

export function getAllowedNextStatuses(currentStatus: ContentStatus) {
  return allowedTransitions[currentStatus] ?? [];
}

export function canTransitionContentStatus(
  currentStatus: ContentStatus,
  nextStatus: ContentStatus
) {
  return getAllowedNextStatuses(currentStatus).includes(nextStatus);
}