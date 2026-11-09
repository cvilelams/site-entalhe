"use client";

import Link from "next/link";
import { trackCTAClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type LandingPrimaryCtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "inverted" | "outline";
  className?: string;
  slot?: string;
};

const baseClass =
  "font-corpo inline-block max-w-full text-center text-[17px] font-medium uppercase leading-[1.2] tracking-[0.08em] transition-all hover:-translate-y-px rounded-sm px-8 py-5 sm:px-[72px]";

export default function LandingPrimaryCtaLink({
  href,
  children,
  variant = "filled",
  className = "",
  slot,
}: LandingPrimaryCtaLinkProps) {
  const variantClass =
    variant === "filled"
      ? "bg-terracota text-cream hover:bg-terracota-dark"
      : variant === "outline"
        ? "border border-cream bg-transparent text-cream duration-200 hover:border-cream hover:bg-white/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-cream focus-visible:[outline-style:solid]"
        : "bg-cream text-terracota hover:bg-terracota-dark hover:text-cream";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseClass, variantClass, className)}
      onClick={() => trackCTAClick(slot ?? "cta_sem_slot", href)}
    >
      {children}
    </Link>
  );
}
