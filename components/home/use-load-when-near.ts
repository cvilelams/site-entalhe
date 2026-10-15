"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adia o carregamento até o elemento chegar perto da tela.
 * O HTML inicial sai sem a mídia; o navegador só pede o arquivo na rolagem.
 */
export function useLoadWhenNear<T extends HTMLElement>(rootMargin = "600px") {
  const ref = useRef<T>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  return { ref, shouldLoad };
}
