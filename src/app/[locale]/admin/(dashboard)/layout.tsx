import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { AdminNav } from "@/components/admin/AdminNav";
import type { Locale } from "@/types/content";

export default function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const dict = getDictionary(locale);

  return (
    <div className="min-h-screen bg-enactus-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-enactus-gray-200 bg-enactus-black text-white lg:block">
          <div className="p-6">
            <Link href={`/${locale}/admin`} className="font-display text-lg font-bold">
              ENACTUS<span className="text-enactus-yellow"> ISEAHZ</span>
            </Link>
            <p className="mt-1 text-xs text-white/40">{dict.admin.dashboard}</p>
          </div>
          <AdminNav locale={locale} />
          <div className="mt-auto p-6">
            <Link href={`/${locale}`} className="block text-xs text-white/50 hover:text-white">
              ← {locale === "fr" ? "Voir le site" : "View site"}
            </Link>
          </div>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-enactus-gray-200 bg-white px-6 py-4 lg:hidden">
            <span className="font-display text-base font-bold text-enactus-black">
              ENACTUS<span className="text-enactus-yellow-dark"> ISEAHZ</span>
            </span>
            <SignOutButton locale={locale} label={dict.admin.signOut} />
          </header>
          <div className="hidden justify-end border-b border-enactus-gray-200 bg-white px-8 py-4 lg:flex">
            <SignOutButton locale={locale} label={dict.admin.signOut} />
          </div>
          <main className="p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
