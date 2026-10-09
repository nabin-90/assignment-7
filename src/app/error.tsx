"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f7f9f5] px-4 py-12">
      {" "}
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
        {" "}
        <div className="mb-4 text-5xl">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900">
          দুঃখিত! কিছু একটা সমস্যা হয়েছে
        </h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          পণ্যের তথ্য লোড করা যায়নি। আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার
          চেষ্টা করুন।
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          আবার চেষ্টা করুন
        </button>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-4 break-words text-left text-xs text-red-600">
            {error.message}
          </p>
        )}
      </div>
    </main>
  );
}
