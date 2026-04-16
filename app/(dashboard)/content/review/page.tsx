import { ContentQueueList } from "@/components/content/content-queue-list";
import { getReviewQueue } from "@/server/services/content-queue.service";

export default async function ReviewQueuePage() {
  const items = await getReviewQueue();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Review Queue</h1>
        <p className="text-sm text-gray-500">
          Konten yang sedang menunggu review atau revisi.
        </p>
      </div>

      <ContentQueueList
        items={items}
        emptyMessage="Belum ada content dengan status REVIEW atau REVISION."
      />
    </div>
  );
}