import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getTaskDetail } from "@/server/services/task.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailPage({ params }: Props) {
  const { id } = await params;
  const task = await getTaskDetail(id);

  if (!task) {
    notFound();
  }

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
  });

  const objectives = await prisma.objective.findMany({
    orderBy: { createdAt: "desc" },
  });

  const keyResults = await prisma.keyResult.findMany({
    orderBy: { createdAt: "desc" },
  });

  const taskDateValue = new Date(task.taskDate).toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <p className="text-sm text-gray-500">
          Perbarui data task yang sudah dibuat.
        </p>
      </div>

      <form
        action={`/api/tasks/${task.id}`}
        method="post"
        className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Judul Task</label>
          <input
            type="text"
            name="title"
            defaultValue={task.title}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Deskripsi</label>
          <textarea
            name="description"
            defaultValue={task.description ?? ""}
            className="w-full rounded border px-3 py-2"
            rows={4}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">User</label>
            <select
              name="userId"
              defaultValue={task.userId}
              className="w-full rounded border px-3 py-2"
              required
            >
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
              defaultValue={task.teamId}
              className="w-full rounded border px-3 py-2"
              required
            >
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Objective</label>
            <select
              name="objectiveId"
              defaultValue={task.objectiveId ?? ""}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Tanpa objective</option>
              {objectives.map((objective) => (
                <option key={objective.id} value={objective.id}>
                  {objective.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Key Result</label>
            <select
              name="keyResultId"
              defaultValue={task.keyResultId ?? ""}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Tanpa key result</option>
              {keyResults.map((kr) => (
                <option key={kr.id} value={kr.id}>
                  {kr.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Source Type</label>
            <select
              name="sourceType"
              defaultValue={task.sourceType}
              className="w-full rounded border px-3 py-2"
              required
            >
              <option value="OKR">OKR</option>
              <option value="OPERATIONAL">OPERATIONAL</option>
              <option value="SUPPORT">SUPPORT</option>
              <option value="AD_HOC">AD_HOC</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Task Type</label>
            <select
              name="taskType"
              defaultValue={task.taskType}
              className="w-full rounded border px-3 py-2"
              required
            >
              <option value="INITIATIVE">INITIATIVE</option>
              <option value="ROUTINE">ROUTINE</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              name="status"
              defaultValue={task.status}
              className="w-full rounded border px-3 py-2"
              required
            >
              <option value="NOT_STARTED">NOT_STARTED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
              <option value="BLOCKED">BLOCKED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Tanggal</label>
            <input
              type="date"
              name="taskDate"
              defaultValue={taskDateValue}
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>
        
        <div>
  <label className="mb-1 block text-sm font-medium">Effort Level</label>
  <select
    name="effortLevel"
    defaultValue={task.effortLevel}
    className="w-full rounded border px-3 py-2"
    required
  >
    <option value="LOW">LOW</option>
    <option value="MEDIUM">MEDIUM</option>
    <option value="HIGH">HIGH</option>
    <option value="DEEP_WORK">DEEP_WORK</option>
  </select>
</div>

<div>
  <label className="mb-1 block text-sm font-medium">Complexity</label>
  <select
    name="complexity"
    defaultValue={task.complexity}
    className="w-full rounded border px-3 py-2"
    required
  >
    <option value="ROUTINE">ROUTINE</option>
    <option value="MODERATE">MODERATE</option>
    <option value="STRATEGIC">STRATEGIC</option>
  </select>
</div>

<div>
  <label className="mb-1 block text-sm font-medium">
    Duration (minutes)
  </label>
  <input
    type="number"
    name="durationMinutes"
    defaultValue={task.durationMinutes}
    min={1}
    className="w-full rounded border px-3 py-2"
    required
  />
</div>

<div>
  <label className="mb-1 block text-sm font-medium">Task Category</label>
  <select
    name="taskCategory"
    defaultValue={task.taskCategory ?? ""}
    className="w-full rounded border px-3 py-2"
  >
    <option value="">Tanpa kategori</option>
    <option value="CREATIVE">CREATIVE</option>
    <option value="OPERATIONAL">OPERATIONAL</option>
    <option value="STRATEGIC">STRATEGIC</option>
    <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
  </select>
</div>
        
        
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

      <form action={`/api/tasks/${task.id}/delete`} method="post">
        <ConfirmDeleteButton
          label="Hapus Task"
          confirmMessage="Yakin ingin menghapus task ini?"
          className="rounded border px-4 py-2 text-red-600 hover:bg-red-50"
        />
      </form>
    </div>
  );
}