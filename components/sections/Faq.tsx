import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/faq";

export function Faq() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 bg-sand px-6 py-[clamp(4.5rem,8vw,8.1rem)] sm:px-8"
    >
      <div className="mx-auto max-w-[900px]">
        <SectionHeading title="O que precisa de saber" className="mb-10" />
        <div className="divide-y divide-bronze/40 border-y border-bronze/50">
          {FAQS.map((item) => (
            <details key={item.question} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-6 font-display text-[1.19rem] text-charcoal marker:hidden [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  className="shrink-0 text-[22px] text-bronze transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
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
  );
}
