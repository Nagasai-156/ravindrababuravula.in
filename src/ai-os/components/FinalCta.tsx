import { ArrowUpRight, Check } from "lucide-react";
import { WovenCanvas } from "./WovenCanvas";
import { Reveal } from "./shared";
import {
  pricing,
  startLabel,
  seatsLabel,
  baseFee,
  gstLabel,
  ctaLabel,
  applyHref,
  applyFlow,
} from "../content/site";
import { track } from "../lib/track";

const recap = [
  `${pricing.liveDays} live days, ~${pricing.totalHours} hrs live + lab`,
  "6 portfolio artifacts, built on the call",
  "Two instructors present the whole way",
  "Capstone, demo day and certificate",
];

export const FinalCta = () => (
  <section id="apply" className="relative overflow-hidden border-t border-hairline">
    <WovenCanvas className="absolute inset-0 h-full w-full opacity-60" />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-ink/55 to-ink/90" />

    <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <p className="t-label text-bone-70">
          COHORT 01 · {startLabel.toUpperCase()} · {seatsLabel.toUpperCase()}
        </p>
        <h2 className="mt-5 max-w-[15ch] text-[13vw] font-medium leading-[0.9] tracking-[-0.04em] text-bone lg:text-[7vw]">
          Stop watching from outside.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-12 items-end gap-x-6 gap-y-10">
        <Reveal delay={0.1} className="col-span-12 lg:col-span-6">
          <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {recap.map((r) => (
              <li key={r} className="flex items-start gap-2.5 text-[15px] text-bone">
                <Check className="mt-1 h-4 w-4 shrink-0 text-bone-70" aria-hidden />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.18} className="col-span-12 lg:col-span-5 lg:col-start-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-muted">
                PROGRAM FEE
              </p>
              <p className="mt-1 text-5xl font-bold tracking-[-0.03em] text-bone md:text-6xl">
                {baseFee}
              </p>
              <p className="mt-1.5 font-mono text-sm text-muted">
                {gstLabel}
              </p>
            </div>
            <a
              href={applyHref}
              onClick={() => track("cta_click", { location: "final" })}
              className="group inline-flex items-center gap-2 rounded-full bg-volt py-2 pl-7 pr-2 text-lg font-bold text-ink transition-all hover:gap-3.5"
            >
              {ctaLabel}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5 text-volt" />
              </span>
            </a>
          </div>
          <p className="t-meta mt-5">
            {applyFlow.mode === "apply"
              ? "Applying takes 2 minutes and costs nothing."
              : "Seats are confirmed on payment."}{" "}
            Refund terms are published in the footer.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);
