export type Review = {
  name: string;
  stars: 5;
  quote: string;
};

export const REVIEWS_DISCLAIMER = "Textos de exemplo · substituir pelos reais";

export const REVIEWS: Review[] = [
  {
    name: "Nome do cliente · Lisboa",
    stars: 5,
    quote:
      "Fuga de água resolvida no mesmo dia, com o valor explicado antes de começar.",
  },
  {
    name: "Nome do cliente · Almada",
    stars: 5,
    quote:
      "Chamei para o esquentador e ficou resolvido na primeira visita. Técnico pontual.",
  },
  {
    name: "Nome do cliente · Oeiras",
    stars: 5,
    quote:
      "Estore encravado há meses. Substituíram a fita e o motor sem sujar nada.",
  },
];
