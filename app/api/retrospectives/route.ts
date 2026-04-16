import { redirect } from "next/navigation";
import { createRetrospective } from "@/server/services/retrospective.service";

export async function POST(req: Request) {
  const formData = await req.formData();

  const userId = String(formData.get("userId") || "");
  const teamId = String(formData.get("teamId") || "");
  const weekStart = String(formData.get("weekStart") || "");
  const weekEnd = String(formData.get("weekEnd") || "");

  if (!userId || !teamId || !weekStart || !weekEnd) {
    redirect("/retrospectives");
  }

  const retrospective = await createRetrospective({
    userId,
    teamId,
    weekStart: new Date(weekStart),
    weekEnd: new Date(weekEnd),
  });

  redirect(`/retrospectives/${retrospective.id}`);
}