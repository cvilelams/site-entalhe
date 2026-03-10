import Link from "next/link";
import Footer from "@/components/Footer";
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
  const social = content.sections.social_proof;
  const overview = content.sections.course_overview;
  const guarantee = content.sections.guarantee;
  const finalCta = content.sections.final_cta;
  const pageContainer = "mx-auto max-w-5xl px-8";

  return (
    <main>
      {isVisible(visibility, "hero") && (
        <section className="grid min-h-[65vh] items-center bg-cedro-gradient py-20 text-white">
          <div className={pageContainer}>
            <span className="font-titulo text-label font-bold uppercase tracking-widest text-verde-folha">Curso online para iniciantes</span>
            <h1 className="mb-3 mt-2 font-titulo text-display font-black uppercase tracking-tighter text-white">
              {hero?.title}
            </h1>
            <p className="max-w-[680px] font-corpo text-body text-white/90">{hero?.subtitle}</p>
            <Button asChild className="mt-6">
              <Link href={hero?.cta_url ?? "#"}>{hero?.cta_text ?? "Saiba mais"}</Link>
            </Button>
          </div>
        </section>
      )}

      {isVisible(visibility, "social_proof") && (
        <section className="border-y border-[#e7dfd4] bg-fundo py-6">
          <div className={`${pageContainer} grid gap-3 text-center md:grid-cols-3`}>
            <Card>
              <CardContent className="pt-6">
                <strong className="font-titulo text-h2 font-extrabold text-terracota">{social?.item1_value}</strong>
                <p className="mt-1 font-corpo text-sm-body text-cinza/80">{social?.item1_label}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <strong className="font-titulo text-h2 font-extrabold text-terracota">{social?.item2_value}</strong>
                <p className="mt-1 font-corpo text-sm-body text-cinza/80">{social?.item2_label}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <strong className="font-titulo text-h2 font-extrabold text-terracota">{social?.item3_value}</strong>
                <p className="mt-1 font-corpo text-sm-body text-cinza/80">{social?.item3_label}</p>
              </CardContent>
            </Card>
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
