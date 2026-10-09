import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const marketPrices = product.markets;
  const averagePrice =
    marketPrices.length > 0
      ? marketPrices.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / marketPrices.length
      : product.today;

  const lowestPrice =
    marketPrices.length > 0
      ? Math.min(...marketPrices.map((market) => market.min))
      : product.today;

  const highestPrice =
    marketPrices.length > 0
      ? Math.max(...marketPrices.map((market) => market.max))
      : product.today;

  return (
    <main className="min-h-screen bg-[#f8faf5] px-5 py-10 text-[#183b2b]">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-block text-sm font-semibold text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>

        <section className="mt-6 rounded-3xl border border-green-100 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-green-50 text-6xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <p className="text-sm font-semibold text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
                {product.nameBn}
              </h1>

              <p className="mt-3 text-gray-500">
                আজকের দাম:{" "}
                <span className="font-bold text-green-700">
                  ৳{formatPrice(product.today)}
                </span>
                /{product.unit === "kg" ? "কেজি" : product.unit}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-green-50 p-5">
              <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
              <p className="mt-2 text-2xl font-extrabold text-green-700">
                ৳{formatPrice(lowestPrice)}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-600">গড় দাম</p>
              <p className="mt-2 text-2xl font-extrabold">
                ৳{formatPrice(Math.round(averagePrice))}
              </p>
            </div>

            <div className="rounded-2xl bg-red-50 p-5">
              <p className="text-sm text-gray-600">সর্বোচ্চ দাম</p>
              <p className="mt-2 text-2xl font-extrabold text-red-600">
                ৳{formatPrice(highestPrice)}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-extrabold">বিভিন্ন বাজারের দাম</h2>
          <p className="mt-2 text-sm text-gray-500">
            বাজারভেদে এই পণ্যের সর্বনিম্ন ও সর্বোচ্চ মূল্য।
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-green-100 bg-white">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-5 py-4">বাজার</th>
                  <th className="px-5 py-4">বিভাগ</th>
                  <th className="px-5 py-4">সর্বনিম্ন</th>
                  <th className="px-5 py-4">সর্বোচ্চ</th>
                </tr>
              </thead>

              <tbody>
                {marketPrices.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-100"
                  >
                    <td className="px-5 py-4 font-semibold">{market.market}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {market.division}
                    </td>
                    <td className="px-5 py-4 text-green-700">
                      ৳{formatPrice(market.min)}
                    </td>
                    <td className="px-5 py-4 text-red-600">
                      ৳{formatPrice(market.max)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
