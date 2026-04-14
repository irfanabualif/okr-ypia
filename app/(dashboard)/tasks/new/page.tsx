import { prisma } from "@/lib/prisma";
import { TaskForm } from "@/components/tasks/task-form";

export default async function NewTaskPage() {
  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
  });

  const objectives = await prisma.objective.findMany({
    orderBy: { createdAt: "desc" },
  });

  const keyResults = await prisma.keyResult.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Task Baru</h1>
        <p className="text-sm text-gray-500">
          Input task dasar untuk mulai menghubungkan kerja harian dengan OKR.
        </p>
      </div>

      <TaskForm
        users={users}
        teams={teams}
        objectives={objectives}
        keyResults={keyResults}
      />
    </div>
  );
}