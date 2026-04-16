export function UnauthorizedState() {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Akses Ditolak</h2>
      <p className="mt-2 text-sm text-gray-500">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
    </div>
  );
}