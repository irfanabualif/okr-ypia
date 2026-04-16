import { ContentQueueList } from "@/components/content/content-queue-list";
import { getPublishedArchive } from "@/server/services/content-queue.service";

export default async function ContentArchivePage() {
  const items = await getPublishedArchive();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Published Archive</h1>
        <p className="text-sm text-gray-500">
          Arsip konten yang sudah dipublish.
        </p>
      </div>

      <ContentQueueList
        items={items}
        emptyMessage="Belum ada content dengan status PUBLISHED."
      />
    </div>
  );
}