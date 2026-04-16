import { MetricCard } from "@/components/dashboard/metric-card";

type Props = {
  totalTasks: number;
  completedTasks: number;
  totalScore: number;
};

export function PersonalSummaryCards({
  totalTasks,
  completedTasks,
  totalScore,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        label="Total Tasks"
        value={totalTasks}
        description="Jumlah task user"
      />
      <MetricCard
        label="Completed Tasks"
        value={completedTasks}
        description="Task dengan status DONE"
      />
      <MetricCard
        label="Total Score"
        value={totalScore}
        description="Akumulasi score task"
      />
    </div>
  );
}