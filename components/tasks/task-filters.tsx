import { TaskSourceType, TaskStatus, User } from "@prisma/client";

type TaskFiltersProps = {
  users: User[];
  currentSearch?: string;
  currentStatus?: string;
  currentUserId?: string;
  currentSourceType?: string;
  currentIsDeepWork?: string;
};

export function TaskFilters({
  users,
  currentSearch,
  currentStatus,
  currentUserId,
  currentSourceType,
  currentIsDeepWork,
}: TaskFiltersProps) {
  return (
    <form
      method="get"
      action="/tasks"
      className="grid gap-4 rounded-lg border bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-6"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Search</label>
        <input
          type="text"
          name="search"
          defaultValue={currentSearch ?? ""}
          placeholder="Cari judul task..."
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>
        <select
          name="status"
          defaultValue={currentStatus ?? ""}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Semua status</option>
          <option value="NOT_STARTED">NOT_STARTED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
          <option value="BLOCKED">BLOCKED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

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
        <label className="mb-1 block text-sm font-medium">Source Type</label>
        <select
          name="sourceType"
          defaultValue={currentSourceType ?? ""}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Semua source</option>
          <option value="OKR">OKR</option>
          <option value="OPERATIONAL">OPERATIONAL</option>
          <option value="SUPPORT">SUPPORT</option>
          <option value="AD_HOC">AD_HOC</option>
        </select>
      </div>

<div>
  <label className="mb-1 block text-sm font-medium">Deep Work</label>
  <select
    name="isDeepWork"
    defaultValue={currentIsDeepWork ?? ""}
    className="w-full rounded border px-3 py-2"
  >
    <option value="">Semua</option>
    <option value="true">Deep Work Only</option>
    <option value="false">Non Deep Work</option>
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
          href="/tasks"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          Reset
        </a>
      </div>
    </form>
  );
}