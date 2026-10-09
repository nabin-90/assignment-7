export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f7f9f5] px-4 py-10 sm:px-6 lg:px-10">
      {" "}
      <div className="mx-auto max-w-7xl">
        {" "}
        <div className="mb-8 space-y-3">
          {" "}
          <div className="h-4 w-32 rounded bg-gray-200" />{" "}
          <div className="h-10 w-64 rounded-lg bg-gray-200" />{" "}
          <div className="h-4 w-80 max-w-full rounded bg-gray-200" />{" "}
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >
              <div className="h-44 bg-gray-200" />

              <div className="space-y-4 p-5">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-5 w-3/4 rounded bg-gray-200" />
                <div className="h-7 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
