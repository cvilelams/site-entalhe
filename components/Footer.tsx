import Link from "next/link";
import { landingData } from "@/lib/landing-data";

export default function Footer() {
  return (
    <footer className="border-t border-[#e7dfd4] bg-fundo-off">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-4 px-8 py-8">
        <strong className="font-corpo text-sm-body md:text-body">{landingData.footer.copyright}</strong>
        <nav className="flex gap-4">
          {landingData.footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-titulo text-label text-cinza/85 transition-colors hover:text-verde-musgo"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
