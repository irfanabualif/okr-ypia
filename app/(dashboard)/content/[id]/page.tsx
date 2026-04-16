import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentStatusActions } from "@/components/content/content-status-actions";
import {
  getContentAllowedNextStatuses,
  getContentDetail,
} from "@/server/services/content-workflow.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ContentDetailPage({ params }: Props) {
  const { id } = await params;

  const content = await getContentDetail(id);

  if (!content) {
    notFound();
  }

  const workflow = await getContentAllowedNextStatuses(id);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {content.contentType} • {content.status}
        </p>

        {content.description ? (
          <p className="mt-4 text-sm text-gray-700">{content.description}</p>
        ) : null}

        <div className="mt-4 space-y-1 text-sm text-gray-500">
          <p>Requestor: {content.requestor.name}</p>
          <p>Assignee: {content.assignee?.name ?? "-"}</p>
          <p>Team: {content.team.name}</p>
        </div>
      </div>

<div className="mt-4">
  <Link
    href={`/content/${content.id}/edit`}
    className="rounded border px-4 py-2 hover:bg-gray-50 inline-block"
  >
    Edit Content
  </Link>
</div>

      <ContentStatusActions
        contentId={content.id}
        currentStatus={workflow.currentStatus}
        allowedNextStatuses={workflow.allowedNextStatuses}
      />
    </div>
  );
}