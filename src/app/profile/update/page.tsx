"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
    }
  }, [session?.user]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("নাম লিখো।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: trimmedName,
      });

      if (result.error) {
        toast.error(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("তোমার নাম আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setSaving(false);
    }
  }

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
            প্রোফাইল আপডেট
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            তোমার নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করো।
          </p>
        </div>
        <div className="mb-6 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">ইমেইল</p>
          <p className="mt-1 break-all font-medium text-gray-900">
            {session.user.email}
          </p>
        </div>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              তোমার নাম
            </label>

            <input
              id="name"
              type="text"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="তোমার নাম লিখো"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            disabled={saving || !name.trim()}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
        </form>
        <Link
          href="/profile"
          className="mt-5 block text-center text-sm font-medium text-green-700 hover:underline"
        >
          ← প্রোফাইলে ফিরে যাও
        </Link>
      </section>
    </main>
  );
}
