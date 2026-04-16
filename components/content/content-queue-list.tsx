import Link from "next/link";
import type { Content, Team, User } from "@prisma/client";

type ContentQueueListProps = {
  items: Array<
    Content & {
      requestor: User;
      assignee: User | null;
      team: Team;
    }
  >;
  emptyMessage: string;
};

export function ContentQueueList({
  items,
  emptyMessage,
}: ContentQueueListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border bg-white p-6 text-sm text-gray-500 shadow-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/content/${item.id}`}
          className="block rounded-lg border bg-white p-4 shadow-sm hover:bg-gray-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {item.contentType} • {item.status}
              </p>

              {item.description ? (
                <p className="mt-2 text-sm text-gray-700">{item.description}</p>
              ) : null}

              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <p>Requestor: {item.requestor.name}</p>
                <p>Assignee: {item.assignee?.name ?? "-"}</p>
                <p>Team: {item.team.name}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}