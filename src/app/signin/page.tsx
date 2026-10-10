"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  async function handleSocialSignIn(provider: "google" | "github") {
    setSocialLoading(provider);

    try {
      const result = await signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signin",
      });

      if (result.error) {
        toast.error(result.error.message || "Sign in করা যায়নি।");
        setSocialLoading(null);
      }
    } catch {
      toast.error(`${provider} দিয়ে Sign in করা যায়নি।`);
      setSocialLoading(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      toast.success("সফলভাবে Sign in হয়েছে!");

      const callbackURL = new URLSearchParams(window.location.search).get(
        "callbackURL",
      );

      const destination =
        callbackURL?.startsWith("/") && !callbackURL.startsWith("//")
          ? callbackURL
          : "/";

      router.push(destination);
      router.refresh();
    } catch {
      toast.error("Sign in করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-[10px] border border-[#DFE7DF] bg-[#FAFCFA] px-3.5 py-3 text-base text-[#202820] outline-none transition placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100";

  const socialButtonClass =
    "flex min-w-0 items-center justify-center gap-2 rounded-[10px] border border-[#DFE7DF] px-2 py-3 text-sm font-semibold text-[#303830] transition hover:bg-[#F1F6F1] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#F1F6F1] px-4 py-8 sm:py-10">
      <div className="mx-auto w-full max-w-[530px]">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#202820]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#667067] sm:text-base">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign in card */}
        <div className="rounded-[20px] border border-[#DFE7DF] bg-[#FAFCFA] p-5 sm:p-[30px]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#202820]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#202820]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="w-full rounded-[10px] bg-[#07883F] px-4 py-3.5 text-base font-bold text-white shadow-[0_3px_4px_rgba(0,0,0,0.18)] transition hover:bg-[#067535] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#DFE7DF]" />
            <span className="text-sm text-[#667067]">অথবা</span>
            <div className="h-px flex-1 bg-[#DFE7DF]" />
          </div>

          {/* Social login */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialSignIn("google")}
              className={socialButtonClass}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="h-[18px] w-[18px] shrink-0"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.65 5.94c4.47-4.13 7.13-10.22 7.13-17.59Z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.57 2.56 10.78l7.97-6.19Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.86l-7.65-5.94c-2.13 1.43-4.85 2.28-8.25 2.28-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
                />
              </svg>

              <span className="truncate">
                {socialLoading === "google"
                  ? "অপেক্ষা করুন..."
                  : "Google দিয়ে চালিয়ে যান"}
              </span>
            </button>

            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialSignIn("github")}
              className={socialButtonClass}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] shrink-0 fill-current"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.11 2.94.72.78 1.15 1.77 1.15 2.98 0 4.27-2.6 5.22-5.08 5.5.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>

              <span className="truncate">
                {socialLoading === "github"
                  ? "অপেক্ষা করুন..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          {/* Signup link */}
          <p className="mt-6 text-center text-sm text-[#424942]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#07883F] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="mt-7 text-center">
          <Link
            href="/"
            className="text-sm text-[#7A847B] transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
