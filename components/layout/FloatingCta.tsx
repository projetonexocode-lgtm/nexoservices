import { buildWhatsAppUrl, SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-px border-t border-bronze/40 bg-cream shadow-[0_-8px_24px_rgba(26,24,21,0.16)] lg:hidden">
      <a
        href={`tel:${SITE.phoneTel}`}
        aria-label={`Ligar para ${SITE.phoneDisplay}`}
        className="flex min-h-14 min-w-0 flex-1 basis-0 items-center justify-center bg-charcoal px-3 text-base text-cream transition-colors hover:bg-bronze"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        Ligar
      </a>
      <a
        href={buildWhatsAppUrl(URGENT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir WhatsApp ${SITE.whatsappDisplay} com mensagem pronta`}
        className="flex min-h-14 min-w-0 flex-1 basis-0 items-center justify-center gap-2 bg-sand px-3 text-base text-charcoal transition-colors hover:bg-gold"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <WhatsAppIcon size={18} />
        WhatsApp
      </a>
    </div>
  );
}
