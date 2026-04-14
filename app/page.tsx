import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import { CourseOverviewBento } from "@/components/home/CourseOverviewBento";
import { OverviewFinalMedia } from "@/components/home/OverviewFinalMedia";
import MobileScrollCta from "@/components/home/MobileScrollCta";
import LandingPrimaryCtaLink from "@/components/home/LandingPrimaryCtaLink";
import InstructorCarousel from "@/components/home/InstructorCarousel";
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
  return (
    <div
      className={`mb-5 flex items-center gap-3 ${dark ? "text-terra-lt" : "text-terracota"}`}
    >
      <span aria-hidden className="block h-px w-6 shrink-0 bg-current" />
      <span className="font-corpo text-label font-medium uppercase">{children}</span>
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
      className={`font-titulo mb-6 text-h2 font-bold ${
        dark ? "text-cream" : "text-espresso"
      }`}
    >
      {children}
    </Tag>
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

  /* padding base */
  const sectionPadding = "px-6 py-[72px] md:px-16 md:py-[120px]";
  const sectionPaddingMd = "px-6 py-[72px] md:px-16 md:py-[96px]";

  return (
    <main>
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

      {/* ── PROVA SOCIAL ── */}
      {isVisible(visibility, "social_proof") && (
        <>
          {/* A prática */}
          <section className={`${sectionPadding} bg-cream`} id="curso">
            <div className="mx-auto max-w-6xl space-y-16">
              {/* Card 1 — SectionTitle dentro do cartão, elimina hierarquia dupla */}
              <div className="space-y-8">
                <div>
                  <SectionLabel>A prática</SectionLabel>
                  <SectionTitle>
                    Por que entalhar<br />
                    <em>com faca?</em>
                  </SectionTitle>
                  <p className="font-corpo text-body mb-4 font-light text-brown">
                    {pw("Numa sociedade cada vez mais virtual, desconectar-se e trabalhar com as mãos é uma atividade preciosa.")}
                  </p>
                  <p className="font-corpo text-body font-light text-brown">
                    {pw("Quem já entalhou sabe como é uma atividade gostosa para a alma. E não só isso: o médico Drauzio Varella enfatiza como a manualidade ajuda a evitar o declínio cognitivo, reduzir o estresse e aumentar a sensação de bem-estar.")}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={`/images/sections/${encodeURIComponent("1_mãeentalhando (2).webp")}`}
                      alt="Mãe concentrada no entalhe à mesa, com ferramentas e madeira"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                    <Image
                      src={`/images/sections/${encodeURIComponent("1_mãeentalhando (1) (1).webp")}`}
                      alt="Mãe e criança entalhando madeira juntas em ambiente acolhedor"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2 — Criatividade */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-titulo mb-4 text-h3 font-bold text-espresso">
                    Desenvolver sua criatividade
                  </h3>
                  <p className="font-corpo text-body mb-4 font-light text-brown">
                    {pw("Após esculpir o famoso Davi de um enorme bloco de mármore, há quem diga que Michelangelo afirmou: \"Eu apenas tirei da pedra de mármore tudo que não era Davi\". Isso se aplica a qualquer atividade de entalhe: a retirada do que não importa para se revelar o que sempre esteve lá.")}
                  </p>
                  <p className="font-corpo text-body font-light text-brown">
                    {pw("É muito satisfatório começar a entender um bloco rígido como uma potencial peça escultural, estimulando naturalmente diversas habilidades criativas e praticando sua expressão.")}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-rule">
                  {/* A — pomba (1 col) */}
                  <div className="relative h-[260px] overflow-hidden">
                    <Image
                      src="/images/sections/bento-pomba.webp"
                      alt="Pomba entalhada e pintada com detalhes realistas"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>

                  {/* B — baleias (2 cols desktop, 1 col mobile) */}
                  <div className="relative h-[260px] overflow-hidden md:col-span-2">
                    <Image
                      src="/images/sections/bento-baleias.webp"
                      alt="Duas baleias entalhadas em madeira, pintadas de azul"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 67vw"
                    />
                  </div>

                  {/* C — ensaios (2 cols desktop, 1 col mobile) */}
                  <div className="relative h-[260px] overflow-hidden md:col-span-2">
                    <Image
                      src="/images/sections/bento-ensaios.webp"
                      alt="Suportes de tubos de ensaio entalhados em madeira com plantas"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 67vw"
                    />
                  </div>

                  {/* D — fruta (1 col) */}
                  <div className="relative h-[260px] overflow-hidden">
                    <Image
                      src="/images/sections/bento-fruta.webp"
                      alt="Melancia entalhada e pintada com expressão divertida"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>

                  {/* E — dino (1 col) */}
                  <div className="relative h-[260px] overflow-hidden">
                    <Image
                      src="/images/sections/bento-dino.webp"
                      alt="Dinossauro entalhado em madeira natural"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>

                  {/* F — geek (2 cols desktop, 1 col mobile) */}
                  <div className="relative h-[260px] overflow-hidden md:col-span-2">
                    <Image
                      src="/images/sections/bento-geek.webp"
                      alt="Mago entalhado em madeira, personagem de fantasia"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 67vw"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <LandingPrimaryCtaLink href={ctaUrl} variant="filled">
                  {ctaText}
                </LandingPrimaryCtaLink>
              </div>
            </div>
          </section>

          {/* Ferramentas — seção separada com identidade própria */}
          <section className={`${sectionPadding} bg-cream-2`} id="ferramentas">
            <div className="mx-auto max-w-6xl space-y-8">
              <div>
                <SectionTitle>
                  Comece com<br />
                  <em>o essencial</em>
                </SectionTitle>
              </div>
              <div className="flex flex-col gap-rule">
                {/* Bloco 3 — card: foto | texto */}
                <div className="group/card-tools overflow-hidden bg-cream-3 md:grid md:grid-cols-2 md:items-stretch">
                  <div className="relative aspect-[4/3] min-h-[200px] overflow-hidden md:aspect-auto md:min-h-[300px] md:h-full">
                    <Image
                      src="/images/sections/capivarinha.webp"
                      alt="Bloco de madeira, faca de entalhe e capivara esculpida — do início ao resultado"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:group-hover/card-tools:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center px-9 py-10">
                    <h3 className="font-titulo mb-4 text-h3 font-bold text-espresso">
                      Comece com poucas ferramentas
                    </h3>
                    <p className="font-corpo text-body max-w-prose font-light text-brown">
                      {pw("Basicamente com um pedaço de madeira e uma faca de entalhe já podemos esculpir.")}
                    </p>
                  </div>
                </div>

                {/* Bloco 4 — card: kit (texto | imagem no desktop; imagem primeiro no mobile) */}
                <div className="group/card overflow-hidden bg-cream-3 md:grid md:grid-cols-2 md:items-stretch">
                  <div className="order-2 flex flex-col justify-center px-9 py-10 md:order-1">
                    <h3 className="font-titulo mb-4 text-h3 font-bold text-espresso">
                      Ainda não tenho nenhuma ferramenta…
                    </h3>
                    <p className="font-corpo text-body max-w-prose font-light text-brown">
                      {pw("Preparamos kits para você iniciar e dar continuidade à prática do entalhe. Para te incentivar a começar agora, você tem desconto se comprá-los junto com o curso.")}
                    </p>
                    {/* TODO: reativar quando o kit estiver disponível para compra
                    <div className="mt-7 flex justify-center">
                      <Link
                        href="#"
                        className="font-corpo text-label inline-block rounded-sm border border-terracota bg-transparent px-8 py-3.5 font-medium uppercase tracking-[0.08em] text-terracota transition-all duration-200 hover:-translate-y-px"
                      >
                        Comprar kit
                      </Link>
                    </div>
                    */}
                  </div>
                  <div className="relative order-1 aspect-[4/3] min-h-[200px] overflow-hidden md:order-2 md:aspect-auto md:min-h-[300px] md:h-full">
                    <Image
                      src="/images/sections/ferramentas-kit.jpg"
                      alt="Kit de ferramentas para iniciantes no entalhe"
                      fill
                      className="object-cover transition-transform duration-500 motion-safe:group-hover/card:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cards de features — grade 2 colunas + banner full-width */}
          <section className={`${sectionPaddingMd} pt-0 md:pt-0 bg-cream-2`}>
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-2">
                {/* Cards 01 e 02 — lado a lado */}
                <div className="grid grid-cols-1 gap-2">
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
                      className="overflow-hidden bg-cream px-8 py-10 md:px-10 md:py-12"
                    >
                      <h3 className="font-titulo text-h3 mb-4 font-bold text-espresso">
                        {item.title}
                      </h3>
                      <p className="font-corpo text-body font-light text-brown">
                        {pw(item.desc)}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        </>
      )}

      {/* ── VISÃO GERAL DO CURSO ── */}
      {isVisible(visibility, "course_overview") && (
        <section id="modulos" className={`${sectionPadding} bg-cream`}>
          <div className="mx-auto max-w-6xl">
            {/* Card 03 — Para quem é */}
            <div className="mb-10">
              <SectionLabel>Para quem é</SectionLabel>
              <SectionTitle as="h3">Será que esse curso é para mim?</SectionTitle>
              <p className="font-corpo text-body font-light text-brown">
                {pw("Nosso curso é para todos: quem nunca entalhou na vida (inclusive costumamos tranquilizar nossos alunos pois a esmagadora maioria de fato nunca praticou), e também para quem já praticou e quer desenvolver ainda mais suas técnicas.")}
              </p>
            </div>

            <div className="mb-10 flex flex-col gap-10 md:flex-row md:items-center">
              <div className="flex-1 min-w-0">
                <SectionLabel>O curso</SectionLabel>
                <SectionTitle>{overview?.title}</SectionTitle>
                <p className="font-corpo text-body mb-8 font-light text-brown">
                  {overview?.description}
                </p>
                <p className="font-corpo text-body font-light text-brown">
                  {pw("Você vai absorver, na prática, todos esses fundamentos partindo de um bloco maciço que se transformará em uma capivara.")}
                </p>
              </div>
              <div className="w-full overflow-hidden bg-cream-2 md:w-[420px] md:flex-shrink-0">
                <OverviewFinalMedia
                  url={overview?.gif_360_url?.trim() ?? ""}
                  videoFallbackUrl={overview?.gif_360_mp4_url?.trim() || undefined}
                  ariaLabel="Capivara em visualização 360 graus"
                />
              </div>
            </div>

            <CourseOverviewBento modules={content.collections.modules} overview={overview} />
          </div>
        </section>
      )}

      {/* ── O QUE VOCÊ RECEBE ── */}
      {isVisible(visibility, "instructors") && (
        <section className={`${sectionPadding} bg-cream-2`}>
          <div className="mx-auto max-w-6xl">
            <SectionLabel>O que você recebe</SectionLabel>
            <SectionTitle>XX horas · XX aulas</SectionTitle>

            <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-2 md:items-start">
              <div>
                <p className="font-corpo text-body mb-6 font-light text-brown">
                  Compre o curso e ganhe um e-book com 10 projetos de entalhe.
                </p>
                <p className="font-corpo text-body mb-6 font-light text-brown">
                  Além disso, você vai poder interagir e tirar suas dúvidas no fórum de entalhe.
                </p>
                <p className="font-corpo text-body mb-6 font-light text-brown">
                  Disponível para celular, tablet e computador.
                </p>
                {/* Pull quote */}
                <p className="font-titulo text-h3 mb-10 border-l-[3px] border-terracota pl-7 font-bold leading-[1.35] tracking-[-0.02em] text-terracota">
                  Assista no seu tempo: o curso fica disponível por 3 anos.
                </p>
                <div className="flex justify-center">
                  <LandingPrimaryCtaLink href={ctaUrl} variant="filled">
                    {ctaText}
                  </LandingPrimaryCtaLink>
                </div>
              </div>
              <div className="min-h-64 overflow-hidden bg-cream-3">
                <div
                  className="h-full min-h-64 w-full bg-gradient-to-br from-cream-2 to-cream-3"
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
        <section id="instrutor" className="bg-dark">
          {/* Faixa decorativa no topo */}
          <div
            aria-hidden="true"
            className="h-1 bg-gradient-to-r from-mahogany via-terra-lt to-mahogany"
          />

          {/* Conteúdo centralizado */}
          <div className="mx-auto flex max-w-3xl flex-col px-6 py-24 md:px-10">
            <SectionLabel dark>Quem ensina</SectionLabel>

            <h2 className="font-titulo mb-2 text-h2 font-black text-cream">
              Mentoras
            </h2>
            <div className="font-corpo text-label mb-10 font-light uppercase tracking-[0.1em] text-terra-lt">
              Mayra e Simone — Arquitetura &amp; Entalhe
            </div>

            <div className="mb-8 max-h-[56vh] overflow-hidden rounded-sm">
              <Image
                src="/images/sections/mentoras.jpg"
                alt="Mayra e Simone"
                width={1024}
                height={1024}
                className="max-h-[56vh] w-full object-cover object-top transition-transform duration-500 motion-safe:hover:scale-105"
              />
            </div>

            <p className="font-corpo mb-12 text-base font-light leading-[1.75] text-cream/65">
              {pw("Somos Mayra e Simone, duas irmãs que compartilham das mesmas afinidades desde a infância. Cursamos Arquitetura e Urbanismo e, há anos, decidimos trabalhar juntas na marcenaria. No meio do caminho, nos apaixonamos pela técnica de entalhe e hoje criamos peças artísticas selecionadas e premiadas em Salões de Arte.")}
            </p>

            <InstructorCarousel />

            <div className="mt-10 flex justify-center">
              <LandingPrimaryCtaLink href={ctaUrl} variant="filled">
                {ctaText}
              </LandingPrimaryCtaLink>
            </div>
          </div>
        </section>
      )}

      {/* ── CONFIANÇA — stats ── */}
      <section className={`${sectionPaddingMd} bg-cream`}>
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Confiança</SectionLabel>
          <SectionTitle>
            Por que esse curso<br />
            <em>é confiável?</em>
          </SectionTitle>

          <div className="mt-10 grid grid-cols-1 gap-rule sm:grid-cols-3">
            {[
              { n: "700+", l: "Alunos em todo o Brasil" },
              { n: "3 anos", l: "Acesso para rever quando quiser" },
              { n: "Suporte", l: "Dúvidas respondidas no fórum" },
            ].map((stat) => (
              <div key={stat.l} className="bg-cream-2 px-9 py-10">
                <span className="font-titulo block text-stat font-black text-espresso">
                  {stat.n}
                </span>
                <span className="font-corpo text-label mt-2 block uppercase text-brown-lt">
                  {stat.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANOS / PREÇOS ── (temporariamente oculto — reativar no futuro) */}
      {false && (
      <section id="planos" className={`${sectionPadding} bg-cream-2`}>
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Investimento</SectionLabel>
          <SectionTitle>
            Escolha o seu<br />
            <em>ritmo</em>
          </SectionTitle>
          <p className="font-corpo text-body mb-16 max-w-[560px] font-light text-brown">
            Acesso imediato a todo o conteúdo. Sem cobranças surpresa.
          </p>

          {/* Grade de planos — gap:2px */}
          <div className="grid max-w-[800px] grid-cols-1 gap-rule md:grid-cols-2">
            {/* Parcelado */}
            <div className="bg-cream-3 px-10 py-12">
              <span className="font-corpo text-label mb-5 block font-medium uppercase text-terracota">
                Parcelado
              </span>
              <div className="font-titulo mb-1 text-display font-black leading-none tracking-[-0.04em] text-espresso">
                —
              </div>
              <ul className="mb-10 mt-6 list-none space-y-3 p-0">
                {["Acesso por 3 anos", "Suporte no fórum", "E-book bônus"].map((item) => (
                  <li
                    key={item}
                    className="font-corpo text-sm-body flex items-center gap-2.5 font-light text-brown"
                  >
                    <Check className="h-4 w-4 shrink-0 text-terracota" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={ctaUrl}
                className="font-corpo text-label block border border-rule bg-transparent py-3.5 text-center font-medium uppercase tracking-[0.07em] text-espresso transition-colors hover:bg-cream-3 rounded-sm"
              >
                Começar
              </Link>
            </div>

            {/* À vista — destaque */}
            <div className="bg-espresso px-10 py-12">
              <span className="font-corpo text-label mb-2 block font-medium uppercase text-terra-lt">
                Melhor custo-benefício
              </span>
              <span className="font-corpo text-label mb-4 block font-medium uppercase text-cream/50">
                À vista
              </span>
              <div className="font-titulo mb-1 text-display font-black leading-none tracking-[-0.04em] text-cream">
                —
              </div>
              <ul className="mb-10 mt-6 list-none space-y-3 p-0">
                {["Acesso por 3 anos", "Suporte no fórum", "E-book bônus"].map((item) => (
                  <li
                    key={item}
                    className="font-corpo text-sm-body flex items-center gap-2.5 font-light text-cream/70"
                  >
                    <Check className="h-4 w-4 shrink-0 text-terra-lt" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <LandingPrimaryCtaLink href={ctaUrl} variant="filled">
                  {ctaText}
                </LandingPrimaryCtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── FAQ ── */}
      {isVisible(visibility, "faq") && (
        <section className={`${sectionPadding} bg-cream`}>
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Dúvidas comuns</SectionLabel>
            <SectionTitle>
              Perguntas<br />
              <em>frequentes</em>
            </SectionTitle>

            <Accordion type="single" collapsible className="mt-12 grid gap-rule">
              {content.collections.faq.map((f) => (
                <AccordionItem key={f.id} value={f.id} className="border-none">
                  <AccordionTrigger className="font-titulo px-9 py-7 text-left text-lg font-bold leading-[1.3] tracking-[-0.01em] text-espresso hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-corpo px-9 pb-7 text-base font-light leading-[1.75] text-brown">
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
        <div className="bg-terracota px-6 py-[72px] md:px-16 md:py-[96px]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto] md:gap-16">
            <div>
              <h2 className="font-titulo text-h2 font-black text-cream">
                {finalCta?.title}
              </h2>
              <p className="font-corpo mt-4 text-base font-light leading-[1.6] text-cream/70">
                {finalCta?.subtitle}
              </p>
            </div>
            <div className="flex w-full justify-center shrink-0">
              <LandingPrimaryCtaLink href={finalCta?.button_url ?? "#"} variant="inverted">
                {finalCta?.button_text}
              </LandingPrimaryCtaLink>
            </div>
          </div>
        </div>
      )}

      {/* <MobileScrollCta ctaUrl={ctaUrl} ctaText={ctaText} threshold={0.22} /> */}
      <Footer />
    </main>
  );
}
