/** All chrome / microcopy editable via Payload site-settings → Interface. */

export type UiCopy = {
  // Header / chrome
  headerCallLabel: string;
  googleReviewsLabel: string;
  skipToContentLabel: string;
  navAriaLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  homeAriaLabel: string;
  floatingWhatsappAria: string;

  // Footer
  footerContactsTitle: string;
  footerServicesTitle: string;
  footerPartnersTitle: string;
  footerCertificatesTitle: string;
  footerCopyrightSuffix: string;
  footerWhatsappPrefix: string;
  socialInstagramLabel: string;
  socialFacebookLabel: string;
  socialLinkedinLabel: string;
  alsoDoOpenAria: string;

  // Services section chrome
  servicesWhatsappLabel: string;
  servicesSendLabel: string;
  servicesShowAllLabel: string;

  // Coverage / FAQ chrome
  coverageMorePrefix: string;
  faqPartialNote: string;

  // About
  aboutPhotoPlaceholder: string;

  // Contact form
  formNameLabel: string;
  formNamePlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formServiceLabel: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formHoneypotLabel: string;
  formSubmitLabel: string;
  formSubmittingLabel: string;
  formWhatsappLabel: string;
  formHint: string;
  formUnknownService: string;
  formOtherService: string;
  formDefaultMessage: string;
  formSendingFeedback: string;
  formSuccessFallback: string;
  formErrorFallback: string;
  formNetworkError: string;
  formWhatsappIntro: string;

  // Contact validation / API messages
  errorIncomplete: string;
  errorHoneypot: string;
  errorName: string;
  errorPhone: string;
  errorEmail: string;
  errorMessage: string;
  errorRateLimited: string;
  errorUnconfigured: string;
  errorUpstream: string;
  errorNetwork: string;
  successReceived: string;

  // SEO extras
  seoKeywords: string;
  seoOgImageAlt: string;

  // Form service options (one per line in CMS textarea, or array)
  formServiceOptions: string[];
};

