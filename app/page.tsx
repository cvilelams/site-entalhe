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
  const social = content.sections.social_proof;
  const overview = content.sections.course_overview;
  const guarantee = content.sections.guarantee;
  const finalCta = content.sections.final_cta;
  const pageContainer = "mx-auto w-[min(1120px,92vw)]";

  return (
    <main>
      {isVisible(visibility, "hero") && (
        <section className="relative grid min-h-[65vh] items-center overflow-hidden bg-cedro-gradient py-20 text-white">
          <HeroParallaxBackground imageSrc="/images/hero/hero-bg-workshop-20260311.jpeg" />
          <div className={`${pageContainer} relative z-10`}>
            <span className="font-titulo text-label font-bold uppercase tracking-widest text-verde-folha">Curso online para iniciantes</span>
            <h1 className="mb-3 mt-2 font-titulo text-display font-black uppercase tracking-tighter text-white">
              {hero?.title}
            </h1>
            <p className="max-w-[680px] text-lg text-white/90">{hero?.subtitle}</p>
            <Button asChild className="mt-6">
              <Link href={hero?.cta_url ?? "#"}>{hero?.cta_text ?? "Saiba mais"}</Link>
            </Button>
          </div>
        </section>
      )}

      {isVisible(visibility, "social_proof") && (
        <section className="border-y border-[#d9cfbe] py-5">
          <div className={`${pageContainer} grid gap-3 text-center md:grid-cols-3`}>
            <Card>
              <CardContent className="pt-6">
                <strong className="text-xl">{social?.item1_value}</strong>
                <p className="mt-1 text-sm text-sumi/80">{social?.item1_label}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <strong className="text-xl">{social?.item2_value}</strong>
                <p className="mt-1 text-sm text-sumi/80">{social?.item2_label}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <strong className="text-xl">{social?.item3_value}</strong>
                <p className="mt-1 text-sm text-sumi/80">{social?.item3_label}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {isVisible(visibility, "course_overview") && (
        <section className="py-16">
          <div className={pageContainer}>
            <h2 className="font-serif text-3xl">{overview?.title}</h2>
            <p className="mt-2 max-w-[760px] text-sumi/85">{overview?.description}</p>
            <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {content.collections.modules.map((m) => (
                <Card key={m.id}>
                  <CardContent className="pt-6">
                    <small className="text-base">{m.icon}</small>
                    <h3 className="mt-1 font-semibold">{m.title}</h3>
                    <p className="mt-1 text-sm text-sumi/80">{m.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "instructors") && (
        <section className="bg-[#efe7da] py-16">
          <div className={`${pageContainer} grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]`}>
            {content.collections.instructors.map((i) => (
              <Card key={i.id}>
                <CardContent className="pt-6">
                  <h3 className="font-serif text-xl">{i.name}</h3>
                  <p className="mt-2 text-sm text-sumi/80">{i.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {isVisible(visibility, "testimonials") && (
        <section className="py-16">
          <div className={pageContainer}>
            <h2 className="font-serif text-3xl">Depoimentos</h2>
            <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {content.collections.testimonials.map((t) => (
                <Card key={t.id}>
                  <CardContent className="pt-6">
                    <p className="text-sumi/85">"{t.text}"</p>
                    <strong className="mt-3 block">{t.name}</strong>
                    <p className="text-sm text-sumi/70">{t.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "guarantee") && (
        <section className="bg-shiro py-16">
          <div className={pageContainer}>
            <Card className="bg-[#efe7da]">
              <CardContent className="pt-6">
                <h2 className="font-serif text-3xl">{guarantee?.title}</h2>
                <p className="mt-2 max-w-3xl text-sumi/85">{guarantee?.text}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {isVisible(visibility, "faq") && (
        <section className="py-16">
          <div className={pageContainer}>
            <h2 className="font-serif text-3xl">FAQ</h2>
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
        <section className="bg-urushi py-16 text-white">
          <div className={pageContainer}>
            <h2 className="font-serif text-3xl">{finalCta?.title}</h2>
            <p className="mt-2 max-w-3xl text-white/90">{finalCta?.subtitle}</p>
            <Button asChild variant="outline" className="mt-5 border-0 bg-white text-urushi hover:bg-white/90">
              <Link href={finalCta?.button_url ?? "#"}>{finalCta?.button_text}</Link>
            </Button>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
