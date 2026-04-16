type StatusSummaryCardProps = {
  title: string;
  items: Array<{
    label: string;
    value: number;
  }>;
};

export function StatusSummaryCard({
  title,
  items,
}: StatusSummaryCardProps) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded border px-3 py-2"
          >
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}