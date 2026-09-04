import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FOOTER_SERVICES } from "@/lib/services";
import { buildWhatsAppUrl, SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-charcoal px-6 pt-[clamp(3.25rem,6vw,5.25rem)] pb-[calc(1.5rem+4.5rem)] text-cream/80 lg:pb-8">
      <div className="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-10 border-b border-gold/25 pb-10">
        <div>
          <Logo tone="dark" className="mb-4" />
          <p className="max-w-[34ch] text-[15px] leading-relaxed">
            Reparações ao domicílio com prioridade em Lisboa e Margem Sul.
            No resto do país, mediante disponibilidade.
          </p>
        </div>

        <div>
          <p className="mb-3.5 text-sm text-gold">Contactos</p>
          <div className="flex flex-col gap-2.5 text-[15px]">
            <a href={`tel:${SITE.phoneTel}`} className="text-cream hover:text-gold">
              Telefone · {SITE.phoneDisplay}
            </a>
            <a
              href={buildWhatsAppUrl(URGENT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream hover:text-gold"
            >
              WhatsApp · {SITE.whatsappDisplay}
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3.5 text-sm text-gold">Serviços principais</p>
          <div className="flex flex-col gap-2.5 text-[15px]">
            {FOOTER_SERVICES.map((service) => (
              <Link key={service} href="/#servicos" className="text-cream hover:text-gold">
                {service}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3.5 text-sm text-gold">Também fazemos</p>
          <p className="mb-3.5 max-w-[30ch] text-[15px] leading-relaxed">
            Obras, remodelações e reabilitação de imóveis.
          </p>
          <a
            href={SITE.projetoNexoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-xl border border-gold/55 px-4 text-[15px] text-gold transition-colors hover:bg-gold/15"
          >
            projetonexo.pt
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 pt-5 text-sm text-cream/70">
        <span>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</span>
        <span>Garantias de 6 meses a 2 anos, conforme o serviço.</span>
      </div>
    </footer>
  );
}
