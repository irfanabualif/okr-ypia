import { AlertMessage } from "@/components/ui/alert-message";
import Link from "next/link";
import { TaskSourceType, TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskTable } from "@/components/tasks/task-table";
import { getTasks } from "@/server/services/task.service";

type Props = {
  searchParams: Promise<{
    success?: string;
    search?: string;
    status?: string;
    userId?: string;
    sourceType?: string;
    isDeepWork?: string;
  }>;
};

export default async function TasksPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search?.trim() || undefined;
  const status = (params.status as TaskStatus) || undefined;
  const userId = params.userId || undefined;
  const sourceType = (params.sourceType as TaskSourceType) || undefined;
  
  const isDeepWork =
  params.isDeepWork === "true"
    ? true
    : params.isDeepWork === "false"
    ? false
    : undefined;


const [tasks, users] = await Promise.all([
  getTasks({
    search,
    status,
    userId,
    sourceType,
    isDeepWork,
  }),
  prisma.user.findMany({
    orderBy: { name: "asc" },
  }),
]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
  <h1 className="text-2xl font-bold">Tasks</h1>

<div className="mt-2">
  {params.success === "created" && (
    <AlertMessage type="success" message="Task berhasil dibuat." />
  )}
  {params.success === "updated" && (
    <AlertMessage type="success" message="Task berhasil diperbarui." />
  )}
  {params.success === "deleted" && (
    <AlertMessage type="success" message="Task berhasil dihapus." />
  )}
</div>

          <p className="text-sm text-gray-500">
            Daftar task harian dan mingguan tim.
          </p>
        </div>

        <Link
          href="/tasks/new"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          + Task Baru
        </Link>
      </div>

<TaskFilters
  users={users}
  currentSearch={search}
  currentStatus={status}
  currentUserId={userId}
  currentSourceType={sourceType}
  currentIsDeepWork={params.isDeepWork}
/>

      {tasks.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-500">
          Tidak ada task yang cocok dengan filter.
        </div>
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </div>
  );
}