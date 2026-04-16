import { prisma } from "@/lib/prisma";

export default async function NewContentPage() {
  const users = await prisma.user.findMany();
  const teams = await prisma.team.findMany();

  return (
    <form
      action="/api/content"
      method="post"
      className="space-y-4 max-w-xl"
    >
      <h1 className="text-xl font-bold">Request Content</h1>

      <input name="title" placeholder="Judul" className="border p-2 w-full" />

      <textarea
        name="description"
        placeholder="Deskripsi"
        className="border p-2 w-full"
      />

      <select name="contentType" className="border p-2 w-full">
        <option value="VIDEO">VIDEO</option>
        <option value="SINGLE_POST">SINGLE_POST</option>
        <option value="CAROUSEL">CAROUSEL</option>
      </select>

      <select name="requestorId" className="border p-2 w-full">
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <select name="teamId" className="border p-2 w-full">
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <button className="border px-4 py-2">Submit</button>
    </form>
  );
}