"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import {
  buildWhatsAppHref,
  useSiteContact,
} from "@/components/providers/SiteContactProvider";
import type { FooterContent } from "@/lib/cms/footer";

type FooterProps = {
  content: FooterContent;
};

export function Footer({ content }: FooterProps) {
  const site = useSiteContact();
  const copy = site.copy;
  const servicesColA = content.services.slice(0, 6);
  const servicesColB = content.services.slice(6, 12);

  return (
    <footer className="bg-charcoal px-6 pt-[clamp(3.25rem,6vw,5.25rem)] pb-10 text-cream/80 lg:pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-gold/20 pb-10 lg:grid-cols-[1.15fr_0.95fr_1.45fr] lg:gap-14">
          <div>
            <Logo tone="dark" src={site.logoDarkUrl} className="mb-4" />
            <p className="mb-6 max-w-[32ch] text-[15px] leading-relaxed text-cream/75">
              {content.blurb}
            </p>
            <div className="flex items-center gap-2.5">
              {content.instagramUrl ? (
                <SocialLink href={content.instagramUrl} label={copy.socialInstagramLabel}>
                  <InstagramIcon />
                </SocialLink>
              ) : null}
              {content.facebookUrl ? (
                <SocialLink href={content.facebookUrl} label={copy.socialFacebookLabel}>
                  <FacebookIcon />
                </SocialLink>
              ) : null}
              {content.linkedinUrl ? (
                <SocialLink href={content.linkedinUrl} label={copy.socialLinkedinLabel}>
                  <LinkedInIcon />
                </SocialLink>
              ) : null}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.08em] text-gold">
              {copy.footerContactsTitle}
            </p>
            <div className="flex flex-col gap-3 text-[15px]">
              <a
                href={`tel:${site.phoneTel}`}
                className="text-gold transition-colors hover:text-cream"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={buildWhatsAppHref(
                  site.urgentWhatsappMessage,
                  site.whatsappE164,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center rounded-lg border border-[#25D366]/70 px-2.5 py-1.5 text-cream transition-colors hover:border-[#25D366]"
              >
                {copy.footerWhatsappPrefix} {site.whatsappDisplay}
              </a>
              {content.contactEmail ? (
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="break-all text-cream transition-colors hover:text-gold"
                >
                  {content.contactEmail}
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.08em] text-gold">
              {copy.footerServicesTitle}
            </p>
            <div className="grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
              <ul className="flex flex-col gap-2.5 text-[15px]">
                {servicesColA.map((service) => (
                  <li key={service}>
                    <Link
                      href="/#servicos"
                      className="text-cream transition-colors hover:text-gold"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2.5 text-[15px]">
                {servicesColB.map((service) => (
                  <li key={service}>
                    <Link
                      href="/#servicos"
                      className="text-cream transition-colors hover:text-gold"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-b border-gold/20 py-8 sm:grid-cols-3 sm:gap-10">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.08em] text-gold">
              {copy.footerPartnersTitle}
            </p>
            <ul className="flex flex-col gap-2 text-[15px] text-cream">
              {content.partners.map((partner) => (
                <li key={partner}>{partner}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.08em] text-gold">
              {copy.footerCertificatesTitle}
            </p>
            <ul className="flex flex-col gap-2 text-[15px] text-cream">
              {content.certificates.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.08em] text-gold">
              {content.alsoDoTitle}
            </p>
            <p className="mb-5 max-w-[28ch] text-[15px] leading-relaxed text-cream/75">
              {content.alsoDoText}
            </p>
            {content.alsoDoUrl ? (
              <a
                href={content.alsoDoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-[12.25rem] justify-center transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:max-w-[14rem]"
                aria-label={`${content.alsoDoLabel} — ${copy.alsoDoOpenAria}`}
              >
                <img
                  src={content.projetoNexoLogoUrl}
                  alt={content.alsoDoLabel}
                  width={224}
                  height={80}
                  className="h-auto w-full object-contain"
                  decoding="async"
                />
              </a>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-sm">
          <span className="text-cream/60">
            © {new Date().getFullYear()} {site.name}. {copy.footerCopyrightSuffix}
          </span>
          <span className="font-medium text-gold">{content.warrantyText}</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-gold/35 text-gold transition-colors hover:border-gold hover:bg-gold/10 hover:text-cream"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3.1l.9-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 9.5H3.7V20h2.8V9.5zM5.1 4C4.1 4 3.3 4.8 3.3 5.8S4.1 7.6 5.1 7.6 6.9 6.8 6.9 5.8 6.1 4 5.1 4zM20.3 13.2c0-2.4-1.3-3.5-3-3.5-1.4 0-2 .7-2.4 1.3V9.5h-2.8c0 .4 0 10.5 0 10.5h2.8v-5.9c0-.3 0-.6.1-.9.3-.6.9-1.3 1.9-1.3 1.3 0 1.9.9 1.9 2.4V20h2.8v-6.8z" />
    </svg>
  );
}
