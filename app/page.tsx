import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import { getContent, getVisibility } from "@/lib/content/store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function isVisible(visibility: Array<{ section: string; is_visible: boolean }>, section: string) {
  return visibility.some((v) => v.section === section && v.is_visible);
}

function toSentenceCase(text: string | null | undefined) {
  if (!text) return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  const lowerCased = trimmed.toLowerCase();
  const firstLetterIndex = lowerCased.search(/[a-zà-ÿ]/i);
  if (firstLetterIndex === -1) return lowerCased;
  return (
    lowerCased.slice(0, firstLetterIndex) +
    lowerCased.charAt(firstLetterIndex).toUpperCase() +
    lowerCased.slice(firstLetterIndex + 1)
  );
}

export default function HomePage() {
  const content = getContent();
  const visibility = getVisibility();
  const hero = content.sections.hero;
  const overview = content.sections.course_overview;
  const finalCta = content.sections.final_cta;
  const pageContainer = "mx-auto max-w-5xl px-8";
  const mosaicPlaceholders = [
    "[placeholder mosaico 1]",
    "[placeholder mosaico 2]",
    "[placeholder mosaico 3]",
    "[placeholder mosaico 4]",
    "[placeholder mosaico 5]",
  ];
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
    (_, index) => overviewCarouselUrls[index] ?? "",
  );
  const overviewGifUrl = overview?.gif_360_url?.trim() ?? "";

  return (
    <main>
      {isVisible(visibility, "hero") && (
        <HeroSection
          pageContainer={pageContainer}
          title={hero?.title}
          subtitle={hero?.subtitle}
          ctaUrl={hero?.cta_url}
          ctaText={hero?.cta_text}
          imageSrc="/images/hero/hero-bg-workshop-20260311.jpeg"
        />
      )}

      {isVisible(visibility, "social_proof") && (
        <>
          <section className="border-y border-[#e7dfd4] bg-fundo py-16">
            <div className={`${pageContainer} space-y-12`}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">
              {toSentenceCase("POR QUE ENTALHAR COM FACA?")}
            </h2>

            <div>
              <div>
                <h3 className="font-titulo text-h2 font-bold text-cinza">
                  {toSentenceCase("UMA PRÁTICA MANUAL PARA UMA VIDA MELHOR")}
                </h3>
                <p className="mt-3 font-corpo text-body text-cinza/85">
                  Numa sociedade cada vez mais virtual, desconectar-se e trabalhar com as mãos é uma atividade preciosa.
                </p>
                <p className="mt-3 font-corpo text-body text-cinza/85">
                  Quem já entalhou sabe como é uma atividade gostosa para a alma. E não só isso: o médico Drauzio
                  Varella enfatiza como a manualidade ajuda a evitar o declínio cognitivo, reduzir o estresse e
                  aumentar a sensação de bem-estar.
                </p>
              </div>
              <div className="mt-6 overflow-hidden rounded-xl border border-dashed border-cinza/40 bg-fundo-off">
                <Image
                  src="/images/sections/minha-mae-entalhando.png"
                  alt="Minha mãe entalhando madeira com faca"
                  width={1024}
                  height={1536}
                  className="h-[420px] w-full object-cover object-center md:h-[520px]"
                />
              </div>
            </div>

            <div>
              <div>
                <h3 className="font-titulo text-h2 font-bold text-cinza">
                  {toSentenceCase("DESENVOLVER SUA CRIATIVIDADE")}
                </h3>
                <p className="mt-3 font-corpo text-body text-cinza/85">
                  Após esculpir o famoso Davi de um enorme bloco de mármore, há quem diga que Michelangelo afirmou: "Eu
                  apenas tirei da pedra de mármore tudo que não era Davi". Isso se aplica a qualquer atividade de entalhe:
                  a retirada do que não importa para se revelar o que sempre esteve lá.
                </p>
                <p className="mt-3 font-corpo text-body text-cinza/85">
                  É muito satisfatório começar a entender um bloco rígido como uma potencial peça escultural, estimulando
                  naturalmente diversas habilidades criativas e praticando sua expressão.
                </p>
              </div>
              <div className="mt-6 overflow-hidden pb-2">
                <div className="carousel-track">
                  {[...mosaicPlaceholders, ...mosaicPlaceholders].map((label, index) => (
                    <div
                      key={`${label}-${index}`}
                      className="flex min-h-52 min-w-[220px] items-center justify-center rounded-xl border border-dashed border-cinza/40 bg-fundo-off p-6 text-center"
                    >
                      <p className="font-corpo text-sm-body text-cinza/70">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-titulo text-h2 font-bold text-cinza">
                {toSentenceCase("COMECE COM POUCAS FERRAMENTAS")}
              </h3>
              <p className="mt-3 font-corpo text-body text-cinza/85">
                Basicamente com um pedaço de madeira e uma faca de entalhe já podemos esculpir.
              </p>
              <div className="mt-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-cinza/40 bg-fundo-off p-6 text-center">
                <p className="font-corpo text-sm-body text-cinza/70">[imagem ferramentas para começar a entalhar]</p>
              </div>
            </div>

            <div>
              <h3 className="font-titulo text-h2 font-bold text-cinza">
                {toSentenceCase("\"AINDA NÃO TENHO NENHUMA FERRAMENTA...\"")}
              </h3>
              <p className="mt-3 font-corpo text-body text-cinza/85">
                Preparamos kits para você iniciar e dar continuidade à prática do entalhe. Para te incentivar a começar
                agora, você tem desconto se comprá-los junto com o curso.
              </p>
              <div className="mt-6 overflow-hidden rounded-xl border border-dashed border-cinza/40 bg-fundo-off">
                <Image
                  src="/images/sections/ferramentas-kit.png"
                  alt="Kit de ferramentas para iniciantes no entalhe"
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Button asChild>
                <Link href={hero?.cta_url ?? "#"}>QUERO ENTALHAR</Link>
              </Button>
            </div>

            </div>
          </section>

          <section className="relative overflow-hidden bg-fundo-off py-16">
            <div
              className="absolute inset-0 bg-repeat opacity-20"
              style={{ backgroundImage: "url('/images/sections/unnamed%20(1)%202.png')" }}
              aria-hidden="true"
            />
            <div className={`${pageContainer} relative z-10`}>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-titulo text-h2 font-bold text-cinza">
                    {toSentenceCase("NÃO PRECISA DE ESPAÇO")}
                  </h3>
                  <p className="mt-3 font-corpo text-body text-cinza/85">
                    Nós sabemos como maquinários e ferramentas ocupam espaço, e valorizamos muito a possibilidade de
                    entalhar de qualquer lugar. Seja em casa, apartamento ou kitnet, em um parque, durante uma
                    viagem. A praticidade do entalhe, que envolve basicamente ter um pedaço de madeira e uma faca de
                    entalhe, torna a atividade extremamente acessível.
                  </p>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-titulo text-h2 font-bold text-cinza">
                    {toSentenceCase("FONTE DE RENDA EXTRA")}
                  </h3>
                  <p className="mt-3 font-corpo text-body text-cinza/85">
                    Temos alunos que já venderam suas peças em feiras, sendo super possível complementar a renda com
                    suas próprias criações.
                  </p>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="font-titulo text-h2 font-bold text-cinza">
                    {toSentenceCase("SERÁ QUE ESSE CURSO É PARA MIM?")}
                  </h3>
                  <p className="mt-3 font-corpo text-body text-cinza/85">
                    Nosso curso é para todos: quem nunca entalhou na vida (inclusive costumamos tranquilizar nossos
                    alunos pois a esmagadora maioria de fato nunca praticou), e também para quem já praticou e quer
                    desenvolver ainda mais suas técnicas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}

      {isVisible(visibility, "course_overview") && (
        <section className="py-20">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">
              {toSentenceCase(overview?.title)}
            </h2>
            <p className="mt-3 max-w-[760px] font-corpo text-body text-cinza/85">{overview?.description}</p>
            <div className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {content.collections.modules.map((m) => (
                <Card key={m.id}>
                  <CardContent className="pt-6">
                    <small className="text-base">{m.icon}</small>
                    <h3 className="mt-1 font-titulo text-h3 font-bold text-cinza">{toSentenceCase(m.title)}</h3>
                    <p className="mt-2 font-corpo text-sm-body text-cinza/80">{m.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 overflow-hidden pb-2">
              <div className="carousel-track">
                {overviewCarouselItems.map((imageUrl, index) => (
                  <div
                    key={`overview-carousel-${index}`}
                    className="flex min-h-52 min-w-[280px] items-center justify-center overflow-hidden rounded-xl border border-dashed border-cinza/40 bg-fundo-off text-center"
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
                      <p className="p-6 font-corpo text-sm-body text-cinza/70">
                        {`[carrossel curso ${index + 1}]`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-8 max-w-[760px] font-corpo text-body text-cinza/85">
              Você vai absorver, na prática, todos esses fundamentos partindo de um bloco maciço que se transformará em
              uma capivara.
            </p>
            {overviewGifUrl ? (
              <div className="mt-6 overflow-hidden rounded-xl border border-dashed border-cinza/40 bg-fundo-off">
                <Image
                  src={overviewGifUrl}
                  alt="Capivara em visualização 360 graus"
                  width={1024}
                  height={1024}
                  className="h-auto w-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="mt-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-cinza/40 bg-fundo-off p-6 text-center">
                <p className="font-corpo text-sm-body text-cinza/70">[gif 360 capivara]</p>
              </div>
            )}
          </div>
        </section>
      )}

      {isVisible(visibility, "instructors") && (
        <section className="bg-fundo-off bg-hatch-verde py-20">
          <div className={`${pageContainer}`}>
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">
                  {toSentenceCase("XX horas XX aulas")}
                </h2>
                <p className="mt-4 max-w-3xl font-corpo text-body text-cinza/85">
                  Compre o curso e ganhe um e-book com 10 projetos de entalhe.
                </p>
                <p className="mt-2 max-w-3xl font-corpo text-body text-cinza/85">
                  Além disso, você vai poder interagir e tirar suas dúvidas no fórum de entalhe.
                </p>

                <div className="mt-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-cinza/40 bg-fundo-off p-6 text-center">
                  <p className="font-corpo text-sm-body text-cinza/70">
                    [montagem capa do e-book, imagem mockup celular computador tablet]
                  </p>
                </div>

                <p className="mt-6 max-w-3xl font-corpo text-body text-cinza/85">
                  Disponível para celular, tablet e computador.
                </p>
                <p className="mt-2 max-w-3xl font-titulo text-h3 font-bold text-verde-musgo">
                  {toSentenceCase("ASSISTA NO SEU TEMPO, O CURSO FICA DISPONÍVEL DE FORMA VITALÍCIA.")}
                </p>

                <div className="mt-8 flex justify-center">
                  <Button asChild>
                    <Link href={hero?.cta_url ?? "#"}>QUERO ENTALHAR</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {isVisible(visibility, "instructors") && (
        <section className="py-20">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">
              {toSentenceCase("MENTORAS")}
            </h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-cinza/20 bg-fundo-off">
              <Image
                src="/images/sections/7_mentoras(ATUALIZAR) (1).jpg"
                alt="Mayra e Simone"
                width={1024}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="mt-6 max-w-4xl font-corpo text-body text-cinza/85">
              Somos Mayra e Simone, duas irmãs que compartilham das mesmas afinidades desde a infância. Cursamos
              Arquitetura e Urbanismo e, há anos, decidimos trabalhar juntas na marcenaria. No meio do caminho, nos
              apaixonamos pela técnica de entalhe e hoje criamos peças artísticas selecionadas e premiadas em Salões de
              Arte.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-dashed border-cinza/40 bg-fundo-off p-6 text-center">
              <p className="font-corpo text-sm-body text-cinza/70">
                [imagem com nossas peças artísticas, para demonstrar onde os alunos podem chegar]
              </p>
            </div>
            <p className="mt-6 max-w-4xl font-corpo text-body text-cinza/85">
              Já compartilhamos o que aprendemos com mais de 700 pessoas pelo Brasil, despertando em muitas a paixão pelo
              entalhe.
            </p>
            <div className="mt-8 flex justify-center">
              <Button asChild>
                <Link href={hero?.cta_url ?? "#"}>QUERO ENTALHAR</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="bg-fundo-off py-20">
        <div className={pageContainer}>
          <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">
            {toSentenceCase("VALOR")}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-titulo text-h2 font-bold text-cinza">{toSentenceCase("parcelado")}</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-titulo text-h2 font-bold text-cinza">{toSentenceCase("à vista")}</h3>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href={hero?.cta_url ?? "#"}>QUERO ENTALHAR</Link>
            </Button>
          </div>
        </div>
      </section>

      {isVisible(visibility, "faq") && (
        <section className="py-20">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">FAQ</h2>
            <Accordion type="single" collapsible className="mt-3 grid gap-2">
              {content.collections.faq.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent>{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {isVisible(visibility, "final_cta") && (
        <section className="bg-verde-musgo py-20 text-white">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-white">
              {toSentenceCase(finalCta?.title)}
            </h2>
            <p className="mt-3 max-w-3xl font-corpo text-body text-white/90">{finalCta?.subtitle}</p>
            <div className="mt-5 flex justify-center">
              <Button asChild variant="outline" className="border-white bg-white text-verde-musgo hover:bg-white/90">
                <Link href={finalCta?.button_url ?? "#"}>{finalCta?.button_text}</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
