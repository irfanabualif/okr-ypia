import { ContentQueueList } from "@/components/content/content-queue-list";
import { getProductionQueue } from "@/server/services/content-queue.service";

export default async function ProductionQueuePage() {
  const items = await getProductionQueue();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Production Queue</h1>
        <p className="text-sm text-gray-500">
          Konten yang siap diproduksi oleh editor atau desainer.
        </p>
      </div>

      <ContentQueueList
        items={items}
        emptyMessage="Belum ada content dengan status PRODUCTION."
      />
    </div>
  );
}