
import type { IProduct } from "./types";

const API_URL = "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts(): Promise<IProduct[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  return response.json();
}

export async function getProductBySlug(
  slug: string,
): Promise<IProduct | null> {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductsByCategory(
  category: string,
): Promise<IProduct[]> {
  const response = await fetch(
    `${API_URL}/products?category=${encodeURIComponent(category)}`,
  );

  if (!response.ok) {
    throw new Error("ক্যাটাগরির পণ্য লোড করা যায়নি");
  }

  return response.json();
}