import { redirect } from "next/navigation";
import { TaskSourceType, TaskStatus, TaskType } from "@prisma/client";
import { editTask } from "@/server/services/task.service";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Props) {
  const { id } = await params;
  const formData = await req.formData();

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const userId = String(formData.get("userId") || "");
  const teamId = String(formData.get("teamId") || "");
  const objectiveId = String(formData.get("objectiveId") || "");
  const keyResultId = String(formData.get("keyResultId") || "");
  const sourceType = String(formData.get("sourceType") || "OKR") as TaskSourceType;
  const taskType = String(formData.get("taskType") || "INITIATIVE") as TaskType;
  const status = String(formData.get("status") || "NOT_STARTED") as TaskStatus;
  const taskDate = String(formData.get("taskDate") || "");

  if (!title || !userId || !teamId || !taskDate) {
    redirect(`/tasks/${id}`);
  }

  await editTask({
    id,
    title,
    description: description || null,
    userId,
    teamId,
    objectiveId: objectiveId || null,
    keyResultId: keyResultId || null,
    sourceType,
    taskType,
    status,
    taskDate: new Date(taskDate),
  });

  redirect("/tasks?success=updated");
}