import { AlertMessage } from "@/components/ui/alert-message";
import Link from "next/link";
import { ContentStatus, ContentType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ContentFilters } from "@/components/content/content-filters";
import { getContents } from "@/server/services/content-workflow.service";

type Props = {
  searchParams: Promise<{
    success?: string;
    search?: string;
    status?: string;
    teamId?: string;
    contentType?: string;
  }>;
};

export default async function ContentListPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search?.trim() || undefined;
  const status = (params.status as ContentStatus) || undefined;
  const teamId = params.teamId || undefined;
  const contentType = (params.contentType as ContentType) || undefined;

  const [contents, teams] = await Promise.all([
    getContents({
      search,
      status,
      teamId,
      contentType,
    }),
    prisma.team.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Content Requests</h1>
          <p className="text-sm text-gray-500">
            Daftar request content dan workflow-nya.
          </p>
        </div>

        <Link
          href="/content/requests/new"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          + Request Content
        </Link>
      </div>

<div className="mt-2">
  {params.success === "created" && (
    <AlertMessage type="success" message="Content berhasil dibuat." />
  )}
  {params.success === "updated" && (
    <AlertMessage type="success" message="Content berhasil diperbarui." />
  )}
  {params.success === "deleted" && (
    <AlertMessage type="success" message="Content berhasil dihapus." />
  )}
</div>

      <ContentFilters
        teams={teams}
        currentSearch={search}
        currentStatus={status}
        currentTeamId={teamId}
        currentContentType={contentType}
      />

      {contents.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-500 shadow-sm">
          Tidak ada content yang cocok dengan filter.
        </div>
      ) : (
        <div className="space-y-3">
          {contents.map((c) => (
            <Link
              key={c.id}
              href={`/content/${c.id}`}
              className="block rounded-lg border bg-white p-4 shadow-sm hover:bg-gray-50"
            >
              <div className="font-medium">{c.title}</div>
              <div className="text-sm text-gray-500">
                {c.contentType} • {c.status}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Team: {c.team.name} • Requestor: {c.requestor.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}