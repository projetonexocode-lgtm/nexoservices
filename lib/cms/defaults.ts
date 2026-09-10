import { CONFIRMED_FACTS, DIFFERENTIALS, STEPS } from "@/lib/content";
import { COVERAGE_GROUPS, COVERAGE_INTRO } from "@/lib/coverage";
import { FAQS } from "@/lib/faq";
import {
  FOOTER_CERTIFICATES,
  FOOTER_PARTNERS,
  FOOTER_SERVICES,
  PRIMARY_SERVICE_SLUGS,
  SERVICE_GROUPS,
  SERVICES,
  getService,
  servicesInGroup,
} from "@/lib/services";
import { SEO } from "@/lib/seo";
import { SITE, URGENT_WHATSAPP_MESSAGE } from "@/lib/site";

function serviceFields(service: NonNullable<ReturnType<typeof getService>>) {
  return {
    slug: service.slug,
    title: service.title,
    description: service.description,
    whatsappMessage: service.whatsappMessage,
    imageUrl: service.image ?? "",
    imageAlt: service.imageAlt ?? "",
  };
}

export const defaultSiteSettings = {
  name: SITE.name,
  legalName: SITE.legalName,
  tagline: SITE.tagline,
  url: SITE.url,
  announcement: "Prioridade Lisboa e Margem Sul · nacional sob pedido",
  phoneDisplay: SITE.phoneDisplay,
  phoneTel: SITE.phoneTel,
  whatsappDisplay: SITE.whatsappDisplay,
  whatsappE164: SITE.whatsappE164,
  contactEmail: SITE.contactEmail,
  urgentWhatsappMessage: URGENT_WHATSAPP_MESSAGE,
  projetoNexoUrl: SITE.projetoNexoUrl,
  seoTitle: SEO.title,
  seoDescription: SEO.description,
  googleRating: "5.0",
  googleReviewsUrl: "",
  footerBlurb:
    "Reparações ao domicílio com prioridade em Lisboa e Margem Sul. No resto do país, mediante disponibilidade.",
  instagramUrl: SITE.social.instagram,
  facebookUrl: SITE.social.facebook,
  linkedinUrl: SITE.social.linkedin,
  footerServices: FOOTER_SERVICES.map((label) => ({ label })),
  footerPartners: FOOTER_PARTNERS.map((label) => ({ label })),
  footerCertificates: FOOTER_CERTIFICATES.map((label) => ({ label })),
  alsoDoTitle: "Também fazemos",
  alsoDoText: "Obras, remodelações e reabilitação de imóveis.",
  alsoDoLabel: "projetonexo.pt",
  warrantyText: "Garantia até 3 anos, conforme o serviço.",
};

export const defaultHomepageSections = [
  {
    blockType: "about" as const,
    navLabel: "Sobre",
    showInNav: true,
    brandName:
      "Técnicos Especializados | Qualidade no Serviço | Orçamentos Atrativos",
    headline: "Avaria em casa?",
    headlineAccent: "Fale connosco agora.",
    supportText:
      "Prioridade em Lisboa e Margem Sul. Canalização, eletricidade, desentupimentos e mais — com o orçamento explicado antes de começar.",
    heroImageFallback: "/nexo-services/canalizacao.jpg",
    heroSlides: [
      {
        imageUrl: "/nexo-services/canalizacao.jpg",
        alt: "Canalização ao domicílio",
      },
      {
        imageUrl: "/nexo-services/eletricidade.jpg",
        alt: "Intervenção eléctrica",
      },
      {
        imageUrl: "/nexo-services/estores.jpg",
        alt: "Reparação de estores",
      },
      {
        imageUrl: "/nexo-services/ar-condicionado.jpg",
        alt: "Manutenção de ar condicionado",
      },
    ],
    callLabel: "Ligar",
    whatsappLabel: "WhatsApp",
    trustIntro:
      "Coordenamos técnicos parceiros. Orçamento antes de começar, garantia escrita e fatura com NIF.",
    facts: CONFIRMED_FACTS.map((text) => ({ text })),
    differentialsTitle:
      "Sem surpresas na fatura.\nOrçamentos detalhados.\nAntes da adjudicação.",
    differentials: DIFFERENTIALS.map((item) => ({
      title: item.title,
      body: item.body,
    })),
    stepsTitle: "Do contacto à reparação, em três passos.",
    stepsTitleHighlight: "contacto",
    stepsImages: [
      {
        imageUrl: "/nexo-services/eletricidade.jpg",
        label: "Eletricidade",
        alt: "Intervenção eléctrica",
      },
      {
        imageUrl: "/nexo-services/canalizacao.jpg",
        label: "Canalização",
        alt: "Canalização ao domicílio",
      },
    ],
    steps: STEPS.map((step) => ({
      number: step.number,
      title: step.title,
      body: step.body,
    })),
  },
  {
    blockType: "services" as const,
    navLabel: "Serviços",
    showInNav: true,
    title: "Diga-nos o que avariou. Tratamos do resto.",
    titleHighlight: "Tratamos do resto.",
    intro:
      "As urgências mais pedidas. Cada linha abre o WhatsApp já com o problema identificado.",
    urgentLabel: "Não sei o que é — WhatsApp urgente",
    urgentWhatsappMessage: URGENT_WHATSAPP_MESSAGE,
    primaryServices: PRIMARY_SERVICE_SLUGS.map((slug) => {
      const service = getService(slug);
      if (!service) throw new Error(`Missing primary service ${slug}`);
      return serviceFields(service);
    }),
    groups: SERVICE_GROUPS.map((group) => ({
      id: group.id,
      title: group.title,
      items: servicesInGroup(group.slugs).map(serviceFields),
    })),
  },
  {
    blockType: "gallery" as const,
    navLabel: "Galeria",
    showInNav: true,
    title: "Trabalho no terreno.",
    intro: "Alguns dos serviços que executamos ao domicílio.",
    items: SERVICES.filter((service) => service.image).map((service) => ({
      imageUrl: service.image!,
      caption: service.title,
      alt: service.imageAlt ?? service.title,
    })),
  },
  {
    blockType: "contact" as const,
    navLabel: "Contacto",
    showInNav: true,
    title: "Deixe o número.",
    titleAccent: "Ligamos nós.",
    supportText:
      "Ou fale já connosco. O WhatsApp leva a descrição que escrever ao lado.",
    coverageTitle: "Atendimento imediato na Grande Lisboa e Margem Sul.",
    coverageIntro: COVERAGE_INTRO,
    coverageGroups: COVERAGE_GROUPS.map((group) => ({
      id: group.id,
      title: group.title,
      cities: group.cities.map((name) => ({ name })),
    })),
    faqTitle: "O que precisa de saber",
    faqs: FAQS.map((item) => ({
      question: item.question,
      answer: item.answer,
      placeholder: Boolean(item.placeholder),
    })),
  },
];
