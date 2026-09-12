"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/types/content";

export function SignOutButton({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push(`/${locale}/admin/login`);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="focus-ring rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white/70 transition-colors hover:border-white/40 hover:text-white"
    >
      {label}
    </button>
  );
}
