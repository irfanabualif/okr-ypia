type AdminSummaryCardsProps = {
  totalUsers: number;
  totalTeams: number;
  totalObjectives: number;
  totalKeyResults: number;
  totalTasks: number;
  totalRetrospectives: number;
  totalActivityScore: number;
  totalContributionScore: number;
  totalDeepWork: number;
};

export function AdminSummaryCards({
  totalUsers,
  totalTeams,
  totalObjectives,
  totalKeyResults,
  totalTasks,
  totalRetrospectives,
  totalActivityScore,
  totalContributionScore,
  totalDeepWork,
}: AdminSummaryCardsProps) {
  const items = [
    { label: "Users", value: totalUsers },
    { label: "Teams", value: totalTeams },
    { label: "Objectives", value: totalObjectives },
    { label: "Key Results", value: totalKeyResults },
    { label: "Tasks", value: totalTasks },
    { label: "Retrospectives", value: totalRetrospectives },
    { label: "Activity Score", value: totalActivityScore },
    {
      label: "Contribution Score",
      value: Number(totalContributionScore.toFixed(2)),
    },
    { label: "Deep Work Tasks", value: totalDeepWork },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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