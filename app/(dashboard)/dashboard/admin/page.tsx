import { AdminSummaryCards } from "@/components/dashboard/admin-summary-cards";
import { ContentPipelineSummary } from "@/components/dashboard/content-pipeline-summary";
import { RecentRetrospectiveList } from "@/components/dashboard/recent-retrospective-list";
import { StatusSummaryCard } from "@/components/dashboard/status-summary-card";
import { UnauthorizedState } from "@/components/layout/unauthorized-state";
import { getCurrentUser } from "@/lib/auth/auth";
import { canViewAdmin } from "@/lib/permissions/access";
import { getAdminDashboardData } from "@/server/services/dashboard.service";

export default async function AdminDashboardPage() {
  const currentUser = await getCurrentUser();

  if (!canViewAdmin(currentUser?.role)) {
    return <UnauthorizedState />;
  }

  const data = await getAdminDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-sm text-gray-500">
          Ringkasan activity, contribution, deep work, dan kondisi sistem.
        </p>
      </div>

      <AdminSummaryCards
        totalUsers={data.totalUsers}
        totalTeams={data.totalTeams}
        totalObjectives={data.totalObjectives}
        totalKeyResults={data.totalKeyResults}
        totalTasks={data.totalTasks}
        totalRetrospectives={data.totalRetrospectives}
        totalActivityScore={data.totalActivityScore}
        totalContributionScore={data.totalContributionScore}
        totalDeepWork={data.totalDeepWork}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <StatusSummaryCard
          title="Task by Status"
          items={data.taskStatusSummary}
        />
        <ContentPipelineSummary items={data.contentPipelineSummary} />
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">System Totals</h2>
        <p className="text-sm text-gray-600">
          Total Time Bank Entries: {data.totalTimeBankEntries}
        </p>
      </div>

      <RecentRetrospectiveList
        retrospectives={data.recentRetrospectives}
        title="Recent System Retrospectives"
      />
    </div>
  );
}