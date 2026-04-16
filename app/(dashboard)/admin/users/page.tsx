import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/auth";
import { canViewAdmin } from "@/lib/permissions/access";
import { UnauthorizedState } from "@/components/layout/unauthorized-state";

export default async function AdminUsersPage() {
  const currentUser = await getCurrentUser();

  if (!canViewAdmin(currentUser?.role)) {
    return <UnauthorizedState />;
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      role: true,
      team: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin • Users</h1>
        <p className="text-sm text-gray-500">Daftar user dalam sistem.</p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role.name}</td>
                <td className="px-4 py-3">{user.team?.name ?? "-"}</td>
                <td className="px-4 py-3">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}