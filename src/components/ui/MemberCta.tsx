"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/types/content";

/**
 * "Become a Member" CTA. Links straight to the recruitment form once the
 * admin has set a URL; until then it shows a clean, honest placeholder
 * instead of a dead link.
 */
export function MemberCta({
  recruitmentUrl,
  label,
  locale,
  variant = "secondary",
  className,
}: {
  recruitmentUrl: string | null;
  label: string;
  locale: Locale;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}) {
  const [showNotice, setShowNotice] = useState(false);

  if (recruitmentUrl) {
    return (
      <Button href={recruitmentUrl} variant={variant} className={className}>
        {label}
      </Button>
    );
  }

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <Button variant={variant} className={className} onClick={() => setShowNotice(true)}>
        {label}
      </Button>
      {showNotice && (
        <p className="max-w-xs text-xs text-enactus-gray-500" role="status">
          {locale === "fr"
            ? "Le formulaire d'inscription arrive bientôt. Suivez-nous sur les réseaux sociaux en attendant."
            : "The recruitment form is coming soon. Follow us on social media in the meantime."}
        </p>
      )}
    </div>
  );
}
