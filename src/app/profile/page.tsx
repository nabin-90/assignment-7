"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient, signOut } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট সফল হয়েছে।");
            router.push("/signin");
            router.refresh();
          },
          onError: () => {
            toast.error("সাইন আউট করা যায়নি।");
          },
        },
      });
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    }
  }

  if (isPending || !session?.user) {
    return (
      <main className="min-h-screen bg-[#F1F6F1] px-4 py-16">
        <div className="mx-auto max-w-[830px] animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="mt-8 h-32 rounded-[18px] bg-white" />
          <div className="mt-6 h-64 rounded-[18px] bg-white" />
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#F1F6F1] px-4 pb-10 sm:px-6">
      <div className="mx-auto max-w-[830px]">
        {/* Profile avatar */}
        <div className="flex justify-center">
          <div className="flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-b-none bg-[#D9D9D9] text-4xl font-bold text-[#202820]">
            {user.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              user.name?.charAt(0).toUpperCase() || "U"
            )}
          </div>
        </div>

        {/* Heading */}
        <header className="mb-7 mt-7">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#202820] sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#667067] sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Account summary */}
        <section className="flex flex-col gap-5 rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-7">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] bg-[#F0F5F0] text-3xl font-bold text-green-800">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name?.charAt(0).toUpperCase() || "U"
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-[#202820] sm:text-xl">
                {user.name || "নাম দেওয়া হয়নি"}
              </h2>
              <p className="mt-1 break-all text-sm text-[#667067] sm:text-base">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="shrink-0 self-start rounded-[10px] border border-red-400 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:self-center"
          >
            <span aria-hidden="true">↩ </span>
            সাইন আউট
          </button>
        </section>

        {/* Profile information */}
        <section className="mt-6 min-h-[270px] rounded-[18px] border border-[#DFE7DF] bg-[#FAFCFA] p-5 sm:px-6 sm:py-7">
          <h2 className="text-lg font-bold text-[#202820]">তথ্য</h2>

          <div className="mt-10 px-1 sm:px-6">
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-[#303830]"
            >
              নাম
            </label>

            <div
              id="profile-name"
              className="flex min-h-[44px] items-center rounded-[10px] border border-[#DFE7DF] bg-[#FAFCFA] px-3.5 py-2.5 text-sm text-[#202820]"
            >
              {user.name || "নাম দেওয়া হয়নি"}
            </div>

            <Link
              href="/profile/update"
              className="mt-4 block w-full rounded-[10px] bg-[#07883F] px-4 py-3 text-center text-sm font-bold text-white shadow-[0_3px_4px_rgba(0,0,0,0.18)] transition hover:bg-[#067535]"
            >
              আপডেট
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
