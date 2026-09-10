import type { Metadata } from "next";
import { AboutPageView } from "@/components/sections/AboutPageView";
import { getAboutPage, getSiteSettings } from "@/lib/cms";
import { defaultUiCopy } from "@/lib/cms/uiCopy";
import { SITE } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);
  const title = about.seoTitle || "Sobre nós | Nexo Services";
  const description =
    about.seoDescription ||
    settings.seoDescription ||
    "Conheça a Nexo Services.";

  return {
    title,
    description,
    alternates: {
      canonical: `${settings.url || SITE.url}/sobre`,
    },
    openGraph: {
      title,
      description,
      url: `${settings.url || SITE.url}/sobre`,
    },
  };
}

export default async function SobrePage() {
  const [about, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);
  const copy =
    "uiCopy" in settings && settings.uiCopy
      ? settings.uiCopy
      : defaultUiCopy;

  return (
    <AboutPageView
      data={about}
      photoPlaceholder={copy.aboutPhotoPlaceholder}
    />
  );
}
