import { ContentStatus } from "@prisma/client";

type Props = {
  contentId: string;
  currentStatus: ContentStatus;
  allowedNextStatuses: ContentStatus[];
};

export function ContentStatusActions({
  contentId,
  currentStatus,
  allowedNextStatuses,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold">Status Workflow</h2>
      <p className="mb-4 text-sm text-gray-500">
        Status saat ini: <span className="font-medium">{currentStatus}</span>
      </p>

      {allowedNextStatuses.length === 0 ? (
        <p className="text-sm text-gray-500">
          Tidak ada transisi lanjutan yang tersedia.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {allowedNextStatuses.map((status) => (
            <form
              key={status}
              action={`/api/content/${contentId}/status`}
              method="post"
            >
              <input type="hidden" name="nextStatus" value={status} />
              <button
                type="submit"
                className="rounded border px-4 py-2 hover:bg-gray-50"
              >
                Ubah ke {status}
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}