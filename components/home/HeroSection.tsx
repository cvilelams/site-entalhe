import Link from "next/link";
import Image from "next/image";

type HeroSectionProps = {
  title?: string | null;
  subtitle?: string | null;
  ctaUrl?: string | null;
  ctaText?: string | null;
  imageSrc: string;
};

function renderTitleWithAccent(title: string) {
  const parts = title.split(/\b(entalhe)\b/i);
  return parts.map((part, i) =>
    part.toLowerCase() === "entalhe" ? (
      <em key={i} style={{ fontStyle: "italic", color: "#C4622D" }}>
        {part}
      </em>
    ) : (
      part
    ),
  );
}

export default function HeroSection({
  title,
  subtitle,
  ctaUrl,
  ctaText,
  imageSrc,
}: HeroSectionProps) {
  return (
    <section
      className="grid min-h-screen max-md:grid-cols-1 lg:grid-cols-2"
      style={{ paddingTop: "88px" }}
    >
      {/* Coluna esquerda — tipografia e CTA */}
      <div
        className="flex flex-col justify-center"
        style={{
          background: "#FDF8F0",
          padding: "96px 64px",
        }}
      >
        {/* Label de seção */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{ color: "#C4622D" }}
        >
          <span
            aria-hidden="true"
            style={{ display: "block", width: "32px", height: "1px", background: "#C4622D", flexShrink: 0 }}
          />
          <span
            className="font-corpo font-medium uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            Curso de Entalhe em Madeira
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-titulo font-black text-espresso"
          style={{
            fontSize: "clamp(52px, 6vw, 80px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
          }}
        >
          {title ? renderTitleWithAccent(title) : "Aprenda a\u00a0entalhar\u00a0madeira"}
        </h1>

        {/* Subtítulo */}
        <p
          className="font-corpo font-light"
          style={{
            fontSize: "17px",
            lineHeight: 1.75,
            color: "#6B5344",
            maxWidth: "420px",
            marginBottom: "48px",
          }}
        >
          {subtitle}
        </p>

        {/* Ações */}
        <div className="flex items-center gap-8 flex-wrap">
          <Link
            href={ctaUrl ?? "#"}
            className="font-corpo font-medium uppercase inline-block transition-all hover:-translate-y-px hover:bg-espresso"
            style={{
              background: "#C4622D",
              color: "#FDF8F0",
              padding: "16px 36px",
              borderRadius: "2px",
              fontSize: "13px",
              letterSpacing: "0.08em",
            }}
          >
            {ctaText ?? "Começar agora"}
          </Link>
          <a
            href="#curso"
            className="font-corpo transition-colors hover:text-espresso hover:border-espresso"
            style={{
              fontSize: "13px",
              color: "#9C7E6A",
              fontWeight: 400,
              borderBottom: "1px solid #D4C4B0",
              paddingBottom: "2px",
            }}
          >
            Ver o programa
          </a>
        </div>
      </div>

      {/* Coluna direita — foto */}
      <div className="relative overflow-hidden max-md:min-h-[50vh]" style={{ background: "#1A0F0A" }}>
        <Image
          src={imageSrc}
          alt="Workshop de entalhe em madeira"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center"
        />
        {/* Overlay com gradiente sutil na base */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "40%",
            background: "linear-gradient(to top, rgba(13,7,5,0.65) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </section>
  );
}
