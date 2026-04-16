import { TaskTable } from "@/components/tasks/task-table";
import { getTasks } from "@/server/services/task.service";

export default async function DeepWorkTasksPage() {
  const tasks = await getTasks({
    isDeepWork: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deep Work Tasks</h1>
        <p className="text-sm text-gray-500">
          Daftar task yang terdeteksi sebagai deep work.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-500">
          Belum ada task deep work.
        </div>
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </div>
  );
}