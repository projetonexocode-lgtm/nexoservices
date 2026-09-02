import { CallButton } from "@/components/ui/CallButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { URGENT_WHATSAPP_MESSAGE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-14 lg:pt-16">
        <p className="inline-flex items-center gap-2 rounded-full border border-gold/70 bg-sand px-3 py-1.5 font-display text-[0.65rem] tracking-[0.16em] text-gold sm:tracking-[0.2em]">
          <span className="size-1.5 shrink-0 bg-gold" aria-hidden />
          Resposta rápida · Lisboa
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-[2.15rem] leading-[1.12] text-charcoal sm:text-5xl lg:text-[3.35rem]">
          Avaria em casa?{" "}
          <span className="text-gold">Resolvemos hoje.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
          Canalização, eletricidade, desentupimentos, esquentadores e mais de
          uma dezena de especialidades ao domicílio. Base em Lisboa, com
          atendimento imediato na Área Metropolitana e Margem Sul — cobertura
          nacional mediante disponibilidade.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CallButton className="w-full min-h-14 text-base sm:w-auto sm:min-w-[220px]">
            Ligar agora
          </CallButton>
          <WhatsAppButton
            message={URGENT_WHATSAPP_MESSAGE}
            className="w-full min-h-14 text-base sm:w-auto sm:min-w-[220px]"
          >
            Falar por WhatsApp
          </WhatsAppButton>
        </div>
        <p className="mt-4 text-sm text-charcoal/60">
          Telefone e WhatsApp com mensagem pronta — diga a avaria e a
          localidade.
        </p>
      </div>
    </section>
  );
}
