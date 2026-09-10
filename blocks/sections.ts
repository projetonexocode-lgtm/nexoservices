import type { Block } from "payload";

const navFields = [
  {
    name: "navLabel",
    type: "text" as const,
    required: true,
    label: "Label no menu",
  },
  {
    name: "showInNav",
    type: "checkbox" as const,
    defaultValue: true,
    label: "Mostrar no menu do header",
  },
];

export const AboutBlock: Block = {
  slug: "about",
  labels: { singular: "Sobre", plural: "Sobre" },
  fields: [
    ...navFields,
    {
      name: "brandName",
      type: "text",
      required: true,
      label: "Linha de destaque (hero)",
      admin: {
        description:
          "Ex.: Técnicos Especializados | Qualidade no Serviço | Orçamentos Atrativos",
      },
    },
    {
      name: "headline",
      type: "text",
      required: true,
      label: "Título principal",
    },
    {
      name: "headlineAccent",
      type: "text",
      label: "Parte destacada do título",
    },
    {
      name: "supportText",
      type: "textarea",
      required: true,
      label: "Texto de apoio",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Imagem do hero (única)",
    },
    {
      name: "heroImageFallback",
      type: "text",
      label: "Caminho público da imagem (fallback)",
      admin: {
        description: "Ex.: /nexo-services/canalizacao.jpg se ainda não houver upload.",
      },
    },
    {
      name: "heroSlides",
      type: "array",
      label: "Carrossel do hero",
      maxRows: 6,
      admin: {
        description:
          "Se tiver 2+ imagens, o fundo do hero faz carrossel. Senão usa a imagem única acima.",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Caminho público (fallback)",
        },
        {
          name: "alt",
          type: "text",
        },
      ],
    },
    {
      name: "callLabel",
      type: "text",
      defaultValue: "Ligar",
    },
    {
      name: "whatsappLabel",
      type: "text",
      defaultValue: "WhatsApp",
    },
    {
      name: "trustIntro",
      type: "textarea",
      label: "Introdução da faixa de confiança",
    },
    {
      name: "facts",
      type: "array",
      label: "Factos confirmados",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "differentialsTitle",
      type: "textarea",
      label: "Título dos diferenciais",
      admin: {
        description:
          "Uma frase por linha. A primeira linha fica em charcoal; as seguintes em bronze.",
      },
    },
    {
      name: "differentials",
      type: "array",
      label: "Diferenciais",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
    {
      name: "stepsTitle",
      type: "text",
      label: "Título do processo",
    },
    {
      name: "stepsTitleHighlight",
      type: "text",
      label: "Destaque no título do processo",
    },
    {
      name: "stepsImages",
      type: "array",
      label: "Cards de serviços ao lado do título",
      maxRows: 2,
      admin: {
        description: "Máximo 2 cards (imagem + etiqueta).",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Caminho público (fallback)",
        },
        {
          name: "label",
          type: "text",
          required: true,
          label: "Etiqueta no card",
        },
        {
          name: "alt",
          type: "text",
        },
      ],
    },
    {
      name: "steps",
      type: "array",
      label: "Passos",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};

export const ServicesBlock: Block = {
  slug: "services",
  labels: { singular: "Serviços", plural: "Serviços" },
  fields: [
    ...navFields,
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "titleHighlight",
      type: "text",
    },
    {
      name: "intro",
      type: "textarea",
    },
    {
      name: "urgentLabel",
      type: "text",
      defaultValue: "Não sei o que é — WhatsApp urgente",
    },
    {
      name: "urgentWhatsappMessage",
      type: "textarea",
      defaultValue: "Olá! Preciso de assistência técnica urgente.",
    },
    {
      name: "primaryServices",
      type: "array",
      label: "Urgências em destaque (máx. 4 recomendado)",
      fields: [
        { name: "slug", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "whatsappMessage", type: "textarea", required: true },
        { name: "imageUrl", type: "text", label: "URL / caminho da imagem" },
        { name: "imageAlt", type: "text" },
      ],
    },
    {
      name: "groups",
      type: "array",
      label: "Grupos (ver todos)",
      fields: [
        { name: "id", type: "text", required: true },
        { name: "title", type: "text", required: true },
        {
          name: "items",
          type: "array",
          fields: [
            { name: "slug", type: "text", required: true },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "whatsappMessage", type: "textarea", required: true },
            { name: "imageUrl", type: "text" },
            { name: "imageAlt", type: "text" },
          ],
        },
      ],
    },
  ],
};

export const GalleryBlock: Block = {
  slug: "gallery",
  labels: { singular: "Galeria", plural: "Galeria" },
  fields: [
    ...navFields,
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "intro",
      type: "textarea",
    },
    {
      name: "items",
      type: "array",
      label: "Fotos",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Caminho público (fallback)",
        },
        {
          name: "caption",
          type: "text",
          required: true,
        },
        {
          name: "alt",
          type: "text",
        },
      ],
    },
  ],
};

export const ContactBlock: Block = {
  slug: "contact",
  labels: { singular: "Contacto", plural: "Contacto" },
  fields: [
    ...navFields,
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "titleAccent",
      type: "text",
    },
    {
      name: "supportText",
      type: "textarea",
    },
    {
      name: "coverageTitle",
      type: "text",
      label: "Título da cobertura",
    },
    {
      name: "coverageIntro",
      type: "textarea",
    },
    {
      name: "coverageGroups",
      type: "array",
      fields: [
        { name: "id", type: "text", required: true },
        { name: "title", type: "text", required: true },
        {
          name: "cities",
          type: "array",
          fields: [{ name: "name", type: "text", required: true }],
        },
      ],
    },
    {
      name: "faqTitle",
      type: "text",
    },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
        {
          name: "placeholder",
          type: "checkbox",
          defaultValue: false,
          label: "Marcar como ainda a confirmar",
        },
      ],
    },
  ],
};
