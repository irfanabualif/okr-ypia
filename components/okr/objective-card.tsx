import Link from "next/link";
import type { Objective, KeyResult, User } from "@prisma/client";

type ObjectiveCardProps = {
  objective: Objective & {
    owner: User | null;
    keyResults: KeyResult[];
  };
};

export function ObjectiveCard({ objective }: ObjectiveCardProps) {
  return (
    <Link
      href={`/objectives/${objective.id}`}
      className="block rounded-lg border bg-white p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs rounded bg-gray-100 px-2 py-1">
          {objective.year}
        </span>
        <span className="text-xs rounded bg-blue-50 px-2 py-1 text-blue-700">
          {objective.status}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold">{objective.title}</h3>

      <p className="mb-3 text-sm text-gray-500">
        Perspektif: {objective.perspective}
      </p>

      <div className="text-sm text-gray-600">
        <p>Owner: {objective.owner?.name ?? "-"}</p>
        <p>Total Key Results: {objective.keyResults.length}</p>
      </div>
    </Link>
  );
}