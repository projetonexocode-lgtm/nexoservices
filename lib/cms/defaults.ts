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
import { defaultUiCopy } from "@/lib/cms/uiCopy";

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
  alsoDoLabel: "Projeto Nexo",
  warrantyText: "Garantia até 3 anos, conforme o serviço.",
  logoLightUrl: "/assets/nexo-services-fundo-claro.svg",
  logoDarkUrl: "/assets/nexo-services.svg",
  projetoNexoLogoUrl: "/assets/projeto-nexo-logo.svg",
  ...defaultUiCopy,
  formServiceOptions: defaultUiCopy.formServiceOptions.map((label) => ({
    label,
  })),
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
    showCoverageInNav: true,
    coverageNavLabel: "Cobertura",
    showFaqInNav: true,
    faqNavLabel: "FAQ",
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

export const defaultAboutPage = {
  heroEyebrow: "Sobre nós",
  heroTitle: "Técnicos de confiança ao domicílio",
  heroTitleAccent: "ao domicílio",
  heroLead:
    "A Nexo Services coordena reparações urgentes e serviços especializados em Lisboa, Área Metropolitana e Margem Sul — com orçamento claro antes de começar e garantia no trabalho.",
  heroImageUrl: "/nexo-services/canalizacao.jpg",
  storyTitle: "A nossa história",
  storyParagraphs: [
    {
      text: "A Nexo Services nasceu para resolver um problema simples: quando há uma avaria em casa, precisa de alguém de confiança, rápido e transparente.",
    },
    {
      text: "Coordenamos uma rede de técnicos parceiros especializados — canalização, eletricidade, desentupimentos e muito mais — para enviar quem pode resolver na sua zona.",
    },
    {
      text: "Trabalhamos com prioridade em Lisboa e Margem Sul. No resto do país, mediante disponibilidade. Em todos os serviços emitimos fatura com NIF e oferecemos garantia até 3 anos, conforme o trabalho executado.",
    },
  ],
  storyImageUrl: "/nexo-services/eletricidade.jpg",
  valuesEyebrow: "Como trabalhamos",
  valuesTitle: "O que nos define",
  valuesIntro:
    "A mesma lógica em cada pedido: diagnóstico honesto, orçamento aprovado por si e reparação com responsabilidade.",
  values: DIFFERENTIALS.map((item) => ({
    title: item.title,
    body: item.body,
  })),
  teamEnabled: false,
  teamTitle: "A nossa equipa",
  teamSubtitle: "As pessoas por detrás da coordenação e do serviço.",
  teamMembers: [],
  extraSections: [
    {
      title: "Zona de cobertura",
      body: "Atendimento prioritário em Lisboa, Área Metropolitana e Margem Sul. Cobertura nacional sob pedido, conforme disponibilidade dos técnicos parceiros.",
      imageUrl: "",
    },
    {
      title: "Garantia e faturação",
      body: "Todas as reparações incluem garantia até 3 anos, conforme o serviço. Emitimos fatura com NIF em todos os trabalhos.",
      imageUrl: "",
    },
  ],
  ctaTitle: "Precisa de ajuda em casa?",
  ctaBody:
    "Fale connosco agora. Explicamos o próximo passo e enviamos um técnico à sua zona.",
  ctaLabel: "Falar connosco",
  ctaHref: "/#contacto",
  seoTitle: "Sobre nós | Nexo Services",
  seoDescription:
    "Conheça a Nexo Services: reparações urgentes ao domicílio em Lisboa e Margem Sul, com orçamento antes de começar e garantia até 3 anos.",
};
