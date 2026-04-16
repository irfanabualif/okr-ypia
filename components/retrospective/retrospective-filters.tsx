import { User } from "@prisma/client";

type RetrospectiveFiltersProps = {
  users: User[];
  weekOptions: string[];
  currentUserId?: string;
  currentWeekStart?: string;
};

export function RetrospectiveFilters({
  users,
  weekOptions,
  currentUserId,
  currentWeekStart,
}: RetrospectiveFiltersProps) {
  return (
    <form
      method="get"
      action="/retrospectives"
      className="grid gap-4 rounded-lg border bg-white p-4 shadow-sm md:grid-cols-3"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">User</label>
        <select
          name="userId"
          defaultValue={currentUserId ?? ""}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Semua user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Minggu</label>
        <select
          name="weekStart"
          defaultValue={currentWeekStart ?? ""}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Semua periode</option>
          {weekOptions.map((week) => (
            <option key={week} value={week}>
              {new Date(week).toLocaleDateString("id-ID")}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end gap-2">
        <button
          type="submit"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          Terapkan
        </button>

        <a
          href="/retrospectives"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          Reset
        </a>
      </div>
    </form>
  );
}