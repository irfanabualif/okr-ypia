import { MetricCard } from "@/components/dashboard/metric-card";

type Props = {
  totalUsers: number;
  totalTeams: number;
  totalObjectives: number;
  totalKeyResults: number;
  totalTasks: number;
  totalRetrospectives: number;
};

export function AdminSummaryCards({
  totalUsers,
  totalTeams,
  totalObjectives,
  totalKeyResults,
  totalTasks,
  totalRetrospectives,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      <MetricCard label="Users" value={totalUsers} />
      <MetricCard label="Teams" value={totalTeams} />
      <MetricCard label="Objectives" value={totalObjectives} />
      <MetricCard label="Key Results" value={totalKeyResults} />
      <MetricCard label="Tasks" value={totalTasks} />
      <MetricCard label="Retrospectives" value={totalRetrospectives} />
    </div>
  );
}