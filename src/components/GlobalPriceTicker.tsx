"use client";

import { useEffect, useState } from "react";
import type { IProduct } from "@/lib/types";
import PriceTicker from "@/components/PriceTicker";

export default function GlobalPriceTicker() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const response = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );

        if (!response.ok) return;

        const data: IProduct[] = await response.json();

        if (!cancelled) setProducts(data);
      } catch (error) {
        console.error("Price ticker products load failed:", error);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return <PriceTicker products={products} />;
}
