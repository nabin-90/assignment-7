import Link from "next/link";
import { getProducts } from "@/lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default async function HomePage() {
  let products: IProduct[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Products loading failed:", error);
  }

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .slice(0, 6);

  const fallingProducts = products
    .filter((product) => product.change.dir === "down")
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#f8faf5] text-[#183b2b]">
      <section className="mx-auto max-w-7xl px-5 py-6 sm:py-8">
        <div className="grid min-h-[300px] items-center gap-6 overflow-hidden rounded-[28px] border border-[#dfe8df] bg-[#f9fcf9] px-5 py-8 sm:px-8 md:grid-cols-[1.5fr_0.7fr] md:px-12 md:py-10 lg:min-h-[335px] lg:px-14">
          {/* Left content */}
          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-full bg-[#e2f3e8] px-4 py-2 text-sm font-semibold text-green-700">
              {new Intl.DateTimeFormat("bn-BD", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Dhaka",
              }).format(new Date())}
            </p>

            <h1 className="max-w-3xl text-3xl leading-tight font-extrabold tracking-tight text-[#202b23] sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তার, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-7 inline-flex items-center rounded-xl bg-green-700 px-7 py-3 font-bold text-white shadow-md transition hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Hero image */}
          <div className="flex items-center justify-center md:justify-end">
            <Image
              src="/assets/images/bazar-hero.png"
              alt="বাজারের তাজা পণ্য"
              width={400}
              height={300}
              priority
              className="h-auto max-h-[240px] w-full max-w-[300px] object-contain sm:max-h-[270px] sm:max-w-[340px] lg:max-h-[290px]"
            />
          </div>
        </div>
      </section>

      {products.length === 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-16 text-center">
          <p className="text-lg font-semibold">পণ্যের তথ্য লোড করা যায়নি।</p>
          <p className="mt-2 text-sm text-gray-500">
            ইন্টারনেট সংযোগ ও API ঠিক আছে কি না যাচাই করো।
          </p>
        </section>
      ) : (
        <>
          <ProductSection
            title="আজ দাম বেড়েছে ▲"
            subtitle="যেসব পণ্যের দাম গতকালের তুলনায় বেড়েছে"
            products={risingProducts}
          />

          <ProductSection
            title="আজ দাম কমেছে ▼"
            subtitle="যেসব পণ্যের দাম গতকালের তুলনায় কমেছে"
            products={fallingProducts}
          />

          <ProductSection
            title="সব পণ্য"
            subtitle="নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর"
            products={products}
            id="সব-পণ্য"
          />
        </>
      )}

      <footer className="mt-16 border-t border-green-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </main>
  );
}

import type { IProduct } from "@/lib/types";
import Image from "next/image";

function ProductSection({
  title,
  subtitle,
  products,
  id,
}: {
  title: string;
  subtitle: string;
  products: IProduct[];
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                  {product.image || product.categoryIcon}
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isUp
                      ? "bg-green-100 text-green-700"
                      : isDown
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {formatPrice(Math.abs(product.change.pct))}%
                </span>
              </div>

              <p className="mt-5 text-xs text-gray-500">
                {product.categoryNameBn}
              </p>

              <h3 className="mt-1 text-lg font-bold group-hover:text-green-700">
                {product.nameBn}
              </h3>

              <p className="mt-4 text-sm text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-2xl font-extrabold">
                ৳{formatPrice(product.today)}
                <span className="ml-1 text-sm font-medium text-gray-500">
                  /{product.unit === "kg" ? "কেজি" : product.unit}
                </span>
              </p>

              <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-green-700">
                বিস্তারিত দেখুন <span aria-hidden="true">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
