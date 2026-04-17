declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackCTAClick(slot: string, destination?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "cta_click", {
    event_category: "CTA",
    event_label: slot,
    destination,
  });
}

export function trackLinkClick(label: string, destination: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "link_click", {
    event_category: "Link",
    event_label: label,
    destination,
  });
}
