export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">Login</h1>
        <p className="mb-6 text-sm text-gray-500">
          Halaman login sementara untuk fondasi awal.
        </p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded border px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded border px-3 py-2"
          />
          <button
            type="button"
            className="w-full rounded border px-4 py-2 hover:bg-gray-50"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}