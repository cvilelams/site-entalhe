"use client";

import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  value: number;
  suffix?: string;
  duration?: number;
};

type UseCountUpResult = {
  display: string;
  ref: React.RefObject<HTMLDivElement | null>;
};

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountUp({
  value,
  suffix = "",
  duration = 1400,
}: UseCountUpOptions): UseCountUpResult {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);

          if (reduceMotion) {
            setCurrent(value);
            return;
          }

          const animate = (timestamp: number) => {
            if (startTimeRef.current === null) {
              startTimeRef.current = timestamp;
            }
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            setCurrent(Math.round(easeOutQuart(progress) * value));

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate);
            }
          };

          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, started]);

  return { display: `${current}${suffix}`, ref };
}
