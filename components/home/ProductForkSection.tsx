"use client";

import Image from "next/image";
import capivarinha from "@/public/images/sections/capivarinha.webp";
import fotoBannerMinicurso from "@/public/images/sections/foto-banner-minicurso-passaro.jpg";
import { trackLinkClick } from "@/lib/analytics";

function pw(text: string): string {
  return text.replace(/\s(\S+)\s*$/, "\u00A0$1");
}

export default function ProductForkSection() {
  return (
    <section
      id="para-quem"
      className="bg-cream px-6 pb-0 pt-[72px] md:px-16 md:pb-0 md:pt-[120px]"
      aria-labelledby="fork-title"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 min-[860px]:grid-cols-[0.82fr_1.18fr] min-[860px]:gap-16 min-[860px]:items-start">
        <div className="min-[860px]:sticky min-[860px]:top-28">
          <div className="mb-5 flex items-center gap-3 text-terracota">
            <span aria-hidden className="block h-px w-6 shrink-0 bg-current" />
            <span className="font-corpo text-label font-medium uppercase">para quem é</span>
          </div>
          <h2
            id="fork-title"
            className="font-titulo mb-6 text-h2 font-bold text-espresso"
          >
            Será que o entalhe em madeira
            <br />
            <em>é para mim?</em>
          </h2>
          <div className="font-corpo text-body max-w-[42ch] space-y-4 font-light text-ink-soft">
            <p>
              {pw(
                "Nossos cursos são para todos: quem nunca entalhou na vida (inclusive costumamos tranquilizar nossos alunos, pois a esmagadora maioria de fato nunca praticou), e também para quem já praticou e quer desenvolver ainda mais suas técnicas.",
              )}
            </p>
            <p className="font-bold">{pw("E temos opções que se encaixam na sua rotina:")}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <article className="relative min-h-[320px] overflow-hidden bg-walnut md:min-h-[360px]">
            <div className="wood-grain-overlay absolute inset-0">
              <Image
                src={capivarinha}
                alt="Capivara entalhada em madeira, peça do curso completo"
                fill
                className="object-cover object-right"
                sizes="(max-width: 860px) 100vw, 58vw"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(23,17,12,.88) 0%, rgba(23,17,12,.62) 45%, rgba(23,17,12,.30) 100%)",
                }}
              />
            </div>

            <div className="relative z-10 flex h-full min-h-[320px] max-w-[28rem] flex-col justify-center px-8 py-10 md:min-h-[360px] md:px-10 md:py-12">
              <h3 className="font-titulo mb-4 text-[clamp(24px,2.2vw,32px)] font-bold leading-[1.15] tracking-[-0.02em] text-walnut-text">
                Entalhe em Madeira com Faca
              </h3>
              <p className="font-corpo mb-6 text-[15px] font-light leading-[1.7] text-walnut-text/80">
                {pw(
                  "Todos os fundamentos da prática no curso “Entalhe em Madeira com Faca”.",
                )}
              </p>
              <p className="font-corpo mb-8 text-sm font-light text-walnut-text/75">
                12x de{" "}
                <strong className="font-medium text-walnut-text">R$&nbsp;49,64</strong>
                {" · "}
                R$&nbsp;480 à vista
              </p>
              <a
                href="#curso-completo"
                onClick={() => trackLinkClick("fork_completo", "#curso-completo")}
                className="font-corpo inline-block w-fit rounded-sm bg-terracota px-8 py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.08em] text-cream transition-all duration-200 hover:-translate-y-px hover:bg-terracotta-deep"
              >
                Quero o curso completo
              </a>
            </div>
          </article>

          <article className="relative min-h-[320px] overflow-hidden bg-walnut md:min-h-[360px]">
            <div className="wood-grain-overlay absolute inset-0">
              <Image
                src={fotoBannerMinicurso}
                alt="Pássaro entalhado em madeira, peça dos cursos rápidos"
                fill
                className="object-cover object-right"
                sizes="(max-width: 860px) 100vw, 58vw"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(23,17,12,.88) 0%, rgba(23,17,12,.62) 45%, rgba(23,17,12,.30) 100%)",
                }}
              />
            </div>

            <div className="relative z-10 flex h-full min-h-[320px] max-w-[28rem] flex-col justify-center px-8 py-10 md:min-h-[360px] md:px-10 md:py-12">
              <h3 className="font-titulo mb-4 text-[clamp(24px,2.2vw,32px)] font-bold leading-[1.15] tracking-[-0.02em] text-walnut-text">
                Cursos rápidos
              </h3>
              <p className="font-corpo mb-6 text-[15px] font-light leading-[1.7] text-walnut-text/80">
                {pw(
                  "Aulas introdutórias ou temas específicos de curta duração.",
                )}
              </p>
              <p className="font-corpo mb-8 text-sm font-light text-walnut-text/75">
                a partir de 12x de{" "}
                <strong className="font-medium text-walnut-text">R$&nbsp;5,16</strong>
                {" · "}
                R$&nbsp;49,90 à vista
              </p>
              <a
                href="#cursos-rapidos"
                onClick={() => trackLinkClick("fork_ver_cursos", "#cursos-rapidos")}
                className="font-corpo inline-block w-fit rounded-sm bg-cream px-8 py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.08em] text-terracota transition-all duration-200 hover:-translate-y-px hover:bg-cream-2"
              >
                Ver cursos
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
