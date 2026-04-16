type RetrospectiveFormProps = {
  retrospectiveId: string;
  blockers: string | null;
  insights: string | null;
};

export function RetrospectiveForm({
  retrospectiveId,
  blockers,
  insights,
}: RetrospectiveFormProps) {
  return (
    <form
      action={`/api/retrospectives/${retrospectiveId}`}
      method="post"
      className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Blockers</label>
        <textarea
          name="blockers"
          defaultValue={blockers ?? ""}
          className="w-full rounded border px-3 py-2"
          rows={5}
          placeholder="Tulis hambatan atau kendala pekerjaan minggu ini..."
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Insights</label>
        <textarea
          name="insights"
          defaultValue={insights ?? ""}
          className="w-full rounded border px-3 py-2"
          rows={5}
          placeholder="Tulis insight, pembelajaran, atau ide perbaikan..."
        />
      </div>

      <button
        type="submit"
        className="rounded border px-4 py-2 hover:bg-gray-50"
      >
        Simpan Blockers & Insights
      </button>
    </form>
  );
}