import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type GalleryItem = {
  imageUrl?: string | null;
  caption: string;
  alt?: string | null;
};

type GalleryProps = {
  id?: string;
  title: string;
  intro?: string | null;
  items: GalleryItem[];
};

export function Gallery({
  id = "galeria",
  title,
  intro,
  items,
}: GalleryProps) {
  const visible = items.filter((item) => item.imageUrl).slice(0, 6);

  return (
    <section
      id={id}
      className="scroll-mt-28 bg-cream px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 border-b border-bronze/25 pb-8 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionHeading
            title={title}
            tone="accent"
            className="max-w-[16ch]"
          />
          {intro ? (
            <p className="max-w-[38ch] text-[16px] leading-relaxed text-muted lg:pb-1 lg:text-right">
              {intro}
            </p>
          ) : null}
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {visible.map((item) => {
            const src = item.imageUrl!;
            return (
              <li key={`${src}-${item.caption}`}>
                <figure className="group overflow-hidden bg-charcoal">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={src}
                      alt={item.alt || item.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="flex min-h-11 items-center justify-center px-3 py-2.5 text-center font-display text-[12px] uppercase tracking-[0.08em] text-cream sm:min-h-12 sm:text-[13px]">
                    {item.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
