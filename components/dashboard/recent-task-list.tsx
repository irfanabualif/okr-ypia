import Link from "next/link";
import type { Task, User } from "@prisma/client";

type RecentTaskListProps = {
  tasks: Array<
    Task & {
      user: User;
    }
  >;
  title?: string;
};

export function RecentTaskList({
  tasks,
  title = "Recent Tasks",
}: RecentTaskListProps) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada task.</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="block rounded border p-3 hover:bg-gray-50"
            >
              <div className="font-medium">{task.title}</div>
              <div className="text-sm text-gray-500">
                {task.user.name} • {task.status}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}