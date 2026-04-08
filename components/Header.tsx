"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/constants";

type HeaderProps = {
  ctaUrl: string;
  ctaText: string;
};

export default function Header({ ctaUrl, ctaText }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      style={{
        background: "rgba(253,248,240,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212,196,176,0.4)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-16 py-6 max-md:px-6 max-md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-titulo text-[18px] font-bold tracking-[-0.02em] text-espresso transition-colors"
        >
          {SITE_NAME}<span className="text-terracota">.</span>
        </Link>

        {/* Nav links — ocultos em mobile */}
        <ul className="hidden items-center gap-10 list-none md:flex">
          <li>
            <a
              href="#curso"
              className="font-corpo text-[13px] font-medium uppercase tracking-[0.08em] text-brown transition-colors hover:text-espresso"
            >
              O Curso
            </a>
          </li>
          <li>
            <a
              href="#instrutor"
              className="font-corpo text-[13px] font-medium uppercase tracking-[0.08em] text-brown transition-colors hover:text-espresso"
            >
              Quem ensina
            </a>
          </li>
        </ul>

        {/* CTA */}
        <Link
          href={ctaUrl}
          className="font-corpo text-[13px] font-medium uppercase tracking-[0.06em] text-cream bg-terracota px-6 py-[10px] transition-all hover:bg-terracota-dark hover:-translate-y-px"
          style={{ borderRadius: "2px" }}
        >
          {ctaText}
        </Link>
      </div>
    </header>
  );
}
