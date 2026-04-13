import { prisma } from "@/lib/prisma";

export async function findAllObjectives() {
  return prisma.objective.findMany({
    orderBy: [
      { year: "desc" },
      { createdAt: "desc" },
    ],
    include: {
      owner: true,
      keyResults: true,
    },
  });
}

export async function findObjectiveById(id: string) {
  return prisma.objective.findUnique({
    where: { id },
    include: {
      owner: true,
      keyResults: {
        include: {
          team: true,
          owner: true,
        },
        orderBy: [
          { quarter: "asc" },
          { createdAt: "asc" },
        ],
      },
    },
  });
}