import Link from "next/link";
import { landingData } from "@/lib/landing-data";

export default function Footer() {
  return (
    <footer className="border-t border-[#d9cfbe] bg-shiro">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-wrap justify-between gap-4 py-8">
        <strong className="text-sm md:text-base">{landingData.footer.copyright}</strong>
        <nav className="flex gap-4">
          {landingData.footer.links.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" rel="noreferrer" className="text-sm text-sumi/85 transition-colors hover:text-sumi">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
