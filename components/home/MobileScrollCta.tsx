"use client";

import LandingPrimaryCtaLink from "@/components/home/LandingPrimaryCtaLink";
import { useEffect, useState } from "react";

type MobileScrollCtaProps = {
  ctaUrl: string;
  ctaText: string;
  threshold?: number;
};

export default function MobileScrollCta({
  ctaUrl,
  ctaText,
  threshold = 0.2,
}: MobileScrollCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const doc = document.documentElement;
      const scrollableHeight = doc.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setIsVisible(false);
        return;
      }
      const progress = window.scrollY / scrollableHeight;
      setIsVisible(progress >= threshold);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [threshold]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 p-3 pb-4 backdrop-blur md:hidden"
      style={{
        background: "rgba(26,15,10,0.95)",
        borderTop: "1px solid rgba(212,196,176,0.2)",
      }}
    >
      <div className="mx-auto w-full max-w-lg px-2">
        <p
          className="mb-2 text-center font-corpo font-light"
          style={{ fontSize: "12px", color: "rgba(253,248,240,0.7)" }}
        >
          Pronta para começar a entalhar hoje?
        </p>
        <div className="flex justify-center">
          <LandingPrimaryCtaLink href={ctaUrl} variant="filled">
            {ctaText}
          </LandingPrimaryCtaLink>
        </div>
        <p
          className="mt-2 text-center font-corpo text-label"
          style={{ color: "rgba(253,248,240,0.5)" }}
        >
          Acesso vitalício e suporte no fórum
        </p>
      </div>
    </div>
  );
}
