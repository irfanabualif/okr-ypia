import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/auth";
import { canViewAdmin } from "@/lib/permissions/access";
import { UnauthorizedState } from "@/components/layout/unauthorized-state";

export default async function AdminRolesPage() {
  const currentUser = await getCurrentUser();

  if (!canViewAdmin(currentUser?.role)) {
    return <UnauthorizedState />;
  }

  const roles = await prisma.role.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      users: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin • Roles</h1>
        <p className="text-sm text-gray-500">Daftar role dalam sistem.</p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Jumlah User</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-4 py-3">{role.name}</td>
                <td className="px-4 py-3">{role.description ?? "-"}</td>
                <td className="px-4 py-3">{role.users.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}