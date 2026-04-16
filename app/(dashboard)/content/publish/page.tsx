import { ContentQueueList } from "@/components/content/content-queue-list";
import { getPublishQueue } from "@/server/services/content-queue.service";

export default async function PublishQueuePage() {
  const items = await getPublishQueue();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Publish Queue</h1>
        <p className="text-sm text-gray-500">
          Konten yang sudah approved dan siap dipublish.
        </p>
      </div>

      <ContentQueueList
        items={items}
        emptyMessage="Belum ada content dengan status APPROVED."
      />
    </div>
  );
}