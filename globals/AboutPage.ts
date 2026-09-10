import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "Página Sobre",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "heroEyebrow",
              type: "text",
              label: "Linha pequena (acima do título)",
              defaultValue: "Sobre nós",
            },
            {
              name: "heroTitle",
              type: "text",
              required: true,
              label: "Título",
              defaultValue: "Técnicos de confiança ao domicílio",
            },
            {
              name: "heroTitleAccent",
              type: "text",
              label: "Parte destacada do título",
            },
            {
              name: "heroLead",
              type: "textarea",
              required: true,
              label: "Texto de apoio",
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Imagem de fundo / lateral",
            },
            {
              name: "heroImageUrl",
              type: "text",
              label: "Caminho público da imagem (fallback)",
              defaultValue: "/nexo-services/canalizacao.jpg",
            },
          ],
        },
        {
          label: "História",
          fields: [
            {
              name: "storyTitle",
              type: "text",
              label: "Título da história",
              defaultValue: "A nossa história",
            },
            {
              name: "storyParagraphs",
              type: "array",
              label: "Parágrafos",
              labels: { singular: "Parágrafo", plural: "Parágrafos" },
              fields: [
                {
                  name: "text",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "storyImage",
              type: "upload",
              relationTo: "media",
              label: "Imagem ao lado da história",
            },
            {
              name: "storyImageUrl",
              type: "text",
              label: "Caminho público (fallback)",
            },
          ],
        },
        {
          label: "Valores",
          fields: [
            {
              name: "valuesEyebrow",
              type: "text",
              label: "Linha pequena",
              defaultValue: "Como trabalhamos",
            },
            {
              name: "valuesTitle",
              type: "text",
              label: "Título",
              defaultValue: "O que nos define",
            },
            {
              name: "valuesIntro",
              type: "textarea",
              label: "Introdução",
            },
            {
              name: "values",
              type: "array",
              label: "Valores / pilares",
              labels: { singular: "Valor", plural: "Valores" },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Equipa",
          fields: [
            {
              name: "teamEnabled",
              type: "checkbox",
              label: "Mostrar secção de equipa",
              defaultValue: false,
            },
            {
              name: "teamTitle",
              type: "text",
              label: "Título",
              defaultValue: "A nossa equipa",
            },
            {
              name: "teamSubtitle",
              type: "text",
              label: "Subtítulo",
            },
            {
              name: "teamMembers",
              type: "array",
              label: "Membros",
              labels: { singular: "Membro", plural: "Membros" },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "role", type: "text", required: true, label: "Cargo" },
                { name: "bio", type: "textarea", label: "Biografia" },
                {
                  name: "photo",
                  type: "upload",
                  relationTo: "media",
                  label: "Foto",
                },
                {
                  name: "photoUrl",
                  type: "text",
                  label: "Caminho público (fallback)",
                },
              ],
            },
          ],
        },
        {
          label: "Secções extra",
          fields: [
            {
              name: "extraSections",
              type: "array",
              label: "Secções adicionais",
              labels: { singular: "Secção", plural: "Secções" },
              admin: {
                description:
                  "Use para qualquer informação da empresa: missão, garantia, cobertura, certificados, etc.",
              },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true },
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
              ],
            },
          ],
        },
        {
          label: "CTA final",
          fields: [
            {
              name: "ctaTitle",
              type: "text",
              label: "Título",
              defaultValue: "Precisa de ajuda em casa?",
            },
            {
              name: "ctaBody",
              type: "textarea",
              label: "Texto",
            },
            {
              name: "ctaLabel",
              type: "text",
              label: "Texto do botão",
              defaultValue: "Falar connosco",
            },
            {
              name: "ctaHref",
              type: "text",
              label: "Link do botão",
              defaultValue: "/#contacto",
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
              defaultValue: "Sobre nós | Nexo Services",
            },
            {
              name: "seoDescription",
              type: "textarea",
              label: "SEO — descrição",
            },
          ],
        },
      ],
    },
  ],
};
