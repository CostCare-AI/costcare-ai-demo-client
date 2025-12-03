export function normalizeUrl(raw: string): string {
  if (!raw) return raw;
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

export function extractFirstUrl(text: string): string | null {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/i;
  const match = text.match(urlRegex);
  if (!match) return null;
  return normalizeUrl(match[0]);
}

export function isImageUrl(url: string): boolean {
  if (!url) return false;
  return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(url);
}

export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace("/", "") || null;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/")[2] || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function getDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}


