"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { landingData } from "@/lib/landing-data";

const CARD_WIDTH = 280;
const CARD_GAP = 24;
const SCROLL_STEP = CARD_WIDTH + CARD_GAP;
const AUTOPLAY_PX_PER_SEC = 28;
const INTERACTION_PAUSE_MS = 8000;

function pw(text: string): string {
  return text.replace(/\s(\S+)\s*$/, "\u00A0$1");
}

function WhatTheySayCard({
  item,
  duplicate = false,
}: {
  item: (typeof landingData.whatTheySay)[number];
  duplicate?: boolean;
}) {
  return (
    <article
      className="w-[280px] shrink-0 snap-start overflow-hidden rounded-sm bg-cream shadow-[0_1px_2px_rgba(36,28,21,.05),0_10px_24px_rgba(36,28,21,.07)]"
      aria-hidden={duplicate || undefined}
    >
      <div
        className={`relative aspect-[4/5] ${
          item.kind === "print" ? "bg-[#F7F1E8]" : "bg-cream-2"
        }`}
      >
        <Image
          src={item.src.replace(/[^/]+$/, (file) => encodeURIComponent(file))}
          alt={duplicate ? "" : item.alt}
          fill
          className={item.kind === "print" ? "object-contain p-3" : "object-cover"}
          sizes="280px"
        />
      </div>
    </article>
  );
}

export default function WhatTheySaySection() {
  const items = landingData.whatTheySay;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const [canScroll, setCanScroll] = useState(false);

  const pauseForInteraction = useCallback((ms = INTERACTION_PAUSE_MS) => {
    pauseUntilRef.current = Date.now() + ms;
  }, []);

  const updateCanScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScroll(el.scrollWidth > el.clientWidth + 8);
  }, []);

  const loopWidth = () => {
    const el = scrollerRef.current;
    if (!el) return 0;
    return el.scrollWidth / 2;
  };

  const wrapScroll = (el: HTMLDivElement) => {
    const width = el.scrollWidth / 2;
    if (width <= 0) return;
    if (el.scrollLeft >= width) el.scrollLeft -= width;
    if (el.scrollLeft < 0) el.scrollLeft += width;
  };

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const el = scrollerRef.current;
      if (!el) return;
      pauseForInteraction();
      const width = loopWidth();
      let next = el.scrollLeft + direction * SCROLL_STEP;
      if (width > 0) {
        if (next >= width) next -= width;
        if (next < 0) next += width;
      }
      el.scrollTo({ left: next, behavior: "smooth" });
    },
    [pauseForInteraction],
  );

  useEffect(() => {
    updateCanScroll();
    const el = scrollerRef.current;
    if (!el) return;

    const onResize = () => updateCanScroll();
    window.addEventListener("resize", onResize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      return () => window.removeEventListener("resize", onResize);
    }

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const track = scrollerRef.current;
      if (
        track &&
        !hoverRef.current &&
        Date.now() >= pauseUntilRef.current
      ) {
        track.scrollLeft += (AUTOPLAY_PX_PER_SEC * dt) / 1000;
        wrapScroll(track);
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [updateCanScroll]);

  return (
    <section
      id="o-que-falam"
      className="bg-tan-bg px-6 py-[72px] md:px-16 md:py-[120px]"
      aria-labelledby="o-que-falam-title"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 min-[860px]:grid-cols-[0.82fr_1.18fr] min-[860px]:gap-16 min-[860px]:items-start">
        <div className="min-[860px]:sticky min-[860px]:top-28">
          <div className="mb-5 flex items-center gap-3 text-terracota">
            <span aria-hidden className="block h-px w-6 shrink-0 bg-current" />
            <span className="font-corpo text-label font-medium uppercase">
              o que falam
            </span>
          </div>
          <h2
            id="o-que-falam-title"
            className="font-titulo mb-6 text-h2 font-bold text-espresso"
          >
            Dá uma olhada no que dizem <em>por aí</em>
          </h2>
          <p className="font-corpo text-body mb-8 max-w-[36ch] font-light text-ink-soft">
            {pw(
              "Dá uma olhada no que dizem por aí sobre nossa metodologia e já confere algumas das peças entalhadas por alunos nossos.",
            )}
          </p>
          <div className="hidden gap-2 min-[860px]:flex">
            <button
              type="button"
              aria-label="Ver depoimento anterior"
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-espresso/30 bg-transparent text-lg text-espresso transition-colors hover:bg-espresso hover:text-cream"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Ver próximo depoimento"
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-espresso/30 bg-transparent text-lg text-espresso transition-colors hover:bg-espresso hover:text-cream"
            >
              →
            </button>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Depoimentos e peças de alunos"
          className="min-w-0"
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
          onFocusCapture={() => {
            hoverRef.current = true;
          }}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              hoverRef.current = false;
            }
          }}
          onPointerDown={() => pauseForInteraction()}
        >
          <div
            ref={scrollerRef}
            className="what-they-say-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 min-[860px]:snap-none"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((item) => (
              <WhatTheySayCard key={item.id} item={item} />
            ))}
            {items.map((item) => (
              <WhatTheySayCard key={`${item.id}-dup`} item={item} duplicate />
            ))}
          </div>
          {!canScroll ? null : (
            <p className="font-corpo mt-4 text-caption text-ink-soft min-[860px]:hidden">
              Deslize para ver mais
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
