import type { Field } from "payload";
import { defaultUiCopy } from "@/lib/cms/uiCopy";

function textField(
  name: keyof typeof defaultUiCopy,
  label: string,
  opts?: { textarea?: boolean; description?: string },
): Field {
  const value = defaultUiCopy[name];
  if (name === "formServiceOptions") {
    return {
      name,
      type: "array",
      label,
      labels: { singular: "Opção", plural: "Opções" },
      admin: opts?.description ? { description: opts.description } : undefined,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
      defaultValue: (value as string[]).map((labelText) => ({
        label: labelText,
      })),
    };
  }

  if (opts?.textarea) {
    return {
      name,
      type: "textarea",
      label,
      defaultValue: typeof value === "string" ? value : undefined,
      admin: opts.description ? { description: opts.description } : undefined,
    };
  }

  return {
    name,
    type: "text",
    label,
    defaultValue: typeof value === "string" ? value : undefined,
    admin: opts?.description ? { description: opts.description } : undefined,
  };
}

/** Payload fields for site-settings → Interface tab. */
export const uiCopyFields: Field[] = [
  {
    type: "collapsible",
    label: "Header e navegação",
    fields: [
      textField("headerCallLabel", "Botão Ligar (header)"),
      textField("googleReviewsLabel", "Label do badge Google"),
      textField("skipToContentLabel", "Saltar para o conteúdo"),
      textField("navAriaLabel", "Aria do menu"),
      textField("openMenuLabel", "Abrir menu"),
      textField("closeMenuLabel", "Fechar menu"),
      textField("homeAriaLabel", "Sufixo aria do logo (início)"),
      textField("floatingWhatsappAria", "Aria do botão flutuante WhatsApp"),
    ],
  },
  {
    type: "collapsible",
    label: "Footer",
    fields: [
      textField("footerContactsTitle", "Título coluna Contactos"),
      textField("footerServicesTitle", "Título coluna Serviços"),
      textField("footerPartnersTitle", "Título coluna Parceiros"),
      textField("footerCertificatesTitle", "Título coluna Certificados"),
      textField("footerCopyrightSuffix", "Texto após © ano empresa"),
      textField("footerWhatsappPrefix", "Prefixo WhatsApp no footer"),
      textField("socialInstagramLabel", "Aria Instagram"),
      textField("socialFacebookLabel", "Aria Facebook"),
      textField("socialLinkedinLabel", "Aria LinkedIn"),
      textField("alsoDoOpenAria", "Sufixo aria logo Projeto Nexo"),
    ],
  },
  {
    type: "collapsible",
    label: "Serviços / Cobertura / FAQ",
    fields: [
      textField("servicesWhatsappLabel", "Label WhatsApp nas linhas"),
      textField("servicesSendLabel", "Label Enviar (urgência)"),
      textField("servicesShowAllLabel", "Ver todos os serviços"),
      textField("coverageMorePrefix", "Prefixo «e mais N» nas cidades"),
      textField("faqPartialNote", "Nota FAQ parcial"),
      textField("aboutPhotoPlaceholder", "Placeholder foto equipa"),
    ],
  },
  {
    type: "collapsible",
    label: "Formulário de contacto",
    fields: [
      textField("formNameLabel", "Label Nome"),
      textField("formNamePlaceholder", "Placeholder Nome"),
      textField("formPhoneLabel", "Label Telefone"),
      textField("formPhonePlaceholder", "Placeholder Telefone"),
      textField("formEmailLabel", "Label E-mail"),
      textField("formEmailPlaceholder", "Placeholder E-mail"),
      textField("formServiceLabel", "Label Serviço"),
      textField("formMessageLabel", "Label mensagem"),
      textField("formMessagePlaceholder", "Placeholder mensagem", {
        textarea: true,
      }),
      textField("formHoneypotLabel", "Label honeypot (oculto)"),
      textField("formSubmitLabel", "Botão submeter"),
      textField("formSubmittingLabel", "Botão a enviar"),
      textField("formWhatsappLabel", "Botão WhatsApp do form"),
      textField("formHint", "Texto de ajuda sob o form", { textarea: true }),
      textField("formUnknownService", "Opção serviço desconhecido"),
      textField("formOtherService", "Opção outro serviço"),
      textField("formDefaultMessage", "Mensagem default no WhatsApp do form"),
      textField("formSendingFeedback", "Feedback a enviar"),
      textField("formSuccessFallback", "Feedback sucesso (fallback)"),
      textField("formErrorFallback", "Feedback erro (fallback)"),
      textField("formNetworkError", "Feedback erro de rede"),
      textField("formWhatsappIntro", "Intro da mensagem WhatsApp do form"),
      textField("formServiceOptions", "Opções do select Serviço", {
        description: "Ordem do dropdown no formulário de contacto.",
      }),
    ],
  },
  {
    type: "collapsible",
    label: "Mensagens de erro / API",
    fields: [
      textField("errorIncomplete", "Pedido incompleto", { textarea: true }),
      textField("errorHoneypot", "Honeypot / spam", { textarea: true }),
      textField("errorName", "Nome inválido", { textarea: true }),
      textField("errorPhone", "Telefone inválido", { textarea: true }),
      textField("errorEmail", "E-mail inválido", { textarea: true }),
      textField("errorMessage", "Mensagem curta demais", { textarea: true }),
      textField("errorRateLimited", "Rate limit", { textarea: true }),
      textField("errorUnconfigured", "Resend não configurado", {
        textarea: true,
      }),
      textField("errorUpstream", "Falha no envio de email", { textarea: true }),
      textField("errorNetwork", "Falha de rede API", { textarea: true }),
      textField("successReceived", "Sucesso API", { textarea: true }),
    ],
  },
  {
    type: "collapsible",
    label: "SEO extra",
    fields: [
      textField("seoKeywords", "Keywords (separadas por vírgula)", {
        textarea: true,
      }),
      textField("seoOgImageAlt", "Alt da imagem Open Graph"),
    ],
  },
];
