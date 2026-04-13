import { prisma } from "@/lib/prisma";

export async function findAllKeyResults() {
  return prisma.keyResult.findMany({
    orderBy: [
      { year: "desc" },
      { quarter: "asc" },
      { createdAt: "desc" },
    ],
    include: {
      objective: true,
      team: true,
      owner: true,
    },
  });
}