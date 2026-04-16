import { TimeBankStatus } from "@prisma/client";
import {
  createTimeBankEntry,
  findAllTimeBankEntries,
} from "@/server/repositories/time-bank.repository";

type AddTimeBankInput = {
  userId: string;
  teamId: string;
  entryDate: Date;
  durationMinutes: number;
  reason: string;
  notes?: string | null;
  status?: TimeBankStatus;
};

export async function getTimeBankEntries() {
  return findAllTimeBankEntries();
}

export async function addTimeBankEntry(input: AddTimeBankInput) {
  return createTimeBankEntry(input);
}