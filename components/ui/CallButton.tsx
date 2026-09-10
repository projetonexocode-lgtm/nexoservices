"use client";

import type { ReactNode } from "react";
import { useSiteContact } from "@/components/providers/SiteContactProvider";

type CallButtonProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  tone?: "light" | "dark";
};

const TONES = {
  light: "bg-charcoal text-cream hover:bg-bronze",
  dark: "bg-gold text-charcoal hover:bg-cream",
} as const;

export function CallButton({
  children,
  className = "",
  "aria-label": ariaLabel,
  tone = "light",
}: CallButtonProps) {
  const site = useSiteContact();

  return (
    <a
      href={`tel:${site.phoneTel}`}
      aria-label={ariaLabel ?? `Ligar para ${site.phoneDisplay}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-5 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${TONES[tone]} ${className}`}
    >
      {children}
    </a>
  );
}
