"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { extOf, isVideoUrl, videoSourcesFromUrls } from "@/lib/media-url";

type OverviewFinalMediaProps = {
  url: string;
  /** Segunda URL de vídeo (ex.: MP4 quando `url` é WebM) para fallback em Safari/iOS. */
  videoFallbackUrl?: string;
  ariaLabel: string;
};

/**
 * Mídia final da seção "Como é o curso" (WebM/MP4, GIF/WebP animado ou imagem).
 * Vídeo: autoplay com muted/playsInline; botão só se o navegador bloquear play().
 */
export function OverviewFinalMedia({ url, videoFallbackUrl, ariaLabel }: OverviewFinalMediaProps) {
  const trimmed = url.trim();
  const trimmedFallback = videoFallbackUrl?.trim() ?? "";
  const videoSources =
    trimmed && isVideoUrl(trimmed)
      ? videoSourcesFromUrls(trimmed, trimmedFallback || undefined)
      : trimmedFallback && isVideoUrl(trimmedFallback)
        ? videoSourcesFromUrls(trimmedFallback, undefined)
        : [];
  const videoKey = videoSources.map((s) => s.src).join("|");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsPlayButton, setNeedsPlayButton] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (videoSources.length === 0) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;

    setNeedsPlayButton(false);

    const tryPlay = () => {
      const p = v.play();
      if (p !== undefined) {
        p.then(() => setNeedsPlayButton(false)).catch(() => setNeedsPlayButton(true));
      }
    };

    tryPlay();

    const onReady = () => tryPlay();
    v.addEventListener("canplay", onReady);
    v.addEventListener("loadeddata", onReady);
    return () => {
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("loadeddata", onReady);
    };
  }, [videoKey]);

  const onPlayClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().then(() => setNeedsPlayButton(false)).catch(() => {});
  }, []);

  if (videoSources.length > 0) {
    return (
      <div className="relative w-full">
        <video
          key={videoKey}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-auto w-full object-cover"
          aria-label={ariaLabel}
        >
          {videoSources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
        {needsPlayButton && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-espresso/20">
            <button
              type="button"
              onClick={onPlayClick}
              className="pointer-events-auto rounded-full bg-cream-2 px-5 py-2.5 font-corpo text-sm font-medium text-espresso shadow-md transition hover:bg-cream-3"
            >
              Reproduzir animação
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!trimmed) {
    return (
      <>
        <div
          className="min-h-56 w-full bg-gradient-to-br from-cream via-cream-2 to-cream-3"
          aria-hidden
        />
        <span className="sr-only">{ariaLabel}</span>
      </>
    );
  }

  const ext = extOf(trimmed);
  if (ext === "gif" || ext === "webp") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- GIF/WebP animado: <img> garante animação no navegador
      <img
        src={trimmed}
        alt={ariaLabel}
        className="h-auto w-full object-cover transition-transform duration-500 motion-safe:hover:scale-105"
        loading="lazy"
      />
    );
  }

  return (
    <Image
      src={trimmed}
      alt={ariaLabel}
      width={1024}
      height={1024}
      className="h-auto w-full object-cover transition-transform duration-500 motion-safe:hover:scale-105"
      unoptimized
    />
  );
}
