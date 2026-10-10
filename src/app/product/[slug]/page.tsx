import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(price);
}

function formatUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] || unit;
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

  const markets = product.markets ?? [];

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : product.today;

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-6 text-[#202820] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[1100px]">
        {/* Breadcrumb */}
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#667067] sm:text-sm">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-medium text-[#303830]">{product.nameBn}</span>
        </nav>

        {/* Product summary */}
        <section className="rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[16px] bg-[#F0F5F0] text-4xl">
                {product.image || product.categoryIcon}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-[#667067]">
                  {product.unit === "kg"
                    ? "প্রতি কেজি"
                    : `প্রতি ${formatUnit(product.unit)}`}{" "}
                  · {product.categoryNameBn}
                </p>

                <p className="mt-2 text-xs text-[#667067]">
                  গতকালের তুলনায় দাম{" "}
                  {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
                  {" · "}
                  <span
                    className={
                      isUp
                        ? "font-semibold text-red-600"
                        : isDown
                          ? "font-semibold text-green-700"
                          : "font-semibold text-gray-600"
                    }
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {formatPrice(Math.abs(product.change.pct))}%
                  </span>
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-[15px] bg-[#F0F5F0] px-5 py-4 sm:min-w-[145px] sm:text-right">
              <p className="text-xs text-[#667067]">আজকের দাম</p>
              <p className="mt-1 text-2xl font-extrabold">
                ৳{formatPrice(product.today)}
              </p>
              <p className="mt-1 text-xs text-[#667067]">
                টাকা / {formatUnit(product.unit)}
              </p>
            </div>
          </div>
        </section>

        {/* Price summary */}
        <section className="mt-5 rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[14px] border border-[#E4EBE4] bg-[#FAFCFA] p-4">
              <p className="text-sm text-[#667067]">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-xl font-extrabold text-green-700">
                ৳{formatPrice(lowestPrice)}
              </p>
              <p className="mt-1 text-xs text-[#667067]">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-[14px] border border-[#E4EBE4] bg-[#FAFCFA] p-4">
              <p className="text-sm text-[#667067]">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-xl font-extrabold text-red-600">
                ৳{formatPrice(highestPrice)}
              </p>
              <p className="mt-1 text-xs text-[#667067]">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-[14px] border border-[#E4EBE4] bg-[#FAFCFA] p-4">
              <p className="text-sm text-[#667067]">গড় দাম</p>
              <p className="mt-1 text-xl font-extrabold text-green-700">
                ৳{formatPrice(Math.round(averagePrice))}
              </p>
              <p className="mt-1 text-xs text-[#667067]">
                প্রতি {formatUnit(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>

          <h2 className="mb-3 mt-6 text-base font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-[14px] border border-[#E1E9E1]">
            <table className="w-full min-w-[570px] text-left text-sm">
              <thead className="bg-[#F0F5F0] text-[#667067]">
                <tr>
                  <th className="px-4 py-3 font-semibold">বাজার</th>
                  <th className="px-4 py-3 font-semibold">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-semibold">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    সর্বোচ্চ
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.length > 0 ? (
                  markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className={`border-t border-[#E5EBE5] ${
                        index % 2 === 0 ? "bg-[#FAFCFA]" : "bg-[#F0F5F0]"
                      }`}
                    >
                      <td className="px-4 py-3 font-medium">{market.market}</td>
                      <td className="px-4 py-3 text-[#667067]">
                        {market.division}
                      </td>
                      <td className="px-4 py-3 text-right text-green-700">
                        ৳{formatPrice(market.min)}
                      </td>
                      <td className="px-4 py-3 text-right text-red-600">
                        ৳{formatPrice(market.max)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold">
                        ৳{formatPrice((market.min + market.max) / 2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-[#667067]"
                    >
                      এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs leading-5 text-[#7A847B]">
            দ্রষ্টব্য: বাজারভেদে পণ্যের দাম পরিবর্তিত হতে পারে। কেনার আগে
            স্থানীয় বাজারের দাম যাচাই করে নিন।
          </p>
        </section>

        <div className="mt-5">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900"
          >
            ← {product.categoryNameBn} ক্যাটাগরিতে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
