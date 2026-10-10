"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { IProduct } from "@/lib/types";

type SortOption = "default" | "low-to-high" | "high-to-low";

interface CategoryProductGridProps {
  products: IProduct[];
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("bn-BD").format(price);
}

function formatUnit(unit: string): string {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
    egg: "টি",
  };

  return units[unit.toLowerCase()] || unit;
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
    <section className="text-[#202820]">
      {/* Sorting bar */}
      <div className="mb-4 flex min-h-[72px] flex-col gap-3 rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] px-4 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
        <label className="flex items-center justify-end gap-3 text-sm text-[#667067]">
          <span>সাজান</span>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="rounded-[9px] border border-[#CDD7CD] bg-[#FAFCFA] px-3 py-2 text-sm text-[#303830] outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {/* Product count */}
      <p className="mb-4 text-sm text-[#667067]">
        মোট {formatPrice(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group flex min-h-[150px] flex-col justify-between rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] p-4 transition duration-200 hover:border-[#B8D8C0] hover:shadow-sm sm:p-[17px]"
            >
              {/* Product name and icon */}
              <div className="flex items-center gap-3">
                <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[15px] bg-[#F0F5F0] text-[30px]">
                  {product.image?.startsWith("http") ? (
                    <span role="img" aria-label={product.nameBn}>
                      {product.categoryIcon}
                    </span>
                  ) : (
                    <span role="img" aria-label={product.nameBn}>
                      {product.image || product.categoryIcon}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="text-base leading-6 font-bold text-[#202820] transition group-hover:text-green-700 sm:text-[17px]">
                    {product.nameBn}
                  </h2>

                  <p className="mt-0.5 text-sm text-[#667067]">
                    প্রতি {formatUnit(product.unit)}
                  </p>
                </div>
              </div>

              {/* Price and change */}
              <div className="mt-4 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[13px] text-[#667067]">আজকের দাম</p>

                  <p className="mt-0.5 text-xl leading-7 font-extrabold text-[#202820]">
                    {formatPrice(product.today)}
                    <span className="ml-1 text-sm font-medium">টাকা</span>
                  </p>
                </div>

                <span
                  className={`mb-0.5 shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    isUp
                      ? "bg-[#F0F5F0] text-red-600"
                      : isDown
                        ? "bg-[#F0F5F0] text-green-600"
                        : "bg-[#F0F5F0] text-[#303830]"
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {formatPrice(Math.abs(product.change.pct))}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
