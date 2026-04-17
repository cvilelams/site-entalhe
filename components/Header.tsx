"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      className={`fixed inset-x-0 top-0 z-50 border-b border-rule/40 bg-cream transition-all duration-300 ${
        scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-16 py-6 max-md:px-6 max-md:py-4">
        {/* Logo */}
        <Link href="/" className="transition-opacity hover:opacity-75">
          <Image
            src="/images/sections/Logo escrito cavaco preto.svg"
            alt="Oficina Cigarra"
            width={140}
            height={46}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Nav links — ocultos em mobile */}
        <ul className="hidden items-center gap-10 list-none md:flex">
          <li>
            <a
              href="#curso"
              className="font-corpo text-label font-medium uppercase tracking-[0.08em] text-brown transition-colors hover:text-espresso"
            >
              O Curso
            </a>
          </li>
          <li>
            <a
              href="#instrutor"
              className="font-corpo text-label font-medium uppercase tracking-[0.08em] text-brown transition-colors hover:text-espresso"
            >
              Quem ensina
            </a>
          </li>
        </ul>

        {/* CTA */}
        <Link
          href={ctaUrl}
          className="font-corpo rounded-sm bg-terracota px-6 py-[10px] text-label font-medium uppercase tracking-[0.06em] text-cream transition-all hover:-translate-y-px hover:bg-terracota-dark"
        >
          {ctaText}
        </Link>
      </div>
    </header>
  );
}
