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
    <main className="min-h-screen bg-[#F1F6F1] px-4 py-6 text-[#202820] sm:px-6 sm:py-8 lg:px-4">
      {" "}
      <div className="mx-auto max-w-7xl">
        {" "}
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-green-700 hover:text-green-900"
        >
          ← হোম পেজে ফিরে যান{" "}
        </Link>
        <div className="mb-6 rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F0] text-3xl">
              {products[0].categoryIcon}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold text-[#202820] sm:text-3xl">
                {categoryName}
              </h1>

              <p className="mt-1 text-sm text-[#667067]">
                {formatPrice(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>
        <CategoryProductGrid products={products} />
      </div>
    </main>
  );
}
