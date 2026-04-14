import HeroParallaxBackground from "@/components/home/HeroParallaxBackground";
import LandingPrimaryCtaLink from "@/components/home/LandingPrimaryCtaLink";

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
      <em key={i} className="italic text-highlight">
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
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-[88px]">
      <HeroParallaxBackground imageSrc={imageSrc} />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 w-full max-w-3xl">
        {/* Label de seção */}
        <div className="mb-8 flex items-center gap-3 text-terracota">
          <span aria-hidden className="block h-px w-8 shrink-0 bg-terracota" />
          <span className="font-corpo text-label font-medium uppercase text-cream">
            Curso de Entalhe em Madeira
          </span>
          <span aria-hidden className="block h-px w-8 shrink-0 bg-terracota" />
        </div>

        {/* Headline */}
        <h1 className="font-titulo mb-10 text-h1 font-black text-cream">
          {title ? renderTitleWithAccent(title) : "Aprenda a\u00a0entalhar\u00a0madeira"}
        </h1>

        {/* Subtítulo */}
        <p className="font-corpo mb-12 max-w-[540px] text-xl font-light leading-[1.75] text-cream/90">
          {subtitle}
        </p>

        {/* Ações */}
        <div className="flex justify-center">
          <LandingPrimaryCtaLink href={ctaUrl ?? "#"} variant="filled">
            {ctaText ?? "Começar agora"}
          </LandingPrimaryCtaLink>
        </div>
      </div>
    </section>
  );
}
