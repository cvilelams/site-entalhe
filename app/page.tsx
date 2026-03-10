import Link from "next/link";
import Footer from "@/components/Footer";
import { getContent, getVisibility } from "@/lib/content/store";

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
<<<<<<< Updated upstream
=======
  const pageContainer = "mx-auto max-w-5xl px-8";
>>>>>>> Stashed changes

  return (
    <main>
      {isVisible(visibility, "hero") && (
<<<<<<< Updated upstream
        <section className="section" style={{ minHeight: "65vh", display: "grid", alignItems: "center" }}>
          <div className="container-page">
            <h1 className="title-serif" style={{ fontSize: "clamp(2.2rem, 7vw, 4.2rem)", marginBottom: 12 }}>
              {hero?.title}
            </h1>
            <p style={{ maxWidth: 680, fontSize: "1.125rem", opacity: 0.86 }}>{hero?.subtitle}</p>
            <Link href={hero?.cta_url ?? "#"} style={{ display: "inline-block", marginTop: 24, background: "#6b4e2a", color: "#fff", padding: "0.85rem 1.25rem", borderRadius: 8 }}>
              {hero?.cta_text ?? "Saiba mais"}
            </Link>
=======
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
>>>>>>> Stashed changes
          </div>
        </section>
      )}

      {isVisible(visibility, "social_proof") && (
<<<<<<< Updated upstream
        <section className="section" style={{ borderTop: "1px solid #d9cfbe", borderBottom: "1px solid #d9cfbe", padding: "1.2rem 0" }}>
          <div className="container-page" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12, textAlign: "center" }}>
            <div>
              <strong>{social?.item1_value}</strong>
              <p>{social?.item1_label}</p>
            </div>
            <div>
              <strong>{social?.item2_value}</strong>
              <p>{social?.item2_label}</p>
            </div>
            <div>
              <strong>{social?.item3_value}</strong>
              <p>{social?.item3_label}</p>
            </div>
=======
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
>>>>>>> Stashed changes
          </div>
        </section>
      )}

      {isVisible(visibility, "course_overview") && (
<<<<<<< Updated upstream
        <section className="section">
          <div className="container-page">
            <h2 className="title-serif" style={{ fontSize: "2rem" }}>{overview?.title}</h2>
            <p style={{ maxWidth: 760 }}>{overview?.description}</p>
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
              {content.collections.modules.map((m) => (
                <article key={m.id} style={{ border: "1px solid #d9cfbe", borderRadius: 10, padding: 16 }}>
                  <small>{m.icon}</small>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </article>
=======
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
>>>>>>> Stashed changes
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "instructors") && (
<<<<<<< Updated upstream
        <section className="section" style={{ background: "#efe7da" }}>
          <div className="container-page" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {content.collections.instructors.map((i) => (
              <article key={i.id} style={{ border: "1px solid #d9cfbe", borderRadius: 10, padding: 16 }}>
                <h3 className="title-serif">{i.name}</h3>
                <p>{i.bio}</p>
              </article>
=======
        <section className="bg-fundo-off bg-hatch-verde py-20">
          <div className={`${pageContainer} grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]`}>
            {content.collections.instructors.map((i) => (
              <Card key={i.id}>
                <CardContent className="pt-6">
                  <h3 className="font-titulo text-h2 font-bold text-cinza">{i.name}</h3>
                  <p className="mt-2 font-corpo text-sm-body text-cinza/80">{i.bio}</p>
                </CardContent>
              </Card>
>>>>>>> Stashed changes
            ))}
          </div>
        </section>
      )}

      {isVisible(visibility, "testimonials") && (
<<<<<<< Updated upstream
        <section className="section">
          <div className="container-page">
            <h2 className="title-serif" style={{ fontSize: "2rem" }}>Depoimentos</h2>
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
              {content.collections.testimonials.map((t) => (
                <article key={t.id} style={{ border: "1px solid #d9cfbe", borderRadius: 10, padding: 16 }}>
                  <p>"{t.text}"</p>
                  <strong>{t.name}</strong>
                  <p>{t.role}</p>
                </article>
=======
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
>>>>>>> Stashed changes
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "guarantee") && (
<<<<<<< Updated upstream
        <section className="section" style={{ background: "#e8e0d0" }}>
          <div className="container-page">
            <h2 className="title-serif">{guarantee?.title}</h2>
            <p>{guarantee?.text}</p>
=======
        <section className="bg-fundo-off py-20">
          <div className={pageContainer}>
            <Card className="bg-fundo-off">
              <CardContent className="pt-6">
                <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">{guarantee?.title}</h2>
                <p className="mt-3 max-w-3xl font-corpo text-body text-cinza/85">{guarantee?.text}</p>
              </CardContent>
            </Card>
>>>>>>> Stashed changes
          </div>
        </section>
      )}

      {isVisible(visibility, "faq") && (
<<<<<<< Updated upstream
        <section className="section">
          <div className="container-page">
            <h2 className="title-serif">FAQ</h2>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
=======
        <section className="py-20">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-terracota">FAQ</h2>
            <Accordion type="single" collapsible className="mt-3 grid gap-2">
>>>>>>> Stashed changes
              {content.collections.faq.map((f) => (
                <details key={f.id} style={{ border: "1px solid #d9cfbe", borderRadius: 8, padding: 12 }}>
                  <summary>{f.question}</summary>
                  <p style={{ marginTop: 8 }}>{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "final_cta") && (
<<<<<<< Updated upstream
        <section className="section" style={{ background: "#6b4e2a", color: "#fff" }}>
          <div className="container-page">
            <h2 className="title-serif" style={{ fontSize: "2rem" }}>{finalCta?.title}</h2>
            <p>{finalCta?.subtitle}</p>
            <Link href={finalCta?.button_url ?? "#"} style={{ display: "inline-block", marginTop: 20, background: "#fff", color: "#6b4e2a", padding: "0.8rem 1.15rem", borderRadius: 8 }}>
              {finalCta?.button_text}
            </Link>
=======
        <section className="bg-verde-musgo py-20 text-white">
          <div className={pageContainer}>
            <h2 className="font-titulo text-h1 font-extrabold tracking-tight text-white">{finalCta?.title}</h2>
            <p className="mt-3 max-w-3xl font-corpo text-body text-white/90">{finalCta?.subtitle}</p>
            <Button asChild variant="outline" className="mt-5 border-white bg-white text-verde-musgo hover:bg-white/90">
              <Link href={finalCta?.button_url ?? "#"}>{finalCta?.button_text}</Link>
            </Button>
>>>>>>> Stashed changes
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
