import { prisma } from "@/lib/prisma";
import { ContentStatus, ContentType } from "@prisma/client";

type CreateContentInput = {
  title: string;
  description?: string | null;
  contentType: ContentType;
  requestorId: string;
  assigneeId?: string | null;
  teamId: string;
  deadline?: Date | null;
};

export async function findAllContents(filters?: {
  search?: string;
  status?: ContentStatus;
  teamId?: string;
  contentType?: ContentType;
}) {
  return prisma.content.findMany({
    where: {
      ...(filters?.search
        ? {
            title: {
              contains: filters.search,
              mode: "insensitive",
            },
          }
        : {}),
      ...(filters?.status
        ? {
            status: filters.status,
          }
        : {}),
      ...(filters?.teamId
        ? {
            teamId: filters.teamId,
          }
        : {}),
      ...(filters?.contentType
        ? {
            contentType: filters.contentType,
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      requestor: true,
      assignee: true,
      team: true,
    },
  });
}

export async function findContentById(id: string) {
  return prisma.content.findUnique({
    where: { id },
    include: {
      requestor: true,
      assignee: true,
      team: true,
    },
  });
}

export async function createContent(data: CreateContentInput) {
  return prisma.content.create({
    data,
  });
}

export async function updateContentStatus(id: string, status: ContentStatus) {
  return prisma.content.update({
    where: { id },
    data: { status },
  });
}

export async function findContentStatusById(id: string) {
  return prisma.content.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
    },
  });
}

type UpdateContentInput = {
  id: string;
  title: string;
  description?: string | null;
  contentType: ContentType;
  requestorId: string;
  assigneeId?: string | null;
  teamId: string;
  deadline?: Date | null;
};

export async function updateContent(data: UpdateContentInput) {
  const { id, ...rest } = data;

  return prisma.content.update({
    where: { id },
    data: rest,
  });
}

export async function deleteContent(id: string) {
  return prisma.content.delete({
    where: { id },
  });
}