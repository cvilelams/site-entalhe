import Link from "next/link";
import HeroParallaxBackground from "@/components/home/HeroParallaxBackground";

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
      <em key={i} style={{ fontStyle: "italic", color: "#E07840" }}>
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: "88px" }}
    >
      <HeroParallaxBackground imageSrc={imageSrc} />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 w-full max-w-3xl">
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
            style={{ fontSize: "11px", letterSpacing: "0.18em", color: "#FDF8F0" }}
          >
            Curso de Entalhe em Madeira
          </span>
          <span
            aria-hidden="true"
            style={{ display: "block", width: "32px", height: "1px", background: "#C4622D", flexShrink: 0 }}
          />
        </div>

        {/* Headline */}
        <h1
          className="font-titulo font-black"
          style={{
            fontSize: "clamp(52px, 6vw, 80px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
            color: "#FDF8F0",
          }}
        >
          {title ? renderTitleWithAccent(title) : "Aprenda a\u00a0entalhar\u00a0madeira"}
        </h1>

        {/* Subtítulo */}
        <p
          className="font-corpo font-light"
          style={{
            fontSize: "20px",
            lineHeight: 1.75,
            color: "rgba(253, 248, 240, 0.88)",
            maxWidth: "540px",
            marginBottom: "48px",
          }}
        >
          {subtitle}
        </p>

        {/* Ações */}
        <div className="flex justify-center">
          <Link
            href={ctaUrl ?? "#"}
            className="font-corpo font-medium uppercase inline-block transition-all hover:-translate-y-px hover:bg-espresso"
            style={{
              background: "#C4622D",
              color: "#FDF8F0",
              padding: "20px 72px",
              borderRadius: "2px",
              fontSize: "15px",
              letterSpacing: "0.08em",
            }}
          >
            {ctaText ?? "Começar agora"}
          </Link>
        </div>
      </div>
    </section>
  );
}
