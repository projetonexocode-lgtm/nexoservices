export const SITE = {
  name: "Nexo Services",
  legalName: "Nexo Services — Reparações e Serviços Especializados",
  tagline: "Reparações e serviços especializados ao domicílio",
  url: "https://nexoservices.pt",
  locale: "pt_PT",
  language: "pt-PT",
  city: "Lisboa",
  region: "Lisboa e Área Metropolitana",
  country: "Portugal",
  whatsappE164: "351934900070",
  whatsappDisplay: "+351 934 900 070",
  phoneDisplay: "+351 214 062 942",
  phoneTel: "+351214062942",
  contactEmail: "contacto@nexoservices.pt",
  projetoNexoUrl: "https://projetonexo.pt",
} as const;

export const URGENT_WHATSAPP_MESSAGE =
  "Olá! Preciso de assistência técnica urgente.";

export function buildWhatsAppUrl(
  message: string,
  e164: string = SITE.whatsappE164,
): string {
  return `https://wa.me/${e164}?text=${encodeURIComponent(message)}`;
}

export const NAV_ITEMS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#processo", label: "Como funciona" },
  { href: "/#cobertura", label: "Cobertura" },
  { href: "/#faq", label: "FAQ" },
] as const;
