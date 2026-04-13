import type { KeyResult, Objective, Team, User } from "@prisma/client";

type KeyResultTableProps = {
  keyResults: Array<
    KeyResult & {
      objective: Objective;
      team: Team;
      owner: User;
    }
  >;
};

export function KeyResultTable({ keyResults }: KeyResultTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3">Quarter</th>
            <th className="px-4 py-3">Key Result</th>
            <th className="px-4 py-3">Objective</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {keyResults.map((kr) => (
            <tr key={kr.id} className="border-t">
              <td className="px-4 py-3">Q{kr.quarter}</td>
              <td className="px-4 py-3">{kr.title}</td>
              <td className="px-4 py-3">{kr.objective.title}</td>
              <td className="px-4 py-3">{kr.team.name}</td>
              <td className="px-4 py-3">{kr.owner.name}</td>
              <td className="px-4 py-3">
                {Number(kr.currentValue)} / {Number(kr.targetValue)} {kr.unit}
              </td>
              <td className="px-4 py-3">{kr.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}