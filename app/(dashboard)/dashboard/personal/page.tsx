import Link from "next/link";
import { PersonalSummaryCards } from "@/components/dashboard/personal-summary-cards";
import { RecentTaskList } from "@/components/dashboard/recent-task-list";
import { RecentRetrospectiveList } from "@/components/dashboard/recent-retrospective-list";
import { StatusSummaryCard } from "@/components/dashboard/status-summary-card";
import { getPersonalDashboardData } from "@/server/services/dashboard.service";

export default async function PersonalDashboardPage() {
  const data = await getPersonalDashboardData();

  const recentRetrospectives = data.latestRetrospective
    ? [
        {
          id: data.latestRetrospective.id,
          userName: data.user?.name ?? "-",
          weekStart: data.latestRetrospective.weekStart,
          weekEnd: data.latestRetrospective.weekEnd,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Personal</h1>
        <p className="text-sm text-gray-500">
          Ringkasan aktivitas dan kontribusi user.
        </p>
      </div>

      <PersonalSummaryCards
        totalTasks={data.totalTasks}
        completedTasks={data.completedTasks}
        totalScore={data.totalScore}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <StatusSummaryCard
          title="Task by Status"
          items={data.taskStatusSummary}
        />

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">User Aktif</h2>
          <p className="text-sm text-gray-600">
            {data.user ? data.user.name : "Belum ada user aktif"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentTaskList tasks={data.tasks} title="Recent Personal Tasks" />
        <RecentRetrospectiveList
          retrospectives={recentRetrospectives}
          title="Latest Retrospective"
        />
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/tasks/new"
            className="rounded border px-4 py-2 hover:bg-gray-50"
          >
            + Task Baru
          </Link>
          <Link
            href="/retrospectives"
            className="rounded border px-4 py-2 hover:bg-gray-50"
          >
            Lihat Retrospectives
          </Link>
        </div>
      </div>
    </div>
  );
}