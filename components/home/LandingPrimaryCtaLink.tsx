"use client";

import Link from "next/link";

type LandingPrimaryCtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "inverted";
  className?: string;
};

const baseClass =
  "font-corpo font-medium uppercase inline-block text-center transition-all hover:-translate-y-px";

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
    <Link
      href={href}
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      style={{
        padding: "20px 72px",
        borderRadius: "2px",
        fontSize: "17px",
        lineHeight: 1.2,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </Link>
  );
}
