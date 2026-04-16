import { redirect } from "next/navigation";
import { ContentType } from "@prisma/client";
import { editContent } from "@/server/services/content-workflow.service";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Props) {
  const { id } = await params;
  const formData = await req.formData();

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const contentType = String(formData.get("contentType") || "VIDEO") as ContentType;
  const requestorId = String(formData.get("requestorId") || "");
  const assigneeId = String(formData.get("assigneeId") || "");
  const teamId = String(formData.get("teamId") || "");
  const deadline = String(formData.get("deadline") || "");

  if (!title || !requestorId || !teamId) {
    redirect(`/content/${id}/edit`);
  }

  await editContent({
    id,
    title,
    description: description || null,
    contentType,
    requestorId,
    assigneeId: assigneeId || null,
    teamId,
    deadline: deadline ? new Date(deadline) : null,
  });

  redirect(`/content/requests?success=updated`);
}