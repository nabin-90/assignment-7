"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { IProduct } from "@/lib/types";

type SortOption = "default" | "low-to-high" | "high-to-low";

interface CategoryProductGridProps {
  products: IProduct[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default function CategoryProductGrid({
  products,
}: CategoryProductGridProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  return (
    <section>
      {/* Product count and sorting */}{" "}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {" "}
        <p className="text-sm text-gray-600">
          মোট {formatPrice(products.length)}টি পণ্য{" "}
        </p>
        <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
          দাম অনুযায়ী সাজান
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      {/* Product cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
          >
            {/* Product image or emoji */}
            <div className="flex h-44 items-center justify-center overflow-hidden bg-gray-100 p-4">
              {product.image?.startsWith("http") ? (
                <Image
                  src={product.image}
                  alt={product.nameBn}
                  width={180}
                  height={140}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              ) : (
                <span
                  className="text-5xl"
                  role="img"
                  aria-label={product.nameBn}
                >
                  {product.image || product.categoryIcon}
                </span>
              )}
            </div>

            {/* Product information */}
            <div className="p-5">
              <p className="mb-2 text-sm text-gray-500">
                {product.categoryNameBn}
              </p>

              <h2 className="text-lg font-bold text-gray-900 transition group-hover:text-green-700">
                {product.nameBn}
              </h2>

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
                  className={`shrink-0 text-sm font-semibold ${
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
    </section>
  );
}
