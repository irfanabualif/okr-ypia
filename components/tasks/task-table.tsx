import Link from "next/link";
import type { Task, Team, User, KeyResult } from "@prisma/client";

type TaskTableProps = {
  tasks: Array<
    Task & {
      user: User;
      team: Team;
      keyResult: KeyResult | null;
    }
  >;
};

export function TaskTable({ tasks }: TaskTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Judul</th>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Key Result</th>
            <th className="px-4 py-3">Effort</th>
            <th className="px-4 py-3">Complexity</th>
            <th className="px-4 py-3">Duration</th>
            <th className="px-4 py-3">Activity</th>
            <th className="px-4 py-3">Contribution</th>
            <th className="px-4 py-3">Deep Work</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="px-4 py-3">
                {new Date(task.taskDate).toLocaleDateString("id-ID")}
              </td>

              <td className="px-4 py-3">
                <div className="font-medium">{task.title}</div>
                {task.description ? (
                  <div className="text-xs text-gray-500">{task.description}</div>
                ) : null}
              </td>

              <td className="px-4 py-3">{task.user.name}</td>
              <td className="px-4 py-3">{task.team.name}</td>
              <td className="px-4 py-3">{task.sourceType}</td>
              <td className="px-4 py-3">{task.taskType}</td>
              <td className="px-4 py-3">{task.status}</td>
              <td className="px-4 py-3">{task.keyResult?.title ?? "-"}</td>
              <td className="px-4 py-3">{task.effortLevel}</td>
              <td className="px-4 py-3">{task.complexity}</td>
              <td className="px-4 py-3">{task.durationMinutes} min</td>
              <td className="px-4 py-3">{task.activityScore}</td>
              <td className="px-4 py-3 font-semibold">
                {task.contributionScore.toFixed(2)}
              </td>
              <td className="px-4 py-3">{task.isDeepWork ? (
  <span className="rounded border px-2 py-1 text-xs font-medium">
    Deep Work
  </span>
) : (
  "-"
)}</td>

              <td className="px-4 py-3">
                <Link
                  href={`/tasks/${task.id}`}
                  className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}