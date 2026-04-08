import Image from "next/image";
import { OverviewFinalMedia } from "@/components/home/OverviewFinalMedia";

export type CourseOverviewModule = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

type CourseOverviewSection = Record<string, string> | undefined;

type BentoItem =
  | { kind: "module"; module: CourseOverviewModule }
  | { kind: "makingOf"; src: string; step: number }
  | { kind: "final"; src: string };

function buildBentoItems(
  modules: CourseOverviewModule[],
  makingOfUrls: [string, string, string, string],
  finalUrl: string,
): BentoItem[] | null {
  const row = modules.slice(0, 8);
  if (row.length < 8) return null;
  const [m0, m1, m2, m3, m4, m5, m6, m7] = row;
  return [
    { kind: "module", module: m0 },
    { kind: "module", module: m1 },
    { kind: "makingOf", src: makingOfUrls[0], step: 1 },
    { kind: "module", module: m2 },
    { kind: "module", module: m3 },
    { kind: "makingOf", src: makingOfUrls[1], step: 2 },
    { kind: "module", module: m4 },
    { kind: "makingOf", src: makingOfUrls[2], step: 3 },
    { kind: "module", module: m5 },
    { kind: "module", module: m6 },
    { kind: "makingOf", src: makingOfUrls[3], step: 4 },
    { kind: "module", module: m7 },
    { kind: "final", src: finalUrl },
  ];
}

function makingOfAlt(step: number): string {
  return `Prática do entalhe em madeira — trecho ${step} de 4 do processo`;
}

export function CourseOverviewBento({
  modules,
  overview,
}: {
  modules: CourseOverviewModule[];
  overview: CourseOverviewSection;
}) {
  const makingOf: [string, string, string, string] = [
    overview?.making_of_1_url?.trim() ?? "",
    overview?.making_of_2_url?.trim() ?? "",
    overview?.making_of_3_url?.trim() ?? "",
    overview?.making_of_4_url?.trim() ?? "",
  ];
  const finalUrl = overview?.gif_360_url?.trim() ?? "";

  const items = buildBentoItems(modules, makingOf, finalUrl);

  if (!items) {
    return (
      <div style={{ marginBottom: "40px" }}>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: "2px" }}
        >
          {modules.map((m) => (
            <div
              key={m.id}
              className="bg-cream-2 transition-colors duration-200 hover:bg-cream-3"
              style={{ padding: "40px 36px" }}
            >
              <div
                className="font-titulo font-black"
                style={{
                  fontSize: "56px",
                  lineHeight: 1,
                  color: "#D4C4B0",
                  letterSpacing: "-0.04em",
                  marginBottom: "24px",
                }}
              >
                {m.icon}
              </div>
              <h3
                className="font-titulo font-bold text-espresso"
                style={{
                  fontSize: "20px",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                {m.title}
              </h3>
              <p className="font-corpo font-light text-sm-body" style={{ color: "#6B5344" }}>
                {m.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 overflow-hidden bg-cream-2">
          <OverviewFinalMedia url={finalUrl} ariaLabel="Capivara em visualização 360 graus" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-12"
      style={{ gap: "2px", marginBottom: "40px" }}
    >
      {items.map((item, index) => {
        if (item.kind === "module") {
          const m = item.module;
          return (
            <div
              key={m.id}
              className="col-span-2 bg-cream-2 transition-colors duration-200 hover:bg-cream-3 md:col-span-4"
              style={{ padding: "40px 36px" }}
            >
              <div
                className="font-titulo font-black"
                style={{
                  fontSize: "56px",
                  lineHeight: 1,
                  color: "#D4C4B0",
                  letterSpacing: "-0.04em",
                  marginBottom: "24px",
                }}
              >
                {m.icon}
              </div>
              <h3
                className="font-titulo font-bold text-espresso"
                style={{
                  fontSize: "20px",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                {m.title}
              </h3>
              <p className="font-corpo font-light text-sm-body" style={{ color: "#6B5344" }}>
                {m.description}
              </p>
            </div>
          );
        }

        if (item.kind === "makingOf") {
          return (
            <div
              key={`making-of-${item.step}-${index}`}
              className="relative col-span-2 aspect-square overflow-hidden bg-cream-2 md:col-span-4"
            >
              {item.src ? (
                <Image
                  src={item.src}
                  alt={makingOfAlt(item.step)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              ) : (
                <div
                  className="h-full w-full"
                  style={{ background: "#E4D8C8" }}
                  aria-hidden
                />
              )}
            </div>
          );
        }

        return (
          <div
            key="course-overview-final"
            className="col-span-2 overflow-hidden bg-cream-2 md:col-span-12"
          >
            <OverviewFinalMedia
              url={item.src}
              ariaLabel="Capivara em visualização 360 graus"
            />
          </div>
        );
      })}
    </div>
  );
}
