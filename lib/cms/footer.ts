import { defaultSiteSettings } from "@/lib/cms/defaults";
import {
  socialLinksFromSettings,
  type SocialLink,
} from "@/lib/cms/social";

export type FooterContent = {
  blurb: string;
  contactEmail: string;
  socialLinks: SocialLink[];
  services: string[];
  partners: string[];
  certificates: string[];
  certificateCompany: string;
  certificateNipc: string;
  certificateLicense: string;
  alsoDoTitle: string;
  alsoDoText: string;
  alsoDoLabel: string;
  alsoDoUrl: string;
  projetoNexoLogoUrl: string;
  warrantyText: string;
};

type LabelRow = { label?: string | null } | null | undefined;

function labelsFromRows(
  rows: LabelRow[] | null | undefined,
  fallback: string[],
): string[] {
  const values = (rows || [])
    .map((row) => row?.label?.trim())
    .filter((label): label is string => Boolean(label));
  return values.length > 0 ? values : fallback;
}

export function footerContentFromSettings(
  settings: Record<string, unknown>,
): FooterContent {
  const defaults = defaultSiteSettings;

  return {
    blurb: String(settings.footerBlurb || defaults.footerBlurb),
    contactEmail: String(settings.contactEmail || defaults.contactEmail),
    socialLinks: socialLinksFromSettings(settings),
    services: labelsFromRows(
      settings.footerServices as LabelRow[],
      defaults.footerServices.map((item) => item.label),
    ),
    partners: labelsFromRows(
      settings.footerPartners as LabelRow[],
      defaults.footerPartners.map((item) => item.label),
    ),
    certificates: labelsFromRows(
      settings.footerCertificates as LabelRow[],
      defaults.footerCertificates.map((item) => item.label),
    ),
    certificateCompany: String(
      settings.certificateCompany || defaults.certificateCompany,
    ),
    certificateNipc: String(
      settings.certificateNipc || defaults.certificateNipc,
    ),
    certificateLicense: String(
      settings.certificateLicense || defaults.certificateLicense,
    ),
    alsoDoTitle: String(settings.alsoDoTitle || defaults.alsoDoTitle),
    alsoDoText: String(settings.alsoDoText || defaults.alsoDoText),
    alsoDoLabel: String(settings.alsoDoLabel || defaults.alsoDoLabel),
    alsoDoUrl: String(settings.projetoNexoUrl || defaults.projetoNexoUrl),
    projetoNexoLogoUrl: String(
      settings.projetoNexoLogoUrl || defaults.projetoNexoLogoUrl,
    ),
    warrantyText: String(settings.warrantyText || defaults.warrantyText),
  };
}
