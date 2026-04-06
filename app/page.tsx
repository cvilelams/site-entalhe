import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import MobileScrollCta from "@/components/home/MobileScrollCta";
import InstructorStats from "@/components/home/InstructorStats";
import { getContent, getVisibility } from "@/lib/content/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";

/* ── Previne viúvas tipográficas — substitui o último espaço por &nbsp; ── */
function pw(text: string): string {
  return text.replace(/\s(\S+)\s*$/, "\u00A0$1");
}

/* ── helpers de visibilidade ── */
function isVisible(
  visibility: Array<{ section: string; is_visible: boolean }>,
  section: string,
) {
  return visibility.some((v) => v.section === section && v.is_visible);
}

/* ── Label de seção (traço + texto uppercase) ── */
function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  const color = dark ? "#E8956A" : "#C4622D";
  return (
    <div className="flex items-center gap-3" style={{ color, marginBottom: "20px" }}>
      <span
        aria-hidden="true"
        style={{ display: "block", width: "24px", height: "1px", background: color, flexShrink: 0 }}
      />
      <span
        className="font-corpo font-medium uppercase text-label"
      >
        {children}
      </span>
    </div>
  );
}

/* ── Título de seção ── */
function SectionTitle({
  children,
  dark = false,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  dark?: boolean;
  as?: "h2" | "h3";
}) {
  return (
    <Tag
      className="font-titulo font-bold"
      style={{
        fontSize: "clamp(36px, 4vw, 54px)",
        lineHeight: 1.1,
        letterSpacing: "-0.025em",
        color: dark ? "#FDF8F0" : "#1A0F0A",
        marginBottom: "24px",
      }}
    >
      {children}
    </Tag>
  );
}

/* ── Botão CTA inline ── */
function CtaLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-corpo font-medium uppercase inline-block transition-all duration-200 hover:-translate-y-px hover:bg-espresso"
      style={{
        background: "#C4622D",
        color: "#FDF8F0",
        padding: "16px 36px",
        borderRadius: "2px",
        fontSize: "13px",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </Link>
  );
}

