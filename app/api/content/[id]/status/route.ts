import { redirect } from "next/navigation";
import { ContentStatus } from "@prisma/client";
import { changeContentStatus } from "@/server/services/content-workflow.service";
import { getCurrentUser } from "@/lib/auth/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Props) {
  const { id } = await params;
  const formData = await req.formData();
  const currentUser = await getCurrentUser();

  const nextStatus = String(formData.get("nextStatus") || "") as ContentStatus;

  if (!nextStatus) {
    redirect(`/content/${id}`);
  }

  try {
    await changeContentStatus(id, nextStatus, currentUser?.role);
  } catch (error) {
    console.error(error);
  }

  redirect(`/content/${id}`);
}