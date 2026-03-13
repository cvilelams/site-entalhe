"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useHeroParallaxSettings } from "@/lib/hero-parallax-settings";

type HeroParallaxBackgroundProps = {
  imageSrc: string;
};

export default function HeroParallaxBackground({ imageSrc }: HeroParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const settings = useHeroParallaxSettings();

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updatePosition = () => {
      if (!containerRef.current) return;

      const shouldReduceMotion = settings.respectReducedMotion && reduceMotionQuery.matches;

      if (!settings.enabled || shouldReduceMotion) {
        setTranslateY(0);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const parallaxFactor = mobileQuery.matches ? settings.backgroundFactorMobile : settings.backgroundFactorDesktop;
      const maxOffset = mobileQuery.matches ? settings.backgroundMaxOffsetMobile : settings.backgroundMaxOffsetDesktop;
      const rawTranslate = -rect.top * parallaxFactor;
      const clampedTranslate = Math.max(-maxOffset, Math.min(maxOffset, rawTranslate));

      setTranslateY(clampedTranslate);
    };

    const onScrollOrResize = () => {
      if (rafIdRef.current !== null) return;

      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        updatePosition();
      });
    };

    updatePosition();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    reduceMotionQuery.addEventListener("change", onScrollOrResize);
    mobileQuery.addEventListener("change", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      reduceMotionQuery.removeEventListener("change", onScrollOrResize);
      mobileQuery.removeEventListener("change", onScrollOrResize);

      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [
    settings.backgroundFactorDesktop,
    settings.backgroundFactorMobile,
    settings.backgroundMaxOffsetDesktop,
    settings.backgroundMaxOffsetMobile,
    settings.enabled,
    settings.respectReducedMotion,
  ]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${settings.backgroundScale})`,
        }}
      >
        <Image src={imageSrc} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, ${settings.overlayOpacityTop}), rgba(0, 0, 0, ${settings.overlayOpacityMiddle}), rgba(0, 0, 0, ${settings.overlayOpacityBottom}))`,
        }}
      />
    </div>
  );
}
