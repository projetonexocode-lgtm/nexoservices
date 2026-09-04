import Image from "next/image";
import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[min(100svh,52rem)] overflow-hidden bg-charcoal text-cream"
    >
      <Image
        src="/nexo-services/canalizacao.jpg"
        alt="Técnico Nexo Services a reparar uma canalização no domicílio"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%] opacity-55"
      />
          <div
            className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/88 to-charcoal/35"
            aria-hidden
          />

      <div className="relative mx-auto flex min-h-[min(100svh,52rem)] max-w-6xl flex-col justify-center px-6 pb-28 pt-16 sm:px-8 sm:pt-20 lg:pb-20">
        <p className="nx-hero-rise font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-none tracking-[0.02em] text-gold">
          {SITE.name}
        </p>
        <h1 className="nx-hero-rise nx-hero-rise-delay-1 mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.025em] text-balance">
          Avaria em casa?{" "}
          <span className="text-gold">Fale connosco agora.</span>
        </h1>
        <p className="nx-hero-rise nx-hero-rise-delay-2 mt-5 max-w-[42ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-cream/85">
          Prioridade em Lisboa e Margem Sul. Canalização, eletricidade,
          desentupimentos e mais — com o orçamento explicado antes de começar.
        </p>
        <div className="nx-hero-rise nx-hero-rise-delay-3 mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
          <CallButton tone="dark" className="w-full px-8 py-5 text-[1.03rem] sm:w-auto">
            Ligar · {SITE.phoneDisplay}
          </CallButton>
          <WhatsAppButton
            tone="dark"
            message={URGENT_WHATSAPP_MESSAGE}
            className="w-full px-7 py-5 text-[1.03rem] sm:w-auto"
          >
            WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
