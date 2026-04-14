import type { KeyResult, Objective, Task, Team, User } from "@prisma/client";

type TaskTableProps = {
  tasks: Array<
    Task & {
      user: User;
      team: Team;
      objective: Objective | null;
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
            <th className="px-4 py-3">Task</th>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Key Result</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}