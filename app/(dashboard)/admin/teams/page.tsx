import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/auth";
import { canViewAdmin } from "@/lib/permissions/access";
import { UnauthorizedState } from "@/components/layout/unauthorized-state";

export default async function AdminTeamsPage() {
  const currentUser = await getCurrentUser();

  if (!canViewAdmin(currentUser?.role)) {
    return <UnauthorizedState />;
  }

  const teams = await prisma.team.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      users: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin • Teams</h1>
        <p className="text-sm text-gray-500">Daftar team dalam sistem.</p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Nama Team</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Jumlah Member</th>
              <th className="px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id} className="border-t">
                <td className="px-4 py-3">{team.name}</td>
                <td className="px-4 py-3">{team.code ?? "-"}</td>
                <td className="px-4 py-3">{team.users.length}</td>
                <td className="px-4 py-3">{team.active ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}