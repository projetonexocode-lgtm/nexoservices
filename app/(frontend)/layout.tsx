import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { Header } from "@/components/layout/Header";
import { SiteContactProvider } from "@/components/providers/SiteContactProvider";
import { getHomepage, getSiteSettings, navItemsFromSections } from "@/lib/cms";
import { footerContentFromSettings } from "@/lib/cms/footer";
import { PRIMARY_SERVICE_SLUGS, getService } from "@/lib/services";
import { SEO, absoluteUrl } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { defaultUiCopy } from "@/lib/cms/uiCopy";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const copy =
    "uiCopy" in settings && settings.uiCopy ? settings.uiCopy : defaultUiCopy;
  const siteUrl = settings.url || SITE.url;
  const title = settings.seoTitle || SEO.title;
  const description = settings.seoDescription || SEO.description;
  const ogImage = absoluteUrl(SEO.ogImage, siteUrl);
  const keywords = copy.seoKeywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s · ${settings.name || SITE.name}`,
    },
    description,
    keywords: keywords.length ? keywords : [...SEO.keywords],
    applicationName: settings.name || SITE.name,
    authors: [{ name: settings.legalName || SITE.legalName }],
    creator: settings.name || SITE.name,
    publisher: settings.legalName || SITE.legalName,
    category: "home services",
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url: siteUrl,
      siteName: settings.name || SITE.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: copy.seoOgImageAlt || SEO.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        "pt-PT": siteUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, homepage] = await Promise.all([
    getSiteSettings(),
    getHomepage(),
  ]);

  const navItems = navItemsFromSections(
    (homepage.sections || []) as Array<{
      blockType?: string | null;
      navLabel?: string | null;
      showInNav?: boolean | null;
    }>,
  );

  const copy =
    "uiCopy" in settings && settings.uiCopy ? settings.uiCopy : defaultUiCopy;

  const siteContact = {
    name: settings.name || SITE.name,
    phoneDisplay: settings.phoneDisplay || SITE.phoneDisplay,
    phoneTel: settings.phoneTel || SITE.phoneTel,
    whatsappDisplay: settings.whatsappDisplay || SITE.whatsappDisplay,
    whatsappE164: settings.whatsappE164 || SITE.whatsappE164,
    urgentWhatsappMessage:
      settings.urgentWhatsappMessage || copy.formDefaultMessage,
    projetoNexoUrl: settings.projetoNexoUrl || SITE.projetoNexoUrl,
    logoLightUrl: settings.logoLightUrl || "/assets/nexo-services-fundo-claro.svg",
    logoDarkUrl: settings.logoDarkUrl || "/assets/nexo-services.svg",
    copy,
  };

  const footerContent = footerContentFromSettings(
    settings as Record<string, unknown>,
  );

  const siteUrl = settings.url || SITE.url;
  const serviceNames = PRIMARY_SERVICE_SLUGS.map(
    (slug) => getService(slug)?.title,
  ).filter((title): title is string => Boolean(title));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: siteContact.name,
    legalName: settings.legalName || SITE.legalName,
    url: siteUrl,
    image: absoluteUrl(siteContact.logoLightUrl || SEO.ogImage, siteUrl),
    logo: absoluteUrl(siteContact.logoLightUrl || SEO.ogImage, siteUrl),
    description: settings.seoDescription || SEO.description,
    telephone: siteContact.phoneTel,
    email: settings.contactEmail || SITE.contactEmail,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: [
      { "@type": "City", name: "Lisboa" },
      { "@type": "AdministrativeArea", name: "Área Metropolitana de Lisboa" },
      { "@type": "AdministrativeArea", name: "Margem Sul" },
      { "@type": "Country", name: "Portugal" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lisboa",
      addressRegion: "Lisboa",
      addressCountry: "PT",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteContact.phoneTel,
        contactType: "customer service",
        areaServed: "PT",
        availableLanguage: ["Portuguese"],
      },
      {
        "@type": "ContactPoint",
        telephone: `+${siteContact.whatsappE164}`,
        contactType: "customer support",
        areaServed: "PT",
        availableLanguage: ["Portuguese"],
      },
    ],
    knowsAbout: serviceNames,
    sameAs: (
      [
        settings.instagramUrl,
        settings.facebookUrl,
        settings.linkedinUrl,
      ] as Array<string | null | undefined>
    ).filter((url): url is string => {
      if (!url) return false;
      return (
        !url.endsWith("instagram.com/") &&
        !url.endsWith("facebook.com/") &&
        !url.endsWith("linkedin.com/")
      );
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de reparação ao domicílio",
      itemListElement: serviceNames.map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
          areaServed: "Lisboa e Margem Sul",
          provider: { "@type": "Organization", name: siteContact.name },
        },
      })),
    },
  };

  return (
    <html
      lang="pt-PT"
      className={`${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteContactProvider value={siteContact}>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-charcoal focus:px-4 focus:py-2 focus:text-cream"
          >
            {copy.skipToContentLabel}
          </a>
          <Header
            navItems={navItems}
            announcement={settings.announcement || undefined}
            googleRating={settings.googleRating || "5.0"}
            googleReviewsUrl={settings.googleReviewsUrl || undefined}
          />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer content={footerContent} />
          <FloatingCta />
        </SiteContactProvider>
      </body>
    </html>
  );
}
