import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f7f9f5] px-4 py-12">
      {" "}
      <div className="w-full max-w-lg text-center">
        {" "}
        <div className="mb-6 text-7xl">🛒</div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-700">
          Error 404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন, সেটি হয়তো সরিয়ে ফেলা হয়েছে অথবা
          ঠিকানাটি ভুল হয়েছে।
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800"
        >
          <span>←</span>
          হোমপেজে ফিরে যান
        </Link>
        <p className="mt-8 text-sm text-gray-400">
          বাজার দর — নিত্যপণ্যের দাম এক নজরে
        </p>
      </div>
    </main>
  );
}
