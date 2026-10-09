import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/api";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let products;

  try {
    products = await getProductsByCategory(slug);
  } catch {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  if (products.length === 0) {
    notFound();
  }

  const categoryName = products[0].categoryNameBn;

  return (
    <main className="min-h-screen bg-[#f7f9f5] px-4 py-10 text-gray-900 sm:px-6 lg:px-10">
      {" "}
      <div className="mx-auto max-w-7xl">
        {" "}
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-green-700 hover:text-green-900"
        >
          ← হোম পেজে ফিরে যান{" "}
        </Link>
        ```
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-green-700">
            পণ্যের ক্যাটাগরি
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">{categoryName}</h1>

          <p className="mt-2 text-gray-600">
            এই ক্যাটাগরির {formatPrice(products.length)}টি পণ্যের বর্তমান
            বাজারদর দেখুন।
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
            >
              <div className="flex h-44 items-center justify-center bg-gray-100 p-4">
                {product.image && product.image.startsWith("http") ? (
                  <Image
                    src={product.image}
                    alt={product.nameBn}
                    className="h-full w-full object-contain transition group-hover:scale-105"
                  />
                ) : (
                  <span className="text-5xl">
                    {product.image || product.categoryIcon}{" "}
                  </span>
                )}
              </div>

              <div className="p-5">
                <p className="mb-2 text-sm text-gray-500">
                  {product.categoryNameBn}
                </p>

                <h2 className="text-lg font-bold">{product.nameBn}</h2>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">বর্তমান দাম</p>

                    <p className="text-xl font-bold text-green-700">
                      ৳{formatPrice(product.today)}
                      <span className="ml-1 text-sm font-normal text-gray-500">
                        / {product.unit}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      product.change.dir === "up"
                        ? "text-red-600"
                        : product.change.dir === "down"
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {product.change.dir === "up"
                      ? "▲"
                      : product.change.dir === "down"
                        ? "▼"
                        : "—"}{" "}
                    {formatPrice(Math.abs(product.change.pct))}%
                  </span>
                </div>

                <p className="mt-4 border-t border-gray-100 pt-3 text-sm font-medium text-green-700">
                  বিস্তারিত বাজারদর দেখুন →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
