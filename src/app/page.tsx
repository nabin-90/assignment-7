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
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="mb-4 font-semibold text-green-700">
            আপনার বাজার, আপনার হাতেই
          </p>

          <h1 className="text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
            প্রতিদিনের বাজারদর,
            <span className="block text-green-700">জানুন সবার আগে।</span>
          </h1>

          <p className="mt-5 max-w-xl leading-8 text-gray-600">
            চাল, ডালসহ নিত্যপ্রয়োজনীয় পণ্যের দাম ও বিভিন্ন বাজারের মূল্য এক
            জায়গায় দেখুন।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-7 inline-block rounded-xl bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
          >
            পণ্যের তালিকা দেখুন ↓
          </a>
        </div>

        <div className="flex min-h-64 items-center justify-center rounded-3xl bg-green-100 p-8 text-center">
          <div>
            <span className="text-8xl">🛍️</span>
            <p className="mt-4 text-lg font-bold">সঠিক দামে সচেতন বাজার</p>
            <p className="mt-2 text-sm text-gray-600">
              প্রতিদিনের প্রয়োজনীয় পণ্যের তথ্য
            </p>
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
