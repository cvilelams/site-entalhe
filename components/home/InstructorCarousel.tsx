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
    <div className="my-12">
      {/* Label */}
      <div className="font-corpo mb-5 text-[11px] font-light uppercase tracking-[0.18em] text-terra-lt">
        Galeria
      </div>

      {/* Grid */}
      <div
        role="region"
        aria-label="Galeria de peças das mentoras"
        className="columns-1 gap-2 sm:columns-2"
      >
        {IMAGES.map((image) => (
          <div
            key={image.src}
            className="mb-2 overflow-hidden rounded-sm leading-none break-inside-avoid"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 336px"
              className="block h-auto w-full transition-transform duration-500 motion-safe:hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
