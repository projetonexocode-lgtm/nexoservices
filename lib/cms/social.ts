export const SOCIAL_NETWORKS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "x", label: "X" },
] as const;

export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number]["value"];

export type SocialLink = {
  network: SocialNetwork;
  url: string;
  enabled: boolean;
  label?: string;
};

export function socialNetworkLabel(network: string): string {
  return (
    SOCIAL_NETWORKS.find((item) => item.value === network)?.label || network
  );
}

export function isSocialNetwork(value: unknown): value is SocialNetwork {
  return SOCIAL_NETWORKS.some((item) => item.value === value);
}

/** Real profile URLs only — ignore empty homepage placeholders. */
export function isUsableSocialUrl(url: string | null | undefined): boolean {
  if (!url?.trim()) return false;
  const value = url.trim();
  try {
    const parsed = new URL(value);
    if (!/^https?:$/.test(parsed.protocol)) return false;
    const host = parsed.hostname.replace(/^www\./, "");
    const path = parsed.pathname.replace(/\/+$/, "");
    if (
      (host === "instagram.com" ||
        host === "facebook.com" ||
        host === "linkedin.com" ||
        host === "youtube.com" ||
        host === "tiktok.com" ||
        host === "x.com" ||
        host === "twitter.com") &&
      !path
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

type SocialLinkRow = {
  network?: string | null;
  url?: string | null;
  enabled?: boolean | null;
  label?: string | null;
} | null;

export function socialLinksFromSettings(
  settings: Record<string, unknown>,
): SocialLink[] {
  const rows = settings.socialLinks as SocialLinkRow[] | null | undefined;
  if (Array.isArray(rows) && rows.length > 0) {
    return rows
      .map((row) => {
        if (!row || !isSocialNetwork(row.network)) return null;
        const url = String(row.url || "").trim();
        if (!isUsableSocialUrl(url)) return null;
        if (row.enabled === false) return null;
        return {
          network: row.network,
          url,
          enabled: true,
          label: row.label?.trim() || socialNetworkLabel(row.network),
        };
      })
      .filter((link): link is SocialLink => Boolean(link));
  }

  // Legacy single-URL fields (pre socialLinks array).
  const legacy: Array<[SocialNetwork, unknown]> = [
    ["instagram", settings.instagramUrl],
    ["facebook", settings.facebookUrl],
    ["linkedin", settings.linkedinUrl],
  ];

  return legacy
    .map(([network, raw]) => {
      const url = String(raw || "").trim();
      if (!isUsableSocialUrl(url)) return null;
      return {
        network,
        url,
        enabled: true,
        label: socialNetworkLabel(network),
      };
    })
    .filter((link): link is SocialLink => Boolean(link));
}