/* ════════════════════════════════════════════════ */
export default function HomePage() {
  const content = getContent();
  const visibility = getVisibility();
  const hero = content.sections.hero;
  const overview = content.sections.course_overview;
  const finalCta = content.sections.final_cta;
  const ctaUrl = hero?.cta_url ?? "#";
  const ctaText = hero?.cta_text ?? "QUERO ENTALHAR";

  const overviewCarouselUrls = [
    overview?.carousel_image_1_url,
    overview?.carousel_image_2_url,
    overview?.carousel_image_3_url,
    overview?.carousel_image_4_url,
    overview?.carousel_image_5_url,
  ].filter((url): url is string => Boolean(url && url.trim().length > 0));
  const overviewCarouselCount = overviewCarouselUrls.length >= 5 ? 5 : 3;
  const overviewCarouselItems = Array.from(
    { length: overviewCarouselCount },
    (_, i) => overviewCarouselUrls[i] ?? "",
  );
  const overviewGifUrl = overview?.gif_360_url?.trim() ?? "";

  /* padding base */
  const sectionPadding = "px-6 py-[72px] md:px-16 md:py-[120px]";
  const sectionPaddingMd = "px-6 py-[72px] md:px-16 md:py-[96px]";

  return (
    <main className="pb-32 md:pb-0">
      <Header ctaUrl={ctaUrl} ctaText={ctaText} />

      {/* ── HERO ── */}
      {isVisible(visibility, "hero") && (
        <HeroSection
          title={hero?.title}
          subtitle={hero?.subtitle}
          ctaUrl={ctaUrl}
          ctaText={ctaText}
          imageSrc="/images/hero/hero-bg-workshop-20260311.jpeg"
        />
      )}

      {/* ── STRIP DE CREDENCIAIS ── */}
      <div
        className="flex items-center justify-between overflow-hidden flex-wrap gap-4 px-6 py-5 md:px-16"
        style={{ background: "#1A0F0A" }}
      >
        {[
          "Acesso vitalício",
          "Suporte da comunidade",
          "Certificado de conclusão",
          "Sem pré-requisitos",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-[10px] font-corpo whitespace-nowrap"
            style={{
              color: "#E4D8C8",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#C4622D",
                flexShrink: 0,
              }}
            />
            {item}
          </div>
        ))}
      </div>

      {/* ── PROVA SOCIAL ── */}
      {isVisible(visibility, "social_proof") && (
        <>
          {/* Por que entalhar? */}
          <section
            className={`${sectionPadding}`}
            id="curso"
            style={{ background: "#FDF8F0" }}
          >
            <div className="mx-auto max-w-6xl space-y-16">
              {/* Bloco 1 — título + texto, imagem abaixo */}
              <div className="space-y-8">
                <div>
                  <SectionLabel>A prática</SectionLabel>
                  <SectionTitle>
                    Por que entalhar<br />
                    <em>com faca?</em>
                  </SectionTitle>
                  <h3
                    className="font-titulo font-bold text-espresso"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "16px" }}
                  >
                    Uma prática manual para uma vida melhor
                  </h3>
                  <p
                    className="font-corpo font-light text-body"
                    style={{ color: "#6B5344", marginBottom: "16px" }}
                  >
                    {pw("Numa sociedade cada vez mais virtual, desconectar-se e trabalhar com as mãos é uma atividade preciosa.")}
                  </p>
                  <p
                    className="font-corpo font-light text-body"
                    style={{ color: "#6B5344" }}
                  >
                    {pw("Quem já entalhou sabe como é uma atividade gostosa para a alma. E não só isso: o médico Drauzio Varella enfatiza como a manualidade ajuda a evitar o declínio cognitivo, reduzir o estresse e aumentar a sensação de bem-estar.")}
                  </p>
                </div>
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/mae-entalhando-oficina.webp"
                    alt="Mãe e filha entalhando juntas na oficina"
                    width={1095}
                    height={730}
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Bloco 2 */}
              <div className="space-y-8">
                <div>
                  <h3
                    className="font-titulo font-bold text-espresso"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "16px" }}
                  >
                    Desenvolver sua criatividade
                  </h3>
                  <p
                    className="font-corpo font-light text-body"
                    style={{ color: "#6B5344", marginBottom: "16px" }}
                  >
                    {pw("Após esculpir o famoso Davi de um enorme bloco de mármore, há quem diga que Michelangelo afirmou: \"Eu apenas tirei da pedra de mármore tudo que não era Davi\". Isso se aplica a qualquer atividade de entalhe: a retirada do que não importa para se revelar o que sempre esteve lá.")}
                  </p>
                  <p
                    className="font-corpo font-light text-body"
                    style={{ color: "#6B5344" }}
                  >
                    {pw("É muito satisfatório começar a entender um bloco rígido como uma potencial peça escultural, estimulando naturalmente diversas habilidades criativas e praticando sua expressão.")}
                  </p>
                </div>
              </div>

              {/* Bento grid — criações da oficina */}
              <div
                className="grid grid-cols-2 md:grid-cols-3 gap-2"
                style={{ gridAutoRows: "260px" }}
              >
                {/* A — pomba (1 col) */}
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/bento-pomba.webp"
                    alt="Pomba entalhada e pintada com detalhes realistas"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>

                {/* B — baleias (2 cols desktop, 1 col mobile) */}
                <div className="md:col-span-2 relative overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/bento-baleias.webp"
                    alt="Duas baleias entalhadas em madeira, pintadas de azul"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 67vw"
                  />
                </div>

                {/* C — ensaios (2 cols desktop, 1 col mobile) */}
                <div className="md:col-span-2 relative overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/bento-ensaios.webp"
                    alt="Suportes de tubos de ensaio entalhados em madeira com plantas"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 67vw"
                  />
                </div>

                {/* D — fruta (1 col) */}
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/bento-fruta.webp"
                    alt="Melancia entalhada e pintada com expressão divertida"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>

                {/* E — dino (1 col) */}
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/bento-dino.webp"
                    alt="Dinossauro entalhado em madeira natural"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>

                {/* F — geek (2 cols desktop, 1 col mobile) */}
                <div className="md:col-span-2 relative overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/bento-geek.webp"
                    alt="Mago entalhado em madeira, personagem de fantasia"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 67vw"
                  />
                </div>
              </div>

              {/* Bloco 3 + Bloco 4 — ferramentas */}
              <div className="space-y-4">
                {/* Bloco 3 — texto introdutório */}
                <div>
                  <h3
                    className="font-titulo font-bold text-espresso"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "16px" }}
                  >
                    Comece com poucas ferramentas
                  </h3>
                  <p
                    className="font-corpo font-light text-body"
                    style={{ color: "#6B5344", maxWidth: "560px" }}
                  >
                    {pw("Basicamente com um pedaço de madeira e uma faca de entalhe já podemos esculpir.")}
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/images/sections/capivarinha.webp"
                    alt="Bloco de madeira, faca de entalhe e capivara esculpida — do início ao resultado"
                    width={1024}
                    height={683}
                    className="w-full object-cover"
                  />
                </div>

                {/* Bloco 4 — card: kit de ferramentas */}
                <div className="bg-cream-2 hover:bg-cream-3 transition-colors duration-200 overflow-hidden">
                <div style={{ padding: "40px 36px" }}>
                  <h3
                    className="font-titulo font-bold text-espresso"
                    style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "16px" }}
                  >
                    Ainda não tenho nenhuma ferramenta…
                  </h3>
                  <p
                    className="font-corpo font-light text-body"
                    style={{ color: "#6B5344", maxWidth: "560px" }}
                  >
                    {pw("Preparamos kits para você iniciar e dar continuidade à prática do entalhe. Para te incentivar a começar agora, você tem desconto se comprá-los junto com o curso.")}
                  </p>
                  <div style={{ marginTop: "28px" }}>
                    <Link
                      href="#"
                      className="font-corpo font-medium uppercase inline-block transition-all duration-200 hover:-translate-y-px"
                      style={{
                        border: "1px solid #C4622D",
                        color: "#C4622D",
                        background: "transparent",
                        padding: "14px 32px",
                        borderRadius: "2px",
                        fontSize: "13px",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Comprar kit
                    </Link>
                  </div>
                </div>

                {/* Imagem sangrada — full-width, sem padding lateral */}
                <Image
                  src="/images/sections/ferramentas-kit.jpg"
                  alt="Kit de ferramentas para iniciantes no entalhe"
                  width={1024}
                  height={1024}
                  className="w-full object-cover"
                />
              </div>

              </div>{/* fim: Bloco 3 + Bloco 4 */}

              <div>
                <CtaLink href={ctaUrl}>{ctaText}</CtaLink>
              </div>
            </div>
          </section>

          {/* Cards de features — grade 2 colunas + banner full-width */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {/* Cards 01 e 02 — lado a lado */}
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: "2px" }}
            >
              {[
                {
                  num: "01",
                  title: "Não precisa de espaço",
                  desc: "Nós sabemos como maquinários e ferramentas ocupam espaço, e valorizamos muito a possibilidade de entalhar de qualquer lugar. Seja em casa, apartamento ou kitnet, em um parque, durante uma viagem. A praticidade do entalhe, que envolve basicamente você ter um pedaço de madeira e uma faca de entalhe, torna a atividade extremamente acessível.",
                },
                {
                  num: "02",
                  title: "Fonte de renda extra",
                  desc: "Temos alunos que já venderam suas peças em feiras, sendo super possível complementar a renda com suas próprias criações.",
                },
              ].map((item) => (
                <div
                  key={item.num}
                  className="bg-cream-2 hover:bg-cream-3 transition-colors duration-200"
                  style={{ padding: "40px 36px" }}
                >
                  <h3
                    className="font-titulo font-bold text-espresso mb-4"
                    style={{ fontSize: "20px", lineHeight: 1.25, letterSpacing: "-0.02em" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-corpo font-light text-sm-body"
                    style={{ color: "#6B5344" }}
                  >
                    {pw(item.desc)}
                  </p>
                </div>
              ))}
            </div>

            {/* Card 03 — banner full-width com layout horizontal */}
            <div
              className="bg-cream-2 hover:bg-cream-3 transition-colors duration-200 flex flex-col md:flex-row md:items-center"
              style={{ padding: "40px 36px", gap: "36px" }}
            >
              <div className="md:w-1/3 shrink-0">
                <h3
                  className="font-titulo font-bold text-espresso"
                  style={{ fontSize: "20px", lineHeight: 1.25, letterSpacing: "-0.02em" }}
                >
                  Será que esse curso é para mim?
                </h3>
              </div>
              <p
                className="font-corpo font-light text-sm-body md:w-2/3"
                style={{ color: "#6B5344" }}
              >
                {pw("Nosso curso é para todos: quem nunca entalhou na vida (inclusive costumamos tranquilizar nossos alunos pois a esmagadora maioria de fato nunca praticou), e também para quem já praticou e quer desenvolver ainda mais suas técnicas.")}
              </p>
            </div>
          </div>
        </>
      )}

      {/* ── VISÃO GERAL DO CURSO ── */}
      {isVisible(visibility, "course_overview") && (
        <section
          id="modulos"
          className={sectionPadding}
          style={{ background: "#FDF8F0" }}
        >
          <div className="mx-auto max-w-6xl">
            <SectionLabel>O curso</SectionLabel>
            <SectionTitle>{overview?.title}</SectionTitle>
            <p
              className="font-corpo font-light text-body"
              style={{
                color: "#6B5344",
                maxWidth: "560px",
                marginBottom: "64px",
              }}
            >
              {overview?.description}
            </p>

            {/* Grade de módulos — gap:2px */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{ gap: "2px", marginBottom: "40px" }}
            >
              {content.collections.modules.map((m) => (
                <div
                  key={m.id}
                  className="bg-cream-2 hover:bg-cream-3 transition-colors duration-200"
                  style={{ padding: "40px 36px" }}
                >
                  <div
                    className="font-titulo font-black"
                    style={{
                      fontSize: "56px",
                      lineHeight: 1,
                      color: "#D4C4B0",
                      letterSpacing: "-0.04em",
                      marginBottom: "24px",
                    }}
                  >
                    {m.icon}
                  </div>
                  <h3
                    className="font-titulo font-bold text-espresso"
                    style={{ fontSize: "20px", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "12px" }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="font-corpo font-light text-sm-body"
                    style={{ color: "#6B5344" }}
                  >
                    {m.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Carrossel de imagens */}
            <div className="overflow-hidden pb-2">
              <div className="carousel-track">
                {overviewCarouselItems.map((imageUrl, index) => (
                  <div
                    key={`overview-${index}`}
                    className="flex min-h-52 min-w-[280px] overflow-hidden"
                    style={{ background: "#F0E8DC" }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`Imagem do curso ${index + 1}`}
                        width={1024}
                        height={768}
                        className="h-full min-h-52 w-full object-cover"
                      />
                    ) : (
                      <>
                        <div
                          className="h-full min-h-52 w-full"
                          style={{ background: "linear-gradient(135deg, #FDF8F0 0%, #F0E8DC 50%, #E4D8C8 100%)" }}
                          aria-hidden="true"
                        />
                        <span className="sr-only">{`Imagem do carrossel do curso ${index + 1}`}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p
              className="font-corpo font-light mt-10 text-body"
              style={{ color: "#6B5344", maxWidth: "560px" }}
            >
              {pw("Você vai absorver, na prática, todos esses fundamentos partindo de um bloco maciço que se transformará em uma capivara.")}
            </p>

            {overviewGifUrl ? (
              <div className="mt-6 overflow-hidden rounded-lg">
                {overviewGifUrl.endsWith(".webm") || overviewGifUrl.endsWith(".mp4") ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-auto w-full object-cover"
                    aria-label="Capivara em visualização 360 graus"
                  >
                    <source src={overviewGifUrl} type="video/webm" />
                  </video>
                ) : (
                  <Image
                    src={overviewGifUrl}
                    alt="Capivara em visualização 360 graus"
                    width={1024}
                    height={1024}
                    className="h-auto w-full object-cover"
                    unoptimized
                  />
                )}
              </div>
            ) : (
              <div
                className="mt-6 overflow-hidden"
                style={{ minHeight: "224px", background: "#F0E8DC" }}
              >
                <div
                  className="h-full min-h-56 w-full"
                  style={{ background: "linear-gradient(135deg, #FDF8F0 0%, #F0E8DC 50%, #E4D8C8 100%)" }}
                  aria-hidden="true"
                />
                <span className="sr-only">Animação em 360 graus da capivara</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── O QUE VOCÊ RECEBE ── */}
      {isVisible(visibility, "instructors") && (
        <section
          className={sectionPadding}
          style={{ background: "#F0E8DC" }}
        >
          <div className="mx-auto max-w-6xl">
            <SectionLabel>O que você recebe</SectionLabel>
            <SectionTitle>XX horas · XX aulas</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 md:items-start" style={{ gap: "64px", marginTop: "40px" }}>
              <div>
                <p
                  className="font-corpo font-light text-body"
                  style={{ color: "#6B5344", marginBottom: "24px" }}
                >
                  Compre o curso e ganhe um e-book com 10 projetos de entalhe.
                </p>
                <p
                  className="font-corpo font-light text-body"
                  style={{ color: "#6B5344", marginBottom: "24px" }}
                >
                  Além disso, você vai poder interagir e tirar suas dúvidas no fórum de entalhe.
                </p>
                <p
                  className="font-corpo font-light text-body"
                  style={{ color: "#6B5344", marginBottom: "24px" }}
                >
                  Disponível para celular, tablet e computador.
                </p>
                {/* Pull quote */}
                <p
                  className="font-titulo font-bold"
                  style={{
                    fontSize: "20px",
                    lineHeight: 1.35,
                    letterSpacing: "-0.02em",
                    color: "#C4622D",
                    borderLeft: "3px solid #C4622D",
                    paddingLeft: "28px",
                    marginBottom: "40px",
                  }}
                >
                  Assista no seu tempo: o curso fica disponível de forma vitalícia.
                </p>
                <CtaLink href={ctaUrl}>{ctaText}</CtaLink>
              </div>
              <div
                className="overflow-hidden"
                style={{ minHeight: "256px", background: "#E4D8C8" }}
              >
                <div
                  className="h-full min-h-64 w-full"
                  style={{ background: "linear-gradient(135deg, #F0E8DC 0%, #E4D8C8 100%)" }}
                  aria-hidden="true"
                />
                <span className="sr-only">Montagem do e-book em celular, tablet e computador</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── QUEM ENSINA — seção escura ── */}
      {isVisible(visibility, "instructors") && (
        <section
          id="instrutor"
          style={{ background: "#0D0705" }}
        >
          {/* Faixa decorativa no topo */}
          <div
            aria-hidden="true"
            style={{
              height: "4px",
              background: "linear-gradient(90deg, #3A1F0E 0%, #E8956A 50%, #3A1F0E 100%)",
            }}
          />

          {/* Conteúdo centralizado */}
          <div
            className="mx-auto max-w-3xl flex flex-col px-6 md:px-10"
            style={{ paddingTop: "96px", paddingBottom: "96px" }}
          >
            <SectionLabel dark>Quem ensina</SectionLabel>

            <h2
              className="font-titulo font-black"
              style={{
                fontSize: "clamp(36px, 3vw, 48px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#FDF8F0",
                marginBottom: "8px",
              }}
            >
              Mentoras
            </h2>
            <div
              className="font-corpo font-light uppercase"
              style={{
                fontSize: "13px",
                color: "#E8956A",
                letterSpacing: "0.1em",
                marginBottom: "40px",
              }}
            >
              Mayra e Simone — Arquitetura &amp; Entalhe
            </div>

            <div
              className="overflow-hidden mb-8"
              style={{ maxHeight: "56vh", borderRadius: "2px" }}
            >
              <Image
                src="/images/sections/mentoras.jpg"
                alt="Mayra e Simone"
                width={1024}
                height={1024}
                className="w-full object-cover object-top"
                style={{ maxHeight: "56vh" }}
              />
            </div>

            <p
              className="font-corpo font-light"
              style={{
                fontSize: "16px",
                lineHeight: 1.75,
                color: "rgba(253,248,240,0.65)",
                marginBottom: "48px",
              }}
            >
              {pw("Somos Mayra e Simone, duas irmãs que compartilham das mesmas afinidades desde a infância. Cursamos Arquitetura e Urbanismo e, há anos, decidimos trabalhar juntas na marcenaria. No meio do caminho, nos apaixonamos pela técnica de entalhe e hoje criamos peças artísticas selecionadas e premiadas em Salões de Arte.")}
            </p>

            <InstructorStats />

            <div style={{ marginTop: "40px" }}>
              <CtaLink href={ctaUrl}>{ctaText}</CtaLink>
            </div>
          </div>
        </section>
      )}

      {/* ── CONFIANÇA — stats ── */}
      <section
        className={sectionPaddingMd}
        style={{ background: "#FDF8F0" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Confiança</SectionLabel>
          <SectionTitle>
            Por que esse curso<br />
            <em>é confiável?</em>
          </SectionTitle>

          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: "2px", marginTop: "40px" }}
          >
            {[
              { n: "700+",    l: "Alunos em todo o Brasil" },
              { n: "Vitalício", l: "Acesso para rever quando quiser" },
              { n: "Suporte", l: "Dúvidas respondidas no fórum" },
            ].map((stat) => (
              <div
                key={stat.l}
                style={{ background: "#F0E8DC", padding: "40px 36px" }}
              >
                <span
                  className="font-titulo font-black block"
                  style={{
                    fontSize: "clamp(32px, 3vw, 48px)",
                    color: "#1A0F0A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {stat.n}
                </span>
                <span
                  className="font-corpo block"
                  style={{
                    fontSize: "11px",
                    color: "#9C7E6A",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginTop: "8px",
                  }}
                >
                  {stat.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANOS / PREÇOS ── */}
      <section
        id="planos"
        className={sectionPadding}
        style={{ background: "#F0E8DC" }}
      >
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Investimento</SectionLabel>
          <SectionTitle>
            Escolha o seu<br />
            <em>ritmo</em>
          </SectionTitle>
          <p
            className="font-corpo font-light text-body"
            style={{
              color: "#6B5344",
              maxWidth: "560px",
              marginBottom: "64px",
            }}
          >
            Acesso imediato a todo o conteúdo. Sem cobranças surpresa.
          </p>

          {/* Grade de planos — gap:2px */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 max-w-[800px]"
            style={{ gap: "2px" }}
          >
            {/* Parcelado */}
            <div style={{ background: "#E4D8C8", padding: "48px 40px" }}>
              <span
                className="font-corpo font-medium uppercase block"
                style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#C4622D", marginBottom: "20px" }}
              >
                Parcelado
              </span>
              <div
                className="font-titulo font-black"
                style={{ fontSize: "54px", letterSpacing: "-0.04em", lineHeight: 1, color: "#1A0F0A", marginBottom: "4px" }}
              >
                —
              </div>
              <ul
                className="space-y-3"
                style={{ marginTop: "24px", marginBottom: "40px", listStyle: "none", padding: 0 }}
              >
                {["Acesso vitalício", "Suporte no fórum", "E-book bônus"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-[10px] font-corpo font-light text-sm-body"
                    style={{ color: "#6B5344" }}
                  >
                    <Check className="h-4 w-4 shrink-0" style={{ color: "#C4622D" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={ctaUrl}
                className="font-corpo font-medium uppercase block text-center transition-colors hover:bg-cream-3"
                style={{
                  border: "1px solid #D4C4B0",
                  background: "transparent",
                  color: "#1A0F0A",
                  padding: "14px",
                  borderRadius: "2px",
                  fontSize: "13px",
                  letterSpacing: "0.07em",
                }}
              >
                Começar
              </Link>
            </div>

            {/* À vista — destaque */}
            <div style={{ background: "#1A0F0A", padding: "48px 40px" }}>
              <span
                className="font-corpo font-medium uppercase block"
                style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#E8956A", marginBottom: "8px" }}
              >
                Melhor custo-benefício
              </span>
              <span
                className="font-corpo font-medium uppercase block"
                style={{ fontSize: "11px", letterSpacing: "0.14em", color: "rgba(253,248,240,0.5)", marginBottom: "16px" }}
              >
                À vista
              </span>
              <div
                className="font-titulo font-black"
                style={{ fontSize: "54px", letterSpacing: "-0.04em", lineHeight: 1, color: "#FDF8F0", marginBottom: "4px" }}
              >
                —
              </div>
              <ul
                className="space-y-3"
                style={{ marginTop: "24px", marginBottom: "40px", listStyle: "none", padding: 0 }}
              >
                {["Acesso vitalício", "Suporte no fórum", "E-book bônus"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-[10px] font-corpo font-light text-sm-body"
                    style={{ color: "rgba(253,248,240,0.7)" }}
                  >
                    <Check className="h-4 w-4 shrink-0" style={{ color: "#E8956A" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={ctaUrl}
                className="font-corpo font-medium uppercase block text-center transition-all hover:-translate-y-px hover:bg-espresso"
                style={{
                  background: "#C4622D",
                  color: "#FDF8F0",
                  padding: "14px",
                  borderRadius: "2px",
                  fontSize: "13px",
                  letterSpacing: "0.07em",
                  border: "1px solid #C4622D",
                }}
              >
                {ctaText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {isVisible(visibility, "faq") && (
        <section
          className={sectionPadding}
          style={{ background: "#FDF8F0" }}
        >
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Dúvidas comuns</SectionLabel>
            <SectionTitle>
              Perguntas<br />
              <em>frequentes</em>
            </SectionTitle>

            <Accordion
              type="single"
              collapsible
              className="grid"
              style={{ gap: "2px", marginTop: "48px" }}
            >
              {content.collections.faq.map((f) => (
                <AccordionItem
                  key={f.id}
                  value={f.id}
                  className="border-none"
                  style={{ background: "#F0E8DC" }}
                >
                  <AccordionTrigger
                    className="font-titulo font-bold text-espresso text-left hover:no-underline"
                    style={{
                      fontSize: "18px",
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      padding: "28px 36px",
                    }}
                  >
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="font-corpo font-light"
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: "#6B5344",
                      padding: "0 36px 28px",
                    }}
                  >
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* ── FAIXA CTA TERRACOTA ── */}
      {isVisible(visibility, "final_cta") && (
        <div
          className="grid grid-cols-1 gap-10 items-center md:gap-16 px-6 py-[72px] md:px-16 md:py-[96px] md:grid-cols-[1fr_auto]"
          style={{ background: "#C4622D" }}
        >
          <div>
            <h2
              className="font-titulo font-black"
              style={{
                fontSize: "clamp(36px, 4vw, 52px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#FDF8F0",
              }}
            >
              {finalCta?.title}
            </h2>
            <p
              className="font-corpo font-light mt-4"
              style={{ fontSize: "16px", color: "rgba(253,248,240,0.7)", lineHeight: 1.6 }}
            >
              {finalCta?.subtitle}
            </p>
          </div>
          <Link
            href={finalCta?.button_url ?? "#"}
            className="font-corpo font-medium uppercase inline-block whitespace-nowrap text-center transition-all hover:-translate-y-px hover:bg-espresso hover:text-cream w-full md:w-auto"
            style={{
              background: "#FDF8F0",
              color: "#C4622D",
              padding: "18px 40px",
              borderRadius: "2px",
              fontSize: "13px",
              letterSpacing: "0.08em",
              flexShrink: 0,
            }}
          >
            {finalCta?.button_text}
          </Link>
        </div>
      )}

      <MobileScrollCta ctaUrl={ctaUrl} ctaText={ctaText} threshold={0.22} />
      <Footer />
    </main>
  );
}
