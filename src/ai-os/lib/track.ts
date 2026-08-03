/**
 * Vendor-neutral event tracking. Pushes to dataLayer (GTM) and/or plausible
 * if either is present; otherwise it is a no-op. Wire your analytics of choice
 * by including its snippet in index.html — no code changes needed here.
 */
type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    plausible?: (event: string, opts?: { props?: Props }) => void;
  }
}

export const track = (event: string, props: Props = {}) => {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...props });
    window.plausible?.(event, { props });
  } catch {
    /* analytics must never break the page */
  }
};

/** Fires scroll-depth milestones once each. */
export const initScrollDepth = () => {
  if (typeof window === "undefined") return () => {};
  const marks = [25, 50, 75, 100];
  const fired = new Set<number>();

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    const pct = (window.scrollY / max) * 100;
    for (const m of marks) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track("scroll_depth", { depth: m });
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
};
