import { redirect } from "next/navigation";
import { removeContent } from "@/server/services/content-workflow.service";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(_: Request, { params }: Props) {
  const { id } = await params;

  await removeContent(id);

  redirect("/content/requests?success=deleted");
}