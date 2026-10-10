"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";

const categories = [
  { name: "সব পণ্য", slug: "", icon: "🛍️" },
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const [signingOut, setSigningOut] = useState(false);
  const [banglaDate, setBanglaDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("Sign out করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      setDropdownOpen(false);
      toast.success("সফলভাবে Sign out হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSigningOut(false);
    }
  }

  const user = session?.user;
  const userName = user?.name?.trim() || "ব্যবহারকারী";
  const userEmail = user?.email || "";
  const avatarLetter = userName.charAt(0).toUpperCase();

  return (
    <header className="relative z-30 border-b border-green-100 bg-white/95 shadow-sm backdrop-blur">
      {/* Logo and authentication */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-green-800"
        >
          {/* Logo */}
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-700 text-2xl text-white">
            🛒
          </span>

          {/* Title and date */}
          <span className="flex flex-col justify-center gap-0.5">
            <span className="text-[22px] leading-tight font-extrabold tracking-tight">
              বাজার দর
            </span>

            <span className="text-xs leading-4 font-medium text-gray-600">
              {banglaDate || "তারিখ লোড হচ্ছে..."}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
          ) : user ? (
            <div className="relative z-[70]">
              {/* User dropdown trigger */}
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                aria-label="User menu"
                className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={userName}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-green-100 object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-100 bg-green-100 text-sm font-bold text-green-800">
                    {avatarLetter}
                  </span>
                )}

                <span className="hidden max-w-36 truncate text-sm font-semibold text-gray-800 sm:block">
                  {userName}
                </span>

                <svg
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close user menu"
                    className="fixed inset-0 z-[101] cursor-default"
                    onClick={() => setDropdownOpen(false)}
                  />

                  <div
                    role="menu"
                    className="absolute right-0 z-[102] mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
                  >
                    {/* User information */}
                    <div className="border-b border-gray-100 bg-gray-50 px-4 py-4">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {userName}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {userEmail}
                      </p>
                    </div>

                    {/* Profile */}
                    <div className="p-2">
                      <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-800"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="8" r="4" />
                          <path d="M5 21v-2a7 7 0 0114 0v2" />
                        </svg>
                        আমার প্রোফাইল
                      </Link>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden="true"
                        >
                          <path d="M10 17l5-5-5-5" />
                          <path d="M15 12H3" />
                          <path d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6" />
                        </svg>
                        {signingOut ? "অপেক্ষা করো..." : "সাইন আউট"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
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

      <div className="border-t border-gray-100" />

      {/* Category navigation */}

      <nav
        aria-label="পণ্যের ক্যাটাগরি"
        className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-2"
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
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-green-700 text-white shadow-sm"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-800"
              }`}
            >
              <span aria-hidden="true">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
