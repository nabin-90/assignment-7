
import Link from "next/link";
import type { IProduct } from "@/lib/types";

interface PriceTickerProps {
  products: IProduct[];
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  const items = [...products, ...products];

  return (
    <div className="overflow-hidden border-b border-green-100 bg-[#183b2b] text-white">
      <div className="flex items-center">
        <div className="z-10 shrink-0 bg-green-700 px-4 py-3 text-sm font-bold">
          বাজার আপডেট
        </div>

        <div className="group min-w-0 flex-1 overflow-hidden">
          <div className="price-ticker-track flex w-max items-center group-hover:[animation-play-state:paused]">
            {items.map((product, index) => {
              const isUp = product.change.dir === "up";
              const isDown = product.change.dir === "down";

              return (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/product/${product.slug}`}
                  className="flex shrink-0 items-center gap-2 px-5 py-3 text-sm"
                >
                  <span>{product.categoryIcon}</span>
                  <span className="font-medium">{product.nameBn}</span>

                  <span className="font-bold">
                    ৳{formatPrice(product.today)}
                  </span>

                  <span
                    className={
                      isUp
                        ? "font-semibold text-green-300"
                        : isDown
                          ? "font-semibold text-red-300"
                          : "text-gray-300"
                    }
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}
                    {formatPrice(Math.abs(product.change.pct))}%
                  </span>

                  <span className="ml-3 text-gray-500">•</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}