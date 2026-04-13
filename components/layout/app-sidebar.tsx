import Link from "next/link";
import { navigation } from "@/lib/constants/navigation";

export function AppSidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-white p-4">
      <h2 className="mb-6 text-lg font-semibold">OKR YPIA</h2>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
            >
              {item.label}
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
}