import { ContentPipelineSummary } from "@/components/dashboard/content-pipeline-summary";
import { RecentRetrospectiveList } from "@/components/dashboard/recent-retrospective-list";
import { RecentTaskList } from "@/components/dashboard/recent-task-list";
import { StatusSummaryCard } from "@/components/dashboard/status-summary-card";
import { TeamSummaryCards } from "@/components/dashboard/team-summary-cards";
import { getTeamDashboardData } from "@/server/services/dashboard.service";

export default async function TeamDashboardPage() {
  const data = await getTeamDashboardData();

  const recentRetrospectives = data.retrospectives.map((retro) => ({
    id: retro.id,
    userName: retro.user.name,
    weekStart: retro.weekStart,
    weekEnd: retro.weekEnd,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Team</h1>
        <p className="text-sm text-gray-500">
          Ringkasan aktivitas dan retrospective tim.
        </p>
      </div>

      <TeamSummaryCards
        totalTasks={data.totalTasks}
        totalScore={data.totalScore}
        memberCount={data.memberCount}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <StatusSummaryCard
          title="Task by Status"
          items={data.taskStatusSummary}
        />
        <ContentPipelineSummary items={data.contentPipelineSummary} />
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Team Aktif</h2>
        <p className="text-sm text-gray-600">
          {data.team ? data.team.name : "Belum ada team aktif"}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentTaskList tasks={data.tasks} title="Recent Team Tasks" />
        <RecentRetrospectiveList
          retrospectives={recentRetrospectives}
          title="Recent Team Retrospectives"
        />
      </div>
    </div>
  );
}