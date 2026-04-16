import { redirect } from "next/navigation";
import { updateRetrospective } from "@/server/services/retrospective.service";

type Props = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, { params }: Props) {
  const { id } = await params;
  const formData = await req.formData();

  const blockers = String(formData.get("blockers") || "").trim();
  const insights = String(formData.get("insights") || "").trim();

  await updateRetrospective({
    id,
    blockers: blockers || null,
    insights: insights || null,
  });

  redirect(`/retrospectives/${id}`);
}