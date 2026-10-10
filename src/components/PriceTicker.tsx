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
    <div className="overflow-hidden border-b border-green-100 text-black">
      <div className="flex items-center">
        <div className="group min-w-0 flex-1 overflow-hidden">
          <div className="price-ticker-track flex w-max items-center group-hover:[animation-play-state:paused]">
            {items.map((product, index) => {
              const isUp = product.change.dir === "up";
              const isDown = product.change.dir === "down";

              return (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/product/${product.slug}`}
                  className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 py-2.5 text-sm transition-colors hover:bg-green-50"
                >
                  <span>{product.categoryIcon}</span>
                  <span className="font-medium">{product.nameBn}</span>

                  <span className="font-bold">
                    ৳{formatPrice(product.today)}
                  </span>

                  <span
                    className={
                      isUp
                        ? "font-semibold text-red-600"
                        : isDown
                          ? "font-semibold text-green-600"
                          : "font-semibold text-gray-500"
                    }
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}
                    {formatPrice(Math.abs(product.change.pct))}%
                  </span>

                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
