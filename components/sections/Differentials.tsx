import { SectionHeading } from "@/components/ui/SectionHeading";
import { DIFFERENTIALS } from "@/lib/content";

export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="scroll-mt-28 bg-sand px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Sem surpresas na fatura."
          className="mb-10 max-w-[20ch]"
        />
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-8">
          {DIFFERENTIALS.map((item) => (
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
  );
}
