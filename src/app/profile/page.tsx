"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        {" "}
        <p className="animate-pulse text-gray-500">
          প্রোফাইল লোড হচ্ছে...{" "}
        </p>{" "}
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#f8faf7] px-4 py-12">
      {" "}
      <section className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
        {" "}
        <div className="mb-8 text-center">
          {" "}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-800">
            {session.user.name?.charAt(0).toUpperCase() || "U"}{" "}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            তোমার ব্যক্তিগত তথ্য দেখো।
          </p>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">তোমার নাম</p>
            <p className="mt-1 font-medium text-gray-900">
              {session.user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">ইমেইল</p>
            <p className="mt-1 break-all font-medium text-gray-900">
              {session.user.email}
            </p>
          </div>

          <Link
            href="/profile/update"
            className="block w-full rounded-lg bg-green-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-green-800"
          >
            Update
          </Link>
        </div>
        <Link
          href="/"
          className="mt-5 block text-center text-sm font-medium text-green-700 hover:underline"
        >
          ← হোম পেজে ফিরে যাও
        </Link>
      </section>
    </main>
  );
}
