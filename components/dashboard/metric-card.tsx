type MetricCardProps = {
  label: string;
  value: string | number;
  description?: string;
};

export function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {description ? (
        <p className="mt-2 text-xs text-gray-400">{description}</p>
      ) : null}
    </div>
  );
}