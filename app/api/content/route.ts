import { redirect } from "next/navigation";
import { addContent } from "@/server/services/content-workflow.service";

export async function POST(req: Request) {
  const form = await req.formData();

  const title = String(form.get("title") || "");
  const description = String(form.get("description") || "");
  const contentType = String(form.get("contentType") || "VIDEO");
  const requestorId = String(form.get("requestorId") || "");
  const teamId = String(form.get("teamId") || "");

  await addContent({
    title,
    description,
    contentType: contentType as any,
    requestorId,
    teamId,
  });

  redirect("/content/requests");
}