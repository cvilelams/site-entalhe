import Link from "next/link";
import { landingData } from "@/lib/landing-data";

export default function Footer() {
  return (
    <footer style={{ background: "#e8e0d0", borderTop: "1px solid #d9cfbe" }}>
      <div className="container-page" style={{ padding: "2rem 0", display: "flex", gap: "1rem", justifyContent: "space-between", flexWrap: "wrap" }}>
        <strong>{landingData.footer.copyright}</strong>
        <nav style={{ display: "flex", gap: "1rem" }}>
          {landingData.footer.links.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
