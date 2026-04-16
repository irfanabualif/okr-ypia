import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getContentDetail } from "@/server/services/content-workflow.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditContentPage({ params }: Props) {
  const { id } = await params;
  const content = await getContentDetail(id);

  if (!content) {
    notFound();
  }

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
  });

  const deadlineValue = content.deadline
    ? new Date(content.deadline).toISOString().split("T")[0]
    : "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Content</h1>
        <p className="text-sm text-gray-500">
          Perbarui request content.
        </p>
      </div>

      <form
        action={`/api/content/${content.id}`}
        method="post"
        className="space-y-4 rounded-lg border bg-white p-6 shadow-sm max-w-2xl"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Judul</label>
          <input
            name="title"
            defaultValue={content.title}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Deskripsi</label>
          <textarea
            name="description"
            defaultValue={content.description ?? ""}
            className="w-full rounded border px-3 py-2"
            rows={4}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Content Type</label>
          <select
            name="contentType"
            defaultValue={content.contentType}
            className="w-full rounded border px-3 py-2"
          >
            <option value="VIDEO">VIDEO</option>
            <option value="SINGLE_POST">SINGLE_POST</option>
            <option value="CAROUSEL">CAROUSEL</option>
            <option value="ARTICLE">ARTICLE</option>
            <option value="THUMBNAIL">THUMBNAIL</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Requestor</label>
          <select
            name="requestorId"
            defaultValue={content.requestorId}
            className="w-full rounded border px-3 py-2"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Assignee</label>
          <select
            name="assigneeId"
            defaultValue={content.assigneeId ?? ""}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Belum ada assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Team</label>
          <select
            name="teamId"
            defaultValue={content.teamId}
            className="w-full rounded border px-3 py-2"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            defaultValue={deadlineValue}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded border px-4 py-2 hover:bg-gray-50"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>

      <form action={`/api/content/${content.id}/delete`} method="post">
        
<ConfirmDeleteButton
  label="Hapus Content"
  confirmMessage="Yakin ingin menghapus content ini?"
  className="rounded border px-4 py-2 text-red-600 hover:bg-red-50"
/>

      </form>
    </div>
  );
}