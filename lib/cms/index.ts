import { getPayload } from "payload";
import { unstable_noStore as noStore } from "next/cache";
import config from "@payload-config";
import {
  defaultHomepageSections,
  defaultSiteSettings,
} from "@/lib/cms/defaults";

export type NavItem = {
  label: string;
  href: string;
};

const SECTION_ANCHORS: Record<string, string> = {
  about: "sobre",
  services: "servicos",
  gallery: "galeria",
  contact: "contacto",
};

export function sectionAnchor(blockType: string): string {
  return SECTION_ANCHORS[blockType] ?? blockType;
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
      depth: 0,
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
    return merged;
  } catch (error) {
    console.error("Failed to load site-settings from Payload", error);
    return defaultSiteSettings;
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
  }> | null | undefined,
): NavItem[] {
  if (!sections?.length) {
    return defaultHomepageSections
      .filter((section) => section.showInNav)
      .map((section) => ({
        label: section.navLabel,
        href: `/#${sectionAnchor(section.blockType)}`,
      }));
  }

  return sections
    .filter((section) => section.showInNav !== false && section.navLabel)
    .map((section) => ({
      label: section.navLabel as string,
      href: `/#${sectionAnchor(section.blockType || "")}`,
    }));
}
