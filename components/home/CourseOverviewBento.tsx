import { MakingOfTileMedia } from "@/components/home/MakingOfTileMedia";
import { OverviewFinalMedia } from "@/components/home/OverviewFinalMedia";

export type CourseOverviewModule = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

function ModuleOverviewCard({
  m,
  compact = false,
}: {
  m: CourseOverviewModule;
  /** Bento 12 col: cartão mais baixo + descrição truncada para alinhar à altura do GIF. */
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div
        className="group flex h-full flex-col bg-cream-2 transition-colors duration-200 hover:bg-cream-3"
        style={{ padding: "28px 28px 32px" }}
      >
        <div>
          <div
            className="font-titulo font-black text-rule transition-colors duration-200 group-hover:text-terracota/50"
            style={{
              fontSize: "44px",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: "12px",
            }}
          >
            {m.icon}
          </div>
          <div className="h-px w-10 bg-terracota/35" aria-hidden />
        </div>
        <div className="mt-6 flex flex-col">
          <h3
            className="font-titulo font-bold text-espresso"
            style={{
              fontSize: "18px",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            {m.title}
          </h3>
          <p
            className="font-corpo line-clamp-4 font-light text-sm-body"
            style={{ color: "#6B5344", lineHeight: 1.65 }}
            title={m.description}
          >
            {m.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group flex min-h-[272px] flex-col bg-cream-2 transition-colors duration-200 hover:bg-cream-3 md:min-h-[300px]"
      style={{ padding: "40px 36px 44px" }}
    >
      <div>
        <div
          className="font-titulo font-black text-rule transition-colors duration-200 group-hover:text-terracota/50"
          style={{
            fontSize: "52px",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            marginBottom: "16px",
          }}
        >
          {m.icon}
        </div>
        <div className="h-px w-11 bg-terracota/35" aria-hidden />
      </div>
      <div className="mt-10 flex flex-1 flex-col">
        <h3
          className="font-titulo font-bold text-espresso"
          style={{
            fontSize: "20px",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            marginBottom: "14px",
          }}
        >
          {m.title}
        </h3>
        <p
          className="font-corpo font-light text-sm-body"
          style={{ color: "#6B5344", lineHeight: 1.7 }}
        >
          {m.description}
        </p>
      </div>
    </div>
  );
}

type CourseOverviewSection = Record<string, string> | undefined;

type BentoItem =
  | { kind: "module"; module: CourseOverviewModule }
  | { kind: "makingOf"; src: string; step: number; videoFallbackUrl?: string }
  | { kind: "final"; src: string; videoFallbackUrl?: string };

type MakingOfSlot = { url: string; videoFallbackUrl?: string };

function buildBentoItems(
  modules: CourseOverviewModule[],
  makingOfSlots: readonly [MakingOfSlot, MakingOfSlot, MakingOfSlot, MakingOfSlot],
  finalUrl: string,
  finalVideoFallbackUrl?: string,
): BentoItem[] | null {
  const row = modules.slice(0, 8);
  if (row.length < 8) return null;
  const [m0, m1, m2, m3, m4, m5, m6, m7] = row;
  return [
    { kind: "module", module: m0 },
    { kind: "module", module: m1 },
    { kind: "makingOf", src: makingOfSlots[0].url, step: 1, videoFallbackUrl: makingOfSlots[0].videoFallbackUrl },
    { kind: "module", module: m2 },
    { kind: "module", module: m3 },
    { kind: "makingOf", src: makingOfSlots[1].url, step: 2, videoFallbackUrl: makingOfSlots[1].videoFallbackUrl },
    { kind: "module", module: m4 },
    { kind: "makingOf", src: makingOfSlots[2].url, step: 3, videoFallbackUrl: makingOfSlots[2].videoFallbackUrl },
    { kind: "module", module: m5 },
    { kind: "module", module: m6 },
    { kind: "makingOf", src: makingOfSlots[3].url, step: 4, videoFallbackUrl: makingOfSlots[3].videoFallbackUrl },
    { kind: "module", module: m7 },
    { kind: "final", src: finalUrl, videoFallbackUrl: finalVideoFallbackUrl },
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
  const makingOfSlots: readonly [MakingOfSlot, MakingOfSlot, MakingOfSlot, MakingOfSlot] = [
    {
      url: overview?.making_of_1_url?.trim() ?? "",
      videoFallbackUrl: overview?.making_of_1_mp4_url?.trim() || undefined,
    },
    {
      url: overview?.making_of_2_url?.trim() ?? "",
      videoFallbackUrl: overview?.making_of_2_mp4_url?.trim() || undefined,
    },
    {
      url: overview?.making_of_3_url?.trim() ?? "",
      videoFallbackUrl: overview?.making_of_3_mp4_url?.trim() || undefined,
    },
    {
      url: overview?.making_of_4_url?.trim() ?? "",
      videoFallbackUrl: overview?.making_of_4_mp4_url?.trim() || undefined,
    },
  ];
  const finalUrl = overview?.gif_360_url?.trim() ?? "";
  const finalVideoFallback = overview?.gif_360_mp4_url?.trim() ?? "";

  const items = buildBentoItems(
    modules,
    makingOfSlots,
    finalUrl,
    finalVideoFallback || undefined,
  );

  if (!items) {
    return (
      <div style={{ marginBottom: "40px" }}>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: "2px" }}
        >
          {modules.map((m) => (
            <ModuleOverviewCard key={m.id} m={m} />
          ))}
        </div>
        <div className="mt-6 overflow-hidden bg-cream-2">
          <OverviewFinalMedia
            url={finalUrl}
            videoFallbackUrl={finalVideoFallback || undefined}
            ariaLabel="Capivara em visualização 360 graus"
          />
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
            <div key={m.id} className="col-span-2 self-stretch md:col-span-4">
              <ModuleOverviewCard m={m} compact />
            </div>
          );
        }

        if (item.kind === "makingOf") {
          return (
            <div
              key={`making-of-${item.step}-${index}`}
              className="col-span-2 min-w-0 overflow-hidden self-stretch md:col-span-4"
            >
              {item.src ? (
                <MakingOfTileMedia
                  src={item.src}
                  videoFallbackUrl={item.videoFallbackUrl}
                  ariaLabel={makingOfAlt(item.step)}
                />
              ) : (
                <div className="min-h-[200px] w-full bg-cream-3" aria-hidden />
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
              videoFallbackUrl={item.videoFallbackUrl}
              ariaLabel="Capivara em visualização 360 graus"
            />
          </div>
        );
      })}
    </div>
  );
}
