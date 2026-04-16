import Link from "next/link";

type RecentRetrospectiveListProps = {
  retrospectives: Array<{
    id: string;
    userName: string;
    weekStart: Date;
    weekEnd: Date;
  }>;
  title?: string;
};

export function RecentRetrospectiveList({
  retrospectives,
  title = "Recent Retrospectives",
}: RecentRetrospectiveListProps) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      {retrospectives.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada retrospective.</p>
      ) : (
        <div className="space-y-3">
          {retrospectives.map((retro) => (
            <Link
              key={retro.id}
              href={`/retrospectives/${retro.id}`}
              className="block rounded border p-3 hover:bg-gray-50"
            >
              <div className="font-medium">{retro.userName}</div>
              <div className="text-sm text-gray-500">
                {new Date(retro.weekStart).toLocaleDateString("id-ID")} -{" "}
                {new Date(retro.weekEnd).toLocaleDateString("id-ID")}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}