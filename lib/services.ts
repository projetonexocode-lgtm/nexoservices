export type Service = {
  slug: string;
  title: string;
  description: string;
  whatsappMessage: string;
  image?: string;
  imageAlt?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "canalizacao",
    title: "Canalização",
    description: "Fugas de água, torneiras, sifões e substituição de tubagem.",
    whatsappMessage: "Olá! Preciso de um canalizador urgente.",
    image: "/nexo-services/canalizacao.jpg",
    imageAlt: "Técnico Nexo Services a trabalhar numa canalização ao domicílio",
  },
  {
    slug: "eletricidade",
    title: "Eletricidade",
    description: "Quadros, curto-circuitos, tomadas e iluminação.",
    whatsappMessage: "Olá! Preciso de um eletricista urgente.",
    image: "/nexo-services/eletricidade.jpg",
    imageAlt: "Técnico Nexo Services a intervir num quadro eléctrico",
  },
  {
    slug: "desentupimentos",
    title: "Desentupimentos",
    description: "Ralos, sanitas e coletores entupidos.",
    whatsappMessage: "Olá! Preciso de um serviço de desentupimento urgente.",
  },
  {
    slug: "esquentadores-caldeiras",
    title: "Esquentadores e Caldeiras",
    description: "Água sem aquecer, avarias e manutenção.",
    whatsappMessage: "Olá! Preciso de um técnico de esquentadores urgente.",
  },
  {
    slug: "termoacumuladores",
    title: "Termoacumuladores",
    description: "Instalação, substituição e reparação.",
    whatsappMessage: "Olá! Preciso de um técnico de termoacumuladores urgente.",
  },
  {
    slug: "estores-persianas",
    title: "Estores e Persianas",
    description: "Fitas partidas, motores e réguas danificadas.",
    whatsappMessage: "Olá! Preciso de reparação urgente de estores ou persianas.",
    image: "/nexo-services/estores.jpg",
    imageAlt: "Técnico Nexo Services a reparar um estore ao domicílio",
  },
  {
    slug: "portoes-garagem",
    title: "Portões de Garagem",
    description: "Motor, comandos e alinhamento.",
    whatsappMessage: "Olá! Preciso de reparação urgente de portão de garagem.",
  },
  {
    slug: "vidros-espelhos",
    title: "Vidros e Espelhos",
    description: "Substituição de vidros partidos e espelhos à medida.",
    whatsappMessage: "Olá! Preciso de um serviço de vidros urgente.",
  },
  {
    slug: "serralharia",
    title: "Serralharia",
    description: "Portas, grades, estruturas e soldadura.",
    whatsappMessage: "Olá! Preciso de um serralheiro urgente.",
  },
  {
    slug: "ar-condicionado",
    title: "Ar Condicionado",
    description: "Instalação, cargas de gás e manutenção.",
    whatsappMessage: "Olá! Preciso de um técnico de ar condicionado urgente.",
    image: "/nexo-services/ar-condicionado.jpg",
    imageAlt: "Técnico Nexo Services a fazer manutenção de ar condicionado",
  },
  {
    slug: "caixilharia-portas-janelas",
    title: "Caixilharia, Portas e Janelas",
    description: "Vedação, fechos e alinhamento.",
    whatsappMessage: "Olá! Preciso de um serviço de caixilharia urgente.",
    image: "/nexo-services/caixilharia.jpg",
    imageAlt: "Técnico Nexo Services a intervir em caixilharia de janela",
  },
  {
    slug: "infiltracao-humidade",
    title: "Infiltrações e Humidade",
    description: "Deteção de origem e tratamento.",
    whatsappMessage: "Olá! Preciso de deteção de infiltração urgente.",
    image: "/nexo-services/infiltracao-humidade.jpg",
    imageAlt: "Técnico Nexo Services a inspecionar humidade numa parede",
  },
  {
    slug: "telhados-coberturas",
    title: "Telhados e Coberturas",
    description: "Telhas, algeroz e impermeabilização.",
    whatsappMessage: "Olá! Preciso de reparação urgente de telhado.",
  },
];

/** First-screen urgency picks — keep ≤4 for working memory. */
export const PRIMARY_SERVICE_SLUGS = [
  "canalizacao",
  "eletricidade",
  "desentupimentos",
  "esquentadores-caldeiras",
] as const;

export const SERVICE_GROUPS = [
  {
    id: "agua",
    title: "Água e esgotos",
    slugs: [
      "canalizacao",
      "desentupimentos",
      "esquentadores-caldeiras",
      "termoacumuladores",
      "infiltracao-humidade",
    ],
  },
  {
    id: "luz",
    title: "Luz e clima",
    slugs: ["eletricidade", "ar-condicionado"],
  },
  {
    id: "acesso",
    title: "Acesso e segurança",
    slugs: [
      "portoes-garagem",
      "serralharia",
      "vidros-espelhos",
      "estores-persianas",
    ],
  },
  {
    id: "estrutura",
    title: "Casa e estrutura",
    slugs: ["caixilharia-portas-janelas", "telhados-coberturas"],
  },
] as const;

export const FOOTER_SERVICES = [
  "Canalização",
  "Eletricidade",
  "Desentupimentos",
  "Esquentadores e caldeiras",
  "Estores e Persianas",
  "Caixilharias",
  "Ar-Condicionado",
  "Portas/Portas Blindadas",
  "Portões de Garagem",
  "Intercomunicadores",
  "Fechaduras/Chaves de Acesso",
  "Domótica/Carregadores Elétricos",
] as const;

export const FOOTER_PARTNERS = ["Leroy Merlin", "Obramat"] as const;

export const FOOTER_CERTIFICATES = ["IMPIC"] as const;

const SERVICE_BY_SLUG = new Map(SERVICES.map((service) => [service.slug, service]));

export function getService(slug: string): Service | undefined {
  return SERVICE_BY_SLUG.get(slug);
}

export function servicesInGroup(slugs: readonly string[]): Service[] {
  return slugs.flatMap((slug) => {
    const service = getService(slug);
    return service ? [service] : [];
  });
}
