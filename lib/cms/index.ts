import { getPayload } from "payload";
import { unstable_noStore as noStore } from "next/cache";
import config from "@payload-config";
import {
  defaultAboutPage,
  defaultHomepageSections,
  defaultSiteSettings,
} from "@/lib/cms/defaults";
import { resolveMediaUrl } from "@/lib/cms/media";

export type NavItem = {
  label: string;
  href: string;
};

export { resolveMediaUrl } from "@/lib/cms/media";

const SECTION_ANCHORS: Record<string, string> = {
  about: "sobre",
  services: "servicos",
  gallery: "galeria",
  contact: "contacto",
};

/** Path-based routes for blocks that have a dedicated page. */
const SECTION_PATHS: Record<string, string> = {
  about: "/sobre",
};

export function sectionAnchor(blockType: string): string {
  return SECTION_ANCHORS[blockType] ?? blockType;
}

export function sectionHref(blockType: string): string {
  if (SECTION_PATHS[blockType]) return SECTION_PATHS[blockType];
  return `/#${sectionAnchor(blockType)}`;
}

export async function getPayloadClient() {
  return getPayload({ config });
}

export async function getSiteSettings() {
  noStore();
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });

    const merged = { ...defaultSiteSettings, ...settings };
    // Empty CMS strings should not wipe code defaults (SEO, tagline, etc.).
    for (const key of Object.keys(defaultSiteSettings) as Array<
      keyof typeof defaultSiteSettings
    >) {
      const value = merged[key];
      if (value === null || value === undefined || value === "") {
        merged[key] = defaultSiteSettings[key] as never;
      }
    }

    return {
      ...merged,
      logoLightUrl: resolveMediaUrl(
        settings.logoLight as { url?: string | null } | null | undefined,
        defaultSiteSettings.logoLightUrl,
      ),
      logoDarkUrl: resolveMediaUrl(
        settings.logoDark as { url?: string | null } | null | undefined,
        defaultSiteSettings.logoDarkUrl,
      ),
      projetoNexoLogoUrl: resolveMediaUrl(
        (settings as { projetoNexoLogo?: { url?: string | null } | null })
          .projetoNexoLogo,
        defaultSiteSettings.projetoNexoLogoUrl,
      ),
    };
  } catch (error) {
    console.error("Failed to load site-settings from Payload", error);
    return defaultSiteSettings;
  }
}

export async function getAboutPage() {
  noStore();
  try {
    const payload = await getPayloadClient();
    const about = await payload.findGlobal({
      slug: "about-page",
      depth: 1,
    });

    const merged = { ...defaultAboutPage, ...about };
    for (const key of Object.keys(defaultAboutPage) as Array<
      keyof typeof defaultAboutPage
    >) {
      const value = merged[key];
      if (value === null || value === undefined || value === "") {
        merged[key] = defaultAboutPage[key] as never;
      }
    }
    return merged;
  } catch (error) {
    console.error("Failed to load about-page from Payload", error);
    return defaultAboutPage;
  }
}

export async function getHomepage() {
  noStore();
  try {
    const payload = await getPayloadClient();
    const homepage = await payload.findGlobal({
      slug: "homepage",
      depth: 2,
    });

    if (homepage?.sections?.length) {
      return homepage;
    }
  } catch (error) {
    console.error("Failed to load homepage from Payload", error);
  }

  return {
    sections: defaultHomepageSections,
  };
}

export function navItemsFromSections(
  sections: Array<{
    blockType?: string | null;
    navLabel?: string | null;
    showInNav?: boolean | null;
    coverageNavLabel?: string | null;
    faqNavLabel?: string | null;
    showCoverageInNav?: boolean | null;
    showFaqInNav?: boolean | null;
  }> | null | undefined,
): NavItem[] {
  const source = sections?.length ? sections : defaultHomepageSections;

  return source.flatMap((section) => {
    if (section.showInNav === false || !section.navLabel) return [];

    if (section.blockType === "contact") {
      const items: NavItem[] = [];
      if (section.showCoverageInNav !== false) {
        items.push({
          label: section.coverageNavLabel || "Cobertura",
          href: "/#cobertura",
        });
      }
      if (section.showFaqInNav !== false) {
        items.push({
          label: section.faqNavLabel || "FAQ",
          href: "/#faq",
        });
      }
      items.push({
        label: section.navLabel,
        href: "/#contacto",
      });
      return items;
    }

    return [
      {
        label: section.navLabel,
        href: sectionHref(section.blockType || ""),
      },
    ];
  });
}
