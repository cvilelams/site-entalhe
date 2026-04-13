/** Extensão do caminho, sem query string. */
export function extOf(url: string): string {
  const clean = url.split("?")[0] ?? url;
  const i = clean.lastIndexOf(".");
  return i >= 0 ? clean.slice(i + 1).toLowerCase() : "";
}

export function isVideoUrl(url: string): boolean {
  const u = url.toLowerCase();
  return u.endsWith(".webm") || u.endsWith(".mp4");
}

export type VideoSource = { src: string; type: string };

/** Monta fontes de vídeo (WebM antes de MP4) a partir de URL principal e fallback opcional. */
export function videoSourcesFromUrls(primary: string, fallback: string | undefined): VideoSource[] {
  const out: VideoSource[] = [];
  const pushIfVideo = (u: string) => {
    const t = u.trim();
    if (!t || !isVideoUrl(t)) return;
    const lower = t.toLowerCase();
    const type = lower.endsWith(".mp4") ? "video/mp4" : "video/webm";
    if (!out.some((s) => s.src === t)) out.push({ src: t, type });
  };
  pushIfVideo(primary);
  if (fallback) pushIfVideo(fallback);
  out.sort((a, b) => {
    if (a.type === b.type) return 0;
    return a.type === "video/webm" ? -1 : 1;
  });
  return out;
}
