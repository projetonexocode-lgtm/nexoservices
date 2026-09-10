import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Definições do site",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Geral",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  defaultValue: "Nexo Services",
                },
                {
                  name: "legalName",
                  type: "text",
                  required: true,
                  defaultValue:
                    "Nexo Services — Reparações e Serviços Especializados",
                },
              ],
            },
            {
              name: "tagline",
              type: "text",
            },
            {
              name: "url",
              type: "text",
              required: true,
              defaultValue: "https://nexoservices.pt",
            },
            {
              name: "announcement",
              type: "text",
              label: "Barra de anúncio (topo)",
              defaultValue: "Prioridade Lisboa e Margem Sul · nacional sob pedido",
            },
            {
              type: "row",
              fields: [
                {
                  name: "googleRating",
                  type: "text",
                  label: "Nota Google",
                  defaultValue: "5.0",
                },
                {
                  name: "googleReviewsUrl",
                  type: "text",
                  label: "Link das avaliações Google",
                },
              ],
            },
          ],
        },
        {
          label: "Contactos",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "phoneDisplay",
                  type: "text",
                  required: true,
                  defaultValue: "+351 214 062 942",
                },
                {
                  name: "phoneTel",
                  type: "text",
                  required: true,
                  defaultValue: "+351214062942",
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "whatsappDisplay",
                  type: "text",
                  required: true,
                  defaultValue: "+351 934 900 070",
                },
                {
                  name: "whatsappE164",
                  type: "text",
                  required: true,
                  defaultValue: "351934900070",
                  admin: { description: "Sem + — usado em wa.me" },
                },
              ],
            },
            {
              name: "contactEmail",
              type: "email",
              label: "E-mail público",
              defaultValue: "contacto@nexoservices.pt",
            },
            {
              name: "urgentWhatsappMessage",
              type: "textarea",
              defaultValue: "Olá! Preciso de assistência técnica urgente.",
            },
          ],
        },
        {
          label: "Footer",
          fields: [
            {
              name: "footerBlurb",
              type: "textarea",
              label: "Texto sob o logo",
              defaultValue:
                "Reparações ao domicílio com prioridade em Lisboa e Margem Sul. No resto do país, mediante disponibilidade.",
            },
            {
              type: "row",
              fields: [
                {
                  name: "instagramUrl",
                  type: "text",
                  label: "Instagram",
                },
                {
                  name: "facebookUrl",
                  type: "text",
                  label: "Facebook",
                },
                {
                  name: "linkedinUrl",
                  type: "text",
                  label: "LinkedIn",
                },
              ],
            },
            {
              name: "footerServices",
              type: "array",
              label: "Serviços (footer)",
              labels: { singular: "Serviço", plural: "Serviços" },
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "footerPartners",
              type: "array",
              label: "Parceiros",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "footerCertificates",
              type: "array",
              label: "Certificados",
              fields: [
                {
                  name: "label",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "alsoDoTitle",
              type: "text",
              label: "Título «Também fazemos»",
              defaultValue: "Também fazemos",
            },
            {
              name: "alsoDoText",
              type: "textarea",
              label: "Texto «Também fazemos»",
              defaultValue: "Obras, remodelações e reabilitação de imóveis.",
            },
            {
              type: "row",
              fields: [
                {
                  name: "alsoDoLabel",
                  type: "text",
                  label: "Label do botão",
                  defaultValue: "projetonexo.pt",
                },
                {
                  name: "projetoNexoUrl",
                  type: "text",
                  label: "URL do botão",
                  defaultValue: "https://projetonexo.pt",
                },
              ],
            },
            {
              name: "warrantyText",
              type: "text",
              label: "Texto da garantia (rodapé)",
              defaultValue: "Garantia até 3 anos, conforme o serviço.",
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seoTitle",
              type: "text",
              label: "SEO — título",
              defaultValue:
                "Nexo Services | Reparações Urgentes em Lisboa e Margem Sul",
              admin: {
                description:
                  "Ideal ~50–60 caracteres. Aparece no separador do browser e no Google.",
              },
            },
            {
              name: "seoDescription",
              type: "textarea",
              label: "SEO — descrição",
              defaultValue:
                "Avaria em casa? Canalização, eletricidade, desentupimentos e reparações ao domicílio em Lisboa, AML e Margem Sul. Orçamento antes de começar e garantia até 3 anos.",
              admin: {
                description:
                  "Ideal ~140–160 caracteres. Snippet sob o título nos resultados de pesquisa.",
              },
            },
          ],
        },
      ],
    },
  ],
};