export const defaultUiCopy: UiCopy = {
  headerCallLabel: "Ligar",
  googleReviewsLabel: "Avaliações no Google",
  skipToContentLabel: "Saltar para o conteúdo",
  navAriaLabel: "Secções",
  openMenuLabel: "Abrir menu",
  closeMenuLabel: "Fechar menu",
  homeAriaLabel: "início",
  floatingWhatsappAria: "Abrir WhatsApp",

  footerContactsTitle: "Contactos",
  footerServicesTitle: "Serviços",
  footerPartnersTitle: "Parceiros",
  footerCertificatesTitle: "Certificado",
  footerCopyrightSuffix: "Todos os direitos reservados.",
  footerWhatsappPrefix: "WhatsApp ·",
  socialInstagramLabel: "Instagram",
  socialFacebookLabel: "Facebook",
  socialLinkedinLabel: "LinkedIn",
  alsoDoOpenAria: "abrir site",

  servicesWhatsappLabel: "WhatsApp",
  servicesSendLabel: "Enviar",
  servicesShowAllLabel: "Ver todos os serviços",

  coverageMorePrefix: "e mais",
  faqPartialNote: "Resposta parcial — detalhe ainda a confirmar.",

  aboutPhotoPlaceholder: "Foto em breve",

  formNameLabel: "Nome",
  formNamePlaceholder: "O seu nome",
  formPhoneLabel: "Telefone",
  formPhonePlaceholder: "+351 ___ ___ ___",
  formEmailLabel: "E-mail",
  formEmailPlaceholder: "nome@email.com",
  formServiceLabel: "Serviço",
  formMessageLabel: "O que precisa",
  formMessagePlaceholder: "Descreva a avaria e a localidade.",
  formHoneypotLabel: "Empresa",
  formSubmitLabel: "Falar com o Técnico",
  formSubmittingLabel: "A enviar…",
  formWhatsappLabel: "Enviar por WhatsApp",
  formHint:
    "Para urgência, envie no WhatsApp. Falar com o Técnico usa o número e e-mail que indicar.",
  formUnknownService: "Não sei / é urgente",
  formOtherService: "Outro serviço",
  formDefaultMessage: "Preciso de assistência técnica urgente.",
  formSendingFeedback: "A enviar o pedido…",
  formSuccessFallback: "Pedido recebido. Ligamos para o número que indicou.",
  formErrorFallback:
    "Não conseguimos enviar o pedido. Ligue ou use o WhatsApp.",
  formNetworkError:
    "A ligação falhou. Ligue ou use o WhatsApp para não perder o pedido.",
  formWhatsappIntro: "Olá! Preciso de assistência técnica.",

  errorIncomplete: "O pedido chegou incompleto. Tente outra vez.",
  errorHoneypot: "O pedido não pôde ser enviado.",
  errorName: "Indique o seu nome para sabermos a quem ligar.",
  errorPhone:
    "Indique um telefone válido, com o indicativo se estiver fora de Portugal.",
  errorEmail: "Indique um e-mail válido para podermos responder-lhe.",
  errorMessage:
    "Descreva a avaria e a localidade, mesmo que seja em duas frases.",
  errorRateLimited:
    "Já recebemos vários pedidos deste aparelho. Ligue ou use o WhatsApp para urgências.",
  errorUnconfigured:
    "Ainda não recebemos pedidos por aqui. Ligue ou envie a mesma informação pelo WhatsApp.",
  errorUpstream:
    "Não conseguimos enviar o pedido agora. Ligue ou use o WhatsApp — a mensagem já está pronta.",
  errorNetwork:
    "A ligação falhou. Ligue ou use o WhatsApp para não perder o pedido.",
  successReceived: "Pedido recebido. Ligamos para o número que indicou.",

  seoKeywords:
    "reparações urgentes Lisboa, canalização Lisboa, eletricista Lisboa, desentupimentos Lisboa, reparações ao domicílio, técnico urgente Margem Sul, área metropolitana de Lisboa, Nexo Services",
  seoOgImageAlt:
    "Técnico Nexo Services em reparação de canalização ao domicílio",

  formServiceOptions: [
    "Não sei / é urgente",
    "Canalização",
    "Eletricidade",
    "Desentupimentos",
    "Esquentadores e Caldeiras",
    "Outro serviço",
  ],
};

export type ContactErrorCode =
  | "incomplete"
  | "honeypot"
  | "name"
  | "phone"
  | "email"
  | "message";

export function contactErrorMessage(
  code: ContactErrorCode,
  copy: Pick<
    UiCopy,
    | "errorIncomplete"
    | "errorHoneypot"
    | "errorName"
    | "errorPhone"
    | "errorEmail"
    | "errorMessage"
  >,
): string {
  switch (code) {
    case "incomplete":
      return copy.errorIncomplete;
    case "honeypot":
      return copy.errorHoneypot;
    case "name":
      return copy.errorName;
    case "phone":
      return copy.errorPhone;
    case "email":
      return copy.errorEmail;
    case "message":
      return copy.errorMessage;
  }
}

export function pickUiCopy(settings: Record<string, unknown>): UiCopy {
  const out = { ...defaultUiCopy };
  for (const key of Object.keys(defaultUiCopy) as Array<keyof UiCopy>) {
    const value = settings[key];
    if (key === "formServiceOptions") {
      if (Array.isArray(value) && value.length > 0) {
        const labels = value
          .map((row) => {
            if (typeof row === "string") return row.trim();
            if (row && typeof row === "object" && "label" in row) {
              return String((row as { label?: string }).label || "").trim();
            }
            return "";
          })
          .filter(Boolean);
        if (labels.length) out.formServiceOptions = labels;
      } else if (typeof value === "string" && value.trim()) {
        out.formServiceOptions = value
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
      }
      continue;
    }
    if (typeof value === "string" && value.trim()) {
      out[key] = value.trim() as never;
    }
  }
  return out;
}
