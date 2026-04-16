import { notFound } from "next/navigation";
import { getRetrospectiveDetail } from "@/server/services/retrospective.service";
import { RetrospectiveForm } from "@/components/retrospective/retrospective-form";

type Props = {
  params: Promise<{ id: string }>;
};

type WorkSummaryItem = {
  taskId: string;
  title: string;
  description: string | null;
  taskDate: string;
  status: string;
  taskType: string;
  sourceType: string;
  objectiveTitle: string | null;
  keyResultTitle: string | null;
};

type KeyResultImpactItem = {
  keyResultId: string;
  keyResultTitle: string;
  objectiveTitle: string | null;
  taskCount: number;
  taskTitles: string[];
};

export default async function RetrospectiveDetailPage({ params }: Props) {
  const { id } = await params;
  const retrospective = await getRetrospectiveDetail(id);

  if (!retrospective) {
    notFound();
  }

  const workSummary = retrospective.workSummary as WorkSummaryItem[];
  const keyResultImpact = retrospective.keyResultImpact as KeyResultImpactItem[];

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Retrospective Detail</h1>
        <p className="text-sm text-gray-500 mt-1">
          User: {retrospective.user.name}
        </p>
        <p className="text-sm text-gray-500">
          Team: {retrospective.team.name}
        </p>
        <p className="text-sm text-gray-500">
          Periode: {new Date(retrospective.weekStart).toLocaleDateString("id-ID")} -{" "}
          {new Date(retrospective.weekEnd).toLocaleDateString("id-ID")}
        </p>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Work Summary</h2>

        {workSummary.length === 0 ? (
          <p className="text-sm text-gray-500">Tidak ada work summary.</p>
        ) : (
          <div className="space-y-3">
            {workSummary.map((item) => (
              <div key={item.taskId} className="rounded border p-3">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">
                  {item.keyResultTitle ?? "Tanpa Key Result"} • {item.status}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(item.taskDate).toLocaleDateString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Key Result Impact</h2>

        {keyResultImpact.length === 0 ? (
          <p className="text-sm text-gray-500">
            Tidak ada task yang terhubung ke Key Result.
          </p>
        ) : (
          <div className="space-y-3">
            {keyResultImpact.map((item) => (
              <div key={item.keyResultId} className="rounded border p-3">
                <div className="font-medium">{item.keyResultTitle}</div>
                <div className="text-sm text-gray-500">
                  Objective: {item.objectiveTitle ?? "-"}
                </div>
                <div className="text-sm">Jumlah task: {item.taskCount}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Blockers & Insights</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Blockers</h3>
              <p className="text-sm text-gray-500">
                {retrospective.blockers ?? "Belum diisi"}
              </p>
            </div>

            <div>
              <h3 className="font-medium">Insights</h3>
              <p className="text-sm text-gray-500">
                {retrospective.insights ?? "Belum diisi"}
              </p>
            </div>
          </div>
        </div>

        <RetrospectiveForm
          retrospectiveId={retrospective.id}
          blockers={retrospective.blockers}
          insights={retrospective.insights}
        />
      </div>


    </div>
  );
}