"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const categories = [
  { name: "সব পণ্য", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
  { name: "ডিম-দুধ", slug: "dim-dui" },
  { name: "মসলা", slug: "mosla" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    const today = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setBanglaDate(today);
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("Sign out করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      toast.success("সফলভাবে Sign out হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/95 shadow-sm backdrop-blur">
      {/* Logo and authentication */}{" "}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        {" "}
        <Link href="/" className="text-2xl font-extrabold text-green-800">
          🛒 বাজার দর
          <span className="mt-1 block text-xs font-normal text-gray-500">
            নিত্যপণ্যের দাম এক নজরে
          </span>
          <span className="mt-1 block text-xs font-medium text-green-700">
            {banglaDate || "বাংলা তারিখ লোড হচ্ছে..."}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-100" />
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                className="rounded-xl border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                প্রোফাইল
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
              >
                {signingOut ? "অপেক্ষা করো..." : "সাইন আউট"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-xl border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Category navigation */}
      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-3"
      >
        {categories.map((category) => {
          const href = category.slug ? `/category/${category.slug}` : "/";

          const isActive = category.slug
            ? pathname === href || pathname.startsWith(`${href}/`)
            : pathname === "/";

          return (
            <Link
              key={category.slug || "all"}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-green-100 hover:text-green-800"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
