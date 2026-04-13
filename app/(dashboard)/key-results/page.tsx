import { KeyResultTable } from "@/components/okr/key-result-table";
import { getKeyResults } from "@/server/services/key-result.service";

export default async function KeyResultsPage() {
  const keyResults = await getKeyResults();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Key Results</h1>
        <p className="text-sm text-gray-500">
          Daftar key result aktif untuk monitoring target.
        </p>
      </div>

      {keyResults.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-500">
          Belum ada key result.
        </div>
      ) : (
        <KeyResultTable keyResults={keyResults} />
      )}
    </div>
  );
}