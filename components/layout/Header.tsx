"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  buildWhatsAppHref,
  useSiteContact,
} from "@/components/providers/SiteContactProvider";
import { CallButton } from "@/components/ui/CallButton";
import { GoogleReviewsBadge } from "@/components/ui/GoogleReviewsBadge";
import { Logo } from "@/components/ui/Logo";
import type { NavItem } from "@/lib/cms";

type HeaderProps = {
  navItems: NavItem[];
  announcement?: string;
  googleRating?: string;
  googleReviewsUrl?: string;
};

function navLinkClass(href: string, pathname: string, base: string) {
  const active =
    href.startsWith("/") && !href.startsWith("/#")
      ? pathname === href || pathname.startsWith(`${href}/`)
      : false;
  return `${base} ${active ? "text-charcoal" : "text-muted hover:text-charcoal"}`;
}

export function Header({
  navItems,
  announcement = "Prioridade Lisboa e Margem Sul · nacional sob pedido",
  googleRating = "5.0",
  googleReviewsUrl,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const site = useSiteContact();
  const pathname = usePathname();

  return (
    <>
      <div className="bg-charcoal text-sand">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-[13px] leading-snug sm:px-6 sm:text-sm">
          {announcement}
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-bronze/40 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-6xl items-center gap-6 px-5 sm:px-8">
          <Link
            href="/"
            className="min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            aria-label={`${site.name} — início`}
          >
            <Logo tone="light" src={site.logoLightUrl} />
          </Link>

          <nav
            className="hidden min-w-0 items-center gap-6 text-[15px] lg:flex"
            aria-label="Secções"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(
                  item.href,
                  pathname,
                  "uppercase tracking-[0.06em] transition-colors",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
            <GoogleReviewsBadge
              rating={googleRating}
              href={googleReviewsUrl}
              className="hidden sm:inline-flex"
            />
            <CallButton
              className="px-4 py-3 text-sm sm:px-5"
              aria-label={`Ligar agora para ${site.phoneDisplay}`}
            >
              Ligar
            </CallButton>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="flex size-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded-xl border border-bronze/45 bg-transparent lg:hidden"
            >
              <span className="block h-px w-[18px] bg-charcoal" aria-hidden />
              <span className="block h-px w-[18px] bg-charcoal" aria-hidden />
            </button>
          </div>
        </div>

        {open ? (
          <div id="menu-mobile" className="border-t border-bronze/25 lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4 sm:px-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center py-3 font-display text-lg uppercase tracking-[0.06em] text-charcoal"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppHref(
                  site.urgentWhatsappMessage,
                  site.whatsappE164,
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-1.5 flex min-h-12 items-center border-t border-bronze/25 pt-4 text-bronze"
              >
                WhatsApp · {site.whatsappDisplay}
              </a>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
