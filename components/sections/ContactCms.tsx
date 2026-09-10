import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoverageMap } from "@/components/ui/CoverageMap";
import { FinalCta } from "@/components/sections/FinalCta";

type SiteContact = {
  phoneDisplay: string;
  phoneTel: string;
  whatsappDisplay: string;
  whatsappE164: string;
  urgentWhatsappMessage: string;
};

type ContactCmsProps = {
  id: string;
  data: Record<string, unknown>;
  site: SiteContact;
};

export function ContactCms({ id, data, site }: ContactCmsProps) {
  const coverageGroups =
    (data.coverageGroups as Array<{
      id?: string;
      title?: string;
      cities?: Array<{ name?: string }>;
    }> | undefined) || [];
  const faqs =
    (data.faqs as Array<{
      question?: string;
      answer?: string;
      placeholder?: boolean;
    }> | undefined) || [];

  return (
    <div>
      <section
        id="cobertura"
        className="scroll-mt-28 bg-sand px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-start lg:gap-12">
            <div>
              <SectionHeading
                title={String(data.coverageTitle || "Zona de cobertura")}
                className="mb-0"
              />
              {data.coverageIntro ? (
                <p className="mt-5 max-w-[42ch] text-[16.5px] leading-relaxed text-muted">
                  {String(data.coverageIntro)}
                </p>
              ) : null}
            </div>
            <CoverageMap />
          </div>

          <div className="grid items-start gap-3 md:grid-cols-2">
            {coverageGroups.map((group) => {
              const cities = (group.cities || [])
                .map((city) => city.name || "")
                .filter(Boolean);
              return (
                <details
                  key={group.id || group.title}
                  className="rounded-xl border border-gold/25 bg-charcoal px-5 py-2"
                >
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 marker:hidden [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block text-[1.05rem] font-semibold uppercase tracking-[0.08em] text-gold">
                        {group.title}
                      </span>
                      <span className="mt-1.5 block text-sm text-cream/70">
                        {cities.slice(0, 3).join(", ")}
                        {cities.length > 3 ? ` e mais ${cities.length - 3}` : ""}
                      </span>
                    </span>
                    <span className="shrink-0 text-gold" aria-hidden>
                      +
                    </span>
                  </summary>
                  <ul className="flex flex-wrap gap-2 pb-4">
                    {cities.map((city) => (
                      <li
                        key={city}
                        className="border border-gold/30 bg-cream/5 px-3 py-1.5 text-sm text-cream"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="scroll-mt-28 bg-cream px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
      >
        <div className="mx-auto max-w-[900px]">
          <SectionHeading
            title={String(data.faqTitle || "FAQ")}
            tone="accent"
            className="mb-10"
          />
          <div className="divide-y divide-bronze/40 border-y border-bronze/50">
            {faqs.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-6 font-display text-[1.19rem] text-charcoal marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-bronze/55 bg-sand text-bronze transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 2.5v9M2.5 7h9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pb-7">
                  {item.placeholder ? (
                    <PlaceholderNote className="mb-3">
                      Resposta parcial — detalhe ainda a confirmar.
                    </PlaceholderNote>
                  ) : null}
                  <p className="text-base leading-relaxed text-muted">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        id={id}
        title={String(data.title || "Deixe o número.")}
        titleAccent={(data.titleAccent as string) || undefined}
        supportText={(data.supportText as string) || undefined}
        phoneDisplay={site.phoneDisplay}
        whatsappDisplay={site.whatsappDisplay}
        urgentWhatsappMessage={site.urgentWhatsappMessage}
      />
    </div>
  );
}
