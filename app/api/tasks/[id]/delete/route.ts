import { redirect } from "next/navigation";
import { removeTask } from "@/server/services/task.service";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(_: Request, { params }: Props) {
  const { id } = await params;

  await removeTask(id);

  redirect("/tasks?success=deleted");
}