import { CONFIRMED_FACTS } from "@/lib/content";

export function Stats() {
  return (
    <section className="bg-charcoal px-6 py-8 text-cream sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 max-w-[48ch] text-[15px] leading-relaxed text-cream/75">
          Coordenamos técnicos parceiros. Orçamento antes de começar, garantia
          escrita e fatura com NIF.
        </p>
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-10 sm:gap-y-2">
          {CONFIRMED_FACTS.map((fact) => (
            <li key={fact} className="text-[17px] leading-snug text-gold">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
