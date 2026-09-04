import { SectionHeading } from "@/components/ui/SectionHeading";
import { COVERAGE_GROUPS, COVERAGE_INTRO } from "@/lib/coverage";

export function Coverage() {
  return (
    <section
      id="cobertura"
      className="scroll-mt-28 bg-cream px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Atendimento imediato na Grande Lisboa e Margem Sul."
          className="max-w-[24ch]"
        />
        <p className="mt-5 mb-10 max-w-[56ch] text-[16.5px] leading-relaxed text-muted">
          {COVERAGE_INTRO}
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {COVERAGE_GROUPS.map((group) => (
            <details
              key={group.id}
              className="rounded-xl border border-bronze/40 bg-sand px-5 py-2"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 marker:hidden [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block font-display text-lg text-charcoal">
                    {group.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {group.cities.slice(0, 3).join(", ")} e mais{" "}
                    {group.cities.length - 3}
                  </span>
                </span>
                <span className="shrink-0 text-bronze" aria-hidden>
                  +
                </span>
              </summary>
              <ul className="flex flex-wrap gap-2 pb-4">
                {group.cities.map((city) => (
                  <li
                    key={city}
                    className="rounded-xl bg-cream px-3 py-1.5 text-sm text-charcoal"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
