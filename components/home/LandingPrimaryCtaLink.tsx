"use client";

import Link from "next/link";

type LandingPrimaryCtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "inverted";
  className?: string;
};

const baseClass =
  "font-corpo inline-block text-center text-[17px] font-medium uppercase leading-[1.2] tracking-[0.08em] transition-all hover:-translate-y-px rounded-sm px-[72px] py-5";

export default function LandingPrimaryCtaLink({
  href,
  children,
  variant = "filled",
  className = "",
}: LandingPrimaryCtaLinkProps) {
  const variantClass =
    variant === "filled"
      ? "bg-terracota text-cream hover:bg-terracota-dark"
      : "bg-cream text-terracota hover:bg-terracota-dark hover:text-cream";

  return (
    <Link href={href} className={`${baseClass} ${variantClass} ${className}`.trim()}>
      {children}
    </Link>
  );
}
