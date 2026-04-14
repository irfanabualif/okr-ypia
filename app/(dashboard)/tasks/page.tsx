import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskTable } from "@/components/tasks/task-table";
import { getTasks } from "@/server/services/task.service";
import Link from "next/link";

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
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

      <TaskFilters />

      {tasks.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-500">
          Belum ada task.
        </div>
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </div>
  );
}