"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import cursoCompleto from "@/public/images/sections/cursocompleto.png";
import { landingData } from "@/lib/landing-data";
import { trackCTAClick } from "@/lib/analytics";

const CARD_WIDTH = 306;
const CARD_GAP = 24;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;
const AUTOPLAY_MS = 5000;
const INTERACTION_PAUSE_MS = 10000;

function pw(text: string): string {
  return text.replace(/\s(\S+)\s*$/, "\u00A0$1");
}

type QuickCoursesSectionProps = {
  completeCtaUrl: string;
};

function CompleteCourseTeaser({ ctaUrl }: { ctaUrl: string }) {
  return (
    <div
      id="curso-completo"
      className="complete-teaser scroll-mt-28"
      aria-label="Curso completo"
    >
      <div>
        <div className="eyebrow mb-5 flex items-center gap-3">
          <span aria-hidden className="block h-px w-6 shrink-0 bg-current" />
          <span className="font-corpo text-label font-medium uppercase">
            curso completo
          </span>
        </div>
        <p className="bridge-text mb-8">
          {pw("E para você que quer se aprofundar na técnica, temos o nosso curso completo")}{" "}
          <em>“Entalhe em Madeira com Faca”</em>.
        </p>
        <Link
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCTAClick("teaser_curso_completo", ctaUrl)}
          className="font-corpo inline-block w-fit rounded-sm bg-terracota px-8 py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.08em] text-cream transition-all duration-200 hover:-translate-y-px hover:bg-terracotta-deep"
        >
          Quero o curso completo
        </Link>
      </div>

      <div className="teaser-image">
        <Image
          src={cursoCompleto}
          alt="Mayra e Simone, mentoras do curso, com peças entalhadas sobre a mesa"
          fill
          className="object-cover object-center"
          sizes="(max-width: 859px) 100vw, 58vw"
        />
      </div>
    </div>
  );
}

export default function QuickCoursesSection({ completeCtaUrl }: QuickCoursesSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const [canScroll, setCanScroll] = useState(false);

  const pauseForInteraction = useCallback((ms = INTERACTION_PAUSE_MS) => {
    pauseUntilRef.current = Date.now() + ms;
  }, []);

  const updateCanScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScroll(el.scrollWidth > el.clientWidth + 8);
  }, []);

  useEffect(() => {
    updateCanScroll();
    const el = scrollerRef.current;
    if (!el) return;

    const onResize = () => updateCanScroll();
    window.addEventListener("resize", onResize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      return () => window.removeEventListener("resize", onResize);
    }

    const timer = window.setInterval(() => {
      if (hoverRef.current || Date.now() < pauseUntilRef.current) return;
      const track = scrollerRef.current;
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 8) return;
      if (track.scrollLeft >= max - 8) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
      }
    }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [updateCanScroll]);

  return (
    <section
      id="cursos-rapidos"
      className="quick-section scroll-mt-28 bg-walnut px-6 py-[72px] md:px-16 md:py-[120px]"
      aria-labelledby="cursos-rapidos-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-[38rem] min-[860px]:mb-12">
          <div className="mb-5 flex items-center gap-3 text-[#E3B48C]">
            <span aria-hidden className="block h-px w-6 shrink-0 bg-current" />
            <span className="font-corpo text-label font-medium uppercase">
              cursos rápidos
            </span>
          </div>
          <h2
            id="cursos-rapidos-title"
            className="font-titulo mb-6 text-h2 font-bold text-walnut-text"
          >
            Aprenda uma técnica <em className="text-[#E3B48C]">específica</em>
          </h2>
          <div className="font-corpo text-body space-y-4 font-light text-[#C7B49C]">
            <p>
              {pw(
                  "Nossos cursos rápidos foram formulados para você ter o primeiro contato com o universo do entalhe com faca, iniciando nessa jornada sem muito custo, ou para se aprofundar em algum processo ou técnica específica da prática.",
              )}
            </p>
            <p className="text-[15px]">
              {pw(
                "Observação: os cursos rápidos não substituem o curso completo. Por serem de menor duração, não são focados nos detalhes da prática. Para ter uma base sólida e assim entalhar com mais eficiência e segurança, recomendamos o curso completo.",
              )}
            </p>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Lista de cursos rápidos"
          className="min-w-0"
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
          onFocusCapture={() => {
            hoverRef.current = true;
          }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              hoverRef.current = false;
            }
          }}
          onPointerDown={() => pauseForInteraction()}
        >
          <div
            ref={scrollerRef}
            className="quick-courses-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {landingData.quickCourses.map((course) => (
              <article
                key={course.id}
                className="flex w-[306px] shrink-0 snap-start flex-col bg-cream shadow-[0_12px_32px_rgba(0,0,0,.35)]"
              >
                <div className="relative h-[196px] overflow-hidden">
                  <Image
                    src={course.imageSrc.replace(/[^/]+$/, (file) => encodeURIComponent(file))}
                    alt={course.imageAlt}
                    fill
                    className="object-cover"
                    sizes="306px"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 py-6">
                  <h3 className="font-titulo mb-3 text-[18.5px] font-bold leading-[1.25] tracking-[-0.02em] text-ink">
                    {course.title}
                  </h3>
                  <p className="font-corpo mb-5 flex-1 text-sm font-light leading-[1.65] text-ink-soft">
                    {course.description}
                  </p>
                  <div className="border-t border-line pt-4">
                    <p className="font-titulo mb-1 text-xl font-bold tracking-[-0.02em] text-ink">
                      {course.priceInstallments}
                    </p>
                    <p className="font-corpo mb-5 text-sm font-light text-ink-soft">
                      {course.priceCash}{" "}
                      <span className="font-medium uppercase tracking-[0.08em]">
                        à vista
                      </span>
                      {" · "}
                      {course.access}
                    </p>
                    <Link
                      href={course.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackCTAClick(`curso_rapido_${course.id}`, course.ctaUrl)
                      }
                      className="font-corpo inline-block w-full rounded-sm bg-terracota py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.08em] text-cream transition-all duration-200 hover:-translate-y-px hover:bg-terracotta-deep"
                    >
                      Quero entalhar
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            <article
              className="flex w-[306px] shrink-0 snap-start flex-col justify-center border-[1.5px] border-dashed border-walnut-text/25 bg-transparent px-8 py-10 text-[#C7B49C]"
              aria-label="Próximos cursos"
            >
              <p className="font-corpo text-label mb-4 font-medium uppercase">
                em breve
              </p>
              <h3 className="font-titulo mb-3 text-[18.5px] font-bold leading-[1.25] tracking-[-0.02em]">
                Novos cursos rápidos
              </h3>
              <p className="font-corpo text-sm font-light leading-[1.65]">
                {pw("Espaço para os próximos projetos de curta duração.")}
              </p>
            </article>
          </div>
          {!canScroll ? null : (
            <p className="font-corpo mt-4 text-caption text-[#C7B49C] min-[860px]:hidden">
              Deslize para ver mais cursos
            </p>
          )}
        </div>

        <CompleteCourseTeaser ctaUrl={completeCtaUrl} />
      </div>
    </section>
  );
}
