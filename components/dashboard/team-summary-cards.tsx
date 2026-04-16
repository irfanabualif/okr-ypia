type TeamSummaryCardsProps = {
  totalTasks: number;
  totalActivityScore: number;
  totalContributionScore: number;
  deepWorkCount: number;
  memberCount: number;
};

export function TeamSummaryCards({
  totalTasks,
  totalActivityScore,
  totalContributionScore,
  deepWorkCount,
  memberCount,
}: TeamSummaryCardsProps) {
  const items = [
    { label: "Total Tasks", value: totalTasks },
    { label: "Activity Score", value: totalActivityScore },
    {
      label: "Contribution Score",
      value: Number(totalContributionScore.toFixed(2)),
    },
    { label: "Deep Work Tasks", value: deepWorkCount },
    { label: "Team Members", value: memberCount },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="mt-2 text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}