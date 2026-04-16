import { redirect } from "next/navigation";
import { addTimeBankEntry } from "@/server/services/time-bank.service";

export async function POST(req: Request) {
  const formData = await req.formData();

  const userId = String(formData.get("userId") || "");
  const teamId = String(formData.get("teamId") || "");
  const entryDate = String(formData.get("entryDate") || "");
  const durationMinutes = Number(formData.get("durationMinutes") || 0);
  const reason = String(formData.get("reason") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!userId || !teamId || !entryDate || !durationMinutes || !reason) {
    redirect("/time-bank/new");
  }

  await addTimeBankEntry({
    userId,
    teamId,
    entryDate: new Date(entryDate),
    durationMinutes,
    reason,
    notes: notes || null,
  });

  redirect("/time-bank");
}