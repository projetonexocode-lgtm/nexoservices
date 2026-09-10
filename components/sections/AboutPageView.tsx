import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveMediaUrl } from "@/lib/cms/media";

type MediaLike =
  | {
      url?: string | null;
    }
  | string
  | null
  | undefined;

type Paragraph = { text?: string | null; id?: string | null };
type ValueItem = {
  title?: string | null;
  body?: string | null;
  id?: string | null;
};
type TeamMember = {
  name?: string | null;
  role?: string | null;
  bio?: string | null;
  photo?: MediaLike;
  photoUrl?: string | null;
  id?: string | null;
};
type ExtraSection = {
  title?: string | null;
  body?: string | null;
  image?: MediaLike;
  imageUrl?: string | null;
  id?: string | null;
};

export type AboutPageData = {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroTitleAccent?: string | null;
  heroLead?: string | null;
  heroImage?: MediaLike;
  heroImageUrl?: string | null;
  storyTitle?: string | null;
  storyParagraphs?: Paragraph[] | null;
  storyImage?: MediaLike;
  storyImageUrl?: string | null;
  valuesEyebrow?: string | null;
  valuesTitle?: string | null;
  valuesIntro?: string | null;
  values?: ValueItem[] | null;
  teamEnabled?: boolean | null;
  teamTitle?: string | null;
  teamSubtitle?: string | null;
  teamMembers?: TeamMember[] | null;
  extraSections?: ExtraSection[] | null;
  ctaTitle?: string | null;
  ctaBody?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

type AboutPageViewProps = {
  data: AboutPageData;
  photoPlaceholder?: string;
};

function titleWithAccent(title: string, accent?: string | null) {
  if (!accent || !title.includes(accent)) {
    return <>{title}</>;
  }
  const [before, ...rest] = title.split(accent);
  return (
    <>
      {before}
      <span className="text-bronze">{accent}</span>
      {rest.join(accent)}
    </>
  );
}

export function AboutPageView({
  data,
  photoPlaceholder = "Foto em breve",
}: AboutPageViewProps) {
  const heroImage = resolveMediaUrl(data.heroImage, data.heroImageUrl);
  const storyImage = resolveMediaUrl(data.storyImage, data.storyImageUrl);
  const paragraphs = (data.storyParagraphs || []).filter((item) => item.text);
  const values = (data.values || []).filter((item) => item.title && item.body);
  const members = (data.teamMembers || []).filter((item) => item.name);
  const extras = (data.extraSections || []).filter(
    (item) => item.title && item.body,
  );
  const ctaHref = data.ctaHref || "/#contacto";

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-charcoal text-cream">
        {heroImage ? (
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            className="object-cover opacity-35"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/88 to-charcoal/55" />
        <div className="relative mx-auto max-w-6xl px-6 py-[clamp(5rem,12vw,8.5rem)] sm:px-8">
          {data.heroEyebrow ? (
            <p className="nx-hero-rise mb-4 text-sm uppercase tracking-[0.14em] text-gold">
              {data.heroEyebrow}
            </p>
          ) : null}
          <h1 className="nx-hero-rise nx-hero-rise-delay-1 max-w-[16ch] font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] uppercase">
            {titleWithAccent(
              String(data.heroTitle || "Sobre nós"),
              data.heroTitleAccent,
            )}
          </h1>
          {data.heroLead ? (
            <p className="nx-hero-rise nx-hero-rise-delay-2 mt-6 max-w-[42ch] text-[17px] leading-relaxed text-cream/80">
              {data.heroLead}
            </p>
          ) : null}
        </div>
      </section>

      <section className="bg-cream px-6 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              title={String(data.storyTitle || "A nossa história")}
              className="mb-8"
            />
            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.id || index}
                  className="max-w-[54ch] text-[16.5px] leading-relaxed text-muted"
                >
                  {paragraph.text}
                </p>
              ))}
            </div>
          </div>
          {storyImage ? (
            <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:aspect-[3/4]">
              <Image
                src={storyImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          ) : null}
        </div>
      </section>

      {values.length > 0 ? (
        <section className="bg-sand px-6 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
          <div className="mx-auto max-w-6xl">
            {data.valuesEyebrow ? (
              <p className="mb-3 text-sm uppercase tracking-[0.12em] text-bronze">
                {data.valuesEyebrow}
              </p>
            ) : null}
            <SectionHeading
              title={String(data.valuesTitle || "O que nos define")}
              className="mb-5"
            />
            {data.valuesIntro ? (
              <p className="mb-10 max-w-[48ch] text-[16.5px] leading-relaxed text-muted">
                {data.valuesIntro}
              </p>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((item, index) => (
                <article
                  key={item.id || item.title || index}
                  className="border-t border-bronze/35 pt-5"
                >
                  <h3 className="font-display text-[1.15rem] uppercase tracking-[0.04em] text-charcoal">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {data.teamEnabled && members.length > 0 ? (
        <section className="bg-cream px-6 py-[clamp(4.5rem,8vw,8rem)] sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={String(data.teamTitle || "A nossa equipa")}
              className="mb-4"
            />
            {data.teamSubtitle ? (
              <p className="mb-10 max-w-[42ch] text-[16.5px] leading-relaxed text-muted">
                {data.teamSubtitle}
              </p>
            ) : null}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => {
                const photo = resolveMediaUrl(member.photo, member.photoUrl);
                return (
                  <article key={member.id || member.name || index}>
                    <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-sand">
                      {photo ? (
                        <Image
                          src={photo}
                          alt={member.name || ""}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full items-end p-4 text-sm text-muted">
                          {photoPlaceholder}
                        </div>
                      )}
                    </div>
                    <h3 className="font-display text-[1.1rem] uppercase tracking-[0.04em] text-charcoal">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm uppercase tracking-[0.08em] text-bronze">
                      {member.role}
                    </p>
                    {member.bio ? (
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        {member.bio}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {extras.map((section, index) => {
        const image = resolveMediaUrl(section.image, section.imageUrl);
        const reverse = index % 2 === 1;
        return (
          <section
            key={section.id || section.title || index}
            className={`${index % 2 === 0 ? "bg-cream" : "bg-sand"} px-6 py-[clamp(4rem,7vw,6.5rem)] sm:px-8`}
          >
            <div
              className={`mx-auto grid max-w-6xl gap-8 lg:items-center lg:gap-14 ${
                image
                  ? "lg:grid-cols-2"
                  : ""
              }`}
            >
              <div className={reverse && image ? "lg:order-2" : undefined}>
                <SectionHeading
                  title={String(section.title)}
                  className="mb-5"
                />
                <p className="max-w-[48ch] whitespace-pre-line text-[16.5px] leading-relaxed text-muted">
                  {section.body}
                </p>
              </div>
              {image ? (
                <div
                  className={`relative aspect-[16/11] overflow-hidden bg-charcoal/5 ${
                    reverse ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      <section className="bg-charcoal px-6 py-[clamp(4rem,7vw,6.5rem)] text-cream sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <SectionHeading
              title={String(data.ctaTitle || "Precisa de ajuda em casa?")}
              tone="dark"
              className="mb-4"
            />
            {data.ctaBody ? (
              <p className="max-w-[42ch] text-[16.5px] leading-relaxed text-cream/75">
                {data.ctaBody}
              </p>
            ) : null}
          </div>
          <Link
            href={ctaHref}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-gold px-7 text-[15px] font-medium text-charcoal transition-colors hover:bg-cream"
          >
            {data.ctaLabel || "Falar connosco"}
          </Link>
        </div>
      </section>
    </div>
  );
}
