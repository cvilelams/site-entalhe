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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rule/20 bg-espresso/95 p-3 pb-4 backdrop-blur md:hidden">
      <div className="mx-auto w-full max-w-lg px-2">
        <p className="font-corpo mb-2 text-center text-caption font-light text-cream/70">
          Pronta para começar a entalhar hoje?
        </p>
        <div className="flex justify-center">
          <LandingPrimaryCtaLink href={ctaUrl} variant="filled">
            {ctaText}
          </LandingPrimaryCtaLink>
        </div>
        <p className="font-corpo text-label mt-2 text-center text-cream/50">
          Acesso por 3 anos e suporte no fórum
        </p>
      </div>
    </div>
  );
}
