"use client";

import type { ReactNode } from "react";
import {
  buildWhatsAppHref,
  useSiteContact,
} from "@/components/providers/SiteContactProvider";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type WhatsAppButtonProps = {
  message: string;
  children: ReactNode;
  variant?: "pill" | "bar";
  tone?: "light" | "dark";
  className?: string;
  showIcon?: boolean;
};

const VARIANTS: Record<
  NonNullable<WhatsAppButtonProps["variant"]>,
  Record<NonNullable<WhatsAppButtonProps["tone"]>, string>
> = {
  pill: {
    light: "rounded-xl border border-charcoal text-charcoal hover:bg-sand",
    dark: "rounded-xl border border-cream/70 text-cream hover:bg-cream/10",
  },
  bar: {
    light: "rounded-xl bg-sand text-charcoal hover:bg-gold",
    dark: "rounded-xl bg-cream/15 text-cream hover:bg-cream/25",
  },
};

export function WhatsAppButton({
  message,
  children,
  variant = "pill",
  tone = "light",
  className = "",
  showIcon = true,
}: WhatsAppButtonProps) {
  const site = useSiteContact();

  return (
    <a
      href={buildWhatsAppHref(message, site.whatsappE164)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 px-6 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${VARIANTS[variant][tone]} ${className}`}
    >
      {showIcon ? (
        <WhatsAppIcon
          size={18}
          bubbleColor="currentColor"
          dotColor={tone === "dark" ? "#1A1815" : "#FAF7F2"}
        />
      ) : null}
      <span>{children}</span>
    </a>
  );
}
