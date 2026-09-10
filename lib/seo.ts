import { SITE } from "@/lib/site";

/** Default SEO copy for nexoservices.pt (pt-PT). */
export const SEO = {
  title: "Nexo Services | Reparações Urgentes em Lisboa e Margem Sul",
  description:
    "Avaria em casa? Canalização, eletricidade, desentupimentos e reparações ao domicílio em Lisboa, AML e Margem Sul. Orçamento antes de começar e garantia até 3 anos.",
  keywords: [
    "reparações urgentes Lisboa",
    "canalização Lisboa",
    "eletricista Lisboa",
    "desentupimentos Lisboa",
    "reparações ao domicílio",
    "técnico urgente Margem Sul",
    "área metropolitana de Lisboa",
    "Nexo Services",
  ],
  ogImage: "/nexo-services/canalizacao.jpg",
  ogImageAlt: "Técnico Nexo Services em reparação de canalização ao domicílio",
} as const;

export function absoluteUrl(path: string, base = SITE.url): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/$/, "")}${normalized}`;
}
