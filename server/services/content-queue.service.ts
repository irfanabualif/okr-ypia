import { prisma } from "@/lib/prisma";
import { ContentStatus } from "@prisma/client";

export async function getContentsByStatuses(statuses: ContentStatus[]) {
  return prisma.content.findMany({
    where: {
      status: {
        in: statuses,
      },
    },
    orderBy: { createdAt: "desc" },
    include: {
      requestor: true,
      assignee: true,
      team: true,
    },
  });
}

export async function getProductionQueue() {
  return getContentsByStatuses(["PRODUCTION"]);
}

export async function getReviewQueue() {
  return getContentsByStatuses(["REVIEW", "REVISION"]);
}

export async function getPublishQueue() {
  return getContentsByStatuses(["APPROVED"]);
}

export async function getPublishedArchive() {
  return getContentsByStatuses(["PUBLISHED"]);
}