import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/api";
import CategoryProductGrid from "@/components/CategoryProductGrid";

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
        <CategoryProductGrid products={products} />
      </div>
    </main>
  );
}
