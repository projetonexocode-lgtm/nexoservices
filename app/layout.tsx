import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { Header } from "@/components/layout/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const naville = localFont({
  src: "./fonts/Naville-Regular.ttf",
  variable: "--font-naville",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Reparações urgentes ao domicílio em Lisboa`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Avaria em casa? Canalização, eletricidade, desentupimentos e serviços especializados ao domicílio. Base em Lisboa, atendimento imediato na Área Metropolitana e Margem Sul, cobertura nacional mediante disponibilidade.",
  keywords: [
    "reparações urgentes Lisboa",
    "canalizador Lisboa",
    "eletricista Lisboa",
    "desentupimentos Área Metropolitana",
    "técnico ao domicílio",
    "Nexo Services",
  ],
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Avaria em casa? Fale connosco agora.`,
    description:
      "Reparações e serviços especializados ao domicílio. Base em Lisboa, foco na AML e Margem Sul, cobertura nacional mediante disponibilidade.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Reparações urgentes em Lisboa`,
    description:
      "Canalização, eletricidade, desentupimentos e mais. Atendimento imediato na AML e Margem Sul.",
  },
  alternates: {
    canonical: SITE.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    url: SITE.url,
    telephone: [SITE.phoneDisplay, SITE.whatsappDisplay],
    areaServed: [
      { "@type": "City", name: "Lisboa" },
      { "@type": "AdministrativeArea", name: "Área Metropolitana de Lisboa" },
      { "@type": "Country", name: "Portugal" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressCountry: "PT",
    },
    description:
      "Reparações e serviços especializados ao domicílio. Base em Lisboa, atendimento imediato na Área Metropolitana e Margem Sul, cobertura nacional mediante disponibilidade.",
  };

  return (
    <html
      lang="pt-PT"
      className={`${jost.variable} ${naville.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-charcoal focus:px-4 focus:py-2 focus:text-cream"
        >
          Saltar para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1 pb-24 lg:pb-0">
          {children}
        </main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
