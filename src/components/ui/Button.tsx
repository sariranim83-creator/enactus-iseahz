import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "bg-enactus-yellow text-enactus-black hover:bg-enactus-yellow-dark",
  secondary: "bg-enactus-black text-white hover:bg-enactus-off-black",
  outline: "border-2 border-enactus-black text-enactus-black hover:bg-enactus-black hover:text-white",
  ghost: "border-2 border-white/40 text-white hover:border-white hover:bg-white/10",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  target,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  target?: string;
  onClick?: () => void;
}) {
  const classes = cn(
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]",
    variantClasses[variant],
    className
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <Link
        href={href}
        className={classes}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
