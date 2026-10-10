import Link from "next/link";
import type { IProduct } from "@/lib/types";

interface ProductCardProps {
  product: IProduct;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex min-h-[168px] flex-col justify-between rounded-[20px] border border-[#DFE7DF] bg-[#FAFCFA] p-4 transition-colors hover:border-[#B9D5BC] sm:p-5"
    >
      {/* Product name and icon */}
      <div className="flex items-center gap-3">
        <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-[30px]">
          {product.image || product.categoryIcon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[17px] font-bold leading-6 text-[#202820] group-hover:text-green-800">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-sm text-[#596159]">
            {product.unit === "kg"
              ? "প্রতি কেজি"
              : product.unit === "piece"
                ? "প্রতি পিস"
                : product.unit === "dozen"
                  ? "প্রতি ডজন"
                  : `প্রতি ${product.unit}`}
          </p>
        </div>
      </div>

      {/* Price and change badge */}
      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-[#424942]">আজকের দাম</p>

          <p className="mt-0.5 text-xl font-extrabold leading-7 text-[#202820]">
            {formatPrice(product.today)}{" "}
            <span className="text-base font-semibold">টাকা</span>
          </p>
        </div>

        <span
          className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-bold ${
            isUp
              ? "bg-[#F0F5F0] text-red-600"
              : isDown
                ? "bg-[#F0F5F0] text-green-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}
          {formatPrice(Math.abs(product.change.pct))}%
        </span>
      </div>
    </Link>
  );
}
