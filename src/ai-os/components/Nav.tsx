import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { priceLabel, startLabel, ctaLabel, applyHref, applyLinkProps } from "../content/site";
import { track } from "../lib/track";

const items = [
  { label: "Curriculum", href: "#curriculum" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const Nav = () => {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-1/2 top-0 z-50 w-full max-w-[1400px] -translate-x-1/2 px-2 md:px-4"
    >
      <div
        className={`mx-auto flex items-center gap-3 rounded-b-2xl px-4 py-2.5 transition-colors duration-500 sm:gap-6 md:gap-8 md:rounded-b-3xl md:px-6 ${
          past ? "bg-ink/95 backdrop-blur-md" : "bg-ink"
        }`}
      >
        {/* back to the main site — this page lives inside ravindrababuravula.in */}
        <a
          href="/courses"
          aria-label="Back to all courses on ravindrababuravula.in"
          className="shrink-0 text-bone-70 transition-colors hover:text-bone"
        >
          <ArrowLeft className="h-4 w-4" />
        </a>
        <a
          href="#top"
          className="shrink-0 font-mono text-xs font-semibold tracking-wider text-volt"
        >
          AI_OS
        </a>

        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => track("nav_click", { to: item.label })}
            className="hidden whitespace-nowrap text-[13px] text-bone-70 transition-colors hover:text-bone sm:block"
          >
            {item.label}
          </a>
        ))}

        <div className="ml-auto flex items-center gap-3 md:gap-4">
          {/* price + start date appear once the hero is behind you */}
          <AnimatePresence>
            {past && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.35 }}
                className="hidden whitespace-nowrap font-mono text-[11px] leading-tight text-muted md:block"
              >
                {priceLabel}
                <span className="mx-1.5 text-hairline">·</span>
                {startLabel}
              </motion.span>
            )}
          </AnimatePresence>
          <a
            href={applyHref}
            {...applyLinkProps}
            onClick={() => track("cta_click", { location: "nav" })}
            className="shrink-0 whitespace-nowrap rounded-full bg-volt px-4 py-1.5 text-xs font-bold text-ink transition-transform hover:-translate-y-px md:text-[13px]"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </motion.nav>
  );
};
