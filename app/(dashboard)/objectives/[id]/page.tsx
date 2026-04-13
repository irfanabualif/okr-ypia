import { notFound } from "next/navigation";
import { getObjectiveDetail } from "@/server/services/objective.service";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ObjectiveDetailPage({ params }: Props) {
  const { id } = await params;
  const objective = await getObjectiveDetail(id);

  if (!objective) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs rounded bg-gray-100 px-2 py-1">
            {objective.year}
          </span>
          <span className="text-xs rounded bg-blue-50 px-2 py-1 text-blue-700">
            {objective.status}
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-2">{objective.title}</h1>
        <p className="text-sm text-gray-500 mb-3">
          Perspektif: {objective.perspective}
        </p>
        <p className="text-sm text-gray-600">
          Owner: {objective.owner?.name ?? "-"}
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Key Results</h2>

        {objective.keyResults.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada key result.</p>
        ) : (
          <div className="space-y-4">
            {objective.keyResults.map((kr) => (
              <div key={kr.id} className="rounded border p-4">
                <h3 className="font-semibold">{kr.title}</h3>
                <p className="text-sm text-gray-500">
                  Team: {kr.team.name} • Owner: {kr.owner.name}
                </p>
                <p className="text-sm mt-2">
                  Progress: {Number(kr.currentValue)} / {Number(kr.targetValue)}{" "}
                  {kr.unit}
                </p>
                <p className="text-sm">Status: {kr.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}