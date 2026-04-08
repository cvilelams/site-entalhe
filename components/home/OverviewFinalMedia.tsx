"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type OverviewFinalMediaProps = {
  url: string;
  ariaLabel: string;
};

function extOf(url: string): string {
  const clean = url.split("?")[0] ?? url;
  const i = clean.lastIndexOf(".");
  return i >= 0 ? clean.slice(i + 1).toLowerCase() : "";
}

function isVideoUrl(url: string): boolean {
  const u = url.toLowerCase();
  return u.endsWith(".webm") || u.endsWith(".mp4");
}

/**
 * Mídia final da seção "Como é o curso" (WebM/MP4, GIF/WebP animado ou imagem).
 * Vídeo: autoplay com muted/playsInline; botão só se o navegador bloquear play().
 */
export function OverviewFinalMedia({ url, ariaLabel }: OverviewFinalMediaProps) {
  const trimmed = url.trim();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsPlayButton, setNeedsPlayButton] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!isVideoUrl(trimmed)) return;

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
  }, [trimmed]);

  const onPlayClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().then(() => setNeedsPlayButton(false)).catch(() => {});
  }, []);

  if (!trimmed) {
    return (
      <>
        <div
          className="min-h-56 w-full"
          style={{
            background: "linear-gradient(135deg, #FDF8F0 0%, #F0E8DC 50%, #E4D8C8 100%)",
          }}
          aria-hidden
        />
        <span className="sr-only">{ariaLabel}</span>
      </>
    );
  }

  const isVideo = isVideoUrl(trimmed);

  if (isVideo) {
    const lower = trimmed.toLowerCase();
    return (
      <div className="relative w-full">
        <video
          key={trimmed}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-auto w-full object-cover"
          aria-label={ariaLabel}
        >
          <source src={trimmed} type={lower.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
        </video>
        {needsPlayButton && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1A0F0A]/20">
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

  const ext = extOf(trimmed);
  if (ext === "gif" || ext === "webp") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- GIF/WebP animado: <img> garante animação no navegador
      <img
        src={trimmed}
        alt={ariaLabel}
        className="h-auto w-full object-cover"
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
      className="h-auto w-full object-cover"
      unoptimized
    />
  );
}
