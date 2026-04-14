"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { extOf, isVideoUrl, videoSourcesFromUrls } from "@/lib/media-url";

type MakingOfTileMediaProps = {
  src: string;
  /** Segunda URL de vídeo (ex.: MP4 quando `src` é WebM). */
  videoFallbackUrl?: string;
  ariaLabel: string;
};

/**
 * Mídia do “making of”: largura da coluna, altura natural do arquivo.
 */
export function MakingOfTileMedia({ src, videoFallbackUrl, ariaLabel }: MakingOfTileMediaProps) {
  const trimmed = src.trim();
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

  const mediaClass = "block h-full w-full object-cover";
  const imageClass = `${mediaClass} transition-transform duration-500 motion-safe:hover:scale-105`;

  if (videoSources.length > 0) {
    return (
      <div className="relative h-full w-full">
        <video
          key={videoKey}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={mediaClass}
          aria-label={ariaLabel}
        >
          {videoSources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
        {needsPlayButton && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-espresso/15">
            <button
              type="button"
              onClick={onPlayClick}
              className="pointer-events-auto rounded-full bg-cream-2 px-4 py-2 font-corpo text-xs font-medium text-espresso shadow-md transition hover:bg-cream-3"
            >
              Reproduzir
            </button>
          </div>
        )}
      </div>
    );
  }

  const extension = extOf(trimmed);
  if (extension === "gif" || extension === "webp") {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element -- GIF/WebP animado */}
        <img
          src={trimmed}
          alt={ariaLabel}
          className={imageClass}
          loading="lazy"
        />
      </>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- JPG/PNG etc. */}
      <img src={trimmed} alt={ariaLabel} className={imageClass} loading="lazy" />
    </>
  );
}
