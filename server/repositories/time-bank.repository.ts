import { prisma } from "@/lib/prisma";
import { TimeBankStatus } from "@prisma/client";

type CreateTimeBankInput = {
  userId: string;
  teamId: string;
  entryDate: Date;
  durationMinutes: number;
  reason: string;
  notes?: string | null;
  status?: TimeBankStatus;
};

export async function findAllTimeBankEntries() {
  return prisma.timeBankEntry.findMany({
    orderBy: [{ entryDate: "desc" }, { createdAt: "desc" }],
    include: {
      user: true,
      team: true,
      approvedBy: true,
    },
  });
}

export async function createTimeBankEntry(data: CreateTimeBankInput) {
  return prisma.timeBankEntry.create({
    data,
  });
}