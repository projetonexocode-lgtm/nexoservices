import Image from "next/image";
import { Gallery } from "@/components/sections/Gallery";
import { ContactCms } from "@/components/sections/ContactCms";
import { ServicesCms } from "@/components/sections/ServicesCms";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { resolveMediaUrl, sectionAnchor, navItemsFromSections, type NavItem } from "@/lib/cms";

type MediaLike = {
  url?: string | null;
} | string | null | undefined;

type SiteContact = {
  phoneDisplay: string;
  phoneTel: string;
  whatsappDisplay: string;
  whatsappE164: string;
  urgentWhatsappMessage: string;
};

type HomeSectionsProps = {
  sections: Array<Record<string, unknown>>;
  site: SiteContact;
};

export function HomeSections({ sections, site }: HomeSectionsProps) {
  return (
    <>
      {sections.map((section, index) => {
        const blockType = String(section.blockType || "");
        const id = sectionAnchor(blockType);
        const key = `${blockType}-${index}`;

        if (blockType === "about") {
          return <AboutFromCms key={key} id={id} data={section} site={site} />;
        }
        if (blockType === "services") {
          return <ServicesCms key={key} id={id} data={section} />;
        }
        if (blockType === "gallery") {
          const items = ((dataItems(section) as Array<Record<string, unknown>>) || []).map(
            (item) => ({
              imageUrl: resolveMediaUrl(
                item.image as MediaLike,
                item.imageUrl as string,
              ),
              caption: String(item.caption || ""),
              alt: (item.alt as string) || undefined,
            }),
          );

          return (
            <Gallery
              key={key}
              id={id}
              title={String(section.title || "Galeria")}
              intro={(section.intro as string) || undefined}
              items={items}
            />
          );
        }
        if (blockType === "contact") {
          return <ContactCms key={key} id={id} data={section} site={site} />;
        }
        return null;
      })}
    </>
  );
}

export function navFromUnknownSections(
  sections: Array<Record<string, unknown>>,
): NavItem[] {
  return navItemsFromSections(
    sections.map((section) => ({
      blockType: section.blockType as string | null | undefined,
      navLabel: section.navLabel as string | null | undefined,
      showInNav: section.showInNav as boolean | null | undefined,
      coverageNavLabel: section.coverageNavLabel as string | null | undefined,
      faqNavLabel: section.faqNavLabel as string | null | undefined,
      showCoverageInNav: section.showCoverageInNav as boolean | null | undefined,
      showFaqInNav: section.showFaqInNav as boolean | null | undefined,
    })),
  );
}

function dataItems(section: Record<string, unknown>) {
  return section.items;
}

