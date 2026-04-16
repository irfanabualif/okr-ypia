import { prisma } from "@/lib/prisma";

export default async function NewTimeBankPage() {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Input Time Bank</h1>
        <p className="text-sm text-gray-500">
          Input tabungan waktu atau lembur pekerjaan.
        </p>
      </div>

      <form
        action="/api/time-bank"
        method="post"
        className="space-y-4 rounded-lg border bg-white p-6 shadow-sm max-w-2xl"
      >
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
          <label className="mb-1 block text-sm font-medium">Tanggal</label>
          <input
            type="date"
            name="entryDate"
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Durasi (menit)</label>
          <input
            type="number"
            name="durationMinutes"
            className="w-full rounded border px-3 py-2"
            placeholder="Contoh: 90"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Alasan</label>
          <input
            type="text"
            name="reason"
            className="w-full rounded border px-3 py-2"
            placeholder="Contoh: revisi konten di luar jam kerja"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Catatan</label>
          <textarea
            name="notes"
            className="w-full rounded border px-3 py-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          Simpan Time Bank
        </button>
      </form>
    </div>
  );
}