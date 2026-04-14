import { Objective, KeyResult, Team, User } from "@prisma/client";

type TaskFormProps = {
  users: User[];
  teams: Team[];
  objectives: Objective[];
  keyResults: KeyResult[];
};

export function TaskForm({
  users,
  teams,
  objectives,
  keyResults,
}: TaskFormProps) {
  return (
    <form action="/api/tasks" method="post" className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-medium">Judul Task</label>
        <input
          type="text"
          name="title"
          className="w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Deskripsi</label>
        <textarea
          name="description"
          className="w-full rounded border px-3 py-2"
          rows={4}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">User</label>
          <select name="userId" className="w-full rounded border px-3 py-2" required>
            <option value="">Pilih user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Team</label>
          <select name="teamId" className="w-full rounded border px-3 py-2" required>
            <option value="">Pilih team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Objective</label>
          <select name="objectiveId" className="w-full rounded border px-3 py-2">
            <option value="">Tanpa objective</option>
            {objectives.map((objective) => (
              <option key={objective.id} value={objective.id}>
                {objective.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Key Result</label>
          <select name="keyResultId" className="w-full rounded border px-3 py-2">
            <option value="">Tanpa key result</option>
            {keyResults.map((kr) => (
              <option key={kr.id} value={kr.id}>
                {kr.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Source Type</label>
          <select name="sourceType" className="w-full rounded border px-3 py-2" required>
            <option value="OKR">OKR</option>
            <option value="OPERATIONAL">OPERATIONAL</option>
            <option value="SUPPORT">SUPPORT</option>
            <option value="AD_HOC">AD_HOC</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Task Type</label>
          <select name="taskType" className="w-full rounded border px-3 py-2" required>
            <option value="INITIATIVE">INITIATIVE</option>
            <option value="ROUTINE">ROUTINE</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select name="status" className="w-full rounded border px-3 py-2" required>
            <option value="NOT_STARTED">NOT_STARTED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
            <option value="BLOCKED">BLOCKED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Tanggal</label>
          <input
            type="date"
            name="taskDate"
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded border px-4 py-2 hover:bg-gray-50"
      >
        Simpan Task
      </button>
    </form>
  );
}