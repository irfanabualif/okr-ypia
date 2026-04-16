type ContentPipelineSummaryProps = {
  items: Array<{
    label: string;
    value: number;
  }>;
};

export function ContentPipelineSummary({
  items,
}: ContentPipelineSummaryProps) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Content Pipeline</h2>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded border px-3 py-3"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-1 text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}