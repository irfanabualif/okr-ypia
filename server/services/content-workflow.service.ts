import { deleteContent, updateContent } from "@/server/repositories/content.repository";

import {
  canApproveContent,
  canPublishContent,
} from "@/lib/permissions/access";

import { ContentStatus, ContentType } from "@prisma/client";
import {
  createContent,
  findAllContents,
  findContentById,
  findContentStatusById,
  updateContentStatus,
} from "@/server/repositories/content.repository";
import { canTransitionContentStatus, getAllowedNextStatuses } from "@/server/domain/content/content-status-transition";

export async function getContents(filters?: {
  search?: string;
  status?: ContentStatus;
  teamId?: string;
  contentType?: ContentType;
}) {
  return findAllContents(filters);
}

export async function getContentDetail(id: string) {
  return findContentById(id);
}

export async function addContent(input: {
  title: string;
  description?: string | null;
  contentType: ContentType;
  requestorId: string;
  assigneeId?: string | null;
  teamId: string;
  deadline?: Date | null;
}) {
  return createContent(input);
}

export async function changeContentStatus(
  id: string,
  nextStatus: ContentStatus,
  actorRole?: string
) {
  const current = await findContentStatusById(id);

  if (!current) {
    throw new Error("Content not found");
  }

  const allowed = canTransitionContentStatus(current.status, nextStatus);

  if (!allowed) {
    throw new Error(
      `Invalid status transition from ${current.status} to ${nextStatus}`
    );
  }

  if (nextStatus === "APPROVED" && !canApproveContent(actorRole)) {
    throw new Error("You do not have permission to approve content");
  }

  if (nextStatus === "PUBLISHED" && !canPublishContent(actorRole)) {
    throw new Error("You do not have permission to publish content");
  }

  return updateContentStatus(id, nextStatus);
}

export async function getContentAllowedNextStatuses(id: string) {
  const current = await findContentStatusById(id);

  if (!current) {
    throw new Error("Content not found");
  }

  return {
    currentStatus: current.status,
    allowedNextStatuses: getAllowedNextStatuses(current.status),
  };
}

export async function editContent(input: {
  id: string;
  title: string;
  description?: string | null;
  contentType: ContentType;
  requestorId: string;
  assigneeId?: string | null;
  teamId: string;
  deadline?: Date | null;
}) {
  return updateContent(input);
}

export async function removeContent(id: string) {
  return deleteContent(id);
}