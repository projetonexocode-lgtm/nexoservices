type MediaLike =
  | {
      url?: string | null;
      filename?: string | null;
    }
  | string
  | number
  | null
  | undefined;

/** Brand assets shipped in `public/assets` — Payload local uploads break on Vercel. */
const PUBLIC_ASSET_FILES = new Set([
  "nexo-services-fundo-claro.svg",
  "nexo-services.svg",
  "projeto-nexo-logo.svg",
  "projeto-nexo-logo-fundo-claro.svg",
]);

function publicAssetPath(filename: string | null | undefined): string | null {
  if (!filename) return null;
  const name = filename.split(/[\\/]/).pop()?.split("?")[0] ?? "";
  const decoded = decodeURIComponent(name);
  if (!PUBLIC_ASSET_FILES.has(decoded)) return null;
  return `/assets/${decoded}`;
}

function rewriteEphemeralMediaUrl(url: string): string {
  try {
    const path = url.startsWith("http") ? new URL(url).pathname : url;
    const match = path.match(/\/api\/media\/file\/([^/?#]+)$/);
    if (!match) return url;
    return publicAssetPath(match[1]) || url;
  } catch {
    return url;
  }
}

export function resolveMediaUrl(
  media: MediaLike,
  fallback?: string | null,
): string {
  if (typeof media === "string" && media) {
    return rewriteEphemeralMediaUrl(media);
  }

  if (media && typeof media === "object") {
    const fromFilename = publicAssetPath(media.filename);
    if (fromFilename) return fromFilename;
    if (media.url) return rewriteEphemeralMediaUrl(media.url);
  }

  return fallback || "";
}
