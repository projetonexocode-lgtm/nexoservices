import { SectionHeading } from "@/components/ui/SectionHeading";
import { STEPS } from "@/lib/content";

export function HowItWorks() {
  return (
    <section
      id="processo"
      className="scroll-mt-28 bg-cream px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Do contacto à reparação, em três passos."
          highlight="contacto"
          className="mb-12 max-w-[20ch]"
        />
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,290px),1fr))] gap-8">
          {STEPS.map((step) => (
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
  );
}
