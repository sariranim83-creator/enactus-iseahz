import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "mb-3 text-xs font-bold uppercase tracking-[0.2em]",
              dark ? "text-enactus-yellow" : "text-enactus-yellow-dark"
            )}
          >
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-display text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl",
            dark ? "text-white" : "text-enactus-black"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-5 text-balance text-base leading-relaxed sm:text-lg",
              dark ? "text-white/70" : "text-enactus-gray-600"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
