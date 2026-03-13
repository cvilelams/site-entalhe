"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroParallaxBackground from "@/components/home/HeroParallaxBackground";
import { Button } from "@/components/ui/button";
import { useHeroParallaxSettings } from "@/lib/hero-parallax-settings";

type HeroSectionProps = {
  pageContainer: string;
  title?: string | null;
  subtitle?: string | null;
  ctaUrl?: string | null;
  ctaText?: string | null;
  imageSrc: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function HeroSection({ pageContainer, title, subtitle, ctaUrl, ctaText, imageSrc }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const settings = useHeroParallaxSettings();

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const updatePosition = () => {
      if (!sectionRef.current) return;

      const shouldReduceMotion = settings.respectReducedMotion && reduceMotionQuery.matches;

      if (!settings.enabled || shouldReduceMotion) {
        setTranslateY(0);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const parallaxFactor = mobileQuery.matches ? settings.contentFactorMobile : settings.contentFactorDesktop;
      const maxOffset = mobileQuery.matches ? settings.contentMaxOffsetMobile : settings.contentMaxOffsetDesktop;
      const rawTranslate = -rect.top * parallaxFactor;
      setTranslateY(clamp(rawTranslate, -maxOffset, maxOffset));
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
    settings.contentFactorDesktop,
    settings.contentFactorMobile,
    settings.contentMaxOffsetDesktop,
    settings.contentMaxOffsetMobile,
    settings.enabled,
    settings.respectReducedMotion,
  ]);

  return (
    <section ref={sectionRef} className="relative h-[165vh] bg-cedro-gradient text-white md:h-[185vh]">
      <div className="sticky top-0 grid min-h-screen items-center overflow-hidden py-20">
        <HeroParallaxBackground imageSrc={imageSrc} />
        <div
          className={`${pageContainer} relative z-10 flex flex-col items-center text-center will-change-transform`}
          style={{ transform: `translate3d(0, ${-translateY}px, 0)` }}
        >
          <h1 className="mb-4 mt-2 max-w-4xl font-titulo text-display font-black uppercase tracking-tighter text-white">
            {title}
          </h1>
          <p className="mx-auto max-w-[720px] font-corpo text-[24px] font-light text-white/90">{subtitle}</p>
          <Button asChild className="mt-8 self-center">
            <Link href={ctaUrl ?? "#"}>{ctaText ?? "Saiba mais"}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
