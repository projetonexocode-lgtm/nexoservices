"use client";

import Image from "next/image";
import {
  buildWhatsAppHref,
  useSiteContact,
} from "@/components/providers/SiteContactProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type ServiceItem = {
  slug?: string;
  title?: string;
  description?: string;
  whatsappMessage?: string;
  imageUrl?: string;
  imageAlt?: string;
};

type ServicesCmsProps = {
  id: string;
  data: Record<string, unknown>;
};

function ServiceThumb({ service }: { service: ServiceItem }) {
  if (service.imageUrl) {
    return (
      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream">
        <Image
          src={service.imageUrl}
          alt={service.imageAlt || ""}
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-cream text-bronze"
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="3.5"
          y="3.5"
          width="17"
          height="17"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 12h8M12 8v8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function ServiceRow({
  service,
  whatsappE164,
}: {
  service: ServiceItem;
  whatsappE164: string;
}) {
  return (
    <li>
      <a
        href={buildWhatsAppHref(service.whatsappMessage || "", whatsappE164)}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-h-16 items-center gap-3 py-3.5 text-charcoal transition-colors hover:text-bronze"
      >
        <ServiceThumb service={service} />
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[1.05rem] leading-tight">
            {service.title}
          </span>
          <span className="mt-1 block text-sm leading-snug text-muted group-hover:text-bronze">
            {service.description}
          </span>
        </span>
        <span className="shrink-0 text-sm text-bronze">WhatsApp</span>
      </a>
    </li>
  );
}

export function ServicesCms({ id, data }: ServicesCmsProps) {
  const site = useSiteContact();
  const primary = (data.primaryServices as ServiceItem[] | undefined) || [];
  const groups =
    (data.groups as Array<{ id?: string; title?: string; items?: ServiceItem[] }> | undefined) ||
    [];
  const urgentMessage = String(
    data.urgentWhatsappMessage || site.urgentWhatsappMessage,
  );

  return (
    <section id={id} className="scroll-mt-28 bg-sand px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            title={String(data.title || "")}
            highlight={(data.titleHighlight as string) || undefined}
            className="max-w-[22ch]"
          />
          {data.intro ? (
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-muted">
              {String(data.intro)}
            </p>
          ) : null}
        </div>

        <a
          href={buildWhatsAppHref(urgentMessage, site.whatsappE164)}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 flex min-h-14 items-center justify-between gap-4 rounded-xl bg-charcoal px-5 py-4 text-cream transition-colors hover:bg-bronze"
        >
          <span className="font-display text-lg uppercase leading-snug tracking-[0.04em]">
            {String(data.urgentLabel || "Não sei o que é — WhatsApp urgente")}
          </span>
          <span className="flex shrink-0 items-center gap-2 text-sm">
            <WhatsAppIcon size={16} bubbleColor="currentColor" dotColor="#1A1815" />
            Enviar
          </span>
        </a>

        <ul className="mb-6 divide-y divide-bronze/30 border-y border-bronze/40">
          {primary.map((service) => (
            <ServiceRow
              key={service.slug || service.title}
              service={service}
              whatsappE164={site.whatsappE164}
            />
          ))}
        </ul>

        <details className="group rounded-xl border border-bronze/40 bg-cream/70">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="font-display text-lg text-charcoal">
              Ver todos os serviços
            </span>
            <span className="text-bronze transition-transform group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <div className="grid gap-8 border-t border-bronze/30 px-5 py-6 lg:grid-cols-2">
            {groups.map((group) => (
              <div key={group.id || group.title}>
                <h3 className="mb-2 font-display text-xl text-charcoal">{group.title}</h3>
                <ul className="divide-y divide-bronze/25">
                  {(group.items || []).map((service) => (
                    <ServiceRow
                      key={service.slug || service.title}
                      service={service}
                      whatsappE164={site.whatsappE164}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
