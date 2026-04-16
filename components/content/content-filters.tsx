import { ContentType, ContentStatus, Team } from "@prisma/client";

type ContentFiltersProps = {
  teams: Team[];
  currentSearch?: string;
  currentStatus?: string;
  currentTeamId?: string;
  currentContentType?: string;
};

export function ContentFilters({
  teams,
  currentSearch,
  currentStatus,
  currentTeamId,
  currentContentType,
}: ContentFiltersProps) {
  return (
    <form
      method="get"
      action="/content/requests"
      className="grid gap-4 rounded-lg border bg-white p-4 shadow-sm md:grid-cols-2 xl:grid-cols-5"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Search</label>
        <input
          type="text"
          name="search"
          defaultValue={currentSearch ?? ""}
          placeholder="Cari judul content..."
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
          <option value="IDEA">IDEA</option>
          <option value="PENDING">PENDING</option>
          <option value="PRODUCTION">PRODUCTION</option>
          <option value="REVIEW">REVIEW</option>
          <option value="REVISION">REVISION</option>
          <option value="APPROVED">APPROVED</option>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Team</label>
        <select
          name="teamId"
          defaultValue={currentTeamId ?? ""}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Semua team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Content Type</label>
        <select
          name="contentType"
          defaultValue={currentContentType ?? ""}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">Semua type</option>
          <option value="VIDEO">VIDEO</option>
          <option value="SINGLE_POST">SINGLE_POST</option>
          <option value="CAROUSEL">CAROUSEL</option>
          <option value="ARTICLE">ARTICLE</option>
          <option value="THUMBNAIL">THUMBNAIL</option>
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
          href="/content/requests"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          Reset
        </a>
      </div>
    </form>
  );
}