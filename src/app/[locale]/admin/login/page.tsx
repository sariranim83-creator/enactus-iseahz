"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/types/content";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}

function AdminLoginForm() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const locale = (params.locale as Locale) ?? "en";
  const dict = getDictionary(locale);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const notConfigured = !isSupabaseConfigured || searchParams.get("notConfigured") === "1";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    if (!supabase) return;
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    const redirectTo = searchParams.get("redirectTo") ?? `/${locale}/admin`;
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-enactus-black px-5 py-16">
      <div className="w-full max-w-sm">
        <p className="text-center font-display text-xl font-bold text-white">
          ENACTUS<span className="text-enactus-yellow"> ISEAHZ</span>
        </p>
        <h1 className="mt-6 text-center text-lg font-bold text-white">{dict.admin.login}</h1>

        {notConfigured ? (
          <div className="mt-8 rounded-xl border border-enactus-yellow/30 bg-enactus-yellow/10 p-5 text-sm text-white/80">
            {dict.admin.notConfigured}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-white/60">
                {dict.admin.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-white/60">
                {dict.admin.password}
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="focus-ring w-full rounded-full bg-enactus-yellow py-3 text-sm font-bold uppercase tracking-wide text-enactus-black transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? dict.admin.saving : dict.admin.signIn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
