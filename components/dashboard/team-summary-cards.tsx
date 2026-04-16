import { MetricCard } from "@/components/dashboard/metric-card";

type Props = {
  totalTasks: number;
  totalScore: number;
  memberCount: number;
};

export function TeamSummaryCards({
  totalTasks,
  totalScore,
  memberCount,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        label="Total Tasks Team"
        value={totalTasks}
        description="Jumlah task seluruh tim"
      />
      <MetricCard
        label="Total Score Team"
        value={totalScore}
        description="Akumulasi score tim"
      />
      <MetricCard
        label="Member Count"
        value={memberCount}
        description="Jumlah anggota tim"
      />
    </div>
  );
}