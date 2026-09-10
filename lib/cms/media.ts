type MediaLike =
  | {
      url?: string | null;
    }
  | string
  | number
  | null
  | undefined;

export function resolveMediaUrl(
  media: MediaLike,
  fallback?: string | null,
): string {
  if (typeof media === "string" && media) return media;
  if (media && typeof media === "object" && media.url) return media.url;
  return fallback || "";
}
