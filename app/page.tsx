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

  return (
    <main>
      {isVisible(visibility, "hero") && (
        <section className="section" style={{ minHeight: "65vh", display: "grid", alignItems: "center" }}>
          <div className="container-page">
            <h1 className="title-serif" style={{ fontSize: "clamp(2.2rem, 7vw, 4.2rem)", marginBottom: 12 }}>
              {hero?.title}
            </h1>
            <p style={{ maxWidth: 680, fontSize: "1.125rem", opacity: 0.86 }}>{hero?.subtitle}</p>
            <Link href={hero?.cta_url ?? "#"} style={{ display: "inline-block", marginTop: 24, background: "#6b4e2a", color: "#fff", padding: "0.85rem 1.25rem", borderRadius: 8 }}>
              {hero?.cta_text ?? "Saiba mais"}
            </Link>
          </div>
        </section>
      )}

      {isVisible(visibility, "social_proof") && (
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
          </div>
        </section>
      )}

      {isVisible(visibility, "course_overview") && (
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
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "instructors") && (
        <section className="section" style={{ background: "#efe7da" }}>
          <div className="container-page" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
            {content.collections.instructors.map((i) => (
              <article key={i.id} style={{ border: "1px solid #d9cfbe", borderRadius: 10, padding: 16 }}>
                <h3 className="title-serif">{i.name}</h3>
                <p>{i.bio}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {isVisible(visibility, "testimonials") && (
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
              ))}
            </div>
          </div>
        </section>
      )}

      {isVisible(visibility, "guarantee") && (
        <section className="section" style={{ background: "#e8e0d0" }}>
          <div className="container-page">
            <h2 className="title-serif">{guarantee?.title}</h2>
            <p>{guarantee?.text}</p>
          </div>
        </section>
      )}

      {isVisible(visibility, "faq") && (
        <section className="section">
          <div className="container-page">
            <h2 className="title-serif">FAQ</h2>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
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
        <section className="section" style={{ background: "#6b4e2a", color: "#fff" }}>
          <div className="container-page">
            <h2 className="title-serif" style={{ fontSize: "2rem" }}>{finalCta?.title}</h2>
            <p>{finalCta?.subtitle}</p>
            <Link href={finalCta?.button_url ?? "#"} style={{ display: "inline-block", marginTop: 20, background: "#fff", color: "#6b4e2a", padding: "0.8rem 1.15rem", borderRadius: 8 }}>
              {finalCta?.button_text}
            </Link>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
