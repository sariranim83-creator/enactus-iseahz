import type { SocialLinks } from "@/types/content";
import { cn } from "@/lib/utils";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.1c0-.95.27-1.6 1.63-1.6h1.74V3.5c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.22 1.53-4.22 4.33v2.6H7v3.3h3.14V22h3.36Z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 3c.4 2.1 1.8 3.6 4 3.9v2.7a6.9 6.9 0 0 1-4-1.3v6.6a5.8 5.8 0 1 1-5.8-5.8c.2 0 .5 0 .7.05v2.8a3 3 0 1 0 2.1 2.86V3h3Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V20H9.5V8.5h3.24v1.57h.05c.45-.86 1.56-1.77 3.2-1.77 3.42 0 4.45 2.25 4.45 5.18V20Z" />
    </svg>
  );
}

export function SocialIcons({
  social,
  dark = false,
  size = "md",
}: {
  social: SocialLinks;
  dark?: boolean;
  size?: "sm" | "md";
}) {
  const items = [
    { url: social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { url: social.facebook, Icon: FacebookIcon, label: "Facebook" },
    { url: social.tiktok, Icon: TikTokIcon, label: "TikTok" },
    { url: social.linkedin, Icon: LinkedInIcon, label: "LinkedIn" },
  ].filter((item) => item.url);

  if (items.length === 0) return null;

  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const icon = size === "sm" ? "h-4 w-4" : "h-4.5 w-4.5";

  return (
    <div className="flex items-center gap-3">
      {items.map(({ url, Icon, label }) => (
        <a
          key={label}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "focus-ring flex items-center justify-center rounded-full border transition-colors",
            dim,
            dark
              ? "border-white/20 text-white/80 hover:border-enactus-yellow hover:text-enactus-yellow"
              : "border-enactus-black/15 text-enactus-black/70 hover:border-enactus-yellow-dark hover:text-enactus-yellow-dark"
          )}
        >
          <Icon className={icon} />
        </a>
      ))}
    </div>
  );
}
