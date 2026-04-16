import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { RetrospectiveFilters } from "@/components/retrospective/retrospective-filters";
import { generateRetrospectivePreview, getRetrospectives } from "@/server/services/retrospective.service";
import { getLast7DaysRange } from "@/server/domain/retrospectives/get-retrospective-date-range";

type Props = {
  searchParams: Promise<{
    userId?: string;
    weekStart?: string;
  }>;
};

export default async function RetrospectivesPage({ searchParams }: Props) {
  const params = await searchParams;

  const selectedUserId = params.userId || undefined;
  const selectedWeekStart = params.weekStart || undefined;

  const [users, savedRetrospectives, latestTask] = await Promise.all([
    prisma.user.findMany({
      orderBy: { name: "asc" },
    }),
    getRetrospectives({
      userId: selectedUserId,
      weekStart: selectedWeekStart ? new Date(selectedWeekStart) : undefined,
    }),
    prisma.task.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        team: true,
      },
    }),
  ]);

  if (!latestTask) {
    return (
      <div className="rounded-lg border bg-white p-6 text-sm text-gray-500">
        Belum ada task.
      </div>
    );
  }

  const activeUserId = selectedUserId ?? latestTask.userId;

  const activeUser = await prisma.user.findUnique({
    where: { id: activeUserId },
  });

  const activeTeamTask = await prisma.task.findFirst({
    where: { userId: activeUserId },
    orderBy: { createdAt: "desc" },
    include: {
      team: true,
    },
  });

  const { startDate, endDate } = getLast7DaysRange();

  const preview = await generateRetrospectivePreview(
    activeUserId,
    startDate,
    endDate
  );

  const allWeekStarts = await prisma.retrospective.findMany({
    select: {
      weekStart: true,
    },
    distinct: ["weekStart"],
    orderBy: {
      weekStart: "desc",
    },
  });

  const weekOptions = allWeekStarts.map((item) => item.weekStart.toISOString());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Retrospectives</h1>
        <p className="text-sm text-gray-500">
          Preview otomatis dan daftar retrospective yang sudah tersimpan.
        </p>
      </div>

      <RetrospectiveFilters
        users={users}
        weekOptions={weekOptions}
        currentUserId={selectedUserId}
        currentWeekStart={selectedWeekStart}
      />

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Preview Mingguan</h2>
        <p className="text-sm text-gray-500">
          User aktif: {activeUser?.name ?? latestTask.user.name}
        </p>
        <p className="text-sm text-gray-500">
          Team: {activeTeamTask?.team.name ?? latestTask.team.name}
        </p>
        <p className="mb-4 text-sm text-gray-500">
          Periode: {startDate.toLocaleDateString("id-ID")} -{" "}
          {endDate.toLocaleDateString("id-ID")}
        </p>

        <form action="/api/retrospectives" method="post" className="mb-6">
          <input type="hidden" name="userId" value={activeUserId} />
          <input
            type="hidden"
            name="teamId"
            value={activeTeamTask?.teamId ?? latestTask.teamId}
          />
          <input type="hidden" name="weekStart" value={startDate.toISOString()} />
          <input type="hidden" name="weekEnd" value={endDate.toISOString()} />

          <button
            type="submit"
            className="rounded border px-4 py-2 hover:bg-gray-50"
          >
            Simpan Retrospective Minggu Ini
          </button>
        </form>

        <div className="rounded border p-4">
          <h3 className="mb-2 font-semibold">Work Summary</h3>
          {preview.workSummary.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada task di rentang ini.</p>
          ) : (
            <div className="space-y-2">
              {preview.workSummary.map((item) => (
                <div key={item.taskId} className="rounded border p-3">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">
                    {item.keyResultTitle ?? "Tanpa Key Result"} • {item.status}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(item.taskDate).toLocaleDateString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Retrospective Tersimpan</h2>

        {savedRetrospectives.length === 0 ? (
          <p className="text-sm text-gray-500">
            Belum ada retrospective yang sesuai dengan filter.
          </p>
        ) : (
          <div className="space-y-3">
            {savedRetrospectives.map((retro) => (
              <Link
                key={retro.id}
                href={`/retrospectives/${retro.id}`}
                className="block rounded border p-4 hover:bg-gray-50"
              >
                <div className="font-medium">{retro.user.name}</div>
                <div className="text-sm text-gray-500">
                  {new Date(retro.weekStart).toLocaleDateString("id-ID")} -{" "}
                  {new Date(retro.weekEnd).toLocaleDateString("id-ID")}
                </div>
                <div className="text-sm text-gray-500">
                  Team: {retro.team.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}