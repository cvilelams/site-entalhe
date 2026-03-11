import Link from "next/link";
import Footer from "@/components/Footer";
import HeroParallaxBackground from "@/components/home/HeroParallaxBackground";
import { getContent, getVisibility } from "@/lib/content/store";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function isVisible(visibility: Array<{ section: string; is_visible: boolean }>, section: string) {
  return visibility.some((v) => v.section === section && v.is_visible);
}

export default function HomePage() {
  const content = getContent();
  const visibility = getVisibility();
  const hero = content.sections.hero;
  const overview = content.sections.course_overview;
  const guarantee = content.sections.guarantee;
  const finalCta = content.sections.final_cta;
  const pageContainer = "mx-auto max-w-5xl px-8";
  const mosaicPlaceholders = [
    "[placeholder mosaico 1]",
    "[placeholder mosaico 2]",
    "[placeholder mosaico 3]",
    "[placeholder mosaico 4]",
    "[placeholder mosaico 5]",
  ];

  return (
    <main>
      {isVisible(visibility, "hero") && (
        <section className="relative grid min-h-[70vh] items-center overflow-hidden bg-cedro-gradient py-20 text-white">
          <HeroParallaxBackground imageSrc="/images/hero/hero-bg-workshop-20260311.jpeg" />
          <div className={`${pageContainer} relative z-10 flex flex-col items-center text-center`}>
            <h1 className="mb-4 mt-2 max-w-4xl font-titulo text-display font-black uppercase tracking-tighter text-white">
              {hero?.title}
            </h1>
            <p className="mx-auto max-w-[720px] font-corpo text-body text-white/90">{hero?.subtitle}</p>
            <Button asChild className="mt-8 self-center">
              <Link href={hero?.cta_url ?? "#"}>{hero?.cta_text ?? "Saiba mais"}</Link>
            </Button>
          </div>
        </section>
      )}

      {isVisible(visibility, "social_proof") && (
        <section className="border-y border-[#e7dfd4] bg-fundo py-16">
          <div className={`${pageContainer} space-y-12`}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">POR QUE ENTALHAR COM FACA?</h2>

            <div>
              <div>
                <h3 className="font-titulo text-h2 font-bold text-cinza">UMA PRÁTICA MANUAL PARA UMA VIDA MELHOR</h3>
                <p className="mt-3 font-corpo text-body text-cinza/85">
                  Numa sociedade cada vez mais virtual, desconectar-se e trabalhar com as mãos é uma atividade preciosa.
                </p>
                <p className="mt-3 font-corpo text-body text-cinza/85">
                  Quem já entalhou sabe como é uma atividade gostosa para a alma, e não só isso, o médico Drauzio Varella
                  enfatiza como a manualidade ajuda evitar o declínio cognitivo, reduzir o estresse e aumentar a sensação
                  de bem-estar.
                </p>
              </div>
              <div className="mt-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-cinza/40 bg-fundo-off p-6 text-center">
                <p className="font-corpo text-sm-body text-cinza/70">[imagem minha mãe entalhando]</p>
              </div>
            </div>

            <div>
              <div>
                <h3 className="font-titulo text-h2 font-bold text-cinza">DESENVOLVER SUA CRIATIVIDADE</h3>
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
              <h3 className="font-titulo text-h2 font-bold text-cinza">COMECE COM POUCAS FERRAMENTAS</h3>
              <p className="mt-3 font-corpo text-body text-cinza/85">
                Basicamente com um pedaço de madeira e uma faca de entalhe já podemos esculpir.
              </p>
              <div className="mt-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-cinza/40 bg-fundo-off p-6 text-center">
                <p className="font-corpo text-sm-body text-cinza/70">[imagem ferramentas para comecar a entalhar]</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "course_overview") && (
        <section className="py-20">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">{overview?.title}</h2>
            <p className="mt-3 max-w-[760px] font-corpo text-body text-cinza/85">{overview?.description}</p>
            <div className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {content.collections.modules.map((m) => (
                <Card key={m.id}>
                  <CardContent className="pt-6">
                    <small className="text-base">{m.icon}</small>
                    <h3 className="mt-1 font-titulo text-h3 font-bold text-cinza">{m.title}</h3>
                    <p className="mt-2 font-corpo text-sm-body text-cinza/80">{m.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "instructors") && (
        <section className="bg-fundo-off bg-hatch-verde py-20">
          <div className={`${pageContainer} grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]`}>
            {content.collections.instructors.map((i) => (
              <Card key={i.id}>
                <CardContent className="pt-6">
                  <h3 className="font-titulo text-h2 font-bold text-cinza">{i.name}</h3>
                  <p className="mt-2 font-corpo text-sm-body text-cinza/80">{i.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {isVisible(visibility, "testimonials") && (
        <section className="py-20">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">Depoimentos</h2>
            <div className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {content.collections.testimonials.map((t) => (
                <Card key={t.id} className="border-l-4 border-l-terracota bg-fundo-off">
                  <CardContent className="pt-6">
                    <p className="font-corpo text-body italic text-cinza/85">"{t.text}"</p>
                    <strong className="mt-3 block font-titulo text-label text-verde-musgo">{t.name}</strong>
                    <p className="font-corpo text-sm-body text-cinza/70">{t.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "guarantee") && (
        <section className="bg-fundo-off py-20">
          <div className={pageContainer}>
            <Card className="bg-fundo-off">
              <CardContent className="pt-6">
                <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">{guarantee?.title}</h2>
                <p className="mt-3 max-w-3xl font-corpo text-body text-cinza/85">{guarantee?.text}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

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
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-white">{finalCta?.title}</h2>
            <p className="mt-3 max-w-3xl font-corpo text-body text-white/90">{finalCta?.subtitle}</p>
            <Button asChild variant="outline" className="mt-5 border-white bg-white text-verde-musgo hover:bg-white/90">
              <Link href={finalCta?.button_url ?? "#"}>{finalCta?.button_text}</Link>
            </Button>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