function AboutFromCms({
  id,
  data,
  site,
}: {
  id: string;
  data: Record<string, unknown>;
  site: SiteContact;
}) {
  const heroSrc = resolveMediaUrl(
    data.heroImage as MediaLike,
    data.heroImageFallback as string,
  );
  const heroSlidesRaw = (
    (data.heroSlides as Array<Record<string, unknown>> | undefined) || []
  )
    .map((item) => ({
      src: resolveMediaUrl(item.image as MediaLike, item.imageUrl as string),
      alt: String(item.alt || "Serviço Nexo Services"),
    }))
    .filter((item) => item.src);
  const heroSlides =
    heroSlidesRaw.length > 0
      ? heroSlidesRaw
      : heroSrc
        ? [
            {
              src: heroSrc,
              alt: "Técnico Nexo Services em serviço ao domicílio",
            },
          ]
        : [
            {
              src: "/nexo-services/canalizacao.jpg",
              alt: "Canalização ao domicílio",
            },
            {
              src: "/nexo-services/eletricidade.jpg",
              alt: "Intervenção eléctrica",
            },
            {
              src: "/nexo-services/estores.jpg",
              alt: "Reparação de estores",
            },
            {
              src: "/nexo-services/ar-condicionado.jpg",
              alt: "Manutenção de ar condicionado",
            },
          ];
  const facts = (data.facts as Array<{ text?: string }> | undefined) || [];
  const differentials =
    (data.differentials as Array<{ title?: string; body?: string }> | undefined) ||
    [];
  const steps =
    (data.steps as Array<{ number?: string; title?: string; body?: string }> | undefined) ||
    [];
  const highlight = String(data.stepsTitleHighlight || "");
  const stepsTitle = String(data.stepsTitle || "");
  const stepsImagesRaw = (
    (data.stepsImages as Array<Record<string, unknown>> | undefined) || []
  )
    .map((item) => ({
      src: resolveMediaUrl(item.image as MediaLike, item.imageUrl as string),
      label: String(item.label || item.alt || ""),
      alt: String(item.alt || item.label || "Serviço Nexo Services"),
    }))
    .filter((item) => item.src);
  const stepsImages = (
    stepsImagesRaw.length > 0
      ? stepsImagesRaw
      : [
          {
            src: "/nexo-services/eletricidade.jpg",
            label: "Eletricidade",
            alt: "Intervenção eléctrica",
          },
          {
            src: "/nexo-services/canalizacao.jpg",
            label: "Canalização",
            alt: "Canalização ao domicílio",
          },
        ]
  ).slice(0, 2);

  return (
    <>
      <section
        id={id}
        className="relative isolate min-h-[min(100svh,52rem)] overflow-hidden bg-charcoal text-cream"
      >
        <HeroCarousel slides={heroSlides} />
        <div
          className="absolute inset-0 bg-linear-to-r from-charcoal/65 via-charcoal/40 to-charcoal/15"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[min(100svh,52rem)] max-w-6xl flex-col justify-center px-6 pb-28 pt-16 sm:px-8 sm:pt-20 lg:pb-20">
          <p className="nx-hero-rise font-display text-[clamp(0.85rem,1.8vw,1.1rem)] leading-snug tracking-[0.04em] sm:text-[clamp(0.9rem,2vw,1.2rem)]">
            {String(data.brandName || "")
              .split("|")
              .map((part, index) => (
                <span key={`${part.trim()}-${index}`}>
                  {index > 0 ? (
                    <span className="mx-2 text-cream/40 sm:mx-3" aria-hidden>
                      |
                    </span>
                  ) : null}
                  <span className="text-gold">{part.trim()}</span>
                </span>
              ))}
          </p>
          <h1 className="nx-hero-rise nx-hero-rise-delay-1 mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.025em] text-balance">
            {String(data.headline || "")}{" "}
            {data.headlineAccent ? (
              <span className="text-gold">{String(data.headlineAccent)}</span>
            ) : null}
          </h1>
          <p className="nx-hero-rise nx-hero-rise-delay-2 mt-5 max-w-[42ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-cream/85">
            {String(data.supportText || "")}
          </p>
          <div className="nx-hero-rise nx-hero-rise-delay-3 mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
            <CallButton tone="dark" className="w-full px-8 py-5 text-[1.03rem] sm:w-auto">
              {String(data.callLabel || "Ligar")} · {site.phoneDisplay}
            </CallButton>
            <WhatsAppButton
              tone="dark"
              message={site.urgentWhatsappMessage}
              className="w-full px-7 py-5 text-[1.03rem] sm:w-auto"
            >
              {String(data.whatsappLabel || "WhatsApp")}
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="bg-charcoal px-6 py-8 text-cream sm:px-8">
        <div className="mx-auto max-w-6xl">
          {data.trustIntro ? (
            <p className="mb-4 text-[15px] leading-relaxed text-cream/75">
              {String(data.trustIntro)}
            </p>
          ) : null}
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-10 sm:gap-y-2">
            {facts.map((fact) => (
              <li key={fact.text} className="text-[17px] leading-snug text-gold">
                {fact.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="scroll-mt-28 bg-sand px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 max-w-[22ch] font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.02em]">
            {(() => {
              const raw = String(data.differentialsTitle || "");
              const lines = raw.includes("\n")
                ? raw.split("\n").map((line) => line.trim()).filter(Boolean)
                : raw
                    .split(/(?<=\.)\s+/)
                    .map((line) => line.trim())
                    .filter(Boolean);
              return lines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className={`block ${index === 0 ? "text-charcoal" : "text-bronze"}`}
                >
                  {line}
                </span>
              ));
            })()}
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-8">
            {differentials.map((item) => (
              <li key={item.title} className="flex flex-col gap-2">
                <h3 className="font-display text-[1.2rem] leading-snug text-charcoal">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="scroll-mt-28 bg-cream px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
            <h2 className="max-w-[20ch] font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.1] tracking-[-0.02em] text-charcoal">
              {highlight && stepsTitle.includes(highlight)
                ? stepsTitle.split(highlight).map((part, i, arr) => (
                    <span key={`${part}-${i}`}>
                      {part}
                      {i < arr.length - 1 ? (
                        <span className="text-bronze">{highlight}</span>
                      ) : null}
                    </span>
                  ))
                : stepsTitle}
            </h2>

            {stepsImages.length > 0 ? (
              <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {stepsImages.map((image) => (
                  <li
                    key={`${image.src}-${image.label}`}
                    className="flex min-w-0 flex-col overflow-hidden bg-charcoal"
                  >
                    <div className="relative aspect-[4/3] bg-sand">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 40vw, 180px"
                        className="object-cover"
                      />
                    </div>
                    <p className="flex min-h-10 items-center justify-center px-2 py-2 text-center font-display text-[10px] uppercase leading-tight tracking-[0.06em] text-cream sm:min-h-11 sm:text-[11px]">
                      {image.label}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-8">
            {steps.map((step) => (
              <li key={step.number} className="flex flex-col gap-3">
                <p className="font-display text-4xl leading-none text-bronze">{step.number}</p>
                <h3 className="font-display text-[1.22rem] leading-snug text-charcoal">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
