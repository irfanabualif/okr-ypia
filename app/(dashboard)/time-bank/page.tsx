import Link from "next/link";
import { getTimeBankEntries } from "@/server/services/time-bank.service";

export default async function TimeBankPage() {
  const entries = await getTimeBankEntries();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Time Bank</h1>
          <p className="text-sm text-gray-500">
            Daftar input tabungan waktu / lembur.
          </p>
        </div>

        <Link
          href="/time-bank/new"
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          + Input Time Bank
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-lg border bg-white p-6 text-sm text-gray-500 shadow-sm">
          Belum ada data time bank.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">Durasi</th>
                <th className="px-4 py-3">Alasan</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="px-4 py-3">
                    {new Date(entry.entryDate).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">{entry.user.name}</td>
                  <td className="px-4 py-3">{entry.team.name}</td>
                  <td className="px-4 py-3">{entry.durationMinutes} menit</td>
                  <td className="px-4 py-3">{entry.reason}</td>
                  <td className="px-4 py-3">{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}