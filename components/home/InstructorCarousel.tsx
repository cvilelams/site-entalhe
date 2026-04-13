import Image from "next/image";

const IMAGES = [
  {
    src: "/images/sections/7_peçasselfie.webp",
    alt: "Mayra e Simone no ateliê",
  },
  {
    src: "/images/sections/7_peças.webp",
    alt: "Peças de entalhe criadas pelas mentoras",
  },
  {
    src: "/images/sections/7_peçascabeça.webp",
    alt: "Detalhe de peça entalhada",
  },
  {
    src: "/images/sections/7_peçaspeças.webp",
    alt: "Coleção de peças entalhadas",
  },
  {
    src: "/images/sections/7_peçadesembaraço.webp",
    alt: "Peça de entalhe — desembaraço",
  },
  {
    src: "/images/sections/7_peçasonçacaetana.webp",
    alt: "Peça entalhada — Onça Caetana",
  },
];

export default function InstructorCarousel() {
  return (
    <div style={{ marginTop: "48px", marginBottom: "48px" }}>
      {/* Label */}
      <div
        className="font-corpo font-light uppercase"
        style={{
          fontSize: "11px",
          color: "#E8956A",
          letterSpacing: "0.18em",
          marginBottom: "20px",
        }}
      >
        Galeria
      </div>

      {/* Grid */}
      <div
        role="region"
        aria-label="Galeria de peças das mentoras"
        style={{
          columns: 2,
          columnGap: "8px",
        }}
      >
        {IMAGES.map((image) => (
          <div
            key={image.src}
            className="transition-opacity duration-200 hover:opacity-85"
            style={{
              breakInside: "avoid",
              marginBottom: "8px",
              borderRadius: "2px",
              overflow: "hidden",
              lineHeight: 0,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 336px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
