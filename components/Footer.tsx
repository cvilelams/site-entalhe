import Link from "next/link";
import { landingData } from "@/lib/landing-data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Corpo do footer */}
      <footer
        className="px-6 py-16 md:px-16"
        style={{ background: "#0D0705" }}
      >
        <div
          className="mx-auto max-w-6xl grid gap-12 max-md:grid-cols-2 max-sm:grid-cols-1"
          style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
        >
        {/* Coluna da marca */}
        <div>
          <Link
            href="/"
            className="font-titulo text-[20px] font-bold tracking-[-0.02em] mb-4 block transition-colors"
            style={{ color: "#FDF8F0" }}
          >
            {landingData.footer.copyright}
            <span style={{ color: "#C4622D" }}>.</span>
          </Link>
          <p
            className="font-corpo font-light leading-[1.65] max-w-[260px]"
            style={{ fontSize: "14px", color: "rgba(253,248,240,0.4)" }}
          >
            Ensino artesanal de entalhe em madeira — para quem quer aprender com profundidade e intenção.
          </p>
        </div>

        {/* Coluna comunidade */}
        <div>
          <span
            className="font-corpo font-medium uppercase text-label mb-5 block"
            style={{ color: "rgba(253,248,240,0.3)" }}
          >
            Comunidade
          </span>
          <ul className="flex flex-col gap-3 list-none">
            {landingData.footer.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-corpo font-light transition-colors hover:text-cream"
                  style={{ fontSize: "14px", color: "rgba(253,248,240,0.55)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna curso */}
        <div>
          <span
            className="font-corpo font-medium uppercase text-label mb-5 block"
            style={{ color: "rgba(253,248,240,0.3)" }}
          >
            Curso
          </span>
          <ul className="flex flex-col gap-3 list-none">
            {[
              { label: "O método",    href: "#curso" },
              { label: "Módulos",     href: "#modulos" },
              { label: "Quem ensina", href: "#instrutor" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-corpo font-light transition-colors hover:text-cream"
                  style={{ fontSize: "14px", color: "rgba(253,248,240,0.55)" }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </footer>

      {/* Linha inferior */}
      <div
        className="px-6 py-6 md:px-16"
        style={{
          background: "#0D0705",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="mx-auto max-w-6xl flex justify-between items-center max-sm:flex-col max-sm:gap-2">
          <span
            className="font-corpo font-light"
            style={{ fontSize: "12px", color: "rgba(253,248,240,0.25)" }}
          >
            © {year} {landingData.footer.copyright}. Todos os direitos reservados.
          </span>
          <span
            className="font-corpo font-light"
            style={{ fontSize: "12px", color: "rgba(253,248,240,0.25)" }}
          >
            Feito com atenção ao detalhe.
          </span>
        </div>
      </div>
    </>
  );
}
