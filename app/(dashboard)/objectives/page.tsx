import { ObjectiveCard } from "@/components/okr/objective-card";
import { getObjectives } from "@/server/services/objective.service";

export default async function ObjectivesPage() {
  const objectives = await getObjectives();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Objectives</h1>
        <p className="text-sm text-gray-500">
          Daftar objective tahunan organisasi.
        </p>
      </div>

      {objectives.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-500">
          Belum ada objective.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {objectives.map((objective) => (
            <ObjectiveCard key={objective.id} objective={objective} />
          ))}
        </div>
      )}
    </div>
  );
}