"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type HeroParallaxBackgroundProps = {
  imageSrc: string;
};

export default function HeroParallaxBackground({ imageSrc }: HeroParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updatePosition = () => {
      if (!containerRef.current) return;

      if (reduceMotionQuery.matches) {
        setTranslateY(0);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const normalizedOffset = (elementCenter - viewportCenter) / viewportCenter;
      const clampedOffset = Math.max(-1, Math.min(1, normalizedOffset));
      const easedOffset = Math.sign(clampedOffset) * Math.pow(Math.abs(clampedOffset), 0.85);
      const maxOffset = mobileQuery.matches ? 56 : 140;

      setTranslateY(easedOffset * -maxOffset);
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
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(1.2)`,
        }}
      >
        <Image src={imageSrc} alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/50" />
    </div>
  );
}
