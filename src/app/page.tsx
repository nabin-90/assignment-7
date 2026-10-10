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
      <div className="min-h-screen bg-[#F1F6F1]">
        {/* Hero */}
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
      </div>

      {products.length === 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-16 text-center">
          <p className="text-lg font-semibold">পণ্যের তথ্য লোড করা যায়নি।</p>
          <p className="mt-2 text-sm text-gray-500">
            ইন্টারনেট সংযোগ ও API ঠিক আছে কি না যাচাই করো।
          </p>
        </section>
      ) : (
        <>
          <ProductSection title="আজ দাম বেড়েছে" products={risingProducts} />
          <ProductSection title="আজ দাম কমেছে" products={fallingProducts} />
          <ProductSection
            title="সব পণ্য"
            subtitle={`মোট ${formatPrice(products.length)}টি পণ্য দেখানো হচ্ছে`}
            products={products}
            id="সব-পণ্য"
          />
        </>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}

import type { IProduct } from "@/lib/types";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

function ProductSection({
  title,
  subtitle,
  products,
  id,
}: {
  title: string;
  subtitle?: string;
  products: IProduct[];
  id?: string;
}) {
  const isRising = title.includes("বেড়েছে");
  const isFalling = title.includes("কমেছে");

  return (
    <section
      id={id}
      className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8"
    >
      <div className="mb-5">
        <h2 className="flex items-center gap-3 text-xl font-extrabold tracking-tight text-[#202820] sm:text-2xl">
          <span
            className={
              isRising
                ? "text-red-500"
                : isFalling
                  ? "text-green-600"
                  : "text-gray-500"
            }
          >
            {isRising ? "▲" : isFalling ? "▼" : ""}
          </span>

          {title}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full py-8 text-sm text-gray-500">
            এই বিভাগে এখন কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
}
