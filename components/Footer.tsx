import Image from "next/image";
import Link from "next/link";
import { landingData } from "@/lib/landing-data";
import { trackLinkClick } from "@/lib/analytics";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Corpo do footer */}
      <footer className="bg-dark px-6 py-16 md:px-16">
        <div
          className="mx-auto grid max-w-6xl gap-12 max-sm:grid-cols-1"
          style={{ gridTemplateColumns: "2fr 1fr" }}
        >
          {/* Coluna da marca */}
          <div>
            <Link href="/" className="mb-4 block transition-opacity hover:opacity-75">
              <Image
                src="/images/sections/Logo escrito cavaco branco.svg"
                alt="Oficina Cigarra"
                width={140}
                height={46}
                className="h-10 w-auto"
              />
            </Link>
            <p className="font-corpo max-w-[260px] text-sm-body font-light leading-[1.65] text-cream/40">
              Ensino de entalhe em madeira com faca.
            </p>
          </div>

          {/* Coluna comunidade */}
          <div>
            <span className="font-corpo text-label mb-5 block font-medium uppercase text-cream/30">
              Comunidade
            </span>
            <ul className="flex flex-col gap-3 list-none">
              {landingData.footer.links.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="font-corpo text-sm-body font-light text-cream/55 transition-colors hover:text-cream"
                      onClick={() => trackLinkClick(`footer_${link.label.toLowerCase()}`, link.href)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </footer>

      {/* Linha inferior */}
      <div className="border-t border-white/[0.06] bg-dark px-6 py-6 md:px-16">
        <div className="mx-auto flex max-w-6xl items-center justify-between max-sm:flex-col max-sm:gap-2">
          <span className="font-corpo text-caption font-light text-cream/25">
            © {year} {landingData.footer.copyright}. Todos os direitos reservados.
          </span>
          <span className="font-corpo text-caption font-light text-cream/25">
            Feito com atenção ao detalhe.
          </span>
        </div>
      </div>
    </>
  );
}
