import Image from "next/image";

export default function InstructorCarousel() {
  return (
    <div className="my-12">
      {/* Label */}
      <div className="font-corpo mb-5 text-[11px] font-light uppercase tracking-[0.18em] text-terracota">
        Galeria
      </div>

      {/* Grid bento */}
      <div
        role="region"
        aria-label="Galeria de peças das mentoras"
        className="grid grid-cols-2 md:grid-cols-3 gap-rule"
      >
        {/* Cabeça entalhada — 1 col (imagem trocada, espaço mantido) */}
        <div className="relative h-[260px] overflow-hidden rounded-sm">
          <Image
            src="/images/sections/7_peçascabeça.webp"
            alt="Detalhe de peça entalhada"
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
          />
        </div>

        {/* Peças das mentoras — 2 cols */}
        <div className="relative h-[260px] overflow-hidden rounded-sm md:col-span-2">
          <Image
            src="/images/sections/7_peçadesembaraço2.png"
            alt="Peças de entalhe criadas pelas mentoras"
            fill
            sizes="(max-width: 768px) 50vw, 67vw"
            className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
          />
        </div>

        {/* Selfie no ateliê — 2 cols (imagem trocada, espaço mantido) */}
        <div className="relative h-[260px] overflow-hidden rounded-sm md:col-span-2">
          <Image
            src="/images/sections/7_peçasselfie.webp"
            alt="Mayra e Simone no ateliê"
            fill
            sizes="(max-width: 768px) 50vw, 67vw"
            className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
          />
        </div>

        {/* Coleção de peças — 1 col */}
        <div className="relative h-[260px] overflow-hidden rounded-sm">
          <Image
            src="/images/sections/7_peçaspeças.webp"
            alt="Coleção de peças entalhadas"
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover object-[center_15%] transition-transform duration-500 motion-safe:hover:scale-105"
          />
        </div>

        {/* Onça Caetana — largura total */}
        <div className="relative h-[260px] overflow-hidden rounded-sm col-span-2 md:col-span-3">
          <Image
            src="/images/sections/7_peçasonçacaetana.webp"
            alt="Peça entalhada — Onça Caetana"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-500 motion-safe:hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
